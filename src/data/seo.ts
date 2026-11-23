/**
 * Datos estructurados (schema.org, JSON-LD) de la página de inicio.
 *
 * Es lo que Google lee para entender QUÉ es amunpos y armar un resultado más rico: el nombre y
 * logo de la empresa, el sitio, la aplicación con su precio en COP, las preguntas frecuentes y
 * las secciones de la página. Los enlaces a secciones bajo el resultado ("sitelinks") los decide
 * Google; esto solo se los pone fácil.
 *
 * Todo sale de los mismos datos que pinta la página (precios, preguntas): si cambian ahí,
 * cambian aquí, y Google nunca ve algo distinto de lo que ve el cliente.
 */
import { precios } from "./precios";

export const SITIO = "https://www.amunpos.com";

/** Secciones de la página, en el orden del menú. */
export const SECCIONES = [
  { ruta: "/funciones", nombre: "Funciones", descripcion: "Ventas, caja, inventario, domicilios, equipo y compras con IA." },
  { ruta: "/precios", nombre: "Precios", descripcion: "Básico, Estándar y Profesional, en pesos colombianos." },
  { ruta: "/preguntas-frecuentes", nombre: "Preguntas frecuentes", descripcion: "Precio, facturación, domicilios, sucursales e IA." },
  { ruta: "/contacto", nombre: "Contacto", descripcion: "Escríbenos a hola@amunpos.com." },
];

/** Ruta "Inicio › Página" de una página propia. */
export function migas(nombre: string, ruta: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITIO}/` },
      { "@type": "ListItem", position: 2, name: nombre, item: `${SITIO}${ruta}` },
    ],
  };
}

/** Preguntas frecuentes en el formato que lee Google. */
export function faqDe(preguntas: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: preguntas.map((p) => ({ "@type": "Question", name: p.q, acceptedAnswer: { "@type": "Answer", text: p.a } })),
  };
}

export function datosEstructurados(preguntas: { q: string; a: string }[]) {
  const valores = Object.values(precios);
  const organizacion = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITIO}/#organizacion`,
    name: "amunpos",
    url: SITIO,
    logo: `${SITIO}/icon-512.png`,
    email: "hola@amunpos.com",
    areaServed: { "@type": "Country", name: "Colombia" },
  };
  const sitio = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITIO}/#sitio`,
    name: "amunpos",
    url: SITIO,
    inLanguage: "es-CO",
    publisher: { "@id": `${SITIO}/#organizacion` },
  };
  const aplicacion = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${SITIO}/#app`,
    name: "amunpos",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Punto de venta (POS)",
    operatingSystem: "Web, Android, iOS",
    url: SITIO,
    description:
      "Punto de venta para negocios de comida: ventas, caja con arqueo, inventario, compras con pedido sugerido, domicilios y equipo, con asistente de IA.",
    publisher: { "@id": `${SITIO}/#organizacion` },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "COP",
      lowPrice: Math.min(...valores),
      highPrice: Math.max(...valores),
      offerCount: valores.length,
      url: `${SITIO}/#Planes`,
    },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: preguntas.map((p) => ({
      "@type": "Question",
      name: p.q,
      acceptedAnswer: { "@type": "Answer", text: p.a },
    })),
  };
  const navegacion = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Secciones de amunpos",
    itemListElement: SECCIONES.map((s, i) => ({
      "@type": "SiteNavigationElement",
      position: i + 1,
      name: s.nombre,
      description: s.descripcion,
      url: `${SITIO}${s.ruta}`,
    })),
  };
  return [organizacion, sitio, aplicacion, faq, navegacion];
}
