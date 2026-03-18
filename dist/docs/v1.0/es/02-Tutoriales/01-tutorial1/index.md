---
title: "Tutorial 1: Sistema de Restaurante con Spring Boot y JPA"
label: "Tutorial 1"
position: 1
---

+++hero-section
---
title: "Sistema de Gestión de Restaurante"
subtitle: "Construye una API REST completa con Spring Boot, JPA y PostgreSQL desde cero"
backgroundImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1170&auto=format&fit=crop"
overlayOpacity: 0.7
buttons:
  - text: "Comenzar el Tutorial"
    url: "./00-introduccion"
    variant: "primary"
    icon: "RocketIcon"
  - text: "Ver en GitHub"
    url: "https://github.com/jfinforecursos/cesde_backend2_ejemplo_api_basica"
    variant: "secondary"
---
+++

## 📦 Repositorio del Proyecto

El código fuente completo está disponible en GitHub. Clónalo antes de empezar:

```bash
git clone https://github.com/jfinforecursos/cesde_backend2_ejemplo_api_basica.git
```

🔗 **[github.com/jfinforecursos/cesde_backend2_ejemplo_api_basica](https://github.com/jfinforecursos/cesde_backend2_ejemplo_api_basica)**

---

## ¿Qué aprenderás?

+++feature-list
---
items:
  - title: "Spring Boot y JPA"
    icon: "BookOpenIcon"
    content: |
      Entenderás qué es Spring Boot, JPA e Hibernate y cómo se relacionan para crear backend en Java.
  - title: "Modelo de datos completo"
    icon: "DatabaseIcon"
    content: |
      Aprenderás herencia (`@MappedSuperclass`), composición (`@Embeddable`) y enumeraciones (`@Enumerated`).
  - title: "Arquitectura en capas"
    icon: "LayoutIcon"
    content: |
      Dominarás la arquitectura Controller → Service → Repository → Base de datos con ejemplos reales.
  - title: "API REST documentada"
    icon: "RocketIcon"
    content: |
      Crearás endpoints HTTP completos y generarás documentación interactiva con OpenAPI / Swagger UI.
---
+++

---

## 🗺️ Contenido del Tutorial

+++cards
---
columns: 3
items:
  - title: "0. Introducción"
    icon: "BookOpenIcon"
    href: "./00-introduccion"
    content: "¿Qué es Spring Boot, JPA, Hibernate y PostgreSQL? Conceptos base del proyecto."
  - title: "1. Estructura del Proyecto"
    icon: "LayoutIcon"
    href: "./01-estructura-proyecto"
    content: "Organización de paquetes: entity, repository, service, dto y controller."
  - title: "2. Herencia JPA"
    icon: "GitMergeIcon"
    href: "./02-herencia-base-entity"
    content: "Clase BaseEntity con @MappedSuperclass y auditoría automática de fechas."
  - title: "3. Composición"
    icon: "PuzzleIcon"
    href: "./03-composicion-embeddable"
    content: "Agrupar campos relacionados con @Embeddable y @Embedded sin crear tablas extra."
  - title: "4. Enumeraciones"
    icon: "ListIcon"
    href: "./04-enumeraciones"
    content: "Valores fijos y seguros con @Enumerated(EnumType.STRING)."
  - title: "5. Entidades JPA"
    icon: "DatabaseIcon"
    href: "./05-entidades"
    content: "Entidades Mesa, Mesero y Pedido con relaciones @ManyToOne."
  - title: "6. Repositorios"
    icon: "SearchIcon"
    href: "./06-repositorios"
    content: "JpaRepository, consultas derivadas y CRUD automático con Spring Data."
  - title: "7. Servicios"
    icon: "SettingsIcon"
    href: "./07-servicios"
    content: "Lógica de negocio, @Transactional e inyección de dependencias."
  - title: "8. DTOs"
    icon: "ArrowRightLeftIcon"
    href: "./08-dtos"
    content: "Patrón Request/Response para separar la API de la base de datos."
  - title: "9. Controladores"
    icon: "GlobeIcon"
    href: "./09-controladores"
    content: "Endpoints REST con @RestController, @GetMapping, @PostMapping y más."
  - title: "10. Flujo Completo"
    icon: "ZapIcon"
    href: "./10-flujo-completo"
    content: "Recorrido completo de una petición HTTP desde el cliente hasta la BD."
  - title: "11. OpenAPI / Swagger"
    icon: "FileTextIcon"
    href: "./11-openapi-swagger"
    content: "Documentación interactiva y prueba de endpoints desde el navegador."
---
+++
