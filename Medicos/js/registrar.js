const token2 = localStorage.getItem('jwt');
console.log(token2);

if (!token2) {
    console.log("No se encontró el token en el localStorage");
    alert("No se encontró el token");
}

async function registrarUsuario(event) {
    event.preventDefault();

    // URL de la API
    const url = 'http://localhost:8080/medicos/save';

    // Obtener los datos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const especialidad = document.getElementById('especialidad').value.trim();

    // Crear el objeto de usuario
    const usuario = {
        nombre: nombre,
        apellido: apellidos, // Asegúrate de que coincide con la clave esperada por la API
        especialidade: especialidad, // Cambia a "especialidad" si la API lo requiere
    };

    try {
        // Realizar la solicitud POST
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token2}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(usuario),
        });

        // Verificar si la respuesta es exitosa
        if (response.ok) {
            const data = await response.json(); // Si hay respuesta JSON, procesarla
            console.log('Usuario registrado exitosamente:', data);
            alert('Usuario registrado exitosamente.');
            document.getElementById('formRegistrarMedico').reset();
        } else {
            // Manejar errores de la API
            const errorData = await response.json();
            console.error('Error al registrar el usuario:', errorData);
            alert('Error al registrar el usuario: ' + (errorData.message || 'Verifique los datos ingresados.'));
        }
    } catch (error) {
        console.error('Hubo un problema con la solicitud:', error);
        alert('Ocurrió un error al intentar registrar el usuario.');
    }
}

// Agregar un evento al formulario para ejecutar la función de registro
document.getElementById('formRegistrarMedico').addEventListener('submit', registrarUsuario);
