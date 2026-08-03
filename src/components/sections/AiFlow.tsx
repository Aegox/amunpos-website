import React, { useState, useEffect, useRef } from "react";
import {
  RiCheckboxCircleFill,
  RiLoader4Line,
  RiCircleLine,
  RiSparkling2Fill,
  RiArrowRightDoubleLine,
  RiTruckLine,
  RiInstagramLine,
} from "@remixicon/react";
import { cn } from "@/lib/utils";

/**
 * El asistente trabajando, paso a paso.
 *
 * Réplica del recurso que alignui.com usa en su sección "Rapid Development":
 * unas pastillas de instrucción que se van completando una a una, unidas por
 * separadores, con líneas que bajan a un panel donde se ve el resultado en vivo.
 *
 * Dos decisiones propias:
 *
 * · **Allí el resultado es código; aquí es la pantalla del POS.** A un
 *   restaurante no le dice nada ver JSX escribiéndose: le dice ver aparecer sus
 *   platos con precio, la alerta de stock y el pedido al proveedor. El panel
 *   izquierdo es la conversación y el derecho lo que quedó hecho.
 *
 * · **Los tres pasos cuentan UNA historia, no tres cosas sueltas.** Igual que
 *   alignui va construyendo una sola pantalla de login, aquí se recorre la vida
 *   del negocio: ENTRAR (montar el inventario sin teclear), REPONER (qué pedirle
 *   al proveedor) y VENDER MÁS (la publicación). Encadenarlos es lo que hace
 *   creíble que el asistente trabaja, en vez de responder preguntas sueltas.
 *
 * Los tres salen del deck y son los que más levantan la ceja de un dueño:
 * alta de productos desde facturas, `suggestPurchase` (velocidad de venta a
 * 30/60/90 días + stock + días de entrega del proveedor) y el generador de
 * marketing con contexto REAL (top vendidos del mes + brand kit + fecha clave).
 * Lo que los hace atractivos es que la IA usa los datos del negocio, no que
 * "tiene IA": por eso cada respuesta dice de dónde sacó la conclusión.
 */

type Fila = { nombre: string; detalle: string; valor?: string };

const pasos: {
  prompt: string;
  promptCorto: string;
  chat: string[];
  titulo: string;
  filas: Fila[];
  pie?: { icono: React.ComponentType<{ className?: string }>; texto: string };
}[] = [
  {
    prompt: "Móntame el inventario con estas facturas",
    promptCorto: "Monta el inventario",
    chat: [
      "Leí las 3 facturas: 47 productos con su costo.",
      "Les puse precio con tu margen y los dejé listos.",
    ],
    titulo: "Productos creados",
    filas: [
      { nombre: "Bandeja paisa", detalle: "Costo $16.000", valor: "$38.000" },
      { nombre: "Ajiaco santafereño", detalle: "Costo $13.000", valor: "$32.000" },
      { nombre: "Limonada de coco", detalle: "Costo $3.500", valor: "$11.000" },
      { nombre: "Cerveza", detalle: "Costo $4.500", valor: "$9.000" },
    ],
    pie: { icono: RiSparkling2Fill, texto: "47 productos · sin teclear ninguno" },
  },
  {
    prompt: "¿Qué le pido al proveedor esta semana?",
    promptCorto: "Qué pedir",
    chat: [
      "Miré cuánto vendes de cada uno en 30, 60 y 90 días.",
      "La Distribuidora tarda 3 días: pedí para cubrirlos.",
    ],
    titulo: "Pedido sugerido",
    filas: [
      { nombre: "Pollo", detalle: "Vendes 12 kg/día · quedan 2,5", valor: "60 kg" },
      { nombre: "Aguacate", detalle: "Vendes 8 kg/día · queda 1", valor: "40 kg" },
      { nombre: "Papa criolla", detalle: "Vendes 9 kg/día · quedan 6", valor: "50 kg" },
    ],
    pie: { icono: RiTruckLine, texto: "$980.000 · tú confirmas antes de enviar" },
  },
  {
    prompt: "Hazme un post para el Día de la Madre",
    promptCorto: "Haz un post",
    chat: [
      "Usé tus 3 platos más vendidos del mes y tu logo.",
      "Copy, hashtags e imagen 1080×1080 listos.",
    ],
    titulo: "Publicación lista",
    filas: [
      { nombre: "Imagen 1080×1080", detalle: "Con tus colores y tu logo" },
      { nombre: "Texto y hashtags", detalle: "3 variantes para elegir" },
      { nombre: "Bandeja paisa", detalle: "Tu plato más vendido", valor: "$38.000" },
    ],
    pie: { icono: RiInstagramLine, texto: "Publicar o compartir por WhatsApp" },
  },
];

/**
 * El ritmo de la escena, en milisegundos.
 *
 * Todo lo que se ve sale de UNA línea de tiempo: se calcula en qué instante
 * pasa cada cosa y luego, a cada tic, se deduce el estado a partir del tiempo
 * transcurrido. La alternativa —una cadena de `setTimeout` encadenados— se
 * desincroniza en cuanto el navegador se atasca un momento, y deja el panel a
 * medio montar sin forma de recuperarse.
 */
const RITMO = {
  antesDeTeclear: 450,
  porLetraPrompt: 34,
  antesDeEnviar: 380,
  pensando: 700,
  porLetraRespuesta: 19,
  entreLineas: 280,
  entreFilas: 240,
  antesDelPie: 320,
  alFinal: 2000,
};

type Guion = {
  tecleaDesde: number;
  tecleaHasta: number;
  envia: number;
  lineas: { desde: number; hasta: number }[];
  filas: number[];
  pie: number;
  total: number;
};

/** Cuándo pasa cada cosa en un paso concreto. */
function guionDe(p: (typeof pasos)[number]): Guion {
  let t = RITMO.antesDeTeclear;
  const tecleaDesde = t;
  t += p.prompt.length * RITMO.porLetraPrompt;
  const tecleaHasta = t;
  t += RITMO.antesDeEnviar;
  const envia = t;
  t += RITMO.pensando;

  const lineas: { desde: number; hasta: number }[] = [];
  for (const l of p.chat) {
    const desde = t;
    const hasta = desde + l.length * RITMO.porLetraRespuesta;
    lineas.push({ desde, hasta });
    t = hasta + RITMO.entreLineas;
  }

  // El resultado se va llenando MIENTRAS el asistente sigue hablando: es lo que
  // hace que parezca que trabaja y no que primero contesta y luego actúa.
  const filas = p.filas.map((_, i) => lineas[0].hasta + i * RITMO.entreFilas);
  const pie = Math.max(t, filas[filas.length - 1] + RITMO.entreFilas) + RITMO.antesDelPie;
  return { tecleaDesde, tecleaHasta, envia, lineas, filas, pie, total: pie + RITMO.alFinal };
}

const guiones = pasos.map(guionDe);

/** Cuántos caracteres van escritos de un tramo a estas alturas. */
const letrasHasta = (t: number, desde: number, porLetra: number, total: number) =>
  Math.max(0, Math.min(total, Math.floor((t - desde) / porLetra)));

// La cola del haz: 8 trocitos del 3 % del contorno cada uno, encadenados, que
// suman una línea de un 24 % que se va apagando hacia atrás.
const TRAZOS = 8;
const LARGO_TRAZO = 3;

export default function AiFlow() {
  const [paso, setPaso] = useState(0);
  // Arranca cuando la sección se ve por primera vez, y a partir de ahí NO se
  // vuelve a tocar.
  //
  // Antes esto seguía el ir y venir de la visibilidad. El problema es que el
  // recorrido del haz lo lleva el CSS y el relevo de paso lo lleva este
  // temporizador: cada vez que la sección bajaba del 25 % visible —cosa que
  // pasa sin más al hacer scroll— el temporizador se reiniciaba y el haz no,
  // así que el haz terminaba su vuelta y se quedaba QUIETO en el borde de
  // arriba esperando un relevo que ya no llegaba a tiempo. Se veía exactamente
  // como una animación rota.
  //
  // Enganchando una sola vez, los dos relojes salen juntos y no se separan.
  const [visible, setVisible] = useState(false);
  const seccionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodo = seccionRef.current;
    if (!nodo) return;
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        setVisible(true);
        observador.disconnect();
      },
      { threshold: 0.25 },
    );
    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  // Depende de `paso` a propósito: así el temporizador se REINICIA cada vez que
  // cambia el paso, incluido cuando lo cambia el usuario pinchando. Con un
  // intervalo fijo, pinchar una pastilla podía saltar a la siguiente a los
  // pocos milisegundos, porque el reloj seguía corriendo por su cuenta.
  //
  // Avanza TAMBIÉN con "reducir movimiento" activado. Antes salía antes de
  // empezar, y en un equipo con esa opción puesta el recorrido no pasaba nunca
  // de la primera instrucción: parecía roto. Reducir movimiento significa que no
  // haya desplazamientos que mareen — el haz girando y el texto escribiéndose ya
  // los apaga el CSS —, no que el contenido se quede congelado. Con la opción
  // puesta cada paso dura más, para dar tiempo a leerlo sin animación que guíe.
  useEffect(() => {
    if (!visible) return;
    // La duración la manda el guion: cada instrucción tarda lo que tarde en
    // teclearse y contestarse. Con un valor fijo, la más larga se cortaba a
    // medias y la más corta se quedaba parada esperando.
    const t = setTimeout(() => setPaso((p) => (p + 1) % pasos.length), guiones[paso].total);
    return () => clearTimeout(t);
  }, [visible, paso]);

  const actual = pasos[paso];

  return (
    <section ref={seccionRef} className="w-full px-5 py-16 xl:py-24">
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center">
        {/* ── Encabezado ── */}
        <span className="flex h-8 items-center gap-1.5 rounded-9 bg-gray-0 pl-2 pr-3 text-label-sm text-gray-700 shadow-button-white">
          <RiSparkling2Fill className="size-4 text-ai-base" />
          Asistente
        </span>
        <h2 className="mt-4 text-balance text-center text-title-h5 text-gray-950 md:text-title-h4 xl:text-title-h3">
          Dile lo que necesitas.
          <br className="hidden sm:inline" /> Lo deja hecho.
        </h2>
        <p className="mt-3 max-w-xl text-pretty text-center text-paragraph-md text-gray-600 xl:text-paragraph-lg">
          No es un chat que responde: usa los datos de tu negocio. Monta el
          inventario, calcula qué pedirle al proveedor y arma tus publicaciones.
        </p>

        {/* ── Las tres instrucciones ── */}
        <div className="mt-9 flex w-full items-center justify-start gap-2 overflow-x-auto px-1 py-2 md:justify-center md:gap-1 md:overflow-visible xl:mt-12">
          {pasos.map((p, i) => {
            const hecho = i < paso;
            const trabajando = i === paso;
            return (
              <React.Fragment key={p.prompt}>
                {i > 0 && (
                  <RiArrowRightDoubleLine
                    aria-hidden="true"
                    className="hidden size-5 shrink-0 text-gray-300 md:block"
                  />
                )}
                <button
                  type="button"
                  onClick={() => setPaso(i)}
                  aria-current={trabajando}
                  className={cn(
                    "relative flex h-11 shrink-0 items-center gap-3 whitespace-nowrap rounded-full pl-[15px] pr-4 text-label-sm outline-none transition duration-500 ease-out focus-visible:ring-2 focus-visible:ring-primary-base/40",
                    trabajando
                      ? "bg-gray-0 text-gray-800 shadow-[0_4px_8px_rgba(41,41,41,.06),0_2px_4px_rgba(41,41,41,.04),0_1px_2px_rgba(41,41,41,.04)]"
                      : hecho
                        ? "bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-200"
                        : "bg-gray-50 text-gray-500 ring-1 ring-inset ring-gray-200",
                  )}
                >
                  {/* El haz recorriendo el borde, solo en la pastilla activa.
                      Es el MISMO recurso que las chispas que caen por los lados
                      de la sección oscura, puesto sobre un contorno redondeado:
                      una cabeza sólida con la cola desvaneciéndose detrás.

                      Antes era un cónico girando detrás de una máscara. Girar
                      un cono reparte el ángulo por igual, pero la pastilla es
                      muy ancha y muy baja: el mismo ángulo barría media
                      pastilla en los lados largos y casi nada en los extremos,
                      así que no se veía un haz dando la vuelta sino dos rayas
                      rectas parpadeando arriba y abajo. Recorrer el trazo va
                      por la longitud real del contorno y sale a velocidad
                      constante.

                      El degradado no se puede hacer con un `stroke` en
                      degradado: ese se queda quieto en el espacio y el trocito
                      cambiaría de color según por dónde pasa, en vez de llevar
                      su cola encima. Se hace con varios trocitos consecutivos,
                      cada uno un poco más atrás en el tiempo y un poco más
                      apagado; con las puntas rectas encajan unos con otros y se
                      leen como una sola línea que se difumina.

                      `pathLength=100` normaliza el perímetro: cada trocito mide
                      el mismo porcentaje en las tres pastillas aunque cada una
                      tenga un ancho distinto. */}
                  {trabajando && (
                    <svg
                      aria-hidden="true"
                      className="haz-entra pointer-events-none absolute inset-0 size-full overflow-visible"
                      fill="none"
                    >
                      {Array.from({ length: TRAZOS }).map((_, k) => (
                        <rect
                          key={k}
                          className="haz-borde"
                          x="0"
                          y="0"
                          width="100%"
                          height="100%"
                          // la mitad de `h-11` (44 px): así el trazo cae justo
                          // sobre el `rounded-full` del botón
                          rx="22"
                          ry="22"
                          pathLength={100}
                          stroke="var(--ai-base)"
                          strokeWidth="1.5"
                          strokeDasharray={`${LARGO_TRAZO} ${100 - LARGO_TRAZO}`}
                          strokeOpacity={1 - k / TRAZOS}
                          style={{
                            // La vuelta del haz dura lo que dure este paso,
                            // que ya no es fijo: cada instrucción tarda lo que
                            // tarde en teclearse y contestarse.
                            ["--vuelta" as string]: `${guiones[i].total}ms`,
                            // Retardo negativo = adelantar la fase. El trocito 0
                            // va en cabeza y cada siguiente se queda justo un
                            // largo por detrás, que es lo que forma la cola.
                            animationDelay: `${-(guiones[i].total - k * LARGO_TRAZO * (guiones[i].total / 100))}ms`,
                          }}
                        />
                      ))}
                    </svg>
                  )}

                  <span className="relative grid size-4 shrink-0 place-items-center">
                    <span key={`${i}-${hecho}-${trabajando}`} className="icono-entra col-start-1 row-start-1">
                      {hecho ? (
                        <RiCheckboxCircleFill className="size-4 text-ai-base" />
                      ) : trabajando ? (
                        <RiLoader4Line className="size-4 animate-spin text-ai-base" />
                      ) : (
                        <RiCircleLine className="size-4 text-gray-400" />
                      )}
                    </span>
                  </span>

                  <span className="relative md:hidden">{p.promptCorto}</span>
                  <span className="relative hidden md:inline">{p.prompt}</span>
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* ── Las líneas que bajan al panel ── */}
        {/* El viewBox mide lo mismo que el panel (1004) para que las patas
            aterricen justo en sus esquinas. Con un ancho menor las líneas se
            quedaban colgando en el aire y el conjunto no se leía como una cosa
            conectada. `preserveAspectRatio=none` deja que se estiren a lo ancho
            sin deformar el grosor del trazo (vector-effect lo mantiene en 1px). */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1004 48"
          preserveAspectRatio="none"
          className="hidden h-12 w-full max-w-[1004px] xl:block"
          fill="none"
        >
          {[
            "M2 48V40C2 31.16 9.16 24 18 24H486C494.84 24 502 16.84 502 8V0",
            "M502 30V48",
            "M1002 48V40C1002 31.16 994.84 24 986 24H518C509.16 24 502 16.84 502 8V0",
          ].map((d) => (
            <path
              key={d}
              d={d}
              className="traza-linea stroke-gray-200"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              pathLength="1"
            />
          ))}
        </svg>

        {/* ── El panel: la sesion ocurriendo, con su propio reloj ── */}
        <PanelVivo paso={paso} arrancado={visible} />

        {/* ── El remate: qué gana el negocio ──
            En alignui.com el recorrido no termina en el panel: baja otro
            conector y cierra con tres frases de resultado. Es lo que convierte
            la demo en argumento — enseñar la máquina funcionando no dice nada
            si no rematas con lo que el dueño se lleva.

            Los tres corresponden a los tres pasos de arriba (montar, reponer,
            vender), así que la sección entra y sale con la misma idea. */}
        {/* Aquí el conector va al revés que el de arriba: aquel juntaba tres
            instrucciones en un panel, este REPARTE un panel en tres resultados.
            Por eso las patas no acaban en las esquinas sino en el centro de
            cada columna: con `gap-6` sobre 1004 la columna mide 318,67, así que
            los centros caen en 159, 502 y 845. Si acabaran en las esquinas las
            líneas apuntarían al vacío entre dos textos. */}
        <svg
          aria-hidden="true"
          data-conector-abajo
          viewBox="0 0 1004 48"
          preserveAspectRatio="none"
          className="mt-2 hidden h-12 w-full max-w-[1004px] xl:block"
          fill="none"
        >
          {[
            "M502 0v8c0 8.84-7.16 16-16 16H175c-8.84 0-16 7.16-16 16v8",
            "M502 0v48",
            "M502 0v8c0 8.84 7.16 16 16 16h311c8.84 0 16 7.16 16 16v8",
          ].map((d) => (
            <path
              key={d}
              d={d}
              className="traza-linea stroke-gray-200"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              pathLength="1"
            />
          ))}
        </svg>

        <div data-remate className="mt-10 grid w-full max-w-[1004px] gap-8 md:grid-cols-3 md:gap-6 xl:mt-4">
          {[
            {
              icono: RiSparkling2Fill,
              titulo: "Abres sin teclear",
              texto: "El inventario entra desde las facturas que ya tienes, no a mano producto por producto.",
            },
            {
              icono: RiTruckLine,
              titulo: "No se te acaba nada",
              texto: "Te avisa con tu ritmo real de venta y los días que tarda tu proveedor.",
            },
            {
              icono: RiInstagramLine,
              titulo: "Publicas sin diseñador",
              texto: "Imagen y texto con tu marca, hechos con los platos que más vendes.",
            },
          ].map((r, i) => (
            <div
              key={r.titulo}
              className="remate-entra flex gap-4 md:flex-col md:gap-0 md:text-center"
              style={{ ["--i" as string]: i + 1 }}
            >
              <r.icono className="size-6 shrink-0 text-ai-base md:mx-auto" />
              <div className="md:mt-4">
                <div className="text-label-md text-gray-900">{r.titulo}</div>
                <p className="mt-1 text-pretty text-paragraph-sm text-gray-600">{r.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * El panel donde se ve la sesión OCURRIENDO: se teclea la instrucción, se
 * envía, el asistente piensa, contesta escribiendo, y el resultado se va
 * llenando mientras tanto.
 *
 * Todo sale de UNA línea de tiempo: a cada tic se deduce el estado a partir de
 * los milisegundos transcurridos. La alternativa —una cadena de `setTimeout`
 * encadenados— se desincroniza en cuanto el navegador se atasca un momento y
 * deja el panel a medio montar, sin forma de recuperarse. Aquí, si un tic llega
 * tarde, el siguiente ya pinta lo que toca a esa altura.
 *
 * Vive aparte y con su propio reloj para que las veinticinco pasadas por
 * segundo no arrastren a repintarse también las pastillas, los conectores y el
 * remate, que no cambian en todo el paso.
 */
function PanelVivo({ paso, arrancado }: { paso: number; arrancado: boolean }) {
  const actual = pasos[paso];
  const guion = guiones[paso];
  const [t, setT] = useState(0);

  useEffect(() => {
    if (!arrancado) return;
    setT(0);
    const inicio = performance.now();
    // 40 ms basta de sobra para que el texto se vea salir letra a letra, y
    // cuesta la cuarta parte que ir a 60 fotogramas por segundo.
    const id = setInterval(() => setT(performance.now() - inicio), 40);
    return () => clearInterval(id);
  }, [paso, arrancado]);

  const tecleado = actual.prompt.slice(
    0,
    letrasHasta(t, guion.tecleaDesde, RITMO.porLetraPrompt, actual.prompt.length),
  );
  const enviado = t >= guion.envia;
  const pensando = enviado && t < guion.lineas[0].desde;
  const filasVisibles = guion.filas.filter((m) => t >= m).length;
  const piePuesto = t >= guion.pie;

  return (
    <div className="mt-6 w-full max-w-[1004px] rounded-[24px] bg-gray-50 p-2 ring-1 ring-gray-200 xl:mt-0 xl:rounded-[28px] xl:p-2.5">
      <div className="grid w-full items-center px-3 py-2.5 md:grid-cols-[minmax(0,1fr)_360px] xl:px-4 xl:py-3">
        <div className="flex items-center gap-1.5 text-label-sm text-gray-600">
          <RiSparkling2Fill className="size-4 text-ai-base" />
          Asistente
          <span className="ml-1 size-1.5 shrink-0 rounded-full bg-ai-base" />
        </div>
        <div className="hidden items-center gap-1.5 pl-5 text-label-sm text-gray-450 md:flex">
          Resultado
        </div>
      </div>

      <div
        /* Alto RESERVADO para el paso más largo. Ahora el contenido aparece por
           partes, así que sin esto el panel estaría creciendo todo el rato y la
           página entera daría saltos cada pocos segundos. */
        className="grid min-h-[610px] w-full overflow-hidden rounded-[16px] bg-gray-0 md:min-h-[370px] md:grid-cols-[minmax(0,1fr)_360px] xl:rounded-[20px]"
        style={{
          boxShadow:
            "0 1px 1px .5px rgba(41,41,41,.04), 0 6px 6px -3px rgba(41,41,41,.04), 0 24px 24px -12px rgba(41,41,41,.04)",
        }}
      >
        {/* Conversación */}
        <div className="relative flex min-h-[240px] flex-col gap-3 p-5 md:min-h-[300px] md:border-r md:border-gray-100 xl:p-7">
          {enviado && (
            <div className="fila-entra self-end rounded-2xl rounded-br-md bg-gray-900 px-4 py-2.5 text-label-sm text-gray-0">
              {actual.prompt}
            </div>
          )}

          {pensando && (
            /* Los tres puntos mientras piensa. Sin esa pausa la respuesta salía
               pegada al envío y no se leía como algo que alguien escribe, sino
               como un bloque que aparece de golpe. */
            <div className="flex items-center gap-2.5">
              <span className="grid size-6 shrink-0 place-items-center rounded-full bg-ai-light">
                <RiSparkling2Fill className="size-3.5 text-ai-base" />
              </span>
              <span className="flex items-center gap-1 rounded-full bg-gray-25 px-3 py-2 ring-1 ring-gray-100">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="punto-pensando size-1.5 rounded-full bg-gray-400"
                    style={{ ["--i" as string]: i }}
                  />
                ))}
              </span>
            </div>
          )}

          {actual.chat.map((linea, i) => {
            const tramo = guion.lineas[i];
            if (t < tramo.desde) return null;
            const escrito = linea.slice(
              0,
              letrasHasta(t, tramo.desde, RITMO.porLetraRespuesta, linea.length),
            );
            return (
              <div key={String(paso) + "-" + String(i)} className="flex max-w-[92%] gap-2.5">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ai-light">
                  <RiSparkling2Fill className="size-3.5 text-ai-base" />
                </span>
                <span className="text-paragraph-sm text-gray-700">
                  {escrito}
                  {/* El cursor, solo en la línea que se está escribiendo. */}
                  {t < tramo.hasta && (
                    <span className="ml-px inline-block h-[1em] w-px translate-y-[3px] bg-ai-base" />
                  )}
                </span>
              </div>
            );
          })}

          {/* La barra de escritura: aquí es donde se ve teclear la instrucción
              antes de enviarla. Es lo que convierte el panel en una sesión y no
              en una captura de resultados. */}
          <div className="mt-auto flex items-center gap-2 rounded-full bg-gray-25 px-4 py-2.5 ring-1 ring-gray-200">
            <span className="min-w-0 truncate text-paragraph-sm text-gray-800">
              {enviado ? <span className="text-gray-450">Escribe lo que necesitas</span> : tecleado}
            </span>
            {!enviado && <span className="animate-caret h-4 w-px shrink-0 bg-ai-base" />}
          </div>
        </div>

        {/* Resultado */}
        <div className="flex flex-col border-t border-gray-100 p-5 md:border-t-0 xl:p-6">
          <div className="text-subheading-xs uppercase tracking-wide text-gray-450">
            {actual.titulo}
          </div>

          <div className="mt-3 flex flex-col gap-2">
            {actual.filas.slice(0, filasVisibles).map((f) => (
              <div
                key={String(paso) + "-" + f.nombre}
                className="fila-entra flex items-center justify-between gap-3 rounded-xl bg-gray-25 px-3 py-2.5 ring-1 ring-gray-100"
              >
                <div className="min-w-0">
                  <div className="truncate text-label-sm text-gray-900">{f.nombre}</div>
                  <div className="text-paragraph-xs text-gray-500">{f.detalle}</div>
                </div>
                {f.valor && (
                  <div className="shrink-0 text-label-sm tabular-nums text-gray-700">{f.valor}</div>
                )}
              </div>
            ))}
          </div>

          {actual.pie && piePuesto && (
            <div className="fila-entra mt-3 flex items-center gap-2 rounded-xl bg-ai-light px-3 py-2.5 text-label-sm text-ai-dark">
              <actual.pie.icono className="size-4 shrink-0" />
              {actual.pie.texto}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
