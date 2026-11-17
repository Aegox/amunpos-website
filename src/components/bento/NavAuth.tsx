import { useEffect, useState } from "react";
import { AuthModal, type Pestana } from "../auth/AuthModal";

type Config = { api: string; app: string; googleClientId: string };

/**
 * La barra es estática; esta isla solo abre el registro. Cualquier
 * `[data-auth="entrar|crear"]` de la página lo abre, con `data-plan` si lo trae.
 */
export default function NavAuth({ config }: { config: Config }) {
  const [auth, setAuth] = useState<Pestana | null>(null);
  const [plan, setPlan] = useState<string | null>(null);

  useEffect(() => {
    const alHacerClic = (e: MouseEvent) => {
      const destino = (e.target as HTMLElement | null)?.closest?.("[data-auth]");
      if (!destino) return;
      e.preventDefault();
      setPlan(destino.getAttribute("data-plan"));
      setAuth(destino.getAttribute("data-auth") === "crear" ? "crear" : "entrar");
    };
    document.addEventListener("click", alHacerClic);
    return () => document.removeEventListener("click", alHacerClic);
  }, []);

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
