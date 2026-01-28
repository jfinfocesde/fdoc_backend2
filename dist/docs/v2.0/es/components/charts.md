# Charts

Gráfica configurada con Chart.js usando YAML para tipo y datos.

## Ejemplo Básico

````markdown
+++charts
---
title: "Progreso por Semana"
type: "bar"
data:
  labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4"]
  datasets:
    - label: "Ejercicios completados"
      data: [5, 9, 13, 17]
options:
  plugins:
    legend:
      position: "bottom"
---
+++
````

## Ejemplo del Tutorial (Ventas por Trimestre)

````markdown
+++charts
---
type: 'bar'
title: 'Ventas por Trimestre'
data:
  labels: ['Q1', 'Q2', 'Q3', 'Q4']
  datasets:
    - label: 'Ventas (en millones)'
      data: [12, 19, 3, 5]
---
+++
````

## Ejemplo de Línea

````markdown
+++charts
---
type: 'line'
title: 'Tendencia de Usuarios'
data:
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
  datasets:
    - label: 'Usuarios Activos'
      data: [100, 150, 200, 180, 250, 300]
      borderColor: '#3b82f6'
      backgroundColor: 'transparent'
---
+++
````