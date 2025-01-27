// Obtener JWT y userId del localStorage
const jwtToken = localStorage.getItem('jwt');  // El JWT está almacenado con la clave 'jwt'
const userId = localStorage.getItem('userId');  // El userId está almacenado con la clave 'userId'


function mostrarAlerta(mensaje, tipo = 'info') {
    const alerta = document.createElement('div');
    alerta.classList.add('alerta', 'mostrar');

    // Configurar estilo de fondo y contenido
    alerta.style.backgroundColor = '#092e95'; // Color único para todas las alertas
    alerta.innerHTML = `
        <span class="texto">🚘 ${mensaje}</span>
        <button class="btn-cerrar" onclick="this.parentElement.classList.remove('mostrar')">
            <i class="fa fa-times"></i>
        </button>
    `;

    document.body.appendChild(alerta);

    // Ocultar automáticamente la alerta después de 5 segundos
    setTimeout(() => {
        alerta.classList.remove('mostrar');
        setTimeout(() => alerta.remove(), 500); // Eliminar del DOM después de la transición
    }, 5000);
}

// Verificar que ambos valores están en localStorage
if (!jwtToken || !userId) {
    mostrarAlerta("JWT o userId no encontrados en localStorage", 'error' )
} else {
    // Crear el objeto con el id del usuario
    const userData = {
        id: parseInt(userId)  // Solo enviamos el id del usuario como dato (aseguramos que sea un número)
    };

    // Imprimir los datos a la consola antes de enviar la solicitud
    console.log('Datos que se enviarán:', userData);  // Aquí estamos imprimiendo los datos en consola

    // Realizar la solicitud POST para obtener los datos completos del usuario
    fetch('http://localhost:8080/usuarios/id', {  // Endpoint para obtener los detalles del usuario
        method: 'POST',  // Usamos POST porque enviamos un cuerpo con el id
        headers: {
            'Authorization': `Bearer ${jwtToken}`,  // Incluir el JWT en el encabezado de autorización
            'Content-Type': 'application/json'      // Especificar que el contenido es JSON
        },
        body: JSON.stringify(userData)  // Enviar solo el id en el cuerpo de la solicitud
    })
    .then(response => {
        if (response.ok) {
            mostrarAlerta('Usuario actualizado exitosamente', 'success');
            return response.json();
              // Si la respuesta es exitosa, parseamos el JSON
        } else {
            throw new Error('Error al obtener datos del usuario');
        }
    })
    .then(data => {
        // Aquí puedes manejar los datos completos recibidos de la respuesta
        console.log('Datos completos del usuario:', data);  // Mostrar todos los datos del usuario

        // Rellenar el formulario con los datos recibidos
        document.getElementById('nombreMod').value = data.nombre;
        document.getElementById('apellidosMod').value = data.apellidos;
        document.getElementById('emailMod').value = data.email;
        document.getElementById('telefonoMod').value = data.telefono;
        document.getElementById('contrasenaMod').value = "";
    })
    .catch(error => {
        console.error('Error:', error);
    });
}


function logout() {
    // Elimina los datos del localStorage relacionados con la sesión
    localStorage.removeItem('userData');
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('expiration');

    // Redirige al usuario a la página de inicio de sesión
    window.location.href = '../Login/Login.html';
}
