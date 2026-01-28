# Tabs (Bloques de código con pestañas)

Muestra el mismo fragmento de código en diferentes lenguajes mediante pestañas.

## Sintaxis

````markdown
+++tabs
---[tab title="JavaScript" lang="js"]---
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet('World'));

---[tab title="Python" lang="py"]---
def greet(name):
  return f"Hello, {name}!"

print(greet('World'))

---[tab title="Shell" lang="sh"]---
# Ejemplo con otro lenguaje
echo "Hola, Mundo"
+++
````