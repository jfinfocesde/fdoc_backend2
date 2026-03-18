---
title: "Proyecto Integrador"
description: "Propuesta Definitiva para el Proyecto Integrador del Nivel 3"
position: 0
---

# Propuesta Definitiva: Proyecto Integrador Nivel 2

**Dirigido a:** Cuerpo Docente, Nivel 2 - Técnica en Desarrollo de Software
**Módulos Involucrados:** BackEnd 1 (Lenguaje), FrontEnd 1 (Lenguaje), Metodologías Ágiles.
**Fecha:** 29 de octubre de 2025

## A. Resumen Ejecutivo
Esta propuesta detalla un Proyecto Integrador (PI) para el Nivel 2, alineado con los planeadores de BackEnd 1, FrontEnd 1 y Metodologías Ágiles. A diferencia del Nivel 1 (integración conceptual), el Nivel 2 se enfoca en la integración de procesos y el desarrollo desacoplado.

El modelo propuesto es "Agile-First", donde el módulo de Metodologías Ágiles actúa como el "sistema operativo" (Scrum Master / PMO) del proyecto. Los módulos de BackEnd y FrontEnd operan como dos equipos de desarrollo (Dev Teams) que trabajan en paralelo, con un nivel de integración mínimo (simulado), lo cual refleja un entorno de desarrollo profesional moderno.

## B. Concepto Central: "Un Proyecto, Dos Equipos, Un Proceso"
El proyecto consiste en la "Construcción de una Aplicación Web bajo Metodología Scrum". Cada equipo de estudiantes se dividirá en tres roles funcionales alineados con los módulos:
- **El Equipo de Gestión (Metodologías):** Actúan como Scrum Masters y Product Owners. Son responsables de definir el "QUÉ" (el Product Backlog, las Historias de Usuario) y gestionar el "CUÁNDO" (los Sprints, las ceremonias).
- **El Equipo de BackEnd (Back 1):** Actúan como el "Dev Team: Lógica & Datos". Son responsables de construir el modelo de negocio en POO y conectarlo a una base de datos real.
- **El Equipo de FrontEnd (Front 1):** Actúan como el "Dev Team: UI & Experience". Son responsables de construir la interfaz de usuario, gestionar el DOM y cargar datos de forma asíncrona.

**La Clave del Desacoplamiento (La Simulación Real):**
El equipo de FrontEnd **no consumirá la API del equipo de BackEnd**. Esta restricción es una característica pedagógica, no un error. Simula un escenario real donde los equipos de UI deben avanzar (usando datos simulados) sin esperar al equipo de BackEnd. El reto final de ambos es conectarse a una fuente de datos externa (Back a una BD, Front a un JSON local), logrando una perfecta simetría de desafíos.

## C. Liderazgo y Dinámica de Módulos (El Porqué y el Cómo)
El liderazgo cambia fundamentalmente con respecto al Nivel 1.

### 1. Módulo Líder (PMO/Agile Coach): Metodologías Ágiles
- **Alcance del Planeador (El "PROCESO"):** Este módulo se enfoca 100% en la gestión de proyectos (Manifiesto Ágil, Scrum, Roles, Ceremonias, Artefactos).
- **Justificación del Liderazgo (El "POR QUÉ"):** En Nivel 1, el líder era el prerrequisito técnico (BD). En Nivel 2, el proyecto ES la metodología. El módulo de Metodologías Ágiles no es un módulo de apoyo; es el PMO (Oficina de Gestión de Proyectos) que dirige el esfuerzo completo. El docente de Metodologías actúa como el "Agile Coach" y sus estudiantes como los Scrum Masters de los equipos.

### 2. Reacción de los Módulos de Apoyo (Los "Dev Teams")
Los módulos técnicos (Front y Back) actúan como equipos de desarrollo ágil que reaccionan a las directrices del equipo de Metodologías.

**Módulo de Apoyo: BackEnd 1 (Equipo Lógica & Datos)**
- **Alcance del Planeador (El "MOTOR"):** Se enfoca en POO (Clases, Herencia, Polimorfismo) y Persistencia (Conexión a BD, JPA).
- **Reacción (El "POR QUÉ"):** Este módulo consume el "Product Backlog" (de Metodologías) para implementar la lógica de negocio. Si Metodologías define la Historia de Usuario "Como usuario, quiero registrarme", este equipo crea la Clase Usuario y el método `guardarUsuarioEnBD()`.

**Módulo de Apoyo: FrontEnd 1 (Equipo UI & Experience)**
- **Alcance del Planeador (La "INTERFAZ"):** Se enfoca en JS (DOM, Eventos, Asincronía) y Carga de Datos (fetch).
- **Reacción (El "POR QUÉ"):** Este módulo consume el "Product Backlog" (de Metodologías) para implementar la interfaz de usuario. Si Metodologías define la HU "Como usuario, quiero registrarme", este equipo crea el `registro.html` y el `registro.js` que manipula el DOM y carga/valida datos.

## D. Estructura de Entregables y Metodología de Seguimiento (Sprints)
Los avances se estructuran como "Sprints", con sus respectivas ceremonias (Review).

### ⏱️ AVANCE 1 (Semana 6): "Sprint 0 - Arquitectura y Product Discovery"
- **Objetivo:** Definir el proyecto, los roles de Scrum y la arquitectura inicial de ambos sistemas.

**Líder (Metodologías):**
- **Entregable:** Acta de Constitución del Proyecto y Roles Scrum Definidos.
- **Alineación (S1-S6):** "Manifiesto Ágil", "Principios Ágiles", "Roles en Scrum (PO, SM, Dev Team)".
- **Instrucción:** Documento que define el caso de estudio (ej. "App de Tareas", "Mini-Red Social"), los miembros y sus roles.

**Apoyo (Back 1):**
- **Entregable:** Diagrama de Clases (POO).
- **Alineación (S1-S6):** "Fundamentos de POO", "Clases y Objetos", "Abstracción", "Encapsulamiento".
- **Instrucción:** El diagrama de clases (UML) que representa la solución (ej. Clase Tarea, Clase Usuario) con sus atributos y métodos básicos.

**Apoyo (Front 1):**
- **Entregable:** Mockups o Wireframes de Alta Fidelidad Y Lógica JS Básica.
- **Alineación (S1-S6):** "Variables en JS", "Condicionales", "Ciclos". (Nota: Se asume que el HTML/CSS de Nivel 1 es la base).
- **Instrucción:** 1. Los Mockups de las vistas principales. 2. Un archivo `.js` que resuelva un reto de lógica (con condicionales/ciclos) basado en el proyecto.

**Metodología de Seguimiento (Avance 1):**
- El docente de Metodologías (Líder) es el PMO. Recibe el Acta de Constitución y valida que los roles estén claros.
- El docente de Metodologías comparte el Acta (que define el alcance) con los docentes de Back y Front.
- El docente de Back 1 valida que el Diagrama de Clases sea coherente con el Acta del proyecto.
- El docente de Front 1 valida que los Mockups y la lógica sean coherentes con el Acta del proyecto.

### 🏃♂️ AVANCE 2 (Semana 12): "Sprint 1 Review - MVP Funcional Desacoplado"
- **Objetivo:** Entregar un Producto Mínimo Viable (MVP) funcional en ambas capas, pero sin conexión entre ellas.

**Líder (Metodologías):**
- **Entregable:** Product Backlog Priorizado (Historias de Usuario) y Estimaciones (Planning Poker).
- **Alineación (S7-S12):** "Historias de Usuario (CRUD)", "Estimación Ágil (Puntos de Historia)".
- **Instrucción:** El backlog (en Trello, Jira o Excel) con las HUs del "Sprint 1", priorizadas y estimadas.

**Apoyo (Back 1):**
- **Entregable:** Clases Java Funcionales (con Herencia y Colecciones).
- **Alineación (S7-S12):** "Herencia", "Polimorfismo", "Clases Abstractas", "Colecciones (Listas, Mapas)".
- **Instrucción:** El código Java de las clases del Avance 1, implementando lógica de negocio (ej. `crearTarea()`, `listarTareas()`) y usando colecciones (ej. `List<Tarea>`) para simular la BD en memoria.

**Apoyo (Front 1):**
- **Entregable:** Aplicación Web Funcional con Manipulación del DOM.
- **Alineación (S7-S12):** "Manipulación del DOM (Selectores)", "Eventos", "Creación de Nodos (append/remove)".
- **Instrucción:** La aplicación web (`.html` y `.js`) donde el usuario puede realizar un CRUD (Crear, Leer, Actualizar, Borrar) y la interfaz se actualiza dinámicamente manipulando el DOM (ej. añadir/quitar `<li>` de una lista). Los datos están quemados en un arreglo JS o en `localStorage`.

**Metodología de Seguimiento (Avance 2):**
- El docente de Metodologías (Líder) presenta el Backlog y las HUs evaluadas.
- Se realiza una "Sprint Review":
  - El docente de Front 1 evalúa la demo del CRUD-DOM, validando que cumpla las HUs definidas por Metodologías.
  - El docente de Back 1 evalúa el código POO, validando que implemente la lógica de las HUs definidas por Metodologías.

### 🏆 AVANCE 3 (Semana 17): "Sprint 2 Review - Producto Final con Datos Externos"
- **Objetivo:** Entregar las dos aplicaciones completas, cada una conectada a su propia fuente de datos externa.

**Líder (Metodologías):**
- **Entregable:** Gestión del Sprint 2 (Burndown Chart) y Ceremonia de Retrospectiva.
- **Alineación (S13-S17):** "Sprints", "Ceremonias (Daily, Review, Retro)", "Métricas (Burndown)".
- **Instrucción:** 1. El tablero Kanban (Trello) finalizado. 2. Un Burndown chart que muestre el progreso. 3. El acta de la Retrospectiva del equipo.

**Apoyo (Back 1):**
- **Entregable:** Aplicación de Consola POO con Conexión a Base de Datos.
- **Alineación (S13-S16):** "JDBC / JPA", "Mapeo O-R", "Conexión a BD".
- **Instrucción:** El código Java del Avance 2, pero ahora los métodos (`crearTarea()`, `listarTareas()`) se conectan a una base de datos real (Relacional) y guardan/leen la información.

**Apoyo (Front 1):**
- **Entregable:** Aplicación Web DOM con Carga Asíncrona de Datos (fetch).
- **Alineación (S13-S16):** "Asincronía (Promesas)", "localStorage", "Manejo de JSON", "Consumo de API con fetch()".
- **Instrucción:** Refactorizar la aplicación del Avance 2. Debe cargar su lista inicial de datos de forma asíncrona desde un archivo `.json` local (ej. `tareas.json`) usando `fetch()`. (Opcional: puede seguir usando localStorage para guardar nuevos datos, pero debe leer desde el JSON).

**Metodología de Seguimiento (Avance 3):**
- Se realiza la "Sprint Review Final" (Semana 17).
- El docente de Metodologías (Líder) actúa como "Host", presentando el Burndown Chart y el acta de Retrospectiva, evaluando el proceso.
- El docente de Front 1 evalúa la demo final (CRUD con fetch a JSON local), evaluando el producto UI.
- El docente de Back 1 evalúa la demo final (CRUD con BD), evaluando el producto Lógica/Datos.

## E. Roles y Responsabilidades de los Docentes (Resumen)

**Docente de Metodologías Ágiles (Líder de Proyecto / Agile Coach):**
- Actúa como PMO del PI.
- Define y aprueba los casos de estudio (Semana 2).
- Recolecta los artefactos de gestión (Actas, Backlogs, HUs, Burndowns) en cada Avance (S6, S12, S17).
- Lidera las ceremonias (Sprint Reviews) y asegura que los equipos de Front y Back estén sincronizados conceptualmente.
- Evalúa el Componente de Metodologías.

**Docente de BackEnd 1 (Líder Técnico BackEnd):**
- Actúa como "Tech Lead" del equipo de BackEnd.
- Define los requisitos técnicos de su entregable (ej. "Usar JPA", "Aplicar Herencia").
- Reacciona al Backlog de Metodologías para guiar a sus estudiantes en la implementación.
- Evalúa el Componente de BackEnd 1 (Avances 1, 2 y 3).

**Docente de FrontEnd 1 (Líder Técnico FrontEnd):**
- Actúa como "Tech Lead" del equipo de FrontEnd.
- Define los requisitos técnicos de su entregable (ej. "Usar fetch a JSON local").
- Reacciona al Backlog de Metodologías para guiar a sus estudiantes en la implementación.
- Evalúa el Componente de FrontEnd 1 (Avances 1, 2 y 3).

## F. Evaluación del Componente de Integración
En Nivel 2, no hay un "Componente 4" (Documento Conceptual). La integración es el módulo de Metodologías Ágiles en sí mismo.
- La nota del módulo de Metodologías Ágiles es la nota de integración.
- Esta nota debe tener un peso (ej. 20-30%) en la nota final de los módulos de BackEnd 1 y FrontEnd 1, para asegurar que los estudiantes técnicos se tomen en serio el proceso ágil.

## G. Entrega y Cierre (Semana 17)
La Semana 17 se dedica exclusivamente a la "Sprint Review Final" y "Retrospectiva".
- Se considera un proyecto "listo" cuando los dos Dev Teams (Front y Back) entregan sus MVP funcionales y conectados a sus respectivas fuentes de datos (BD y JSON local), y el equipo de Metodologías entrega los artefactos (Backlog, Burndown, etc.) que gestionaron el proceso.
