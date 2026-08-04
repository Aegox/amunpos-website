# Qué le falta a la web — propuesta de secciones

Leído el deck (`PLAN-IMPLEMENTACION-DECK.md`) y el guion del pitch
(`AMUN-POS-guion-pitch.md`) de `v0-pos`, y comparado con lo que hay montado.

Todo lo que sigue se construye con el vocabulario que YA tenemos, sin inventar
lenguaje nuevo: reglas a sangre con remates cuadrados (`Regla.astro`), los dos
raíles de la página, los conectores SVG que se trazan solos, el panel oscuro, la
retícula con puntos en los cruces y la tarjeta única de comparación.

---

## 1. Lo que hay hoy

| # | Sección | Qué hace |
|---|---------|----------|
| 1 | Hero | Titular que se escribe + CTA |
| 2 | Selector de producto | 5 pestañas con capturas reales |
| 3 | Asistente | La sesión de IA ocurriendo en vivo |
| 4 | Qué hay dentro | 9 funciones sobre panel oscuro |
| 5 | Planes | Tabla comparativa con conmutador |
| 6 | Lo que vas a lograr | 3 conclusiones |
| 7 | Preguntas frecuentes | 6, en dos grupos |
| 8 | Boletín + pie | |

**El diagnóstico en una frase:** la web enseña muy bien **qué es** el producto y
está floja en **por qué cambiarse**. Se entra directamente al producto sin haber
nombrado el dolor, y no hay ni una sola cifra, ni un logo, ni una comparación
con lo que el visitante usa hoy.

En el deck, en cambio, las tres láminas que más pesan (el problema, el motor de
crecimiento y el modelo de negocio) **no están en la web**.

---

## 2. Las seis que propongo, por orden de lo que mueven

### A. «El rompecabezas» — el problema, antes de la solución `M`

Va **entre el hero y el selector de producto**.

Es la lámina 2 del deck y es lo primero que dice el pitch: *"media docena de
herramientas que no se hablan entre sí"*. La web se la salta entera. Quien llega
en frío no sabe todavía que tiene un problema con nombre.

**Forma:** una fila de seis piezas —POS, Excel, WhatsApp, app de delivery, hoja
de nómina, cuaderno de caja— separadas por las verticales de siempre, cada una
con su icono y una pega de una línea (*"el inventario nunca cuadra"*, *"30 % de
comisión"*). Debajo, una regla a sangre y una sola frase de cierre.

Reutiliza **exactamente** la retícula de «Lo que vas a lograr»: mismas reglas,
mismos remates. Es su reverso —el antes— y por eso conviene que se parezcan.

**Por qué primero:** es la sección más barata de construir de las seis y la que
más cambia el resto. Todo lo que viene después responde a algo ya planteado.

---

### B. «Lo que pagas hoy» — la comparación de costo `L`

Va **justo antes de Planes**.

Es el argumento más fuerte del deck y no está en ninguna parte: *"la competencia
cobra US$39–130 **y encima cobra aparte** el delivery, las mesas y la
facturación"*. Un dueño de negocio no compara funciones: compara la factura.

**Forma:** dos columnas dentro de una sola tarjeta, con la estructura de la
tabla de precios que ya existe. A la izquierda, lo que se paga hoy, sumando:
POS + delivery (con la comisión como línea propia) + facturador + nómina. A la
derecha, amunpos. Abajo, la diferencia en grande.

**Con un control:** un campo de «ventas al mes por delivery» que recalcula la
comisión. Es el único número que el visitante conoce de memoria, y verlo
convertido en dinero perdido hace el trabajo solo.

**Aviso importante:** esto obliga a poner **cifras de la competencia**, y eso hay
que poder sostenerlo. La forma segura es citar tarifas públicas con la fecha de
consulta y hablar de rangos, no de nombres propios. Si no queremos entrar ahí,
la versión sin nombres —«un POS típico», «una app de delivery»— sigue
funcionando y no se puede rebatir.

---

### C. «El círculo» — el motor de crecimiento `M`

Va **después del asistente**.

Lámina 6, la que el propio guion marca como *"lo que nos separa del resto"*: el
marketing trae ventas → las ventas generan datos → los datos mejoran el
marketing. Los demás POS solo **registran**; este además **trae clientes**.

**Forma:** un diagrama de tres nodos unidos en círculo, con el trazo
dibujándose solo — es literalmente el recurso que ya tenemos en el asistente
(`dibuja-flecha`, los conectores con `pathLength`). Es la sección donde la
animación no es adorno: la idea *es* un ciclo, y verlo cerrarse lo explica mejor
que el texto.

**Ojo:** de las tres patas del círculo, fidelización y marketing con IA están
como ❌ en el propio deck. Si se cuenta en presente, se está prometiendo algo que
todavía no existe. O se enmarca como visión declarada («hacia dónde va»), o
espera a que esté.

---

### D. «Se lleva con lo que ya usas» — integraciones `S`

Va **después del selector de producto**.

Es la más barata de todas y quita una objeción entera: *«¿tengo que dejar de
usar Rappi?»*. En `v0-pos/public` ya están los logos de Rappi, DiDi, Didi Food,
DoorDash, Glovo, Deliveroo, Foodpanda, Grubhub, Clover y Excel — se usan en el
módulo de migraciones.

**Forma:** una tira de logos en escala de grises que se encienden al pasar por
encima, entre dos reglas a sangre. Sin carrusel automático: un desfile de logos
moviéndose solo es de las cosas que más gritan «plantilla».

**Legal:** son marcas de terceros. Se pueden mostrar para describir
compatibilidad, pero conviene una nota al pie —*«marcas de sus respectivos
dueños»*— y no dar a entender que hay convenio donde no lo hay.

---

### E. «Vienes de otro POS» — migración `M`

Va **después de Planes**, donde aparece la duda.

Es la objeción número uno de quien ya tiene un sistema: *«llevo tres años de
datos ahí»*. Está enterrada en una pregunta frecuente y merece sección propia,
porque además **ya está construida** (módulo `migraciones`, con IA).

**Forma:** tres pasos con el conector que baja, igual que el remate del
asistente: subes tu archivo → la IA lo entiende → empiezas con todo cargado. Con
la captura real del módulo, que ya sabemos sacar.

---

### F. La app de repartidor `M`

Va **dentro o después de «Qué hay dentro»**.

Hay una app entera (`/driver`) que la web no enseña. Y es justo la prueba de la
frase más rentable del deck: *«sin comisión de terceros»*. Decirlo con una
captura del móvil del repartidor vale más que la línea de texto que hay ahora.

**Forma:** marco de teléfono a la izquierda con la captura real, tres puntos a
la derecha. Ya tenemos el circuito de capturas y `e2e/mobile-screenshots.spec.ts`
en el POS captura a 375×812.

---

## 3. Dos cosas que faltan y NO son secciones

**Un cierre.** La página termina en boletín y pie. No hay una última llamada.
Una banda estrecha antes del pie —titular corto + botón— es media hora de
trabajo y es lo último que ve todo el que baja hasta el final.

**Prueba social.** Ahora mismo no hay ni una. En el hero quité la barra de
avatares justamente porque era fingida. En cuanto haya pilotos con nombre, el
sitio es debajo del hero, y ahí sí suma. Mientras tanto, mejor vacío que falso.

---

## 4. Por dónde empezar

| Orden | Sección | Por qué antes que la siguiente |
|---|---|---|
| 1 | A · El rompecabezas | Barata, y da marco a todo lo demás |
| 2 | D · Integraciones | La más barata de todas, quita una objeción entera |
| 3 | Cierre (CTA final) | Media hora, y lo ve todo el que llega abajo |
| 4 | B · Lo que pagas hoy | La que más convierte, pero necesita decidir las cifras |
| 5 | E · Vienes de otro POS | Ya está construido, solo hay que enseñarlo |
| 6 | F · App de repartidor | Necesita capturas de móvil |
| 7 | C · El círculo | La última: promete cosas que aún no existen |

**Lo que NO propongo, y por qué:** un carrusel de testimonios (no hay
testimonios), contadores animados de métricas (no hay métricas que enseñar), un
blog (mantenimiento para siempre), y un vídeo de producto (caro de hacer bien y
la web ya enseña el producto funcionando).
