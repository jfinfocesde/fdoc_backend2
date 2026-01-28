# File Tree

Árbol de archivos con resaltado y anotaciones.

````markdown
+++file-tree
---
highlight:
  - "src/components"
  - "src/main.tsx"
annotations:
  "src/main.tsx": "Punto de entrada"
  "src/components": "Componentes reutilizables"
---
src/
├── assets/
├── components/
│   ├── Button.tsx
│   ├── Header.tsx
│   └── Footer.tsx
├── pages/
│   ├── Home.tsx
│   └── About.tsx
└── main.tsx
+++
````