const token3 = localStorage.getItem('jwt');
console.log("Token JWT obtenido:", token3);
// Mostrar alerta personalizada
function mostrarAlerta(mensaje, tipo = 'info') {
    const alerta = document.createElement('div');
    alerta.classList.add('alerta', 'mostrar');

    // Configurar estilo de fondo y contenido
    alerta.style.backgroundColor = '#092e95'; // Color único para todas las alertas
    alerta.innerHTML = `
        <span class="texto">🏥 ${mensaje}</span>
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

// Configuración del modal para modificar usuario
$('#modificarMedico').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget); // Botón que activó el modal

    // Capturar los datos del botón
    const id = button.data('id') || '';
    console.log(id)
    const nombre = button.data('nombre') || '';
    console.log(nombre)
    const apellidos = button.data('apellidos') || '';
    console.log(apellidos)
    // const email = button.data('correo') || '';
    const especialidad = button.data('especialidad') || '';
    console.log(especialidad)
    // const contrasena = button.data('contrasena') || '';
    // const rol = button.data('rol') || '';

    // Asignar los valores a los campos del formulario
    $('#idUsuarioMod').val(id);
    $('#nombreMod').val(nombre);
    $('#apellidosMod').val(apellidos);
    $('#especialidadMod').val(especialidad);
    
});

// Función para editar un usuario
async function editarUsuario(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    // Obtener el token JWT desde localStorage
    // const token = localStorage.getItem('jwt');
    // if (!token) {
    //     mostrarAlerta('No se encontró el token. Por favor, inicie sesión.', 'error');
    //     return;
    // }

    // URL de la API
    const url = 'http://localhost:8080/medicos/update';

    // Obtener los datos del formulario
    const idUsuario = document.getElementById('idUsuarioMod').value.trim();
    const nombre = document.getElementById('nombreMod').value.trim();
    const apellidos = document.getElementById('apellidosMod').value.trim();
    const especialidad = document.getElementById("especialidadMod").value.trim();
    



    // Crear el objeto de usuario
    const usuario = {
        id: idUsuario,
        nombre: nombre,
        apellido: apellidos,
        especialidade:especialidad,
        status: true
    };

    try {
        // Realizar la solicitud PUT con el token en el encabezado
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token3}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });
        location.reload();
        if (!response.ok) {
            const data = await response.json();
            mostrarAlerta('Usuario actualizado exitosamente', 'success');
            // Opcional: cerrar el modal y limpiar el formulario
            $('#modificarUsuario').modal('hide');
            document.getElementById('formModificarUsuario').reset();
            // Recargar o actualizar la lista de usuarios
            obtenerUsuarios();
        } else {
            const errorData = await response.json();
            mostrarAlerta('Error al actualizar el usuario: ' + (errorData.message || 'Verifique los datos ingresados'), 'error');
        }
    } catch (error) {
        mostrarAlerta('Ocurrió un error al intentar actualizar el usuario.', 'error');
    }
}

// Agregar el evento al formulario
document.getElementById('formModificarMedico').addEventListener('submit', editarUsuario);
