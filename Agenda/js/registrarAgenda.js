async function registrarAgenda() {
  const dia = document.getElementById('dia').value;
  const hora = document.getElementById('hora').value;
  const ubicacion = document.getElementById('ubicacion').value;
  const motivo = document.getElementById('motivo').value;

  if (!dia || !hora || !ubicacion || !motivo) {
    mostrarToast('Por favor, complete todos los campos.', '#092e95'); 
    return;
  }

  const token = localStorage.getItem('jwt');
  if (!token) {
    console.log('No se encontró el token en el localStorage');
    mostrarToast('No se encontró el token. Por favor, inicie sesión.', '#092e95'); 
    return;
  }

  const agendaData = {
    dia: dia,
    hora: hora,
    ubicacion: ubicacion,
    motivo: motivo,
  };

  const url = 'http://localhost:8080/agenda/save'; 

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Accept': 'application/json',       
        'Content-Type': 'application/json'  
      },
      body: JSON.stringify(agendaData) 
    });

    if (!response.ok) {
      const errorMessage = await response.text(); 
      throw new Error('Error al registrar la agenda: ' + errorMessage);
    }

    mostrarToast('Agenda registrada exitosamente.', '#092e95'); 

    document.getElementById('formRegistrarCita').reset();

    $('#registrarAgenda').modal('hide'); // Asegúrate de que este ID coincida con tu modal

    obtenerAgendas(); // Asegúrate de que esta función esté definida para obtener la lista de agendas

  } catch (error) {
    console.error('Hubo un problema con la solicitud:', error);
    mostrarToast('Ocurrió un error al registrar la agenda.', '#092e95'); 
  }
}

document.getElementById('formRegistrarCita').addEventListener('submit', (event) => {
event.preventDefault(); 
registrarAgenda();     
});

function mostrarToast(mensaje, color) {
const toast = document.createElement('div');
toast.textContent = mensaje;
toast.style.backgroundColor = color;
toast.style.color = '#fff';
toast.style.padding = '10px';
toast.style.borderRadius = '5px';
toast.style.position = 'fixed';
toast.style.bottom = '10px';
toast.style.right = '10px';
toast.style.zIndex = '9999';

document.body.appendChild(toast);

setTimeout(() => {
  toast.remove();
}, 3000); 
}
