# Documento del proceso — GeekCatálogo

> **Actividad Áulica N.° 1** — Desarrollo de una app móvil con React Native, Expo y Spec-Driven Development
> Instituto Politécnico Formosa — Tecnicatura Superior en Desarrollo de Software Multiplataforma — Taller Complementario React Native II
>
> **Integrantes:** Felipe Monzón _(completar pareja cuando esté definida)_
> **Fecha de inicio:** 14/08/2026
> **Herramienta SDD:** manual (carpetas `spec.md` / `plan.md` / `tasks.md` + `AGENTS.md`) — decisión documentada en §4.
> **Agente de IA:** opencode (asistente en terminal).

---

## 1. Investigación

> Respuestas en nuestras propias palabras, con fuentes consultadas. Esta sección se revisó en la puesta en común de clase.

### 1.1 React Native

**¿Qué es y qué problema resuelve?**
React Native es un framework que permite construir apps móviles nativas para Android e iOS escribiendo en JavaScript/TypeScript y React. Resuelve el problema de tener que mantener dos codebases distintas (una en Kotlin/Java y otra en Swift) para cubrir las dos plataformas: con una sola base de código de componentes React se generan apps nativas de verdad.

**¿Cómo logra que JavaScript termine mostrando componentes nativos?**
React Native no renderiza en un WebView. Mantiene dos hilos principales: el hilo de JavaScript (donde corre la lógica y el árbol de componentes) y el hilo nativo (UI). El framework se comunica entre ambos mediante un "puente" (bridge) que serializa llamadas: cada componente de React Native (`View`, `Text`, `ScrollView`, etc.) es una abstracción que se traduce en la vista nativa real (un `UIView` en iOS o un `ViewGroup` en Android). Los estilos declarados en JS se aplican a esos componentes nativos reales.

**Diferencias con nativo puro y con híbridas web**
- **Nativo puro (Kotlin/Swift):** máximo rendimiento y acceso total al SDK de cada plataforma, pero hay que escribir y mantener el código dos veces.
- **React Native:** una sola base de código JS, con componentes nativos de verdad. La mayoría de APIs se accede por módulos nativos. Perdés algo de control fino del SDK y el rendimiento de listas complejas puede requerir optimización.
- **Híbridas basadas en web (Ionic, PWA):** el mismo código web corre dentro de un WebView. Máxima portabilidad (también corre en navegador) pero la UI no es nativa: se siente y se comporta como una web, con menor rendimiento y peor integración con gestos y accesibilidad de la plataforma.

**Ventajas y desventajas**

| Enfoque | Ventajas | Desventajas |
| --- | --- | --- |
| Nativo (Kotlin/Swift) | Máximo rendimiento, acceso total al SDK, mejor experiencia | Dos codebases, más costoso y lento |
| React Native | Una codebase, componentes nativos, gran ecosistema, hot reload | Puente como cuello de botella, dependencias nativas que pueden romper |
| Híbrido web (Ionic/PWA) | Portabilidad total, mismo código web | UI no nativa, rendimiento menor, menos integración |

**3 apps conocidas hechas con React Native:** Instagram, Facebook, Discord, Spotify (partes), Pinterest. Elegimos Instagram, Facebook y Discord como las tres más conocidas.

**Fuentes:** https://reactnative.dev/ — https://reactnative.dev/docs/intro-react-native-components — https://reactnative.dev/docs/native-components-android

### 1.2 Expo

**¿Qué agrega Expo sobre React Native "pelado"?**
Expo es un framework y una plataforma por encima de React Native. Agrega: un SDK de módulos nativos preconfigurados y versionados (cámara, notificaciones, AsyncStorage, etc.), configuración declarativa en `app.json`, herramientas de build (EAS) y el flujo de desarrollo sin tocar Android Studio/Xcode.

**¿Qué es Expo Go y por qué facilita probar en el teléfono?**
Expo Go es una app que se instala desde las tiendas y actúa como "player": escanea un QR de `npx expo start` y carga el proyecto en el momento, sin necesidad de compilar ni instalar APK. Por eso probar en un teléfono real toma segundos en vez de minutos.

**¿Qué es `expo-router` y cómo maneja la navegación?**
Es el sistema de enrutamiento de Expo, basado en archivos: cada archivo dentro de `app/` (o `src/app/`) es una ruta. La navegación se declara con el sistema de archivos y se programa con `Tabs`/`Stack` (en nuestro caso los "JavaScript tabs", implementados sobre React Navigation). El enrutador también genera tipos para las rutas (typed routes), lo que permite que el compilador valide las rutas que usamos.

**¿Cuándo conviene usar Expo y qué limitaciones tiene?**
Conviene para prototipos, apps medianas y equipos que quieren velocidad sin manejar build nativo. Limitaciones: el SDK tarda en incorporar features muy nuevas de cada plataforma, y si necesitás módulos nativos custom muy específicos, Expo Go no los soporta (ahí se usa un development build o se hace el "eject"/prebuild).

**Fuentes:** https://docs.expo.dev/ — https://docs.expo.dev/router/introduction/ — https://docs.expo.dev/router/advanced/tabs/ — https://docs.expo.dev/versions/v57.0.0/

### 1.3 SDD — Spec-Driven Development

**¿Qué es y por qué apareció con los agentes de IA?**
SDD es la metodología de "especificar primero, codificar después": se escribe qué se quiere construir (spec), se planifica cómo (plan), se divide en tareas verificables (tasks) y recién entonces se programa. Apareció con fuerza junto a los agentes de IA porque, sin una spec, la IA "inventa" funcionalidades y produce código que no se pidió. La spec actúa como contrato: el agente genera código contra un documento aprobado por humanos.

**¿Qué es el "vibe coding" y qué problemas trae?**
Vibe coding es la práctica de pedirle a la IA que programe "a lo que salga", con prompts vagos, sin especificar ni revisar. Problemas: código que nadie puede explicar, funcionalidades no pedidas, deuda técnica, y que el equipo "mira pasar" el desarrollo en vez de dirigirlo. La actividad justamente busca lo contrario.

**Flujo típico de SDD:**
```
Reglas del proyecto (constitution) → especificación → plan técnico → tareas → implementación
```
En cada fase la IA propone y la persona **decide y verifica**: "La IA propone, ustedes deciden".

**¿Qué herramientas existen?**
- **GitHub Spec Kit** (https://github.com/github/spec-kit): toolkit open source de GitHub con una CLI (`specify`) que arma la estructura SDD para muchos agentes (Copilot, Claude Code, Gemini CLI, Cursor, opencode, etc.). Su proceso agéntico usa comandos `/speckit.*`: constitution → specify → clarify → plan → checklist → tasks → analyze → implement → converge. Crea `constitution.md` y plantillas de spec/plan/tasks, y scripts para bash y PowerShell. Fuente: https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/ y https://github.github.com/spec-kit/quickstart.html
- **Kiro** (https://kiro.dev/): entorno de desarrollo agéntico de AWS, con flujo "requirements → design → tasks" dentro de una IDE basada en VS Code, y un "memory bank" (steering) con `product.md`, `tech.md`, `structure.md`. Fuente: https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html
- **Tessl** (https://tessl.io/): lleva SDD al extremo de "spec-as-source": la spec es el artefacto fuente y el código se genera desde ella. Fuente: el mismo artículo de Martin Fowler / Thoughtworks.

**¿Con qué agentes funcionan?** Son agnósticos: Spec Kit soporta GitHub Copilot, Claude Code, Gemini CLI, Cursor, opencode y más; Kiro integra sus propios agentes en la IDE.

### 1.4 Agentes de código y skills

**¿Qué es un agente de código?**
Una herramienta que no solo chatea: ejecuta comandos, lee/edita archivos y recorre el ciclo de desarrollo en el contexto del proyecto. Ejemplos: Claude Code, GitHub Copilot (en IDE), Cursor, Gemini CLI.

**¿En qué se diferencia de un chat común?**
Un chat responde texto; un agente **actúa**: puede modificar el repositorio, correr tests, hacer commits y verificar resultados. Además tiene "memoria de contexto" del proyecto (archivos de instrucciones) para comportarse según las convenciones.

**¿Para qué sirven `AGENTS.md` / `CLAUDE.md`?**
Son archivos de contexto que el agente lee automáticamente al trabajar. Definen stack, convenciones, estructura y qué se espera del agente. En nuestro proyecto, `AGENTS.md` resume la constitución y evita que el agente se desvíe de la spec o del idioma.

**¿Qué son las skills de un agente?**
Son capacidades/instrucciones empaquetadas que se cargan bajo demanda para una tarea específica (por ejemplo, "configurar Expo", "escribir una skill de testing"), en lugar de reenviar todo en cada prompt.

**¿Dónde se consiguen skills de la comunidad?** En marketplaces o repositorios como las Awesome lists de Claude Code skills (repo `anthropics/skills` y listas comunitarias) y en los repos de los propios agentes. Se instalan copiándolas a la carpeta de skills del agente o con los comandos de instalación de cada herramienta.

### 1.5 Mocks

**¿Qué es un mock y por qué permite desarrollar el frontend sin backend?**
Un mock es una simulación de un servicio real: funciones que devuelven datos falsos con la misma forma (contrato) que tendría la API. Permite construir toda la app sin backend porque la pantalla "habla" con una interfaz estable; el día que exista el backend real solo se reemplaza la capa de servicio.

**Estrategias en React Native:**
- **JSON estático:** un arreglo de objetos importado directo. Rápido, pero sin latencia y no simula errores.
- **Servicio simulado con `Promise` + `setTimeout`:** funciones `async` que devuelven los datos tras una latencia artificial. Es la estrategia que usamos: reproduce la espera real de una API y permite probar los estados de carga. Opcionalmente puede lanzar errores para probar los estados de error.
- **AsyncStorage:** persistencia local real en el dispositivo. Lo usamos para la lista de deseos (no para el catálogo, que es mock en memoria).

**Fuentes:** https://docs.expo.dev/versions/v57.0.0/sdk/async-storage/ — documentación de la plantilla de Expo (AGENTS.md del template: "Expo HAS CHANGED, leer docs v57").

---

## 2. Especificación (SDD, primera parte)

### 2.1 Idea original

La idea inicial del grupo fue una app "a elección del usuario" (cada integrante podía querer un recetario, un gestor de gastos o un catálogo). Al revisar con los docentes y con el criterio de la defensa (explicar línea por línea), **la corregimos a una app concreta**: un **catálogo de películas, series y juegos con lista de deseos**, que además está entre las ideas sugeridas por la actividad.

**Prompt usado para la spec** (resumen):

> "Generá la especificación (spec) de una app de catálogo de películas, series y juegos con lista de deseos. Stack fijo: Expo + expo-router + mocks, sin backend, TypeScript, todo en español. Incluí reglas del proyecto (constitución), historias de usuario, pantallas, criterios de aceptación por funcionalidad y qué queda fuera de alcance."

### 2.2 Qué generó la IA y qué corregimos

- La IA propuso varias funcionalidades extra (búsqueda por texto, reseñas, paginación, autenticación): las **recortamos** y las dejamos en "Fuera de alcance".
- La IA no definía validaciones concretas para el formulario: las **fijamos nosotros** (título ≥ 2, año 1900–2026, descripción ≥ 10, puntuación 0–10).
- La IA no contemplaba el campo `plataforma` en el formulario de alta, pero sí lo tenía el modelo de datos: lo **agregamos** al formulario y a los criterios de aceptación (CA-05) para que spec y código coincidan.
- Se definió la portada como **simulada** (emoji + color), sin URLs externas, por ser un prototipo sin backend.
- Aprobación de docentes: la spec final quedó en `spec.md`.

## 3. Plan técnico y tareas (SDD, segunda parte)

**Prompts usados:**

> "Generá el plan técnico: estructura de carpetas, navegación con expo-router, dónde viven los mocks (services/ con latencia 500–1000 ms), componentes reutilizables y estrategia de verificación."
>
> "Generá la lista de tareas atómicas, ordenadas y verificables, una por sesión, con criterio de aceptación y cómo probarlas en el teléfono."

**Qué corregimos de lo propuesto por la IA:**
- El plan original asumía `app/` en la raíz; el template actual de Expo SDK 57 usa `src/app/`. **Ajustamos** la estructura a `src/` (documentado también en la investigación de Expo).
- La plantilla por defecto trae `NativeTabs` (API inestable) y muchos componentes demo. **Decidimos** usar los **JavaScript tabs** (`Tabs` de expo-router) porque están mejor documentados y son más fáciles de explicar en la defensa.
- En las tareas separamos "alta" y "edición" en tareas distintas (T07 y T08) para que cada una se pruebe y commitee sola.

## 4. Setup

- `npx create-expo-app` con la plantilla por defecto (Expo SDK 57 + expo-router + TypeScript).
- Dependencias extra instaladas con `npx expo install`: `@react-native-async-storage/async-storage` (lista de deseos), `@expo/vector-icons` (iconos) y `expo-linear-gradient` (headers con degradé).
- **Herramienta SDD elegida:** decidimos **no instalar GitHub Spec Kit** y trabajar con **SDD manual** (`spec.md`, `plan.md`, `tasks.md`, `AGENTS.md`), porque el flujo del documento de la actividad se cumple igual con carpetas a mano y evita dependencias extra. Investigamos Spec Kit y Kiro (ver §1.3) y documentamos qué hacen.
- **Skills:** la plantilla de Expo ya trae su propio `AGENTS.md`/`CLAUDE.md` ("Expo HAS CHANGED — leer docs v57"). Lo reemplazamos por nuestro `AGENTS.md` con las convenciones del proyecto. No instalamos skills de terceros de React Native/Expo: evaluamos que con el `AGENTS.md` + la doc versionada de Expo alcanzaba para este alcance.
- Repositorio Git: primer commit en `main`, desarrollo en la rama **`develop`** (decisión de organizar el trabajo), merge a `main` recién cuando todo funcione.

> **Captura de la app base en el teléfono (pendiente):** insertar acá la foto de Expo Go con la app corriendo.

## 5. Desarrollo (por tarea)

> Registro de cada tarea: prompt, qué generó la IA, qué salió mal, qué corregimos a mano y cómo la verificamos. Todos los commits llevan `feat: T0X - descripción` y la prueba final en Expo Go la hace el integrante.

### T01 — Setup del proyecto Expo
- **Prompt:** "Creá el proyecto con `npx create-expo-app` (plantilla expo-router + TypeScript) y hacé el primer commit en la rama develop."
- **Qué generó la IA:** la plantilla por defecto de Expo SDK 57 (con `src/`, `NativeTabs`, componentes demo).
- **Qué salió mal / corregimos:** el template demo era pesado e inestable (`NativeTabs`); además, al hacer el primer push, GitHub ya tenía un README auto-generado en UTF-16 que generó un conflicto. Corregimos: normalizamos el README a UTF-8, descartamos el commit vacío que quedó tras el rebase y limpiamos los componentes demo del template.
- **Verificación:** `npx expo start` levanta; bundle android exportado sin errores (`npx expo export --platform android`).

### T02 — AGENTS.md y estructura base
- **Prompt:** "Escribí `AGENTS.md` con las convenciones del proyecto (constitución de la spec) y creá las carpetas base."
- **Qué generó la IA:** el `AGENTS.md` (stack, convenciones, capa de mocks, verificación) y las carpetas `components/`, `services/`, `types/`, `constants/`.
- **Correcciones:** reemplazamos el `AGENTS.md` del template (que solo decía "leer docs v57") por el nuestro.
- **Verificación:** revisión de que refleja la constitución.

### T03 — Tipos, constantes y mocks
- **Prompt:** "Creá los tipos `Item`/`TipoItem`, las constantes (colores, géneros por tipo), `latencia.ts` (500–1000 ms) y `catalogo.ts` con `listarItems`, `obtenerItem`, `crearItem`, `actualizarItem` sobre datos mock."
- **Qué generó la IA:** el modelo de datos, 12 items mock (4 por tipo) y el servicio con latencia artificial.
- **Correcciones:** la IA proponía portadas con URLs de imágenes: lo cambiamos a **portada simulada** (emoji + color), coherente con el "fuera de alcance" de la spec.
- **Verificación:** `npx tsc --noEmit` sin errores.

### T04 — Listado (Inicio)
- **Prompt:** "Creá los componentes de estado (carga/vacío/error) y la tarjeta de item; implementá la pantalla de inicio que carga con `listarItems` y maneja los tres estados."
- **Qué generó la IA:** `EstadoCarga`, `EstadoVacio`, `EstadoError`, `PortadaSimulada`, `ItemCard` y la pantalla `(tabs)/index.tsx` con `useFocusEffect`.
- **Qué salió mal / corregimos:** la navegación con template string (`router.push(\`/item/${id}\`)`) no pasaba el typecheck de las **typed routes**; lo corregimos a la forma con objeto `{ pathname, params }`.
- **Verificación:** `tsc` OK + prueba en teléfono (pendiente captura).

### T05 — Detalle
- **Prompt:** "Creá la pantalla de detalle `/item/[id]` con los datos completos del item y manejo de error si el id no existe."
- **Qué generó la IA:** pantalla con header de stack, hero a color y tarjetas de datos.
- **Qué salió mal / corregimos:** al cargar con `useEffect` no recargaba al volver de editar; lo cambiamos a `useFocusEffect` (mismo patrón que el listado).
- **Verificación:** `tsc` OK + prueba en teléfono (navegar items del listado).

### T06 — Filtros
- **Prompt:** "Agregá al listado filtros por tipo (Todos/Películas/Series/Juegos) y por género que se adapte al tipo elegido, con estado vacío cuando no hay resultados."
- **Qué generó la IA:** el componente reutilizable `FiltroChips` y el estado de filtro en la pantalla.
- **Correcciones:** agregamos la opción "Todos" en el filtro de género para que siempre haya un chip activo (sino quedaba sin selección visible).
- **Verificación:** `tsc` OK + prueba en teléfono.

### T07 — Formulario de alta
- **Prompt:** "Creá los componentes `CampoTexto` y `FormularioItem` con validación por campo (según CA-05) y la pantalla `/item/nuevo` con botón flotante en Inicio."
- **Qué generó la IA:** formulario reutilizable, validaciones y la pantalla de alta.
- **Qué salió mal / corregimos:** faltaba el campo `plataforma` (lo pedía el modelo de datos); lo agregamos al formulario y actualizamos CA-05 en `spec.md` para mantener coherencia spec↔código.
- **Verificación:** `tsc` OK + prueba en teléfono (form vacío muestra errores por campo; guardar agrega el item al listado).

### T08 — Formulario de edición
- **Prompt:** "Creá la pantalla `/item/[id]/editar` reutilizando `FormularioItem` precargado y agregá el botón editar en el detalle."
- **Qué generó la IA:** la pantalla de edición y el botón.
- **Correcciones:** tipado del parámetro `datos` (Omit<Item,'id'>) quedó mal en un borrador y lo corregimos.
- **Verificación:** `tsc` OK + prueba en teléfono (editar se refleja en el detalle al volver).

### T09 — Lista de deseos con AsyncStorage
- **Prompt:** "Creá `services/deseos.ts` con AsyncStorage (clave `@geekcatalogo/deseos`), la pestaña Deseos con estado vacío y el botón Agregar/Quitar en el detalle."
- **Qué generó la IA:** el wrapper de AsyncStorage, la pantalla `(tabs)/deseos.tsx` y el botón de corazón en el detalle.
- **Correcciones:** `Promise.all` con `obtenerItem` tiraba todo si un id no existía; lo corregimos para resolver cada item con try/catch individual y filtrar los nulos.
- **Verificación:** `tsc` OK + prueba en teléfono (persistencia al cerrar y reabrir la app).

### T10 — Pulido, README y este documento
- **Prompt:** "Revisá estados de carga/vacío/error en todas las pantallas, escribí el README con instrucciones y el documento del proceso."
- **Qué generó la IA:** README.md y PROCESO.md, más el pulido visual (gradientes, sombras, tarjetas).
- **Correcciones:** mejoras estéticas finales (headers con `LinearGradient`, FAB, estrellas de puntuación).
- **Verificación:** `npx expo export --platform android` sin errores; recorrido completo en Expo Go (pendiente captura).

---

## 6. Conclusiones

**Qué funcionó:**
- El flujo SDD evitó el código "inventado": cada pantalla salió de una tarea con criterio de aceptación, y las correcciones que hicimos están registradas acá (spec antes que código).
- El `AGENTS.md` y los documentos que mandan (`spec.md`, `plan.md`, `tasks.md`) le dieron contexto estable al agente en cada sesión.
- Los mocks con latencia simulada nos permitieron desarrollar y probar los estados de carga/vacío/error sin backend, tal como pide la actividad.

**Qué no funcionó / costó más:**
- La plantilla por defecto de Expo SDK 57 trae mucho código demo y una API de tabs nueva (NativeTabs): hubo que limpiarla y decidir usar los JavaScript tabs estándar.
- Las **typed routes** de expo-router exigen cuidado con los strings de rutas dinámicas (tuvimos que usar la forma `{ pathname, params }`).
- El formulario y la spec quedaron desalineados en un campo (`plataforma`): nos dimos cuenta al validar tipos, no al diseñar. Aprendimos a auditar spec↔código en cada tarea.

**Qué haríamos distinto:**
- Habríamos probado la app en el teléfono desde la primera tarea (T01), para detectar antes problemas de entorno/red.
- Habríamos definido de entrada el campo `plataforma` en los criterios del formulario.
- Evaluaríamos de nuevo la instalación de GitHub Spec Kit (la descartamos para mantenerlo simple, pero su flujo `/speckit.*` es muy similar al que usamos a mano).

---

## Fuentes consultadas

- React Native: https://reactnative.dev/ · https://reactnative.dev/docs/intro-react-native-components
- Expo: https://docs.expo.dev/ · https://docs.expo.dev/versions/v57.0.0/ · https://docs.expo.dev/router/introduction/ · https://docs.expo.dev/router/advanced/tabs/
- AsyncStorage: https://docs.expo.dev/versions/v57.0.0/sdk/async-storage/
- GitHub Spec Kit: https://github.com/github/spec-kit · https://github.github.com/spec-kit/quickstart.html · https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/ · https://developer.microsoft.com/blog/spec-driven-development-spec-kit/
- Kiro: https://kiro.dev/ · https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html (Thoughtworks — Kiro, Spec Kit y Tessl)
