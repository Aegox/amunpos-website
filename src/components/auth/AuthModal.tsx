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

  const campo =
    "h-11 w-full rounded-13 bg-gray-0 pl-10 pr-3 text-paragraph-sm text-gray-900 shadow-button-white outline-none transition placeholder:text-gray-450 focus:ring-2 focus:ring-primary-alpha-16 disabled:opacity-60";

  const contenido = (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-gray-950/40 p-4 backdrop-blur-[2px] sm:items-center"
      onMouseDown={(e) => e.target === e.currentTarget && onCerrar()}
    >
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${idBase}-titulo`}
        className="modal-entra w-full max-w-[420px] rounded-[20px] bg-gray-50 p-2 shadow-button-white"
      >
        <div className="rounded-[16px] bg-gray-0 p-6 ring-1 ring-gray-200 xl:p-7">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id={`${idBase}-titulo`} className="text-title-h6 text-gray-900">
                {pestana === "entrar" ? "Entra a tu negocio" : "Crea tu cuenta"}
              </h2>
              <p className="mt-1 text-paragraph-sm text-gray-600">
                {pestana === "entrar"
                  ? "Con la cuenta que ya tienes."
                  : "Gratis, y sin tarjeta para empezar."}
              </p>
            </div>
            <button
              type="button"
              onClick={onCerrar}
              aria-label="Cerrar"
              className="-mr-1.5 -mt-1.5 flex size-9 shrink-0 items-center justify-center rounded-9 text-gray-400 transition duration-200 hover:bg-gray-50 hover:text-gray-700"
            >
              <RiCloseLine className="size-5" />
            </button>
          </div>

          {/* Las dos pestañas, con la misma pastilla que el resto del sitio. */}
          <div className="mt-5 flex rounded-9 bg-gray-50 p-1" role="tablist">
            {(["entrar", "crear"] as const).map((p) => (
              <button
                key={p}
                type="button"
                role="tab"
                aria-selected={pestana === p}
                onClick={() => setPestana(p)}
                className={cn(
                  "h-8 flex-1 rounded-[7px] text-label-sm transition duration-200",
                  pestana === p ? "bg-gray-0 text-gray-900 shadow-button-white" : "text-gray-600 hover:text-gray-900",
                )}
              >
                {p === "entrar" ? "Iniciar sesión" : "Crear cuenta"}
              </button>
            ))}
          </div>

          <form onSubmit={enviar} className="mt-5 flex flex-col gap-3">
            {pestana === "crear" && (
              <div className="relative">
                <RiUser3Line className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <input
                  ref={pestana === "crear" ? primerCampo : undefined}
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Nombre del negocio"
                  disabled={cargando}
                  className={campo}
                />
              </div>
            )}

            <div className="relative">
              <RiMailLine className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
              <input
                ref={pestana === "entrar" ? primerCampo : undefined}
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Correo electrónico"
                disabled={cargando}
                className={campo}
              />
            </div>

            <div className="relative">
              <RiLockLine className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
              <input
                name="password"
                type={verClave ? "text" : "password"}
                required
                minLength={8}
                autoComplete={pestana === "entrar" ? "current-password" : "new-password"}
                placeholder="Contraseña"
                disabled={cargando}
                className={cn(campo, "pr-10")}
              />
              <button
                type="button"
                onClick={() => setVerClave((v) => !v)}
                aria-label={verClave ? "Ocultar contraseña" : "Ver contraseña"}
                className="absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-9 text-gray-400 transition duration-200 hover:text-gray-700"
              >
                {verClave ? <RiEyeOffLine className="size-4" /> : <RiEyeLine className="size-4" />}
              </button>
            </div>

            {pestana === "crear" && (
              <div className="relative">
                <RiLockLine className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                <input
                  name="password2"
                  type={verClave ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Repite la contraseña"
                  disabled={cargando}
                  className={campo}
                />
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2 rounded-13 bg-error-alpha-10 px-3 py-2.5 text-paragraph-sm text-error-dark">
                <RiErrorWarningLine className="mt-0.5 size-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={cargando}
              className="mt-1 flex h-11 items-center justify-center gap-2 rounded-13 bg-gray-900 text-label-sm text-gray-0 shadow-button-gray transition duration-200 hover:bg-gray-800 disabled:opacity-60"
            >
              {cargando && <RiLoader4Line className="size-4 animate-spin" />}
              {pestana === "entrar" ? "Entrar" : "Crear cuenta"}
            </button>
          </form>

          {config.googleClientId && (
            <>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-gray-0 px-2 text-paragraph-xs text-gray-450">o</span>
                </div>
              </div>
              <BotonGoogle
                texto={pestana === "entrar" ? "Entrar con Google" : "Crear cuenta con Google"}
                deshabilitado={cargando}
                onCredencial={(idToken) => conSesion(() => entrarConGoogle(config, idToken))}
                onFallo={() => setError("No pudimos conectar con Google. Inténtalo otra vez.")}
              />
            </>
          )}

          <p className="mt-5 text-center text-paragraph-xs text-gray-450">
            Al continuar aceptas nuestros términos y la política de privacidad.
          </p>
        </div>
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
