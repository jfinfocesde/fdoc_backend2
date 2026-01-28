---
title: "Sesión 18: Despliegue de Aplicaciones"
position: 4
author: "El Equipo de Spring Boot"
date: "2025-01-08"
---

# Sesión 18: Despliegue de Aplicaciones Spring Boot

Una de las grandes ventajas de Spring Boot es la facilidad de despliegue. Exploremos los métodos más comunes.

### 1. Construir el Jar Ejecutable

Primero, empaqueta tu aplicación en un "fat jar". Este único archivo contiene todas las dependencias y un servidor web embebido.

+++tabs
---[tab title="Unix/macOS" lang="sh"]---
./mvnw clean package
---[tab title="Windows" lang="sh"]---
mvnw.cmd clean package
+++

### 2. Opciones de Despliegue

Usa el slider interactivo a continuación para aprender sobre las diferentes estrategias de despliegue.

+++

+++

### Principales Proveedores de Nube

+++gallery
---
columns: 3
items:
  - src: "https://raw.githubusercontent.com/Mody-D/fusion-doc-assets/main/gallery/aws.svg"
    alt: "Amazon Web Services"
  - src: "https://raw.githubusercontent.com/Mody-D/fusion-doc-assets/main/gallery/gcp.svg"
    alt: "Google Cloud Platform"
  - src: "https://raw.githubusercontent.com/Mody-D/fusion-doc-assets/main/gallery/azure.svg"
    alt: "Microsoft Azure"
---
+++

+++cta
---
title: "¡Has Completado el Tutorial!"
buttons:
  - text: "Explorar Más Características"
    url: "/tutorial"
    variant: "primary"
    icon: "RocketIcon"
  - text: "Estrella en GitHub"
    url: "https://github.com/cog-creators/fusion-doc"
    variant: "secondary"
---
Ahora tienes las herramientas para construir y desplegar tus propias aplicaciones Spring Boot. ¡Sigue explorando!
+++


