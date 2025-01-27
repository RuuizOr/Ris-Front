// Función para registrar un nuevo paciente
async function registrarPaciente() {
  const nombre = document.getElementById('nombre').value;
  const apellidos = document.getElementById('apellidos').value;
  const telefono = document.getElementById('telefono').value;

  // Verificar si los campos están vacíos
  if (!nombre || !apellidos || !telefono) {
    mostrarToast('Por favor, complete todos los campos.', '#092e95'); // Azul en lugar de rojo
    return;
  }

  // Obtener el token JWT desde localStorage
  const token = localStorage.getItem('jwt');
  if (!token) {
    console.log('No se encontró el token en el localStorage');
    mostrarToast('No se encontró el token. Por favor, inicie sesión.', '#092e95'); // Azul en lugar de rojo
    return;
  }

  // Crear el objeto que se enviará al backend
  const pacienteData = {
    nombre: nombre,
    apellidos: apellidos,
    telefono: telefono,
    estado: true // Estado activo
  };

  const url = 'http://localhost:8080/paciente/save'; // URL del endpoint

  try {
    // Realizar la solicitud POST con el token en el encabezado y los datos del paciente
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Incluir el token en el encabezado
        'Accept': 'application/json',         // Aceptar respuesta en formato JSON
        'Content-Type': 'application/json'    // Especificar que enviamos/recibimos JSON
      },
      body: JSON.stringify(pacienteData) // Enviar los datos en formato JSON
    });

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      const errorMessage = await response.text(); // Captura el mensaje del servidor si existe
      throw new Error('Error al registrar el paciente: ' + errorMessage);
    }

    // Mostrar mensaje de éxito
    mostrarToast('Paciente registrado exitosamente.', '#092e95'); // Azul en lugar de verde

    // Limpiar el formulario después de registrar
    document.getElementById('formRegistrarPaciente').reset();

    // Cerrar el modal
    $('#registrarPaciente').modal('hide');

    // Opcional: Si deseas actualizar la lista de pacientes después de registrar
    obtenerPacientes();

  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error);
    mostrarToast('Ocurrió un error al registrar el paciente.', '#092e95'); // Azul en lugar de rojo
  }
}

// Agregar el evento para el formulario de registro
document.getElementById('formRegistrarPaciente').addEventListener('submit', (event) => {
  event.preventDefault();  // Prevenir el envío normal del formulario
  registrarPaciente();     // Llamar a la función para registrar el paciente
});
