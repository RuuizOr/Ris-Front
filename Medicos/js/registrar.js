// Función para registrar un usuario
async function registrarUsuario(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // URL de la API
    const url = 'http://localhost:8080/medicos/save';

    // Obtener los datos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const especialidad = document.getElementById('especialidad').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const contraseña = document.getElementById('contraseña').value.trim();

    // Crear el objeto de usuario
    const usuario = {
        nombre: nombre,
        apellido: apellidos,
        especialidade: especialidad,
        correo: correo,
        contrasena: contraseña,
        status: true
    };

    try {
        // Realizar la solicitud POST
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',       // Aceptar respuesta en formato JSON
                'Content-Type': 'application/json'  // Enviar datos en formato JSON
            },
            body: JSON.stringify(usuario)          // Convertir el objeto a JSON
        });

        // Verificar si la respuesta es exitosa
        if (response.ok) {
            const data = await response.json(); // Si hay respuesta JSON, procesarla
            console.log('Usuario registrado exitosamente:', data);
            mostrarAlerta('Usuario registrado exitosamente.', 'success');

            // Opcional: cerrar el modal y limpiar el formulario
            $('#registrarMedico').modal('hide');
            document.getElementById('formRegistrarMedico').reset();

            // Opcional: actualizar la lista de usuarios
            obtenerUsuarios();
        } else {
            // Intentar parsear la respuesta del error
            const errorData = await response.json();
            console.error('Error al registrar el usuario:', errorData);
            mostrarAlerta('Error al registrar el usuario: ' + (errorData.message || 'Verifique los datos ingresados'), 'error');
        }
    } catch (error) {
        console.error('Hubo un problema con la solicitud:', error);
        mostrarAlerta('Ocurrió un error al intentar registrar el usuario.', 'error');
    }
}

// Agregar un evento al formulario para ejecutar la función de registro
document.getElementById('formRegistrarMedico').addEventListener('submit', registrarUsuario);
