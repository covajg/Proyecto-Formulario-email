// Variables
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');

// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;   // expresion regular para validar email en JavaScript, es la manera profesional de validar un email...   fuente: https://emailregex.com/

eventListener();

function eventListener(){
    //Cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    //Campos del formulario
    email.addEventListener('blur', validarFormulario);  //blur, reconoce cuando este dentro del campo y me salga...
    asunto.addEventListener('blur', validarFormulario);  
    mensaje.addEventListener('blur', validarFormulario);  

    //Reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario);

    // Enviar email
    formulario.addEventListener('submit', enviarEmail);
};

// Funciones
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// Valida el formulario
function validarFormulario(e) {


    if(e.target.value.length > 0){
        // Elimina los errores...
        const error = document.querySelector('p.error');
        if (error){
            error.remove();
        }

        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');

        }else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500'); //agrego clases que ya estan en mi hoja de estilos con tailwind, con el que esta constuido este proyecto.

        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email'){
        
        if(er.test ( e.target.value )){
            const error = document.querySelector('p.error');
            if (error){
                error.remove();
            }

            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
        }else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500'); //agrego clases que ya estan en mi hoja de estilos con tailwind, con el que esta constuido este proyecto.

            mostrarError('Email no valido');
        }
    }
    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
};

function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if (errores.length === 0){    // .length nada mas existe en querySelectorAll, de lo contrario retorna un null...
    formulario.appendChild(mensajeError);
    }else{

    }
}

// Envia el email
function enviarEmail(e){
    e.preventDefault();
   
    //Mostrar spinner
    const spinner = document.querySelector('#spinner');  // fuente: https://tobiasahlin.com/spinkit/
    spinner.style.display = 'flex';

    // despues de 3 segundos ocultar el spinner y mostrar el mensaje
    setTimeout( () =>{
        spinner.style.display = 'none';

        //mensaje que dice que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se ha enviado correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppcase');

        // inserta el parrafo antes de spinner
        formulario.insertBefore(parrafo, spinner);

        //Remover el parrafo despues de 5 segundos
        setTimeout(()=>{
            parrafo.remove();  //Elimina el mensaje de exito...
            resetearFormulario();
        }, 5000);
    }, 3000 );  //cada 1000 es 1 segundo

    
}

// setTimeOut, se ejecuta despues de la cantidad de tiempo especificado en la funcion
// setInterval, se ejecuta cada vez que pasa el tiempo especificado en la funcion

// Funcion que resetea el formulario
function resetearFormulario(e){
    e.preventDefault();
    formulario.reset();

    iniciarApp();
}