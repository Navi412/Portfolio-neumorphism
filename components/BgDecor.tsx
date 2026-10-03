/**
 * Decoración de fondo común a todas las páginas: piezas neumórficas del mismo
 * color que el fondo, una trama de puntos que solo asoma por los bordes y dos
 * halos suaves del acento. Va fija detrás del contenido y ocupa sobre todo los
 * márgenes laterales, que en pantallas anchas quedaban vacíos.
 */
export default function BgDecor() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden select-none">
      {/* Halos del acento */}
      <div className="decor-glow absolute -top-40 -left-40 h-[34rem] w-[34rem]" />
      <div className="decor-glow absolute -right-48 -bottom-48 h-[38rem] w-[38rem] opacity-70" />

      {/* Trama de puntos, desvanecida hacia el centro */}
      <div className="decor-dots absolute inset-0" />

      {/* Izquierda: anillo en relieve */}
      <div className="decor-float absolute top-28 -left-44 hidden h-[26rem] w-[26rem] lg:block">
        <div className="neu relative h-full w-full rounded-full">
          <div className="neu-inset absolute inset-[18%] rounded-full" />
        </div>
      </div>

      {/* Izquierda: ranura vertical con un mando dentro */}
      <div className="decor-float decor-delay-2 absolute bottom-24 left-10 hidden lg:block xl:left-16">
        <div className="neu-inset flex h-56 w-12 items-end justify-center rounded-full p-2">
          <div className="neu-sm flex h-8 w-8 items-center justify-center rounded-full">
            <span className="glow h-2 w-2 rounded-full bg-accent text-accent" />
          </div>
        </div>
      </div>

      {/* Izquierda: botón redondo pequeño */}
      <div className="decor-float decor-delay-1 absolute top-[62%] left-40 hidden h-14 w-14 rounded-full xl:block">
        <div className="neu h-full w-full rounded-full" />
      </div>

      {/* Derecha: píldora inclinada bajo los interruptores */}
      <div className="decor-float decor-delay-1 absolute top-44 -right-16 hidden lg:block">
        <div className="neu h-24 w-72 rotate-[-28deg] rounded-full" />
      </div>

      {/* Derecha: cruz en relieve */}
      <div className="decor-float decor-delay-3 absolute top-[48%] right-16 hidden xl:block">
        <div className="relative h-14 w-14">
          <div className="neu-sm absolute inset-x-0 top-1/2 h-4 -translate-y-1/2 rounded-full" />
          <div className="neu-sm absolute inset-y-0 left-1/2 w-4 -translate-x-1/2 rounded-full" />
        </div>
      </div>

      {/* Derecha: disco hundido con un disco en relieve dentro */}
      <div className="decor-float decor-delay-2 absolute -right-36 -bottom-36 hidden h-[24rem] w-[24rem] lg:block">
        <div className="neu-inset relative h-full w-full rounded-full">
          <div className="neu absolute inset-[26%] rounded-full" />
        </div>
      </div>
    </div>
  );
}
