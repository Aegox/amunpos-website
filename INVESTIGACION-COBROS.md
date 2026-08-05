# Cómo cobrar la mensualidad — investigación

Objetivo: cobrar cada mes a la tarjeta o al Nequi del cliente, automáticamente,
y que el dinero caiga en una cuenta bancaria nuestra. Colombia.

Investigado en agosto de 2026. **Las tarifas y los tiempos cambian; hay que
confirmarlos con el comercial antes de firmar nada.**

---

## 1. La conclusión, primero

**Wompi sirve, y es la opción correcta para nosotros.** Es de Bancolombia,
tokeniza tarjeta **y Nequi** —que es justo lo que pediste—, desembolsa a
cualquier cuenta bancaria colombiana y la integración es de las más limpias
del mercado local.

**Pero para tu primer cliente no construyas nada.** Le mandas un link de pago
cada mes y cobras. Son cinco minutos al mes contra dos semanas de desarrollo, y
hasta que no tengas diez o quince clientes el link manual sale ganando. Lo
explico en el punto 5, porque es la parte que más dinero ahorra de todo este
documento.

---

## 2. Cómo funciona técnicamente

Wompi lo llama **fuentes de pago** (`payment sources`). Son tres pasos, y solo
el primero necesita al cliente delante:

**Paso 1 — Tokenizar.** El cliente mete su tarjeta (o autoriza su Nequi) una
sola vez, en un formulario de Wompi. Con la **llave pública**, desde el
navegador. Nos devuelve un *token*. Los datos de la tarjeta **nunca pasan por
nuestros servidores** — eso es lo que nos saca del alcance de PCI DSS, y es un
motivo de peso para no inventarse otra cosa.

**Paso 2 — Crear la fuente de pago.** `POST /v1/payment_sources` con el token,
el correo del cliente y los `acceptance_token` (los consentimientos de política
de privacidad y tratamiento de datos). Con la **llave privada**, desde el
servidor. Devuelve un `payment_source_id` que sí guardamos nosotros.

**Paso 3 — Cobrar.** Cada mes, una transacción contra ese
`payment_source_id`. Sin el cliente delante. Para tarjetas hay que mandar
`recurrent: true` (Credential On File), que es lo que le dice a la franquicia
que es un cobro recurrente autorizado.

Métodos que admiten fuente de pago: **tarjeta crédito/débito, Nequi, DaviPlata
y transferencia Bancolombia.**

### El detalle que cambia el plan de trabajo

**Wompi no programa los cobros. Los programamos nosotros.** La fuente de pago
deja cobrar *cuando queramos*, pero el "cada 30 días" lo tiene que ejecutar algo
nuestro: una tarea que corra a diario, mire qué suscripciones vencen hoy y
dispare la transacción.

Eso no es un detalle menor. La mitad del trabajo de un sistema de suscripciones
no es cobrar: es qué pasa **cuando el cobro falla**. Ver el punto 4.

---

## 3. Cuánto cuesta

| | Plan Avanzado | Plan Gateway |
|---|---|---|
| Comisión | **2,65 % + $700 + IVA** por transacción exitosa | Sin comisión de Wompi; solo la que negocies con Bancolombia |
| Para quién | Lo normal | Más de 2.000 transacciones con medios Bancolombia |
| Desembolso | Día hábil siguiente | — |

QR va al 1 %. Hay tres tarifas según cada cuánto quieras el desembolso —diaria,
semanal o mensual— y **la mensual es la más barata**. Con volumen se negocia.

**Lo que esto significa en plata:** sobre una mensualidad de $99.000, la
comisión son unos **$3.960** (2,65 % = $2.624, más $700, más IVA sobre eso). Un
**4 %** del ticket. En un plan de $29 USD no es dramático, pero conviene tenerlo
en el precio desde el principio y no descubrirlo en el primer corte.

Activar la cuenta tarda **3 a 10 días hábiles** de validación de documentos. Si
quieres cobrar este mes, empieza el trámite hoy.

---

## 4. Lo que nadie cuenta y es la mitad del trabajo

Cobrar es la parte fácil. Esto es lo que hay que decidir **antes** de escribir
código:

**El cobro va a fallar.** Tarjeta sin cupo, tarjeta vencida, Nequi sin saldo.
Con una tasa de fallo normal del 5-10 % mensual, con 100 clientes son 5-10
llamadas al mes. Hace falta decidir: ¿cuántos reintentos? ¿cada cuántos días?
¿en qué momento se corta el servicio? Lo estándar es reintentar a los 1, 3 y 5
días y suspender al séptimo, avisando por correo en cada paso.

**La tarjeta se vence.** Hay que avisar antes, no después de que falle.

**El cliente se da de baja.** Tiene que poder hacerlo solo, desde el POS. Si
para cancelar hay que escribir un correo, acabas con reclamos y con contracargos
— que salen mucho más caros que el mes que querías retener.

**La factura.** Cada cobro es una venta nuestra y hay que facturarla
electrónicamente. Irónico: tenemos el módulo de facturación construido para los
clientes y no lo estamos usando para nosotros mismos.

**El consentimiento.** Los `acceptance_token` de Wompi no son burocracia: son la
prueba de que el cliente autorizó el débito recurrente. Hay que guardarlos con
la fuente de pago, con fecha. Sin eso, un reclamo lo pierdes.

**Idempotencia.** Si la tarea de cobro se ejecuta dos veces por un reintento del
servidor, cobras dos veces. Cada cobro necesita una referencia única por
suscripción y período, y comprobarla antes de disparar.

---

## 5. Para tu primer cliente: no construyas esto

Con **un** cliente, el sistema entero cuesta más de lo que cobra. Tres opciones,
de menos a más trabajo:

**A · Link de pago manual (hoy mismo, cero código).** Wompi permite generar un
link de pago. Se lo mandas por WhatsApp cada mes, paga con tarjeta o Nequi, y
listo. Coste: cinco minutos al mes. Con esto **cobras esta semana**, y de paso
aprendes cómo se comporta el cliente antes de automatizar nada.

**B · Fuente de pago + cobro a mano (un par de días).** El cliente autoriza una
vez, y tú disparas el cobro desde un botón en el panel de administración. Ya no
hay que perseguirlo, pero tampoco hay tarea automática ni reintentos que
mantener. **Este es el punto dulce hasta unos 10-15 clientes.**

**C · Suscripciones completas (una o dos semanas).** Tarea diaria, reintentos,
suspensión, avisos, autogestión de baja, facturación. Merece la pena cuando el
tiempo de perseguir cobros supera al de mantenerlo — o sea, cuando cobrar a mano
se vuelve un trabajo.

**Recomendación: A esta semana, B este mes, C cuando duela.**

---

## 6. Alternativas, por si acaso

**Mercado Pago** — fuerte en cuotas sin interés y con base de usuarios enorme.
Bien para e-commerce; para SaaS recurrente en Colombia no aporta sobre Wompi.

**ePayco** — pasarela colombiana, buen soporte local para pymes. Alternativa
razonable si Wompi pone pegas en la afiliación.

**Stripe Billing** — el mejor sistema de suscripciones que existe, sin discusión:
reintentos, dunning, facturación y portal del cliente, todo resuelto. El problema
es local: no cubre bien **Nequi ni PSE**, que es justo por donde paga la mayoría
en Colombia. Si algún día vendes fuera, Stripe para internacional y Wompi para
Colombia es una combinación normal.

**Treli** — capa de suscripciones **sobre** Wompi. Te ahorra construir el punto 4
entero a cambio de una cuota. Si lo que quieres es no escribir el sistema de
cobros, mirarlo antes de construirlo tú.

---

## 7. Si vamos a construirlo, por dónde

Backend (`AMUN-POS-API`), respetando las convenciones del proyecto:

1. **`Subscription`** — `userId`, plan, importe, moneda, `payment_source_id`,
   estado (`activa` | `en_mora` | `suspendida` | `cancelada`), próximo cobro,
   consentimiento y fecha.
2. **`SubscriptionCharge`** — un registro por intento: período, referencia única,
   estado, respuesta de Wompi. Es el libro de cuentas, y lo que salva cualquier
   reclamo.
3. **`POST /billing/payment-source`** — recibe el token del navegador, crea la
   fuente en Wompi, guarda el `payment_source_id`. `protect` y `userId` **del
   token**, nunca del body.
4. **Webhook de Wompi** — la transacción no es síncrona; el estado definitivo
   llega por webhook, y hay que **verificar la firma** o cualquiera puede
   declarar pagada una suscripción.
5. **Tarea diaria** — cobra lo que vence hoy, con la referencia única por
   período como candado contra el doble cobro.
6. **Front del POS** — alta del medio de pago, estado de la suscripción,
   historial y botón de baja.

Y las llaves: la **pública** puede ir al navegador; la **privada** solo en el
servidor, en variables de entorno, nunca en el repo.

---

## Fuentes

- [Wompi · Fuentes de pago y tokenización (docs)](https://docs.wompi.co/en/docs/colombia/fuentes-de-pago/)
- [Wompi · Métodos de pago](https://docs.wompi.co/en/docs/colombia/metodos-de-pago/)
- [Wompi · Planes y tarifas](https://wompi.com/es/co/planes-tarifas/)
- [Wompi · Tokenización](https://wompi.com/es/co/soluciones/pagos-en-linea/webcheckout-api-plugins/tokenizacion)
- [Wompi · Reglamento de comercios (PDF)](https://wompi.com/assets/downloadble/reglamento-Comercios-Colombia.pdf)
- [Treli · Débito automático con Wompi](https://treli.co/debito-automatico-con-wompi/)
- [Comparativa de pasarelas en Colombia 2026](https://bytechhub.com/blog/pasarelas-de-pago-en-colombia-comparativa-2026/)
