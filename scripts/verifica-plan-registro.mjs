/**
 * T5.1 por navegador: pulsar "Empezar" en la tabla de precios abre el REGISTRO
 * con ese plan, y el plan llega al cuerpo de /auth/register.
 *
 * Se comprueba la petición de verdad, no el estado de React: lo que importa es
 * que el plan llegue al servidor, que es quien crea la prueba.
 */
import { chromium } from "playwright"

// El puerto de `astro preview`. 4321 si está libre, 4322 si no.
const WEB = process.env.WEB || "http://localhost:4321"
const problemas = []
const ok = (b, q, d = "") => { console.log(`${b ? "  ok   " : "  FALLA "} ${q}${!b && d ? ` → ${d}` : ""}`); if (!b) problemas.push(q) }

const navegador = await chromium.launch()
const pagina = await navegador.newPage()

let cuerpoRegistro = null
await pagina.route("**/auth/register", async (ruta) => {
  cuerpoRegistro = JSON.parse(ruta.request().postData() || "{}")
  await ruta.fulfill({ status: 201, contentType: "application/json",
    body: JSON.stringify({ success: true, data: { user: { id: "u1", name: "x", email: "a@b.c" }, token: "t" } }) })
})

await pagina.goto(WEB, { waitUntil: "load" })
await pagina.waitForTimeout(1500)

const botones = pagina.locator('[data-auth="crear"][data-plan]')
const cuantos = await botones.count()
ok(cuantos >= 3, `los tres planes abren el registro (${cuantos} botones con plan)`)

const planes = []
for (let i = 0; i < cuantos; i++) planes.push(await botones.nth(i).getAttribute("data-plan"))
ok(planes.includes("estandar") && planes.includes("basico") && planes.includes("profesional"),
   "y cada uno lleva SU plan", planes.join(","))

// Pulsar el de Estándar
const estandar = pagina.locator('[data-auth="crear"][data-plan="estandar"]').first()
await estandar.scrollIntoViewIfNeeded()
await estandar.click()
await pagina.waitForTimeout(900)

const enCrear = await pagina.getByRole("button", { name: /crear cuenta|registrarse/i }).count()
ok(enCrear > 0, "se abre el modal en la pestaña de REGISTRO, no en la de entrar")

// Por NOMBRE de campo, no por tipo: el campo del negocio no lleva
// `type`, así que `input[type=text]` no lo encuentra — se quedaba vacío,
// la validación del navegador bloqueaba el envío y la prueba no probaba
// nada. Sin `.catch()` a la vista: si un campo no existe, tiene que fallar.
await pagina.locator('input[name="name"]').fill("Restaurante Prueba")
await pagina.locator('input[name="email"]').fill("prueba@ejemplo.test")
const claves = pagina.locator('input[type="password"]')
for (let i = 0; i < (await claves.count()); i++) await claves.nth(i).fill("unaClaveLarga123")
await pagina.getByRole("button", { name: /crear cuenta|registrarse/i }).first().click()
await pagina.waitForTimeout(1500)

ok(!!cuerpoRegistro, "el registro llega al servidor")
ok(cuerpoRegistro?.plan === "estandar", "y lleva el plan que se pulsó", JSON.stringify(cuerpoRegistro))

await pagina.screenshot({ path: "scripts/registro-con-plan.png" })
await navegador.close()
console.log(problemas.length ? `\n${problemas.length} PROBLEMA(S)\n` : "\nTODO BIEN\n")
process.exit(problemas.length ? 1 : 0)
