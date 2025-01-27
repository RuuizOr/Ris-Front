$(document).ready(function () {
    // Configurar el modal al abrirse
    $('#modificarPaciente').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget); // Botón que activó el modal

        // Capturar los datos del botón
        const id = button.data('id') || '';
        const nombre = button.data('nombre') || '';
        const apellidos = button.data('apellidos') || '';
        const telefono = button.data('telefono') || '';

        // Asignar los valores a los campos del formulario
        $('#idMod').val(id);
        $('#nombreMod').val(nombre);
        $('#apellidosMod').val(apellidos);
        $('#telefonoMod').val(telefono);
    });

    // Función para actualizar el paciente
    async function actualizarPaciente(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        const token = localStorage.getItem('jwt');
        if (!token) {
            mostrarToast('No se encontró el token. Por favor, inicie sesión.', 'error'); // Error en rojo
            return;
        }

        const url = 'http://localhost:8080/paciente/update';

        // Capturar los valores del formulario
        const idPaciente = $('#idMod').val().trim();
        const nombrePaciente = $('#nombreMod').val().trim();
        const apellidosPaciente = $('#apellidosMod').val().trim();
        const telefonoPaciente = $('#telefonoMod').val().trim();

        // Crear el objeto con los datos del paciente
        const paciente = {
            id: idPaciente,
            nombre: nombrePaciente,
            apellidos: apellidosPaciente,
            telefono: telefonoPaciente
        };

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(paciente)
            });

            if (response.ok) {
                const data = await response.json();
                mostrarToast('Paciente actualizado exitosamente.', 'success');
                $('#modificarPaciente').modal('hide');
                $('#formModificarPaciente')[0].reset();
                obtenerPacientes(); // Actualizar la lista de pacientes
            } else {
                const errorData = await response.json();
                mostrarToast('Error al actualizar el paciente: ' + (errorData.message || 'Verifique los datos ingresados'), 'error');
            }
        } catch (error) {
            mostrarToast('Ocurrió un error al intentar actualizar el paciente.', 'error');
        }
    }

    // Agregar el evento al formulario
    $('#formModificarPaciente').on('submit', actualizarPaciente);

    // Función para mostrar el mensaje tipo toast
    function mostrarToast(mensaje, tipo = 'success') {
        const alertaDiv = $('<div>').addClass('alerta').css('backgroundColor', tipo === 'success' ? '#092e95' : '#f44336');
        const textoDiv = $('<div>').addClass('texto').text(mensaje);
        const btnCerrar = $('<button>').addClass('btn-cerrar').html('&times;').on('click', function () {
            alertaDiv.removeClass('mostrar').addClass('ocultar');
            setTimeout(() => alertaDiv.remove(), 500);
        });
        const iconoDiv = $('<div>').addClass('icono').html('&#x1f3e5;').css('color', tipo === 'success' ? '#092e95' : '#f44336');

        alertaDiv.append(iconoDiv, textoDiv, btnCerrar);
        $('body').append(alertaDiv);

        setTimeout(() => alertaDiv.addClass('mostrar'), 10);
        setTimeout(() => {
            alertaDiv.removeClass('mostrar').addClass('ocultar');
            setTimeout(() => alertaDiv.remove(), 500);
        }, 3000);
    }
});
