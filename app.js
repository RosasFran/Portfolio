const inputName = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const email = document.querySelector("#email");
const mensaje = document.querySelector("#mensaje");
const btnSubmit = document.querySelector('#submit');
const formulario = document.querySelector('#formu');
const spinner = document.querySelector('#spinner');

const datos = {
    nombre: '',
    apellido: '',
    email: '',
    mensaje: ''
}

inputName.addEventListener('input', validar);
apellido.addEventListener('input', validar);
email.addEventListener('input', validar);
mensaje.addEventListener('input', validar);
formulario.addEventListener('submit', enviarEmail);

function validar(e) {
    limpiarAlerta(e.target.parentElement);
    if(e.target.value.trim() === '') {
        mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
        datos[e.target.name] = '';
        comprobarEmail();
        return;
    }
    if (e.target.id === 'email' && !validarEmail(e.target.value)) {
        mostrarAlerta('El email no es válido', e.target.parentElement);
        datos[e.target.name] = '';
        comprobarEmail();
        return;
    }
    datos[e.target.name] = e.target.value.trim();
}

function mostrarAlerta(mensaje, referencia) {
    const error = document.createElement('P');
    error.textContent = mensaje;
    error.classList.add('mensaje-error');
    referencia.appendChild(error);
}

function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector('.mensaje-error');
    if(alerta) {
        alerta.remove();
    }
    comprobarEmail();
}

function validarEmail(email) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ ;
    const resultado = regex.test(email);
    return resultado;
}

function comprobarEmail() {
    if(Object.values(datos).includes('')) {
        btnSubmit.disabled = true;
        return;
    }
    btnSubmit.disabled = false;
}

function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.remove('hidden');
    spinner.classList.add('flex');
    
    setTimeout(() => {

        spinner.classList.remove('flex');
        spinner.classList.add('hidden');

        const mensajeExito = document.createElement('P');
        mensajeExito.textContent = 'Mensaje enviado correctamente';
        mensajeExito.classList.add('mensaje-correcto');

        formulario.appendChild(mensajeExito);

        setTimeout(() => {
            mensajeExito.remove();
        }, 10000);

        formulario.reset();

        btnSubmit.disabled = true;
    }, 3000);
}