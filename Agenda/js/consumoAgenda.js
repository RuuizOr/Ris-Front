async function obtenerAgendas() {
    const token = localStorage.getItem('jwt');
    console.log("Token JWT obtenido:", token);

    if (!token) {
        console.log('No se encontró el token en el localStorage');
        mostrarToast('No se encontró el token. Por favor, inicie sesión.', '#f44336');
        return;
    }

    const url = 'http://localhost:8080/agenda/all'; // Cambiar a la URL real de tu API

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

        const tableBody = document.getElementById('agendasTableBody');
        tableBody.innerHTML = '';

        // Iterar por los datos y crear las filas
        data.result.forEach(agenda => {
            const estadoActivo = agenda.status;
            const estadoClase = estadoActivo ? 'btn-success' : 'btn-danger';
            const estadoTexto = estadoActivo ? 'Activo' : 'Inactivo';

            const row = `
                <tr align="center">
                    <td>${agenda.dia}</td>
                    <td>${agenda.hora}</td>
                    <td>${agenda.ubicacion}</td>
                    <td>${agenda.motivo}</td>
                    <td>
                        <button class="btn btn-sm ${estadoClase}" 
                            data-id="${agenda.id}" 
                            data-status="${agenda.status}" 
                            data-toggle="modal" 
                            data-target="#modificarEstadoAgenda">
                            <i class="fas fa-sync-alt"></i> ${estadoTexto}
                        </button>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-primary btnIcono" 
                            data-id="${agenda.id}" 
                            data-dia="${agenda.dia}" 
                            data-hora="${agenda.hora}" 
                            data-ubicacion="${agenda.ubicacion}" 
                            data-motivo="${agenda.motivo}" 
                            data-status="${agenda.status}" 
                            data-toggle="modal" 
                            data-target="#modificarAgenda">
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
    const filterDay = document.getElementById('filterDay');
    const filterStatus = document.getElementById('filterStatus');

    filterDay.addEventListener('input', aplicarFiltros);
    filterStatus.addEventListener('change', aplicarFiltros);
}

function aplicarFiltros() {
    const filterDay = document.getElementById('filterDay').value.toLowerCase();
    const filterStatus = document.getElementById('filterStatus').value.toLowerCase();

    const filas = document.querySelectorAll('#agendasTableBody tr');
    filas.forEach(fila => {
        const dia = fila.children[0].textContent.toLowerCase();
        const estado = fila.children[4].textContent.trim().toLowerCase();

        const coincideDia = !filterDay || dia.includes(filterDay);
        const coincideEstado = !filterStatus || estado === filterStatus;

        fila.style.display = coincideDia && coincideEstado ? '' : 'none';
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
    iconoDiv.innerHTML = "&#x1f4c5;";

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
obtenerAgendas();
