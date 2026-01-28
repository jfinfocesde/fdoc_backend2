---
title: "Multimedia y Embebidos"
position: 3
---

# Multimedia y Embebidos

Integra fácilmente imágenes, galerías, videos y contenido interactivo de otras plataformas.

## Imágenes con Lightbox

Todas las imágenes estándar de Markdown se mejoran automáticamente con una funcionalidad de lightbox (pantalla completa) y opciones de personalización.

**Sintaxis Básica:**
```markdown
![Una bonita vista de una montaña con un lago.](https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070)
```

**Sintaxis con Opciones:**
Puedes añadir opciones como alineación y sombra en el texto `alt`.

```markdown
![Una bonita vista{align=right width=300px shadow=true}](https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800)
```

**Resultado:**

![Una bonita vista{align=right width=300px shadow=true}](https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=800)
Esta es una demostración de cómo el texto fluye alrededor de una imagen alineada. El componente de imagen respeta las opciones de alineación y anchura para integrarse perfectamente en tu contenido. Haz clic en la imagen para abrirla en el visor de pantalla completa.



## Galería de Imágenes (Image Gallery)

Muestra múltiples imágenes en una cuadrícula interactiva. Todas las imágenes se abren en un lightbox compartido.

**Sintaxis:**
````markdown
+++gallery
---
columns: 3
items:
  - src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400"
    alt: "Pueblo en un lago"
  - src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400"
    alt: "Cabaña en la montaña"
  - src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400"
    alt: "Bosque brumoso"
---
+++
````
**Resultado:**
+++gallery
---
columns: 3
items:
  - src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400"
    alt: "Pueblo en un lago"
  - src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=400"
    alt: "Cabaña en la montaña"
  - src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400"
    alt: "Bosque brumoso"
---
+++

## Video Embebido (Video Embed)

Incrusta videos de YouTube o Vimeo fácilmente.

**Sintaxis:**
````markdown
+++video
---
src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
title: "Ejemplo de Video de YouTube"
---
+++
````
**Resultado:**
+++video
---
src: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
title: "Ejemplo de Video de YouTube"
---
+++

## Embebido de Código en Vivo (Live Code Embed)

Incrusta editores de código interactivos de servicios como CodePen, JSFiddle o CodeSandbox.

**Sintaxis:**
````markdown
+++live-code
---
src: "https://codepen.io/chriscoyier/pen/gOMdOr"
title: "Ejemplo de CodePen"
---
+++
````
**Resultado:**
+++live-code
---
src: "https://codepen.io/chriscoyier/pen/gOMdOr"
title: "Ejemplo de CodePen"
---
+++


