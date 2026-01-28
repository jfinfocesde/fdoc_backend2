# Scrollytelling

Narrativa por pasos con panel de medios fijo y progreso.

````markdown
+++scrollytelling
---
steps:
  - date: "2024-01-10"
    title: "Variables"
    content: |
      ## Paso 1: Variables
      Las variables almacenan información para usarla más adelante.
    media:
      type: "image"
      src: "/assets/images/scrolly/variables.png"
      alt: "Ejemplo de variables"
  - date: "2024-01-12"
    title: "Condicionales"
    content: |
      ## Paso 2: Condicionales
      Ejecuta lógica diferente según una condición.
    media:
      type: "code"
      lang: "javascript"
      code: |
        const edad = 20;
        if (edad >= 18) {
          console.log("Mayor de edad");
        } else {
          console.log("Menor de edad");
        }
  - date: "2024-01-15"
    title: "Flujos"
    content: |
      ## Paso 3: Flujo
      Visualiza el proceso con un diagrama.
    media:
      type: "mermaid"
      chart: |
        flowchart TD
          A[Inicio] --> B{¿Condición?}
          B -->|Sí| C[Camino A]
          B -->|No| D[Camino B]
---
+++
````