---
title: "Automatizando Actualizaciones"
position: 5
---

# Automatizando Actualizaciones del Manifiesto

Cuando trabajas en modo `local`, la aplicación necesita el archivo `docs/file-manifest.json` para saber qué archivos de documentación existen. Mantener este archivo actualizado manualmente puede ser tedioso y propenso a errores, especialmente en proyectos grandes.

Para solucionar esto, hemos incluido un script que escanea automáticamente tu directorio `docs/` y actualiza el `file-manifest.json` por ti.

## `package.json`

Para usar el script, hemos añadido un archivo `package.json` a la raíz de tu proyecto con el siguiente comando:

```json
{
  "scripts": {
    "update-manifest": "node scripts/update-file-manifest.js"
  }
}
```

## ¿Cómo Usarlo?

Cada vez que **agregues, elimines o renombres** un archivo o carpeta de Markdown en tu directorio `docs/`, simplemente ejecuta el siguiente comando en tu terminal desde la raíz del proyecto:

```bash
npm run update-manifest
```

Este comando ejecutará el script `scripts/update-file-manifest.js`, que reconstruirá el manifiesto con la estructura de archivos actual.

> **Nota:** Si es la primera vez que ejecutas un comando 
pm`, puede que necesites ejecutar 
pm install` primero para asegurarte de que tu entorno local está configurado.

