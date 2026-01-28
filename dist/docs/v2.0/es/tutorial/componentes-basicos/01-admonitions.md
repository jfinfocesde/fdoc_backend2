---
title: "Avisos (Admonitions)"
position: 1
---

# Avisos (Admonitions)

Los avisos son bloques de texto resaltados que llaman la atención del lector sobre información importante. Se crean usando un bloque de código con el lenguaje `admonition`.

La sintaxis básica es:

````markdown
+++admonition
---
type: note
title: "Título Personalizado (Opcional)"
---
El contenido del aviso va aquí. Puede incluir **Markdown**.
+++
````

### Tipos Disponibles

Aquí tienes ejemplos de todos los tipos de avisos disponibles:

+++admonition
---
type: note
---
Este es un aviso de tipo `note`. Es útil para información general.
+++

+++admonition
---
type: info
---
Este es un aviso de tipo `info`, similar a `note`.
+++

+++admonition
---
type: tip
---
Este es un aviso de tipo `tip`. Perfecto para dar consejos o sugerencias.
+++

+++admonition
---
type: success
---
Este es un aviso de tipo `success`. Ideal para indicar que algo ha salido bien.
+++

+++admonition
---
type: warning
title: "Cuidado"
---
Este es un aviso de tipo `warning`. Úsalo para advertir sobre posibles problemas.
+++

+++admonition
---
type: important
---
Este es un aviso de tipo `important`. Para información que no debe ser ignorada.
+++

+++admonition
---
type: danger
---
Este es un aviso de tipo `danger`. Para advertencias críticas o acciones peligrosas.
+++

+++admonition
---
type: error
---
Este es un aviso de tipo `error`, similar a `danger`.
+++

+++admonition
---
type: bug
---
Este es un aviso de tipo `bug`. Útil para documentar errores conocidos.
+++

+++admonition
---
type: example
---
Este es un aviso de tipo `example`. Perfecto para mostrar ejemplos.
+++

+++admonition
---
type: abstract
---
Este es un aviso de tipo `abstract` o resumen.
+++

+++admonition
---
type: question
---
Este es un aviso de tipo `question`. Para plantear preguntas frecuentes.
+++

+++admonition
---
type: quote
---
Este es un aviso de tipo `quote`. Ideal para citar frases o testimonios.
+++


