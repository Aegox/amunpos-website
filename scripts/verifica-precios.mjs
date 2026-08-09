/**
 * Los precios, en el navegador.
 *
 * Se comprueba lo que ve un cliente: los importes de la tabla y que el
 * descuento anual salga de ellos.
 *
 * Los números van escritos a pelo, NO importados de `precios.ts`: comparar el
 * código consigo mismo pasa siempre. Son el precio que se decidió cobrar, así
 * que si alguien los cambia sin querer, esto tiene que enterarse.
 */
import { chromium } from "playwright"

const WEB = process.env.WEB || "http://localhost:4321"
const problemas = []
const ok = (b, q, d = "") => {
  console.log(`${b ? "  ok   " : "  FALLA "} ${q}${!b && d ? ` → ${d}` : ""}`)
  if (!b) problemas.push(q)
}

// Lo que se cobra, al mes, en pesos.
const MENSUAL = { basico: "65.000", estandar: "130.000", profesional: "185.000" }
// Un 20 % menos pagando por año.
const ANUAL = { basico: "52.000", estandar: "104.000", profesional: "148.000" }

const navegador = await chromium.launch()
const ctx = await navegador.newContext({ viewport: { width: 1280, height: 900 } })
const pagina = await ctx.newPage()
await pagina.goto(WEB, { waitUntil: "load" })
await pagina.getByText(/Pagar por año/i).first().scrollIntoViewIfNeeded()
await pagina.waitForTimeout(1200)

const conmutador = pagina.getByRole("switch").locator("visible=true").first()

/**
 * Deja el conmutador donde se pide, en vez de "darle un clic". Suponer en qué
 * estado arranca es lo que hacía comparar los precios anuales contra los
 * mensuales y al revés.
 */
const ponerAnual = async (quiero) => {
  if ((await conmutador.getAttribute("aria-checked")) !== String(quiero)) await conmutador.click()
  await pagina.waitForTimeout(700)
}

const precios = () =>
  pagina
    .locator(".tabular-nums")
    .locator("visible=true")
    .allInnerTexts()
    .then((t) => t.map((x) => x.trim()).filter((x) => /[0-9]/.test(x)).join(" · "))

console.log("— al mes —")
await ponerAnual(false)
let vistos = await precios()
for (const [plan, valor] of Object.entries(MENSUAL)) ok(vistos.includes(valor), `${plan}: ${valor}`, vistos)
ok(!/USD|US\$/.test(vistos), "sin dólares: se cobra en pesos y solo se enseñan pesos", vistos)

console.log("")
console.log("— al año, un 20 % menos —")
await ponerAnual(true)
vistos = await precios()
for (const [plan, valor] of Object.entries(ANUAL)) ok(vistos.includes(valor), `${plan}: ${valor}`, vistos)

await pagina.screenshot({ path: "scripts/precios.png" })
await navegador.close()
console.log("")
console.log(problemas.length ? `${problemas.length} PROBLEMA(S)` : "TODO BIEN")
process.exit(problemas.length ? 1 : 0)
