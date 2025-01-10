$(document).ready(function () {
    $('#modificarAgenda').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget);

        const id = button.data('id') || '';
        const dia = button.data('dia') || '';
        const hora = button.data('hora') || '';
        const ubicacion = button.data('ubicacion') || '';
        const motivo = button.data('motivo') || '';
        const status = button.data('status') || false;

        $('#idAgenda').val(id);
        $('#diaAgenda').val(dia);
        $('#horaAgenda').val(hora);
        $('#ubicacionAgenda').val(ubicacion);
        $('#motivoAgenda').val(motivo);
        $('#statusAgenda').prop('checked', status);
    });

    async function actualizarAgenda(event) {
        event.preventDefault();

        const token = localStorage.getItem('jwt');
        if (!token) {
            mostrarToast('No se encontró el token. Por favor, inicie sesión.', 'error');
            return;
        }

        const url = 'http://localhost:8080/agenda/update';

        const idAgenda = $('#idAgenda').val().trim();
        const diaAgenda = $('#diaAgenda').val().trim();
        const horaAgenda = $('#horaAgenda').val().trim();
        const ubicacionAgenda = $('#ubicacionAgenda').val().trim();
        const motivoAgenda = $('#motivoAgenda').val().trim();
        const statusAgenda = $('#statusAgenda').is(':checked');

        const agenda = {
            id: idAgenda,
            dia: diaAgenda,
            hora: horaAgenda,
            ubicacion: ubicacionAgenda,
            motivo: motivoAgenda,
            status: statusAgenda
        };

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(agenda)
            });

            if (response.ok) {
                const data = await response.json();
                mostrarToast('Agenda actualizada exitosamente.', 'success');
                $('#modificarAgenda').modal('hide');
                $('#formModificarAgenda')[0].reset();
                obtenerAgendas();
            } else {
                const errorData = await response.json();
                mostrarToast('Error al actualizar la agenda: ' + (errorData.message || 'Verifique los datos ingresados'), 'error');
            }
        } catch (error) {
            mostrarToast('Ocurrió un error al intentar actualizar la agenda.', 'error');
        }
    }

    $('#formModificarAgenda').on('submit', actualizarAgenda);

    function mostrarToast(mensaje, tipo = 'success') {
        const alertaDiv = $('<div>').addClass('alerta').css('backgroundColor', tipo === 'success' ? '#092e95' : '#f44336');
        const textoDiv = $('<div>').addClass('texto').text(mensaje);
        const btnCerrar = $('<button>').addClass('btn-cerrar').html('&times;').on('click', function () {
            alertaDiv.removeClass('mostrar').addClass('ocultar');
            setTimeout(() => alertaDiv.remove(), 500);
        });
        const iconoDiv = $('<div>').addClass('icono').html('&#x1f4c5;').css('color', tipo === 'success' ? '#092e95' : '#f44336');

        alertaDiv.append(iconoDiv, textoDiv, btnCerrar);
        $('body').append(alertaDiv);

        setTimeout(() => alertaDiv.addClass('mostrar'), 10);
        setTimeout(() => {
            alertaDiv.removeClass('mostrar').addClass('ocultar');
            setTimeout(() => alertaDiv.remove(), 500);
        }, 3000);
    }
});
