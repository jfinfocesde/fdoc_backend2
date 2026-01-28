---
title: "Internacionalización y Versionado"
position: 4
---

# Internacionalización (i18n) y Versionado

La plataforma soporta la gestión de múltiples idiomas y versiones de la documentación de forma nativa. Esto te permite servir el contenido adecuado a tu audiencia global y mantener la documentación de versiones antiguas.

## Configuración en `config.json`

El control principal sobre estas funciones se encuentra en `config.json`.

### Configuración de i18n
```json
"i18n": {
    "defaultLang": "en",
    "languages": [
        { "code": "es", "name": "Español" },
        { "code": "en", "name": "English" }
    ]
}
```
- `defaultLang`: El idioma que se cargará por defecto si no hay ninguno seleccionado.
- `languages`: Un array de los idiomas disponibles. El `code` debe coincidir con el nombre de la carpeta.

**Nota:** La internacionalización siempre está habilitada. El selector de idiomas aparecerá automáticamente cuando se configuren múltiples idiomas.

### Configuración de Versionado
```json
"version": {
    "defaultVersion": "v2.0",
    "versions": ["v2.0", "v1.0"]
}
```
- `defaultVersion`: La versión que se cargará por defecto.
- `versions`: Un array con todas las versiones disponibles, en el orden en que quieres que aparezcan.

**Nota:** El versionado siempre está habilitado. El selector de versiones aparecerá automáticamente cuando se configuren múltiples versiones.

## Estructura del Proyecto

La forma en que organices tus archivos en la carpeta `docs/` es crucial para que estas características funcionen. Cada carpeta que representa una sección principal o subsección debería contener un archivo `index.md` que sirva como página de inicio para esa sección.

### Escenario 1: Un Solo Idioma y Una Sola Versión
Para proyectos básicos con un solo idioma y una sola versión, la estructura es plana.
```bash
docs/
├── index.md            # Página principal del sitio
├── pagina-1.md
├── pagina-2.md
└── subcarpeta/
    ├── index.md        # Página principal de 'subcarpeta'
    └── pagina-3.md
```

### Escenario 2: Múltiples Versiones
Cuando tienes múltiples versiones, la primera subcarpeta debe ser el nombre de la versión.
```bash
docs/
├── v1.0/
│   ├── index.md        # Página principal de la v1.0
│   ├── pagina-1.md
│   └── pagina-2.md
└── v2.0/
    ├── index.md        # Página principal de la v2.0
    ├── pagina-1.md
    └── caracteristicas-nuevas.md
```

### Escenario 3: Múltiples Idiomas
Cuando tienes múltiples idiomas, la primera subcarpeta debe ser el código del idioma.
```bash
docs/
├── es/
│   ├── index.md        # Página principal en Español
│   ├── pagina-1.md
│   └── pagina-2.md
└── en/
    ├── index.md        # Página principal en Inglés
    ├── page-1.md
    └── page-2.md
```

### Escenario 4: Múltiples Versiones e Idiomas
Cuando tienes múltiples versiones e idiomas, la primera subcarpeta debe ser el nombre de la versión y la segunda el código del idioma.
```bash
docs/
├── v1.0/
│   ├── es/
│   │   ├── index.md    # Página principal v1.0 en Español
│   │   └── pagina-1.md
│   └── en/
│       ├── index.md    # Página principal v1.0 en Inglés
│       └── page-1.md
└── v2.0/
    ├── es/
    │   ├── index.md    # Página principal v2.0 en Español
│   │   └── pagina-1.md
    └── en/
        ├── index.md    # Página principal v2.0 en Inglés
        └── page-1.md
```

## Traducción de la Interfaz (`UI_TEXT`)

Además de traducir tu contenido en Markdown, puedes traducir los textos fijos de la interfaz (botones, etiquetas, etc.) en `config.json`, dentro del objeto `uiText`.

```typescript
export const UI_TEXT = {
    es: {
        // ...
        searchPlaceholder: 'Buscar',
        editThisPage: 'Editar esta página',
        // ...
    },
    en: {
        // ...
        searchPlaceholder: 'Search',
        editThisPage: 'Edit this page',
        // ...
    }
};
```
Añade o modifica las claves para cada idioma que hayas configurado en `I18N_CONFIG`.