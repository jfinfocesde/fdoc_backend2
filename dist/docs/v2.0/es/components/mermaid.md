# Mermaid

Renderiza diagramas y flujogramas usando texto con la sintaxis de Mermaid.

## Sintaxis

````markdown
+++mermaid
graph TD;
    A[Inicio] --> B{¿Funciona?};
    B -->|Sí| C[Fin];
    B -->|No| D[Revisar];
    D --> B;
+++
````