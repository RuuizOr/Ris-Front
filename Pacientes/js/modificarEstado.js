const token6 = localStorage.getItem('jwt')
$(document).ready(function () {
    const formModificarEstado = $('#formModificarEstadoPaciente');
    const modalModificarEstado = $('#modificarEstadoPaciente');

    // Mostrar modal y asignar datos
    $(document).on('click', '.btn-success, .btn-danger', function () {
        const button = $(this);
        const id = button.data('id');
        const estadoActual = button.data('estado') === true;
        const nuevoEstado = !estadoActual;

        $('#idCategoria').val(id);
        $('#estadoCategoria').val(nuevoEstado);

        modalModificarEstado.modal('show');
    });

    // Manejar la solicitud de cambio de estado
    formModificarEstado.on('submit', async function (event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        const token = localStorage.getItem('jwt');
        if (!token) {
            mostrarToast('No se encontró el token. Por favor, inicie sesión.', 'error');
            return;
        }

        const url = 'http://localhost:8080/paciente/change-status';
        const idPaciente = $('#idCategoria').val();
        const nuevoEstado = $('#estadoCategoria').val() === 'true';

        const payload = { id: idPaciente, status: nuevoEstado };

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                mostrarToast('Estado actualizado correctamente.', 'success');
                modalModificarEstado.modal('hide');
                limpiarModal();
                obtenerPacientes(); // Actualiza la lista de pacientes
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
        const iconoDiv = $('<div>').addClass('icono').html('&#x1f3e5;').css('color', tipo === 'success' ? '#4caf50' : '#f44336');

        alertaDiv.append(iconoDiv, textoDiv, btnCerrar);
        $('body').append(alertaDiv);

        setTimeout(() => alertaDiv.addClass('mostrar'), 10);
        setTimeout(() => {
            alertaDiv.removeClass('mostrar').addClass('ocultar');
            setTimeout(() => alertaDiv.remove(), 500);
        }, 3000);
    }
});
