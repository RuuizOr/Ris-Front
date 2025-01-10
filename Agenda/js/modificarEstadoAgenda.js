$(document).ready(function () {
    const formModificarEstado = $('#formModificarEstadoAgenda');
    const modalModificarEstado = $('#modificarEstadoAgenda');

    // Mostrar modal y asignar datos
    $(document).on('click', '.btn-success, .btn-danger', function () {
        const button = $(this);
        const id = button.data('id'); // Obtener ID del botón
        const estadoActual = button.data('estado') === true; // Convertir a booleano
        const nuevoEstado = !estadoActual; // Invertir el estado actual

        $('#idAgenda').val(id); // Asignar el ID al campo oculto
        $('#estadoAgenda').val(nuevoEstado); // Asignar el nuevo estado

        modalModificarEstado.modal('show'); // Mostrar el modal
    });

    // Manejar la solicitud de cambio de estado
    formModificarEstado.on('submit', async function (event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        const token = localStorage.getItem('jwt');
        if (!token) {
            mostrarToast('No se encontró el token. Por favor, inicie sesión.', 'error');
            return;
        }

        const url = 'http://localhost:8080/agenda/change-status'; // URL del endpoint
        const idAgenda = $('#idAgenda').val(); // ID del elemento agenda
        const nuevoEstado = $('#estadoAgenda').val() === 'true'; // Convertir a booleano

        const payload = { id: idAgenda, status: nuevoEstado }; // Crear el payload para el PUT

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload), // Enviar los datos en formato JSON
            });

            if (response.ok) {
                mostrarToast('Estado de la agenda actualizado correctamente.', 'success');
                modalModificarEstado.modal('hide'); // Ocultar el modal
                limpiarModal();
                obtenerAgendas(); // Actualizar la lista de agendas
            } else {
                const errorData = await response.json();
                mostrarToast('Error al cambiar el estado: ' + (errorData.message || 'Intenta nuevamente.'), 'error');
            }
        } catch (error) {
            console.error('Error al intentar cambiar el estado:', error);
            mostrarToast('Ocurrió un error al intentar cambiar el estado.', 'error');
        }
    });

    // Función para limpiar modal
    function limpiarModal() {
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
    }

    // Función para mostrar mensaje tipo toast
    function mostrarToast(mensaje, tipo = 'success') {
        const alertaDiv = $('<div>').addClass('alerta').css('backgroundColor', tipo === 'success' ? '#4caf50' : '#f44336');
        const textoDiv = $('<div>').addClass('texto').text(mensaje);
        const btnCerrar = $('<button>').addClass('btn-cerrar').html('&times;').on('click', function () {
            alertaDiv.removeClass('mostrar').addClass('ocultar');
            setTimeout(() => alertaDiv.remove(), 500);
        });
        const iconoDiv = $('<div>').addClass('icono').html('&#x1f5d3;').css('color', tipo === 'success' ? '#4caf50' : '#f44336');

        alertaDiv.append(iconoDiv, textoDiv, btnCerrar);
        $('body').append(alertaDiv);

        setTimeout(() => alertaDiv.addClass('mostrar'), 10);
        setTimeout(() => {
            alertaDiv.removeClass('mostrar').addClass('ocultar');
            setTimeout(() => alertaDiv.remove(), 500);
        }, 3000);
    }

    
});
