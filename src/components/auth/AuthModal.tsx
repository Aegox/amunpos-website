import React, { useEffect, useId, useRef, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import {
  RiCloseLine,
  RiMailLine,
  RiLockLine,
  RiUser3Line,
  RiEyeLine,
  RiEyeOffLine,
  RiLoader4Line,
  RiErrorWarningLine,
} from "@remixicon/react";
import { cn } from "@/lib/utils";
import { BotonGoogle } from "./BotonGoogle";
import { entrar, registrar, entrarConGoogle, guardarSesion, irAlPos, ErrorAuth, type Config } from "@/lib/auth";

export type Pestana = "entrar" | "crear";

/**
 * El modal de entrar / crear cuenta.
 *
 * La lógica es la que ya funciona en producción; lo que cambia es la piel: aquí
 * se usa el lenguaje de este sitio —radio 13, `shadow-button-white`, los tokens
 * de gris y el azul de marca— en vez de los bordes y sombras de la versión
 * anterior.
 *
 * El formulario de correo se mantiene aunque el POS tenga el suyo: quien llega
 * a la web y ya es cliente espera entrar desde aquí, y mandarlo a otro dominio
 * a repetir el gesto pierde gente por el camino.
 */
export function AuthModal({
  abierto,
  pestanaInicial,
  onCerrar,
  config,
  plan,
}: {
  abierto: boolean;
  pestanaInicial: Pestana;
  onCerrar: () => void;
  config: Config;
  /**
   * El plan que pulsó en la tabla de precios. Viaja hasta el registro para que
   * la prueba de 14 días arranque con ESE plan y no con el más pequeño: quien
   * viene por los domicilios tiene que poder probarlos.
   *
   * Es una preferencia, no una autorización — el servidor descarta cualquier
   * valor que no reconozca.
   */
  plan?: string | null;
}) {
  const [pestana, setPestana] = useState<Pestana>(pestanaInicial);
  const [verClave, setVerClave] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const idBase = useId();
  const panel = useRef<HTMLDivElement>(null);
  const primerCampo = useRef<HTMLInputElement>(null);

  useEffect(() => setPestana(pestanaInicial), [pestanaInicial]);

  // Al abrir: limpiar lo de la vez anterior y llevar el foco dentro. Sin esto
  // el foco se queda en el botón que abrió el modal, detrás, y con el teclado
  // no hay forma de llegar al formulario.
  useEffect(() => {
    if (!abierto) return;
    setError("");
    setCargando(false);
    const t = setTimeout(() => primerCampo.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [abierto, pestana]);

  // Escape cierra, y mientras está abierto no se hace scroll por detrás.
  useEffect(() => {
    if (!abierto) return;
    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCerrar();
      if (e.key !== "Tab" || !panel.current) return;
      // Atrapa el tabulador dentro del modal: si se escapa, el usuario acaba
      // rellenando la página de detrás sin verla.
      const focos = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focos.length) return;
      const primero = focos[0];
      const ultimo = focos[focos.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };
    document.addEventListener("keydown", alPulsar);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", alPulsar);
      document.body.style.overflow = overflow;
    };
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  const conSesion = async (accion: () => Promise<{ user: any; token: string }>) => {
    setError("");
    setCargando(true);
    try {
      guardarSesion(await accion());
      irAlPos(config);
    } catch (e) {
      setError(e instanceof ErrorAuth ? e.message : "Algo salió mal. Inténtalo otra vez.");
      setCargando(false);
    }
  };

  const enviar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const email = String(d.get("email") || "").trim();
    const password = String(d.get("password") || "");
    if (pestana === "entrar") return conSesion(() => entrar(config, email, password));

    const name = String(d.get("name") || "").trim();
    // Se comprueba aquí y no solo en el servidor porque el error de "las
    // contraseñas no coinciden" tarda un viaje de red en volver, y para
    // entonces el campo ya perdió el foco.
    if (password !== String(d.get("password2") || "")) {
      setError("Las dos contraseñas no coinciden.");
      return;
    }
    return conSesion(() => registrar(config, { name, email, password, plan: plan || undefined }));
  };

  // Piel del sistema bento (lienzo "Acceso"): campos grises con etiqueta arriba, el
  // botón azul con la flecha en un círculo blanco, y Google en blanco con borde.
  const campo =
    "h-12 w-full rounded-[14px] border-0 bg-[#F1F2F4] pl-10 pr-3 text-[15px] text-[#0D0C17] outline-none transition placeholder:text-[#7B818C] focus:bg-white focus:ring-2 focus:ring-[#0C78C0] disabled:opacity-60";
  const etiqueta = "mb-1.5 block text-[13px] text-[#4A4F59]";
  const icono = "pointer-events-none absolute left-3.5 top-1/2 size-[18px] -translate-y-1/2 text-[#7B818C]";
  const base = (config.app || "").replace(/\/$/, "");
  const ojo = (
    <button
      type="button"
      onClick={() => setVerClave((v) => !v)}
      aria-label={verClave ? "Ocultar contraseña" : "Ver contraseña"}
      className="absolute right-1.5 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-[#7B818C] transition duration-200 hover:text-[#0D0C17]"
    >
      {verClave ? <RiEyeOffLine className="size-[18px]" /> : <RiEyeLine className="size-[18px]" />}
    </button>
  );

  const contenido = (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#0D0C17]/45 p-3 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onCerrar()}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${idBase}-titulo`}
        className="modal-entra max-h-[calc(100dvh-24px)] w-full max-w-[460px] overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden rounded-[28px] bg-white p-6 text-[#0D0C17] shadow-[0_30px_60px_-20px_rgba(13,12,23,.45)] sm:p-8"
      >
        <div className="flex items-center justify-between gap-3">
          {/* Las dos pestañas en píldora gris, como en el acceso del POS. */}
          <div className="flex flex-1 rounded-full bg-[#F1F2F4] p-1" role="tablist">
            {(["entrar", "crear"] as const).map((p) => (
              <button
                key={p}
                type="button"
                role="tab"
                aria-selected={pestana === p}
                onClick={() => setPestana(p)}
                className={cn(
                  "h-9 flex-1 rounded-full text-[14px] transition duration-200",
                  pestana === p ? "bg-white font-medium text-[#0D0C17] shadow-[0_1px_2px_rgba(13,12,23,.12)]" : "text-[#4A4F59] hover:text-[#0D0C17]",
                )}
              >
                {p === "entrar" ? "Iniciar sesión" : "Crear cuenta"}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar"
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#F1F2F4] text-[#4A4F59] transition duration-200 hover:text-[#0D0C17]"
          >
            <RiCloseLine className="size-5" />
          </button>
        </div>

        <h2 id={`${idBase}-titulo`} className="mt-6 text-[32px] font-medium leading-tight tracking-[-0.04em]">
          {pestana === "entrar" ? "Entra a tu negocio" : "Crea tu negocio"}
        </h2>
        <p className="mt-1 text-[15px] text-[#7B818C]">
          {pestana === "entrar" ? "Con la cuenta que ya tienes." : "Gratis para empezar. Sin tarjeta."}
        </p>

        <form onSubmit={enviar} className="mt-5 flex flex-col gap-3.5">
          {pestana === "crear" && (
            <div>
              <label htmlFor={`${idBase}-nombre`} className={etiqueta}>Nombre del negocio</label>
              <div className="relative">
                <RiUser3Line className={icono} />
                <input id={`${idBase}-nombre`} ref={pestana === "crear" ? primerCampo : undefined} name="name" required autoComplete="organization" placeholder="La Esquina" disabled={cargando} className={campo} />
              </div>
            </div>
          )}

          <div>
            <label htmlFor={`${idBase}-correo`} className={etiqueta}>Correo electrónico</label>
            <div className="relative">
              <RiMailLine className={icono} />
              <input id={`${idBase}-correo`} ref={pestana === "entrar" ? primerCampo : undefined} name="email" type="email" required autoComplete="email" placeholder="tu@negocio.co" disabled={cargando} className={campo} />
            </div>
          </div>

          {pestana === "entrar" ? (
            <div>
              <div className="mb-1.5 flex items-baseline justify-between gap-2">
                <label htmlFor={`${idBase}-clave`} className="text-[13px] text-[#4A4F59]">Contraseña</label>
                {base && <a href={`${base}/auth/forgot-password`} className="text-[13px] font-medium !text-[#0C78C0] hover:!text-[#0A68A8]">¿Olvidaste tu contraseña?</a>}
              </div>
              <div className="relative">
                <RiLockLine className={icono} />
                <input id={`${idBase}-clave`} name="password" type={verClave ? "text" : "password"} required minLength={8} autoComplete="current-password" placeholder="Tu contraseña" disabled={cargando} className={cn(campo, "pr-11")} />
                {ojo}
              </div>
            </div>
          ) : (
            <div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${idBase}-clave`} className={etiqueta}>Contraseña</label>
                  <div className="relative">
                    <RiLockLine className={icono} />
                    <input id={`${idBase}-clave`} name="password" type={verClave ? "text" : "password"} required minLength={8} autoComplete="new-password" disabled={cargando} className={cn(campo, "pr-11")} />
                    {ojo}
                  </div>
                </div>
                <div>
                  <label htmlFor={`${idBase}-clave2`} className={etiqueta}>Confirmar contraseña</label>
                  <div className="relative">
                    <RiLockLine className={icono} />
                    <input id={`${idBase}-clave2`} name="password2" type={verClave ? "text" : "password"} required minLength={8} autoComplete="new-password" disabled={cargando} className={campo} />
                  </div>
                </div>
              </div>
              <p className="mt-1.5 text-[12px] text-[#7B818C]">Mínimo 8 caracteres</p>
            </div>
          )}

          {error && (
            <div role="alert" className="flex items-start gap-2 rounded-[14px] bg-[#FDECEC] px-3.5 py-3 text-[14px] text-[#B4232A]">
              <RiErrorWarningLine className="mt-0.5 size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* El botón de las acciones principales: píldora azul con la flecha en un círculo blanco. */}
          <button
            type="submit"
            disabled={cargando}
            className="mt-1 flex h-[52px] items-center justify-between rounded-full bg-[#0C78C0] pl-5 pr-1.5 text-[16px] font-semibold text-white transition duration-200 hover:bg-[#0A68A8] disabled:opacity-60"
          >
            <span>{pestana === "entrar" ? "Iniciar sesión" : "Crear cuenta"}</span>
            <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-white text-[19px] font-bold text-[#0C78C0]">
              {cargando ? <RiLoader4Line className="size-5 animate-spin" /> : "»"}
            </span>
          </button>
        </form>

        {config.googleClientId && (
          <>
            <div className="my-4 flex items-center gap-3 text-[12px] text-[#7B818C]">
              <span className="h-px flex-1 bg-[#E6E8EB]" />o<span className="h-px flex-1 bg-[#E6E8EB]" />
            </div>
            <BotonGoogle
              texto={pestana === "entrar" ? "Continuar con Google" : "Crear cuenta con Google"}
              deshabilitado={cargando}
              onCredencial={(idToken) => conSesion(() => entrarConGoogle(config, idToken))}
              onFallo={() => setError("No pudimos conectar con Google. Inténtalo otra vez.")}
            />
          </>
        )}

        <p className="mt-5 text-center text-[14px] text-[#4A4F59]">
          {pestana === "entrar" ? (
            <>
              ¿No tienes cuenta?{" "}
              <button type="button" onClick={() => setPestana("crear")} className="font-medium text-[#0C78C0] hover:text-[#0A68A8]">Crear cuenta</button>
            </>
          ) : base ? (
            <a href={`${base}/invite`} className="font-medium !text-[#0C78C0] hover:!text-[#0A68A8]">¿Te invitaron a un negocio? Ingresa tu código →</a>
          ) : null}
        </p>
        <p className="mt-3 text-center text-[12px] text-[#7B818C]">
          Al continuar aceptas nuestros términos y la política de privacidad.
        </p>
      </div>
    </div>
  );

  // El proveedor de Google solo se monta si hay client id: sin él, su script
  // revienta en consola y no se entiende por qué.
  return config.googleClientId ? (
    <GoogleOAuthProvider clientId={config.googleClientId}>{contenido}</GoogleOAuthProvider>
  ) : (
    contenido
  );
}
