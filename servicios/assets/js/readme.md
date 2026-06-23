# Administración

## Introducción

Dado que estamos en la página de productos, presionando **Ctrl+Alt+Shift+a**, nos permitirá administrar alta, baja y modificación de productos y administrar asignación de diferentes promociones a un determinado producto.

Luego de detectar que el usuario presionó la combinación de teclas para administrar y antes de la implementación de la administración en si, evitamos la acción por defecto de la combinación de teclas, si la ubiere, mediante el llamado a **event.preventDefault();**.

Se muestra un diálogo modal con las posibilidades de administrar productos y ofertas.

## Evento de administración

El siguiente es un código básico para interceptar la presión por el usuario de Ctrl+Enter:

~~~JavaScript
document.addEventListener('keydown', function(event)
{
    if (event.ctrlKey && event.key === 'Enter')
    {
        event.preventDefault();
        miFuncion();
    }
});

function miFuncion()
{
    console.log('¡Combinación de teclas ejecutada con éxito!');
}
~~~

## Diálogo qué administrar

Para implementar un diálogo modal con título y un grupo de botones, la forma más rápida y moderna en la web es usando la etiqueta nativa de HTML <dialog> junto con JavaScript.

Aquí hay un ejemplo práctico y funcional:

Código HTML y JavaScriptCrea tu estructura indicando <dialog id="miModal">.

~~~html
<!-- Botón para abrir el modal -->
<button onclick="document.getElementById('miModal').showModal()">Abrir Modal</button>

<!-- Estructura del Diálogo -->
<dialog id="miModal">
  <h2>Título del Diálogo</h2>
  <p>Esta es el área de trabajo. Aquí puedes colocar la información necesaria antes de usar los botones.</p>
  
  <div class="grupo-botones">
    <button class="btn-principal" onclick="alert('Acción Aceptada'); document.getElementById('miModal').close()">Aceptar</button>
    <button class="btn-secundario" onclick="document.getElementById('miModal').close()">Cancelar</button>
    <button class="btn-terciario" onclick="alert('Más opciones')">Otras Opciones</button>
  </div>
</dialog>
~~~

### Estilos CSS recomendados

Puedes utilizar el pseudo-elemento ::backdrop para oscurecer el fondo y asegurar que el modal quede en primer plano.

~~~css
dialog
{
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

dialog::backdrop
{
  background-color: rgba(0, 0, 0, 0.5); /* Fondo oscuro */
}

.grupo-botones
{
  display: flex;
  gap: 10px;
  margin-top: 20px;
  justify-content: flex-end;
}
~~~
