---
title: "Sesión 2: Entorno de Desarrollo"
position: 2
author: "El Equipo de Spring Boot"
date: "2024-09-04"
---

# Sesión 2: Configuración del Entorno de Desarrollo

Para comenzar con Spring Boot, necesitas algunas herramientas esenciales. Repasemos el proceso de configuración para un entorno de desarrollo típico.

+++steps
### Paso 1: Instalar un JDK
Asegúrate de tener un **Java Development Kit (JDK)** versión 17 o superior instalado en tu sistema. Recomendamos usar una build de código abierto como [Adoptium Temurin](https://adoptium.net/). Puedes verificar tu instalación ejecutando `java -version` en tu terminal.

### Paso 2: Instalar una Herramienta de Build
Necesitarás una herramienta de construcción como Maven o Gradle para gestionar las dependencias y el proceso de construcción de tu proyecto. Usaremos **Maven** en este tutorial por su simplicidad y amplio uso. Puedes descargarlo desde su [sitio web oficial](https://maven.apache.org/download.cgi) y asegurarte de que el comando `mvn` esté disponible en el PATH de tu sistema.

### Paso 3: Elegir un IDE
Un **Entorno de Desarrollo Integrado (IDE)** te facilitará mucho la vida. Recomendamos usar uno de los siguientes:
- **IntelliJ IDEA**: La Community Edition es gratuita y tiene un excelente soporte para Spring Boot.
- **Visual Studio Code**: Con el Extension Pack for Java y el Spring Boot Extension Pack.
- **Eclipse IDE for Java EE Developers**: Una opción clásica para el desarrollo en Java.
+++

Después de instalar Maven, verifica tu instalación ejecutando este comando en tu terminal:

+++tabs
---[tab title="Unix/macOS" lang="sh"]---
mvn -version
---[tab title="Windows" lang="sh"]---
mvn -version
+++
Esto debería mostrar la versión de Maven instalada, confirmando que está listo para usarse.

+++accordion
---
allowMultiple: false
---
### ¿Usar Gradle en lugar de Maven?
Gradle es otra potente herramienta de construcción que utiliza un DSL de Groovy o Kotlin para la configuración, lo que algunos desarrolladores prefieren. Spring Initializr te permite elegir Gradle para tu proyecto. Los conceptos centrales del tutorial siguen siendo los mismos, pero la gestión de dependencias en tu archivo `build.gradle` será diferente.

### ¿Qué hay de otros JDKs?
Aunque recomendamos Adoptium, otras builds de JDK como Amazon Corretto, Oracle OpenJDK o Microsoft Build of OpenJDK también son excelentes opciones y totalmente compatibles con Spring Boot.
+++


