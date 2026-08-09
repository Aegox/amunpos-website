import React, { useState } from "react";
import { DESCUENTO_ANUAL, formatearPrecio, precioMensual } from "@/data/precios";
import {
  RiCheckLine,
  RiSubtractLine,
  RiGitBranchLine,
  RiTeamLine,
  RiShoppingCart2Line,
  RiFileList3Line,
  RiSparkling2Fill,
  RiTruckLine,
  RiCalendarCheckLine,
  RiCustomerService2Line,
  RiArrowRightUpLine,
  RiRocket2Line,
  RiUser3Line,
  RiBuilding2Line,
  RiInformationLine,
} from "@remixicon/react";
import { cn } from "@/lib/utils";

/**
 * Tabla de precios con la estructura de alignui.com: UNA sola tarjeta grande
 * con la columna de conceptos a la izquierda y los planes a la derecha, en vez
 * de tres tarjetas sueltas.
 *
 * La diferencia no es estética. Con tres tarjetas independientes cada una
 * repite su lista y el que compara tiene que ir y venir leyendo textos
 * distintos para la misma cosa. Aquí cada fila es un concepto y se lee en
 * horizontal: "sucursales: 1, hasta 3, ilimitadas". Comparar es el único
 * trabajo que se hace en una página de precios.
 */

type Valor = true | false | string;

const caracteristicas: {
  icono: React.ComponentType<{ className?: string }>;
  nombre: string;
}[] = [
  { icono: RiGitBranchLine, nombre: "Sucursales" },
  { icono: RiTeamLine, nombre: "Usuarios" },
  { icono: RiShoppingCart2Line, nombre: "Ventas, caja e inventario" },
  { icono: RiFileList3Line, nombre: "Facturación con IVA" },
  { icono: RiSparkling2Fill, nombre: "Asistente con IA" },
  { icono: RiTruckLine, nombre: "Delivery con app propia" },
  { icono: RiCalendarCheckLine, nombre: "Nómina y fichaje" },
  { icono: RiCustomerService2Line, nombre: "Soporte" },
];

const planes: {
  id: string;
  nombre: string;
  para: string;
  icono: React.ComponentType<{ className?: string }>;
  destacado?: boolean;
  valores: Valor[];
}[] = [
  {
    id: "basico",
    nombre: "Básico",
    para: "Para el negocio que empieza.",
    icono: RiUser3Line,
    valores: ["1", "3", true, true, true, false, false, "Correo"],
  },
  {
    id: "estandar",
    nombre: "Estándar",
    para: "Para el que ya va creciendo.",
    icono: RiRocket2Line,
    destacado: true,
    valores: ["Hasta 3", "10", true, true, true, true, false, "Chat"],
  },
  {
    id: "profesional",
    nombre: "Profesional",
    para: "Para cadenas con varios locales.",
    icono: RiBuilding2Line,
    valores: [
      "Ilimitadas",
      "Ilimitados",
      true,
      true,
      true,
      true,
      true,
      "Prioritario",
    ],
  },
];

/** La nota al margen. Se parte en letras para poder resaltarlas una a una. */
const NOTA = "¡Ahórrate un 20 % pagando al año!";

function Marca({ valor, oscuro }: { valor: Valor; oscuro?: boolean }) {
  // Un texto donde lo hay ("Hasta 3"), un tic donde solo es sí, y una raya
  // donde es no. La raya y no un hueco: una casilla vacía no se distingue de
  // un olvido de maquetación.
  if (valor === false)
    return (
      <RiSubtractLine
        className={cn(
          "size-[18px] shrink-0",
          oscuro ? "text-gray-700" : "text-gray-300",
        )}
      />
    );
  if (valor === true)
    return (
      <RiCheckLine
        className={cn(
          "size-[18px] shrink-0",
          oscuro ? "text-ai-base" : "text-primary-base",
        )}
      />
    );
  return (
    <span
      className={cn(
        "text-paragraph-sm",
        oscuro ? "text-gray-0" : "text-gray-900",
      )}
    >
      {valor}
    </span>
  );
}

function Cabecera({
  plan,
  anual,
  oscuro,
}: {
  plan: (typeof planes)[number];
  anual: boolean;
  oscuro?: boolean;
}) {
  const Icono = plan.icono;
  return (
    <>
      <div className="flex items-center justify-between">
        <Icono
          className={cn("size-5", oscuro ? "text-ai-base" : "text-gray-400")}
        />
        {plan.destacado && (
          <span className="rounded-[5px] bg-ai-base px-1.5 py-0.5 text-subheading-xs uppercase text-gray-0">
            Más elegido
          </span>
        )}
      </div>
      <div
        className={cn(
          "mt-4 text-label-lg",
          oscuro ? "text-gray-0" : "text-gray-900",
        )}
      >
        {plan.nombre}
      </div>
      <p
        className={cn(
          "mt-1 text-paragraph-sm",
          oscuro ? "text-gray-450" : "text-gray-600",
        )}
      >
        {plan.para}
      </p>

      <div className="mt-5 flex items-end gap-2">
        {/* `tabular-nums` para que al pasar de 130.000 a 104.000 no baile el
            ancho. Cuerpo h5 y no h4: "$ 130.000" son ocho caracteres y con el
            tamaño grande se sale de la tarjeta. */}
        <span
          className={cn(
            "text-title-h5 tabular-nums",
            oscuro ? "text-gray-0" : "text-gray-900",
          )}
        >
          {formatearPrecio(precioMensual(plan.id, anual))}
        </span>
        <span
          className={cn(
            "pb-1.5 text-paragraph-xs leading-4",
            oscuro ? "text-gray-450" : "text-gray-600",
          )}
        >
          al mes
          <br />
          por sucursal
        </span>
      </div>

      {/* Abre el registro YA con este plan, en vez de mandar a un formulario de
          contacto: el visitante acaba de decidir cuál quiere, y hacerle
          elegirlo otra vez es la forma más barata de perderlo. */}
      <a
        href="#Contacto"
        data-auth="crear"
        data-plan={plan.id}
        className={cn(
          "mt-5 flex h-10 items-center justify-center gap-1.5 rounded-9 text-label-sm transition duration-200",
          plan.destacado
            ? "bg-primary-base text-gray-0 hover:bg-primary-dark"
            : oscuro
              ? "bg-gray-0 text-gray-900"
              : "bg-gray-0 text-gray-900 shadow-button-white hover:bg-gray-25",
        )}
      >
        Empezar
        <RiArrowRightUpLine className="size-4 opacity-60" />
      </a>
    </>
  );
}

function Conmutador({ anual, alCambiar }: { anual: boolean; alCambiar: (v: boolean) => void }) {
  return (
    <>
      <button
        type="button"
        role="switch"
        aria-checked={anual}
        onClick={() => alCambiar(!anual)}
        className="relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-alpha-16"
        style={{ background: anual ? "var(--primary-base)" : "var(--gray-200)" }}
      >
        <span
          className={cn(
            // `left-0` explícito: sin él la posición de partida es la
            // "estática" del span dentro del botón, que no es 0 y dejaba la
            // bolita medio fuera del carril.
            "absolute left-0 top-0.5 size-5 rounded-full bg-gray-0 shadow-badge-gray transition-transform duration-300 ease-out",
            anual ? "translate-x-[22px]" : "translate-x-0.5",
          )}
        />
      </button>
      <div className="mt-4 text-label-sm text-gray-900">Pagar por año</div>
      <p className="mt-1 text-paragraph-sm text-gray-600">
        Un 20 % menos en los tres planes. Sin permanencia: te vas cuando
        quieras.
      </p>
    </>
  );
}


export default function PricingTable() {
  const [anual, setAnual] = useState(true);

  return (
    <div className="relative w-full">
      {/* La nota manuscrita. La flecha sale de al lado del conmutador y sube
          a señalar el texto: quien mira el precio ya está en el conmutador, y
          lo que hay que llevarle es la frase, no al revés.

          Todo va EN BUCLE y por turnos: primero se traza la flecha, después el
          resaltado recorre la frase letra a letra, y vuelta a empezar. Un
          adorno que se anima una sola vez lo ve quien llega justo en ese
          segundo; el resto de la gente ve un dibujo quieto.

          El texto se parte en letras porque el resaltado tiene que ir una a
          una: cada `span` lleva su índice en `--i` y de ahí sale el retardo, así
          que la onda avanza sin escribir 26 reglas. */}
      {/* `left-[104px]`: la nota arranca justo a la derecha del conmutador. Con
          `left-4` la parte que baja de la flecha caía ENCIMA del interruptor y
          lo tachaba; corrida a la derecha, baja por el hueco de al lado y la
          cola queda pegada al botón sin taparlo. */}
      <div className="pointer-events-none absolute bottom-full left-[104px] z-10 hidden xl:block">
        <span className="nota-mano escribe-mano block -rotate-3 whitespace-nowrap text-[17px] leading-5 text-primary-base">
          {[...NOTA].map((c, i) => (
            <span
              key={i}
              className="letra-mano"
              style={{ ["--i" as string]: i }}
              // El espacio en blanco no se resalta, pero tiene que seguir
              // ocupando su sitio: `inline-block` con nada dentro lo colapsa.
              aria-hidden={c === " " ? "true" : undefined}
            >
              {c === " " ? " " : c}
            </span>
          ))}
        </span>

        {/* El trazo va escrito de la COLA a la PUNTA, así que se dibuja en ese
            orden sin más: arranca abajo a la derecha, al lado del conmutador,
            da el rizo y sube a señalar la frase. El rizo es lo que hace que
            parezca hecho a mano y no una flecha de plantilla. */}
        <svg
          viewBox="0 0 96 168"
          fill="none"
          aria-hidden="true"
          // El margen negativo mete la cola DENTRO de la tarjeta, hasta la
          // altura del conmutador. Sin esto la línea se quedaba a 55 px, arriba
          // y a la derecha, señalando el borde de la tarjeta en vez del botón.
          // Reflejada: así la cola —que es por donde empieza a dibujarse— cae a
          // la izquierda, al lado del conmutador, y la punta sube por la
          // derecha a señalar la frase.
          className="-mb-[76px] ml-1 h-[168px] w-24 -scale-x-100"
        >
          <path
            d="M94 158C68 156 28 132 22 92c-3-10 9-14 13-6 3 7-5 12-13 6-8-6-8-30-6-52"
            className="dibuja-flecha stroke-primary-base"
            strokeWidth="1.5"
            strokeLinecap="round"
            pathLength={1}
          />
          <path
            d="M16 40l-4 11M16 40l9 6"
            className="punta-flecha stroke-primary-base"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
          />
        </svg>
      </div>

      {/* ── La caja gris que envuelve la tabla Y su letra pequeña ──
          Las dos cosas van dentro del mismo recuadro porque son la misma
          respuesta: cuánto cuesta. Con la nota fuera, en su propia tarjeta,
          parecía un aviso de otra sección — y justo esa nota es la que cambia
          la decisión del que tiene cinco locales. */}
      <div className="rounded-[24px] bg-gray-50 p-2 xl:rounded-[28px] xl:p-2.5">
        <div className="relative rounded-[18px] bg-gray-0 p-2 ring-1 ring-gray-200 xl:rounded-[20px] xl:p-3">
          {/* Escritorio: una rejilla donde cada fila es un concepto */}
          <div
            data-tabla
            className="hidden xl:grid xl:grid-cols-[minmax(0,240px)_repeat(3,minmax(0,1fr))]"
          >
            {/* El fondo del plan destacado se pinta CELDA A CELDA, no con una
              caja que ocupe la columna entera. Una caja con `grid-row: 1/-1`
              parece lo natural, pero bloquea la columna 3 en todas las filas y
              la colocación automática se pone a esquivarla: los planes y los
              conceptos acababan repartidos en diagonal. Pintando el fondo en
              cada celda no hay nada que esquivar, y la columna crece sola con
              las filas sin medir nada. */}
            {/* Aquí decía "Todos los planes incluyen" encabezando la columna
              de conceptos, y era FALSO: debajo hay filas que solo tiene el plan
              caro (delivery, nómina). El que leía eso y luego veía una raya en
              su plan se quedaba sin saber a qué atenerse.

              En su lugar va el conmutador, que es donde lo pone alignui y donde
              tiene sentido: manda sobre las tres columnas de la derecha, así
              que su sitio es la esquina donde se cruzan. */}
            <div className="p-5">
              <Conmutador anual={anual} alCambiar={setAnual} />
            </div>
            {planes.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "flex flex-col p-5",
                  plan.destacado && "rounded-t-[18px] bg-gray-950 px-6",
                )}
              >
                <Cabecera plan={plan} anual={anual} oscuro={plan.destacado} />
              </div>
            ))}

            {caracteristicas.map((c, fila) => (
              <React.Fragment key={c.nombre}>
                <div className="flex items-center gap-2.5 border-t border-gray-100 px-5 py-3.5">
                  <c.icono className="size-[18px] shrink-0 text-gray-400" />
                  <span className="text-paragraph-sm text-gray-700">
                    {c.nombre}
                  </span>
                </div>
                {planes.map((plan) => (
                  <div
                    key={plan.id}
                    className={cn(
                      "flex items-center py-3.5",
                      plan.destacado
                        ? "border-t border-white/10 bg-gray-950 px-6"
                        : "border-t border-gray-100 px-5",
                      // El redondeo de abajo solo en la última fila, para que la
                      // columna oscura cierre como una tarjeta y no como una
                      // pila de celdas.
                      plan.destacado &&
                        fila === caracteristicas.length - 1 &&
                        "rounded-b-[18px]",
                    )}
                  >
                    <Marca valor={plan.valores[fila]} oscuro={plan.destacado} />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* Móvil y tableta: la rejilla no cabe, así que cada plan se lee entero
            por separado. Los datos son los mismos, no hay dos verdades. */}
          <div data-tarjetas className="flex flex-col gap-3 xl:hidden">
            {/* En móvil no hay esquina donde se crucen filas y columnas, así
              que el conmutador va encima de las tarjetas: sigue mandando sobre
              las tres, que es lo único que importa. */}
            <div className="px-3 py-2">
              <Conmutador anual={anual} alCambiar={setAnual} />
            </div>
            {planes.map((plan) => (
              <div
                key={plan.id}
                data-plan
                className={cn(
                  "flex flex-col rounded-[18px] p-5",
                  plan.destacado ? "bg-gray-950" : "bg-gray-25",
                )}
              >
                <Cabecera plan={plan} anual={anual} oscuro={plan.destacado} />
                <ul className="mt-5 flex flex-col gap-2.5">
                  {caracteristicas.map((c, i) => (
                    <li key={c.nombre} className="flex items-center gap-2.5">
                      <Marca valor={plan.valores[i]} oscuro={plan.destacado} />
                      <span
                        className={cn(
                          "text-paragraph-sm",
                          plan.destacado ? "text-gray-450" : "text-gray-700",
                          plan.valores[i] === false &&
                            "line-through opacity-60",
                        )}
                      >
                        {c.nombre}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-start gap-3 px-3 py-4 xl:px-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-9 bg-gray-0 text-gray-500 shadow-badge-gray">
            <RiInformationLine className="size-[18px]" />
          </span>
          <div>
            <div className="text-label-sm text-gray-900">
              ¿Varias sucursales o un caso raro?
            </div>
            <p className="mt-0.5 text-pretty text-paragraph-sm text-gray-600">
              A partir de cinco locales el precio por sucursal baja. Escríbenos
              a{" "}
              <a
                href="mailto:hola@amunpos.com"
                className="text-primary-base underline underline-offset-2"
              >
                hola@amunpos.com
              </a>{" "}
              y lo armamos contigo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
