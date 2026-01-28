import fs from 'fs';
import path from 'path';

/**
 * Escanea recursivamente una carpeta y retorna todos los archivos .md
 * @param {string} dirPath - Ruta de la carpeta a escanear
 * @param {string} basePath - Ruta base para calcular rutas relativas
 * @returns {string[]} - Array de rutas relativas de archivos .md
 */
function scanMarkdownFiles(dirPath, basePath) {
  const files = [];
  
  try {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Recursivamente escanear subdirectorios
        files.push(...scanMarkdownFiles(fullPath, basePath));
      } else if (stat.isFile() && item.endsWith('.md')) {
        // Calcular ruta relativa desde basePath
        const relativePath = path.relative(basePath, fullPath);
        // Normalizar separadores de ruta para consistencia
        const normalizedPath = relativePath.replace(/\\/g, '/');
        files.push(normalizedPath);
      }
    }
  } catch (error) {
    console.error(`Error escaneando directorio ${dirPath}:`, error.message);
  }
  
  return files;
}

/**
 * Actualiza el archivo file-manifest.json con la estructura actual
 * @param {string} docsPath - Ruta de la carpeta docs
 * @param {string} manifestPath - Ruta del archivo file-manifest.json
 */
function updateFileManifest(docsPath, manifestPath) {
  console.log('🔍 Escaneando estructura de archivos...');
  
  // Escanear todos los archivos .md en la carpeta docs
  const markdownFiles = scanMarkdownFiles(docsPath, docsPath);
  
  // Ordenar archivos alfabéticamente para consistencia
  markdownFiles.sort();
  
  console.log(`📁 Encontrados ${markdownFiles.length} archivos .md`);
  
  // Crear objeto manifest
  const manifest = {
    files: markdownFiles
  };
  
  try {
    // Escribir archivo manifest con formato JSON bonito
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
    console.log('✅ file-manifest.json actualizado exitosamente');
    console.log(`📄 Archivos incluidos: ${markdownFiles.length}`);
  } catch (error) {
    console.error('❌ Error escribiendo file-manifest.json:', error.message);
    process.exit(1);
  }
}

/**
 * Función principal
 */
function main() {
  console.log('🚀 Iniciando actualización de file-manifest.json...');
  
  // Rutas de trabajo - detectar automáticamente el contexto
  const projectRoot = process.cwd();
  
  // Detectar si estamos en el build (dist) o en el proyecto fuente
  let docsPath;
  if (fs.existsSync(path.join(projectRoot, 'src', 'config', 'docs'))) {
    // Contexto de desarrollo (proyecto fuente) - nueva ubicación
    docsPath = path.join(projectRoot, 'src', 'config', 'docs');
  } else if (fs.existsSync(path.join(projectRoot, 'docs'))) {
    // Contexto de build (carpeta dist)
    docsPath = path.join(projectRoot, 'docs');
  } else if (fs.existsSync(path.join(projectRoot, 'public', 'docs'))) {
    // Fallback para ubicación anterior
    docsPath = path.join(projectRoot, 'public', 'docs');
  } else {
    console.error('❌ Error: No se encontró la carpeta docs');
    console.error('💡 Ejecuta este script desde:');
    console.error('   - La raíz del proyecto (para desarrollo)');
    console.error('   - La carpeta dist (para build de producción)');
    process.exit(1);
  }
  
  const manifestPath = path.join(docsPath, 'file-manifest.json');
  
  console.log(`📂 Carpeta docs: ${docsPath}`);
  console.log(`📋 Archivo manifest: ${manifestPath}`);
  
  // Actualizar manifest
  updateFileManifest(docsPath, manifestPath);
  
  console.log('🎉 Proceso completado exitosamente');
}

// Ejecutar la función main directamente
main();

export {
  scanMarkdownFiles,
  updateFileManifest,
  main
};