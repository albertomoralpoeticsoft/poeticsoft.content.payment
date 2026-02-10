# Documentación de Bloques - Poeticsoft Content Payment

## Índice
1. [Breadcrumbs](#1-breadcrumbs)
2. [Campus Breadcrumbs](#2-campus-breadcrumbs)
3. [Campus Container Children](#3-campus-container-children)
4. [Campus Contenido Relacionado](#4-campus-contenido-relacionado)
5. [Campus Navigation](#5-campus-navigation)
6. [Column Tools](#6-column-tools)
7. [CTA Campus](#7-cta-campus)
8. [Insert Page](#8-insert-page)
9. [My Campus](#9-my-campus)
10. [My Tools](#10-my-tools)
11. [Page Context](#11-page-context)
12. [Page Navigation](#12-page-navigation)
13. [Post Price](#13-post-price)
14. [Related Pages](#14-related-pages)
15. [Tree Navigation](#15-tree-navigation)

---

## 1. Breadcrumbs
**Nombre:** `poeticsoft/breadcrumbs`
**Título:** Page Breadcrumbs

### Descripción
Bloque que muestra el camino de navegación (breadcrumbs) de la página actual. Permite a los usuarios visualizar la ruta jerárquica de la página dentro de la estructura del sitio.

### Atributos
- `blockId` (string): Identificador único del bloque
- `refClientId` (string): Referencia al ID del cliente del bloque

### Soporte
- Alineación: izquierda, centro, derecha
- Bordes personalizables (color, radio, estilo, ancho)
- Espaciado (márgenes y padding)
- Dimensiones (altura mínima y ancho)

### Archivos
- Editor: `./build/editor.js`, `./build/editor.css`
- Vista: `./build/view.js`, `./build/view.css`
- Render: `./render.php`

---

## 2. Campus Breadcrumbs
**Nombre:** `poeticsoft/campusbreadcrumbs`
**Título:** Campus Breadcrumbs

### Descripción
Similar al bloque de breadcrumbs estándar, pero específicamente diseñado para mostrar el camino de navegación dentro del contexto del campus/área de contenido de pago.

### Atributos
- `blockId` (string): Identificador único del bloque
- `refClientId` (string): Referencia al ID del cliente del bloque

### Soporte
- Alineación: izquierda, centro, derecha
- Bordes personalizables (color, radio, estilo, ancho)
- Espaciado (márgenes y padding)
- Dimensiones (altura mínima y ancho)

### Archivos
- Editor: `./build/editor.js`, `./build/editor.css`
- Vista: `./build/view.js`, `./build/view.css`
- Render: `./render.php`

---

## 3. Campus Container Children
**Nombre:** `poeticsoft/campuscontainerchildren`
**Título:** Campus Container Children

### Descripción
Muestra los accesos directos, sugerencias y contenidos relacionados de un contenedor del campus. Presenta una vista organizada de los elementos hijos de un contenedor específico, ideal para mostrar la estructura de cursos o módulos.

### Atributos
- `blockId` (string): Identificador único del bloque
- `refClientId` (string): Referencia al ID del cliente del bloque
- `title` (string): Título del bloque
  - Valor por defecto: `"Título"`
- `sectionHeadingType` (string): Tipo de encabezado para secciones
  - Valor por defecto: `"h3"`
- `areaHeadingType` (string): Tipo de encabezado para áreas
  - Valor por defecto: `"h4"`
- `contents` (string): Tipo de contenidos a mostrar
  - Valor por defecto: `"subscriptionsandfree"`
- `mode` (string): Modo de visualización
  - Valor por defecto: `"complete"`

### Soporte
- Alineación: izquierda, centro, derecha
- Bordes personalizables
- Espaciado completo
- Dimensiones configurables

### Archivos
- Editor: `./build/editor.js`, `./build/editor.css`
- Vista: `./build/view.js`, `./build/view.css`
- Render: `./render.php`

---

## 4. Campus Contenido Relacionado
**Nombre:** `poeticsoft/campusrelatedcontent`
**Título:** Campus Contenido Relacionado

### Descripción
Muestra contenidos relacionados con la página actual del campus. Utiliza etiquetas y modos de inclusión para filtrar y presentar contenido relevante basado en el contexto actual.

### Atributos
- `blockId` (string): Identificador único del bloque
- `refClientId` (string): Referencia al ID del cliente del bloque
- `title` (string): Título del bloque
  - Valor por defecto: `"Título"`
- `sectionHeadingType` (string): Tipo de encabezado para secciones
  - Valor por defecto: `"h3"`
- `areaHeadingType` (string): Tipo de encabezado para áreas
  - Valor por defecto: `"h4"`
- `includesMode` (string): Modo de inclusión de contenidos
  - Valor por defecto: `""`
- `tags` (string): Etiquetas en formato JSON para filtrar contenido
  - Valor por defecto: `"[]"`
- `mode` (string): Modo de visualización
  - Valor por defecto: `"complete"`
- `visibility` (string): Control de visibilidad
  - Valor por defecto: `"visiblealways"`

### Soporte
- Alineación completa
- Bordes personalizables
- Espaciado completo
- Dimensiones configurables

### Archivos
- Editor: `./build/editor.js`, `./build/editor.css`
- Vista: `./build/view.js`, `./build/view.css`
- Render: `./render.php`

---

## 5. Campus Navigation
**Nombre:** `poeticsoft/campustreenav`
**Título:** Campus navigation

### Descripción
Proporciona navegación en árbol específica para el campus. Permite mostrar la estructura jerárquica de contenidos del campus con opciones para filtrar solo suscripciones y mostrar leyendas.

### Atributos
- `blockId` (string): Identificador único del bloque
- `refClientId` (string): Referencia al ID del cliente del bloque
- `onlySubscriptions` (boolean): Si solo se muestran suscripciones
  - Valor por defecto: `true`
- `showLegend` (boolean): Si se muestra la leyenda
  - Valor por defecto: `true`

### Soporte
- Alineación: izquierda, centro, derecha
- Bordes personalizables
- Espaciado completo
- Dimensiones configurables

### Archivos
- Editor: `./build/editor.js`, `./build/editor.css`
- Vista: `./build/view.js`, `./build/view.css`
- Render: `./render.php`

---

## 6. Column Tools
**Nombre:** `poeticsoft/columntools`
**Título:** Column Tools

### Descripción
Herramientas adicionales para columnas de WordPress. Este bloque debe usarse dentro de un bloque de columna core de WordPress (tiene `parent: "core/column"`). Agrega funcionalidades expandibles/colapsables a las columnas.

### Atributos
- `blockId` (string): Identificador único del bloque
- `refClientId` (string): Referencia al ID del cliente del bloque
- `defaultOpen` (boolean): Si la herramienta está abierta por defecto
  - Valor por defecto: `true`

### Soporte
- Alineación: izquierda, centro, derecha
- Bordes personalizables
- Espaciado completo
- Dimensiones configurables

### Características especiales
- **Bloque hijo:** Solo puede usarse dentro de `core/column`

### Archivos
- Editor: `./build/editor.js`, `./build/editor.css`
- Vista: `./build/view.js`, `./build/view.css`
- Render: `./render.php`

---

## 7. CTA Campus
**Nombre:** `poeticsoft/ctacampus`
**Título:** CTA Campus

### Descripción
Call-to-Action específico para el campus. Permite crear botones de llamada a la acción con texto personalizable, destinos específicos y opciones de descuento.

### Atributos
- `blockId` (string): Identificador único del bloque
- `refClientId` (string): Referencia al ID del cliente del bloque
- `targetId` (number): ID del destino del CTA
- `buttonText` (string): Texto del botón
  - Valor por defecto: `""`
- `targetText` (string): Texto del destino
  - Valor por defecto: `""`
- `discount` (number): Descuento aplicable
  - Valor por defecto: `0`

### Soporte
- Alineación: izquierda, centro, derecha
- Clases personalizadas
- Espaciado solo de márgenes

### Archivos
- Editor: `./build/editor.js`, `./build/editor.css`
- Vista: `./build/view.js`, `./build/view.css`
- Render: `./render.php`

---

## 8. Insert Page
**Nombre:** `poeticsoft/insertpage`
**Título:** Insert page

### Descripción
Permite insertar el contenido de otra página dentro de la página actual. Ofrece control granular sobre qué elementos mostrar: miniatura, título, extracto y/o contenido completo.

### Atributos
- `blockId` (string): Identificador único del bloque
- `refClientId` (string): Referencia al ID del cliente del bloque
- `pageid` (number): ID de la página a insertar
  - Valor por defecto: `0`
- `showthumb` (boolean): Mostrar miniatura
  - Valor por defecto: `true`
- `showtitle` (boolean): Mostrar título
  - Valor por defecto: `true`
- `showexcerpt` (boolean): Mostrar extracto
  - Valor por defecto: `true`
- `showcontent` (boolean): Mostrar contenido completo
  - Valor por defecto: `true`

### Soporte
- Alineación completa
- Bordes personalizables
- Espaciado completo
- Dimensiones configurables

### Archivos
- Editor: `./build/editor.js`, `./build/editor.css`
- Vista: `./build/view.js`, `./build/view.css`
- Render: `./render.php`

---

## 9. My Campus
**Nombre:** `poeticsoft/mycampus`
**Título:** My Campus

### Descripción
Muestra las suscripciones del usuario actual en el campus. Panel personalizado que presenta las suscripciones activas del usuario con diferentes modos de visualización.

### Atributos
- `blockId` (string): Identificador único del bloque
- `refClientId` (string): Referencia al ID del cliente del bloque
- `mode` (string): Modo de visualización
  - Valor por defecto: `"complete"`

### Soporte
- Alineación completa
- Bordes personalizables
- Espaciado completo
- Dimensiones configurables

### Archivos
- Editor: `./build/editor.js`, `./build/editor.css`
- Vista: `./build/view.js`, `./build/view.css`
- Render: `./render.php`

---

## 10. My Tools
**Nombre:** `poeticsoft/mytools`
**Título:** My tools

### Descripción
Muestra las herramientas personales del usuario. Presenta accesos rápidos a las herramientas disponibles con opciones de visualización como enlaces o botones y control de visibilidad del ID.

### Atributos
- `blockId` (string): Identificador único del bloque
- `refClientId` (string): Referencia al ID del cliente del bloque
- `linkType` (string): Tipo de enlace
  - Valor por defecto: `"link"`
- `idVisible` (boolean): Si el ID es visible
  - Valor por defecto: `true`

### Soporte
- Alineación completa
- Bordes personalizables
- Espaciado completo
- Dimensiones configurables

### Archivos
- Editor: `./build/editor.js`, `./build/editor.css`
- Vista: `./build/view.js`, `./build/view.css`
- Render: `./render.php`

---

## 11. Page Context
**Nombre:** `poeticsoft/pagecontext`
**Título:** Page context

### Descripción
Muestra información contextual de la página actual. Proporciona contexto adicional sobre la página que se está visualizando con encabezados configurables.

### Atributos
- `blockId` (string): Identificador único del bloque
- `refClientId` (string): Referencia al ID del cliente del bloque
- `headingType` (string): Tipo de encabezado
  - Valor por defecto: `"h3"`

### Soporte
- Alineación completa
- Bordes personalizables
- Espaciado completo
- Dimensiones configurables

### Archivos
- Editor: `./build/editor.js`, `./build/editor.css`
- Vista: `./build/view.js`, `./build/view.css`
- Render: `./render.php`

---

## 12. Page Navigation
**Nombre:** `poeticsoft/pagenav`
**Título:** Page navigation

### Descripción
Proporciona navegación entre páginas. Permite crear sistemas de navegación basados en la estructura de árbol de páginas con raíz configurable.

### Atributos
- `blockId` (string): Identificador único del bloque
- `refClientId` (string): Referencia al ID del cliente del bloque
- `treerootid` (number): ID de la raíz del árbol de navegación
  - Valor por defecto: `null`

### Soporte
- Alineación completa
- Bordes personalizables
- Espaciado completo
- Dimensiones configurables

### Archivos
- Editor: `./build/editor.js`, `./build/editor.css`
- Vista: `./build/view.js`, `./build/view.css`
- Render: `./render.php`

---

## 13. Post Price
**Nombre:** `poeticsoft/price`
**Título:** Post price

### Descripción
Muestra el precio asociado a un post/página. Bloque especializado para mostrar información de precios en el contexto de contenido de pago.

### Atributos
- `blockId` (string): Identificador único del bloque
- `refClientId` (string): Referencia al ID del cliente del bloque

### Soporte
- Alineación completa
- Bordes personalizables
- Espaciado completo
- Dimensiones configurables

### Archivos
- Editor: `./build/editor.js`, `./build/editor.css`
- Vista: `./build/view.js`, `./build/view.css`
- Render: `./render.php`

---

## 14. Related Pages
**Nombre:** `poeticsoft/relatedpages`
**Título:** Related pages

### Descripción
Muestra páginas relacionadas con la página actual. Presenta sugerencias de contenido relacionado basado en la estructura y relaciones de la página.

### Atributos
- `blockId` (string): Identificador único del bloque
- `refClientId` (string): Referencia al ID del cliente del bloque
- `headingType` (string): Tipo de encabezado
  - Valor por defecto: `"h3"`

### Soporte
- Alineación completa
- Bordes personalizables
- Espaciado completo
- Dimensiones configurables

### Archivos
- Editor: `./build/editor.js`, `./build/editor.css`
- Vista: `./build/view.js`, `./build/view.css`
- Render: `./render.php`

---

## 15. Tree Navigation
**Nombre:** `poeticsoft/treenav`
**Título:** Tree navigation

### Descripción
Navegación en árbol genérica para páginas. Similar a Campus Navigation pero sin restricciones específicas del campus, permitiendo navegación jerárquica de cualquier estructura de páginas.

### Atributos
- `blockId` (string): Identificador único del bloque
- `refClientId` (string): Referencia al ID del cliente del bloque
- `treerootid` (number): ID de la raíz del árbol de navegación
  - Valor por defecto: `null`

### Soporte
- Alineación completa
- Bordes personalizables
- Espaciado completo
- Dimensiones configurables

### Archivos
- Editor: `./build/editor.js`, `./build/editor.css`
- Vista: `./build/view.js`, `./build/view.css`
- Render: `./render.php`

---

## Notas Generales

### Características Comunes
- **API Version:** Todos los bloques utilizan la API versión 2 de WordPress
- **Categoría:** Todos pertenecen a la categoría `"poeticsoft"`
- **Versión:** Todos tienen versión `1.0.0`
- **Textdomain:** Todos usan `"poeticsoft"` como dominio de texto
- **Icon:** Todos usan el icono `"media-archive"`

### Atributos Compartidos
La mayoría de bloques comparten estos atributos base:
- `blockId` (string): Identificador único del bloque
- `refClientId` (string): Referencia al ID del cliente del bloque

### Estructura de Archivos
Todos los bloques incluyen:
- **Editor Scripts:** `./build/editor.js`
- **Editor Styles:** `./build/editor.css`
- **View Scripts:** `./build/view.js`
- **View Styles:** `./build/view.css`
- **Render Template:** `./render.php`

### Soporte de Estilos
La mayoría de bloques soportan:
- **Alineación:** left, center, right
- **Anchor:** false (no soportan anclas)
- **Custom ClassName:** true
- **HTML:** false (no permiten edición HTML directa)
- **Bordes:** Experimentales y estándar (color, radio, estilo, ancho)
- **Espaciado:** Márgenes y padding
- **Dimensiones:** Altura mínima y ancho

---

**Fecha de generación:** 2026-02-09
**Generado por:** Claude Code
