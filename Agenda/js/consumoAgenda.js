async function obtenerCitas() {
    const token = localStorage.getItem('jwt');
    console.log("Token JWT obtenido:", token);

    if (!token) {
        console.log('No se encontró el token en el localStorage');
        mostrarToast('No se encontró el token. Por favor, inicie sesión.', '#f44336');
        return;
    }

    const url = 'http://localhost:8080/citas/all'; // Cambiar a la URL real de tu API

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw new Error('Error en la red: ' + response.statusText);

        const data = await response.json();
        console.log('Datos recibidos:', data);

        const tableBody = document.getElementById('citasTableBody');
        tableBody.innerHTML = '';

        // Iterar por los datos y crear las filas
        data.result.forEach(cita => {
            const estadoActivo = cita.estado === 'activo';
            const estadoClase = estadoActivo ? 'btn-success' : 'btn-danger';
            const estadoTexto = estadoActivo ? 'Activo' : 'Inactivo';

            const row = `
                <tr align="center">
                    <td>${cita.dia}</td>
                    <td>${cita.hora}</td>
                    <td>${cita.ubicacion}</td>
                    <td>${cita.motivo}</td>
                    <td>
                        <button class="btn btn-sm ${estadoClase}" 
                            data-id="${cita.id}" 
                            data-estado="${cita.estado}" 
                            data-toggle="modal" 
                            data-target="#modificarEstadoCita">
                            <i class="fas fa-sync-alt"></i> ${estadoTexto}
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-primary btnIcono" 
                            data-id="${cita.id}" 
                            data-dia="${cita.dia}" 
                            data-hora="${cita.hora}" 
                            data-ubicacion="${cita.ubicacion}" 
                            data-motivo="${cita.motivo}" 
                            data-toggle="modal" 
                            data-target="#modificarCita">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

        configurarFiltrosCitas();

    } catch (error) {
        console.error('Hubo un problema con la solicitud:', error);
        mostrarToast('Ocurrió un error al intentar obtener los datos.', '#f44336');
    }
}

function configurarFiltrosCitas() {
    const filterMotivo = document.getElementById('filterMotivo');
    const filterEstado = document.getElementById('filterEstado');

    filterMotivo.addEventListener('input', aplicarFiltrosCitas);
    filterEstado.addEventListener('change', aplicarFiltrosCitas);
}

function aplicarFiltrosCitas() {
    const filterMotivo = document.getElementById('filterMotivo').value.toLowerCase();
    const filterEstado = document.getElementById('filterEstado').value.toLowerCase();

    const filas = document.querySelectorAll('#citasTableBody tr');
    filas.forEach(fila => {
        const motivo = fila.children[3].textContent.toLowerCase();
        const estado = fila.children[4].textContent.trim().toLowerCase();

        const coincideMotivo = !filterMotivo || motivo.includes(filterMotivo);
        const coincideEstado = !filterEstado || estado === filterEstado;

        fila.style.display = coincideMotivo && coincideEstado ? '' : 'none';
    });
}

function mostrarToast(mensaje, color = "#092e95") {
    const alertaDiv = document.createElement("div");
    alertaDiv.classList.add("alerta");

    const textoDiv = document.createElement("div");
    textoDiv.classList.add("texto");
    textoDiv.textContent = mensaje;

    alertaDiv.style.backgroundColor = color;

    const btnCerrar = document.createElement("button");
    btnCerrar.classList.add("btn-cerrar");
    btnCerrar.innerHTML = '&times;';
    btnCerrar.addEventListener("click", () => {
        alertaDiv.classList.remove("mostrar");
        alertaDiv.classList.add("ocultar");
        setTimeout(() => alertaDiv.remove(), 500);
    });

    const iconoDiv = document.createElement("div");
    iconoDiv.classList.add("icono");
    iconoDiv.innerHTML = "&#x1f4c5;"; // Icono de calendario

    alertaDiv.appendChild(iconoDiv);
    alertaDiv.appendChild(textoDiv);
    alertaDiv.appendChild(btnCerrar);

    document.body.appendChild(alertaDiv);

    setTimeout(() => alertaDiv.classList.add("mostrar"), 10);

    setTimeout(() => {
        alertaDiv.classList.remove("mostrar");
        alertaDiv.classList.add("ocultar");
        setTimeout(() => alertaDiv.remove(), 500);
    }, 3000);
}

// Llamar para obtener los datos
obtenerCitas();



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
