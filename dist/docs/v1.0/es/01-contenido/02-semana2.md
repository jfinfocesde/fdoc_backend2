---
title: "Semana 2: Guía sobre API REST"
description: "Guía sobre API REST"
position: 2
---

+++hero-section
---
title: "Guía sobre API REST"
subtitle: "Conceptos fundamentales, arquitectura y diseño de APIs modernas."
backgroundImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070"
overlayOpacity: 0.6
---
+++


```video
---
src: "https://vimeo.com/1162817857?share=copy&fl=sv&fe=ci"
title: "API REST"
---
```

+++admonition
---
type: info
title: "Resumen"
---
Una API REST es la combinación de dos ideas:
1. **API** (Application Programming Interface): el contrato que define **qué** puede pedir un cliente y **qué** responderá el servidor.
2. **REST** (Representational State Transfer): un **estilo arquitectónico** que prescribe **cómo** debe diseñarse ese contrato para que sea escalable, simple y uniforme.

El resultado es un **servicio web sin estado** que expone recursos a través de URLs, utiliza los métodos HTTP como verbo y devuelve datos normalmente en formato JSON.
+++

---

## 1. Concepto de API

+++admonition
---
type: info
title: "Definición formal"
---
API (Application Programming Interface) es un **conjunto de reglas y especificaciones** que permiten que dos piezas de software se comuniquen.
+++

### 1.1 Características esenciales
| Característica        | Descripción breve                                                                 |
|-----------------------|------------------------------------------------------------------------------------|
| **Abstracción**       | Oculta la complejidad interna del sistema expuesto.                                |
| **Contrato**          | Documenta entradas, salidas, errores y reglas de negocio.                          |
| **Reutilización**     | Permite que cualquier cliente compatible utilice la funcionalidad sin reescribirla.|
| **Versionado**        | Facilita evolucionar la funcionalidad sin romper a los clientes antiguos.          |

### 1.2 Analogía cotidiana
Imagina un **restaurante**:

*   **Cliente** ↔ Aplicación que necesita datos o funciones.
*   **Camarero** ↔ API.
*   **Cocina** ↔ Sistema interno (base de datos, lógica de negocio).
El cliente pide al camarero (API) que lleve un pedido a la cocina y traiga la comida (datos). El cliente **no entra** en la cocina ni decide cómo se cocina el plato.

---

## 2. Generalidades de las API Web

+++admonition
---
type: info
title: "¿Qué diferencia a una API Web de cualquier otra API?"
---
*   **Protocolo de transporte**: HTTP (o HTTPS).
*   **Formato de mensaje**: JSON, XML, form-url-encoded, etc.
*   **Ubicación**: Se hospeda en un servidor accesible a través de una URL pública o privada.
+++

### 2.1 Arquitectura cliente-servidor
+++mermaid
sequenceDiagram
    participant Cliente
    participant API
    participant Servidor

    Cliente->>API: GET /productos
    API->>Servidor: consulta interna
    Servidor-->>API: datos
    API-->>Cliente: 200 OK + JSON
+++

### 2.2 Tipos comunes de API Web
| Tipo           | Características principales                                                  |
|----------------|------------------------------------------------------------------------------|
| **SOAP**       | XML, operaciones definidas en WSDL, estándares pesados (WS-\*).              |
| **XML-RPC / JSON-RPC** | Llamadas a procedimiento remotas sobre HTTP con XML o JSON.                 |
| **REST**       | Recursos, verbos HTTP, sin estado, cacheable, ligero (JSON).                 |
| **GraphQL**    | Consultas declarativas, una sola URL, tipos fuertes.                         |
| **gRPC**       | Protocolo binario HTTP/2, generación de stubs, ideal microservicios.         |

---

## 3. REST (Representational State Transfer)

+++admonition
---
type: note
title: "Roy Fielding, 2000"
---
REST es un **estilo arquitectónico**, no un estándar. Describe **seis restricciones** que, si se cumplen, producen un sistema escalable y de alto rendimiento.
+++

### 3.1 Las 6 restricciones REST
| Restricción                    | Qué obliga a hacer                                           | Beneficio clave                  |
|--------------------------------|--------------------------------------------------------------|----------------------------------|
| **Cliente-servidor**           | Separar UI de lógica de datos.                               | Independencia de evolución.      |
| **Sin estado**                 | Cada petición contiene toda la info necesaria.               | Escalabilidad horizontal.        |
| **Cacheable**                  | Las respuestas deben indicar si se pueden cachear.           | Reduce latencia y carga.         |
| **Interfaz uniforme**          | URLs identifican recursos, verbos HTTP operan sobre ellos.   | Simplicidad y predictibilidad.   |
| **Sistema por capas**          | Puede haber proxies, gateways, CDN entre cliente y servidor. | Seguridad, balanceo, caché.      |
| **Código bajo demanda (opt.)** | El servidor puede envocar scripts ejecutables (JS, applets). | Extensibilidad del cliente.      |

### 3.2 Recursos y Representaciones
*   **Recurso**: Cualquier cosa que pueda ser nombrada (un usuario, una foto, un pedido).
*   **Identificador**: URI única (`/usuarios/42`).
*   **Representación**: Formato en que se envía (JSON, XML, imagen binaria).
    Ejemplo JSON:
    ```json
    {
      "id": 42,
      "nombre": "Ana",
      "email": "ana@mail.com",
      "enlaces": {
        "self": "/usuarios/42",
        "pedidos": "/usuarios/42/pedidos"
      }
    }
    ```

---

## 4. Métodos HTTP en REST

| Método  | CRUD | Idempotente | Seguro | Uso típico                                 | Ejemplo de URL         |
|---------|------|-------------|--------|---------------------------------------------|------------------------|
| **GET** | Read | Sí          | Sí     | Obtener uno o varios recursos               | `GET /libros`          |
| **POST**| Create | No        | No     | Crear un nuevo recurso hijo                 | `POST /libros`         |
| **PUT** | Update/Replace | Sí | No   | Reemplazar completamente un recurso         | `PUT /libros/123`      |
| **PATCH**| Update/Partial | No | No  | Actualizar solo ciertos campos              | `PATCH /libros/123`    |
| **DELETE**| Delete | Sí       | No     | Eliminar un recurso                         | `DELETE /libros/123`   |

+++admonition
---
type: tip
title: "Consejos de diseño"
---
*   No uses verbos en la URL (`/getLibros`), usa solo sustantivos.
*   Usa códigos de estado correctos: 201 (Created), 204 (No Content), 400, 401, 404, 409, 500.
+++

---

## 5. Endpoints

+++admonition
---
type: info
title: "Endpoint"
---
Es la **combinación de un verbo HTTP y una ruta** que apunta a un recurso o colección.
+++

### 5.1 Convenciones de nomenclatura
| Recurso        | Colección (plural) | Ejemplo colección | Ejemplo elemento |
|----------------|--------------------|-------------------|------------------|
| Usuario        | usuarios           | `GET /usuarios`   | `GET /usuarios/5`|
| Pedido         | pedidos            | `POST /pedidos`   | `PUT /pedidos/99`|
| Foto de perfil | usuarios/{id}/foto | —                 | `GET /usuarios/5/foto` |

### 5.2 Filtrado, paginado y orden
+++admonition
---
type: note
title: "Parámetros de consulta"
---
```
GET /libros?autor=Garcia&pagina=3&tamanio=20&orden=titulo,asc
```
+++

### 5.3 Versionado de API
*   Por URL: `/api/v1/libros`
*   Por cabecera: `Accept: application/vnd.miapp.v1+json`

---

## 6. Formato JSON

+++admonition
---
type: info
title: "¿Qué es JSON?"
---
**JSON (JavaScript Object Notation)** es un formato ligero de intercambio de datos. Es fácil de leer y escribir para los humanos, y fácil de analizar y generar para las máquinas. Se basa en un subconjunto del lenguaje de programación JavaScript, pero es **completamente independiente del lenguaje**.
+++

### 6.1 ¿Por qué JSON?

+++admonition
---
type: success
title: "Ventajas Clave"
---
*   **Ligero y Compacto**: Menos verboso que XML, lo que reduce el ancho de banda.
*   **Legible**: Su estructura es intuitiva y limpia.
*   **Nativo en la Web**: Se integra perfectamente con JavaScript en los navegadores.
*   **Universal**: Prácticamente todos los lenguajes de programación modernos tienen librerías estándar para manejar JSON.
+++

### 6.2 Tipos de datos soportados

JSON soporta un conjunto limitado pero poderoso de tipos de datos:

| Tipo | Descripción | Ejemplo |
|:---:|---|---|
| **String** | Cadena de texto entre comillas dobles. Soporta Unicode. | `"Hola Mundo"` |
| **Number** | Entero o punto flotante. | `42`, `3.14`, `-10` |
| **Boolean** | Valor lógico verdadero o falso (minúsculas). | `true`, `false` |
| **Null** | Valor nulo o vacío. | `null` |
| **Object** | Colección no ordenada de pares clave/valor. | `{"id": 1}` |
| **Array** | Lista ordenada de valores. | `[1, 2, 3]` |

### 6.3 Reglas de Sintaxis (¡Estrictas!)

A diferencia de los objetos de JavaScript (donde las claves pueden no tener comillas), JSON tiene reglas muy estrictas:

1.  **Claves**: Deben ir siempre entre **comillas dobles** (`"key": "value"`). Las comillas simples `'` no son válidas.
2.  **Strings**: Siempre con comillas dobles (`"texto"`).
3.  **Comas**: No se permite una coma al final del último elemento de un objeto o array ("trailing comma").
4.  **Comentarios**: JSON **no soporta comentarios**.

+++admonition
---
type: warning
title: "Errores comunes de sintaxis"
---
```json
// ESTO ES INVÁLIDO EN JSON ❌
{
  key: "value",     // Falta comillas en la clave
  "list": [1, 2, ], // Coma extra al final
  'name': 'Mario',  // Comillas simples prohibidas
  // Esto es un comentario // Prohibido
}
```
+++

### 6.4 Ejemplos Detallados

#### Objeto Simple
```json
{
  "id": 101,
  "nombre": "Laptop Pro",
  "precio": 1299.99,
  "enStock": true,
  "descripcion": null
}
```

#### Estructura Anidada y Arrays
Este ejemplo muestra un objeto complejo con arrays y objetos anidados:

```json
{
  "usuario": {
    "id": 456,
    "perfil": "admin",
    "detalles": {
      "nombre": "Ana Pérez",
      "email": "ana@example.com"
    }
  },
  "permisos": ["leer", "escribir", "borrar"],
  "historialLogin": [
    {
      "fecha": "2023-10-01T08:30:00Z",
      "ip": "192.168.1.50"
    },
    {
      "fecha": "2023-10-02T09:15:00Z",
      "ip": "192.168.1.51"
    }
  ]
}
```

### 6.5 Comparación: JSON vs XML

+++comparison-table
---
headers:
  - "Característica"
  - { text: "JSON", highlight: true }
  - "XML"
rows:
  - ["Legibilidad", "Alta, estructura limpia", "Media, muchas etiquetas de cierre"]
  - ["Tamaño", "Compacto", "Más pesado por la repetición de etiquetas"]
  - ["Tipos de datos", "Nativos (string, number, bool, array)", "Todo es texto (se debe inferir)"]
  - ["Parsing (JS)", "Nativo (`JSON.parse()`)", "Requiere XML DOM Parser"]
  - ["Esquemas", "JSON Schema (opcional)", "XSD (XML Schema Definition), DTD"]
---
+++

### 6.6 Serialización y Deserialización

El proceso de convertir un objeto en memoria a texto JSON para enviarlo por la red se llama **Serialización**. El proceso inverso se llama **Deserialización**.

+++steps
### 1. Objeto en Memoria
Tienes un objeto en tu programa (variable en JS, diccionario en Python, etc.).
Ej: `user = { id: 1, name: "Luisa" }`

### 2. Serialización (Marshalling)
Conviertes ese objeto a una cadena de texto (String) con formato JSON.
`'{"id":1,"name":"Luisa"}'`

### 3. Transmisión
La cadena de texto viaja por la red (en el Body de una petición HTTP).

### 4. Deserialización (Unmarshalling)
El receptor recibe el texto y lo convierte a un objeto nativo de su lenguaje para usarlo.
+++

#### Ejemplos de Código

+++tabs
---[tab title="JavaScript/Node.js" lang="js"]---
// Objeto JS nativo
const producto = {
  id: 1,
  nombre: "Café",
  precio: 5.5
};

// 1. Serializar (Objeto -> String JSON)
const jsonString = JSON.stringify(producto);
console.log(jsonString); 
// Salida: '{"id":1,"nombre":"Café","precio":5.5}'

// 2. Deserializar (String JSON -> Objeto)
const datosRecibidos = '{"id":2,"nombre":"Té","precio":4.0}';
const nuevoProducto = JSON.parse(datosRecibidos);
console.log(nuevoProducto.nombre); // "Té"
---
---[tab title="Python" lang="py"]---
import json

# Diccionario Python
producto = {
    "id": 1,
    "nombre": "Café",
    "precio": 5.5
}

# 1. Serializar (Dict -> String JSON)
json_string = json.dumps(producto)
print(json_string)
# Salida: '{"id": 1, "nombre": "Café", "precio": 5.5}'

# 2. Deserializar (String JSON -> Dict)
datos_recibidos = '{"id": 2, "nombre": "Té", "precio": 4.0}'
nuevo_producto = json.loads(datos_recibidos)
print(nuevo_producto['nombre']) # "Té"
---
+++

### 6.7 ¿Cuándo usar JSON?

*   **APIs REST**: Es el estándar de facto.
*   **Configuración**: Archivos como `.json` (package.json, tsconfig.json).
*   **NoSQL**: Bases de datos como MongoDB almacenan datos en BSON (Binary JSON).
*   **Local Storage**: Para guardar datos en el navegador.

### 6.8 Buenas Prácticas

+++admonition
---
type: tip
title: "Consejos para diseñar JSON"
---
*   **Convención de Nombres**: Usa **camelCase** para las claves (`nombreUsuario`, `fechaCreacion`) si trabajas con JS, o **snake_case** si tu backend es Python/Ruby, aunque camelCase es el estándar más común en APIs JSON.
*   **Fechas**: JSON no tiene tipo fecha. Usa el estándar **ISO-8601** (`"2024-11-25T14:30:00Z"`).
*   **Estructura Plana**: Evita anidar objetos demasiado profundo (más de 3 niveles) para facilitar el acceso.
*   **Arrays Homogéneos**: Intenta que los arrays contengan elementos del mismo tipo.
*   **HATEOAS**: Incluye enlaces en la respuesta para guiar al cliente (`_links` o `enlaces`).
+++

---

## 7. Servicio en la Nube

+++admonition
---
type: info
title: "¿Qué significa «servicio en la nube»?"
---
Es un **entorno de ejecución remoto** (IaaS, PaaS o SaaS) donde se despliega la API REST, ofreciendo:

*   Escalabilidad automática (auto-scaling).
*   Alta disponibilidad (99.9% SLA).
*   Gestión de certificados SSL/TLS.
*   Balanceo de carga global.
*   Integración con CI/CD.
+++

### 7.1 Proveedores habituales
| Proveedor | Servicio de alojamiento de API | Características destacadas |
|-----------|-------------------------------|----------------------------|
| **AWS**   | API Gateway + Lambda          | Infraestructura serverless, pay-per-use. |
| **Azure** | API Management + Functions    | Integración con Active Directory. |
| **GCP**   | Cloud Endpoints + Cloud Run   | Soporte nativo de gRPC y REST. |

### 7.2 Ejemplo de despliegue serverless con AWS
```bash
sam deploy --guided \
  --template-file api-template.yml \
  --stack-name mi-api-rest \
  --capabilities CAPABILITY_IAM
```
Esto genera:
*   Una función Lambda con tu código.
*   Un API Gateway que mapea URLs a la Lambda.
*   Logs en CloudWatch y monitoreo en CloudWatch Alarms.

---

## 8. Clientes REST

+++admonition
---
type: info
title: "¿Qué es un cliente REST?"
---
Cualquier programa que **consume** la API siguiendo el contrato REST.
+++

### 8.1 Tipos de clientes
| Tipo                 | Ejemplos                                | Consideraciones |
|----------------------|-----------------------------------------|-----------------|
| **Navegador**        | SPA Angular, React, Vue                 | CORS, tokens JWT. |
| **Móvil**            | Apps Android (Retrofit), iOS (Alamofire)| Gestión de red offline, caché. |
| **Backend**          | Microservicio A llamando a microservicio B | Circuit breakers, retries. |
| **CLI / Scripts**    | cURL, Postman, PowerShell               | Útiles para pruebas y automatización. |

### 8.2 Ejemplo de cliente con `curl`
```bash
# Obtener token
curl -X POST https://api.miapp.com/auth \
  -H "Content-Type: application/json" \
  -d '{"usuario":"ana","clave":"secreto"}'

# Usar token
curl -H "Authorization: Bearer $TOKEN" \
     https://api.miapp.com/usuarios/42
```

### 8.3 SDKs generados
Muchos proveedores publican **SDKs oficiales** que abstraen las peticiones HTTP:

+++tabs
---[tab title="JavaScript (Axios)" lang="js"]---
import axios from 'axios';
const api = axios.create({baseURL: 'https://api.miapp.com/v1'});
const {data} = await api.get('/libros');

---[tab title="Python (requests)" lang="py"]---
import requests
r = requests.get('https://api.miapp.com/v1/libros',
                 headers={'Authorization': f'Bearer {token}'})
libros = r.json()
+++

---

## 9. Resumen visual

+++mermaid
graph TD
  subgraph Cliente
    A[SPA Web] -->|HTTPS| GW
    B[App Móvil] -->|HTTPS| GW
    C[CLI cURL] -->|HTTPS| GW
  end
  GW[API Gateway<br/>en la nube]
  GW -->|invoca| S1[Lambda / Contenedor]
  GW -->|invoca| S2[Lambda / Contenedor]
  S1 -->|query| DB[(Base de datos)]
  style GW fill:#f9f,stroke:#333
+++

---

## 10. Recursos adicionales

*   [Documentación oficial de REST – Roy Fielding](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm)
*   [OpenAPI 3.x](https://spec.openapis.org/oas/v3.1.0) – Estandariza la descripción de tu API REST.
*   [Postman Learning Center](https://learning.postman.com) – Pruebas y generación de documentación.
*   [Google Cloud API Design Guide](https://cloud.google.com/apis/design) – Buenas prácticas de Google.
