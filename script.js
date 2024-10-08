window.onload = function() {
    // Ocultar el preloader
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';

    // Generar la invitación después de que la página ha cargado
    generarInvitacion();
};

// Función para obtener los parámetros de la URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const invitados = params.get('invitados');
    return invitados ? invitados.split(',') : [];
}

// Función para generar la invitación
function generarInvitacion() {
    const invitados = getQueryParams();
    const invitadosElement = document.getElementById('invitados');
    if (invitados.length > 0) {
        invitadosElement.innerHTML = invitados.join('<br>');
    } else {
        invitadosElement.innerHTML = 'No hay invitados especificados.';
    }

    // Configurar el evento de clic para el botón de confirmar asistencia
    const confirmarAsistenciaElement = document.getElementById('confirmar-asistencia');
    confirmarAsistenciaElement.addEventListener('click', function(event) {
        event.preventDefault();
        enviarConfirmacion(invitados);
    });

    // Configurar el evento de clic para el botón de ubicación
    const ubicacionElement = document.getElementById('ubicacion');
    ubicacionElement.addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = 'https://maps.app.goo.gl/r8r8NZy1CeUkt8iV7?g_st=iw';
    });
}

// Función para enviar la confirmación de asistencia usando EmailJS
function enviarConfirmacion(invitados) {
    const invitadosString = invitados.join(', ');
    const message = `${invitadosString} confirmaron asistencia`;

    // Verificar si ya se ha confirmado la asistencia
    if (localStorage.getItem(invitadosString)) {
        mostrarMensaje('Ya has confirmado asistencia anteriormente.');
        return;
    }

    const templateParams = {
        invitados: invitadosString,
        message: message
    };

    console.log('Enviando confirmación con los siguientes parámetros:', templateParams);

    emailjs.send('service_8sgi4l7', 'template_nk52r3a', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            localStorage.setItem(invitadosString, true); // Guardar confirmación en localStorage
            mostrarMensaje('Has confirmado asistencia. ¡Muchas gracias!');
        }, function(error) {
            console.error('FAILED...', error);
            alert('Error al enviar la confirmación: ' + JSON.stringify(error));
        });
}

// Función para mostrar el mensaje de confirmación en un iframe
function mostrarMensaje(mensaje) {
    const iframe = document.getElementById('mensaje-iframe');
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(`
        <style>
            body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                margin: 0;
                font-family: Arial, sans-serif;
                color: #5f2010;
                background-color: #f7f6ed;
                text-align: center;
            }
        </style>
        <body>${mensaje}</body>
    `);
    iframe.contentWindow.document.close();

    iframe.style.display = 'block';
    iframe.classList.add('show');

    // Ocultar el iframe después de 3 segundos
    setTimeout(() => {
        iframe.classList.remove('show');
        setTimeout(() => {
            iframe.style.display = 'none';
        }, 300);
    }, 3000);
}
