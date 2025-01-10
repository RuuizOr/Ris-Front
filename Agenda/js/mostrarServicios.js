let citas = [
    {
        id: 1,
        dia: "2025-01-10",
        hora: "10:00 AM",
        ubicacion: "Consultorio A",
        motivo: "Consulta General",
        estado: "Activo"
    },
    {
        id: 2,
        dia: "2025-01-11",
        hora: "3:00 PM",
        ubicacion: "Consultorio B",
        motivo: "Revisión",
        estado: "No Activo"
    }
];

// Cargar citas en la tabla
function cargarCitas() {
    const tbody = document.querySelector("#serviciosTableBody");
    tbody.innerHTML = ""; // Limpiar la tabla

    citas.forEach((cita) => {
        const estadoActivo = cita.estado === "Activo";
        const estadoClase = estadoActivo ? "btn-success" : "btn-danger";
        const estadoTexto = estadoActivo ? "Activo" : "No Activo";

        const row = document.createElement("tr");
        row.setAttribute("data-id", cita.id);
        row.innerHTML = `
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
        `;
        tbody.appendChild(row);
    });
}

// Registrar una nueva cita
document.querySelector("#formRegistrarCita").addEventListener("submit", (e) => {
    e.preventDefault();

    const dia = document.querySelector("#dia").value;
    const hora = document.querySelector("#hora").value;
    const ubicacion = document.querySelector("#ubicacion").value;
    const motivo = document.querySelector("#motivo").value;

    const nuevaCita = {
        id: citas.length + 1, // Generar un ID único
        dia,
        hora,
        ubicacion,
        motivo,
        estado: "Activo"
    };

    citas.push(nuevaCita);
    cargarCitas();
    $('#registrarCita').modal('hide'); // Cerrar modal
    mostrarToast("Cita registrada exitosamente", "#4CAF50"); // Mostrar alerta de éxito
});

// Editar una cita existente
document.querySelector("#formModificarCita").addEventListener("submit", (e) => {
    e.preventDefault();

    const id = parseInt(document.querySelector("#idMod").value);
    const dia = document.querySelector("#diaMod").value;
    const hora = document.querySelector("#horaMod").value;
    const ubicacion = document.querySelector("#ubicacionMod").value;
    const motivo = document.querySelector("#motivoMod").value;

    const cita = citas.find((cita) => cita.id === id);
    if (cita) {
        cita.dia = dia;
        cita.hora = hora;
        cita.ubicacion = ubicacion;
        cita.motivo = motivo;
        cargarCitas();
        $('#modificarCita').modal('hide'); // Cerrar modal
        mostrarToast("Cita actualizada correctamente", "#4CAF50"); // Alerta de éxito
    }
});

// Abrir modal para modificar el estado de una cita
document.querySelector("#serviciosTableBody").addEventListener("click", (e) => {
    if (e.target.closest("button") && e.target.closest("button").classList.contains("btn")) {
        const id = parseInt(e.target.closest("button").getAttribute("data-id"));
        const cita = citas.find((cita) => cita.id === id);
        if (cita) {
            // Abrir el modal y cargar la información del estado
            document.querySelector("#idServicio").value = cita.id;
            document.querySelector("#estadoServicio").value = cita.estado; // Asignar el estado actual
            $('#modificarEstadoCita').modal('show');
        }
    }
});

// Actualizar estado de una cita
document.querySelector("#formModificarEstado").addEventListener("submit", (e) => {
    e.preventDefault();

    const id = parseInt(document.querySelector("#idServicio").value);
    const nuevoEstado = document.querySelector("#estadoServicio").value; // Obtener el nuevo estado del select

    const cita = citas.find((cita) => cita.id === id);
    if (cita) {
        cita.estado = nuevoEstado;
        cargarCitas(); // Recargar la tabla de citas
        $('#modificarEstadoCita').modal('hide'); // Cerrar modal
        mostrarToast("Estado actualizado correctamente", "#4CAF50"); // Alerta de éxito
    }
});

// Función para mostrar alertas personalizadas
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

// Inicializar la tabla al cargar la página
cargarCitas();
