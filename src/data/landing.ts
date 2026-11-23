// Contenido de la web que comparten la portada y las páginas propias (/funciones, /preguntas-frecuentes…).
// Cada promesa está en amunpos-marca/00-empresa/verdad-comercial.md.
import { precioMensual, formatearPrecio, DESCUENTO_ANUAL } from "@/data/precios";
import { RiArchiveDrawerLine, RiBook2Line, RiCalculatorLine, RiCalendarCheckLine, RiCameraLine, RiFileExcel2Line, RiHeart3Line, RiLayoutGridLine, RiMotorbikeLine, RiSparkling2Line, RiStackLine, RiStore2Line, RiTimeLine } from "@remixicon/react";

// Cada promesa de esta página está en amunpos-marca/00-empresa/verdad-comercial.md.
export const beneficios = [
  [
    { i: RiLayoutGridLine, t: "Ventas", d: "Carrito, descuentos, cortesías, pago dividido y mesas con plano." },
    { i: RiStore2Line, t: "Multisucursal", d: "Stock, cajas y accesos por local, con los reportes de todo el negocio." },
    { i: RiStackLine, t: "Inventario", d: "Stock por sucursal, proveedores, movimientos y compras con IA." },
    { i: RiArchiveDrawerLine, t: "Caja y arqueo", d: "Cuenta el efectivo y mira la diferencia antes de cerrar." },
  ],
  [
    { i: RiMotorbikeLine, t: "Domicilios", d: "App de repartidor sin comisión de amunpos, en Estándar y Profesional. El reparto va con tu equipo." },
    { i: RiCalendarCheckLine, t: "Equipo", d: "Horarios con IA y fichaje con PIN, en el plan Profesional." },
    { i: RiHeart3Line, t: "Fidelización", d: "Premia a los clientes que vuelven y no olvides sus cumpleaños." },
    { i: RiCameraLine, t: "Foto de la factura", d: "Sube hasta 5 fotos y se crean los productos. Tú los revisas antes de guardar." },
    { i: RiSparkling2Line, t: "Asistente y reportes", d: "Pregunta por tu negocio y mira tu utilidad. La IA actúa con tu confirmación." },
  ],
];

// Lo que reemplaza (lámina "El problema" del deck). Solo lo que hoy se cumple:
// los pedidos por WhatsApp no están porque el sistema todavía no los recibe.
export const reemplaza = [
  { i: RiBook2Line, t: "El cuaderno", q: "Cada venta mueve caja e inventario" },
  { i: RiFileExcel2Line, t: "El Excel del inventario", q: "Stock al día con cada venta" },
  { i: RiCalculatorLine, t: "La caja que no cuadra", q: "Esperado, contado y diferencia" },
  { i: RiMotorbikeLine, t: "La comisión por domicilio", q: "App de repartidor sin comisión de amunpos" },
  { i: RiTimeLine, t: "La nómina a mano", q: "Horarios y fichaje con PIN" },
];

export const situaciones = [
  { clase: "azul", img: "se-acabo", hora: "Viernes, 7:15 p. m.", dicho: "Jefe, se acabó el pan.", resp: "Mira qué se está acabando y arma el pedido a tiempo." },
  { clase: "", img: "cuanto", hora: "Lunes, el proveedor en la puerta", dicho: "¿Cuánto le pido?", resp: "Pedido sugerido según lo que vendiste en 30 días." },
  { clase: "gris", img: "caja", hora: "Cierre, 10:47 p. m.", dicho: "¿Cuadró la caja?", resp: "Esperado, contado y diferencia, antes de cerrar." },
];

export const preguntas = [
  [
    { q: "¿Cuánto cuesta?", a: `Desde ${formatearPrecio(precioMensual("basico", false))} al mes. Pagando por año ahorras ${Math.round(DESCUENTO_ANUAL * 100)} %. Pruébalo gratis 14 días, sin tarjeta y sin permanencia.` },
    { q: "¿amunpos le envía solo el pedido a mi proveedor?", a: "Hoy te deja el pedido listo: el sistema sugiere las cantidades, abre WhatsApp con el mensaje escrito y tú lo revisas y lo envías." },
    { q: "¿Tiene facturación electrónica?", a: "Todavía no: emite tique con IVA. La facturación electrónica viene en camino. Si tu negocio ya está obligado a emitir documento electrónico, escríbenos antes de empezar." },
    { q: "¿Los domicilios cobran comisión?", a: "amunpos no cobra comisión por pedido. Incluye app de repartidor en Estándar y Profesional. Quien reparte y su pago siguen siendo de tu negocio." },
  ],
  [
    { q: "Ya tengo mis productos en otro sistema. ¿Cómo empiezo?", a: "Sube fotos de tus facturas o una lista y arma tu catálogo. Todavía no hay migración automática desde otro POS." },
    { q: "¿Qué tan real es la IA?", a: "El asistente, el reporte de compra y la lectura de facturas funcionan hoy. El reporte es una estimación y el asistente actúa con tu confirmación." },
    { q: "¿Puedo tener varias sucursales?", a: "Sí. Estándar llega a 3 sucursales y Profesional no tiene límite, con el stock de cada una por separado." },
    { q: "¿Cómo pido ayuda?", a: "Por correo, en hola@amunpos.com." },
  ],
];
