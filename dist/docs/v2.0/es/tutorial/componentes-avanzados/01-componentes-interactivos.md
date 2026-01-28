---
title: "Componentes Interactivos"
position: 1
---

# Componentes Interactivos

Estos componentes permiten a los usuarios interactuar con el contenido.

## Acordeón (Accordion)

Un acordeón es perfecto para ocultar y mostrar contenido, como en una sección de preguntas frecuentes.

**Sintaxis:**

````markdown
+++accordion
---
allowMultiple: false # Opcional: true para permitir abrir varios a la vez
---
### ¿Cuál es el primer ítem?
Este es el contenido del primer ítem. Puede contener **Markdown**.

### ¿Cuál es el segundo ítem?
Este es el contenido del segundo ítem.

### ¿Y el tercero?
Contenido del tercer ítem.
+++
````

**Resultado:**

+++accordion
---
allowMultiple: false
---
### ¿Cuál es el primer ítem?
Este es el contenido del primer ítem. Puede contener **Markdown**.

### ¿Cuál es el segundo ítem?
Este es el contenido del segundo ítem.

### ¿Y el tercero?
Contenido del tercer ítem.
+++

## Cuestionario (Quiz)

Crea un cuestionario de opción múltiple para evaluar la comprensión del usuario.

**Sintaxis:**

````markdown
+++quiz
---
questions:
  - text: "¿De qué color es el cielo?"
    choices:
      - Verde
      - Azul
      - Rojo
    answer: "Azul"
  - text: "¿Cuánto es 2 + 2?"
    choices:
      - 3
      - 4
      - 5
    answer: 4
---
+++
````

**Resultado:**

+++quiz
---
questions:
  - text: "¿De qué color es el cielo?"
    choices:
      - Verde
      - Azul
      - Rojo
    answer: "Azul"
  - text: "¿Cuánto es 2 + 2?"
    choices:
      - 3
      - 4
      - 5
    answer: "4"
---
+++

## Carrusel (Carousel)

Muestra una serie de imágenes en un carrusel interactivo.

**Sintaxis:**

````markdown
+++carousel
---
autoPlay: true
interval: 3000
showDots: true
items:
  - src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&h=400&fit=crop"
    alt: "Ola abstracta de colores"
  - src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&h=400&fit=crop"
    alt: "Montañas nevadas bajo un cielo estrellado"
  - src: "https://images.unsplash.com/photo-1483401757487-2131b2621388?q=80&w=800&h=400&fit=crop"
    alt: "Sendero en un frondoso bosque verde"
---
+++
````

**Resultado:**

+++carousel
---
autoPlay: true
interval: 3000
showDots: true
items:
  - src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&h=400&fit=crop"
    alt: "Ola abstracta de colores"
  - src: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&h=400&fit=crop"
    alt: "Montañas nevadas bajo un cielo estrellado"
  - src: "https://images.unsplash.com/photo-1483401757487-2131b2621388?q=80&w=800&h=400&fit=crop"
    alt: "Sendero en un frondoso bosque verde"
---
+++

## Tutorial Slider

Combina un panel de medios (imagen, código) con un panel de texto para crear un tutorial paso a paso.

**Sintaxis:**
````markdown
+++tutorial-slider
---
steps:
  - media:
      type: image
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&h=300&fit=crop"
      alt: "Código en una pantalla"
    content: |
      ### Instalación
      Este es el primer paso. Habla sobre cómo instalar el software.
  - media:
      type: code
      lang: javascript
      code: |
        console.log("Hello, World!");
    content: |
      ### Hola Mundo
      Este es el segundo paso. Muestra un ejemplo de código básico.
---
+++
````
**Resultado:**

+++tutorial-slider
---
steps:
  - media:
      type: image
      src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&h=300&fit=crop"
      alt: "Código en una pantalla"
    content: |
      ### Instalación
      Este es el primer paso. Habla sobre cómo instalar el software.
  - media:
      type: code
      lang: javascript
      code: |
        console.log("Hello, World!");
    content: |
      ### Hola Mundo
      Este es el segundo paso. Muestra un ejemplo de código básico.
---
+++


