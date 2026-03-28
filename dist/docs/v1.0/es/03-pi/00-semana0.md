---
title: "Proyecto Integrador"
description: "Propuesta Definitiva para el Proyecto Integrador del Nivel 3"
position: 0
---

# Propuesta Definitiva: Proyecto Integrador Nivel 3

**Dirigido a:** Cuerpo Docente, Nivel 3 - Técnica en Desarrollo de Software  
**Módulos Involucrados:** Backend 2 (Framework), Frontend 2 (Framework), Nuevas Tecnologías de Programación.  
**Fecha:** 29 de octubre de 2025

## A. Resumen Ejecutivo
Esta propuesta detalla el Proyecto Integrador (PI) para el Nivel 3, el cual culmina el proceso formativo logrando la integración técnica total (Full-Stack). El proyecto está diseñado para alinear los planeadores de Backend 2 (Spring Boot), Frontend 2 (React JS) y Nuevas Tecnologías (Git/Análisis de Datos).

El modelo propuesto es "API-First". El liderazgo lo asume de forma indiscutible el módulo de Backend 2, ya que es el responsable de construir la API REST central, que es el insumo técnico principal para los otros dos módulos.

Los módulos de Frontend 2 y Nuevas Tecnologías actúan como "Consumidores" de esta API, mientras que Nuevas Tecnologías también cumple un rol transversal de "Soporte DevOps" en el manejo de Git.

## B. Concepto Central: "La API como Fuente Única de Verdad"
El proyecto consiste en la "Construcción y Consumo de una API REST". Los equipos se estructuran en roles claros con dependencias directas, simulando un entorno de desarrollo profesional:

1. **El Equipo de API (Backend 2):** Actúan como los "Arquitectos de Producto". Son los responsables de diseñar, construir y documentar la API REST que servirá como "fuente única de verdad" para todo el proyecto.
2. **El Equipo de UI (Frontend 2):** Actúan como el "Consumidor UI". Son responsables de construir una Single-Page Application (SPA) con React que consume la API del equipo de Backend para mostrar y manipular los datos.
3. **El Equipo de Análisis (Nuevas Tecnologías):** Actúan como el "Consumidor de Datos" y "Soporte DevOps". Tienen un rol dual:
    - Consumen la API del equipo de Backend para realizar análisis y visualizaciones con Python (Pandas/Matplotlib).
    - Brindan soporte transversal en la configuración y gestión del repositorio de Git (GitFlow).

## C. Liderazgo y Dinámica de Módulos (El Porqué y el Cómo)
El liderazgo es técnico y centralizado en el proveedor de datos (Backend 2).

### 1. Módulo Líder (Arquitecto de Producto): Backend 2
- **Alcance del Planeador (El "INSUMO"):** Se enfoca 100% en crear una API RESTful robusta con Spring Boot, conectada a una Base de Datos real (JPA) y probada (JUnit).
- **Justificación del Liderazgo (El "POR QUÉ"):** Este módulo tiene el mayor peso técnico porque "entrega todo el insumo". El proyecto no puede avanzar sin la API. El artefacto central de todo el semestre es el "Contrato de la API" (la colección de Postman o especificación OpenAPI) que Back 2 debe generar.
- **Rol:** El docente de Back 2 actúa como el "Chief Architect" del proyecto. Define los modelos, los endpoints y los plazos de entrega de la API.

### 2. Reacción de los Módulos de Apoyo (Los "Consumidores")
- **Módulo de Apoyo: Frontend 2 (Consumidor UI)**
    - **Alcance del Planeador (La "CARA"):** Se enfoca 100% en React JS (componentes, estado, router) y en el consumo de APIs (fetch/Axios).
    - **Reacción (El "POR QUÉ"):** Este equipo es un cliente directo de Back 2. Su trabajo está bloqueado hasta que el "Contrato de la API" esté definido (Avance 2). A partir de ahí, su rol es construir la interfaz de usuario que consume dicho contrato.
- **Módulo de Apoyo: Nuevas Tecnologías (Consumidor de Datos + Soporte DevOps)**
    - **Alcance del Planeador (El "ANÁLISIS" y el "PROCESO"):** Módulo dual. (S1-S6) Git/GitHub; (S7-S17) Python, Pandas, Matplotlib.
    - **Reacción (El "POR QUÉ"):** Este equipo es el segundo cliente de Back 2. También dependen del "Contrato de la API" para su proyecto de análisis. Adicionalmente, y dado su planeador (S1-S6), actúan como soporte transversal de Git, ayudando a configurar el repositorio.

## D. Estructura de Entregables y Metodología de Seguimiento (Hitos)
Los avances se estructuran como un flujo "API-First": Definición -> Consumo Simulado -> Integración Real.

### ⏱️ AVANCE 1 (Semana 6): "Configuración y Arquitectura Base"
**Objetivo:** Configurar el entorno de colaboración (Git) y tener la arquitectura base de los tres proyectos.

- **Líder (Backend 2):**
    - **Entregable:** Proyecto Spring Boot Inicializado y Modelo de Dominio Definido.
    - **Alineación (S1-S6):** "Arquitectura de Software", "Introducción a Spring Boot".
    - **Instrucción:** El proyecto base de Spring Boot y el Diagrama de Clases (o similar) que define las entidades principales (ej. Usuario, Producto). Este es el primer borrador del contrato.
- **Apoyo (Frontend 2):**
    - **Entregable:** Proyecto React Inicializado (CRA/Vite) y Wireframes.
    - **Alineación (S1-S6):** "Introducción a React", "Componentes", "Props", "useState".
    - **Instrucción:** El proyecto base de React y los wireframes de las vistas principales (Formulario, Lista), basados en el Modelo de Dominio de Back 2.
- **Apoyo (Nuevas Tecnologías):**
    - **Entregable:** Repositorio de GitHub Creado y GitFlow Definido.
    - **Alineación (S1-S6):** "Git (commits, ramas, fusiones)", "GitHub (repositorios, PRs)".
    - **Instrucción:** Crear el repo del proyecto, definir la estrategia (ej. main, develop, feature/ABC) e incluir un README.md con las reglas de colaboración.

**Metodología de Seguimiento (Avance 1):**
1. El docente de NT (Soporte) crea el repositorio y lo comparte.
2. El docente de Back 2 (Líder) aprueba el Modelo de Dominio.
3. El docente de Front 2 valida que los Wireframes se basen en ese Modelo.

### 🏃‍♂️ AVANCE 2 (Semana 12): "El Contrato API y el Consumo Simulado"
**Objetivo:** El BackEnd define el "Contrato" oficial. Los consumidores (Front y NT) lo implementan de forma simulada.

- **Líder (Backend 2):**
    - **Entregable:** El "Contrato de la API" (Colección de Postman) y API Funcional (con datos en memoria).
    - **Alineación (S7-S12):** "API REST (Controladores, Servicios, Repositorios)", "Manejo de Errores".
    - **Instrucción:** La API funcional con los endpoints (GET, POST, PUT, DELETE) operando con datos simulados (Colecciones). La Colección de Postman es el entregable CRÍTICO que se comparte a los otros dos módulos.
- **Apoyo (Frontend 2):**
    - **Entregable:** App React con CRUD Funcional (Datos Simulados en useState).
    - **Alineación (S7-S12):** "useEffect", "Formularios", "Renderizado Condicional".
    - **Instrucción:** La aplicación de React con todas las vistas (formularios, listas) que replican exactamente el "Contrato" de Postman. El CRUD debe funcionar usando useState y arreglos locales.
- **Apoyo (Nuevas Tecnologías):**
    - **Entregable:** Script de Análisis de Datos (Pandas) consumiendo los Endpoints GET simulados.
    - **Alineación (S7-S12):** "Python (Numpy, Pandas)".
    - **Instrucción:** Un script de Python (.py o Jupyter Notebook) que llama a los endpoints GET de la API (aún con datos simulados) y realiza análisis básicos con Pandas.

**Metodología de Seguimiento (Avance 2):**
1. El docente de Back 2 (Líder) entrega y "congela" el "Contrato API" (Postman).
2. El docente de Front 2 evalúa que la app de React cumpla funcionalmente con ese "Contrato".
3. El docente de NT evalúa que el script de Python consuma exitosamente ese "Contrato".

### 🏆 AVANCE 3 (Semana 17): "La Integración Full-Stack Total"
**Objetivo:** Conectar todas las piezas a la API final y persistente.

- **Líder (Backend 2):**
    - **Entregable:** API REST Final, Conectada a BD (JPA) y Probada (JUnit).
    - **Alineación (S13-S17):** "Spring Data JPA", "Pruebas Unitarias (JUnit)", "Seguridad Básica".
    - **Instrucción:** La API del Avance 2, pero ahora los repositorios están conectados a una base de datos real usando JPA.
- **Apoyo (Frontend 2):**
    - **Entregable:** App React Final, CONECTADA a la API de Back 2 y con Enrutamiento.
    - **Alineación (S13-S17):** "React Router", "Consumo de APIs (fetch/Axios)".
    - **Instrucción:** La aplicación de React del Avance 2, pero ahora los datos simulados se eliminan. Se usa useEffect y fetch/axios para llamar realmente a los endpoints de la API de Spring Boot.
- **Apoyo (Nuevas Tecnologías):**
    - **Entregable:** Reporte Final de Análisis de Datos (con Visualización) consumiendo la API real.
    - **Alineación (S13-S17):** "Visualización (Matplotlib, Plotly)", "Reportes HTML".
    - **Instrucción:** El script de Python del Avance 2, ahora consumiendo la API final (conectada a la BD real) y generando un reporte con visualizaciones.

**Metodología de Seguimiento (Avance 3):**
1. Se realiza la "Demo Final de Integración" (Semana 17).
2. El docente de Back 2 (Líder) valida que la BD está siendo actualizada.
3. El docente de Front 2 valida que la UI consume la API real.
4. El docente de NT presenta su reporte analítico basado en los datos reales de la API.

## E. Roles y Responsabilidades de los Docentes (Resumen)

- **Docente de Backend 2 (Líder de Producto / Arquitecto):**
    - Actúa como "Chief Architect" y "Dueño del Producto".
    - Define el "Contrato de la API" (Postman) para el Avance 2.
    - Es el punto central de comunicación y el responsable de resolver bloqueos técnicos.
    - Guía la creación de la API, conexión a BD y pruebas.
- **Docente de Frontend 2 (Líder Técnico UI):**
    - Actúa como "Tech Lead" del equipo UI (Consumidor 1).
    - Reacciona al "Contrato de la API" para guiar el desarrollo de React.
    - Asegura que la UI cumpla con las especificaciones del "Contrato".
- **Docente de Nuevas Tecnologías (Líder de Análisis / Soporte DevOps):**
    - Actúa como "Tech Lead" del equipo de Análisis (Consumidor 2).
    - Reacciona al "Contrato de la API" para guiar el proyecto de Python.
    - Brinda soporte transversal en la configuración y uso del repositorio de Git.

## F. Evaluación del Componente de Integración
- La Integración Técnica (la conexión Front-Back y NT-Back) es el hito principal de Nivel 3. Su éxito (demostrado en el Avance 3) debe tener un peso significativo en la nota de los tres módulos.
- El "Contrato de la API" (Avance 2) es el entregable más crítico y debe ser evaluado rigurosamente por los tres docentes.

## G. Entrega y Cierre (Semana 17)
- La Semana 17 se dedica a la Demo Full-Stack y la presentación del Reporte de Análisis de Datos.
- El proyecto está "listo" cuando la aplicación de React puede crear un dato, y el reporte de Análisis de Datos puede reflejar ese nuevo dato tras consumir la API.
