// Función para mostrar alertas personalizadas
function mostrarAlerta(mensaje, tipo = 'info') {
    const alerta = document.createElement('div');
    alerta.classList.add('alerta', 'mostrar');

    // Configurar el estilo de fondo y contenido según el tipo
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

// Función para obtener y mostrar los usuarios
async function obtenerUsuarios() {

    const url = 'http://localhost:8080/medicos/all';

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Error en la red: ' + response.statusText);
        }

        const data = await response.json();
        console.log('Datos de los usuarios:', data);

        const usuariosTableBody = document.getElementById('usuariosTableBody');
        usuariosTableBody.innerHTML = '';
        let rol;

        data.result.forEach(usuario => {
            rol = usuario.admin === "ROLE_USER" ? "Usuario" : "Administrador";
            const vehiculosHTML = JSON.stringify(usuario.vehiculos);
            const row = `
                <tr align="center">
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellido}</td>
                    <td>${usuario.especialidade}</td>
                   
                    <td>
                        <button class="btn btn-sm ${usuario.status ? 'btn-success' : 'btn-danger'}"
                            data-id="${usuario.id}" 
                            data-estado="${usuario.status}" 
                            data-toggle="modal" 
                            data-target="#modificarEstadoMedico">
                            <i class="fas fa-sync-alt"></i> ${usuario.status ? "Activo" : "Inactivo"}
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-primary btnIcono"
                            data-id="${usuario.id}" 
                            data-nombre="${usuario.nombre}" 
                            data-apellidos="${usuario.apellido}"
                            data-especialidad="${usuario.especialidade}"
                            data-estado="${usuario.status}" 
                            data-toggle="modal" 
                            data-target="#modificarMedico">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `;
            usuariosTableBody.insertAdjacentHTML('beforeend', row);
        });

        agregarEventos();
    } catch (error) {
    
    }
}

document.body.addEventListener('click', function (event) {
    if (event.target.closest('.btnVerServicios')) {
        const btn = event.target.closest('.btnVerServicios');
        const vehiculoId = btn.getAttribute('data-id');
        const listaServicios = btn.getAttribute('data-servicios'); // Servicios asociados en formato JSON
        
        // Llenar la lista de servicios en el modal
        const ulServicios = document.getElementById('listaServicios');
        ulServicios.innerHTML = ''; // Limpia los servicios previos

        const servicios = JSON.parse(listaServicios); // Asegúrate de que estén en JSON

        if (servicios.length === 0) {
            const noServiciosMessage = document.createElement('li');
            noServiciosMessage.textContent = 'No hay servicios aún';
            noServiciosMessage.className = 'list-group-item text-center text-muted';
            ulServicios.appendChild(noServiciosMessage);
        } else {
            servicios.forEach(servicio => {
                const li = document.createElement('li');
                li.textContent = `${servicio.modelo} - ${servicio.marca}-${servicio.color}`;
                li.className = 'list-group-item';
                ulServicios.appendChild(li);
            });
        }
        

        // Mostrar el modal
        $('#modalServicios').modal('show');
    }
});


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


// Función para cargar vehículos en el select
async function cargarVehiculos() {
    const token = localStorage.getItem('jwt');
    const API_URL_VEHICULOS = 'http://localhost:8080/vehiculos/all';

    try {
        const response = await fetch(API_URL_VEHICULOS, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Error al cargar los vehículos.');

        const data = await response.json();
        const selectVehiculos = document.getElementById('vehiculoSelect');

        selectVehiculos.innerHTML = '<option value="">Seleccione un vehículo</option>';
        data.forEach(vehiculo => {
            const option = document.createElement('option');
            option.value = vehiculo.id;
            option.textContent = `${vehiculo.modelo} (${vehiculo.marca})`;
            selectVehiculos.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los vehículos:', error);
    }
}

// Función para asignar vehículo a un usuario
async function asignarVehiculo(idUsuario, idVehiculo) {
    const token = localStorage.getItem('jwt');
    const API_URL_ASIGNAR = 'http://localhost:8080/usuarios/asignarVehiculo';

    try {
        const response = await fetch(API_URL_ASIGNAR, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idUsuario, idVehiculo })
        });

        if (!response.ok) throw new Error('Error al asignar el vehículo.');

        mostrarAlerta('Vehículo asignado exitosamente.', 'success');
    } catch (error) {
        console.error('Error al asignar el vehículo:', error);
        mostrarAlerta('Hubo un error al asignar el vehículo.', 'error');
    }
}

// Función para manejar eventos de botones
function agregarEventos() {
    document.body.addEventListener('click', function (event) {
        if (event.target.closest('.btnAsignarVehiculo')) {
            const btn = event.target.closest('.btnAsignarVehiculo');
            const idUsuario = btn.getAttribute('data-id');
            document.getElementById('idUsuario').value = idUsuario;
            cargarVehiculos();
            $('#asignarServicio').modal('show');
        }
    });

    document.getElementById('formAsignarServicio').addEventListener('submit', function (event) {
        event.preventDefault();
        const idUsuario = document.getElementById('idUsuario').value;
        const idVehiculo = document.getElementById('vehiculoSelect').value;

        if (!idVehiculo) {
            mostrarAlerta('Por favor, seleccione un vehículo.', 'error');
            return;
        }

        asignarVehiculo(idUsuario, idVehiculo);
        $('#asignarServicio').modal('hide');
    });
}

// Función para filtrar los usuarios
function filtrarUsuarios() {
    const nombre = document.getElementById('filterName').value.toLowerCase();
    const estado = document.getElementById('filterState').value;

    const filas = document.querySelectorAll('#usuariosTableBody tr');

    filas.forEach(fila => {
        const nombreUsuario = fila.cells[0].textContent.toLowerCase();
        const estadoBoton = fila.querySelector('button').getAttribute('data-estado');

        const coincideNombre = nombreUsuario.includes(nombre);

        let coincideEstado = true;
        if (estado) {
            coincideEstado = (estado === 'Activo' && estadoBoton === 'true') ||
                             (estado === 'Inactivo' && estadoBoton === 'false');
        }

        fila.style.display = coincideNombre && coincideEstado ? '' : 'none';
    });
}

// Agregar eventos a los filtros
document.getElementById('filterName').addEventListener('input', filtrarUsuarios);
document.getElementById('filterState').addEventListener('change', filtrarUsuarios);

// Llamar las funciones al cargar la página
obtenerUsuarios();





