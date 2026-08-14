# GeekCatálogo

Catálogo de **películas, series y juegos** con lista de deseos, desarrollado como prototipo funcional **sin backend** (datos mock) para la Actividad Áulica N.° 1 de React Native II, usando **Spec-Driven Development**.

## Stack

- React Native + **Expo SDK 57** + **expo-router** + **TypeScript** (estricto).
- Datos simulados en `src/services/` con latencia artificial de 500–1000 ms.
- Persistencia local de la lista de deseos con **AsyncStorage**.
- Sin backend: toda la capa de datos es reemplazable por un servicio real.

## Requisitos

- **Node.js LTS** (Expo SDK 57 requiere Node 22.13 o superior).
- **Expo Go** instalado en el teléfono (Android o iOS).
- Celular y PC conectados a la **misma red Wi-Fi**.

## Cómo correr el proyecto

```bash
# 1. Instalar dependencias (solo la primera vez)
npm install

# 2. Levantar el servidor de desarrollo
npx expo start
```

Con el QR en la terminal:

- **Android**: abrí Expo Go y escaneá el QR desde la app.
- **iPhone**: escaneá el QR con la cámara.

En la terminal mientras corre el servidor:

- `r` → recargar la app.
- `m` → abrir el menú de desarrollo del dispositivo.
- `s` → cambiar entre modo LAN y tunnel (útil si no comparten la red).

## Funcionalidades

- **Inicio**: listado del catálogo con filtros por tipo (películas / series / juegos) y por género.
- **Detalle**: información completa del item (descripción, año, género, puntuación y plataforma).
- **Lista de deseos**: guardar y consultar items, persistida en el dispositivo.
- **Alta y edición**: formulario con validación de campos para agregar o modificar items del catálogo.
- Estados de **carga**, **vacío** y **error** con reintento en todas las pantallas.

## Estructura

```
src/
├── app/                  # Rutas de expo-router (pantallas)
│   ├── _layout.tsx       # Stack raíz
│   ├── (tabs)/           # Pestañas: Inicio y Deseos
│   └── item/             # Detalle, alta y edición
├── components/           # Componentes reutilizables
├── constants/            # Colores, tipos y géneros
├── services/             # Mocks (latencia, datos, catálogo, deseos)
└── types/                # Tipos de dominio
```

## Documentación del proyecto

- `spec.md` — especificación (constitución, historias de usuario, pantallas, criterios de aceptación).
- `plan.md` — plan técnico (estructura, navegación, mocks, verificación).
- `tasks.md` — lista de tareas atómicas con su estado.
- `AGENTS.md` — convenciones para agentes de IA que trabajen en el repo.
- `PROCESO.md` — documento del proceso (investigación, spec, plan, tareas, desarrollo).
