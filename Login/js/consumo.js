// Obtener el JWT de localStorage
document.getElementById('btnIngresar').addEventListener('click', login);


function login() {
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!email || !password) {
        mostrarToast('Por favor ingresa ambos campos', '#f44336');
        return;
    }

    console.log(email);
    console.log(password);

    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.type === 'SUCCESS') {
            localStorage.setItem('userData', JSON.stringify(data.result));
            
            console.log(JSON.stringify(data.result))

            localStorage.setItem('jwt', data.result.jwt);
            localStorage.setItem('userId', data.result.userId);
            localStorage.setItem('username', data.result.username);
            localStorage.setItem('role', data.result.typeUser)
            localStorage.setItem('expiration', data.result.expiration);

            mostrarToast('Inicio de sesión exitoso', '#092e95');

            if (data.result.typeUser === 'MEDICO') {
                window.location.href = '../../InicioAdmin/InicioAdmin.html';
            } else if (data.result.typeUser === 'PACIENTE') {
                window.location.href = '../../InicioUsuarioNormal/InicioUsuarioNormal.html';
            }
        } else {
            mostrarToast('Credenciales incorrectas', '#092e95');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarToast('Correo o Contraseña no válida', '#092e95');
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
        ocultarAlerta(alertaDiv);
    });

    const iconoDiv = document.createElement("div");
    iconoDiv.classList.add("icono");
    iconoDiv.innerHTML = "&#x1f698;";

    alertaDiv.appendChild(iconoDiv);
    alertaDiv.appendChild(textoDiv);
    alertaDiv.appendChild(btnCerrar);

    document.body.appendChild(alertaDiv);

    setTimeout(() => {
        alertaDiv.classList.add("mostrar");
    }, 10);

    setTimeout(() => {
        ocultarAlerta(alertaDiv);
    }, 3000);
}

function ocultarAlerta(alertaDiv) {
    alertaDiv.classList.remove("mostrar");
    alertaDiv.classList.add("ocultar");
    setTimeout(() => {
        alertaDiv.remove();
    }, 500);
}
