/**
 * Los precios. Un solo sitio, escritos a mano.
 *
 * **La moneda base es el PESO COLOMBIANO**, no el dólar: es donde está el
 * negocio, donde se factura y donde se decidió cuánto vale esto. El dólar es la
 * conversión para todos los demás.
 *
 * Y "conversión" quiere decir que se calculó **una vez** y se escribió aquí, no
 * que se calcule al vuelo. Un precio que se multiplica por la tasa del día baila
 * cada mañana, sale con céntimos, y quien lo vea dos veces con números distintos
 * deja de fiarse. Cuando el cambio se mueva de verdad, se editan estos números a
 * mano y se despliega.
 *
 * Referencia de la conversión: TRM ≈ 3.157 COP/USD (agosto de 2026).
 *   65.000 ÷ 3.157 = 20,59  → 21
 *  130.000 ÷ 3.157 = 41,18  → 41
 *  185.000 ÷ 3.157 = 58,60  → 59
 */

export type CodigoMoneda = "COP" | "USD";

export const monedas: Record<
  CodigoMoneda,
  { codigo: CodigoMoneda; locale: string; etiqueta: string; paises: string[]; nota: string }
> = {
  COP: {
    codigo: "COP",
    locale: "es-CO",
    // Sin bandera emoji: Windows no las dibuja — 🇨🇴 sale como las letras "CO",
    // que junto al código quedaría "CO COP". El código de moneda basta.
    etiqueta: "Pesos (COP)",
    paises: ["CO"],
    nota: "Precios en pesos colombianos. Se factura en COP.",
  },
  USD: {
    codigo: "USD",
    locale: "en-US",
    etiqueta: "Dólares (USD)",
    // Vacío a propósito: USD es la caída por defecto de todo lo que no sea
    // Colombia. Nadie se ofende por ver dólares; sí por ver la moneda del país
    // de al lado.
    paises: [],
    nota: "Precios en dólares. Se factura en USD.",
  },
};

/** Precio MENSUAL por plan, por moneda. Se decide, no se calcula. */
export const precios: Record<string, Record<CodigoMoneda, number>> = {
  basico: { COP: 65000, USD: 21 },
  estandar: { COP: 130000, USD: 41 },
  profesional: { COP: 185000, USD: 59 },
};

/**
 * Lo que se ahorra pagando por año. Es un descuento, no un precio distinto:
 * sale del mensual, así que basta con cambiarlo aquí.
 */
export const DESCUENTO_ANUAL = 0.2;

/**
 * El precio que se enseña: mensual, o el mensual equivalente si paga por año.
 *
 * Se redondea a entero. En COP porque los céntimos no existen en la práctica, y
 * en USD porque un `$16,8/mes` en una tabla de precios se lee como un error de
 * cuentas, no como una oferta.
 */
export function precioMensual(plan: string, moneda: CodigoMoneda, anual: boolean): number {
  const base = precios[plan]?.[moneda] ?? 0;
  return Math.round(anual ? base * (1 - DESCUENTO_ANUAL) : base);
}

/**
 * Formatea con `Intl`, que ya sabe que en Colombia los miles van con punto
 * (`$ 65.000`) y en Estados Unidos con coma.
 *
 * Sin decimales: `$65.000,00` ocupa el doble y no aporta nada.
 */
export function formatearPrecio(valor: number, moneda: CodigoMoneda): string {
  return new Intl.NumberFormat(monedas[moneda].locale, {
    style: "currency",
    currency: moneda,
    maximumFractionDigits: 0,
  }).format(valor);
}

/**
 * Qué moneda le toca a un país. Todo lo que no sea Colombia ve dólares.
 */
export function monedaDePais(pais: string | null | undefined): CodigoMoneda {
  if (!pais) return "USD";
  const codigo = String(pais).trim().toUpperCase();
  return monedas.COP.paises.includes(codigo) ? "COP" : "USD";
}

const CLAVE_GUARDADA = "amunpos_moneda";

/**
 * La moneda del visitante, por orden de quién manda:
 *
 * 1. **Lo que eligió a mano.** Si tocó el selector, no se le vuelve a mover.
 * 2. **Su zona horaria.** `America/Bogota` → Colombia. Acierta bastante y no
 *    pide permisos ni cuesta una petición.
 * 3. **Dólares.**
 *
 * Lo que NO se usa es la geolocalización del navegador: pide permiso, saca un
 * cartel del sistema encima de la página, y todo para un dato que la zona
 * horaria ya da de sobra. Pedir la ubicación para enseñar un precio es de las
 * cosas que hacen cerrar la pestaña.
 */
export function monedaDelVisitante(): CodigoMoneda {
  if (typeof window === "undefined") return "USD";

  const guardada = window.localStorage?.getItem(CLAVE_GUARDADA);
  if (guardada === "COP" || guardada === "USD") return guardada;

  try {
    const zona = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (/^America\/Bogota$/i.test(zona)) return "COP";
  } catch {
    /* Intl siempre existe, pero si algo raro pasa, dólares. */
  }
  return "USD";
}

export function guardarMoneda(moneda: CodigoMoneda): void {
  try {
    window.localStorage?.setItem(CLAVE_GUARDADA, moneda);
  } catch {
    /* Modo incógnito con el almacenamiento capado: se pierde la elección al
       recargar, pero la página funciona. */
  }
}
