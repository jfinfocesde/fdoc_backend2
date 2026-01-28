---
title: "Sesión 3: Tu Primera Aplicación"
position: 3
author: "El Equipo de Spring Boot"
date: "2024-09-07"
---

# Sesión 3: Creando Tu Primera Aplicación Spring Boot

La forma más fácil de empezar un nuevo proyecto Spring Boot es usando **Spring Initializr**, una herramienta web que genera una estructura de proyecto básica para ti.

1.  Ve a [start.spring.io](https://start.spring.io).
2.  Configura los metadatos de tu proyecto:
    - **Project**: Maven
    - **Language**: Java
    - **Spring Boot**: La última versión estable (ej: 3.x.x).
    - **Group**: El nombre de tu paquete personal o de empresa (ej: `com.example`).
    - **Artifact**: El nombre de tu proyecto (ej: `demo`).
    - **Packaging**: Jar
    - **Java**: 17 o más reciente.
3.  En la sección "Dependencies", añade `Spring Web`. Este starter incluye todo lo necesario para construir aplicaciones web, incluyendo un controlador RESTful y un servidor Tomcat embebido.
4.  Haz clic en **GENERATE**.

Esto descargará un archivo ZIP. Descomprímelo y ábrelo en tu IDE favorito.

### Estructura del Proyecto

El proyecto generado tiene una estructura estándar. El componente `file-tree` a continuación muestra los archivos y directorios clave.

+++

+++

### Explicación de Archivos Clave

A continuación se muestra el contenido de los archivos más importantes para empezar. Para ver la aplicación en acción, crea un nuevo archivo `HelloController.java` dentro del directorio `src/main/java/com/example/demo/`.

+++tabs
---[tab title="pom.xml" lang="xml"]---
<!-- ... (metadatos) ... -->
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
    </dependency>
</dependencies>
<!-- ... (plugin de build) ... -->
---[tab title="DemoApplication.java" lang="java"]---
package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Esta única anotación habilita la autoconfiguración y el escaneo de componentes.
@SpringBootApplication
public class DemoApplication {

    // Este es el punto de entrada principal que inicia la aplicación.
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
---[tab title="HelloController.java" lang="java"]---
package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    // Mapea las peticiones HTTP GET para "/" a este método.
    @GetMapping("/")
    public String hello() {
        return "¡Hola, Mundo!";
    }
}
+++

### Ejecutando la Aplicación

Puedes ejecutar la aplicación de dos maneras principales: desde tu IDE o usando el wrapper de Maven.

1.  **Desde tu IDE**: Busca el archivo `DemoApplication.java` y ejecuta su método `main`.
2.  **Desde la terminal**: Navega al directorio raíz del proyecto y ejecuta el comando apropiado para tu sistema operativo.

+++tabs
---[tab title="Unix/macOS" lang="sh"]---
./mvnw spring-boot:run
---[tab title="Windows" lang="sh"]---
mvnw.cmd spring-boot:run
+++

Una vez que la aplicación inicie, abre tu navegador web y visita `http://localhost:8080`. ¡Deberías ver el mensaje "¡Hola, Mundo!".


