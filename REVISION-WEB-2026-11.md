# Revisión de la web — noviembre 2026

Revisión de `amunpos-website` (rama `astro-untitledui-v2`) en escritorio (1440 px) y móvil
(390 px), contra el sistema de diseño AlignUI que ya usa el POS y contra lo que el producto
hace hoy. Capturas tomadas con Playwright sobre `astro dev`.

## Veredicto

La web está bien hecha y ya habla el idioma visual de AlignUI: raíles con puntos en las
esquinas, eyebrows en píldora, botones con anillo, tipografía Inter con jerarquía por tamaño
y no por peso, secciones oscuras con radio grande. Los comentarios del código muestran que
se midió contra alignui.com. **No hace falta rehacerla desde cero**: lo que la frena no es
el estilo, sino que en varios sitios **dice cosas que el producto no hace todavía**, enseña
un producto viejo y tiene piezas que parecen funcionar pero no hacen nada.

## Prioridad 0 — lo que puede costar un cliente o un problema legal

| # | Problema | Dónde | Recomendación |
|---|---|---|---|
| 1 | **"Facturación electrónica — Emite y envía la factura legal desde la misma venta."** La facturación electrónica DIAN no está implementada: no hay CUFE, XML UBL ni envío a la DIAN en ninguno de los dos repos (se está investigando en `v0-pos/docs/facturacion-electronica-dian.md`). Prometerla en la web es publicidad engañosa y un cliente que la contrate por eso se va. | `WhatsInside.astro` | Quitarla o marcarla **"Próximamente"**. La tabla de precios dice "Facturación con IVA", que sí es cierto: dejarla así. |
| 2 | **"Vendedor autónomo — Una IA atiende el WhatsApp, toma el domicilio y lo factura sola."** Verificado en el código (`AMUN-POS-API/src`): WhatsApp solo se usa para **enviar** (pedidos a proveedores, horarios del equipo, difusión de marketing con enlaces `wa.me`). No hay ningún webhook que **reciba** mensajes, así que esta función no existe. | `WhatsInside.astro` | "Próximamente" o fuera. |
| 3 | **No hay Términos ni Política de privacidad**, pero el modal de registro dice "Al continuar aceptas nuestros términos y la política de privacidad" y el boletín pide correos. En Colombia recoger correos exige autorización y política de tratamiento de datos (Ley 1581 de 2012). | `AuthModal.tsx`, `Footer.astro` | Publicar las dos páginas (texto legal: lo debe revisar un abogado) y enlazarlas desde el modal y el pie. |
| 4 | **El boletín no guarda nada**: el `<form>` no tiene `action` ni manejador. Al enviarlo, la página se recarga con el correo en la URL. | `Footer.astro:100` | Conectarlo a un servicio (o a un endpoint de la API) o quitarlo hasta tenerlo. Mientras tanto, evitar que el correo acabe en la barra de direcciones. |
| 5 | **Redes sociales de mentira**: los iconos llevan a `facebook.com`, `twitter.com`… en genérico, no a los perfiles de AmunPOS. | `Footer.astro:57-60` | Poner los perfiles reales o quitar los iconos. |

## Prioridad 1 — lo que hace parecer el producto menos de lo que es

| # | Problema | Estado |
|---|---|---|
| 6 | **Las 5 capturas del hero son del POS anterior al rediseño** (agosto): enseñan otra interfaz, con "Facturas" en vez de "Comprobantes", y datos con ceros. | **En curso**: se regeneran con el POS actual (AlignUI) y datos de demo realistas de una hamburguesería, sin tocar ninguna base real. |
| 7 | **En móvil la captura del producto no se lee**: una imagen de 1440 px encogida a 390. | **Hecho**: en móvil se muestra a escala legible y encuadrada en el contenido. |
| 8 | **El precio anual confundía**: con "Pagar por año" activado por defecto se ve "$ 52.000 al mes" sin decir que se cobra al año. | **Hecho**: debajo de cada precio, "Facturado al año: $ 624.000" o "Facturado mes a mes". |
| 9 | La demo animada del asistente deja **media tarjeta vacía** ("Resultado") mientras escribe; en una captura estática o en un móvil lento parece rota. | Pendiente: mostrar un resultado de ejemplo desde el principio. |
| 10 | "Pide una demo" solo baja a la sección del boletín. | Pendiente: enlazar a WhatsApp o a un calendario. |

## Prioridad 2 — fidelidad al sistema de diseño

| # | Detalle | Recomendación |
|---|---|---|
| 11 | La web usa una escala de grises neutra (`#1c1c1c`…`#f7f7f7`) y el POS una con punto frío ("slate" de AlignUI, `#0d0c17`…`#fafbfc`). Las dos son de AlignUI, pero al poner capturas del POS dentro de la web se nota la diferencia de temperatura. | Decidir una para toda la marca. Recomiendo la del POS (es la que el cliente verá a diario); el cambio en la web es solo de tokens en `globals.css`. |
| 12 | El ⌛ del titular es un emoji: cambia según el teléfono (Android, iOS, Windows) y AlignUI no usa emoji en interfaz. | Sustituir por un icono de línea (Remix Icon) o quitarlo. |
| 13 | Astro 4 con aviso de versión nueva (7.x). | Actualizar en una rama aparte: es un salto grande. |
| 14 | El sistema de diseño de la web no estaba documentado como el del POS. | Ya existe la referencia común: `Documents/amunpos-marca/` (tokens, marca, redes) y `v0-pos/docs/design-system/`. |

## Lo que está muy bien y hay que conservar

- El texto: corto, concreto, en la voz del negocio ("Uno solo, y todo cuadra.").
- La sección "El problema" con lo tachado: comunica en dos segundos.
- La tabla de precios con el plan recomendado en oscuro y la nota de "varias sucursales".
- Integraciones agrupadas por para qué sirven (domicilios, cobros, de dónde vienes).
- El encuadre de navegador del producto y los raíles con puntos.

## Cambios hechos en esta revisión

- `PricingTable.tsx`: línea "Facturado al año / mes a mes" bajo cada precio.
- `ProductShowcase.tsx`: captura legible en móvil.
- `public/capturas/*.webp`: capturas nuevas del POS rediseñado (en curso).

## Decisiones que necesito del dueño

1. ¿Quito o marco "Próximamente" en Facturación electrónica y Vendedor autónomo?
2. ¿Qué escala de grises adopta la marca: la neutra de la web o la fría del POS?
3. Enlaces reales de redes sociales y destino de "Pide una demo".
4. ¿Con qué servicio se conecta el boletín? (o se quita hasta tenerlo)
