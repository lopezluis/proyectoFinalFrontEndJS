document.addEventListener
(
    'DOMContentLoaded',
    async () =>
    {
        let infoCliente =
        {
            id: 0,
            nombre: '',
            apellido: '',
            telefono: '',
            direccion: '',
            email: '',
            perfil: 'cliente',
            fingerprint: null,
            cantidadArticulosCarrito: NaN
        };
        const cuadro_mensaje = async (texto_titulo, texto_mensaje, ancho_cuadro, alto_cuadro, proximoDialogo = undefined) =>
        {
            let respuestaServidor = null;
            const administradorEventoClickBotones = async (evento) =>
            {
                evento.preventDefault();
                document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
            }
            const administradorEventosTecladoCuadroMensaje = async (evento) =>
            {
                if (evento.altKey)
                {
                    switch (evento.key)
                    {
                    case 'x':
                    case 'X':
                    case 'c':
                    case 'C':
                        evento.preventDefault();
                        document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                    }
                }
                else
                {
                    if (evento.key === 'Escape')
                    {
                        evento.preventDefault();
                        document.getElementById('cuadroMensaje').close();
                        document.removeEventListener('keydown', administradorEventosTecladoCuadroMensaje);
                        document.addEventListener('keydown', administradorEventosTecladoPrincipal);
                        // No hace falta remover el escuchador del evento click, del botón botonXsupCuadroMensaje, con:
                        // "botonXsupCuadroMensaje.removeEventListener('click', administradorEventoClickBotones);"
                        // porque se destruye con close del dialog#cuadroMensaje, entonces el usuario nunca podrá cliquearlo
                        // No hace falta remover el escuchador de eventos click, del botón botonCerrCuadroMensaje, con
                        // "botonCerrCuadroMensaje.removeEventListener('click', administradorEventoClickBotones);"
                        // porque se destruye con close del dialog#cuadroMensaje, entonces el usuario nunca podrá cliquearlo
                        document.querySelector('html>body>dialog#cuadroMensaje').remove();
                    }
                }
            }
            {
                let mensajePorConsola = texto_titulo + ':';
                const expresionRegular = new RegExp('<br />', 'g');
                const saltosDeLinea = Array.from(texto_mensaje.matchAll(expresionRegular));
                let caracterInicio = 0;
                for (const saltoLinea of saltosDeLinea)
                {
                    mensajePorConsola += ' ' + texto_mensaje.substring(caracterInicio, saltoLinea.index).trim();
                    caracterInicio = saltoLinea.index + 6;
                }
                if(texto_titulo == 'Error')
                {
                    console.error(mensajePorConsola + ' ' + texto_mensaje.substring(caracterInicio).trim());
                }
                else
                {
                    console.log(mensajePorConsola + ' ' + texto_mensaje.substring(caracterInicio).trim());
                }
            }
            try
            {
                respuestaServidor = await fetch
                (
                    'http://www.luislopez.com.ar:3000/api/cuadro_mensaje',
                    {
                        method: 'GET'
                    }
                );
            }
            catch(error)
            {
                console.error('Error del servidor al obtener la estructura del cuadro de mensajes.<br />Mensaje: "' + error + '".');
            }
            if((respuestaServidor.status === 200) && respuestaServidor.ok)
            {
                const seccionDialogos = document.querySelector('html>body');
                const estructura = await respuestaServidor.text();
                seccionDialogos.insertAdjacentHTML('beforeend', estructura);
                const cuadroMensaje = document.getElementById('cuadroMensaje');
                let posXInicial = 0, posYInicial = 0;
                let posXActual = 0, posYActual = 0;
                const arrastrarDialogo = async (evento) =>
                {
                    evento.preventDefault();
                    posXInicial = posXActual - evento.clientX;
                    posYInicial = posYActual - evento.clientY;
                    posXActual = evento.clientX;
                    posYActual = evento.clientY;
                    cuadroMensaje.style.top = (cuadroMensaje.offsetTop - posYInicial) + "px";
                    cuadroMensaje.style.left = (cuadroMensaje.offsetLeft - posXInicial) + "px";
                    cuadroMensaje.style.margin = "0";
                }
                const detenerArrastre = async (evento) =>
                {
                    document.removeEventListener('mousemove', arrastrarDialogo);
                    document.removeEventListener('mouseup', detenerArrastre);
                }
                const iniciarArrastre = async (evento) =>
                {
                    evento.preventDefault();
                    posXActual = evento.clientX;
                    posYActual = evento.clientY;
                    document.addEventListener('mousemove', arrastrarDialogo);
                    document.addEventListener('mouseup', detenerArrastre);
                }
                const botonXsupCuadroMensaje = cuadroMensaje.getElementsByTagName('button')[0];
                const botonCerrCuadroMensaje = cuadroMensaje.getElementsByTagName('button')[1];
                const textoTituCuadroMensaje = cuadroMensaje.getElementsByTagName('p')[0];
                const textoMensCuadroMensaje = cuadroMensaje.getElementsByTagName('p')[1];
                document.removeEventListener('keydown', administradorEventosTecladoPrincipal);
                document.addEventListener('keydown', administradorEventosTecladoCuadroMensaje);
                botonXsupCuadroMensaje.addEventListener('click', administradorEventoClickBotones);
                botonCerrCuadroMensaje.addEventListener('click', administradorEventoClickBotones);
                textoTituCuadroMensaje.addEventListener('mousedown', iniciarArrastre);
                cuadroMensaje.showModal();
                // podría ser cuadroMensaje.show(); si quisiera que no fuera modal
                textoTituCuadroMensaje.innerText = texto_titulo;
                textoMensCuadroMensaje.innerHTML = texto_mensaje;
                cuadroMensaje.style.width = ancho_cuadro + 'px';
                cuadroMensaje.style.height = alto_cuadro + 'px';
                botonCerrCuadroMensaje.focus();
                if(proximoDialogo != undefined)
                {
                    botonCerrCuadroMensaje.value = proximoDialogo;
                }
            }
            else
            {
                console.error('Error del servidor al obtener la estructura del cuadro de mensajes.<br />Estado: "' + respuestaServidor.status + '".');
            }
        }
        const cuadro_si_no = async (texto_titulo, texto_mensaje) =>
        {
            let respuestaServidor = null;
            try
            {
                respuestaServidor = await fetch
                (
                    'http://www.luislopez.com.ar:3000/api/cuadro_si_no',
                    {
                        method: 'GET'
                    }
                );
            }
            catch(error)
            {
                console.error('Error del servidor al obtener la estructura del cuadro de pregunta.<br />Mensaje: "' + error + '".');
            }
            if((respuestaServidor.status === 200) && respuestaServidor.ok)
            {
                const seccionDialogos = document.querySelector('html>body');
                const estructura = await respuestaServidor.text();
                seccionDialogos.insertAdjacentHTML('beforeend', estructura);
                const cuadroSiNo = document.getElementById('cuadroSiNo');
                let posXInicial = 0, posYInicial = 0;
                let posXActual = 0, posYActual = 0;
                const arrastrarDialogo = async (evento) =>
                {
                    evento.preventDefault();
                    posXInicial = posXActual - evento.clientX;
                    posYInicial = posYActual - evento.clientY;
                    posXActual = evento.clientX;
                    posYActual = evento.clientY;
                    cuadroSiNo.style.top = (cuadroSiNo.offsetTop - posYInicial) + "px";
                    cuadroSiNo.style.left = (cuadroSiNo.offsetLeft - posXInicial) + "px";
                    cuadroSiNo.style.margin = "0";
                }
                const detenerArrastre = async (evento) =>
                {
                    document.removeEventListener('mousemove', arrastrarDialogo);
                    document.removeEventListener('mouseup', detenerArrastre);
                }
                const iniciarArrastre = async (evento) =>
                {
                    evento.preventDefault();
                    posXActual = evento.clientX;
                    posYActual = evento.clientY;
                    document.addEventListener('mousemove', arrastrarDialogo);
                    document.addEventListener('mouseup', detenerArrastre);
                }
                const botonXsCuadroSiNo = cuadroSiNo.getElementsByTagName('button')[0];
                const botonSiCuadroSiNo = cuadroSiNo.getElementsByTagName('button')[1];
                const botonNoCuadroSiNo = cuadroSiNo.getElementsByTagName('button')[2];
                const textTitCuadroSiNo = cuadroSiNo.getElementsByTagName('p')[0];
                const textMenCuadroSiNo = cuadroSiNo.getElementsByTagName('p')[1];
                cuadroSiNo.showModal();
                textTitCuadroSiNo.innerHTML = texto_titulo;
                textMenCuadroSiNo.innerHTML = texto_mensaje;
                let contextoTextoTitulo = document.createElement('canvas').getContext('2d');
                contextoTextoTitulo.font = 'font-style: normal; font-variant: normal; font-weight: bold; font-stretch: normal; font-size: 26px;' +
                    ' font-family: Arial, sans-serif;';
                cuadroSiNo.style.width =
                    (Math.round(contextoTextoTitulo.measureText(document.querySelector('dialog#cuadroSiNo>form>header>p').innerText).width) + 238) + 'px';
                cuadroSiNo.style.height = '140px';
                botonSiCuadroSiNo.focus();
                botonXsCuadroSiNo.addEventListener('click', async (evento) =>
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                });
                botonSiCuadroSiNo.addEventListener('click', async (evento) =>
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 's', 'code': 'KeyS', 'altKey': true, 'bubbles': true}));
                });
                botonNoCuadroSiNo.addEventListener('click', async (evento) =>
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'n', 'code': 'KeyN', 'altKey': true, 'bubbles': true}));
                });
                const administradorEventosTecladoCuadroSiNo = async (evento) =>
                {
                    if (evento.altKey)
                    {
                        switch (evento.key)
                        {
                        case 'x':
                        case 'X':
                        case 'n':
                        case 'N':
                            evento.preventDefault();
                            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                            break;
                        case 's':
                        case 'S':
                            evento.preventDefault();
                            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
                        }
                    }
                    else
                    {
                        evento.preventDefault();
                        cuadroSiNo.close();
                        document.removeEventListener('keydown', administradorEventosTecladoCuadroSiNo);
                        document.addEventListener('keydown', administradorEventosTecladoPrincipal);
                        switch (evento.key)
                        {
                        case 'Escape':
                            if(infoCliente.perfil === 'administrador')
                            {
                                await cuadro_administrar();
                            }
                            break;
                        case 'Enter':
                            localStorage.removeItem('cliente_id');
                            document.querySelector('html>body>header>div>div.encabezado>div.botonera>button#carritoBtn>span').innerText = '0';
                            break;
                        }
                    }
                }
                document.removeEventListener('keydown', administradorEventosTecladoPrincipal);
                document.addEventListener('keydown', administradorEventosTecladoCuadroSiNo);
                textTitCuadroSiNo.addEventListener('mousedown', iniciarArrastre);
            }
            else
            {
                console.error('Error del servidor al obtener la estructura del cuadro de pregunta.<br />Estado: "' + respuestaServidor.status + '".');
            }
        }
        const cuadro_login = async () =>
        {
            let respuestaServidor = null;
            try
            {
                respuestaServidor = await fetch
                (
                    'http://www.luislopez.com.ar:3000/api/cuadro_login',
                    {
                        method: 'GET'
                    }
                );
            }
            catch(error)
            {
                console.error('Error del servidor al obtener la estructura del cuadro de login.<br />Mensaje: "' + error + '".');
            }
            if((respuestaServidor.status === 200) && respuestaServidor.ok)
            {
                const seccionDialogos = document.querySelector('html>body');
                const estructura = await respuestaServidor.text();
                seccionDialogos.insertAdjacentHTML('beforeend', estructura);
                const dialogoLogin = document.getElementById('login');
                let posXInicial = 0, posYInicial = 0;
                let posXActual = 0, posYActual = 0;
                const arrastrarDialogo = async (evento) =>
                {
                    evento.preventDefault();
                    posXInicial = posXActual - evento.clientX;
                    posYInicial = posYActual - evento.clientY;
                    posXActual = evento.clientX;
                    posYActual = evento.clientY;
                    dialogoLogin.style.top = (dialogoLogin.offsetTop - posYInicial) + "px";
                    dialogoLogin.style.left = (dialogoLogin.offsetLeft - posXInicial) + "px";
                    dialogoLogin.style.margin = "0";
                }
                const detenerArrastre = async (evento) =>
                {
                    document.removeEventListener('mousemove', arrastrarDialogo);
                    document.removeEventListener('mouseup', detenerArrastre);
                }
                const iniciarArrastre = async (evento) =>
                {
                    evento.preventDefault();
                    posXActual = evento.clientX;
                    posYActual = evento.clientY;
                    document.addEventListener('mousemove', arrastrarDialogo);
                    document.addEventListener('mouseup', detenerArrastre);
                }
                const botonXsupDialogoLogin = dialogoLogin.getElementsByTagName('button')[0];
                const botonCancDialogoLogin = dialogoLogin.getElementsByTagName('button')[1];
                const botonRecuDialogoLogin = dialogoLogin.getElementsByTagName('button')[2];
                const botonCreaDialogoLogin = dialogoLogin.getElementsByTagName('button')[3];
                const botonAcepDialogoLogin = dialogoLogin.getElementsByTagName('button')[4];
                const textoTituDialogoLogin = dialogoLogin.getElementsByTagName('p')[0];
                const inputUsuaDialogoLogin = dialogoLogin.getElementsByTagName('input')[0];
                const inputCntrDialogoLogin = dialogoLogin.getElementsByTagName('input')[1];
                dialogoLogin.showModal();
                inputUsuaDialogoLogin.value = '';
                inputCntrDialogoLogin.value = '';
                inputUsuaDialogoLogin.focus();
                botonXsupDialogoLogin.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                });
                botonCancDialogoLogin.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                });
                botonRecuDialogoLogin.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'r', 'code': 'KeyR', 'altKey': true, 'bubbles': true}));
                });
                botonCreaDialogoLogin.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'e', 'code': 'KeyE', 'altKey': true, 'bubbles': true}));
                });
                botonAcepDialogoLogin.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
                });
                const administradorEventosTecladoCuadroLogin = async (evento) =>
                {
                    const cerrarDialogoLogin = async () =>
                    {
                        dialogoLogin.close();
                        document.removeEventListener('keydown', administradorEventosTecladoCuadroLogin);
                        document.addEventListener('keydown', administradorEventosTecladoPrincipal);
                    }
                    if (evento.altKey)
                    {
                        switch (evento.key)
                        {
                        case 'x': // xlocrea
                        case 'X':
                        case 'c':
                        case 'C':
                            evento.preventDefault();
                            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                            break;
                        case 'l':
                        case 'L':
                            evento.preventDefault();
                            inputUsuaDialogoLogin.focus();
                            break;
                        case 'o':
                        case 'O':
                            evento.preventDefault();
                            inputCntrDialogoLogin.focus();
                            break;
                        case 'r':
                        case 'R':
                            evento.preventDefault();
                            await cerrarDialogoLogin();
                            await cuadro_mensaje('ToDo', 'Implementar la recuperación de credenciales.', 346, 140);
                            break;
                        case 'e':
                        case 'E':
                            evento.preventDefault();
                            await cerrarDialogoLogin();
                            await cuadro_alta_cliente();
                            break;
                        case 'a':
                        case 'A':
                            evento.preventDefault();
                            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
                        }
                    }
                    else
                    {
                        switch (evento.key)
                        {
                        case 'Escape':
                            evento.preventDefault();
                            await cerrarDialogoLogin();
                            break;
                        case 'Enter':
                            evento.preventDefault();
                            try
                            {
                                // curl -H "Content-Type: application/json" -X POST -d '{"usuario":"lsfrnndlpz","contrasena":"gmail.com"}' \
                                // http://www.luislopez.com.ar:3000/api/acceso
                                respuestaServidor = await fetch
                                (
                                    'http://www.luislopez.com.ar:3000/api/acceso',
                                    {
                                        method: 'POST',
                                        headers:
                                        {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({'usuario': inputUsuaDialogoLogin.value, 'contrasena': inputCntrDialogoLogin.value})
                                    }
                                );
                            }
                            catch (error)
                            {
                                await cuadro_mensaje('Error', 'El servidor no está activo o es inaccesible<br />' +
                                    'al consultar las credenciales del cliente.<br />' +
                                    'Por favor, contacte al soporte para levantar al servidor.', 320, 214);
                            }
                            await cerrarDialogoLogin();
                            if ((respuestaServidor.status == 200) && respuestaServidor.ok)
                            {
                                const jsonAceptacion = await respuestaServidor.json();
                                if (jsonAceptacion.exito == true)
                                {
                                    if((jsonAceptacion.id_categoria1 != 0) && (jsonAceptacion.id_categoria2 != 0))
                                    {
                                        infoCliente.id = jsonAceptacion.id;
                                        localStorage.setItem('cliente_id', infoCliente.id);
                                        infoCliente.nombre = jsonAceptacion.nombre;
                                        infoCliente.apellido = jsonAceptacion.apellido;
                                        infoCliente.telefono = jsonAceptacion.telefono;
                                        infoCliente.direccion = jsonAceptacion.direccion;
                                        infoCliente.email = jsonAceptacion.email;
                                        await cuadro_perfil(jsonAceptacion.id_categoria1, jsonAceptacion.nombre_categoria1,
                                            jsonAceptacion.id_categoria2, jsonAceptacion.nombre_categoria2);
                                    }
                                    else
                                    {
                                        // El usuario que accedió tiene un solo perfil, seguramente cliente,
                                        // dado que ser administrador sin ser cliente. no tendría sentido.
                                        switch (jsonAceptacion.nombre_categoria1)
                                        {
                                        case 'administrador':
                                            infoCliente.id = jsonAceptacion.id;
                                            localStorage.setItem('cliente_id', infoCliente.id);
                                            infoCliente.nombre = jsonAceptacion.nombre;
                                            infoCliente.apellido = jsonAceptacion.apellido;
                                            infoCliente.telefono = jsonAceptacion.telefono;
                                            infoCliente.direccion = jsonAceptacion.direccion;
                                            infoCliente.email = jsonAceptacion.email;
                                            infoCliente.perfil = 'administrador';
                                            localStorage.setItem('cliente_perfil', infoCliente.perfil);
                                            await cuadro_administrar();
                                            break;
                                        case 'cliente':
                                            infoCliente.id = jsonAceptacion.id;
                                            localStorage.setItem('cliente_id', infoCliente.id);
                                            infoCliente.nombre = jsonAceptacion.nombre;
                                            infoCliente.apellido = jsonAceptacion.apellido;
                                            infoCliente.telefono = jsonAceptacion.telefono;
                                            infoCliente.direccion = jsonAceptacion.direccion;
                                            infoCliente.email = jsonAceptacion.email;
                                            infoCliente.perfil = 'cliente';
                                            localStorage.setItem('cliente_perfil', infoCliente.perfil);
                                            break;
                                        default:
                                            // Nunca se debería poder acceder a este punto, si se accede, es porque se agregó
                                            // a la base de datos una nueva categoría y no se implementó en el código.
                                            localStorage.removeItem('cliente_id');
                                            await cuadro_mensaje('Error', 'Por favor, consulte con el administrador.', 340, 164);
                                        }
                                    }
                                }
                                else
                                {
                                    await cuadro_mensaje('Error', 'Las credenciales ingresadas son inválidas.<br />' +
                                        'Por favor, verifíquelas e intente nuevamente.', 340, 164);
                                    infoCliente.cliente_id = 0;
                                    localStorage.removeItem('cliente_id');
                                    infoCliente.perfil = '';
                                    localStorage.removeItem('cliente_perfil');
                                }
                            }
                            cantidad_articulos_carrito(infoCliente);
                        }
                    }
                }
                document.removeEventListener('keydown', administradorEventosTecladoPrincipal);
                document.addEventListener('keydown', administradorEventosTecladoCuadroLogin);
                textoTituDialogoLogin.addEventListener('mousedown', iniciarArrastre);
            }
            else
            {
                console.error('Error del servidor al obtener la estructura del cuadro de login.<br />Estado: "' + respuestaServidor.status + '".');
            }
        }
        const validarCadenaNumerica = async (texto) =>
        {
            // Expresión regular:
            // ^\d+    -> Debe iniciar con uno o más dígitos numéricos
            // (,\d+)* -> Puede tener un grupo de (coma seguida de números) repetido 0 o más veces
            // $       -> Fin de la cadena (asegura que termine en número y no en coma)
            const patron = /^\d+(,\d+)*$/;
            return patron.test(texto);
        }
        const cuadro_carrito = async () =>
        {
            let respuestaServidor = null;
            try
            {
                respuestaServidor = await fetch
                (
                    'http://www.luislopez.com.ar:3000/api/cuadro_carrito',
                    {
                        method: 'GET'
                    }
                );
            }
            catch(error)
            {
                console.error('Error del servidor al obtener la estructura del diálogo carrito.<br />Mensaje: "' + error + '".');
            }
            if((respuestaServidor.status === 200) && respuestaServidor.ok)
            {
                const seccionDialogos = document.querySelector('html>body');
                const estructura = await respuestaServidor.text();
                seccionDialogos.insertAdjacentHTML('beforeend', estructura);
                const carrito = document.getElementById('carrito');
                const botonXsupeCarrito = carrito.getElementsByTagName('button')[0];
                const botonCanceCarrito = carrito.getElementsByTagName('button')[1];
                const botonFinalCarrito = carrito.getElementsByTagName('button')[2];
                const botonAnulaCarrito = carrito.getElementsByTagName('button')[3];
                const botonQuitaCarrito = carrito.getElementsByTagName('button')[4];
                const botonModifCarrito = carrito.getElementsByTagName('button')[5];
                const botonPagarCarrito = carrito.getElementsByTagName('button')[6];
                const tagPrincipCarrito = carrito.getElementsByTagName('main')[0];
                const textoTitulCarrito = carrito.getElementsByTagName('p')[0];
                let posXInicial = 0, posYInicial = 0;
                let posXActual = 0, posYActual = 0;
                const arrastrarDialogo = async (evento) =>
                {
                    evento.preventDefault();
                    posXInicial = posXActual - evento.clientX;
                    posYInicial = posYActual - evento.clientY;
                    posXActual = evento.clientX;
                    posYActual = evento.clientY;
                    carrito.style.top = (carrito.offsetTop - posYInicial) + "px";
                    carrito.style.left = (carrito.offsetLeft - posXInicial) + "px";
                    carrito.style.margin = "0";
                }
                const detenerArrastre = async (evento) =>
                {
                    document.removeEventListener('mousemove', arrastrarDialogo);
                    document.removeEventListener('mouseup', detenerArrastre);
                }
                const iniciarArrastre = async (evento) =>
                {
                    evento.preventDefault();
                    posXActual = evento.clientX;
                    posYActual = evento.clientY;
                    document.addEventListener('mousemove', arrastrarDialogo);
                    document.addEventListener('mouseup', detenerArrastre);
                }
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
                    await cuadro_mensaje('Error', 'El servidor no responde el detalle de<br />' +
                        'artículos en tu carrito.<br />Dice: "' + error + '".', 320, 214);
                }
                carrito.showModal();
                const jsonArticulosEnCarrito = await respuestaServidor.json();
                const saltoDeLinea = String.fromCharCode(10);
                if(infoCliente.cantidadArticulosCarrito > 0)
                {
                    let tablaDeArticulosEnCarrito =
                        '          <p>Tenés ' + infoCliente.cantidadArticulosCarrito + ' productos en tu carrito.</p>' + saltoDeLinea +
                        '          <table id="tabla-datos">' + saltoDeLinea +
                        '            <thead>' + saltoDeLinea +
                        '              <tr>' + saltoDeLinea +
                        '                <th data-columna="0" data-tipo="numero">' + saltoDeLinea +
                        '                  <div class="th-contenedor">' + saltoDeLinea +
                        '                    <span class="th-titulo">Cantidad</span>' + saltoDeLinea +
                        '                    <input type="text" name="filtro-columna" class="filtro-columna" placeholder="Filtrar cantidad..." />' +
                        saltoDeLinea +
                        '                  </div>' + saltoDeLinea +
                        '                </th>' + saltoDeLinea +
                        '                <th data-columna="1" data-tipo="texto">' + saltoDeLinea +
                        '                  <div class="th-contenedor">' + saltoDeLinea +
                        '                    <span class="th-titulo">Artículo</span>' + saltoDeLinea +
                        '                    <input type="text" name="filtro-columna" class="filtro-columna" placeholder="Filtrar artículo..." />' +
                        saltoDeLinea +
                        '                  </div>' + saltoDeLinea +
                        '                </th>' + saltoDeLinea +
                        '                <th data-columna="2" data-tipo="numero">' + saltoDeLinea +
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
                                    `              <tr id="${enCarrito.id}" articulo_id="${enCarrito.articulo_id}" cliente_id="${enCarrito.cliente_id}">` +
                                    saltoDeLinea +
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
                        await cuadro_mensaje('Error', 'El servidor no devuelve la lista de productos.<br /> Respuesta: "' +
                            jsonArticulosEnCarrito.error + '".', 320, 214);
                    }
                    tablaDeArticulosEnCarrito +=
                        '            </tbody>' + saltoDeLinea +
                        '          </table>' + saltoDeLinea;
                    tagPrincipCarrito.innerHTML = tablaDeArticulosEnCarrito;
                    botonQuitaCarrito.disabled = true;
                    botonQuitaCarrito.value = 'quitar';
                    botonModifCarrito.disabled = true;
                    botonModifCarrito.value = 'modificar';
                    carrito.style.width = '770px';
                    alto = alto * 49 + 253;
                    carrito.style.height = alto.toString() + 'px';
                    const tagPrTitOrCarrito = document.getElementById('tabla-datos');
                    const tagPrTablaCarrito = document.querySelector('#tabla-datos thead');
                    const tagPrTaBodCarrito = document.querySelector('#tabla-datos tbody');
                    const tagPrInpFiCarrito = document.querySelector('#tabla-datos thead>tr>th>div.th-contenedor>input.filtro-columna');
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
                    tagPrTaBodCarrito.addEventListener('click', async (evento) =>
                    {
                        const filaSeleccionada = evento.target.closest('tr');
                        if (!filaSeleccionada)
                        {
                            return;
                        }
                        if((filaSeleccionada.style.color === 'black') || (filaSeleccionada.style.color === ''))
                        {
                            filaSeleccionada.style.backgroundColor = '#0ea5e9';
                            filaSeleccionada.style.color = 'white';
                        }
                        else
                        {
                            filaSeleccionada.style.backgroundColor = '';
                            filaSeleccionada.style.color = '';
                        }
                        let quitar = '';
                        let modificar = '';
                        for (const fila of document.querySelectorAll('table#tabla-datos>tbody>tr'))
                        {
                            if(fila.style.color === 'white')
                            {
                                if(quitar !== '')
                                {
                                    quitar += ',';
                                }
                                quitar += fila.attributes[0].textContent;
                                if(modificar === '')
                                {
                                    modificar = fila.attributes[0].textContent;
                                }
                                else
                                {
                                    modificar = '-';
                                }
                            }
                        }
                        if(quitar === '')
                        {
                            botonQuitaCarrito.disabled = true;
                            botonQuitaCarrito.value = 'quitar';
                        }
                        else
                        {
                            botonQuitaCarrito.removeAttribute('disabled');
                            botonQuitaCarrito.value = 'quitar(' + quitar + ')';
                        }
                        if((modificar === '') || (modificar === '-'))
                        {
                            botonModifCarrito.disabled = true;
                            botonModifCarrito.value = 'modificar';
                        }
                        else
                        {
                            botonModifCarrito.removeAttribute('disabled');
                            botonModifCarrito.value = 'modificar(' + modificar + ')';
                        }
                    });
                }
                else
                {
                    tagPrincipCarrito.innerHTML =
                        '          <p>Aún no pusiste productos en tu carrito.</p>' + saltoDeLinea;
                    tagPrincipCarrito.style.height = '50px';
                    botonCanceCarrito.style.left = '108px';
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
                    carrito.style.width = '332px';
                    carrito.style.height = '158px';
                }
                botonXsupeCarrito.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                });
                botonCanceCarrito.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                });
                botonFinalCarrito.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'f', 'code': 'KeyF', 'altKey': true, 'bubbles': true}));
                });
                botonAnulaCarrito.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'a', 'code': 'KeyA', 'altKey': true, 'bubbles': true}));
                });
                botonQuitaCarrito.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'q', 'code': 'KeyQ', 'altKey': true, 'bubbles': true}));
                });
                botonModifCarrito.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'm', 'code': 'KeyM', 'altKey': true, 'bubbles': true}));
                });
                botonPagarCarrito.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'p', 'code': 'KeyP', 'altKey': true, 'bubbles': true}));
                });
                carrito.addEventListener('input', async function(evento)
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
                const administradorEventosTecladoCuadroCarrito = async (evento) =>
                {
                    const cerrarDialogoCarrito = async () =>
                    {
                        carrito.close();
                        document.removeEventListener('keydown', administradorEventosTecladoCuadroCarrito);
                        document.addEventListener('keydown', administradorEventosTecladoPrincipal);
                    }
                    if (evento.altKey)
                    {
                        switch (evento.key)
                        {
                        case 'x':
                        case 'X':
                        case 'c':
                        case 'C':
                            evento.preventDefault();
                            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                            break;
                        case 'f':
                        case 'F':
                            evento.preventDefault();
                            // TODO: Llamar al servidor para finalizar la compra
                            cerrarDialogoCarrito();
                            await cuadro_mensaje('ToDo', 'Implementar que el cliente pueda finalizar la compra.', 398, 140);
                            break;
                        case 'a':
                        case 'A':
                            evento.preventDefault();
                            // TODO: Llamar al servidor para anular la compra
                            cerrarDialogoCarrito();
                            await cuadro_mensaje('ToDo', 'Implementar que el cliente pueda anular la compra.', 388, 142);
                            break;
                        case 'q':
                        case 'Q':
                            evento.preventDefault();
                            cerrarDialogoCarrito();
                            if(botonQuitaCarrito.value === 'quitar')
                            {
                                await cuadro_mensaje('Error', 'Debe seleccionar previamente uno o más<br />productos del carrito para quitarlos.', 320, 214);
                            }
                            else
                            {
                                if((botonQuitaCarrito.value.substring(0, 7) === 'quitar(') && (botonQuitaCarrito.value.slice(-1) === ')'))
                                {
                                    let quitar = botonQuitaCarrito.value.slice(7, -1).trim();
                                    if(await validarCadenaNumerica(quitar))
                                    {
                                        try
                                        {
                                            respuestaServidor = await fetch
                                            (
                                                'http://www.luislopez.com.ar:3000/api/quitar_artic_de_carrito',
                                                {
                                                    method: 'POST',
                                                    headers:
                                                    {
                                                        'Content-Type': 'text/plain; charset=utf-8'
                                                    },
                                                    body: quitar
                                                }
                                            );
                                        }
                                        catch (error)
                                        {
                                            await cuadro_mensaje('Error', 'Error al obtener la cantidad de artículos en el carrito.<br />Mensaje: "' + error + '".', 320, 214);
                                        }
                                        if((respuestaServidor.status === 200) && respuestaServidor.ok)
                                        {
                                            const jsonIdsEliminados = await respuestaServidor.json();
                                            if (jsonIdsEliminados.exito == true)
                                            {
                                                if(jsonIdsEliminados.recordset.length === 0)
                                                {
                                                    await cuadro_mensaje('Error', 'El servidor de base de datos no eliminó registros.<br />' +
                                                        'Mensaje: "Sin errores".', 320, 214);
                                                }
                                                else
                                                {
                                                    let idRegistrosNoEliminados = '';
                                                    let cantidadRegistrosNoEliminados = 0;
                                                    jsonIdsEliminados.recordset.forEach
                                                    (
                                                        identificadores =>
                                                        {
                                                            if(idRegistrosNoEliminados !== '')
                                                            {
                                                                idRegistrosNoEliminados += ',';
                                                            }
                                                            idRegistrosNoEliminados += `${identificadores.id}`;
                                                            cantidadRegistrosNoEliminados++;
                                                        }
                                                    );
                                                    await cantidad_articulos_carrito(infoCliente);
                                                    await cuadro_mensaje('Quitados del Carrito', cantidadRegistrosNoEliminados + ' productos (' +
                                                        idRegistrosNoEliminados + ').<br />Exitosamante.', 340, 214);
                                                }
                                            }
                                            else
                                            {
                                                await cuadro_mensaje('Error', 'El servidor de base de datos no indica acción finalizada correctamente.<br />' +
                                                    'Mensaje: "' + jsonIdsEliminados.error + '".', 320, 214);
                                            }
                                        }
                                    }
                                }
                                else
                                {
                                    await cuadro_mensaje('ToDo', 'No se recibe indicación esperada.<br />Quizás es necesario implementar la funcionalidad.', 320, 214);
                                }
                            }
                            break;
                        case 'm':
                        case 'M':
                            evento.preventDefault();
                            // TODO: Llamar al servidor para modificar la cantidad del artículo seleccionado
                            cerrarDialogoCarrito();
                            await cuadro_mensaje('ToDo', 'Implementar que se pueda modificar la cantidad<br />' +
                                'del producto seleccionado de la lista.', 366, 166);
                            break;
                        case 'p':
                        case 'P':
                            evento.preventDefault();
                            // TODO: Aquí se implementaría la funcionalidad de pagar la compra.
                            cerrarDialogoCarrito();
                            await cuadro_mensaje('ToDo', 'Implementar que se pueda pagar la compra.', 338, 138);
                            break;
                        }
                    }
                    else
                    {
                        if(evento.key === 'Escape')
                        {
                            evento.preventDefault();
                            cerrarDialogoCarrito();
                        }
                    }
                }
                document.removeEventListener('keydown', administradorEventosTecladoPrincipal);
                document.addEventListener('keydown', administradorEventosTecladoCuadroCarrito);
                textoTitulCarrito.addEventListener('mousedown', iniciarArrastre);
            }
            else
            {
                console.error('Error del servidor al obtener la estructura del diálogo carrito.<br />Estado: "' + respuestaServidor.status + '".');
            }
        }
        const cuadro_alta_cliente = async () =>
        {
            let respuestaServidor = null;
            try
            {
                respuestaServidor = await fetch
                (
                    'http://www.luislopez.com.ar:3000/api/cuadro_alta_cliente',
                    {
                        method: 'GET'
                    }
                );
            }
            catch(error)
            {
                console.error('Error del servidor al obtener la estructura del cuadro de login.<br />Mensaje: "' + error + '".');
            }
            if((respuestaServidor.status === 200) && respuestaServidor.ok)
            {
                const seccionDialogos = document.querySelector('html>body');
                const estructura = await respuestaServidor.text();
                seccionDialogos.insertAdjacentHTML('beforeend', estructura);
                const altaCliente = document.getElementById('altaCliente');
                let posXInicial = 0, posYInicial = 0;
                let posXActual = 0, posYActual = 0;
                const arrastrarDialogo = async (evento) =>
                {
                    evento.preventDefault();
                    posXInicial = posXActual - evento.clientX;
                    posYInicial = posYActual - evento.clientY;
                    posXActual = evento.clientX;
                    posYActual = evento.clientY;
                    altaCliente.style.top = (altaCliente.offsetTop - posYInicial) + "px";
                    altaCliente.style.left = (altaCliente.offsetLeft - posXInicial) + "px";
                    altaCliente.style.margin = "0";
                }
                const detenerArrastre = async (evento) =>
                {
                    document.removeEventListener('mousemove', arrastrarDialogo);
                    document.removeEventListener('mouseup', detenerArrastre);
                }
                const iniciarArrastre = async (evento) =>
                {
                    evento.preventDefault();
                    posXActual = evento.clientX;
                    posYActual = evento.clientY;
                    document.addEventListener('mousemove', arrastrarDialogo);
                    document.addEventListener('mouseup', detenerArrastre);
                }
                const botonXsupeAltaCliente = altaCliente.getElementsByTagName('button')[0];
                const botonCanceAltaCliente = altaCliente.getElementsByTagName('button')[1];
                const botonAceptAltaCliente = altaCliente.getElementsByTagName('button')[2];
                const textoTitulAltaCliente = altaCliente.getElementsByTagName('p')[0];
                const inputNombrAltaCliente = altaCliente.getElementsByTagName('input')[0];
                const inputApellAltaCliente = altaCliente.getElementsByTagName('input')[1];
                const inputTelefAltaCliente = altaCliente.getElementsByTagName('input')[2];
                const inputEmailAltaCliente = altaCliente.getElementsByTagName('input')[3];
                const inputUsuarAltaCliente = altaCliente.getElementsByTagName('input')[4];
                const inputContrAltaCliente = altaCliente.getElementsByTagName('input')[5];
                const inputDirecAltaCliente = altaCliente.getElementsByTagName('textarea')[0];
                altaCliente.showModal();
                inputNombrAltaCliente.value = '';
                inputApellAltaCliente.value = '';
                inputTelefAltaCliente.value = '';
                inputDirecAltaCliente.value = '';
                inputEmailAltaCliente.value = '';
                inputUsuarAltaCliente.value = '';
                inputContrAltaCliente.value = '';
                inputNombrAltaCliente.focus();
                botonXsupeAltaCliente.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                });
                botonCanceAltaCliente.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                });
                botonAceptAltaCliente.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
                });
                inputDirecAltaCliente.addEventListener('keydown', function(evento)
                {
                    if(evento.key === 'Enter')
                    {
                        event.stopPropagation();
                    }
                });
                const administradorEventosTecladoCuadroAltaCliente = async (evento) =>
                {
                    const cerrarAltaCliente = async () =>
                    {
                        altaCliente.close();
                        document.removeEventListener('keydown', administradorEventosTecladoCuadroAltaCliente);
                        document.addEventListener('keydown', administradorEventosTecladoPrincipal);
                    }
                    if (evento.altKey)
                    {
                        switch (evento.key)
                        {
                        case 'x': // xnptdourca
                        case 'X':
                        case 'c':
                        case 'C':
                            evento.preventDefault();
                            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                            break;
                        case 'n':
                        case 'N':
                            evento.preventDefault();
                            inputNombrAltaCliente.focus();
                            break;
                        case 'p':
                        case 'P':
                            evento.preventDefault();
                            inputApellAltaCliente.focus();
                            break;
                        case 't':
                        case 'T':
                            evento.preventDefault();
                            inputTelefAltaCliente.focus();
                            break;
                        case 'd':
                        case 'D':
                            evento.preventDefault();
                            inputDirecAltaCliente.focus();
                            break;
                        case 'o':
                        case 'O':
                            evento.preventDefault();
                            inputEmailAltaCliente.focus();
                            break;
                        case 'u':
                        case 'U':
                            evento.preventDefault();
                            inputUsuarAltaCliente.focus();
                            break;
                        case 'r':
                        case 'R':
                            evento.preventDefault();
                            inputContrAltaCliente.focus();
                            break;
                        case 'a':
                        case 'A':
                            evento.preventDefault();
                            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
                            break;
                        }
                    }
                    else
                    {
                        switch (evento.key)
                        {
                        case 'Escape':
                            evento.preventDefault();
                            cerrarAltaCliente();
                            break;
                        case 'Enter':
                            evento.preventDefault();
                            if(!inputNombrAltaCliente.value || !inputApellAltaCliente.value || !inputTelefAltaCliente.value || !inputDirecAltaCliente.value ||
                                !inputEmailAltaCliente.value || !inputUsuarAltaCliente.value || !inputContrAltaCliente.value)
                            {
                                await cuadro_mensaje('Recuerde', 'Los cuadros de texto que en su etiqueta, se visualiza un asterisco rojo (<span style="color: red;">*</span>),' +
                                    ' deben ser ingresados en forma obligatoria.', 320, 188, 'altaCliente');
                            }
                            else
                            {
                                try
                                {
                                    respuestaServidor = await fetch
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
                                }
                                catch (error)
                                {
                                    cerrarAltaCliente();
                                    await cuadro_mensaje('Error', 'Error al insertar el nuevo cliente en la base de datos.<br />Resultado: "' + error + '".', 320, 214);
                                }
                                const datos = await respuestaServidor.json();
                                if((respuestaServidor.status = 200) && (datos.exito))
                                {
                                    infoCliente.id = datos.nuevoIdCliente;
                                    infoCliente.nombre = inputNombrAltaCliente.value;
                                    infoCliente.apellido = inputApellAltaCliente.value;
                                    infoCliente.telefono = inputTelefAltaCliente.value;
                                    infoCliente.direccion = inputDirecAltaCliente.value;
                                    infoCliente.email = inputEmailAltaCliente.value;
                                    infoCliente.perfil = 'cliente';
                                    cerrarAltaCliente();
                                    // Se asume que datos.relacion fue correctamente guardado, porque datos.exito es verdadero
                                    localStorage.setItem('cliente_id', infoCliente.id);
                                    localStorage.setItem('cliente_perfil', infoCliente.perfil);
                                }
                                else
                                {
                                    cerrarAltaCliente();
                                    await cuadro_mensaje('Error', 'El servidor devuelve estado ' + parseInt(respuestaServidor.status) +
                                        ' al agregar el cliente nuevo. Mensaje: "' + datos.error + '".', 254, 216);
                                }
                            }
                            break;
                        }
                    }
                }
                document.removeEventListener('keydown', administradorEventosTecladoPrincipal);
                document.addEventListener('keydown', administradorEventosTecladoCuadroAltaCliente);
                textoTitulAltaCliente.addEventListener('mousedown', iniciarArrastre);
            }
            else
            {
                console.error('Error del servidor al obtener la estructura del cuadro de mensajes.<br />Estado: "' + respuestaServidor.status + '".');
            }
        }
        const cuadro_perfil = async (id1, perfil1, id2, perfil2) =>
        {
            let respuestaServidor = null;
            try
            {
                respuestaServidor = await fetch
                (
                    'http://www.luislopez.com.ar:3000/api/cuadro_perfil',
                    {
                        method: 'GET'
                    }
                );
            }
            catch(error)
            {
                console.error('Error del servidor al obtener la estructura del cuadro de login.<br />Mensaje: "' + error + '".');
            }
            if((respuestaServidor.status === 200) && respuestaServidor.ok)
            {
                const seccionDialogos = document.querySelector('html>body');
                const estructura = await respuestaServidor.text();
                seccionDialogos.insertAdjacentHTML('beforeend', estructura);
                const perfil = document.getElementById('perfil');
                let posXInicial = 0, posYInicial = 0;
                let posXActual = 0, posYActual = 0;
                const arrastrarDialogo = async (evento) =>
                {
                    evento.preventDefault();
                    posXInicial = posXActual - evento.clientX;
                    posYInicial = posYActual - evento.clientY;
                    posXActual = evento.clientX;
                    posYActual = evento.clientY;
                    perfil.style.top = (perfil.offsetTop - posYInicial) + "px";
                    perfil.style.left = (perfil.offsetLeft - posXInicial) + "px";
                    perfil.style.margin = "0";
                }
                const detenerArrastre = async (evento) =>
                {
                    document.removeEventListener('mousemove', arrastrarDialogo);
                    document.removeEventListener('mouseup', detenerArrastre);
                }
                const iniciarArrastre = async (evento) =>
                {
                    evento.preventDefault();
                    posXActual = evento.clientX;
                    posYActual = evento.clientY;
                    document.addEventListener('mousemove', arrastrarDialogo);
                    document.addEventListener('mouseup', detenerArrastre);
                }
                const botonXsupPerfil = perfil.getElementsByTagName('button')[0];
                const botonCancPerfil = perfil.getElementsByTagName('button')[1];
                const botonAcepPerfil = perfil.getElementsByTagName('button')[2];
                const comboPerfPerfil = perfil.getElementsByTagName('select')[0];
                const textoTituPerfil = perfil.getElementsByTagName('p')[0];
                perfil.showModal();
                comboPerfPerfil.insertAdjacentHTML('beforeend',
                    `<option value="${id1}">${perfil1}</option>`);
                comboPerfPerfil.insertAdjacentHTML('beforeend',
                    `<option value="${id2}">${perfil2}</option>`);
                botonXsupPerfil.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                });
                botonCancPerfil.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                });
                botonAcepPerfil.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
                });
                comboPerfPerfil.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'p', 'code': 'KeyP', 'altKey': true, 'bubbles': true}));
                });
                const administradorEventosTecladoCuadroPerfil = async (evento) =>
                {
                    const cerrarPerfil = async () =>
                    {
                        perfil.close();
                        document.removeEventListener('keydown', administradorEventosTecladoCuadroPerfil);
                        document.addEventListener('keydown', administradorEventosTecladoPrincipal);
                    }
                    if (evento.altKey)
                    {
                        switch (evento.key)
                        {
                        case 'x': // xpca
                        case 'X':
                        case 'c':
                        case 'C':
                            evento.preventDefault();
                            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                            break;
                        case 'p':
                        case 'P':
                            evento.preventDefault();
                            comboPerfPerfil.focus();
                            break;
                        case 'a':
                        case 'A':
                            evento.preventDefault();
                            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
                            break;
                        }
                    }
                    else
                    {
                        switch (evento.key)
                        {
                        case 'Escape':
                            evento.preventDefault();
                            cerrarPerfil();
                            break;
                        case 'Enter':
                            evento.preventDefault();
                            if (comboPerfPerfil.value)
                            {
                                infoCliente.perfil = comboPerfPerfil.options[comboPerfPerfil.selectedIndex].text;
                                localStorage.setItem('cliente_perfil', infoCliente.perfil);
                            }
                            cerrarPerfil();
                            if (infoCliente.perfil === 'administrador')
                            {
                                await cuadro_administrar();
                            }
                            break;
                        }
                    }
                }
                document.removeEventListener('keydown', administradorEventosTecladoPrincipal);
                document.addEventListener('keydown', administradorEventosTecladoCuadroPerfil);
                textoTituPerfil.addEventListener('mousedown', iniciarArrastre);
            }
            else
            {
                console.error('Error del servidor al obtener la estructura del cuadro de mensajes.<br />Estado: "' + respuestaServidor.status + '".');
            }
        }
        const cuadro_cantidad_producto = async (idArticuloElegidoPorCliente) =>
        {
            let respuestaServidor = null;
            try
            {
                respuestaServidor = await fetch
                (
                    'http://www.luislopez.com.ar:3000/api/cuadro_cantidad_producto',
                    {
                        method: 'GET'
                    }
                );
            }
            catch(error)
            {
                console.error('Error del servidor al obtener la estructura del cuadro de login.<br />Mensaje: "' + error + '".');
            }
            if((respuestaServidor.status === 200) && respuestaServidor.ok)
            {
                const seccionDialogos = document.querySelector('html>body');
                const estructura = await respuestaServidor.text();
                seccionDialogos.insertAdjacentHTML('beforeend', estructura);
                const cantProducto = document.getElementById('cantidadProducto');
                const botonXsupeCantProducto = cantProducto.getElementsByTagName('button')[0];
                const botonCanceCantProducto = cantProducto.getElementsByTagName('button')[1];
                const botonAceptCantProducto = cantProducto.getElementsByTagName('button')[2];
                //const inputCantiCantProducto = cantProducto.getElementsByTagName('input')[0];
                const textoTitulCantProducto = cantProducto.getElementsByTagName('p')[0];
                let posXInicial = 0, posYInicial = 0;
                let posXActual = 0, posYActual = 0;
                const arrastrarDialogo = async (evento) =>
                {
                    evento.preventDefault();
                    posXInicial = posXActual - evento.clientX;
                    posYInicial = posYActual - evento.clientY;
                    posXActual = evento.clientX;
                    posYActual = evento.clientY;
                    cantProducto.style.top = (cantProducto.offsetTop - posYInicial) + "px";
                    cantProducto.style.left = (cantProducto.offsetLeft - posXInicial) + "px";
                    cantProducto.style.margin = "0";
                }
                const detenerArrastre = async (evento) =>
                {
                    document.removeEventListener('mousemove', arrastrarDialogo);
                    document.removeEventListener('mouseup', detenerArrastre);
                }
                const iniciarArrastre = async (evento) =>
                {
                    evento.preventDefault();
                    posXActual = evento.clientX;
                    posYActual = evento.clientY;
                    document.addEventListener('mousemove', arrastrarDialogo);
                    document.addEventListener('mouseup', detenerArrastre);
                }
                cantProducto.showModal();
                botonAceptCantProducto.value = 'confirm(' + idArticuloElegidoPorCliente + ')';
                botonXsupeCantProducto.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                });
                botonCanceCantProducto.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                });
                botonAceptCantProducto.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
                });
                const administradorEventosTecladoCuadroCantidadProducto = async (evento) =>
                {
                    const cerrarCantidadProducto = async () =>
                    {
                        cantProducto.close();
                        document.removeEventListener('keydown', administradorEventosTecladoCuadroCantidadProducto);
                        document.addEventListener('keydown', administradorEventosTecladoPrincipal);
                    }
                    if (evento.altKey)
                    {
                        switch (evento.key)
                        {
                        case 'x':
                        case 'X':
                        case 'c':
                        case 'C':
                            evento.preventDefault();
                            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                            break;
                        case 'n':
                        case 'N':
                            evento.preventDefault();
                            inputCantiCantProducto.focus();
                            break;
                        case 'a':
                        case 'A':
                            evento.preventDefault();
                            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
                        }
                    }
                    else
                    {
                        switch (evento.key)
                        {
                        case 'Escape':
                            evento.preventDefault();
                            cerrarCantidadProducto();
                            break;
                        case 'Enter':
                            evento.preventDefault();
                            if((botonAceptCantProducto.value.substring(0, 8) === 'confirm(') && (botonAceptCantProducto.value.slice(-1) === ')'))
                            {
                                let confirmar = botonAceptCantProducto.value.slice(8, -1).trim();
                                if(await validarCadenaNumerica(confirmar))
                                {
                                    let idProductoPonerCarrito = parseInt(confirmar);
                                    let cantidadProductoPonerCarrito = parseFloat(inputCantiCantProducto.value) || 1;
                                    try
                                    {
                                        respuestaServidor = await fetch
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
                                        cerrarCantidadProducto();
                                    }
                                    catch (error)
                                    {
                                        cerrarCantidadProducto();
                                        await cuadro_mensaje('Error', 'El servidor no logra agregar el producto al carrito.', 374, 142);
                                    }
                                    const jsonCantidad = await respuestaServidor.json();
                                    if (respuestaServidor.status == 200)
                                    {
                                        if (jsonCantidad.exito == true)
                                        {
                                            document.querySelector('html>body>header>div>div.encabezado>div.botonera>button#carritoBtn>span').innerText = `${jsonCantidad.numero}`;
                                        }
                                    }
                                    else
                                    {
                                        // respuestaServidor.status es 500 u otro estado de error
                                        await cuadro_mensaje('Error', 'El servidor devuelve estado ' + parseInt(respuestaServidor.status) +
                                            ' al agregar el producto al carrito. Mensaje: "' + jsonCantidad.error + '".', 254, 216);
                                    }
                                }
                            }
                            break;
                        default:
                            evento.preventDefault();
                            // TODO: Preguntar al usuario ¿qué desea hacer? la tecla presionada no tiene funcionalidad definida.
                        }
                    }
                }
                document.removeEventListener('keydown', administradorEventosTecladoPrincipal);
                document.addEventListener('keydown', administradorEventosTecladoCuadroCantidadProducto);
                textoTitulCantProducto.addEventListener('mousedown', iniciarArrastre);
            }
            else
            {
                console.error('Error del servidor al obtener la estructura del cuadro de mensajes.<br />Estado: "' + respuestaServidor.status + '".');
            }
        }
        const cuadro_administrar = async () =>
        {
            let respuestaServidor = null;
            try
            {
                respuestaServidor = await fetch
                (
                    'http://www.luislopez.com.ar:3000/api/cuadro_administrar',
                    {
                        method: 'GET'
                    }
                );
            }
            catch(error)
            {
                console.error('Error del servidor al obtener la estructura del cuadro de login.<br />Mensaje: "' + error + '".');
            }
            if((respuestaServidor.status === 200) && respuestaServidor.ok)
            {
                const seccionDialogos = document.querySelector('html>body');
                const estructura = await respuestaServidor.text();
                seccionDialogos.insertAdjacentHTML('beforeend', estructura);
                const administrar = document.getElementById('administrar');
                let posXInicial = 0, posYInicial = 0;
                let posXActual = 0, posYActual = 0;
                const arrastrarDialogo = async (evento) =>
                {
                    evento.preventDefault();
                    posXInicial = posXActual - evento.clientX;
                    posYInicial = posYActual - evento.clientY;
                    posXActual = evento.clientX;
                    posYActual = evento.clientY;
                    administrar.style.top = (administrar.offsetTop - posYInicial) + "px";
                    administrar.style.left = (administrar.offsetLeft - posXInicial) + "px";
                    administrar.style.margin = "0";
                }
                const detenerArrastre = async (evento) =>
                {
                    document.removeEventListener('mousemove', arrastrarDialogo);
                    document.removeEventListener('mouseup', detenerArrastre);
                }
                const iniciarArrastre = async (evento) =>
                {
                    evento.preventDefault();
                    posXActual = evento.clientX;
                    posYActual = evento.clientY;
                    document.addEventListener('mousemove', arrastrarDialogo);
                    document.addEventListener('mouseup', detenerArrastre);
                }
                const botonXsupAdministrar = administrar.getElementsByTagName('button')[0];
                const botonProdAdministrar = administrar.getElementsByTagName('button')[1];
                const botonOferAdministrar = administrar.getElementsByTagName('button')[2];
                const botonUsuaAdministrar = administrar.getElementsByTagName('button')[3];
                const botonAgreAdministrar = administrar.getElementsByTagName('button')[4];
                const botonQuitAdministrar = administrar.getElementsByTagName('button')[5];
                const botonModiAdministrar = administrar.getElementsByTagName('button')[6];
                const botonCerrAdministrar = administrar.getElementsByTagName('button')[7];
                const textoTituAdministrar = administrar.getElementsByTagName('p')[0];
                const tablaArtiAdministrar = document.querySelector('html>body>dialog#administrar>form>main>div.tabs-content>div#productos>table#tabla-articulos>tbody');
                administrar.showModal();
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
                    await cuadro_mensaje('Error', 'El servidor no devuelve los productos<br />' +
                        'en forma paginada.<br />Respuesta: "' + error + '".', 320, 214);
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
                            await cuadro_mensaje('Error', 'El servidor no devuelve la lista de productos paginada.<br />Respuesta: "' +
                                jsonArticulosEnCarrito.error + '".', 320, 214);
                        }
                        tablaArtiAdministrar.innerHTML = articulosPaginados;
                        // const arePestPrAdministrar = administrar.getElementsByTagName('main>div.tabs-content>div#productos>table#tabla-articulos>tbody')[0];
                        // const arePestOfAdministrar = administrar.getElementsByTagName('main>div.tabs-content>div#ofertas>table#tabla-ofertas>tbody')[0];
                        // const arePestUsAdministrar = administrar.getElementsByTagName('main>div.tabs-content>div#usuarios>table#tabla-usuarios>tbody')[0];
                        // TODO: Completar aquí
                    }
                    else
                    {
                        arePestPrAdministrar.innerHTML =
                            '          <tr><td colspan="3" style="text-align: center;">Sin productos.</td></tr>' + saltoDeLinea;
                    }
                }
                else
                {
                    await cuadro_mensaje('Error', 'El servidor no devuelve los productos<br />' +
                        'en forma paginada. Estado: "' + respuestaServidor.status + '".', 320, 214);
                }
                // TODO: cargar las tablas de Oferta y Usuario
                botonXsupAdministrar.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                });
                botonProdAdministrar.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'p', 'code': 'KeyP', 'altKey': true, 'bubbles': true}));
                });
                botonOferAdministrar.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'o', 'code': 'KeyO', 'altKey': true, 'bubbles': true}));
                });
                botonUsuaAdministrar.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'u', 'code': 'KeyU', 'altKey': true, 'bubbles': true}));
                });
                botonAgreAdministrar.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'a', 'code': 'KeyA', 'altKey': true, 'bubbles': true}));
                });
                botonQuitAdministrar.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'q', 'code': 'KeyQ', 'altKey': true, 'bubbles': true}));
                });
                botonModiAdministrar.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'm', 'code': 'KeyM', 'altKey': true, 'bubbles': true}));
                });
                botonCerrAdministrar.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                });
                const administradorEventosTecladoCuadroAdministrar = async (evento) =>
                {
                    const carrarCuadroAdministrar = async () =>
                    {
                        administrar.close();
                        document.removeEventListener('keydown', administradorEventosTecladoCuadroAdministrar);
                        document.addEventListener('keydown', administradorEventosTecladoPrincipal);
                    }
                    if (evento.altKey)
                    {
                        switch (evento.key)
                        {
                        case 'x': // xpouaqmc
                        case 'X':
                        case 'c':
                        case 'C':
                            evento.preventDefault();
                            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                            break;
                        case 'p':
                        case 'P':
                            evento.preventDefault();
                            botonProdAdministrar.classList.add('active');
                            botonOferAdministrar.classList.remove('active');
                            botonUsuaAdministrar.classList.remove('active');
                            break;
                        case 'o':
                        case 'O':
                            evento.preventDefault();
                            botonProdAdministrar.classList.remove('active');
                            botonOferAdministrar.classList.add('active');
                            botonUsuaAdministrar.classList.remove('active');
                            break;
                        case 'u':
                        case 'U':
                            evento.preventDefault();
                            botonProdAdministrar.classList.remove('active');
                            botonOferAdministrar.classList.remove('active');
                            botonUsuaAdministrar.classList.add('active');
                            break;
                        case 'a':
                        case 'A':
                            evento.preventDefault();
                            if (botonProdAdministrar.classList.contains('active'))
                            {
                                carrarCuadroAdministrar();
                                altaArticulo.showModal();
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
                                    respuestaServidor = await fetch
                                    (
                                        'http://www.luislopez.com.ar:3000/api/lista_categ_art',
                                        {
                                            method: 'GET'
                                        }
                                    );
                                }
                                catch(error)
                                {
                                    await cuadro_mensaje('Error', 'El servidor no devuelve la lista de categorías solicitada.<br /> Respuesta: "' +
                                        error + '".', 320, 214);
                                }
                                if (respuestaServidor.status == 200)
                                {
                                    const categorias = await respuestaServidor.json();
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
                                    carrarCuadroAdministrar();
                                    altaOferta.showModal();
                                }
                            }
                            break;
                        case 'q':
                        case 'Q':
                            evento.preventDefault();
                            if (botonProdAdministrar.classList.contains('active'))
                            {
                                // TODO: Llamar al servidor para quitar un producto
                                carrarCuadroAdministrar();
                                bajaArticulo.showModal();
                            }
                            else
                            {
                                if (botonOferAdministrar.classList.contains('active'))
                                {
                                    // TODO: Llamar al servidor para quitar una oferta
                                    carrarCuadroAdministrar();
                                    bajaOferta.showModal();
                                }
                            }
                            break;
                        case 'm':
                        case 'M':
                            evento.preventDefault();
                            if (botonProdAdministrar.classList.contains('active'))
                            {
                                // TODO: Llamar al servidor para modificar un producto
                                carrarCuadroAdministrar();
                                modiArticulo.showModal();
                            }
                            else
                            {
                                if (botonOferAdministrar.classList.contains('active'))
                                {
                                    // TODO: Llamar al servidor para modificar una oferta
                                    carrarCuadroAdministrar();
                                    modiOferta.showModal();
                                }
                            }
                        }
                    }
                    else
                    {
                        if (evento.key === 'Escape')
                        {
                            evento.preventDefault();
                            carrarCuadroAdministrar();
                        }
                    }
                }
                document.removeEventListener('keydown', administradorEventosTecladoPrincipal);
                document.addEventListener('keydown', administradorEventosTecladoCuadroAdministrar);
                textoTituAdministrar.addEventListener('mousedown', iniciarArrastre);
            }
            else
            {
                console.error('Error del servidor al obtener la estructura del cuadro de mensajes.<br />Estado: "' + respuestaServidor.status + '".');
            }
        }
        const cuadro_alta_articulo = async () =>
        {
            let respuestaServidor = null;
            try
            {
                respuestaServidor = await fetch
                (
                    'http://www.luislopez.com.ar:3000/api/cuadro_alta_articulo',
                    {
                        method: 'GET'
                    }
                );
            }
            catch(error)
            {
                console.error('Error del servidor al obtener la estructura del cuadro de login.<br />Mensaje: "' + error + '".');
            }
            if((respuestaServidor.status === 200) && respuestaServidor.ok)
            {
                const seccionDialogos = document.querySelector('html>body');
                const estructura = await respuestaServidor.text();
                seccionDialogos.insertAdjacentHTML('beforeend', estructura);
                const altaArticulo = document.getElementById('altaArticulo');
                let posXInicial = 0, posYInicial = 0;
                let posXActual = 0, posYActual = 0;
                const arrastrarDialogo = async (evento) =>
                {
                    evento.preventDefault();
                    posXInicial = posXActual - evento.clientX;
                    posYInicial = posYActual - evento.clientY;
                    posXActual = evento.clientX;
                    posYActual = evento.clientY;
                    altaArticulo.style.top = (altaArticulo.offsetTop - posYInicial) + "px";
                    altaArticulo.style.left = (altaArticulo.offsetLeft - posXInicial) + "px";
                    altaArticulo.style.margin = "0";
                }
                const detenerArrastre = async (evento) =>
                {
                    document.removeEventListener('mousemove', arrastrarDialogo);
                    document.removeEventListener('mouseup', detenerArrastre);
                }
                const iniciarArrastre = async (evento) =>
                {
                    evento.preventDefault();
                    posXActual = evento.clientX;
                    posYActual = evento.clientY;
                    document.addEventListener('mousemove', arrastrarDialogo);
                    document.addEventListener('mouseup', detenerArrastre);
                }
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
                const textoTituAltaArticulo = altaArticulo.getElementsByTagName('p')[0];
                altaArticulo.showModal();
                botonXsupAltaArticulo.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                });
                botonCancAltaArticulo.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                });
                botonAcepAltaArticulo.addEventListener('click', async function(evento)
                {
                    evento.preventDefault();
                    document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Enter'}));
                });
                // Ocultar el cuadro de lista del cuadro combinado, al hacer click en el cuadro de texto
                inputFechAltaArticulo.addEventListener('click', async function()
                {
                    comboListAltaArticulo.classList.toggle('hidden');
                });
                calendariAltaArticulo.addEventListener('click', async function(evento)
                {
                    if (evento.target.classList.contains('dia-click'))
                    {
                        // Desmarcar el anterior
                        const anterior = calendariAltaArticulo.querySelector('.seleccionado');
                        if (anterior)
                        {
                            anterior.classList.remove('seleccionado');
                        }
                        // Marcar el nuevo
                        evento.target.classList.add('seleccionado');
                        const fechaActual = new Date();
                        const mesAct = fechaActual.getMonth();
                        // Nombres de los meses para el título
                        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
                        // Actualizar el valor visual del cuadro combinado y cerrar la lista
                        const diaSeleccionado = evento.target.dataset.dia;
                        inputFechAltaArticulo.textContent = `${diaSeleccionado} de ${meses[mesAct]}`;
                        comboListAltaArticulo.classList.add('hidden');
                    }
                });
                const administradorEventosTecladoCuadroAltaArticulo = async (evento) =>
                {
                    const cerrarDialogoAltaArticulo = async () =>
                    {
                        altaArticulo.close();
                        document.removeEventListener('keydown', administradorEventosTecladoCuadroAltaArticulo);
                        document.addEventListener('keydown', administradorEventosTecladoPrincipal);
                    }
                    if (evento.altKey)
                    {
                        switch (evento.key)
                        {
                        case 'x': // xfnptodica
                        case 'X':
                        case 'c':
                        case 'C':
                            evento.preventDefault();
                            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'Escape'}));
                            break;
                        case 'a':
                        case 'A':
                            evento.preventDefault();
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
                        switch (evento.key)
                        {
                        case 'Escape':
                            evento.preventDefault();
                            cerrarDialogoAltaArticulo();
                            break;
                        case 'Enter':
                            evento.preventDefault();
                            cerrarDialogoAltaArticulo();
                            break;
                        }
                    }
                }
                document.removeEventListener('keydown', administradorEventosTecladoPrincipal);
                document.addEventListener('keydown', administradorEventosTecladoCuadroAltaArticulo);
                textoTituAltaArticulo.addEventListener('mousedown', iniciarArrastre);
            }
            else
            {
                console.error('Error del servidor al obtener la estructura del cuadro de mensajes.<br />Estado: "' + respuestaServidor.status + '".');
            }
        }
        const cantidad_articulos_carrito = async (info) =>
        {
            let respuestaServidor = await fetch
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
            info.cantidadArticulosCarrito = NaN;
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
        if(localStorage.getItem('cliente_id') === null)
        {
            infoCliente.id = 0;
            infoCliente.perfil =  null;
            localStorage.removeItem('cliente_perfil');
        }
        else
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
            await cuadro_mensaje('Error', 'No se pudo calcular la huella digital.<br />Respuesta: "' + error + '".', 320, 214);
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
        }
        catch (error)
        {
            await cuadro_mensaje('Error', 'El servidor no está activo o es inaccesible<br />al consultar la información del cliente.<br />' +
                'Por favor, contacte al soporte para levantar al servidor.', 320, 214);
        }
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
                if((infoCliente.perfil !== 'cliente') && (infoCliente.perfil !== 'administrador'))
                {
                    infoCliente.perfil =  'cliente';
                    localStorage.setItem('cliente_perfil', infoCliente.perfil);
                }
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
            await cuadro_mensaje('Error', 'Error del servidor al obtener las ofertas activas.<br />Mensaje: "' + error + '".', 320, 214);
        }
        if((respuestaServidor.status === 200) && respuestaServidor.ok)
        {
            const articulos = await respuestaServidor.json();
            const seccionProductos = document.querySelector('html>body>main>section.productos');
            if(articulos.exito)
            {
                if(articulos.recordset.length > 0)
                {
                    seccionProductos.insertAdjacentHTML('beforeend', '        <h2>Ofertas del Día</h2>');
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
                    seccionProductos.insertAdjacentHTML('beforeend', '        <h2>No hay ofertas activas el día de hoy.</h2>');
                }
            }
            else
            {
                await cuadro_mensaje('Error', 'El servidor no devuelve ofertas activas.<br /> Respuesta: "' + articulos.error + '".', 320, 214);
            }
        }
        else
        {
            await cuadro_mensaje('Error', 'El servidor no responde las ofertas activas.', 192, 166);
        }
        const administradorEventosTecladoPrincipal = async (evento) =>
        {
            if ((evento.ctrlKey && evento.altKey && evento.shiftKey && evento.key === 'A') || (evento.key === 'a') || (evento.key === 'A'))
            {
                evento.preventDefault();
                if((localStorage.getItem('cliente_id') === null) || !infoCliente.apellido)
                {
                    await cuadro_login();
                }
                else
                {
                    await cuadro_si_no(infoCliente.apellido + ',&nbsp;' + infoCliente.nombre + '&nbsp;&nbsp;&nbsp;', '¿Desea finalizar la sesión?');
                }
            }
            else
            {
                if ((evento.ctrlKey && evento.altKey && evento.shiftKey && evento.key === 'C') || (evento.key === 'c') || (evento.key === 'C'))
                {
                    evento.preventDefault();
                    await cuadro_carrito();
                }
            }
        }
        document.addEventListener('keydown', administradorEventosTecladoPrincipal);
        const botonesConIdNumerico = Array.from(document.querySelectorAll('button[id]')).filter(elemento => {return /\d+/.test(elemento.id);});
        botonesConIdNumerico.forEach(boton =>
        {
            boton.addEventListener('click', async function(evento)
            {
                evento.preventDefault();
                if (infoCliente.id === null)
                {
                    infoCliente.id = localStorage.getItem('cliente_id');
                    if (infoCliente.id === null)
                    {
                        cuadro_login();
                    }
                }
                else
                {
                    cuadro_cantidad_producto(evento.currentTarget.id);
                }
            });
        });
        document.getElementById('administrarBtn').addEventListener('click', async (evento) =>
        {
            evento.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'a'}));
        });
        document.getElementById('carritoBtn').addEventListener('click', async (evento) =>
        {
            evento.preventDefault();
            document.dispatchEvent(new KeyboardEvent('keydown', {'key': 'c'}));
        });
    }
);