# Especificación — GeekCatálogo

> Actividad Áulica N.° 1 — React Native II — Instituto Politécnico Formosa
> Proyecto: `trabajo_practico_react_nativ-felipe_monzon`
> Nombre provisorio de la app: **GeekCatálogo** (catálogo de películas, series y juegos con lista de deseos).

---

## 1. Reglas del proyecto (constitución)

Estas reglas ordenan todo el desarrollo. No se programa nada que las contradiga.

| Regla | Valor |
| --- | --- |
| Stack | React Native + **Expo** + **expo-router** + **TypeScript** (estricto) |
| Backend | No hay. Los datos vienen de **mocks** en `services/` |
| Mocks | Funciones `async` que simulan un servicio real con latencia artificial de **500–1000 ms** (`Promise` + `setTimeout`) |
| Persistencia | Solo la **lista de deseos** usa **AsyncStorage** (opcional que suma) |
| Idioma | Código, comentarios, UI y documentación en **español** |
| Nombres | `camelCase` para variables/funciones, `PascalCase` para componentes y tipos |
| Commits | Un commit por tarea, mensaje `feat: T0X - descripción` |
| Navegación | expo-router con pestañas (`tabs`) + stack para detalle y formularios |
| Estados | Toda pantalla que carga datos muestra estados de **carga**, **vacío** y **error** |
| Imágenes | Portadas simuladas (emoji + color), sin URLs externas |

---

## 2. Visión del producto

**GeekCatálogo** es un catálogo de entretenimiento que reúne **películas**, **series** y **juegos** en una sola app. El usuario explora el catálogo, filtra por tipo y género, consulta el detalle de cada item y arma su propia **lista de deseos**, que queda guardada en el dispositivo. Además puede **dar de alta y editar** items para aportar al catálogo.

Es un prototipo funcional sin backend: todos los datos provienen de un servicio mock.

---

## 3. Historias de usuario

| ID | Como… | quiero… | para… |
| --- | --- | --- | --- |
| HU-01 | usuario | ver el listado de items del catálogo | explorar qué hay disponible |
| HU-02 | usuario | filtrar el listado por tipo (películas / series / juegos) y por género | encontrar rápido lo que me interesa |
| HU-03 | usuario | ver el detalle de un item | conocer descripción, año, género, puntuación y plataforma |
| HU-04 | usuario | guardar items en mi lista de deseos y consultarla después | tener mi selección siempre disponible |
| HU-05 | usuario | dar de alta un item nuevo con validación de campos | aportar contenido al catálogo |
| HU-06 | usuario | editar un item existente | corregir o actualizar su información |
| HU-07 | usuario | ver indicadores de carga, listas vacías y errores | saber qué está pasando con los datos |

---

## 4. Pantallas

Navegación: 2 pestañas (Inicio, Lista de deseos) + stack (Detalle, Nuevo item, Editar item).

### P1 — Inicio (lista del catálogo) — Tab
- Listado de items con **estado de carga** (spinner), **estado vacío** y **estado de error** con reintento.
- Filtros por **tipo** (chips: Todos / Películas / Series / Juegos).
- Filtro por **género** (según el tipo elegido).
- Cada item muestra portada simulada, título, tipo y año.
- Al tocar un item, navega al detalle.
- Botón flotante para crear un item nuevo.

### P2 — Detalle — Stack `/item/[id]`
- Muestra título, tipo, género, año, descripción, puntuación y plataforma.
- Botón **"Agregar / Quitar de la lista de deseos"** que refleja el estado actual.
- Si el item no existe, muestra estado vacío/error.

### P3 — Lista de deseos — Tab
- Lista los items guardados en **AsyncStorage**.
- Estado vacío con mensaje y acción para ir al catálogo.
- Al tocar un item, navega al detalle.
- Permite quitar items de la lista.

### P4 — Nuevo item — Stack `/item/nuevo`
- Formulario de **alta** con validación de campos.
- Al guardar: muestra carga, vuelve a la lista y el item aparece en el catálogo (mock en memoria).

### P5 — Editar item — Stack `/item/[id]/editar`
- Formulario **precargado** con los datos del item.
- Misma validación que el alta (componente reutilizado).
- Al guardar: vuelve al detalle con los datos actualizados.

---

## 5. Criterios de aceptación

### CA-01 — Listado (P1)
- [ ] Muestra los items del mock entre 500 y 1000 ms después de entrar.
- [ ] Mientras espera, se ve un indicador de carga.
- [ ] Si la lista queda vacía, se ve un estado vacío con mensaje.
- [ ] Si el servicio falla, se ve un mensaje de error con botón **Reintentar**.
- [ ] Al tocar un item navega a la pantalla de detalle.

### CA-02 — Filtros (P1)
- [ ] Existe la opción "Todos" además de los tres tipos.
- [ ] Al elegir un tipo, solo se ven items de ese tipo.
- [ ] El filtro de género se actualiza según el tipo elegido.
- [ ] El estado vacío también aparece cuando el filtro no tiene resultados.

### CA-03 — Detalle (P2)
- [ ] Muestra todos los campos del item (título, tipo, género, año, descripción, puntuación, plataforma).
- [ ] El botón de lista de deseos muestra el estado correcto (agregado o no).
- [ ] Al tocar el botón, cambia el estado y persiste el cambio.
- [ ] Si el id no existe, muestra estado vacío o error.

### CA-04 — Lista de deseos (P3)
- [ ] Los items guardados persisten entre reinicios de la app (AsyncStorage).
- [ ] Con lista vacía se muestra un mensaje y una acción para ir al catálogo.
- [ ] Al tocar un item navega al detalle.
- [ ] Se puede quitar un item de la lista.

### CA-05 — Alta (P4)
- [ ] Campos con validación: título (requerido), tipo (selección requerida), género (requerido), año (número entre 1900 y 2026), descripción (mínimo 10 caracteres), puntuación (0 a 10), plataforma (requerida, mínimo 2 caracteres).
- [ ] Los errores se muestran por campo y el formulario no envía si hay errores.
- [ ] Al guardar, el item aparece en el listado del catálogo (mock).

### CA-06 — Edición (P5)
- [ ] El formulario precarga los datos del item.
- [ ] Usa las mismas validaciones que el alta.
- [ ] Al guardar, el detalle muestra los datos actualizados.

### CA-07 — Estados
- [ ] Carga, vacío y error están implementados en el listado y la lista de deseos.
- [ ] No hay pantallas que se queden en blanco durante la carga.

---

## 6. Fuera de alcance

- Backend real, base de datos o autenticación.
- Imágenes de portada reales (se usan portadas simuladas con emoji y color).
- Búsqueda por texto libre.
- Comentarios, reseñas o valoraciones de otros usuarios.
- Paginación o infinite scroll.
- Sincronización entre dispositivos.
- Modo offline completo (solo persiste la lista de deseos).

---

## 7. Modelo de datos

```ts
type TipoItem = 'pelicula' | 'serie' | 'juego';

interface Item {
  id: string;
  tipo: TipoItem;
  titulo: string;
  genero: string;
  anio: number;
  descripcion: string;
  puntuacion: number; // 0 a 10
  plataforma: string; // ej. Netflix, Steam, Cine, HBO Max
  emoji: string;      // portada simulada
  color: string;      // portada simulada
}
```

Géneros posibles por tipo:
- Películas: Acción, Ciencia ficción, Terror, Comedia, Drama.
- Series: Drama, Comedia, Crimen, Ciencia ficción, Documental.
- Juegos: Aventura, RPG, Shooter, Estrategia, Deportes.
