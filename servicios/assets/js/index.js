document.addEventListener
(
    'DOMContentLoaded',
    async function()
    {
        const login = document.getElementById('login');
        const botonXsupLogin = login.getElementsByTagName('button')[0];
        const botonCancLogin = login.getElementsByTagName('button')[1];
        const botonRecuLogin = login.getElementsByTagName('button')[2];
        const botonCreaLogin = login.getElementsByTagName('button')[3];
        const botonAcepLogin = login.getElementsByTagName('button')[4];
        const inputUsuaLogin = login.getElementsByTagName('input')[0];
        const inputCntrLogin = login.getElementsByTagName('input')[1];
        const cuadroMensaje = document.getElementById('cuadroMensaje');
        const botonXsupCuadroMensaje = cuadroMensaje.getElementsByTagName('button')[0];
        const botonCerrCuadroMensaje = cuadroMensaje.getElementsByTagName('button')[1];
        const textoTituCuadroMensaje = cuadroMensaje.getElementsByTagName('p')[0];
        const textoMensCuadroMensaje = cuadroMensaje.getElementsByTagName('p')[1];
        const cuadroSiNo = document.getElementById('cuadroSiNo');
        const botonXsCuadroSiNo = cuadroSiNo.getElementsByTagName('button')[0];
        const botonSiCuadroSiNo = cuadroSiNo.getElementsByTagName('button')[1];
        const botonNoCuadroSiNo = cuadroSiNo.getElementsByTagName('button')[2];
        const textoTiCuadroSiNo = cuadroSiNo.getElementsByTagName('p')[0];
        const textoMeCuadroSiNo = cuadroSiNo.getElementsByTagName('p')[1];
        const carrito = document.getElementById('carrito');
        const botonXsupeCarrito = carrito.getElementsByTagName('button')[0];
        const botonCanceCarrito = carrito.getElementsByTagName('button')[1];
        const botonFinalCarrito = carrito.getElementsByTagName('button')[2];
        const botonAnulaCarrito = carrito.getElementsByTagName('button')[3];
        const botonQuitaCarrito = carrito.getElementsByTagName('button')[4];
        const botonModifCarrito = carrito.getElementsByTagName('button')[5];
        const botonPagarCarrito = carrito.getElementsByTagName('button')[6];
        const tagPrincipCarrito = carrito.getElementsByTagName('main')[0];
        const tagPrTablaCarrito = carrito.getElementsByTagName('main>table#tabla-datos>thead')[0];
        const tagPrTaBodCarrito = carrito.getElementsByTagName('main>table#tabla-datos>tbody')[0];
        const tagPrInpFiCarrito = carrito.getElementsByTagName('main>table#tabla-datos>thead>tr>th>div.th-contenedor>input.filtro-columna')[0];
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
        const administrar = document.getElementById('administrar');
        const botonXsupAdministrar = administrar.getElementsByTagName('button')[0];
        const botonProdAdministrar = administrar.getElementsByTagName('button')[1];
        const botonOferAdministrar = administrar.getElementsByTagName('button')[2];
        const botonUsuaAdministrar = administrar.getElementsByTagName('button')[3];
        const botonAgreAdministrar = administrar.getElementsByTagName('button')[4];
        const botonQuitAdministrar = administrar.getElementsByTagName('button')[5];
        const botonModiAdministrar = administrar.getElementsByTagName('button')[6];
        const botonCerrAdministrar = administrar.getElementsByTagName('button')[7];
        const arePestPrAdministrar = administrar.getElementsByTagName('main>div.tabs-content>div#productos>table#tabla-articulos>tbody')[0];
        const arePestOfAdministrar = administrar.getElementsByTagName('main>div.tabs-content>div#ofertas>table#tabla-ofertas>tbody')[0];
        const arePestUsAdministrar = administrar.getElementsByTagName('main>div.tabs-content>div#usuarios>table#tabla-usuarios>tbody')[0];
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
        let servidorActivo = 0;
        let dialogoAbierto = '';
        let respuestaServidor = null;
        let infoCliente =
        {
            id: 0,
            nombre: '',
            apellido: '',
            telefono: '',
            direccion: '',
            email: '',
            perfil: '',
            fingerprint: null,
            cantidadArticulosCarrito: NaN
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
                textoTituCuadroMensaje.innerText = 'Error';
                textoMensCuadroMensaje.innerHTML = 'Error al obtener la cantidad de artículos en el carrito.<br />Mensaje: "' + error + '".';
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
                    info.cantidadArticulosCarrito = parseInt(jsonCantidad.numero);
                }
            }
            document.querySelector('html>body>header>div>div.encabezado>div.botonera>button#carritoBtn>span').innerText =
                (Number.isNaN(info.cantidadArticulosCarrito) ? '¿?' : info.cantidadArticulosCarrito);
        };
        if(localStorage.getItem('cliente_id') !== null)
        {
            infoCliente.id = parseInt(localStorage.getItem('cliente_id'));
            if(localStorage.getItem('cliente_perfil') === null)
            {
                infoCliente.perfil =  'cliente';
                localStorage.setItem('cliente_perfil', infoCliente.perfil);
            }
            else
            {
                infoCliente.perfil = localStorage.getItem('cliente_perfil');
                if((infoCliente.perfil !== 'cliente') && (infoCliente.perfil !== 'administrador'))
                {
                    infoCliente.perfil =  'cliente';
                    localStorage.setItem('cliente_perfil', infoCliente.perfil);
                }
            }
        }
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
            textoTituCuadroMensaje.innerText = 'Error';
            textoMensCuadroMensaje.innerHTML = 'No se pudo calcular la huella digital.<br /> Respuesta: ' + error;
            cuadroMensaje.style.width = '320px';
            cuadroMensaje.style.height = '214px';
            dialogoAbierto = 'cuadroMensaje';
            botonCerrCuadroMensaje.focus();
            console.error('Error: No se pudo calcular la huella digital. Respuesta: "' + error + '".');
        }
        try
        {
            respuestaServidor = await fetch
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
            textoTituCuadroMensaje.innerText = 'Error';
            textoMensCuadroMensaje.innerHTML = 'El servidor no está activo o es inaccesible<br />' +
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
            if(respuestaServidor.status == 200)
            {
                const cliente = await respuestaServidor.json();
                if (cliente.exito == true)
                {
                    infoCliente.id = cliente.id;
                    localStorage.setItem('cliente_id', infoCliente.id);
                    infoCliente.nombre = cliente.nombre;
                    infoCliente.apellido = cliente.apellido;
                    infoCliente.telefono = cliente.telefono;
                    infoCliente.direccion = cliente.direccion;
                    infoCliente.email = cliente.email;
                    infoCliente.perfil =  'cliente';
                    localStorage.setItem('cliente_perfil', infoCliente.perfil);
                }
            }
            await cantidad_articulos_carrito(infoCliente);
            try
            {
                respuestaServidor = await fetch
                (
                    'http://www.luislopez.com.ar:3000/api/ofertas',
                    {
                        method: 'GET'
                    }
                );
            }
            catch(error)
            {
                cuadroMensaje.showModal();
                textoTituCuadroMensaje.innerText = 'Error';
                textoMensCuadroMensaje.innerHTML = 'Error del servidor al obtener las ofertas activas.<br />Mensaje: "' + error + '".';
                cuadroMensaje.style.width = '320px';
                cuadroMensaje.style.height = '214px';
                dialogoAbierto = 'cuadroMensaje';
                botonCerrCuadroMensaje.focus();
                console.error('Error del servidor al obtener las ofertas activas.<br />Mensaje: "' + error + '".');
            }
            if((respuestaServidor.status === 200) && respuestaServidor.ok)
            {
                const articulos = await respuestaServidor.json();
                const seccionProductos = document.querySelector('html>body>main>section.productos');
                if(articulos.recordset.length > 0)
                {
                    seccionProductos.insertAdjacentHTML('beforeend', '<h2>Ofertas del Día</h2>');
                }
                articulos.recordset.forEach
                (
                    prod =>
                    {
                        const saltoDeLinea = String.fromCharCode(10);
                        const tarjeta =
                        '        <div class="card">' + saltoDeLinea +
                        `          <span class="promocion">${prod.promo_nombre}</span>` + saltoDeLinea +
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
                textoTituCuadroMensaje.innerText = 'Error';
                textoMensCuadroMensaje.innerHTML = 'El servidor no responde las ofertas activas.<br />' +
                                                     'Respuesta: "' + error + '".';
                cuadroMensaje.style.width = '320px';
                cuadroMensaje.style.height = '214px';
                dialogoAbierto = 'cuadroMensaje';
                botonCerrCuadroMensaje.focus();
                console.error('Error: El servidor no responde las ofertas activas. Respuesta: "' + error + '".');
            }
        }
        else
        {
            document.querySelector('html>body>header>div>div.encabezado>div.botonera>button#carritoBtn>span').innerText = '¿?';
        }
        document.addEventListener('keydown', async function(event)
        {
            const mostrarDialogoAdministrar = async () =>
            {
                administrar.showModal();
                dialogoAbierto = 'administrar';
                let paginacion =
                {
                    registrosPagina: 5,
                    paginaSolicitada: 1
                };
                try
                {
                    respuestaServidor = await fetch
                    (
                        'http://www.luislopez.com.ar:3000/api/articulos_paginados',
                        {
                            method: 'POST',
                            headers:
                            {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(paginacion)
                        }
                    );
                }
                catch (error)
                {
                    cuadroMensaje.showModal();
                    textoTituCuadroMensaje.innerText = 'Error';
                    textoMensCuadroMensaje.innerHTML = 'El servidor no devuelve los productos<br />' +
                                                       'en forma paginada. Respuesta:<br />"' + error + '".';
                    cuadroMensaje.style.width = '320px';
                    cuadroMensaje.style.height = '214px';
                    dialogoAbierto = 'cuadroMensaje';
                    botonCerrCuadroMensaje.focus();
                    console.error('Error: El servidor no devuelve los productos en forma paginada. Respuesta: "' + error + '".');
                }
                if(respuestaServidor.status == 200)
                {
                    const jsonArticulosPaginados = await respuestaServidor.json();
                    const saltoDeLinea = String.fromCharCode(10);
                    if(jsonArticulosPaginados.recordset.length > 0)
                    {
                        let articulosPaginados = '';
                        let alto = 0;
                        if(jsonArticulosPaginados.exito)
                        {
                            jsonArticulosPaginados.recordset.forEach
                            (
                                articulo =>
                                {
                                    articulosPaginados +=
                                        '              <tr>' + saltoDeLinea +
                                        `                <td>${articulo.nombre}</td>` + saltoDeLinea +
                                        `                <td>${articulo.descripcion}</td>` + saltoDeLinea +
                                        `                <td>${articulo.precio}</td>` + saltoDeLinea +
                                        '              </tr>' + saltoDeLinea;
                                    alto++;
                                }
                            );
                        }
                        else
                        {
                            cuadroMensaje.showModal();
                            textoTituCuadroMensaje.innerText = 'Error';
                            textoMensCuadroMensaje.innerHTML = 'El servidor no devuelve la lista de productos paginada.<br /> Respuesta: "' +
                                jsonArticulosEnCarrito.error + '".';
                            cuadroMensaje.style.width = '320px';
                            cuadroMensaje.style.height = '214px';
                            dialogoAbierto = 'cuadroMensaje';
                            botonCerrCuadroMensaje.focus();
                            console.error('Error: El servidor no devuelve la lista de productos paginada. Respuesta: "' +
                                jsonArticulosEnCarrito.error + '".');
                        }
                        arePestPrAdministrar.innerHTML = articulosPaginados;
                    }
                    else
                    {
                        arePestPrAdministrar.innerHTML =
                            '          <tr><td colspan="3" style="text-align: center;">Sin productos.</td></tr>' + saltoDeLinea;
                    }
                }
                else
                {
                    cuadroMensaje.showModal();
                    textoTituCuadroMensaje.innerText = 'Error';
                    textoMensCuadroMensaje.innerHTML = 'El servidor no devuelve los productos<br />' +
                                                       'en forma paginada. Estado: ' + respuestaServidor.status + '.';
                    cuadroMensaje.style.width = '320px';
                    cuadroMensaje.style.height = '214px';
                    dialogoAbierto = 'cuadroMensaje';
                    botonCerrCuadroMensaje.focus();
                    console.error('Error: El servidor no devuelve los productos en forma paginada. Estado: "' + respuestaServidor.status + '".');
                }
                // TODO: cargar las tablas de Oferta y Usuario
            }
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
                        inputUsuaLogin.value = '';
                        inputCntrLogin.value = '';
                        inputUsuaLogin.focus();
                    }
                    else
                    {
                        cuadroSiNo.showModal();
                        textoTiCuadroSiNo.innerText = infoCliente.apellido + ', ' + infoCliente.nombre;
                        textoMeCuadroSiNo.innerHTML = '¿Desea finalizar la sesión?';
                        cuadroSiNo.style.width = '500px';
                        cuadroSiNo.style.height = '140px';
                        dialogoAbierto = 'cuadroSiNo';
                        botonSiCuadroSiNo.focus();
                    }
                }
                else
                {
                    if ((event.ctrlKey && event.altKey && event.shiftKey && event.key === 'C') || (event.key === 'c') || (event.key === 'C'))
                    {
                        event.preventDefault();
                        try
                        {
                            respuestaServidor = await fetch
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
                            textoTituCuadroMensaje.innerText = 'Error';
                            textoMensCuadroMensaje.innerHTML = 'El servidor no responde el detalle de<br />' +
                                                                    'artículos en tu carrito. Dice:<br />' +
                                                                    error;
                            cuadroMensaje.style.width = '320px';
                            cuadroMensaje.style.height = '214px';
                            dialogoAbierto = 'cuadroMensaje';
                            botonCerrCuadroMensaje.focus();
                            console.error('Error: El servidor no responde el detalle de artículos en tu carrito. Dice: "' + error + '".');
                        }
                        carrito.showModal();
                        dialogoAbierto = 'carrito';
                        const jsonArticulosEnCarrito = await respuestaServidor.json();
                        const saltoDeLinea = String.fromCharCode(10);
                        if(infoCliente.cantidadArticulosCarrito > 0)
                        {
                            let tablaDeArticulosEnCarrito =
                                '          <p>Tenés ' + infoCliente.cantidadArticulosCarrito + ' productos en tu carrito.</p>' + saltoDeLinea +
                                '          <table id="tabla-datos">' + saltoDeLinea +
                                '            <thead>' + saltoDeLinea +
                                '              <tr>' + saltoDeLinea +
                                '                <th data-columna="0" data-tipo="numero" style="width: 15%;">' + saltoDeLinea +
                                '                  <div class="th-contenedor">' + saltoDeLinea +
                                '                    <span class="th-titulo">Cantidad</span>' + saltoDeLinea +
                                '                    <input type="text" name="filtro-columna" class="filtro-columna" placeholder="Filtrar cantidad..." />' +
                                saltoDeLinea +
                                '                  </div>' + saltoDeLinea +
                                '                </th>' + saltoDeLinea +
                                '                <th data-columna="1" data-tipo="texto" style="width: 60%;">' + saltoDeLinea +
                                '                  <div class="th-contenedor">' + saltoDeLinea +
                                '                    <span class="th-titulo">Artículo</span>' + saltoDeLinea +
                                '                    <input type="text" name="filtro-columna" class="filtro-columna" placeholder="Filtrar artículo..." />' +
                                saltoDeLinea +
                                '                  </div>' + saltoDeLinea +
                                '                </th>' + saltoDeLinea +
                                '                <th data-columna="2" data-tipo="numero" style="width: 25%;">' + saltoDeLinea +
                                '                  <div class="th-contenedor">' + saltoDeLinea +
                                '                    <span class="th-titulo">Precio</span>' + saltoDeLinea +
                                '                    <input type="text" name="filtro-columna" class="filtro-columna" placeholder="Filtrar precio..." />' +
                                saltoDeLinea +
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
                                textoTituCuadroMensaje.innerText = 'Error';
                                textoMensCuadroMensaje.innerHTML = 'El servidor no devuelve la lista de productos.<br /> Respuesta: "' +
                                    jsonArticulosEnCarrito.error + '".';
                                cuadroMensaje.style.width = '320px';
                                cuadroMensaje.style.height = '214px';
                                dialogoAbierto = 'cuadroMensaje';
                                botonCerrCuadroMensaje.focus();
                                console.error('Error: El servidor no devuelve la lista de productos. Respuesta: "' +
                                    jsonArticulosEnCarrito.error + '".');
                            }
                            tablaDeArticulosEnCarrito +=
                                '            </tbody>' + saltoDeLinea +
                                '          </table>' + saltoDeLinea;
                            tagPrincipCarrito.innerHTML = tablaDeArticulosEnCarrito;
                            botonCanceCarrito.style.width = '110px';
                            botonCanceCarrito.style.height = '60px';
                            botonFinalCarrito.style.width = '110px';
                            botonFinalCarrito.style.height = '60px';
                            botonAnulaCarrito.style.width = '110px';
                            botonAnulaCarrito.style.height = '60px';
                            botonQuitaCarrito.style.width = '110px';
                            botonQuitaCarrito.style.height = '60px';
                            botonModifCarrito.style.width = '110px';
                            botonModifCarrito.style.height = '60px';
                            botonPagarCarrito.style.width = '110px';
                            botonPagarCarrito.style.height = '60px';
                            carrito.style.width = '770px';
                            alto = alto * 49 + 253;
                            carrito.style.height = alto.toString() + 'px';
                            const tagPrTitOrCarrito = document.getElementById('tabla-datos');
                            tagPrTitOrCarrito.querySelector("thead").addEventListener('click', async function (evento)
                            {
                                let columnaActual = -1;
                                let ordenAscendente = true;
                                const ejecutarOrdenamiento = async (tituloCliqueado) =>
                                {
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
                                    // tagPrTitOrCarrito.forEach(t => t.classList.remove('orden-asc', 'orden-desc'));
                                    for (const tituloQuitarClasesAscDesc of tagPrTitOrCarrito.getElementsByTagName("span.th-titulo"))
                                    {
                                        tituloQuitarClasesAscDesc.classList.remove('orden-asc', 'orden-desc');
                                    }
                                    tituloCliqueado.classList.add(ordenAscendente ? 'orden-asc' : 'orden-desc');
                                    // Ordenar las filas en memoria
                                    const filasArray = Array.from(document.querySelectorAll('#carrito tbody tr'));
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
                                }
                                if (evento.target.classList.contains("th-titulo"))
                                {
                                    const spanPresionado = evento.target;
                                    const textoColumna = spanPresionado.textContent;
                                    await ejecutarOrdenamiento(spanPresionado);
                                }
                            });
                        }
                        else
                        {
                            tagPrincipCarrito.innerHTML =
                                '          <p>Aún no pusiste productos en tu carrito.</p>' + saltoDeLinea;
                            tagPrincipCarrito.style.height = '50px';
                            botonCanceCarrito.style.left = '74px';
                            botonCanceCarrito.style.position = 'fixed';
                            botonCanceCarrito.style.top = '84px';
                            botonFinalCarrito.style.visibility = 'hidden';
                            botonFinalCarrito.style.position = 'fixed';
                            botonFinalCarrito.style.right = 0;
                            botonAnulaCarrito.style.visibility = 'hidden';
                            botonAnulaCarrito.style.position = 'fixed';
                            botonAnulaCarrito.style.right = 0;
                            botonQuitaCarrito.style.visibility = 'hidden';
                            botonQuitaCarrito.style.position = 'fixed';
                            botonQuitaCarrito.style.right = 0;
                            botonModifCarrito.style.visibility = 'hidden';
                            botonModifCarrito.style.position = 'fixed';
                            botonModifCarrito.style.right = 0;
                            botonPagarCarrito.style.visibility = 'hidden';
                            botonPagarCarrito.style.position = 'fixed';
                            botonPagarCarrito.style.right = 0;
                            carrito.style.width = '302px';
                            carrito.style.height = '144px';
                        }
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
                        inputUsuaLogin.focus();
                        break;
                    case 'o':
                    case 'O':
                        event.preventDefault();
                        inputCntrLogin.focus();
                        break;
                    case 'r':
                    case 'R':
                        event.preventDefault();
                        login.close();
                        cuadroMensaje.showModal();
                        textoTituCuadroMensaje.innerText = 'ToDo';
                        textoMensCuadroMensaje.innerHTML = 'Implementar la recuperación de credenciales.';
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
                            respuestaServidor = await fetch
                            (
                                'http://www.luislopez.com.ar:3000/api/acceso',
                                {
                                    method: 'POST',
                                    headers:
                                    {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({'usuario': inputUsuaLogin.value, 'contrasena': inputCntrLogin.value})
                                }
                            );
                            servidorActivo = 1;
                        }
                        catch (error)
                        {
                            login.close();
                            cuadroMensaje.showModal();
                            textoTituCuadroMensaje.innerText = 'Error';
                            textoMensCuadroMensaje.innerHTML = 'El servidor no está activo o es inaccesible<br />' +
                                                                 'al consultar las credenciales del cliente.<br />' +
                                                                 'Por favor, contacte al soporte para levantar al servidor.';
                            cuadroMensaje.style.width = '320px';
                            cuadroMensaje.style.height = '214px';
                            dialogoAbierto = 'cuadroMensaje';
                            botonCerrCuadroMensaje.focus();
                            console.error(
                                'Error: El servidor no está activo o es inaccesible al consultar las credenciales del cliente. Respuesta: "' +
                                error + '".');
                        }
                        login.close();
                        if ((servidorActivo === 1) && (respuestaServidor.status == 200))
                        {
                            const jsonAceptacion = await respuestaServidor.json();
                            if (jsonAceptacion.exito == true)
                            {
                                if (jsonAceptacion.recordset.length > 1)
                                {
                                    infoCliente.id = jsonAceptacion.recordset[0].id;
                                    localStorage.setItem('cliente_id', infoCliente.id);
                                    infoCliente.nombre = jsonAceptacion.recordset[0].nombre;
                                    infoCliente.apellido = jsonAceptacion.recordset[0].apellido;
                                    infoCliente.telefono = jsonAceptacion.recordset[0].telefono;
                                    infoCliente.direccion = jsonAceptacion.recordset[0].direccion;
                                    infoCliente.email = jsonAceptacion.recordset[0].email;
                                    perfil.showModal();
                                    dialogoAbierto = 'perfil';
                                    comboPerfPerfil.innerHTML = '';
                                    for (let i = (jsonAceptacion.recordset.length - 1); i >= 0; i--)
                                    {
                                        comboPerfPerfil.insertAdjacentHTML('beforeend',
                                            `<option value="${jsonAceptacion.recordset[i].id_categoria}">` +
                                            `${jsonAceptacion.recordset[i].nombre_categoria}` +
                                            '</option>');
                                    }
                                }
                                else
                                {
                                    if (jsonAceptacion.recordset.length == 0)
                                    {
                                        // El usuario escribió mal sus credenciales o no tiene acceso
                                        cuadroMensaje.showModal();
                                        textoTituCuadroMensaje.innerText = 'Error';
                                        textoMensCuadroMensaje.innerHTML = 'Las credenciales ingresadas son inválidas.<br />' +
                                                                             'Por favor, verifíquelas e intente nuevamente.';
                                        cuadroMensaje.style.width = '340px';
                                        cuadroMensaje.style.height = '164px';
                                        dialogoAbierto = 'cuadroMensaje';
                                        botonCerrCuadroMensaje.focus();
                                        infoCliente.cliente_id = 0;
                                        localStorage.removeItem('cliente_id');
                                        infoCliente.perfil = '';
                                        localStorage.removeItem('cliente_perfil');
                                    }
                                    else
                                    {
                                        // El usuario que accedió tiene un solo perfil, seguramente cliente,
                                        // dado que ser administrador sin ser cliente. no tendría sentido.
                                        switch (jsonAceptacion.recordset[0].nombre_categoria)
                                        {
                                        case 'administrador':
                                            infoCliente.id = jsonAceptacion.recordset[0].id;
                                            localStorage.setItem('cliente_id', infoCliente.id);
                                            infoCliente.nombre = jsonAceptacion.recordset[0].nombre;
                                            infoCliente.apellido = jsonAceptacion.recordset[0].apellido;
                                            infoCliente.telefono = jsonAceptacion.recordset[0].telefono;
                                            infoCliente.direccion = jsonAceptacion.recordset[0].direccion;
                                            infoCliente.email = jsonAceptacion.recordset[0].email;
                                            infoCliente.perfil = 'administrador';
                                            localStorage.setItem('cliente_perfil', infoCliente.perfil);
                                            await mostrarDialogoAdministrar();
                                            break;
                                        case 'cliente':
                                            dialogoAbierto = '';
                                            infoCliente.id = jsonAceptacion.recordset[0].id;
                                            localStorage.setItem('cliente_id', infoCliente.id);
                                            infoCliente.nombre = jsonAceptacion.recordset[0].nombre;
                                            infoCliente.apellido = jsonAceptacion.recordset[0].apellido;
                                            infoCliente.telefono = jsonAceptacion.recordset[0].telefono;
                                            infoCliente.direccion = jsonAceptacion.recordset[0].direccion;
                                            infoCliente.email = jsonAceptacion.recordset[0].email;
                                            infoCliente.perfil = 'cliente';
                                            localStorage.setItem('cliente_perfil', infoCliente.perfil);
                                            break;
                                        default:
                                            // Nunca se debería poder acceder a este punto, si se accede, es porque se agregó
                                            // a la base de datos una nueva categoría y no se implementó en el código.
                                            localStorage.removeItem('cliente_id');
                                            cuadroMensaje.showModal();
                                            textoTituCuadroMensaje.innerText = 'Error Interno';
                                            textoMensCuadroMensaje.innerHTML = 'Por favor, consulte con el administrador.';
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
                                textoTituCuadroMensaje.innerText = 'Error';
                                textoMensCuadroMensaje.innerHTML = jsonAceptacion.error;
                                cuadroMensaje.style.width = '320px';
                                cuadroMensaje.style.height = '214px';
                                dialogoAbierto = 'cuadroMensaje';
                                botonCerrCuadroMensaje.focus();
                                console.error('Error: "' + jsonAceptacion.error + '".');
                            }
                        }
                        cantidad_articulos_carrito(infoCliente);
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
                    case 'n':
                    case 'N':
                        event.preventDefault();
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                        break;
                    case 's':
                    case 'S':
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
                        cuadroSiNo.close();
                        if(infoCliente.perfil === 'administrador')
                        {
                            await mostrarDialogoAdministrar();
                        }
                        break;
                    case 'Enter':
                        event.preventDefault();
                        cuadroSiNo.close();
                        dialogoAbierto = '';
                        localStorage.removeItem('cliente_id');
                        document.querySelector('html>body>header>div>div.encabezado>div.botonera>button#carritoBtn>span').innerText = '0';
                        break;
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
                    case 'f':
                    case 'F':
                        event.preventDefault();
                        // TODO: Llamar al servidor para finalizar la compra
                        carrito.close();
                        cuadroMensaje.showModal();
                        textoTituCuadroMensaje.innerText = 'ToDo';
                        textoMensCuadroMensaje.innerHTML = 'Implementar que el cliente pueda finalizar la compra.';
                        cuadroMensaje.style.width = '320px';
                        cuadroMensaje.style.height = '214px';
                        dialogoAbierto = 'cuadroMensaje';
                        botonCerrCuadroMensaje.focus();
                        break;
                    case 'a':
                    case 'A':
                        event.preventDefault();
                        // TODO: Llamar al servidor para anular la compra
                        carrito.close();
                        cuadroMensaje.showModal();
                        textoTituCuadroMensaje.innerText = 'ToDo';
                        textoMensCuadroMensaje.innerHTML = 'Implementar que el cliente pueda anular la compra.';
                        cuadroMensaje.style.width = '320px';
                        cuadroMensaje.style.height = '214px';
                        dialogoAbierto = 'cuadroMensaje';
                        botonCerrCuadroMensaje.focus();
                        break;
                    case 'q':
                    case 'Q':
                        event.preventDefault();
                        // TODO: Llamar al servidor para quitar artículo seleccionado
                        carrito.close();
                        cuadroMensaje.showModal();
                        textoTituCuadroMensaje.innerText = 'ToDo';
                        textoMensCuadroMensaje.innerHTML = 'Implementar que se pueda seleccionar un producto de la lista.';
                        cuadroMensaje.style.width = '320px';
                        cuadroMensaje.style.height = '214px';
                        dialogoAbierto = 'cuadroMensaje';
                        botonCerrCuadroMensaje.focus();
                        break;
                    case 'm':
                    case 'M':
                        event.preventDefault();
                        // TODO: Llamar al servidor para modificar la cantidad del artículo seleccionado
                        carrito.close();
                        cuadroMensaje.showModal();
                        textoTituCuadroMensaje.innerText = 'ToDo';
                        textoMensCuadroMensaje.innerHTML = 'Implementar que se pueda modificar la cantidad<br />' +
                                                           'del producto seleccionado de la lista.';
                        cuadroMensaje.style.width = '320px';
                        cuadroMensaje.style.height = '214px';
                        dialogoAbierto = 'cuadroMensaje';
                        botonCerrCuadroMensaje.focus();
                        break;
                    case 'p':
                    case 'P':
                        event.preventDefault();
                        // TODO: Aquí se implementaría la funcionalidad de pagar la compra.
                        carrito.close();
                        cuadroMensaje.showModal();
                        textoTituCuadroMensaje.innerText = 'ToDo';
                        textoMensCuadroMensaje.innerHTML = 'Implementar que se pueda pagar la compra.';
                        cuadroMensaje.style.width = '320px';
                        cuadroMensaje.style.height = '214px';
                        dialogoAbierto = 'cuadroMensaje';
                        botonCerrCuadroMensaje.focus();
                        break;
                    }
                }
                else
                {
                    if(event.key === 'Escape')
                    {
                        event.preventDefault();
                        carrito.close();
                        dialogoAbierto = '';
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
                            textoTituCuadroMensaje.innerText = 'Error';
                            textoMensCuadroMensaje.innerHTML = 'Error al insertar el nuevo cliente en la base de datos.<br />Resultado: ' + error;
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
                                localStorage.setItem('cliente_perfil', infoCliente.perfil);
                            }
                        }
                        break;
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
                            localStorage.setItem('cliente_perfil', infoCliente.perfil);
                        }
                        perfil.close();
                        if (infoCliente.perfil === 'administrador')
                        {
                            await mostrarDialogoAdministrar();
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
                            textoTituCuadroMensaje.innerText = 'Error';
                            textoMensCuadroMensaje.innerHTML = 'El servidor no logra agregar el producto al carrito.';
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
                            textoTituCuadroMensaje.innerText = 'Error';
                            textoMensCuadroMensaje.innerHTML = 'El servidor devuelve estado ' + parseInt(respuesta.status) +
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
                        botonProdAdministrar.classList.add('active');
                        botonOferAdministrar.classList.remove('active');
                        botonUsuaAdministrar.classList.remove('active');
                        break;
                    case 'o':
                    case 'O':
                        event.preventDefault();
                        botonProdAdministrar.classList.remove('active');
                        botonOferAdministrar.classList.add('active');
                        botonUsuaAdministrar.classList.remove('active');
                        break;
                    case 'u':
                    case 'U':
                        event.preventDefault();
                        botonProdAdministrar.classList.remove('active');
                        botonOferAdministrar.classList.remove('active');
                        botonUsuaAdministrar.classList.add('active');
                        break;
                    case 'a':
                    case 'A':
                        event.preventDefault();
                        if (botonProdAdministrar.classList.contains('active'))
                        {
                            administrar.close();
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
                            if (botonOferAdministrar.classList.contains('active'))
                            {
                                // TODO: Llamar al servidor para agregar una oferta
                                administrar.close();
                                altaOferta.showModal();
                                dialogoAbierto = 'altaOferta';
                            }
                        }
                        break;
                    case 'q':
                    case 'Q':
                        event.preventDefault();
                        if (botonProdAdministrar.classList.contains('active'))
                        {
                            // TODO: Llamar al servidor para quitar un producto
                            administrar.close();
                            bajaArticulo.showModal();
                            dialogoAbierto = 'bajaArticulo';
                        }
                        else
                        {
                            if (botonOferAdministrar.classList.contains('active'))
                            {
                                // TODO: Llamar al servidor para quitar una oferta
                                administrar.close();
                                bajaOferta.showModal();
                                dialogoAbierto = 'bajaOferta';
                            }
                        }
                        break;
                    case 'm':
                    case 'M':
                        event.preventDefault();
                        if (botonProdAdministrar.classList.contains('active'))
                        {
                            // TODO: Llamar al servidor para modificar un producto
                            administrar.close();
                            modiArticulo.showModal();
                            dialogoAbierto = 'modiArticulo';
                        }
                        else
                        {
                            if (botonOferAdministrar.classList.contains('active'))
                            {
                                // TODO: Llamar al servidor para modificar una oferta
                                administrar.close();
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
                        administrar.close();
                        dialogoAbierto = '';
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
                        // TODO: debería indicar al diálogo login que luego de aceptar, tiene que abrir cantProducto para el id del botón que presionó
                        // el usuario, con un input hidden.
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
        // textoTituCuadroMensaje click no tiene acción
        // textoMensCuadroMensaje click no tiene acción
        botonXsCuadroSiNo.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        });
        botonSiCuadroSiNo.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 's', 'code': 'KeyS', 'altKey': true, 'bubbles': true}));
        });
        botonNoCuadroSiNo.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'n', 'code': 'KeyN', 'altKey': true, 'bubbles': true}));
        });
        // textoTiCuadroSiNo click no tiene acción
        // textoMeCuadroSiNo click no tiene acción
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
        botonFinalCarrito.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'f', 'code': 'KeyF', 'altKey': true, 'bubbles': true}));
        });
        botonAnulaCarrito.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'a', 'code': 'KeyA', 'altKey': true, 'bubbles': true}));
        });
        botonQuitaCarrito.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'q', 'code': 'KeyQ', 'altKey': true, 'bubbles': true}));
        });
        botonModifCarrito.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'm', 'code': 'KeyM', 'altKey': true, 'bubbles': true}));
        });
        botonPagarCarrito.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'p', 'code': 'KeyP', 'altKey': true, 'bubbles': true}));
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
        botonXsupAdministrar.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
        });
        botonProdAdministrar.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'p', 'code': 'KeyP', 'altKey': true, 'bubbles': true}));
        });
        botonOferAdministrar.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'o', 'code': 'KeyO', 'altKey': true, 'bubbles': true}));
        });
        botonUsuaAdministrar.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'u', 'code': 'KeyU', 'altKey': true, 'bubbles': true}));
        });
        botonAgreAdministrar.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'a', 'code': 'KeyA', 'altKey': true, 'bubbles': true}));
        });
        botonQuitAdministrar.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'q', 'code': 'KeyQ', 'altKey': true, 'bubbles': true}));
        });
        botonModiAdministrar.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'm', 'code': 'KeyM', 'altKey': true, 'bubbles': true}));
        });
        botonCerrAdministrar.addEventListener('click', async function(event)
        {
            event.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
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
        // Ocultar el cuadro de lista del cuadro combinado, al hacer click en el cuadro de texto
/*        inputFechAltaArticulo.addEventListener('click', async function()
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
*/        carrito.addEventListener('input', async function(evento)
        {
            if (evento.target.classList.contains('filtro-columna'))
            {
                const filas = carrito.querySelectorAll('form>main>table#tabla-datos>tbody>tr');
                filas.forEach
                (
                    fila =>
                    {
                        let mostrarFila = true;
                        carrito.querySelectorAll('form>main>table#tabla-datos>thead>tr>th>div.th-contenedor>input.filtro-columna').forEach
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
    }
);
