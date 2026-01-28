# Api Explorer

Documenta y prueba endpoints de API de forma estructurada.

## Sintaxis

````markdown
+++api-explorer
---
baseUrl: "https://jsonplaceholder.typicode.com"
endpoints:
  - path: "/posts/{id}"
    method: "GET"
    title: "Obtener una Publicación por ID"
    description: "Recupera una única publicación utilizando su ID."
    parameters:
      - name: "id"
        in: "path"
        description: "El ID de la publicación a recuperar."
        required: true
        schema:
          type: "integer"
          example: 1
---
+++
````