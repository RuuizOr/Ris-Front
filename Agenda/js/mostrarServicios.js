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
        const row = document.createElement("tr");
        row.setAttribute("data-id", cita.id);
        row.innerHTML = `
            <td>${cita.dia}</td>
            <td>${cita.hora}</td>
            <td>${cita.ubicacion}</td>
            <td>${cita.motivo}</td>
            <td>${cita.estado}</td>
            <td>
                <button class="btn btn-warning btn-sm editarCita" data-toggle="modal" data-target="#modificarCita" data-id="${cita.id}">
                    Editar
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
    alert("Cita registrada exitosamente");
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
        alert("Cita actualizada correctamente");
    }
});

// Abrir modal para editar cita
document.querySelector("#serviciosTableBody").addEventListener("click", (e) => {
    if (e.target.classList.contains("editarCita")) {
        const id = parseInt(e.target.getAttribute("data-id"));
        const cita = citas.find((cita) => cita.id === id);

        if (cita) {
            document.querySelector("#idMod").value = cita.id;
            document.querySelector("#diaMod").value = cita.dia;
            document.querySelector("#horaMod").value = cita.hora;
            document.querySelector("#ubicacionMod").value = cita.ubicacion;
            document.querySelector("#motivoMod").value = cita.motivo;
        }
    }
});

// Actualizar estado de una cita
document.querySelector("#formModificarEstado").addEventListener("submit", (e) => {
    e.preventDefault();

    const id = parseInt(document.querySelector("#idServicio").value);
    const nuevoEstado = document.querySelector("#estadoServicio").value;

    const cita = citas.find((cita) => cita.id === id);
    if (cita) {
        cita.estado = nuevoEstado;
        cargarCitas();
        $('#modificarEstadoCita').modal('hide'); // Cerrar modal
        alert("Estado actualizado correctamente");
    }
});

// Inicializar la tabla al cargar la página
cargarCitas();
