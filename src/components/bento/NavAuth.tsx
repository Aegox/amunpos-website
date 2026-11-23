import { useEffect, useState } from "react";
import { AuthModal, type Pestana } from "../auth/AuthModal";
import { irAlPos, sesionAbierta } from "../../lib/auth";

type Config = { api: string; app: string; googleClientId: string };

/**
 * La barra es estática; esta isla solo abre el registro. Cualquier
 * `[data-auth="entrar|crear"]` de la página lo abre, con `data-plan` si lo trae.
 *
 * Con la sesión ya abierta (cookie compartida en .amunpos.com) no tiene sentido pedir que entre:
 * "Entrar" pasa a "Ir al panel", el "Pruébalo gratis" de la barra se esconde y cualquiera de
 * esos botones lleva al POS (Diego, 2026-11-20). Al volver a la página con "atrás", el
 * navegador la restaura tal como quedó —con el modal abierto—: se cierra y se vuelve a mirar.
 */
const TEXTO_PANEL = "Ir al panel";

function aplicarSesion() {
  const conSesion = sesionAbierta();
  document.querySelectorAll<HTMLElement>('[data-auth="entrar"]').forEach((el) => {
    if (el.dataset.textoOriginal === undefined) el.dataset.textoOriginal = el.innerHTML;
    el.innerHTML = conSesion ? TEXTO_PANEL : el.dataset.textoOriginal;
  });
  // El "Pruébalo gratis" chico de la barra sobra con la sesión abierta; los grandes de la
  // página se quedan (llevan al panel).
  document.querySelectorAll<HTMLElement>('.btn-chico[data-auth="crear"]').forEach((el) => {
    el.hidden = conSesion;
  });
}

export default function NavAuth({ config }: { config: Config }) {
  const [auth, setAuth] = useState<Pestana | null>(null);
  const [plan, setPlan] = useState<string | null>(null);

  useEffect(() => {
    const alHacerClic = (e: MouseEvent) => {
      const destino = (e.target as HTMLElement | null)?.closest?.("[data-auth]");
      if (!destino) return;
      e.preventDefault();
      if (sesionAbierta()) {
        irAlPos(config);
        return;
      }
      // Las cuentas nuevas pasan por la pasarela (Diego, 2026-11-23): el equipo las activa.
      if (destino.getAttribute("data-auth") === "crear") {
        const p = destino.getAttribute("data-plan");
        location.href = `/pagar${p ? `?plan=${encodeURIComponent(p)}` : ""}`;
        return;
      }
      setPlan(destino.getAttribute("data-plan"));
      setAuth("entrar");
    };
    const alVolver = () => {
      setAuth(null);
      setPlan(null);
      aplicarSesion();
    };
    aplicarSesion();
    document.addEventListener("click", alHacerClic);
    window.addEventListener("pageshow", alVolver);
    return () => {
      document.removeEventListener("click", alHacerClic);
      window.removeEventListener("pageshow", alVolver);
    };
  }, [config]);

  return (
    <AuthModal
      abierto={auth !== null}
      pestanaInicial={auth ?? "entrar"}
      onCerrar={() => {
        setAuth(null);
        setPlan(null);
      }}
      config={config}
      plan={plan}
    />
  );
}
