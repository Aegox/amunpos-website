// Movimiento de la web bento: apariciones al hacer scroll, contadores y el
// paralaje del hero. Los estilos están en styles/movimiento.css.
// Sin IntersectionObserver la clase js-revela no existe y todo queda quieto y visible.
const conMovimiento = document.documentElement.classList.contains("js-revela");

// Escalona los elementos que aparecen juntos: cada hermano con data-revela
// recibe su turno en --i (máximo 6, para que nada tarde demasiado).
document.querySelectorAll<HTMLElement>("[data-revela]").forEach((el) => {
  const hermanos = Array.from(el.parentElement?.children ?? []).filter((h) => h.hasAttribute("data-revela"));
  if (hermanos.length > 1) el.style.setProperty("--i", String(Math.min(hermanos.indexOf(el), 6)));
});

// Cuenta de 0 al número que ya está escrito, respetando "$" y los puntos de mil.
const conPuntos = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
function contar(el: HTMLElement) {
  const texto = el.textContent ?? "";
  const m = texto.match(/\d[\d.]*/);
  if (!m) return;
  const meta = Number(m[0].replace(/\./g, ""));
  const puntos = m[0].includes(".");
  const antes = texto.slice(0, m.index), despues = texto.slice((m.index ?? 0) + m[0].length);
  const dura = 1600;
  const inicio = performance.now() + Number(el.dataset.retraso ?? 0);
  const paso = (ahora: number) => {
    const t = Math.min(Math.max((ahora - inicio) / dura, 0), 1);
    const n = Math.round(meta * (1 - Math.pow(1 - t, 4)));
    el.textContent = antes + (puntos ? conPuntos(n) : String(n)) + despues;
    if (t < 1) requestAnimationFrame(paso);
  };
  el.textContent = antes + "0" + despues;
  requestAnimationFrame(paso);
}

if (conMovimiento) {
  const vistos = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("visible");
        e.target.querySelectorAll<HTMLElement>(".cuenta").forEach(contar);
        vistos.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  );
  document.querySelectorAll("[data-revela], .panel, .situacion, .flotante-3, .cierre").forEach((el) => vistos.observe(el));

  // Paralaje suave de los íconos del hero y una luz azul que sigue al mouse.
  const hero = document.querySelector<HTMLElement>(".hero-marco");
  if (hero && matchMedia("(pointer: fine)").matches) {
    let cuadro = 0;
    hero.addEventListener("pointermove", (ev) => {
      cancelAnimationFrame(cuadro);
      cuadro = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width, y = (ev.clientY - r.top) / r.height;
        hero.style.setProperty("--px", (x * 2 - 1).toFixed(3));
        hero.style.setProperty("--py", (y * 2 - 1).toFixed(3));
        hero.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
        hero.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
        hero.classList.add("con-luz");
      });
    });
    hero.addEventListener("pointerleave", () => {
      cancelAnimationFrame(cuadro);
      hero.style.setProperty("--px", "0");
      hero.style.setProperty("--py", "0");
      hero.classList.remove("con-luz");
    });
  }

  // El precio cambia con un pequeño fundido al pasar de mensual a anual.
  document.querySelectorAll("[data-periodo]").forEach((b) =>
    b.addEventListener("click", () => {
      document.querySelectorAll<HTMLElement>("[data-mensual]").forEach((p) => {
        p.classList.remove("cambia");
        void p.offsetWidth;
        p.classList.add("cambia");
      });
    }),
  );

} else {
  document.querySelectorAll("[data-revela]").forEach((el) => el.classList.add("visible"));
}

// "Tres momentos": el carrusel pasa solo a la siguiente situación cada pocos
// segundos y tiene un punto por situación para saltar a ella. Se detiene mientras
// el visitante lo toca, lo enfoca o lo tiene fuera de pantalla, y vuelve a la
// primera al llegar al final.
const carrusel = document.querySelector<HTMLElement>(".carrusel");
const tarjetas = Array.from(carrusel?.querySelectorAll<HTMLElement>(".situacion") ?? []);
const puntos = Array.from(document.querySelectorAll<HTMLButtonElement>(".puntos-carrusel button"));
if (carrusel && tarjetas.length > 1) {
  let enPantalla = false;
  let quietoHasta = 0;
  const centroDe = (t: HTMLElement) =>
    t.getBoundingClientRect().left - carrusel.getBoundingClientRect().left + carrusel.scrollLeft + t.offsetWidth / 2;
  const actual = () => {
    const medio = carrusel.scrollLeft + carrusel.clientWidth / 2;
    let mejor = 0;
    tarjetas.forEach((t, k) => { if (Math.abs(centroDe(t) - medio) < Math.abs(centroDe(tarjetas[mejor]) - medio)) mejor = k; });
    return mejor;
  };
  const ir = (k: number) => carrusel.scrollTo({ left: centroDe(tarjetas[k]) - carrusel.clientWidth / 2, behavior: "smooth" });
  const marcar = () => {
    const k = actual();
    puntos.forEach((p, n) => p.setAttribute("aria-current", String(n === k)));
  };
  let cuadro = 0;
  carrusel.addEventListener("scroll", () => { cancelAnimationFrame(cuadro); cuadro = requestAnimationFrame(marcar); }, { passive: true });
  marcar();
  const pausar = (ms: number) => { quietoHasta = Date.now() + ms; };
  puntos.forEach((p, n) => p.addEventListener("click", () => { pausar(8000); ir(n); }));
  new IntersectionObserver(([e]) => { enPantalla = e.isIntersecting; }, { threshold: 0.4 }).observe(carrusel);
  carrusel.addEventListener("pointerenter", (ev) => { if (ev.pointerType === "mouse") pausar(Infinity); });
  carrusel.addEventListener("pointerleave", (ev) => { if (ev.pointerType === "mouse") pausar(1500); });
  carrusel.addEventListener("pointerdown", () => pausar(8000));
  carrusel.addEventListener("focusin", () => pausar(Infinity));
  carrusel.addEventListener("focusout", () => pausar(1500));
  carrusel.addEventListener("wheel", () => pausar(8000), { passive: true });
  carrusel.addEventListener("touchstart", () => pausar(8000), { passive: true });
  setInterval(() => {
    if (!enPantalla || document.hidden || Date.now() < quietoHasta) return;
    ir((actual() + 1) % tarjetas.length);
  }, 4500);
}

// Hero: la frase después de "Mañana ya sabes" va rotando entre lo que amunpos resuelve.
const frases = Array.from(document.querySelectorAll<HTMLElement>(".rotador .frase"));
if (frases.length > 1) {
  let n = 0;
  setTimeout(() => {
    setInterval(() => {
      if (document.hidden) return;
      const sale = frases[n];
      sale.classList.remove("activa");
      sale.classList.add("sale");
      setTimeout(() => sale.classList.remove("sale"), 900);
      n = (n + 1) % frases.length;
      frases[n].classList.add("activa");
    }, 3200);
  }, 1800);
}
