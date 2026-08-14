# AGENTS.md — GeekCatálogo

Instrucciones de contexto para agentes de IA que trabajen en este repositorio. Resumen las convenciones del proyecto, definidas en `spec.md` (constitución).

## Stack fijo

- React Native + **Expo SDK 57** + **expo-router** + **TypeScript estricto**.
- **Sin backend**: los datos vienen de mocks en `src/services/`.
- Persistencia local únicamente con **AsyncStorage** (lista de deseos).
- Navegación con expo-router: `Tabs` (JavaScript tabs) + `Stack`.

## Documentos que mandan

- `spec.md` — especificación (el "qué"). **Nada se programa que no esté en la spec.**
- `plan.md` — plan técnico (el "cómo").
- `tasks.md` — lista de tareas atómicas. **Una tarea por vez, un commit por tarea** con mensaje `feat: T0X - descripción`.

## Convenciones de código

- Todo en **español**: identificadores, comentarios, textos de UI y mensajes de commit.
- `camelCase` para variables y funciones; `PascalCase` para componentes y tipos.
- **No** agregar comentarios salvo que aporten contexto real.
- Componentes reutilizables en `src/components/`; pantallas en `src/app/`; capa de datos en `src/services/`; tipos en `src/types/`; constantes en `src/constants/`.
- Los imports usan el alias `@/*` → `src/*`.

## Capa de datos (mocks)

- Toda pantalla consume datos a través de `src/services/catalogo.ts` (nunca directo del JSON).
- Las funciones de servicio son `async` y simulan latencia de **500–1000 ms** (`Promise` + `setTimeout`).
- `src/services/catalogo.ts` mantiene el catálogo en memoria: `listarItems`, `obtenerItem`, `crearItem`, `actualizarItem`.
- `src/services/deseos.ts` envuelve AsyncStorage (clave `@geekcatalogo/deseos`).

## Estados de UI

Toda pantalla que carga datos debe manejar: `cargando`, `error` (con opción de reintentar) y `exito/vacío`.

## Documentos de Expo

Antes de escribir código nuevo, consultar la documentación versionada:

- Referencia SDK: https://docs.expo.dev/versions/v57.0.0/
- Expo Router: https://docs.expo.dev/router/introduction/
- Tabs (JavaScript): https://docs.expo.dev/router/advanced/tabs/

## Verificación antes de commitear

1. `npx tsc --noEmit` sin errores.
2. `npx expo start` sin errores al levantar.
3. Prueba en **Expo Go** en el teléfono según el criterio de aceptación de la tarea.
4. `feat: T0X - descripción` como mensaje de commit.
