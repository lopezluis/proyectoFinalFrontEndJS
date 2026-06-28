<link rel="stylesheet" href="documentacion/css/readme.css">

# Proyecto Final

<table border="1" bgcolor="#D0D0D0" cellspacing="0" cellpadding="5">
  <caption style="border-top:1px solid black; border-left:1px solid black;
   border-right:1px solid black; background-color:#d0d0d0">Información del documento</caption>
  <tbody>
    <tr>
      <td style="border:1px solid black;"><strong>Autor</strong></td>
      <td style="border:1px solid black;">Luis Fernando López</td>
    </tr>
    <tr>
      <td style="border:1px solid black;"><strong>Fecha</strong></td>
      <td style="border:1px solid black;">Martes, 23 de Junio de 2026</td>
    </tr>
    <tr>
      <td style="border:1px solid black;"><strong>Acceso</strong></td>
      <td style="border:1px solid black;"><a href="http://www.luislopez.com.ar/superACasa/index.html">Super A Casa</a></td>
    </tr>
  </tbody>
</table>

## Descripción

Se presenta la web de lo que sería un mercado con posibilidades de compra vía Internet.

## Productos

La tabla tendrá los siguientes campos:

* identi
* nombre
* descri
* precio
* promoc
* imgsrc

Todos los productos cuyo campo promoción, tienen valor no nulo, van en la
página 'index.html'.

Todos los productos cuyo campo promoción, tienen valor nulo, van en la página 'servicios/productos.html'.

Con la siguiente estructura:

~~~html
<div class="card">
  <span class="promocion">%promoc%</span>
  <img src="servicios/assets/images/prod/%imgsrc%" alt="%nombre%">
  <h3>%nombre%</h3>
  <p>%descri%</p>
  <p>Precio: $%precio%</p>
  <button id="%identi%">Agregar al carrito</button>
</div>
~~~

## Comentarios

Correspondientes al código JavaScript.

La siguiente:

~~~JavaScript(/home/llopez/Público/talentoTechCABAminEducacion/frontEndJS/proyectoFinalFrontEndJS/servicios/assets/js/index.js:82:12)
~~~

Es la estructura de datos (struct) para mantener detalles del cliente o visitante y obtener si quién está visitando la página del supermercado,
es un cliente que ya ha comprado antes. Si es un visitante nuevo, es necesario obtener información de su perfil para almacenarla.
No tiene sentido que el visitante ponga artículos en su carrito y efectivice una compra y no se le pueda cobrar ni haya donde entregar los
artículos.

El visitante al sitio, ¿ha comprado antes en el supermercado? Si compró, y luego borró su localStorage, no sabremos. Caso contrario,
verificamos si existe información en la base de datos a partir de la huella digital de su navegador.

TODO: Averiguar, ¿qué tan preciso es basarse en el fingerprint para obtener info desde el servidor, por la posibilidad que se recupere desde
base de datos un cliente incorrecto.

TODO: ¿Qué sucede si el visitante al sitio, está utilizando una computadora pública, o de algún locutorio con servicio a Internet o café con WiFi?

El diálogo login pide credenciales para ingresar como usuario cliente para iniciar una compra o administrador para abm de productos y abm de ofertas.

Se identifica si corresponde a un usuario o a un administrador según su nombre de usuario que se ingresa.

TODO: ¿Cómo hacer para que el dialogo login sea agradable para el usuario? ¿se puede? Creo que no.

Cuando se presiona la letra "c" el la página de ofertas o en la pagina de productos, se muestra el contenido del carrito de compras, contiene la acción de finalizar la compra, pagar, cancelar la compra,
eliminar productos del carrito y modificar la cantidad de un determinado producto.

TODO: Revisar calidad de implementación de la funcionalidad del carrito de compras.

## Modo de Uso

Tanto en la página Ofertas o index.html, como en la página Productos o productos.html, se puede observar, en la esquina superior derecha, 2 íconos, el primero con el aspecto de un engranaje, que llamaremos **Login**, y el segundo con aspecto de carrito de compras, que llamaremos simplemente **Carrito**.

### Login

Al presionarlo aparecerá el cuadro de diálogo con título acceso, que se muestra a continuación:

![Diálogo Accesso](dialogoAcceso.jpg)

Permitirá el acceso a un cliente, especificando su nombre de usuario, en el cuadro de texto "Cliente", y su password, en el cuadro de diálogo "Contraseña".

Existirán algunos usuarios, que se estima, son empleados del comercio, que pueden ser administradores. Entonces, existen 2 perfiles:

* administrador
* cliente

En el caso que el usuario que se loguea, tenga un único perfil de entre los 2 seleccionados, ya quedará logueado con el perfil asignado.

En el caso que el usuario que se loguea, tenga los 2 perfiles, porque por ejemplo, es empleado del comercio y además hace sus compras en él, le aparecerá automáticamente otro diálogo, para que indique cual pefil desea utilizar en sus siguientes acciones. Este diálogo se muestra a continuación:

![Diálogo Perfil](dialogoPerfil.jpg)

Si elige su perfil de administrador, podrá realizar las acciones respectivas, eligiéndolas en el diguiente diálogo:

![Diálogo Administracion](dialogoAdministracion.jpg)

Tanto el cliente como el administrador, luego de realizar las acciones que dieron lugar a su acceso, presionando nuevamente el botón Login, podrá desloguearse, apareciéndole el siguiente diálogo:

![Diálogo Logout](dialogoLogout.jpg)

### Carrito

Cuando un usuario tiene el único perfil de cliente, o tiene ambos, de cliente y administrador, y estás loguedo como cliente, al presionar el carrito de compras, le aparecerá el siguiente diálogo que le permitirá realizar las acciones que necesita en el comercio:

![Diálogo Carrito](dialogoCarrito.jpg)
