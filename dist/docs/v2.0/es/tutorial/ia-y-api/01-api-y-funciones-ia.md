---
title: "API y Funciones de IA"
position: 1
---

# API y Funciones de IA

La plataforma incluye potentes herramientas para interactuar con APIs y utilizar la inteligencia artificial de Google Gemini.

## Cliente REST (RestClient)

Un cliente HTTP interactivo para realizar solicitudes a APIs directamente desde tu documentación.

**Sintaxis:**

````markdown
+++rest-client
---
method: "GET"
url: "https://jsonplaceholder.typicode.com/posts/1"
headers:
  Content-Type: "application/json"
body: ""
---
+++
````

**Resultado:**

+++rest-client
---
method: "GET"
url: "https://jsonplaceholder.typicode.com/posts/1"
headers:
  Content-Type: "application/json"
body: ""
---
+++

## Explorador de API (ApiExplorer)

Documenta y prueba tus endpoints de API de una manera estructurada y fácil de usar, similar a Swagger UI.

**Sintaxis:**

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

**Resultado:**

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
  - path: "/posts"
    method: "POST"
    title: "Crear una Nueva Publicación"
    description: "Añade una nueva publicación al blog."
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: "object"
            properties:
              title:
                type: "string"
                example: "foo"
              body:
                type: "string"
                example: "bar"
              userId:
                type: "integer"
                example: 1
---
+++

## Funciones de IA con Gemini

En cada página de contenido, aparece una barra de acciones flotante en la esquina inferior derecha. Estas acciones utilizan la IA de Google Gemini para interactuar con el contenido de la página actual.

**Requisito:** Para usar estas funciones, debes introducir una **Clave de API de Gemini** en el panel de **Configuración**.

### Acciones Disponibles

- **Chatear con el documento**: Inicia una conversación con un asistente de IA que responderá preguntas basándose *únicamente* en el contenido de la página actual. Es consciente del contexto y no utilizará conocimiento externo, asegurando que las respuestas sean relevantes para tu documentación.
- **Generar Cuestionario con IA**: Crea un cuestionario con preguntas abiertas para evaluar tu comprensión del documento. La IA luego califica tus respuestas, proporcionando una puntuación y comentarios constructivos.
- **Generar Glosario**: Escanea automáticamente el documento para identificar términos clave y genera definiciones claras y concisas para cada uno, basadas en el contexto proporcionado en el texto.
- **Generar Resumen**: Crea un resumen conciso y fácil de leer de toda la página, presentado como una lista de puntos clave.
- **Simplificar Concepto**: Identifica el concepto más complejo o técnico de la página y lo explica en términos sencillos utilizando una analogía útil.
- **Analizar Código**: Te permite seleccionar cualquier bloque de código de la página y pedirle a la IA que explique lo que hace en un lenguaje sencillo o que lo traduzca a otro lenguaje de programación.
- **Generador de Podcast con IA**: Transforma el contenido del documento en un breve podcast de audio. Puedes elegir entre un estilo de un solo narrador (monólogo) o una conversación entre dos personas (diálogo) y seleccionar entre varias voces de IA.



