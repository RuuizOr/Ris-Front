async function obtenerPacientes() {
    const token = localStorage.getItem('jwt');
    console.log("Token JWT obtenido:", token);

    if (!token) {
        console.log('No se encontró el token en el localStorage');
        mostrarToast('No se encontró el token. Por favor, inicie sesión.', '#f44336');
        return;
    }

    const url = 'http://localhost:8080/paciente/all'; // Cambiar a la URL real de tu API

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

        const tableBody = document.getElementById('pacientesTableBody');
        tableBody.innerHTML = '';

        // Iterar por los datos y crear las filas
        data.result.forEach(paciente => {
            const estadoActivo = paciente.estado === 'activo';
            const estadoClase = estadoActivo ? 'btn-success' : 'btn-danger';
            const estadoTexto = estadoActivo ? 'Activo' : 'Inactivo';

            const row = `
                <tr align="center">
                    <td>${paciente.nombre}</td>
                    <td>${paciente.apellidos}</td>
                    <td>${paciente.telefono}</td>
                    <td>
                        <button class="btn btn-sm ${estadoClase}" 
                            data-id="${paciente.id}" 
                            data-estado="${paciente.estado}" 
                            data-toggle="modal" 
                            data-target="#modificarEstadoPaciente">
                            <i class="fas fa-sync-alt"></i> ${estadoTexto}
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-primary btnIcono" 
                            data-id="${paciente.id}" 
                            data-nombre="${paciente.nombre}" 
                            data-apellidos="${paciente.apellidos}" 
                            data-telefono="${paciente.telefono}" 
                            data-toggle="modal" 
                            data-target="#modificarPaciente">
                            <i class="fas fa-edit"></i>
                        </button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

        configurarFiltros();

    } catch (error) {
        console.error('Hubo un problema con la solicitud:', error);
        mostrarToast('Ocurrió un error al intentar obtener los datos.', '#f44336');
    }
}

function configurarFiltros() {
    const filterName = document.getElementById('filterName');
    const filterState = document.getElementById('filterState');

    filterName.addEventListener('input', aplicarFiltros);
    filterState.addEventListener('change', aplicarFiltros);
}

function aplicarFiltros() {
    const filterName = document.getElementById('filterName').value.toLowerCase();
    const filterState = document.getElementById('filterState').value.toLowerCase();

    const filas = document.querySelectorAll('#pacientesTableBody tr');
    filas.forEach(fila => {
        const nombre = fila.children[0].textContent.toLowerCase();
        const estado = fila.children[3].textContent.trim().toLowerCase();

        const coincideNombre = !filterName || nombre.includes(filterName);
        const coincideEstado = !filterState || estado === filterState;

        fila.style.display = coincideNombre && coincideEstado ? '' : 'none';
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
    iconoDiv.innerHTML = "&#x1f3e5;";

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
obtenerPacientes();
