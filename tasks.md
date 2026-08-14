# Tareas — GeekCatálogo

Lista de tareas atómicas, ordenadas y verificables. Cada tarea se completa en una sesión de trabajo, se prueba en el teléfono y se commitea con `feat: T0X - descripción`.

**Convención:** `[ ]` pendiente · `[x]` completada · verificación = cómo se comprueba en el teléfono.

---

## T01 — Setup del proyecto Expo

- [x] Crear el proyecto con `npx create-expo-app` (plantilla con expo-router + TypeScript).
- [x] Primer commit del proyecto en la rama `develop`.

**Verificación:** `npx expo start` levanta la app y la plantilla se ve en Expo Go.

## T02 — AGENTS.md y estructura base

- [x] Escribir `AGENTS.md` con las convenciones del proyecto (constitución de `spec.md`).
- [x] Crear carpetas base: `components/`, `services/`, `types/`, `constants/`.

**Verificación:** las carpetas existen y `AGENTS.md` refleja las reglas de la spec.

## T03 — Tipos, constantes y capa de datos mock

- [x] `types/index.ts`: tipos `Item`, `TipoItem`, géneros por tipo.
- [x] `constants/index.ts`: paleta de colores y listas de géneros.
- [x] `services/latencia.ts`: `delay()` y `latenciaAleatoria()` (500–1000 ms).
- [x] `services/data.ts`: ~12 items mock (4 películas, 4 series, 4 juegos).
- [x] `services/catalogo.ts`: `listarItems`, `obtenerItem`, `crearItem`, `actualizarItem` (async, con latencia).

**Verificación:** `npx tsc --noEmit` sin errores. (Los datos se ven en pantalla recién en T04.)

## T04 — Listado con carga, vacío y error (P1, parte 1)

- [x] Componentes `PortadaSimulada`, `ItemCard`, `EstadoCarga`, `EstadoVacio`, `EstadoError`.
- [x] `app/(tabs)/index.tsx` carga con `listarItems`, maneja carga / vacío / error con reintento.
- [x] Se ven los items del mock con portada, título, tipo y año.

**Verificación (CA-01):** entrar a Inicio → spinner ~500–1000 ms → listado. Si no hay items → estado vacío. Botón Reintentar funciona.

## T05 — Detalle (P2)

- [x] `app/item/[id].tsx` muestra todos los campos del item.
- [x] Desde el listado, tocar una tarjeta navega al detalle.
- [x] Si el id no existe, estado vacío/error.

**Verificación (CA-03):** tocar items distintos del listado y ver los datos correctos.

## T06 — Filtros por tipo y género (P1, parte 2)

- [x] Componente `FiltroChips`.
- [x] Filtro de tipo: Todos / Películas / Series / Juegos.
- [x] Filtro de género que se adapta al tipo elegido.
- [x] Estado vacío cuando el filtro no tiene resultados.

**Verificación (CA-02):** elegir cada tipo y ver solo items de ese tipo; probar un género sin items.

## T07 — Formulario de alta (P4)

- [x] Componentes `CampoTexto` y `FormularioItem` con validación por campo (CA-05).
- [x] `app/item/nuevo.tsx` con botón flotante "nuevo" en Inicio.
- [x] Al guardar, el item aparece en el listado (mock en memoria).

**Verificación (CA-05):** enviar el form vacío → errores por campo. Completar bien → vuelve a Inicio y el item aparece.

## T08 — Formulario de edición (P5)

- [x] `app/item/[id]/editar.tsx` reutiliza `FormularioItem` precargado.
- [x] Botón "editar" en el detalle.
- [x] Al guardar, el detalle muestra los datos actualizados.

**Verificación (CA-06):** editar título/año de un item → el detalle lo refleja.

## T09 — Lista de deseos con AsyncStorage (P3)

- [x] `services/deseos.ts` con AsyncStorage (clave `@geekcatalogo/deseos`).
- [x] Botón "Agregar / Quitar de la lista de deseos" en el detalle.
- [x] `app/(tabs)/deseos.tsx`: listado de deseos, estado vacío, quitar items, navegar al detalle.

**Verificación (CA-04):** agregar items, cerrar y reabrir la app → persisten. Quitar funciona. Lista vacía muestra mensaje.

## T10 — Pulido, README y documento del proceso

- [x] Revisión final de estados de carga/vacío/error en todas las pantallas.
- [x] `README.md` con instrucciones para correr el proyecto.
- [x] `PROCESO.md` completo (investigación, spec, plan, tareas, desarrollo, conclusiones).

**Verificación:** la app corre completa en Expo Go; `README.md` funciona siguiéndolo paso a paso; `PROCESO.md` coherente con el historial de commits.

---

## Orden sugerido y dependencias

```
T01 → T02 → T03 → T04 → T05 → T06 → T07 → T08 → T09 → T10
       │      │      │      │
       │      │      │      └── depende de T03 y T02
       │      │      └── depende de T03
       │      └── depende de T01
       └── depende de T01
```

T05, T06 y T07 no dependen entre sí y podrían intercambiarse, pero el orden propuesto termina cada pantalla antes de empezar la siguiente (principio de "una tarea, una sesión, un commit").
