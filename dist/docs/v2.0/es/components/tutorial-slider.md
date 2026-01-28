# Tutorial Slider

Deslizador interactivo con contenido y medios por paso.

````markdown
+++tutorial-slider
---
steps:
  - content: |
      ### Paso 1
      Instala dependencias y prepara el entorno.
    media:
      type: "image"
      src: "/assets/images/tutorial/setup.png"
      alt: "Setup"
  - content: |
      ### Paso 2
      Escribe tu primer programa.
    media:
      type: "code"
      lang: "python"
      code: |
        print("Hola, mundo")
  - content: |
      ### Paso 3
      Comprende el flujo con un diagrama.
    media:
      type: "mermaid"
      chart: |
        sequenceDiagram
          participant U as Usuario
          participant A as App
          U->>A: Envía datos
          A-->>U: Respuesta
---
+++
````