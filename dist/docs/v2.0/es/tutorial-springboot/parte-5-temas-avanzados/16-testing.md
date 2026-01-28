---
title: "Sesión 16: Pruebas Unitarias y de Integración"
position: 2
author: "El Equipo de Spring Boot"
date: "2024-10-16"
---

# Sesión 16: Pruebas Unitarias y de Integración

Spring Boot proporciona un excelente soporte para pruebas.

+++

+++

## Pruebas Unitarias

Las pruebas unitarias se enfocan en un solo componente de forma aislada. Mockito se usa para simular las dependencias.

```java
@ExtendWith(MockitoExtension.class)
class MyServiceTest {
    // ... código de prueba
}
```

## Pruebas de Integración

Las pruebas de integración prueban la interacción entre varios componentes, a menudo cargando el contexto de Spring. `@SpringBootTest` se usa para esto.

```java
@SpringBootTest
class MyApplicationTests {
    // ... código de prueba
}
```

### ¡Pon a Prueba tu Conocimiento!

+++quiz
---
questions:
  - text: "¿Qué anotación se usa para cargar el ApplicationContext completo de Spring para una prueba de integración?"
    choices:
      - "@WebMvcTest"
      - "@DataJpaTest"
      - "@SpringBootTest"
    answer: "@SpringBootTest"
  - text: "¿Qué librería se usa comúnmente para crear 'mocks' en pruebas unitarias en Spring?"
    choices:
      - "JUnit 5"
      - "Mockito"
      - "AssertJ"
    answer: "Mockito"
---
+++


