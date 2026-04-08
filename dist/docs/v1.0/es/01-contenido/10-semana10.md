---
title: "Semana 10: Actividad Servicios en Spring Boot"
description: "Ejercicio práctico para aplicar los conceptos de servicios, inyección de dependencias y manejo de lógica de negocio en Spring Boot."
position: 10
---

## Actividad: Implementación de Lógica de Negocio en Spring Boot

## 1. Descripción de la Tarea
El objetivo de esta actividad es fortalecer la capacidad de implementar **reglas de negocio complejas** en la capa de servicio de una API REST utilizando Spring Boot. Cada grupo de trabajo deberá seleccionar una de las temáticas propuestas y desarrollar las funcionalidades requeridas, asegurando que la lógica no resida en el controlador ni en la entidad, sino exclusivamente en el **Service**.

## 2. Requisitos Previos
Para la resolución de esta actividad, es obligatorio tomar como referencia el **Tema 1 (Sistema de Adopción de Mascotas)**, cuya solución técnica ha sido suministrada por el profesor en el siguiente repositorio:
👉 **[https://github.com/jfinforecursos/cesde-backend2-actividad6.git](https://github.com/jfinforecursos/cesde-backend2-actividad6.git)**

> **Nota:** Ningún grupo podrá elegir el **Tema 1** para su entrega, ya que este sirve exclusivamente como base de arquitectura y ejemplo de implementación.

## 3. Instrucciones de Desarrollo
* **Selección de Tema:** Cada grupo debe elegir un tema diferente de la lista suministrada (ver sección de "Ideas de Proyectos").
* **Estructura:** El proyecto debe contar con **exactamente 3 entidades relacionadas**.
* **Lógica de Negocio:** Se deben programar al menos **5 reglas de negocio** claras y funcionales en la capa de servicio.
* **Persistencia:** Uso de Spring Data JPA y una base de datos (PostgreSQL).

## 4. Entregable: Video de Sustentación
La entrega final consiste en un video (YouTube/Drive - minimo 15 minutos) que cumpla con los siguientes lineamientos:

1.  **Presentación:** Todos los integrantes deben aparecer y participar.
2.  **Enfoque Técnico:** El video debe centrarse **únicamente** en la explicación del código de la **Lógica de Negocio (Service)** y su verificación funcional. No es necesario explicar la configuración de dependencias o la creación de las entidades.
3.  **Reparto de Explicación:** Cada integrante del grupo debe ser responsable de explicar detalladamente **una de las 5 lógicas de negocio** implementadas.
4.  **Pruebas con Postman:** Después de explicar el código de una regla, se debe mostrar inmediatamente la prueba en **Postman**, demostrando qué sucede cuando la regla se cumple y cuando se lanza una excepción (escenarios de error).

## 5. Ideas de Proyectos


20 ideas con sus atributos, relaciones y las 5 reglas de oro para el servicio:

---

### 0. Sistema de Adopción de Mascotas (Ejemplo resuelto, **NO** disponible)
* **Entidades:** `Mascota` (1) --- (N) `Solicitud` (N) --- (1) `Adoptante`
* **Atributos:**
    * **Mascota:** nombre, especie, edad, tamaño, estado (Disponible, En Proceso, Adoptado).
    * **Adoptante:** nombre, identificación, edad, tienePatio (boolean).
    * **Solicitud:** fechaCreacion, estado (Pendiente, Aprobada, Rechazada).
* **Lógica en el Servicio:**
    1.  Validar que la mascota esté "Disponible" antes de crear la solicitud.
    2.  Verificar que el adoptante sea mayor de 18 años.
    3.  Impedir que un adoptante tenga más de 2 solicitudes activas.
    4.  Cambiar automáticamente el estado de la mascota a "En Proceso" al recibir una solicitud.
    5.  Si la mascota es de tamaño "Grande", validar que el adoptante tenga patio.

### 1. Gestión de Microcréditos (Grupo 1)
* **Entidades:** `Cliente` (1) --- (N) `Prestamo` (1) --- (N) `Cuota`
* **Atributos:**
    * **Cliente:** nombre, salario, puntajeCredito.
    * **Prestamo:** monto, tasaInteres, estado (Activo, Pagado), cuotasPactadas.
    * **Cuota:** numeroCuota, valor, fechaVencimiento, pagada (boolean).
* **Lógica en el Servicio:**
    1.  Validar que el monto no supere el salario del cliente multiplicado por 3.
    2.  No permitir un préstamo si el cliente tiene cuotas de préstamos anteriores vencidas.
    3.  Generar automáticamente la lista de objetos `Cuota` al guardar el préstamo.
    4.  Calcular el interés total sumando un porcentaje extra si el puntaje de crédito es bajo.
    5.  Marcar el préstamo como "Pagado" automáticamente cuando la última cuota se registre como pagada.

### 2. Reserva de Salas de Coworking (Grupo 2)
* **Entidades:** `Sala` (1) --- (N) `Reserva` (N) --- (1) `Usuario`
* **Atributos:**
    * **Sala:** nombre, capacidad, precioHora.
    * **Usuario:** email, esPremium (boolean).
    * **Reserva:** fecha, horaInicio, horaFin, totalPagar.
* **Lógica en el Servicio:**
    1.  Verificar que no existan otras reservas en el mismo horario para esa sala.
    2.  Validar que la reserva no dure más de 4 horas para usuarios no Premium.
    3.  Calcular el total multiplicando horas por `precioHora`.
    4.  Aplicar un 15% de descuento automático si el usuario es Premium.
    5.  Impedir reservas para fechas pasadas.

### 3. Control de Lavandería (Grupo 3)
* **Entidades:** `Cliente` (1) --- (N) `Orden` (1) --- (N) `Prenda`
* **Atributos:**
    * **Cliente:** nombre, telefono, puntosLealtad.
    * **Orden:** fechaRecibido, fechaEntregaEstimada, total.
    * **Prenda:** tipo (Camisa, Pantalón), color, instruccionesEspeciales.
* **Lógica en el Servicio:**
    1.  Asignar fecha de entrega: +24 horas si son menos de 5 prendas, +48 horas si son más.
    2.  Calcular el total basado en una tarifa fija por tipo de prenda.
    3.  Sumar puntos de lealtad al cliente por cada orden (1 punto por cada $10.000).
    4.  Si el cliente tiene 50 puntos, aplicar descuento total a la prenda más barata.
    5.  Validar que no se acepten más de 20 prendas en una sola orden.

### 4. Gimnasio (Membresías) (Grupo 4)
* **Entidades:** `Socio` (1) --- (N) `Suscripcion` (N) --- (1) `Plan`
* **Atributos:**
    * **Socio:** nombre, fechaIngreso, estadoSalud.
    * **Plan:** nombre (Mensual, Anual), precio, beneficios.
    * **Suscripcion:** fechaInicio, fechaFin, activa (boolean).
* **Lógica en el Servicio:**
    1.  Al crear la suscripción, calcular la `fechaFin` sumando los días del plan a la `fechaInicio`.
    2.  Desactivar automáticamente cualquier suscripción anterior del socio al crear una nueva.
    3.  Si es plan "Anual", aplicar un descuento del 20% sobre el precio base.
    4.  Impedir la suscripción si el socio no tiene registrado su estado de salud.
    5.  Generar un código de acceso único basado en el ID del socio y la fecha.

### 5. Sistema de Parqueadero (Grupo 5)
* **Entidades:** `Vehiculo` (1) --- (N) `Ticket` (N) --- (1) `Cajon`
* **Atributos:**
    * **Vehiculo:** placa, tipo (Moto, Carro).
    * **Cajon:** numero, tipo (Moto, Carro), ocupado (boolean).
    * **Ticket:** horaEntrada, horaSalida, valorPagado.
* **Lógica en el Servicio:**
    1.  Validar que el tipo de vehículo coincida con el tipo de cajón.
    2.  Cambiar el estado del cajón a `ocupado = true` al crear el ticket.
    3.  Al registrar la salida, calcular el valor basándose en la diferencia de horas.
    4.  Si el tiempo es menor a 15 minutos, el valor debe ser $0 (tiempo de gracia).
    5.  Liberar el cajón (`ocupado = false`) solo tras confirmar el pago.

### 6. Clínica Odontológica (Citas y Tratamientos) (Grupo 6)
* **Entidades:** `Odontologo` (1) --- (N) `Cita` (N) --- (1) `Paciente`
* **Atributos:**
    * **Odontologo:** nombre, especialidad, tarjetaProfesional.
    * **Paciente:** nombre, edad, tieneSeguro (boolean).
    * **Cita:** fechaHora, motivo (Limpieza, Calza, Extracción), costo, estado (Pendiente, Realizada).
* **Lógica en el Servicio:**
    1.  Verificar que el odontólogo no tenga otra cita en el mismo bloque de tiempo.
    2.  Si el paciente es menor de edad ( < 18), requerir obligatoriamente el nombre de un acudiente en el registro (validación lógica).
    3.  Calcular el costo de la cita: si tiene seguro, aplicar un descuento del 30%.
    4.  Impedir la cancelación de una cita si faltan menos de 2 horas para la hora programada.
    5.  Validar que un paciente no pueda tener más de una cita "Pendiente" en la misma semana.



## Ejercicio resuelto: Ejemplo de Lógica de Negocio en el Servicio 


[https://github.com/jfinforecursos/cesde-backend2-actividad6.git](https://github.com/jfinforecursos/cesde-backend2-actividad6.git)


## Sistema de Adopción de Mascotas 
* **Entidades:** `Mascota` (1) --- (N) `Solicitud` (N) --- (1) `Adoptante`
* **Atributos:**
    * **Mascota:** nombre, especie, edad, tamaño, estado (Disponible, En Proceso, Adoptado).
    * **Adoptante:** nombre, identificación, edad, tienePatio (boolean).
    * **Solicitud:** fechaCreacion, estado (Pendiente, Aprobada, Rechazada).
* **Lógica en el Servicio:**
    1.  Validar que la mascota esté "Disponible" antes de crear la solicitud.
    2.  Verificar que el adoptante sea mayor de 18 años.
    3.  Impedir que un adoptante tenga más de 2 solicitudes activas.
    4.  Cambiar automáticamente el estado de la mascota a "En Proceso" al recibir una solicitud.
    5.  Si la mascota es de tamaño "Grande", validar que el adoptante tenga patio.


## Pruebas paso a paso (Lógica de Negocio) — Sistema de Adopción de Mascotas

Este documento explica cómo probar, de forma manual y paso a paso (para principiantes), toda la lógica de negocio implementada en el servicio de **Solicitudes**.

## 1) Requisitos antes de empezar

### 1.1 Tener la API corriendo

El proyecto está configurado en `src/main/resources/application.properties` para conectarse a PostgreSQL usando variables de entorno:

- `DB_URL`
- `DB_USERNAME`
- `DB_PASSWORD`

Ejemplo de valores típicos:

- `DB_URL=jdbc:postgresql://localhost:5432/demo_basic`
- `DB_USERNAME=postgres`
- `DB_PASSWORD=postgres`

Luego inicia la aplicación (desde la raíz del proyecto):

```bash
.\mvnw.cmd spring-boot:run
```

Cuando esté arriba, abre Swagger:

- `http://localhost:8080/swagger-ui.html`
- `http://localhost:8080/api-docs`

### 1.2 Endpoints que vas a usar

Adoptantes:
- `POST /api/adoptantes`
- `GET /api/adoptantes/{id}`

Mascotas:
- `POST /api/mascotas`
- `GET /api/mascotas/{id}`
- `PUT /api/mascotas/{id}`

Solicitudes:
- `POST /api/solicitudes`
- `GET /api/solicitudes/{id}`
- `PATCH /api/solicitudes/{id}/estado/{estado}`

Notas importantes:
- Esta API usa entidades directamente (sin DTOs).
- Para crear una solicitud, lo más simple es enviar los IDs dentro de `mascota` y `adoptante` (no necesitas enviar el objeto completo):
  ```json
  {
    "mascota": { "id": 1 },
    "adoptante": { "id": 2 }
  }
  ```
- En los errores, si ves respuesta 500, es porque no hay un manejador de errores global; aun así, el mensaje suele incluir el motivo (por ejemplo: “La mascota debe estar DISPONIBLE…”).

## 2) Datos base (crear adoptantes y mascotas)

La idea es crear algunos registros “de prueba” para poder comprobar todas las reglas.

### 2.1 Crear un adoptante mayor de 18 SIN patio

Endpoint:
- `POST /api/adoptantes`

Body:
```json
{
  "nombre": "Ana",
  "identificacion": "CC-1001",
  "edad": 25,
  "tienePatio": false
}
```

Guarda el `id` que devuelve la respuesta. En este documento lo llamaremos:
- `ADOPTANTE_SIN_PATIO_ID`

### 2.2 Crear un adoptante mayor de 18 CON patio

Endpoint:
- `POST /api/adoptantes`

Body:
```json
{
  "nombre": "Carlos",
  "identificacion": "CC-1002",
  "edad": 30,
  "tienePatio": true
}
```

Guarda el `id`:
- `ADOPTANTE_CON_PATIO_ID`

### 2.3 Crear un adoptante de 18 o menor (para forzar error)

Endpoint:
- `POST /api/adoptantes`

Body (ejemplo con 18):
```json
{
  "nombre": "Luis",
  "identificacion": "CC-1003",
  "edad": 18,
  "tienePatio": true
}
```

Guarda el `id`:
- `ADOPTANTE_MENOR_O_18_ID`

### 2.4 Crear 3 mascotas DISPONIBLES (2 medianas/pequeñas y 1 grande)

Mascota 1 (pequeña, disponible):
- `POST /api/mascotas`

Body:
```json
{
  "nombre": "Luna",
  "especie": "Perro",
  "edad": 2,
  "tamano": "PEQUENO",
  "estado": "DISPONIBLE"
}
```

Guarda el `id`:
- `MASCOTA_1_ID`

Mascota 2 (mediana, disponible):
- `POST /api/mascotas`

Body:
```json
{
  "nombre": "Milo",
  "especie": "Gato",
  "edad": 3,
  "tamano": "MEDIANO",
  "estado": "DISPONIBLE"
}
```

Guarda el `id`:
- `MASCOTA_2_ID`

Mascota 3 (grande, disponible):
- `POST /api/mascotas`

Body:
```json
{
  "nombre": "Thor",
  "especie": "Perro",
  "edad": 4,
  "tamano": "GRANDE",
  "estado": "DISPONIBLE"
}
```

Guarda el `id`:
- `MASCOTA_GRANDE_ID`

## 3) Regla 1 — Validar que la mascota esté “DISPONIBLE” antes de crear la solicitud

Regla:
- Si la mascota NO está `DISPONIBLE`, no se puede crear la solicitud.

### 3.1 Caso OK (mascota DISPONIBLE)

Endpoint:
- `POST /api/solicitudes`

Body:
```json
{
  "mascota": { "id": MASCOTA_1_ID },
  "adoptante": { "id": ADOPTANTE_CON_PATIO_ID }
}
```

Qué verificar:
1) La respuesta devuelve una solicitud con `estado` en `PENDIENTE`.
2) El `id` de la solicitud existe (guárdalo como `SOLICITUD_OK_1_ID`).

### 3.2 Caso ERROR (mascota NO DISPONIBLE)

Primero fuerza a que una mascota quede `EN_PROCESO` para simular que ya no está disponible.

Paso A: cambiar estado de la Mascota 2 a `EN_PROCESO`:
- `PUT /api/mascotas/{id}`

Usa `{id} = MASCOTA_2_ID` y body:
```json
{
  "nombre": "Milo",
  "especie": "Gato",
  "edad": 3,
  "tamano": "MEDIANO",
  "estado": "EN_PROCESO"
}
```

Paso B: intentar crear solicitud con esa mascota:
- `POST /api/solicitudes`

Body:
```json
{
  "mascota": { "id": MASCOTA_2_ID },
  "adoptante": { "id": ADOPTANTE_CON_PATIO_ID }
}
```

Resultado esperado:
- Debe fallar.
- Mensaje esperado (o similar): `La mascota debe estar DISPONIBLE para crear la solicitud.`

## 4) Regla 2 — Verificar que el adoptante sea mayor de 18 años

Regla:
- El adoptante debe tener `edad > 18`.

### 4.1 Caso ERROR (edad 18 o menor)

Endpoint:
- `POST /api/solicitudes`

Body (usa una mascota DISPONIBLE):
```json
{
  "mascota": { "id": MASCOTA_1_ID },
  "adoptante": { "id": ADOPTANTE_MENOR_O_18_ID }
}
```

Resultado esperado:
- Debe fallar.
- Mensaje esperado: `El adoptante debe ser mayor de 18 años.`

## 5) Regla 3 — Impedir que un adoptante tenga más de 2 solicitudes activas

Definición práctica en esta API:
- “Solicitudes activas” = solicitudes con `estado = PENDIENTE` para el mismo adoptante.
- Máximo permitido: 2.

### 5.1 Crear 2 solicitudes PENDIENTES (debe permitirlo)

Solicitud #1:
- `POST /api/solicitudes`

Body:
```json
{
  "mascota": { "id": MASCOTA_1_ID },
  "adoptante": { "id": ADOPTANTE_CON_PATIO_ID }
}
```

Guarda `SOLICITUD_1_ID`.

Solicitud #2:
- `POST /api/solicitudes`

Body:
```json
{
  "mascota": { "id": MASCOTA_GRANDE_ID },
  "adoptante": { "id": ADOPTANTE_CON_PATIO_ID }
}
```

Guarda `SOLICITUD_2_ID`.

Si la segunda falla porque la mascota grande exige patio, asegúrate de estar usando `ADOPTANTE_CON_PATIO_ID` (con patio = true).

### 5.2 Intentar crear la solicitud #3 (debe fallar)

Primero crea una tercera mascota DISPONIBLE para esta prueba (Mascota 4).
- `POST /api/mascotas`

Body:
```json
{
  "nombre": "Nala",
  "especie": "Perro",
  "edad": 1,
  "tamano": "MEDIANO",
  "estado": "DISPONIBLE"
}
```

Guarda `MASCOTA_4_ID`.

Ahora intenta crear la tercera solicitud:
- `POST /api/solicitudes`

Body:
```json
{
  "mascota": { "id": MASCOTA_4_ID },
  "adoptante": { "id": ADOPTANTE_CON_PATIO_ID }
}
```

Resultado esperado:
- Debe fallar.
- Mensaje esperado: `El adoptante ya tiene 2 solicitudes activas.`

### 5.3 “Liberar cupo” cambiando el estado de una solicitud

Si cambias una solicitud de `PENDIENTE` a `RECHAZADA`, ya no cuenta como activa.

Paso A: rechazar `SOLICITUD_1_ID`:
- `PATCH /api/solicitudes/{id}/estado/{estado}`

Usa `{id} = SOLICITUD_1_ID` y `{estado} = RECHAZADA`.

Paso B: intenta de nuevo crear la solicitud #3 (con `MASCOTA_4_ID`).

Resultado esperado:
- Ahora sí debe permitirla.

## 6) Regla 4 — Cambiar automáticamente el estado de la mascota a “EN_PROCESO” al recibir una solicitud

Regla:
- Cuando se crea una solicitud, la mascota pasa automáticamente de `DISPONIBLE` a `EN_PROCESO`.

### 6.1 Probar el cambio automático

Paso A: toma una mascota que esté `DISPONIBLE` (por ejemplo `MASCOTA_4_ID` recién creada).

Paso B: crea una solicitud:
- `POST /api/solicitudes`

Body:
```json
{
  "mascota": { "id": MASCOTA_4_ID },
  "adoptante": { "id": ADOPTANTE_SIN_PATIO_ID }
}
```

Paso C: consulta la mascota:
- `GET /api/mascotas/{id}`

Usa `{id} = MASCOTA_4_ID`.

Resultado esperado:
- Debe aparecer `estado: "EN_PROCESO"`.

## 7) Regla 5 — Si la mascota es “GRANDE”, validar que el adoptante tenga patio

Regla:
- Si `mascota.tamano == GRANDE`, entonces `adoptante.tienePatio` debe ser `true`.

### 7.1 Caso ERROR (mascota grande + adoptante sin patio)

Asegúrate de que `MASCOTA_GRANDE_ID` esté `DISPONIBLE`. Si no lo está, puedes crear otra mascota grande DISPONIBLE o actualizarla.

Endpoint:
- `POST /api/solicitudes`

Body:
```json
{
  "mascota": { "id": MASCOTA_GRANDE_ID },
  "adoptante": { "id": ADOPTANTE_SIN_PATIO_ID }
}
```

Resultado esperado:
- Debe fallar.
- Mensaje esperado: `Para una mascota GRANDE el adoptante debe tener patio.`

### 7.2 Caso OK (mascota grande + adoptante con patio)

Endpoint:
- `POST /api/solicitudes`

Body:
```json
{
  "mascota": { "id": MASCOTA_GRANDE_ID },
  "adoptante": { "id": ADOPTANTE_CON_PATIO_ID }
}
```

Resultado esperado:
- Debe crear la solicitud.
- La mascota debe quedar en `EN_PROCESO` automáticamente (verifícalo con `GET /api/mascotas/{id}`).

## 8) Resumen rápido de “qué debe pasar”

- Mascota no DISPONIBLE → no crea solicitud.
- Adoptante edad <= 18 → no crea solicitud.
- Adoptante con 2 solicitudes PENDIENTES → no crea una tercera.
- Crear solicitud → mascota cambia a EN_PROCESO.
- Mascota GRANDE + adoptante sin patio → no crea solicitud.
