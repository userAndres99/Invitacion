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

    // Generar el enlace mailto
    const confirmarAsistenciaElement = document.getElementById('confirmar-asistencia');
    const subject = 'Confirmación';
    const body = `Las Personas: ${invitados.join(', ')} confirmaron asistencia`;
    const mailtoLink = `mailto:example@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    confirmarAsistenciaElement.href = mailtoLink;
}

// Generar la invitación al cargar la página
window.onload = generarInvitacion;