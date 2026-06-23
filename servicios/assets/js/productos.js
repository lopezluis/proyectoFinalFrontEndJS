document.addEventListener
(
    'DOMContentLoaded',
    async function()
    {
        const altaArticulo = document.getElementById('altaArticulo');
        const botonXsupAltaArticulo = altaArticulo.getElementsByTagName('button')[0];
        const botonCancAltaArticulo = altaArticulo.getElementsByTagName('button')[1];
        const botonAcepAltaArticulo = altaArticulo.getElementsByTagName('button')[2];
        const inputFechAltaArticulo = document.getElementById('combo-input-fecha');
        const comboListAltaArticulo = document.getElementById('combo-lista-fecha');
        const calendariAltaArticulo = document.getElementById('calendario-dias');
        const mesTituloAltaArticulo = document.getElementById('mes-titulo-fecha');
        const inputNombAltaArticulo = altaArticulo.getElementsByTagName('input')[0];
        const inputPrecAltaArticulo = altaArticulo.getElementsByTagName('input')[1];
        const inputDescAltaArticulo = altaArticulo.getElementsByTagName('input')[2];
        const selecCateAltaArticulo = altaArticulo.getElementsByTagName('select')[0];
        const selecImagAltaArticulo = altaArticulo.getElementsByTagName('select')[0];
        const textaNotaAltaArticulo = altaArticulo.getElementsByTagName('textarea')[0];
        const cuadroMensaje = document.getElementById('cuadroMensaje');
        const botonXsupCuadroMensaje = cuadroMensaje.getElementsByTagName('button')[0];
        const botonCerrCuadroMensaje = cuadroMensaje.getElementsByTagName('button')[1];
        const textoTituloCuadroMensaje = cuadroMensaje.getElementsByTagName('p')[0];
        const textoMensajCuadroMensaje = cuadroMensaje.getElementsByTagName('p')[1];
        const cuadroSiNo = document.getElementById('cuadroSiNo');
        const botonXsupCuadroSiNo = cuadroSiNo.getElementsByTagName('button')[0];
        const boton_Si_CuadroSiNo = cuadroSiNo.getElementsByTagName('button')[1];
        const boton_No_CuadroSiNo = cuadroSiNo.getElementsByTagName('button')[2];
        const textoTituloCuadroSiNo = cuadroSiNo.getElementsByTagName('p')[0];
        const textoMensajCuadroSiNo = cuadroSiNo.getElementsByTagName('p')[1];
        const perfil = document.getElementById('perfil');
        const botonXsupPerfil = perfil.getElementsByTagName('button')[0];
        const botonCancPerfil = perfil.getElementsByTagName('button')[1];
        const botonAcepPerfil = perfil.getElementsByTagName('button')[2];
        const comboPerfPerfil = perfil.getElementsByTagName('select')[0];
        const cantProducto = document.getElementById('cantidad_producto');
        const botonXsupeCantProducto = cantProducto.getElementsByTagName('button')[0];
        const botonCanceCantProducto = cantProducto.getElementsByTagName('button')[1];
        const botonPagarCantProducto = cantProducto.getElementsByTagName('button')[2];
        const inputArtIdCantProducto = cantProducto.getElementsByTagName('input')[0];
        const inputCantiCantProducto = cantProducto.getElementsByTagName('input')[1];
        const carrito = document.getElementById('carrito');
        const botonXsupeCarrito = carrito.getElementsByTagName('button')[0];
        const botonCanceCarrito = carrito.getElementsByTagName('button')[1];
        const botonPagarCarrito = carrito.getElementsByTagName('button')[2];
        const tagPrincipCarrito = carrito.getElementsByTagName('main')[0];
        const tagPrTablaCarrito = carrito.getElementsByTagName('main>table#tabla-datos>thead');
        const tagPrTaBodCarrito = carrito.getElementsByTagName('main>table#tabla-datos>tbody')[0];
        const tagPrInpFiCarrito = carrito.getElementsByTagName('main>table#tabla-datos>thead>tr>th>div.th-contenedor>input.filtro-columna')[0];
        const tagPrTitOrCarrito = carrito.getElementsByTagName('main>table#tabla-datos>thead>tr>th>div.th-contenedor>span.th-titulo')[0];
        const altaCliente = document.getElementById('altaCliente');
        const botonXsupeAltaCliente = altaCliente.getElementsByTagName('button')[0];
        const botonCanceAltaCliente = altaCliente.getElementsByTagName('button')[1];
        const botonAceptAltaCliente = altaCliente.getElementsByTagName('button')[2];
        const inputNombrAltaCliente = altaCliente.getElementsByTagName('input')[0];
        const inputApellAltaCliente = altaCliente.getElementsByTagName('input')[1];
        const inputTelefAltaCliente = altaCliente.getElementsByTagName('input')[2];
        const inputEmailAltaCliente = altaCliente.getElementsByTagName('input')[3];
        const inputUsuarAltaCliente = altaCliente.getElementsByTagName('input')[4];
        const inputContrAltaCliente = altaCliente.getElementsByTagName('input')[5];
        const inputDirecAltaCliente = altaCliente.getElementsByTagName('textarea')[0];
        const login = document.getElementById('login');
        const botonXsupLogin = login.getElementsByTagName('button')[0];
        const botonCancLogin = login.getElementsByTagName('button')[1];
        const botonRecuLogin = login.getElementsByTagName('button')[2];
        const botonCreaLogin = login.getElementsByTagName('button')[3];
        const botonAcepLogin = login.getElementsByTagName('button')[4];
        const inputUsuarioLogin = login.getElementsByTagName('input')[0];
        const inputContrasLogin = login.getElementsByTagName('input')[1];
        const administracion = document.getElementById('administrar');
        const botonXsupAdministracion = administracion.getElementsByTagName('button')[0];
        const botonProdAdministracion = administracion.getElementsByTagName('button')[1];
        const botonOferAdministracion = administracion.getElementsByTagName('button')[2];
        const botonUsuaAdministracion = administracion.getElementsByTagName('button')[3];
        const botonAgreAdministracion = administracion.getElementsByTagName('button')[4];
        const botonQuitAdministracion = administracion.getElementsByTagName('button')[5];
        const botonModiAdministracion = administracion.getElementsByTagName('button')[6];
        const botonCerrAdministracion = administracion.getElementsByTagName('button')[7];
        let servidorActivo = 0;
        let dialogoAbierto = '';
        let respuesta = null;
        // Estructura de datos (struct) para mantener detalles del cliente o visitante y obtener si quién está visitando la página del supermercado,
        // es un cliente que ya ha comprado antes. Si es un visitante nuevo, es necesario obtener información de su perfil para almacenarla.
        // No tiene sentido que el visitante ponga artículos en su carrito y efectivice una compra y no se le pueda cobrar ni haya donde entregar los
        // artículos.
        const infoCliente =
        {
            id: localStorage.getItem('cliente_id') === null ? null : parseInt(localStorage.getItem('cliente_id')),
            nombre: '',
            apellido: '',
            telefono: '',
            direccion: '',
            email: '',
            perfil: '',
            fingerprint: null
        };
        const cantidad_articulos_carrito = async (info) =>
        {
            let respuestaServidor = null;
            try
            {
                respuestaServidor = await fetch
                (
                    'http://www.luislopez.com.ar:3000/api/precantidad',
                    {
                        method: 'POST',
                        headers:
                        {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(info)
                    }
                );
            }
            catch (error)
            {
                cuadroMensaje.showModal();
                textoTituloCuadroMensaje.innerText = 'Error';
                textoMensajCuadroMensaje.innerHTML = 'Error al obtener la cantidad de artículos en el carrito.<br />Mensaje: "' + error + '".';
                cuadroMensaje.style.width = '320px';
                cuadroMensaje.style.height = '214px';
                dialogoAbierto = 'cuadroMensaje';
                botonCerrCuadroMensaje.focus();
                console.error('Error al obtener la cantidad de artículos en el carrito. Mensaje: "' + error + '".');
            }
            if((respuestaServidor.status === 200) && respuestaServidor.ok)
            {
                const jsonCantidad = await respuestaServidor.json();
                if (jsonCantidad.exito == true)
                {
                    document.querySelector('html>body>header>div>div.encabezado>div.botonera>button#carritoBtn>span').innerText = `${jsonCantidad.numero}`;
                }
                else
                {
                    document.querySelector('html>body>header>div>div.encabezado>div.botonera>button#carritoBtn>span').innerText = '¿?';
                }
            }
            else
            {
                document.querySelector('html>body>header>div>div.encabezado>div.botonera>button#carritoBtn>span').innerText = '¿?';
            }
        };
        // El visitante al sitio, ¿ha comprado antes en el supermercado? Si compró, y luego borró su localStorage, no sabremos. Caso contrario,
        // verificamos si existe información en la base de datos a partir de su huella digital.
        // TODO: Averiguar, ¿qué tan preciso es basarse en el fingerprint para obtener info desde el servidor, por la posibilidad que se recupere desde
        // base de datos un cliente incorrecto.
        // TODO: ¿Qué sucede si el visitante al sitio, está utilizando una computadora pública, o de algún locutorio con servicio a Internet o café con WiFi?
        try
        {
            const FingerprintJS = await import('https://openfpcdn.io/fingerprintjs/v5');
            const fp = await FingerprintJS.load();
            const resultado = await fp.get();
            infoCliente.fingerprint = resultado.visitorId;
        }
        catch (error)
        {
            cuadroMensaje.showModal();
            textoTituloCuadroMensaje.innerText = 'Error';
            textoMensajCuadroMensaje.innerHTML = 'No se pudo calcular la huella digital.<br />Respuesta: "' + error + '".';
            cuadroMensaje.style.width = '320px';
            cuadroMensaje.style.height = '214px';
            dialogoAbierto = 'cuadroMensaje';
            botonCerrCuadroMensaje.focus();
            console.error('No se pudo calcular la huella digital.<br />Respuesta: "' + error + '".');
        }
        try
        {
            respuesta = await fetch
            (
                'http://www.luislopez.com.ar:3000/api/info_cliente',
                {
                    method: 'POST',
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(infoCliente)
                }
            );
            servidorActivo = 1;
        }
        catch (error)
        {
            cuadroMensaje.showModal();
            textoTituloCuadroMensaje.innerText = 'Error';
            textoMensajCuadroMensaje.innerHTML = 'El servidor no está activo o es inaccesible<br />' +
                                                 'al consultar la información del cliente.<br />' +
                                                 'Por favor, contacte al soporte para levantar al servidor.';
            cuadroMensaje.style.width = '320px';
            cuadroMensaje.style.height = '214px';
            dialogoAbierto = 'cuadroMensaje';
            botonCerrCuadroMensaje.focus();
            console.error('Error: El servidor no está activo o es inaccesible al consultar la información del cliente. Respuesta: "' + error + '".');
        }
        if(servidorActivo === 1)
        {
            if(respuesta.status == 200)
            {
                const cliente = await respuesta.json();
                if (cliente.exito == true)
                {
                    infoCliente.id = cliente.id;
                    infoCliente.nombre = cliente.nombre;
                    infoCliente.apellido = cliente.apellido;
                    infoCliente.telefono = cliente.telefono;
                    infoCliente.direccion = cliente.direccion;
                    infoCliente.email = cliente.email;
                    localStorage.setItem('cliente_id', infoCliente.id);
                }
            }
            cantidad_articulos_carrito(infoCliente);
            // Escritura de las tarjetas en el área de trabajo de la página de productos del supermercado
            try
            {
                respuesta = await fetch
                (
                    'http://www.luislopez.com.ar:3000/api/articulos',
                    {
                        method: 'GET'
                    }
                );
            }
            catch (error)
            {
                cuadroMensaje.showModal();
                textoTituloCuadroMensaje.innerText = 'Error';
                textoMensajCuadroMensaje.innerHTML = 'Error del servidor al cargar datos de productos.<br />Mensaje: "' + error + '".';
                cuadroMensaje.style.width = '320px';
                cuadroMensaje.style.height = '214px';
                dialogoAbierto = 'cuadroMensaje';
                botonCerrCuadroMensaje.focus();
                console.error('Error del servidor al cargar datos de productos. Mensaje: "' + error + '".');
            }
            if (respuesta.ok)
            {
                const articulos = await respuesta.json();
                const seccionProductos = document.querySelector('html>body>main>section.productos');
                if(articulos.exito)
                {
                    articulos.recordset.forEach
                    (
                        prod =>
                        {
                            const saltoDeLinea = String.fromCharCode(10);
                            const tarjeta =
                                '        <div class="card">' + saltoDeLinea +
                                `          <img src="${prod.imgsrc}" alt="${prod.nombre}">` + saltoDeLinea +
                                `          <h3>${prod.nombre}</h3>` + saltoDeLinea +
                                `          <p>${prod.descripcion}</p>` + saltoDeLinea +
                                `          <p>Precio: \$${prod.precio}</p>` + saltoDeLinea +
                                `          <button id="${prod.id}">Agregar al carrito</button>` + saltoDeLinea +
                                '        </div>' + saltoDeLinea;
                            seccionProductos.insertAdjacentHTML('beforeend', tarjeta);
                        }
                    );
                }
                else
                {
                    cuadroMensaje.showModal();
                    textoTituloCuadroMensaje.innerText = 'Error';
                    textoMensajCuadroMensaje.innerHTML = 'El servidor no devuelve la lista de productos.<br /> Respuesta: "' + articulos.error + '".';
                    cuadroMensaje.style.width = '320px';
                    cuadroMensaje.style.height = '214px';
                    dialogoAbierto = 'cuadroMensaje';
                    botonCerrCuadroMensaje.focus();
                    console.error('Error: El servidor no devuelve la lista de productos. Respuesta: "' + articulos.error + '".');
                }
            }
        }
        else
        {
            document.querySelector('html>body>header>div>div.encabezado>div.botonera>button#carritoBtn>span').innerText = '¿?';
        }
        document.addEventListener('keydown', async function(event)
        {
            switch (dialogoAbierto)
            {
            case '':
                if ((event.ctrlKey && event.altKey && event.shiftKey && event.key === 'A') || (event.key === 'a') || (event.key === 'A'))
                {
                    event.preventDefault();
                    if(localStorage.getItem('cliente_id') === null)
                    {
                        // Este diálogo pide credenciales para ingresar como usuario cliente para iniciar una compra
                        // o administrador para abm de productos y abm de ofertas.
                        // Se identifica si corresponde a un usuario o a un administrador según su nombre de usuario que se ingresa.
                        // ¿Cómo hacer para que sea agradable para el usuario?
                        login.showModal();
                        dialogoAbierto = 'login';
                        inputUsuarioLogin.value = '';
                        inputContrasLogin.value = '';
                        inputUsuarioLogin.focus();
                    }
                    else
                    {
                        cuadroSiNo.showModal();
                        textoTituloCuadroSiNo.innerText = infoCliente.apellido + ', ' + infoCliente.nombre;
                        textoMensajCuadroSiNo.innerHTML = '¿Desea finalizar la sesión?';
                        cuadroSiNo.style.width = '500px';
                        cuadroSiNo.style.height = '140px';
                        dialogoAbierto = 'cuadroSiNo';
                        boton_Si_CuadroSiNo.focus();
                    }
                }
                else
                {
                    if ((event.ctrlKey && event.altKey && event.shiftKey && event.key === 'C') || (event.key === 'c') || (event.key === 'C'))
                    {
                        // Aquí se muestra el contenido del carrito de compras, debe contener la acción de finalizar la compra, pagar, cancelar la compra,
                        // eliminar productos del carrito y modificar la cantidad de un determinado producto.
                        // TODO: Implementar la funcionalidad del carrito de compras.
                        event.preventDefault();
                        try
                        {
                            respuesta = await fetch
                            (
                                'http://www.luislopez.com.ar:3000/api/precantidad',
                                {
                                    method: 'POST',
                                    headers:
                                    {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(infoCliente)
                                }
                            );
                        }
                        catch (error)
                        {
                            cuadroMensaje.showModal();
                            textoTituloCuadroMensaje.innerText = 'Error';
                            textoMensajCuadroMensaje.innerHTML = 'El servidor no muestra la cantidad de<br />' +
                                                                 'artículos en tu carrito. Responde:<br />' +
                                                                 error;
                            cuadroMensaje.style.width = '320px';
                            cuadroMensaje.style.height = '214px';
                            dialogoAbierto = 'cuadroMensaje';
                            botonCerrCuadroMensaje.focus();
                            console.error('Error: El servidor no muestra la cantidad de artículos en el carrito. Respuesta: "' + error + '".');
                        }
                        const jsonCantidad = await respuesta.json();
                        if((respuesta.status == 200) && jsonCantidad.exito)
                        {
                            try
                            {
                                respuesta = await fetch
                                (
                                    'http://www.luislopez.com.ar:3000/api/artic_en_carrito',
                                    {
                                        method: 'POST',
                                        headers:
                                        {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(infoCliente)
                                    }
                                );
                            }
                            catch (error)
                            {
                                cuadroMensaje.showModal();
                                textoTituloCuadroMensaje.innerText = 'Error';
                                textoMensajCuadroMensaje.innerHTML = 'El servidor no responde el detalle de<br />' +
                                                                     'artículos en tu carrito. Dice:<br />' +
                                                                     error;
                                cuadroMensaje.style.width = '320px';
                                cuadroMensaje.style.height = '214px';
                                dialogoAbierto = 'cuadroMensaje';
                                botonCerrCuadroMensaje.focus();
                                console.error('Error: El servidor no responde el detalle de artículos en tu carrito. Dice: ', error);
                            }
                            carrito.showModal();
                            dialogoAbierto = 'carrito';
                            const jsonArticulosEnCarrito = await respuesta.json();
                            const saltoDeLinea = String.fromCharCode(10);
                            if (parseInt(jsonCantidad.numero) > 0)
                            {
                                let tablaDeArticulosEnCarrito =
                                    '          <p>Tenés ' + jsonCantidad.numero + ' productos en tu carrito.</p>' + saltoDeLinea +
                                    '          <table id="tabla-datos">' + saltoDeLinea +
                                    '            <thead>' + saltoDeLinea +
                                    '              <tr>' + saltoDeLinea +
                                    '                <th data-columna="0" data-tipo="numero" style="width: 15%;">' + saltoDeLinea +
                                    '                  <div class="th-contenedor">' + saltoDeLinea +
                                    '                    <span class="th-titulo">Cantidad</span>' + saltoDeLinea +
                                    '                    <input type="text" class="filtro-columna" placeholder="Filtrar cantidad..." />' + saltoDeLinea +
                                    '                  </div>' + saltoDeLinea +
                                    '                </th>' + saltoDeLinea +
                                    '                <th data-columna="1" data-tipo="texto" style="width: 60%;">' + saltoDeLinea +
                                    '                  <div class="th-contenedor">' + saltoDeLinea +
                                    '                    <span class="th-titulo">Artículo</span>' + saltoDeLinea +
                                    '                    <input type="text" class="filtro-columna" placeholder="Filtrar artículo..." />' + saltoDeLinea +
                                    '                  </div>' + saltoDeLinea +
                                    '                </th>' + saltoDeLinea +
                                    '                <th data-columna="2" data-tipo="numero" style="width: 25%;">' + saltoDeLinea +
                                    '                  <div class="th-contenedor">' + saltoDeLinea +
                                    '                    <span class="th-titulo">Precio</span>' + saltoDeLinea +
                                    '                    <input type="text" class="filtro-columna" placeholder="Filtrar precio..." />' + saltoDeLinea +
                                    '                  </div>' + saltoDeLinea +
                                    '                </th>' + saltoDeLinea +
                                    '              </tr>' + saltoDeLinea +
                                    '            </thead>' + saltoDeLinea +
                                    '            <tbody>' + saltoDeLinea;
                                let alto = 0;
                                if(jsonArticulosEnCarrito.exito)
                                {
                                    jsonArticulosEnCarrito.recordset.forEach
                                    (
                                        enCarrito =>
                                        {
                                            tablaDeArticulosEnCarrito +=
                                                '              <tr>' + saltoDeLinea +
                                                `                <td>${enCarrito.cantidad}</td>` + saltoDeLinea +
                                                `                <td>${enCarrito.nombre}</td>` + saltoDeLinea +
                                                `                <td>${enCarrito.precio}</td>` + saltoDeLinea +
                                                '              </tr>' + saltoDeLinea;
                                            alto++;
                                        }
                                    );
                                }
                                else
                                {
                                    cuadroMensaje.showModal();
                                    textoTituloCuadroMensaje.innerText = 'Error';
                                    textoMensajCuadroMensaje.innerHTML = 'El servidor no devuelve la lista de productos.<br /> Respuesta: "' +
                                        jsonArticulosEnCarrito.error + '".';
                                    cuadroMensaje.style.width = '320px';
                                    cuadroMensaje.style.height = '214px';
                                    dialogoAbierto = 'cuadroMensaje';
                                    botonCerrCuadroMensaje.focus();
                                    console.error('Error: El servidor no devuelve la lista de productos. Respuesta: "' + jsonArticulosEnCarrito.error + '".');
                                }
                                tablaDeArticulosEnCarrito +=
                                    '            </tbody>' + saltoDeLinea +
                                    '          </table>' + saltoDeLinea;
                                tagPrincipCarrito.innerHTML = tablaDeArticulosEnCarrito;
                                alto = alto * 50 + 230;
                                carrito.style.height = alto.toString() + 'px';
                            }
                            else
                            {
                                tagPrincipCarrito.innerHTML =
                                    '          <p>Aún no pusiste productos en tu carrito.</p>' + saltoDeLinea;
                                tagPrincipCarrito.style.height = '50px';
                                botonPagarCarrito.style.visibility = 'hidden';
                                carrito.style.width = '330px';
                                carrito.style.height = '150px';
                            }
                        }
                        else
                        {
                            cuadroMensaje.showModal();
                            textoTituloCuadroMensaje.innerText = 'Error';
                            textoMensajCuadroMensaje.innerHTML = 'El servidor no muestra la cantidad de<br />' +
                                                                 'artículos en tu carrito. Devuelve estado:<br />' +
                                                                 respuesta.status + '. Mensaje: "' + respuesta.error + '".';
                            cuadroMensaje.style.width = '320px';
                            cuadroMensaje.style.height = '214px';
                            dialogoAbierto = 'cuadroMensaje';
                            botonCerrCuadroMensaje.focus();
                            console.error('Error: El servidor no muestra la cantidad de artículos en tu carrito. Devuelve estado: ' + respuesta.status + '. Mensaje: "' + respuesta.error + '".');
                        }
                    }
                }
                break;
            case 'altaArticulo':
                if (event.altKey)
                {
                    switch (event.key)
                    {
                    case 'x': // xfnptodica
                    case 'X':
                    case 'c':
                    case 'C':
                        event.preventDefault();
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                        break;
                    case 'a':
                    case 'A':
                        event.preventDefault();
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
                        break;
                    case 'f':
                    case 'F':
                        break;
                    case 'n':
                    case 'N':
                        break;
                    case 'p':
                    case 'P':
                        break;
                    case 't':
                    case 'T':
                        break;
                    case 'o':
                    case 'O':
                        break;
                    case 'd':
                    case 'D':
                        break;
                    case 'i':
                    case 'I':
                    }
                }
                else
                {
                    switch (event.key)
                    {
                    case 'Escape':
                        event.preventDefault();
                        altaArticulo.close();
                        dialogoAbierto = '';
                        break;
                    case 'Enter':
                        event.preventDefault();
                        break;
                    }
                }
                break;
            case 'cuadroMensaje':
                if (event.altKey)
                {
                    switch (event.key)
                    {
                    case 'x':
                    case 'X':
                    case 'c':
                    case 'C':
                        event.preventDefault();
                        // Naturalmente quiero unificar el punto de cierre del cuadro, por eso genero el evento en lugar de cerrar directo
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                    }
                }
                else
                {
                    if (event.key === 'Escape')
                    {
                        event.preventDefault();
                        cuadroMensaje.close();
                        dialogoAbierto = '';
                    }
                }
                break;
            case 'cuadroSiNo':
                if (event.altKey)
                {
                    switch (event.key)
                    {
                    case 'x':
                    case 'X':
                        event.preventDefault();
                        // Naturalmente quiero unificar el punto de cierre del cuadro, por eso genero el evento en lugar de cerrar directo
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                        break;
                    case 's':
                    case 'S':
                        event.preventDefault();
                        // Naturalmente quiero unificar el punto de cierre del cuadro, por eso genero el evento en lugar de cerrar directo
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                        localStorage.removeItem('cliente_id');
                        document.querySelector('html>body>header>div>div.encabezado>div.botonera>button#carritoBtn>span').innerText = '0';
                        break;
                    case 'n':
                    case 'N':
                        event.preventDefault();
                        // Naturalmente quiero unificar el punto de cierre del cuadro, por eso genero el evento en lugar de cerrar directo
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                    }
                }
                else
                {
                    if (event.key === 'Escape')
                    {
                        event.preventDefault();
                        cuadroSiNo.close();
                        dialogoAbierto = '';
                    }
                }
                break;
            case 'perfil':
                if (event.altKey)
                {
                    switch (event.key)
                    {
                    case 'x': // xpca
                    case 'X':
                    case 'c':
                    case 'C':
                        event.preventDefault();
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                        break;
                    case 'p':
                    case 'P':
                        event.preventDefault();
                        comboPerfPerfil.focus();
                        break;
                    case 'a':
                    case 'A':
                        event.preventDefault();
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
                        break;
                    }
                }
                else
                {
                    switch (event.key)
                    {
                    case 'Escape':
                        event.preventDefault();
                        perfil.close();
                        dialogoAbierto = '';
                        break;
                    case 'Enter':
                        event.preventDefault();
                        if (comboPerfPerfil.value)
                        {
                            infoCliente.perfil = comboPerfPerfil.options[comboPerfPerfil.selectedIndex].text;
                        }
                        perfil.close();
                        if (infoCliente.perfil === 'administrador')
                        {
                            administracion.showModal();
                            dialogoAbierto = 'administrar';
                        }
                        else
                        {
                            dialogoAbierto = '';
                        }
                        break;
                    }
                }
                break;
            case 'cantProducto':
                if (event.altKey)
                {
                    switch (event.key)
                    {
                    case 'x':
                    case 'X':
                    case 'c':
                    case 'C':
                        event.preventDefault();
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                        break;
                    case 'n':
                    case 'N':
                        event.preventDefault();
                        inputCantiCantProducto.focus();
                        break;
                    case 'a':
                    case 'A':
                        event.preventDefault();
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
                    }
                }
                else
                {
                    switch (event.key)
                    {
                    case 'Escape':
                        event.preventDefault();
                        cantProducto.close();
                        dialogoAbierto = '';
                        break;
                    case 'Enter':
                        event.preventDefault();
                        let idProductoPonerCarrito = parseInt(inputArtIdCantProducto.value);
                        let cantidadProductoPonerCarrito = parseFloat(inputCantiCantProducto.value) || 1;
                        try
                        {
                            respuesta = await fetch
                            (
                                'http://www.luislopez.com.ar:3000/api/agregar_al_carrito',
                                {
                                    method: 'POST',
                                    headers:
                                    {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify
                                    (
                                        {
                                            cliente_id: infoCliente.id,
                                            producto_id: idProductoPonerCarrito,
                                            cantidad: cantidadProductoPonerCarrito
                                        }
                                    )
                                }
                            );
                            cantProducto.close();
                            dialogoAbierto = '';
                        }
                        catch (error)
                        {
                            cantProducto.close();
                            cuadroMensaje.showModal();
                            textoTituloCuadroMensaje.innerText = 'Error';
                            textoMensajCuadroMensaje.innerHTML = 'El servidor no logra agregar el producto al carrito.';
                            cuadroMensaje.style.width = '374px';
                            cuadroMensaje.style.height = '142px';
                            dialogoAbierto = 'cuadroMensaje';
                            botonCerrCuadroMensaje.focus();
                            console.error('Error: El servidor no logra agregar el producto al carrito. Mensaje: "' + error + '".');
                        }
                        if (respuesta.status == 200)
                        {
                            const jsonCantidad = await respuesta.json();
                            if (jsonCantidad.exito == true)
                            {
                                document.querySelector('html>body>header>div>div.encabezado>div.botonera>button#carritoBtn>span').innerText = `${jsonCantidad.numero}`;
                            }
                        }
                        else
                        {
                            // respuesta.status es 500 u otro estado de error
                            const jsonCantidad = await respuesta.json();
                            cuadroMensaje.showModal();
                            textoTituloCuadroMensaje.innerText = 'Error';
                            textoMensajCuadroMensaje.innerHTML = 'El servidor devuelve estado ' + parseInt(respuesta.status) +
                                ' al agregar el producto al carrito. Mensaje: "' + jsonCantidad.error + '".';
                            cuadroMensaje.style.width = '254px';
                            cuadroMensaje.style.height = '216px';
                            dialogoAbierto = 'cuadroMensaje';
                            botonCerrCuadroMensaje.focus();
                        }
                        break;
                    default:
                        event.preventDefault();
                        // TODO: Preguntar al usuario ¿qué desea hacer? la tecla presionada no tiene funcionalidad definida.
                    }
                }
                break;
            case 'carrito':
                if (event.altKey)
                {
                    switch (event.key)
                    {
                    case 'x':
                    case 'X':
                    case 'c':
                    case 'C':
                        event.preventDefault();
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                        break;
                    case 'p':
                    case 'P':
                        event.preventDefault();
                        // Aquí se implementaría la funcionalidad de pagar la compra.
                        break;
                    }
                }
                else
                {
                    switch (event.key)
                    {
                    case 'Escape':
                        event.preventDefault();
                        carrito.close();
                        dialogoAbierto = '';
                        break;
                    case 'Enter':
                        event.preventDefault();
                        break;
                    }
                }
                break;
            case 'altaCliente':
                if (event.altKey)
                {
                    switch (event.key)
                    {
                    case 'x': // xnptdourca
                    case 'X':
                    case 'c':
                    case 'C':
                        event.preventDefault();
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                        break;
                    case 'n':
                    case 'N':
                        event.preventDefault();
                        inputNombrAltaCliente.focus();
                        break;
                    case 'p':
                    case 'P':
                        event.preventDefault();
                        inputApellAltaCliente.focus();
                        break;
                    case 't':
                    case 'T':
                        event.preventDefault();
                        inputTelefAltaCliente.focus();
                        break;
                    case 'd':
                    case 'D':
                        event.preventDefault();
                        inputDirecAltaCliente.focus();
                        break;
                    case 'o':
                    case 'O':
                        event.preventDefault();
                        inputEmailAltaCliente.focus();
                        break;
                    case 'u':
                    case 'U':
                        event.preventDefault();
                        inputUsuarAltaCliente.focus();
                        break;
                    case 'r':
                    case 'R':
                        event.preventDefault();
                        inputContrAltaCliente.focus();
                        break;
                    case 'a':
                    case 'A':
                        event.preventDefault();
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
                        break;
                    }
                }
                else
                {
                    switch (event.key)
                    {
                    case 'Escape':
                        event.preventDefault();
                        altaCliente.close();
                        dialogoAbierto = '';
                        break;
                    case 'Enter':
                        event.preventDefault();
                        infoCliente.nombre = inputNombrAltaCliente.value;
                        infoCliente.apellido = inputApellAltaCliente.value;
                        infoCliente.telefono = inputTelefAltaCliente.value;
                        infoCliente.direccion = inputDirecAltaCliente.value;
                        infoCliente.email = inputEmailAltaCliente.value;
                        try
                        {
                            respuesta = await fetch
                            (
                                'http://www.luislopez.com.ar:3000/api/altaCliente',
                                {
                                    method: 'POST',
                                    headers:
                                    {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify
                                    (
                                        {
                                            nombre: inputNombrAltaCliente.value,
                                            apellido: inputApellAltaCliente.value,
                                            telefono: inputTelefAltaCliente.value,
                                            direccion: inputDirecAltaCliente.value,
                                            email: inputEmailAltaCliente.value,
                                            usuario: inputUsuarAltaCliente.value,
                                            contrasena: inputContrAltaCliente.value
                                        }
                                    )
                                }
                            );
                            altaCliente.close();
                            dialogoAbierto = '';
                        }
                        catch (error)
                        {
                            console.error('Error al insertar el nuevo cliente en la base de datos. Resultado: ', error);
                            altaCliente.close();
                            cuadroMensaje.showModal();
                            textoTituloCuadroMensaje.innerText = 'Error';
                            textoMensajCuadroMensaje.innerHTML = 'Error al insertar el nuevo cliente en la base de datos.<br />Resultado: ' + error;
                            cuadroMensaje.style.width = '320px';
                            cuadroMensaje.style.height = '214px';
                            dialogoAbierto = 'cuadroMensaje';
                            botonCerrCuadroMensaje.focus();
                        }
                        if (respuesta.status = 200)
                        {
                            const datos = await respuesta.json();
                            if(datos.exito)
                            {
                                infoCliente.id = datos.nuevoIdCliente;
                                infoCliente.perfil = 'cliente';
                                // Se asume que datos.relacion fue correctamente guardado, porque datos.exito es verdadero
                                localStorage.setItem('cliente_id', infoCliente.id);
                            }
                        }
                        break;
                    }
                }
                break;
            case 'login':
                if (event.altKey)
                {
                    switch (event.key)
                    {
                    case 'x': // xlocrea
                    case 'X':
                    case 'c':
                    case 'C':
                        event.preventDefault();
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                        break;
                    case 'l':
                    case 'L':
                        event.preventDefault();
                        inputUsuarioLogin.focus();
                        break;
                    case 'o':
                    case 'O':
                        event.preventDefault();
                        inputContrasLogin.focus();
                        break;
                    case 'r':
                    case 'R':
                        event.preventDefault();
                        login.close();
                        cuadroMensaje.showModal();
                        textoTituloCuadroMensaje.innerText = 'ToDo';
                        textoMensajCuadroMensaje.innerHTML = 'Implementar la recuperación de credenciales.';
                        cuadroMensaje.style.width = '346px';
                        cuadroMensaje.style.height = '140px';
                        dialogoAbierto = 'cuadroMensaje';
                        botonCerrCuadroMensaje.focus();
                        break;
                    case 'e':
                    case 'E':
                        event.preventDefault();
                        login.close();
                        altaCliente.showModal();
                        dialogoAbierto = 'altaCliente';
                        inputNombrAltaCliente.focus();
                        break;
                    case 'a':
                    case 'A':
                        event.preventDefault();
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
                    }
                }
                else
                {
                    switch (event.key)
                    {
                    case 'Escape':
                        event.preventDefault();
                        login.close();
                        dialogoAbierto = '';
                        break;
                    case 'Enter':
                        event.preventDefault();
                        try
                        {
                            respuesta = await fetch
                            (
                                'http://www.luislopez.com.ar:3000/api/acceso',
                                {
                                    method: 'POST',
                                    headers:
                                    {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({'usuario': inputUsuarioLogin.value, 'contrasena': inputContrasLogin.value})
                                }
                            );
                            servidorActivo = 1;
                        }
                        catch (error)
                        {
                            login.close();
                            cuadroMensaje.showModal();
                            textoTituloCuadroMensaje.innerText = 'Error';
                            textoMensajCuadroMensaje.innerHTML = 'El servidor no está activo o es inaccesible<br />' +
                                                                 'al consultar las credenciales del cliente.<br />' +
                                                                 'Por favor, contacte al soporte para levantar al servidor.';
                            cuadroMensaje.style.width = '320px';
                            cuadroMensaje.style.height = '214px';
                            dialogoAbierto = 'cuadroMensaje';
                            botonCerrCuadroMensaje.focus();
                            console.error('Error: El servidor no está activo o es inaccesible al consultar las credenciales del cliente. Respuesta: "' +
                                error + '".');
                        }
                        login.close();
                        if ((servidorActivo === 1) && (respuesta.status == 200))
                        {
                            const jsonAceptacion = await respuesta.json();
                            if (jsonAceptacion.exito == true)
                            {
                                if (jsonAceptacion.cliente.length > 1)
                                {
                                    infoCliente.id = jsonAceptacion.cliente[0].id;
                                    infoCliente.nombre = jsonAceptacion.cliente[0].nombre;
                                    infoCliente.apellido = jsonAceptacion.cliente[0].apellido;
                                    infoCliente.telefono = jsonAceptacion.cliente[0].telefono;
                                    infoCliente.direccion = jsonAceptacion.cliente[0].direccion;
                                    infoCliente.email = jsonAceptacion.cliente[0].email;
                                    localStorage.setItem('cliente_id', infoCliente.id);
                                    perfil.showModal();
                                    dialogoAbierto = 'perfil';
                                    comboPerfPerfil.innerHTML = '';
                                    for (let i = (jsonAceptacion.cliente.length - 1); i >= 0; i--)
                                    {
                                        comboPerfPerfil.insertAdjacentHTML('beforeend',
                                            `<option value="${jsonAceptacion.cliente[i].id_categoria}">${jsonAceptacion.cliente[i].nombre_categoria}</option>`);
                                    }
                                }
                                else
                                {
                                    if (jsonAceptacion.cliente.length == 0)
                                    {
                                        // El usuario escribió mal sus credenciales o no tiene acceso
                                        cuadroMensaje.showModal();
                                        textoTituloCuadroMensaje.innerText = 'Error';
                                        textoMensajCuadroMensaje.innerHTML = 'Las credenciales ingresadas son inválidas.<br />' +
                                                                             'Por favor, verifíquelas e intente nuevamente.';
                                        cuadroMensaje.style.width = '340px';
                                        cuadroMensaje.style.height = '164px';
                                        dialogoAbierto = 'cuadroMensaje';
                                        botonCerrCuadroMensaje.focus();
                                    }
                                    else
                                    {
                                        // El usuario que accedió tiene un solo perfil, seguramente cliente,
                                        // dado que ser administrador sin ser cliente. no tendría sentido.
                                        switch (jsonAceptacion.cliente[0].nombre_categoria)
                                        {
                                        case 'administrador':
                                            infoCliente.id = jsonAceptacion.cliente[0].id;
                                            infoCliente.nombre = jsonAceptacion.cliente[0].nombre;
                                            infoCliente.apellido = jsonAceptacion.cliente[0].apellido;
                                            infoCliente.telefono = jsonAceptacion.cliente[0].telefono;
                                            infoCliente.direccion = jsonAceptacion.cliente[0].direccion;
                                            infoCliente.email = jsonAceptacion.cliente[0].email;
                                            localStorage.setItem('cliente_id', infoCliente.id);
                                            infoCliente.perfil = 'administrador';
                                            administracion.showModal();
                                            dialogoAbierto = 'administrar';
                                            break;
                                        case 'cliente':
                                            infoCliente.id = jsonAceptacion.cliente[0].id;
                                            infoCliente.nombre = jsonAceptacion.cliente[0].nombre;
                                            infoCliente.apellido = jsonAceptacion.cliente[0].apellido;
                                            infoCliente.telefono = jsonAceptacion.cliente[0].telefono;
                                            infoCliente.direccion = jsonAceptacion.cliente[0].direccion;
                                            infoCliente.email = jsonAceptacion.cliente[0].email;
                                            localStorage.setItem('cliente_id', infoCliente.id);
                                            dialogoAbierto = '';
                                            infoCliente.perfil = 'cliente';
                                            break;
                                        default:
                                            // Nunca se debería nunca poder acceder a este punto, si se puede, es necesario
                                            // identificar y reproducir la acción, para asegurar ejecución correcta.
                                            localStorage.removeItem('cliente_id');
                                            cuadroMensaje.showModal();
                                            textoTituloCuadroMensaje.innerText = 'Error Interno';
                                            textoMensajCuadroMensaje.innerHTML = 'Por favor, consulte con el administrador.';
                                            cuadroMensaje.style.width = '340px';
                                            cuadroMensaje.style.height = '164px';
                                            dialogoAbierto = 'cuadroMensaje';
                                            botonCerrCuadroMensaje.focus();
                                        }
                                    }
                                }
                            }
                            else
                            {
                                cuadroMensaje.showModal();
                                textoTituloCuadroMensaje.innerText = 'Error';
                                textoMensajCuadroMensaje.innerHTML = jsonAceptacion.error;
                                cuadroMensaje.style.width = '320px';
                                cuadroMensaje.style.height = '214px';
                                dialogoAbierto = 'cuadroMensaje';
                                botonCerrCuadroMensaje.focus();
                                console.error('Error: ' + jsonAceptacion.error);
                            }
                        }
                        cantidad_articulos_carrito(infoCliente);
                    }
                }
                break;
            case 'administrar':
                if (event.altKey)
                {
                    switch (event.key)
                    {
                    case 'x': // xpouaqmc
                    case 'X':
                    case 'c':
                    case 'C':
                        event.preventDefault();
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                        break;
                    case 'p':
                    case 'P':
                        event.preventDefault();
                        botonProdAdministracion.classList.add('active');
                        botonOferAdministracion.classList.remove('active');
                        botonUsuaAdministracion.classList.remove('active');
                        break;
                    case 'o':
                    case 'O':
                        event.preventDefault();
                        botonProdAdministracion.classList.remove('active');
                        botonOferAdministracion.classList.add('active');
                        botonUsuaAdministracion.classList.remove('active');
                        break;
                    case 'u':
                    case 'U':
                        event.preventDefault();
                        botonProdAdministracion.classList.remove('active');
                        botonOferAdministracion.classList.remove('active');
                        botonUsuaAdministracion.classList.add('active');
                        break;
                    case 'a':
                    case 'A':
                        event.preventDefault();
                        if (botonProdAdministracion.classList.contains('active'))
                        {
                            administracion.close();
                            altaArticulo.showModal();
                            dialogoAbierto = 'altaArticulo';
                            {
                                const fechaActual = new Date();
                                const anyoAct = fechaActual.getFullYear();
                                const mesAct = fechaActual.getMonth();

                                // Nombres de los meses para el título
                                const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                                mesTituloAltaArticulo.textContent = `${meses[mesAct]} ${anyoAct}`;

                                const primerDiaSemana = new Date(anyoAct, mesAct, 1).getDay(); // Día de la semana del día 1 (0=Dom, 1=Lun...)
                                const totalDias = new Date(anyoAct, mesAct + 1, 0).getDate();  // Total de días en el mes

                                let html = '<tr>';
                                let diaCuenta = 1;

                                // Rellenar espacios vacíos de la primera semana
                                for (let i = 0; i < primerDiaSemana; i++)
                                {
                                    html += '<td class="vacio"></td>';
                                }

                                // Generar los días del mes
                                for (let i = primerDiaSemana; diaCuenta <= totalDias; i++)
                                {
                                    if (i > 0 && i % 7 === 0)
                                    {
                                        html += '</tr><tr>'; // Siguiente semana / fila
                                    }
                                    html += `<td class="dia-click" data-dia="${diaCuenta}">${diaCuenta}</td>`;
                                    diaCuenta++;
                                }

                                html += '</tr>';
                                calendariAltaArticulo.innerHTML = html;
                            }
                            try
                            {
                                respuesta = await fetch
                                (
                                    'http://www.luislopez.com.ar:3000/api/lista_categ_art',
                                    {
                                        method: 'GET'
                                    }
                                );
                                servidorActivo = 1;
                            }
                            catch(error)
                            {
                                cuadroMensaje.showModal();
                                textoTituloCuadroMensaje.innerText = 'Error';
                                textoMensajCuadroMensaje.innerHTML = 'El servidor no devuelve la lista de categorías solicitada.<br /> Respuesta: "' +
                                    error + '".';
                                cuadroMensaje.style.width = '320px';
                                cuadroMensaje.style.height = '214px';
                                dialogoAbierto = 'cuadroMensaje';
                                botonCerrCuadroMensaje.focus();
                                console.error('Error: El servidor no devuelve la lista de categorías solicitada. Respuesta: "' + error + '".');
                            }
                            if (respuesta.status == 200)
                            {
                                const categorias = await respuesta.json();
                                const listaCategorias = document.querySelector('html>body>dialog#altaArticulo>form>main>select#categoria');
                                for (let i = (categorias.dataset.length - 1); i >= 0; i--)
                                {
                                    const opcionHTML = `<option value="${categorias.dataset[i].id}">${categorias.dataset[i].nombre}</option>`;
                                    listaCategorias.insertAdjacentHTML('beforeend', opcionHTML);
                                }
                            }
                            // imgsrc select de los archivos existentes en el directorio: '/var/www/html/superACasa/servicios/assets/images/prod/'
                        }
                        else
                        {
                            if (botonOferAdministracion.classList.contains('active'))
                            {
                                // TODO: Llamar al servidor para agregar una oferta
                                administracion.close();
                                altaOferta.showModal();
                                dialogoAbierto = 'altaOferta';
                            }
                        }
                        break;
                    case 'q':
                    case 'Q':
                        event.preventDefault();
                        if (botonProdAdministracion.classList.contains('active'))
                        {
                            // TODO: Llamar al servidor para quitar un producto
                            administracion.close();
                            bajaArticulo.showModal();
                            dialogoAbierto = 'bajaArticulo';
                        }
                        else
                        {
                            if (botonOferAdministracion.classList.contains('active'))
                            {
                                // TODO: Llamar al servidor para quitar una oferta
                                administracion.close();
                                bajaOferta.showModal();
                                dialogoAbierto = 'bajaOferta';
                            }
                        }
                        break;
                    case 'm':
                    case 'M':
                        event.preventDefault();
                        if (botonProdAdministracion.classList.contains('active'))
                        {
                            // TODO: Llamar al servidor para modificar un producto
                            administracion.close();
                            modiArticulo.showModal();
                            dialogoAbierto = 'modiArticulo';
                        }
                        else
                        {
                            if (botonOferAdministracion.classList.contains('active'))
                            {
                                // TODO: Llamar al servidor para modificar una oferta
                                administracion.close();
                                modiOferta.showModal();
                                dialogoAbierto = 'modiOferta';
                            }
                        }
                    }
                }
                else
                {
                    if (event.key === 'Escape')
                    {
                        event.preventDefault();
                        administracion.close();
                        dialogoAbierto = '';
                    }
                }
                break;
            default:
                break;
            }
        });
        const botonesConIdNumerico = Array.from(document.querySelectorAll('button[id]')).filter(elemento => {return /\d+/.test(elemento.id);});
        botonesConIdNumerico.forEach(boton =>
        {
            boton.addEventListener('click', async function(event)
            {
                event.preventDefault();
                if (infoCliente.id === null)
                {
                    infoCliente.id = localStorage.getItem('cliente_id');
                    if (infoCliente.id === null)
                    {
                        login.showModal();
                        dialogoAbierto = 'login';
                        // TODO: debería indicar al diálogo login que luego de aceptar, tiene que llamar a cantProducto para el id del botón que se presionó
                        // Un input hidden
                    }
                }
                cantProducto.showModal();
                inputArtIdCantProducto.value = parseInt(event.currentTarget.id);
                dialogoAbierto = 'cantProducto';
            });
        });
        document.getElementById('administrarBtn').addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'a'}));
        });
        document.getElementById('carritoBtn').addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'c'}));
        });
        botonXsupAltaArticulo.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        });
        botonCancAltaArticulo.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        });
        botonAcepAltaArticulo.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
        });
        // inputFechAltaArticulo click default es correcto
        // inputNombAltaArticulo click default es correcto
        // inputPrecAltaArticulo click default es correcto
        // inputDescAltaArticulo click default es correcto
        // selecCateAltaArticulo click default es correcto
        // selecImagAltaArticulo click default es correcto
        // textaNotaAltaArticulo click default es correcto
        botonXsupCuadroMensaje.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        });
        botonCerrCuadroMensaje.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        });
        // textoTituloCuadroMensaje click no tiene acción
        // textoMensajCuadroMensaje click no tiene acción
        botonXsupCuadroSiNo.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        });
        boton_Si_CuadroSiNo.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 's', 'code': 'KeyS', 'altKey': true, 'bubbles': true}));
        });
        boton_No_CuadroSiNo.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'n', 'code': 'KeyN', 'altKey': true, 'bubbles': true}));
        });
        // textoTituloCuadroSiNo click no tiene acción
        // textoMensajCuadroSiNo click no tiene acción
        botonXsupPerfil.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        });
        botonCancPerfil.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        });
        botonAcepPerfil.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
        });
        comboPerfPerfil.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'p', 'code': 'KeyP', 'altKey': true, 'bubbles': true}));
        });
        botonXsupeCantProducto.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        });
        botonCanceCantProducto.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        });
        botonPagarCantProducto.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
        });
        botonXsupeCarrito.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        });
        botonCanceCarrito.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        });
        botonPagarCarrito.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
        });
        botonXsupeAltaCliente.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        });
        botonCanceAltaCliente.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        });
        botonAceptAltaCliente.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
        });
        botonXsupLogin.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        });
        botonCancLogin.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        });
        botonRecuLogin.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'r', 'code': 'KeyR', 'altKey': true, 'bubbles': true}));
        });
        botonCreaLogin.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'e', 'code': 'KeyE', 'altKey': true, 'bubbles': true}));
        });
        botonAcepLogin.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
        });
        botonXsupAdministracion.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        });
        botonProdAdministracion.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'p', 'code': 'KeyP', 'altKey': true, 'bubbles': true}));
        });
        botonOferAdministracion.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'o', 'code': 'KeyO', 'altKey': true, 'bubbles': true}));
        });
        botonUsuaAdministracion.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'u', 'code': 'KeyO', 'altKey': true, 'bubbles': true}));
        });
        botonAgreAdministracion.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'a', 'code': 'KeyA', 'altKey': true, 'bubbles': true}));
        });
        botonQuitAdministracion.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'q', 'code': 'KeyQ', 'altKey': true, 'bubbles': true}));
        });
        botonModiAdministracion.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'm', 'code': 'KeyM', 'altKey': true, 'bubbles': true}));
        });
        botonCerrAdministracion.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        });
        // Alternar visibilidad del cuadro de lista al hacer click
        inputFechAltaArticulo.addEventListener('click', async function()
        {
            comboListAltaArticulo.classList.toggle('hidden');
        });
        calendariAltaArticulo.addEventListener('click', async function(event)
        {
            if (event.target.classList.contains('dia-click'))
            {
                // Desmarcar el anterior
                const anterior = calendariAltaArticulo.querySelector('.seleccionado');
                if (anterior)
                {
                    anterior.classList.remove('seleccionado');
                }
                
                // Marcar el nuevo
                event.target.classList.add('seleccionado');
                
                const fechaActual = new Date();
                const mesAct = fechaActual.getMonth();
                // Nombres de los meses para el título
                const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

                // Actualizar el valor visual del cuadro combinado y cerrar la lista
                const diaSeleccionado = event.target.dataset.dia;
                inputFechAltaArticulo.textContent = `${diaSeleccionado} de ${meses[mesAct]}`;
                comboListAltaArticulo.classList.add('hidden');
            }
        });
        tagPrTablaCarrito.addEventListener('input', (evento) =>
        {
            if (evento.target.classList.contains('filtro-columna'))
            {
                const filas = tagPrTaBodCarrito.querySelectorAll('tr');
                
                filas.forEach
                (
                    fila =>
                    {
                        let mostrarFila = true;
                    
                        // Evaluamos cada input de filtro existente
                        tagPrInpFiCarrito.forEach
                        (
                            (input, indiceColumna) =>
                            {
                                const valorFiltro = input.value.toLowerCase().trim();
                                
                                // Si el input está vacío, no restringe esta columna
                                if (valorFiltro === '')
                                {
                                    return;
                                }
                                
                                // Obtenemos el texto de la celda correspondiente a esta columna
                                const textoCelda = fila.children[indiceColumna].textContent.toLowerCase();
                                
                                // Si la celda NO incluye lo que busca el usuario, marcamos la fila para ocultar
                                if (!textoCelda.includes(valorFiltro))
                                {
                                    mostrarFila = false;
                                }
                            }
                        );
                    
                        // Aplicamos el cambio visual en base al resultado de todos los inputs
                        if (mostrarFila)
                        {
                            fila.classList.remove('oculto');
                        }
                        else
                        {
                            fila.classList.add('oculto');
                        }
                    }
                );
            }
        });
        let columnaActual = -1;
        let ordenAscendente = true;
        tagPrTablaCarrito.addEventListener('click', function(evento)
        {
            // Validamos que el click haya sido estrictamente en el texto del título y no en el input
            const tituloCliqueado = evento.target.closest('.th-titulo');
            if (!tituloCliqueado)
            {
                return;
            }  
            
            const thPadre = tituloCliqueado.closest('th');
            const indiceColumna = parseInt(thPadre.dataset.columna);
            const tipoDato = thPadre.dataset.tipo;
            
            if (columnaActual === indiceColumna)
            {
                ordenAscendente = !ordenAscendente;
            }
            else
            {
                ordenAscendente = true;
                columnaActual = indiceColumna;
            }
            
            // Actualizar indicadores visuales (flechas)
            tagPrTitOrCarrito.forEach(t => t.classList.remove('orden-asc', 'orden-desc'));
            tituloCliqueado.classList.add(ordenAscendente ? 'orden-asc' : 'orden-desc');
            
            // Ordenar las filas en memoria
            const filasArray = Array.from(tagPrTaBodCarrito.querySelectorAll('tr'));
            filasArray.sort
            (
                (filaA, filaB) =>
                {
                    const celdaA = filaA.children[indiceColumna].textContent.trim();
                    const celdaB = filaB.children[indiceColumna].textContent.trim();
                    
                    if (tipoDato === 'numero')
                    {
                        return ordenAscendente ? celdaA - celdaB : celdaB - celdaA;
                    }
                    else
                    {
                        return ordenAscendente ? celdaA.localeCompare(celdaB) : celdaB.localeCompare(celdaA);
                    }
                }
            );
            
            // Reinyectar filas ordenadas manteniendo los filtros actuales
            filasArray.forEach(fila => tagPrTaBodCarrito.appendChild(fila));
        });
    }
);
