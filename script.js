window.onload = function() {
    // Inicializar EmailJS
    emailjs.init("YuhNLEEbOV1b_o_7q");

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
}

// Función para enviar la confirmación de asistencia usando EmailJS
function enviarConfirmacion(invitados) {
    const invitadosString = invitados.join(', ');
    const message = `${invitadosString} confirmaron asistencia`;

    const templateParams = {
        invitados: invitadosString,
        message: message
    };

    console.log('Enviando confirmación con los siguientes parámetros:', templateParams);

    emailjs.send('service_8sgi4l7', 'template_nk52r3a', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert('Confirmación enviada exitosamente.');
        }, function(error) {
            console.log('FAILED...', error);
            alert('Error al enviar la confirmación.');
        });
}