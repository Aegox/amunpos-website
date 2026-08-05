/**
 * Autenticación de la web.
 *
 * Es un PORTE de lo que ya funciona en producción (rama `produccion`:
 * `hooks/useUserLogin.js`, `useUserRegister.js` y `useGoogleAuth.js`), no una
 * implementación nueva. El backend ya está hecho y no se toca: `/auth/login`,
 * `/auth/register` y `/auth/google` devuelven todos la misma forma
 * `{ success, data: { user, token } }`.
 *
 * Lo único que se ha unificado es la sesión: en producción cada hook la
 * guardaba a su manera —uno ponía cookies, otro localStorage— y eso es de las
 * cosas que se desincronizan sin que nadie se entere. Aquí la guarda
 * `guardarSesion`, una sola función, para los tres caminos.
 */

export type Config = {
  api: string;
  app: string;
  googleClientId: string;
};

export type Usuario = {
  id: string;
  name?: string;
  email: string;
  [k: string]: unknown;
};

type Respuesta = {
  success?: boolean;
  message?: string;
  error?: string;
  data?: { user: Usuario; token: string };
};

/** Un fallo con mensaje para enseñar, no un volcado de la API. */
export class ErrorAuth extends Error {}

const pedir = async (url: string, cuerpo: unknown): Promise<{ user: Usuario; token: string }> => {
  let r: Response;
  try {
    r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // `include` para que el backend pueda dejar sus cookies de sesión en
      // .amunpos.com, que es como el POS reconoce la sesión sin volver a pedir
      // la contraseña.
      credentials: "include",
      body: JSON.stringify(cuerpo),
    });
  } catch {
    throw new ErrorAuth("No se pudo conectar. Revisa tu conexión e inténtalo otra vez.");
  }

  let datos: Respuesta = {};
  try {
    datos = await r.json();
  } catch {
    /* respuesta sin JSON: se cae al mensaje genérico de abajo */
  }

  // El ESTADO antes que el contenido: un 400 con forma de JSON sigue siendo un
  // fallo, y darlo por bueno es el error clásico con esta API.
  if (!r.ok || datos.success === false) {
    throw new ErrorAuth(datos.message || datos.error || "No pudimos completar la operación.");
  }
  const { user, token } = datos.data || {};
  if (!user || !token) throw new ErrorAuth("La respuesta del servidor llegó incompleta.");
  return { user, token };
};

const ponerCookie = (nombre: string, valor: string, dias: number) => {
  const expira = new Date(Date.now() + dias * 864e5).toUTCString();
  // En producción la cookie va al dominio padre para que el POS —que vive en
  // otro subdominio— la vea. En local no se pone dominio: con `localhost` el
  // navegador rechaza la cookie si se lo pones.
  const enProduccion = location.hostname.endsWith("amunpos.com");
  const dominio = enProduccion ? "domain=.amunpos.com; " : "";
  const seguro = enProduccion ? "Secure; " : "";
  document.cookie = `${nombre}=${encodeURIComponent(valor)}; expires=${expira}; path=/; ${dominio}${seguro}SameSite=Lax`;
};

/** Deja la sesión donde el POS la busca. Los tres caminos pasan por aquí. */
export const guardarSesion = ({ user, token }: { user: Usuario; token: string }) => {
  ponerCookie("auth_token", token, 7);
  ponerCookie("user_data", JSON.stringify(user), 7);
  localStorage.setItem("auth_token", token);
  localStorage.setItem("auth_user", JSON.stringify(user));
  // Lo limpiaba el flujo de producción al entrar; se mantiene para no cambiar
  // el comportamiento del POS.
  localStorage.removeItem("lastAction");
};

export const entrar = (cfg: Config, email: string, password: string) =>
  pedir(`${cfg.api}/auth/login`, { email, password });

export const registrar = (cfg: Config, datos: { name: string; email: string; password: string }) =>
  pedir(`${cfg.api}/auth/register`, datos);

export const entrarConGoogle = (cfg: Config, idToken: string) =>
  pedir(`${cfg.api}/auth/google`, { id_token: idToken });

/** Al POS, que es a donde va todo el mundo después de entrar. */
export const irAlPos = (cfg: Config) => {
  window.location.href = cfg.app || window.location.origin;
};
