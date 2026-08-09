/**
 * Los precios, en el navegador.
 *
 * Lo que se comprueba es lo que se le enseña a un cliente: los importes de la
 * tabla, que el descuento anual salga de ellos, y que un visitante de Colombia
 * vea pesos sin tener que tocar nada.
 *
 * Los números van escritos a pelo, NO importados de `precios.ts`: comparar el
 * código consigo mismo pasa siempre. Son el precio que se decidió cobrar, así
 * que si alguien los cambia sin querer, esto tiene que enterarse.
 */
import { chromium } from "playwright"

const WEB = process.env.WEB || "http://localhost:4321"
const problemas = []
const ok = (b, q, d = "") => { console.log(`${b ? "  ok   " : "  FALLA "} ${q}${!b && d ? ` → ${d}` : ""}`); if (!b) problemas.push(q) }

// Lo que se cobra. Mensual.
const COP = { basico: 65000, estandar: 130000, profesional: 185000 }
const USD = { basico: 21, estandar: 41, profesional: 59 }

const navegador = await chromium.launch()

async function abrir(zona) {
  const ctx = await navegador.newContext({ timezoneId: zona })
  const p = await ctx.newPage()
  await p.goto(WEB, { waitUntil: "load" })
  await p.waitForTimeout(1200)
  await p.locator("#Precios, [id*=recio]").first().scrollIntoViewIfNeeded().catch(() => {})
  await p.waitForTimeout(400)
  return p
}

/**
 * Pulsa el conmutador VISIBLE. La tabla se pinta dos veces —una para escritorio
 * y otra para móvil— y `.first()` cazaba la escondida: se pulsaba, no pasaba
 * nada, y la prueba comparaba contra los precios de antes.
 */
const conmutador = (p) => p.getByRole("switch").locator("visible=true").first()

/**
 * Deja el conmutador en el estado que se pide, en vez de "darle un clic".
 * Suponer en qué estado arranca es lo que hacía que la prueba comparase los
 * precios anuales contra los mensuales y al revés.
 */
const ponerAnual = async (p, quiero) => {
  const c = conmutador(p)
  if ((await c.getAttribute("aria-checked")) !== String(quiero)) await c.click()
  await p.waitForTimeout(600)
}

/** Los precios visibles, tal cual los lee un cliente. */
const preciosEnPantalla = (p) =>
  p.locator(".tabular-nums").locator("visible=true").allInnerTexts().then((t) => t.map((x) => x.trim()).filter((x) => /\d/.test(x)))

// ── Colombia ────────────────────────────────────────────────────────
console.log("— un visitante de Bogotá —")
let pagina = await abrir("America/Bogota")
// Mensual, para comparar contra el precio de tabla sin descuento.
await ponerAnual(pagina, false)

let vistos = await preciosEnPantalla(pagina)
ok(vistos.some((v) => v.includes("65.000")), `ve el básico en pesos (${COP.basico})`, vistos.join(" · "))
ok(vistos.some((v) => v.includes("130.000")), `y el estándar (${COP.estandar})`, vistos.join(" · "))
ok(vistos.some((v) => v.includes("185.000")), `y el profesional (${COP.profesional})`, vistos.join(" · "))
ok(!vistos.some((v) => v.includes("$21") || v.includes("$41")), "sin dólares por ningún lado", vistos.join(" · "))

const nota = await pagina.getByText(/se factura en cop/i).count()
ok(nota > 0, "y se le dice en qué moneda se le va a cobrar")

console.log("\n— el descuento anual sale de esos precios —")
await ponerAnual(pagina, true)
vistos = await preciosEnPantalla(pagina)
// 20 % menos: 65.000 → 52.000, 130.000 → 104.000, 185.000 → 148.000
ok(vistos.some((v) => v.includes("52.000")), "básico anual = 52.000", vistos.join(" · "))
ok(vistos.some((v) => v.includes("104.000")), "estándar anual = 104.000", vistos.join(" · "))
ok(vistos.some((v) => v.includes("148.000")), "profesional anual = 148.000", vistos.join(" · "))
await pagina.context().close()

// ── Fuera de Colombia ───────────────────────────────────────────────
console.log("\n— un visitante de fuera —")
pagina = await abrir("America/Mexico_City")
await ponerAnual(pagina, false)
vistos = await preciosEnPantalla(pagina)
ok(vistos.some((v) => v.includes(String(USD.basico))), `ve dólares (${USD.basico})`, vistos.join(" · "))
ok(vistos.some((v) => v.includes(String(USD.estandar))), `y el estándar (${USD.estandar})`, vistos.join(" · "))
ok(!vistos.some((v) => v.includes("65.000")), "y NO la moneda del país de al lado", vistos.join(" · "))

console.log("\n— y puede cambiarla a mano —")
await pagina.getByRole("button", { name: /COP/ }).locator("visible=true").first().click()
vistos = await preciosEnPantalla(pagina)
ok(vistos.some((v) => v.includes("65.000")), "el selector cambia la moneda", vistos.join(" · "))

await pagina.screenshot({ path: "scripts/precios.png", fullPage: false })
await pagina.context().close()
await navegador.close()

console.log(problemas.length ? `\n${problemas.length} PROBLEMA(S)\n` : "\nTODO BIEN\n")
process.exit(problemas.length ? 1 : 0)
