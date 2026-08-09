/**
 * Los precios. Un solo sitio, escritos a mano.
 *
 * **Solo pesos colombianos.** Es donde está el negocio, donde se factura y a
 * quién se le vende hoy. Hubo una versión con dólares y selector de moneda, y
 * se quitó a propósito: enseñar una moneda que no se cobra obliga a explicar el
 * cambio, invita a preguntar "¿y en cuánto me sale?", y no le sirve a nadie
 * mientras no haya forma de cobrar en esa moneda.
 *
 * Cuando toque vender fuera, esto vuelve — pero con importes FIJADOS por país,
 * no convertidos: un precio que se multiplica por la tasa del día baila cada
 * mañana, sale con céntimos, y quien lo vea dos veces con números distintos
 * deja de fiarse. Está escrito en PLAN-INTERNACIONALIZACION.md.
 */

/** Precio MENSUAL por plan, en pesos. Se decide, no se calcula. */
export const precios: Record<string, number> = {
  basico: 65000,
  estandar: 130000,
  profesional: 185000,
};

/**
 * Lo que se ahorra pagando por año. Es un descuento, no un precio distinto:
 * sale del mensual, así que basta con cambiarlo aquí.
 */
export const DESCUENTO_ANUAL = 0.2;

/** El precio que se enseña: mensual, o el mensual equivalente si paga por año. */
export function precioMensual(plan: string, anual: boolean): number {
  const base = precios[plan] ?? 0;
  return Math.round(anual ? base * (1 - DESCUENTO_ANUAL) : base);
}

/**
 * `$ 65.000`. Con `Intl`, que ya sabe que en Colombia los miles van con punto.
 *
 * Sin decimales: `$65.000,00` ocupa el doble y no aporta nada.
 */
export function formatearPrecio(valor: number): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(valor);
}
