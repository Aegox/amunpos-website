import { useCallback, useEffect, useRef, useState } from "react";
import { AuthModal } from "../auth/AuthModal";
import { sesionAbierta, tokenDeSesion, irAlPos, type Config } from "../../lib/auth";
import { precios, DESCUENTO_ANUAL, precioMensual, formatearPrecio } from "../../data/precios";

/**
 * Pagar la suscripción con Bold (diseño "tique", aprobado por Diego el 2026-11-21).
 *
 * El monto lo decide el SERVIDOR: `POST /subscription/pago/bold` guarda la orden y devuelve
 * el monto, la llave de identidad y la firma de integridad. Aquí solo se enseña el total
 * (calculado igual que la web, `data/precios.ts`) y se abre el checkout de Bold con lo que
 * devolvió la API. Bold cobra en su propia página: amunpos nunca ve la tarjeta.
 *
 * Al volver, Bold agrega `bold-order-id` y `bold-tx-status` a la URL. Ese estado "puede no ser
 * el definitivo" (docs de Bold): la verdad la da `GET /subscription/pago/:orderId`, que si sigue
 * pendiente le pregunta a Bold.
 */

type Plan = "basico" | "estandar" | "profesional";
type Ciclo = "mensual" | "anual";
type Estado = "pagar" | "preparando" | "procesando" | "aprobado" | "rechazado" | "pendiente" | "revision";

/** Datos de quien pide la cuenta (pasarela sin cobro en línea, Diego 2026-11-23). */
type Datos = { nombre: string; correo: string; whatsapp: string; negocio: string };

const PLANES: Record<Plan, { nombre: string; incluye: string[] }> = {
  basico: { nombre: "Básico", incluye: ["Ventas, caja e inventario", "Asistente con IA", "Tique con IVA"] },
  estandar: { nombre: "Estándar", incluye: ["Todo lo del Básico", "Domicilios con app de repartidor propia", "Sin comisión por pedido"] },
  profesional: { nombre: "Profesional", incluye: ["Todo lo del Estándar", "Horarios con IA y fichaje con PIN", "Publicaciones con tu marca"] },
};
const ES_PLAN = (v: string | null): v is Plan => !!v && v in PLANES;

/** Lo que acepta el botón de pagos de Bold, según su recurso oficial (bold.co/library/ui-kit.js, 2026-11-21). */
const MEDIOS_DESTACADOS = [
  { img: "nequi.svg", nombre: "Nequi" },
  { img: "pse.svg", nombre: "PSE" },
  { img: "bancolombia.svg", nombre: "Bancolombia" },
];
const TARJETAS = ["visa.svg", "mastercard.svg", "amex.svg", "diners.png", "codensa.png", "discover.svg"];

const SCRIPT_BOLD = "https://checkout.bold.co/library/boldPaymentButton.js";

declare global {
  interface Window {
    BoldCheckout?: new (opciones: Record<string, unknown>) => { open: () => void };
  }
}

/** Carga la librería del checkout de Bold una sola vez, cuando se va a pagar. */
function cargarBold(): Promise<void> {
  if (window.BoldCheckout) return Promise.resolve();
  return new Promise((resolver, rechazar) => {
    const listo = () => (window.BoldCheckout ? resolver() : rechazar(new Error("Bold no cargó")));
    window.addEventListener("boldCheckoutLoaded", listo, { once: true });
    window.addEventListener("boldCheckoutLoadFailed", () => rechazar(new Error("Bold no cargó")), { once: true });
    if (!document.querySelector(`script[src="${SCRIPT_BOLD}"]`)) {
      const s = document.createElement("script");
      s.src = SCRIPT_BOLD;
      s.onload = () => setTimeout(listo, 300); // por si el evento ya pasó
      s.onerror = () => rechazar(new Error("Bold no cargó"));
      document.head.appendChild(s);
    }
  });
}

const fechaCorta = (d: Date) => d.toLocaleDateString("es-CO", { day: "numeric", month: "short", year: "numeric" }).replace(".", "");
function renovacion(ciclo: Ciclo, desde = new Date()) {
  const d = new Date(desde);
  if (ciclo === "anual") d.setFullYear(d.getFullYear() + 1);
  else d.setMonth(d.getMonth() + 1);
  return fechaCorta(d);
}

function cuentas(plan: Plan, ciclo: Ciclo) {
  const mensual = precios[plan];
  const anual = ciclo === "anual";
  const total = anual ? precioMensual(plan, true) * 12 : mensual;
  const sinDescuento = anual ? mensual * 12 : mensual;
  return { mensual, anual, total, sinDescuento, ahorro: sinDescuento - total };
}

/** El total cuenta desde el valor anterior en 1,2 s (estándar de movimiento: cifras que cuentan). */
function CifraQueCuenta({ valor }: { valor: number }) {
  const [mostrado, setMostrado] = useState(valor);
  const antes = useRef(valor);
  useEffect(() => {
    const desde = antes.current, t0 = performance.now();
    antes.current = valor;
    let id = 0;
    const paso = (t: number) => {
      const x = Math.min(1, (t - t0) / 1200), e = x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
      setMostrado(Math.round(desde + (valor - desde) * e));
      if (x < 1) id = requestAnimationFrame(paso);
    };
    id = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(id);
  }, [valor]);
  return <>{formatearPrecio(mostrado)}</>;
}

const Flecha = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);

/**
 * Personaje asomado sobre la tarjeta: sube desde detrás del borde y luego aparecen sus dedos.
 * `ancho0`, `alto0` y `borde` son las medidas del recorte original (borde = fila donde va el filo de la tarjeta).
 */
function Asomado({ img, ancho, ancho0, alto0, borde }: { img: string; ancho: number; ancho0: number; alto0: number; borde: number }) {
  const estilo = {
    ["--w" as string]: `${ancho}px`,
    ["--r" as string]: borde / ancho0,
    ["--e" as string]: borde / alto0,
    height: (ancho * alto0) / ancho0,
  };
  return (
    <div className="pago-pj" aria-hidden="true" style={estilo}>
      <div className="pago-pj-vaiven">
        <img className="pago-pj-cuerpo" src={img} alt="" />
        <img className="pago-pj-completo" src={img} alt="" />
      </div>
    </div>
  );
}

export default function Pagar({ config }: { config: Config }) {
  const [plan, setPlan] = useState<Plan>("profesional");
  const [ciclo, setCiclo] = useState<Ciclo>("anual");
  const [estado, setEstado] = useState<Estado>("pagar");
  const [error, setError] = useState("");
  const [auth, setAuth] = useState(false);
  const [resultado, setResultado] = useState<{ orderId: string; plan: Plan; ciclo: Ciclo; monto: number } | null>(null);
  const [conSesion, setConSesion] = useState(false);
  const [datos, setDatos] = useState<Datos>({ nombre: "", correo: "", whatsapp: "", negocio: "" });
  const [solicitud, setSolicitud] = useState<{ id: string; monto: number } | null>(null);
  const campo = (k: keyof Datos) => ({ value: datos[k], onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDatos((d) => ({ ...d, [k]: e.target.value })) });

  // Plan y ciclo desde la URL (?plan=estandar&ciclo=mensual), y el regreso desde Bold.
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const p = q.get("plan");
    if (ES_PLAN(p)) setPlan(p);
    if (q.get("ciclo") === "mensual" || q.get("ciclo") === "anual") setCiclo(q.get("ciclo") as Ciclo);
    setConSesion(sesionAbierta());
    const orden = q.get("bold-order-id");
    if (orden) consultar(orden, q.get("bold-tx-status") || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const api = useCallback(
    async (ruta: string, init?: RequestInit) => {
      const token = tokenDeSesion();
      const r = await fetch(`${config.api}${ruta}`, {
        ...init,
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      });
      let datos: any = {};
      try { datos = await r.json(); } catch { /* sin JSON */ }
      return { r, datos };
    },
    [config.api],
  );

  /** Al volver de Bold: pregunta a la API hasta tener un resultado (unos 45 s como máximo). */
  const consultar = useCallback(
    async (orderId: string, estadoBold: string) => {
      setEstado("procesando");
      const fin = Date.now() + 45_000;
      while (Date.now() < fin) {
        try {
          const { r, datos } = await api(`/subscription/pago/${encodeURIComponent(orderId)}`);
          if (r.ok && datos?.data) {
            const d = datos.data;
            setResultado({ orderId: d.orderId, plan: d.plan, ciclo: d.ciclo, monto: Number(d.monto) });
            if (d.estado === "aprobado") return setEstado("aprobado");
            if (["rechazado", "fallido", "anulado"].includes(d.estado)) return setEstado("rechazado");
            if (d.estado === "revisar") return setEstado("pendiente");
          } else if (r.status === 404 || r.status === 401) {
            break;
          }
        } catch { /* sin conexión: se reintenta */ }
        await new Promise((ok) => setTimeout(ok, 3000));
      }
      // Sin respuesta definitiva: PSE y algunos bancos tardan. El webhook activará el plan.
      setEstado(/rejected|failed/i.test(estadoBold) ? "rechazado" : "pendiente");
    },
    [api],
  );

  /**
   * Dos caminos (Diego, 2026-11-24):
   * - Con sesión (un negocio que el equipo ya creó): paga con Bold y el plan se activa solo.
   * - Sin cuenta (el registro está cerrado): deja una solicitud (POST /solicitud-cuenta) y el equipo
   *   crea la cuenta. Ahí no se hace ningún cobro, y el resultado lo dice.
   */
  const pagar = () => (conSesion ? pagarConBold() : pedirCuenta());

  const pedirCuenta = async () => {
    setError("");
    if (datos.nombre.trim().length < 2) return setError("Escribe tu nombre.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(datos.correo.trim())) return setError("Revisa tu correo.");
    if (datos.whatsapp.replace(/\D/g, "").length < 7) return setError("Revisa tu WhatsApp.");
    if (datos.negocio.trim().length < 2) return setError("Escribe el nombre de tu negocio.");
    setEstado("preparando");
    try {
      const r = await fetch(`${config.api}/solicitud-cuenta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...datos, plan, ciclo }),
      });
      let d: any = {};
      try { d = await r.json(); } catch { /* sin JSON */ }
      if (!r.ok || !d?.data) throw new Error(d?.error || "No pudimos enviar tus datos. Inténtalo otra vez.");
      setSolicitud({ id: String(d.data.id || ""), monto: Number(d.data.monto) || cuentas(plan, ciclo).total });
      // El tique "se imprime" unos segundos antes del resultado, como en el diseño.
      setEstado("procesando");
      setTimeout(() => setEstado("revision"), 3200);
    } catch (e) {
      setEstado("pagar");
      setError(e instanceof Error ? e.message : "No pudimos enviar tus datos. Inténtalo otra vez.");
    }
  };

  // Cobro real con Bold (sesión abierta): la API firma la orden y el plan se activa al aprobarse.
  const pagarConBold = async () => {

    setError("");
    if (!sesionAbierta()) return setAuth(true);
    setEstado("preparando");
    try {
      const { r, datos } = await api("/subscription/pago/bold", { method: "POST", body: JSON.stringify({ plan, ciclo }) });
      if (r.status === 401) { setEstado("pagar"); return setAuth(true); }
      if (datos?.code === "SIN_PASARELA") throw new Error("Los pagos en línea se activan muy pronto. Mientras tanto escríbenos a hola@amunpos.com y te ayudamos a activar tu plan.");
      if (!r.ok || !datos?.data) throw new Error(datos?.error || "No pudimos preparar el pago. Inténtalo otra vez.");
      const d = datos.data;
      await cargarBold();
      // Bold solo acepta direcciones https (BTN-001 con http://localhost): en local vuelve a la web pública.
      const volver = location.protocol === "https:" ? `${location.origin}/pagar` : "https://www.amunpos.com/pagar";
      new window.BoldCheckout!({
        orderId: d.orderId,
        currency: d.moneda || "COP",
        amount: String(d.monto),
        apiKey: d.llaveIdentidad,
        integritySignature: d.firmaIntegridad,
        description: d.descripcion,
        redirectionUrl: volver,
        originUrl: `${volver}?plan=${plan}&ciclo=${ciclo}`,
      }).open();
      setEstado("pagar");
    } catch (e) {
      setEstado("pagar");
      setError(e instanceof Error ? e.message : "No pudimos preparar el pago. Inténtalo otra vez.");
    }
  };

  const c = cuentas(plan, ciclo);
  const p = PLANES[plan];
  const hoy = fechaCorta(new Date());

  if (estado === "procesando") {
    return (
      <div className="pago-estado"><div className="pago-tarjeta">
        <div className="pago-impresora rv" aria-hidden="true"><div className="ranura" /><div className="papel"><i /><i /><i /><i /></div></div>
        <h2 className="rv" style={{ ["--i" as string]: 1 }}>{solicitud ? "Procesando tu solicitud…" : "Confirmando tu pago…"}</h2>
        <p className="rv" style={{ ["--i" as string]: 2 }}>{solicitud ? "Esto toma unos segundos: no cierres esta página." : "Bold nos está avisando cómo salió. Esto toma unos segundos: no cierres esta página."}</p>
        <div className="pago-puntos rv" style={{ ["--i" as string]: 3 }} aria-hidden="true"><i /><i /><i /></div>
      </div></div>
    );
  }

  if (estado === "aprobado" && resultado) {
    const pr = PLANES[resultado.plan] ?? p;
    return (
      <div className="pago-estado con-pj">
        <Asomado img="/ilustraciones/asomados/repartidor.webp" ancho={260} ancho0={1349} alto0={940} borde={810} />
        {[[-6, 190], [94, 220], [-2, 330], [97, 360], [10, 98], [86, 96]].map(([x, y], k) => (
          <svg key={k} className="pago-chispa" style={{ left: `${x}%`, top: y, animationDelay: `${1.2 + k * 0.09}s, ${2 + k * 0.3}s` }} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" /></svg>
        ))}
        <div className="pago-tarjeta">
          <div className="pago-icono ok rv"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path className="trazo" d="M5 12.5l4.5 4.5L19 7.5" /></svg></div>
          <h2 className="rv" style={{ ["--i" as string]: 1 }}>¡Pago aprobado!</h2>
          <p className="rv" style={{ ["--i" as string]: 2 }}>Tu plan <b>{pr.nombre}</b> ya está activo. Gracias por confiar en amunpos.</p>
          <div className="pago-filas rv" style={{ ["--i" as string]: 3 }}>
            <div className="fila"><span>Pagaste</span><b>{formatearPrecio(resultado.monto)} COP</b></div>
            <div className="fila"><span>Ciclo</span><b>{resultado.ciclo === "anual" ? "Anual" : "Mensual"}</b></div>
            <div className="fila"><span>Referencia</span><b>{resultado.orderId}</b></div>
          </div>
          <button className="pago-boton rv" style={{ ["--i" as string]: 4 }} onClick={() => irAlPos(config)}>Ir a mi punto de venta <Flecha /></button>
        </div>
      </div>
    );
  }

  if (estado === "rechazado") {
    return (
      <div className="pago-estado con-pj">
        <Asomado img="/ilustraciones/asomados/diego-asomado.webp" ancho={240} ancho0={970} alto0={721} borde={605} />
        <div className="pago-tarjeta">
          <div className="pago-icono mal rv"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M7 7l10 10M17 7L7 17" /></svg></div>
          <h2 className="rv" style={{ ["--i" as string]: 1 }}>Bold no aprobó el pago</h2>
          <p className="rv" style={{ ["--i" as string]: 2 }}>No se hizo ningún cobro. Suele pasar por fondos, un cupo bajo o un dato mal escrito. Tu punto de venta sigue funcionando.</p>
          <div className="pago-botones rv" style={{ ["--i" as string]: 3 }}>
            <button className="pago-boton sec" onClick={() => irAlPos(config)}>Ir a mi punto de venta</button>
            <button className="pago-boton" onClick={() => { history.replaceState(null, "", "/pagar"); setEstado("pagar"); }}>Intentar de nuevo</button>
          </div>
          <p className="pago-letra rv" style={{ ["--i" as string]: 4 }}>¿Sigue fallando? Escríbenos a hola@amunpos.com{resultado ? ` con la referencia ${resultado.orderId}` : ""}.</p>
        </div>
      </div>
    );
  }

  if (estado === "revision" && solicitud) {
    return (
      <div className="pago-estado"><div className="pago-tarjeta">
        <div className="pago-icono alerta rv"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg></div>
        <h2 className="rv" style={{ ["--i" as string]: 1 }}>Tu solicitud está en revisión</h2>
        <p className="rv" style={{ ["--i" as string]: 2 }}>Te escribimos a <b>{datos.correo.trim()}</b> o por WhatsApp para activar tu cuenta de amunpos y coordinar el pago. No se hizo ningún cobro.</p>
        <div className="pago-filas rv" style={{ ["--i" as string]: 3 }}>
          <div className="fila"><span>Plan</span><b>{PLANES[plan].nombre} · {ciclo === "anual" ? "Anual" : "Mensual"}</b></div>
          <div className="fila"><span>Total</span><b>{formatearPrecio(solicitud.monto)} COP</b></div>
          {solicitud.id && <div className="fila"><span>Referencia</span><b>{solicitud.id.slice(0, 8).toUpperCase()}</b></div>}
        </div>
        <div className="pago-botones rv" style={{ ["--i" as string]: 4 }}>
          <a className="pago-boton" href="/">Volver a amunpos.com <Flecha /></a>
        </div>
        <p className="pago-letra rv" style={{ ["--i" as string]: 5 }}>¿Dudas? Escríbenos a hola@amunpos.com.</p>
      </div></div>
    );
  }

  if (estado === "pendiente") {
    return (
      <div className="pago-estado"><div className="pago-tarjeta">
        <div className="pago-icono alerta rv"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg></div>
        <h2 className="rv" style={{ ["--i" as string]: 1 }}>Tu banco está confirmando el pago</h2>
        <p className="rv" style={{ ["--i" as string]: 2 }}>Algunos pagos, como los de PSE, tardan unos minutos. Activamos tu plan apenas Bold nos confirme; no tienes que volver a pagar.</p>
        {resultado && (
          <div className="pago-filas rv" style={{ ["--i" as string]: 3 }}>
            <div className="fila"><span>Monto</span><b>{formatearPrecio(resultado.monto)} COP</b></div>
            <div className="fila"><span>Referencia</span><b>{resultado.orderId}</b></div>
          </div>
        )}
        <div className="pago-botones rv" style={{ ["--i" as string]: 4 }}>
          <button className="pago-boton sec" onClick={() => resultado && consultar(resultado.orderId, "")}>Revisar de nuevo</button>
          <button className="pago-boton" onClick={() => irAlPos(config)}>Ir a mi punto de venta <Flecha /></button>
        </div>
        <p className="pago-letra rv" style={{ ["--i" as string]: 5 }}>Puedes seguir vendiendo mientras tanto.</p>
      </div></div>
    );
  }

  // Pantalla de pago: el tique.
  return (
    <div className="pago-b">
      <div className="pago-lado">
        <h1 className="pago-titulo rv">Tu plan, en un tique.</h1>
        <p className="pago-bajada rv" style={{ ["--i" as string]: 1 }}>Lo que pagas, lo que ahorras y cuándo se renueva. Sin permanencia.</p>
        <div className="pago-planes rv" style={{ ["--i" as string]: 2 }} role="group" aria-label="Plan">
          {(Object.keys(PLANES) as Plan[]).map((k) => (
            <button key={k} className="pago-plan" aria-pressed={k === plan} onClick={() => setPlan(k)}>
              <b>{PLANES[k].nombre}</b><span>{formatearPrecio(precios[k])} al mes</span>
            </button>
          ))}
        </div>
        <div className="pago-ciclo rv" style={{ ["--i" as string]: 3 }} role="group" aria-label="Ciclo de pago">
          <button aria-pressed={ciclo === "mensual"} onClick={() => setCiclo("mensual")}>Mensual</button>
          <button aria-pressed={ciclo === "anual"} onClick={() => setCiclo("anual")}>Anual <em>−{Math.round(DESCUENTO_ANUAL * 100)} %</em></button>
        </div>
        <ul className="pago-incluye rv" style={{ ["--i" as string]: 4 }}>{p.incluye.map((t) => <li key={t}>{t}</li>)}</ul>
        {conSesion ? null : (<>
        <fieldset className="pago-datos rv" style={{ ["--i" as string]: 5 }}>
          <legend>Tus datos</legend>
          <label><span>Nombre</span><input autoComplete="name" {...campo("nombre")} /></label>
          <label><span>Negocio</span><input autoComplete="organization" {...campo("negocio")} /></label>
          <label><span>Correo</span><input type="email" autoComplete="email" inputMode="email" {...campo("correo")} /></label>
          <label><span>WhatsApp</span><input type="tel" autoComplete="tel" inputMode="tel" {...campo("whatsapp")} /></label>
        </fieldset>
        <p className="pago-letra">¿Ya tienes cuenta? <button type="button" className="pago-enlace" onClick={() => setAuth(true)}>Entra para pagar con Bold</button></p>
        </>)}
        <button className="pago-boton grande rv" style={{ ["--i" as string]: 5 }} onClick={pagar} disabled={estado === "preparando"} aria-label="Pagar con Bold">
          {estado === "preparando" ? "Enviando…" : <>Pagar con <img className="pago-bold" src="/pagos/medios/bold-dark.svg" alt="" /> <Flecha /></>}
        </button>
        {error && <p className="pago-error" role="alert">{error}</p>}
        
        <div className="pago-medios rv" style={{ ["--i" as string]: 6 }}>
          <span>Paga como prefieras</span>
          <div className="destacados">
            {MEDIOS_DESTACADOS.map((m) => <span key={m.nombre} className="medio"><img src={`/pagos/medios/${m.img}`} alt="" />{m.nombre}</span>)}
            <span className="medio" aria-label="Bre-B"><img src="/pagos/medios/breb.svg" alt="Bre-B" style={{ height: 14 }} /></span>
          </div>
          <div className="tarjetas" aria-label="Tarjetas: Visa, Mastercard, American Express, Diners, Codensa y Discover">
            {TARJETAS.map((t) => <img key={t} src={`/pagos/medios/${t}`} alt="" />)}
          </div>
        </div>
        <p className="pago-letra rv" style={{ ["--i" as string]: 7 }}>{conSesion ? "Pagas en la página segura de Bold: amunpos nunca ve ni guarda tu tarjeta." : "Tus datos solo los usa el equipo de amunpos para activar tu cuenta. amunpos nunca ve ni guarda tu tarjeta."}</p>
      </div>

      <div className="pago-tique" key={plan + ciclo}>
        <div className="cab"><img src="/logos/amunpos-azul.svg" alt="amunpos" /><span>{hoy}</span></div>
        <div className="mono">
          <div><span>Plan {p.nombre}</span><span>{formatearPrecio(c.mensual)}/mes</span></div>
          <div><span>{c.anual ? "12 meses" : "1 mes"}</span><span>{formatearPrecio(c.sinDescuento)}</span></div>
          {c.anual && <div className="desc"><span>Descuento anual {Math.round(DESCUENTO_ANUAL * 100)} %</span><span>−{formatearPrecio(c.ahorro)}</span></div>}
          <div><span>Renueva</span><span>{renovacion(ciclo)}</span></div>
        </div>
        <div className="sep" />
        <div className="grande"><span>TOTAL</span><b><CifraQueCuenta valor={c.total} /></b></div>
        <div className="mono"><div><span>Moneda</span><span>COP</span></div><div><span>Pasarela</span><img src="/pagos/medios/bold-light.svg" alt="Bold" className="bold-tq" /></div></div>
        <div className="codigo" aria-hidden="true" />
      </div>

      <AuthModal abierto={auth} pestanaInicial="entrar" onCerrar={() => setAuth(false)} config={config} plan={plan}
        alEntrar={() => { setAuth(false); setConSesion(true); }} />
    </div>
  );
}
