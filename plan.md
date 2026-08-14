# Plan técnico — GeekCatálogo

Documento derivado de `spec.md`. Define **cómo** se construye: estructura, navegación, mocks, componentes reutilizables y estrategia de verificación.

---

## 1. Estructura del proyecto

Proyecto creado con `npx create-expo-app` (plantilla por defecto con expo-router y TypeScript).

```
.
├── app/                       # Rutas de expo-router (navegación)
│   ├── _layout.tsx            # Layout raíz (stack principal)
│   ├── (tabs)/
│   │   ├── _layout.tsx        # Pestañas: Inicio | Lista de deseos
│   │   ├── index.tsx          # P1 - Inicio (listado + filtros)
│   │   └── deseos.tsx         # P3 - Lista de deseos
│   └── item/
│       ├── [id].tsx           # P2 - Detalle
│       ├── [id]/editar.tsx    # P5 - Edición
│       └── nuevo.tsx          # P4 - Alta
├── components/                # Componentes reutilizables
│   ├── PortadaSimulada.tsx    # Portada con emoji + color
│   ├── ItemCard.tsx           # Tarjeta de item del listado
│   ├── EstadoCarga.tsx        # Spinner de carga
│   ├── EstadoVacio.tsx        # Mensaje de lista vacía
│   ├── EstadoError.tsx        # Error + botón Reintentar
│   ├── FiltroChips.tsx        # Chips de filtro (tipo y género)
│   ├── FormularioItem.tsx     # Formulario reutilizado por alta y edición
│   └── CampoTexto.tsx         # Input con label y mensaje de error
├── services/                  # Capa de datos (mocks)
│   ├── latencia.ts            # delay() con latencia 500-1000 ms
│   ├── data.ts                # Catálogo estático (datos mock)
│   ├── catalogo.ts            # API simulada: listar, obtener, crear, actualizar
│   └── deseos.ts              # Wrapper de AsyncStorage para la lista de deseos
├── types/
│   └── index.ts               # Tipos: Item, TipoItem, géneros
├── constants/
│   └── index.ts               # Paleta de colores y géneros por tipo
├── spec.md                    # Especificación (etapa 2)
├── plan.md                    # Este documento
├── tasks.md                   # Lista de tareas (etapa 3)
├── AGENTS.md                  # Convenciones para el agente de IA
├── PROCESO.md                 # Documento del proceso (entrega)
└── README.md                  # Instrucciones para correr el proyecto
```

## 2. Navegación

- **Layout raíz**: stack por defecto de expo-router. El primer `_layout.tsx` renderiza el layout de pestañas.
- **Pestañas** (`(tabs)/_layout.tsx`): `Inicio` → `/` e `index.tsx`; `Lista de deseos` → `/deseos`.
- **Stack (fuera de tabs)**: `item/nuevo`, `item/[id]`, `item/[id]/editar` se abren apiladas sobre las pestañas.

Flujos:

| Desde | Acción | Ruta |
| --- | --- | --- |
| Inicio | Tocar una tarjeta | `/item/[id]` |
| Inicio | Botón flotante "nuevo" | `/item/nuevo` |
| Detalle | Botón "editar" | `/item/[id]/editar` |
| Lista de deseos | Tocar un item | `/item/[id]` |

## 3. Capa de datos (mocks)

Todo vive en `services/`. Ninguna pantalla importa los datos directo: todas usan la "API" simulada.

- `latencia.ts` → `delay(ms)` y `latenciaAleatoria()` que devuelve **500–1000 ms**.
- `data.ts` → arreglo estático de `Item[]` con ~12 items (4 películas, 4 series, 4 juegos).
- `catalogo.ts` → funciones `async` que replican un servicio REST:
  - `listarItems({ tipo?, genero? }): Promise<Item[]>` — aplica filtros.
  - `obtenerItem(id): Promise<Item | null>` — puede lanzar error si no existe.
  - `crearItem(datos): Promise<Item>` — agrega al arreglo en memoria (visible en la sesión).
  - `actualizarItem(id, datos): Promise<Item>` — reemplaza el item en memoria.
- `deseos.ts` → guarda `string[]` de ids en **AsyncStorage** (clave `@geekcatalogo/deseos`):
  - `listarDeseos(): Promise<string[]>` / `agregarDeseo(id)` / `quitarDeseo(id)` / `estaEnDeseos(id)`.

El día que exista un backend real, solo se reemplaza `services/catalogo.ts`.

## 4. Componentes reutilizables

| Componente | Dónde se usa |
| --- | --- |
| `PortadaSimulada` | `ItemCard`, Detalle (bloque de color + emoji) |
| `ItemCard` | Inicio (listado) |
| `EstadoCarga` / `EstadoVacio` / `EstadoError` | Inicio, Lista de deseos, Detalle |
| `FiltroChips` | Inicio (filtro de tipo y de género) |
| `FormularioItem` | Alta (`nuevo.tsx`) y Edición (`[id]/editar.tsx`) |
| `CampoTexto` | Dentro de `FormularioItem` |

## 5. Validación del formulario

Reglas (mismas para alta y edición, definidas en `spec.md` CA-05):

- Título: requerido, mínimo 2 caracteres.
- Tipo: selección requerida (película / serie / juego).
- Género: selección requerida, según el tipo elegido.
- Año: número entre **1900 y 2026**.
- Descripción: mínimo **10 caracteres**.
- Puntuación: número entre **0 y 10**.

Los errores se muestran por campo. El botón "Guardar" no envía si hay errores.

## 6. Estado de la UI

Cada pantalla que carga datos usa un estado local simple:

```ts
type EstadoCarga<T> =
  | { estado: 'cargando' }
  | { estado: 'error'; mensaje: string }
  | { estado: 'exito'; datos: T };
```

No se usa contexto global ni librería de estado: el alcance no lo requiere. Los datos en memoria del servicio simulan la persistencia entre pantallas dentro de la sesión.

## 7. Dependencias

| Paquete | Cómo se instala | Por qué |
| --- | --- | --- |
| `expo`, `expo-router`, `@react-navigation/*` | Vienen con la plantilla | Navegación |
| `@react-native-async-storage/async-storage` | `npx expo install` | Persistir la lista de deseos |

## 8. Verificación

Para dar una tarea por terminada:

1. `npx tsc --noEmit` — sin errores de tipos.
2. `npx expo start` — la app levanta sin errores.
3. Probar en **Expo Go** en el teléfono (seguir el criterio de aceptación de la tarea).
4. Commit `feat: T0X - descripción`.

> La prueba en teléfono físico la ejecuta el integrante; esta verificación queda registrada en `PROCESO.md`.
