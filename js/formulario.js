const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input'); // Nos genera un arreglo de todos los inputs
//Queremos acceder a los inputs que esten dentro del id=formulario
//Si se accede desde la consola a las variables las podemos observar


const expresiones = {
    //Esperamos que el usuario inicie^ termine$ entre:
    //[a-zA-Z0-9\_\-] - Que tenga letras minusculas, letras mayusculas, numero del 0 al 9 \ que pueda 
    //tener el guin bajo \ el guion, que estos valoresse puedan [repetir] y que tengan un maximo de 
    //entre 4 y 16 caracteres
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/,         // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,            // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/,          // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/          // 7 a 14 numeros.
}


//Comporbando que todos los campos esten correctos
const campos = {
    usuario: false,
    nombre: false,
    password: false,
    password2: false,
    correo: false,
    telefono: false
}

const validarCampo = (expresion, input, campo) => {

    //accedemos al objeto expresiones, luego a usuario y haremos un testeo
    //e.target.value = accedemos al valorque tenemos en el input
    //expresiones.usuario = expresion
    //e.target = input - accedemosal valor del input y que lo compruebe con la expresion
    if (expresion.test(input.value)) {
        //# acceder al id
        //en su classList eliminamos la clase = formulario__grupo-incorrecto
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        //en su classList agregamos la clase = formulario__grupo-correcto
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        //en el classList de i (icono) eliminamos el icono de incorrecto 
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-xmark');
        //en el classList de i (icono) agregamos el icono de correcto
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-check');                
        //Se elimina el mensaje de corregir el campo quitandole el estilo de error activo
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true; //Se coloca el campo como valido para la validacion final
    } else {
        //Accedemos al div id = grupo__${campo}
        //en su classList agregamos la clase = formulario__grupo-incorrecto
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        //en su classList eliminamos la clase = formulario__grupo-correcto
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        //en el classList de i (icono) eliminamos el icono de correcto
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-check');
        //en el classList de i (icono) agregamos el icono de incorrecto
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-xmark');
        //Se activa el mensaje de corregir el campo agregandole el estilo de error activo
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false; //Se coloca el campo como invalido para la validacion final
    }
}

//Validamos el password2
const validarPassword2 = () => {
    const inputPassword1 = document.getElementById('password');
    const inputPassword2 = document.getElementById('password2');

    if (inputPassword1.value !== inputPassword2.value) {
        
        //en su classList agregamos la clase = formulario__grupo-incorrecto
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
        //en su classList eliminamos la clase = formulario__grupo-correcto
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
        //en el classList de i (icono) eliminamos el icono de correcto
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-circle-check');
        //en el classList de i (icono) agregamos el icono de incorrecto
        document.querySelector(`#grupo__password2 i`).classList.add('fa-circle-xmark');
        //Se activa el mensaje de corregir el campo agregandole el estilo de error activo
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos['password2'] = false; //Se coloca el campo como valido para la validacion final
    } else {
        //en su classList eliminamos la clase = formulario__grupo-incorrecto
        document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
        //en su classList agregamos la clase = formulario__grupo-correcto
        document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
        //en el classList de i (icono) eliminamos el icono de incorrecto 
        document.querySelector(`#grupo__password2 i`).classList.remove('fa-circle-xmark');
        //en el classList de i (icono) agregamos el icono de correcto
        document.querySelector(`#grupo__password2 i`).classList.add('fa-circle-check');                
        //Se elimina el mensaje de corregir el campo quitandole el estilo de error activo
        document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['password2'] = true;
    }

}

//Validara cada input
//Agregamos el parametro e, que seria el evento
const validarFormulario = (e) => {
    //console.log('Se Ejecuto');
    //console.log(e.target.name); // imprime el nombre asignado al input en el cual ocurra el evento
    switch (e.target.name) {
        case 'usuario':
            //Se quiere acceder al metodo usuario del objeto expresiones
            //Se toma el valor de e.target que es elcampoque actualmente de esta operando
            validarCampo(expresiones.usuario,e.target,'usuario');
        break;
        case 'nombre':
            validarCampo(expresiones.nombre,e.target,'nombre');
        break;
        case 'password':
            validarCampo(expresiones.password,e.target,'password');
            validarPassword2(); //Se valida la 2da contraseña
        break;
        case 'password2':
            validarPassword2();
        break;
        case 'correo':
            validarCampo(expresiones.correo,e.target,'correo');
        break;
        case 'telefono':
            validarCampo(expresiones.telefono,e.target,'telefono');
        break;
        default:

        break;
    }
}



//Quiero que por cada input me ejecutes un codigo
inputs.forEach((input) => {
    //Por cada input quiero agregar un event listener
    input.addEventListener('keyup', validarFormulario); //Cuando levante la tecla llamara a la constante validarFormulario
    input.addEventListener('blur', validarFormulario); //Cuando clikee por fuera llamara a la constante validarFormulario


    // input.addEventListener('keyup',() => { //Cuando suelto la tecla presionada se va a ejecutar el siguiente codigo
    //     console.log('Tecla Levantada');
    // });
});

//Cuando el usuario presione el boton hara la funcion tipo flecha
//Agregamos el parametro e, que seria el evento
formulario.addEventListener('submit', (e) => {
    e.preventDefault(); //preventDefault Previene que el usuario envie los datos incompletos

    // Vamos a comprobar que todos los campos se encuentren correctos
    const terminos = document.getElementById('terminos'); // Validacion de terminos y condiciones
    if (campos.usuario && campos.nombre && campos.password && campos.password2 && campos.correo && campos.telefono && terminos.checked) {
        
        formulario.reset();

        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');//Habilita mensaj de formulario enviado
        setTimeout(()=>{
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');//Habilita mensaj de formulario enviado
        },2000); // Esperamos 2 segundos para eliminar el mensaje

        //Por cada icono queremos ejecutar una funcion que por cada icono accedamosa su lista de clases y eliminamos la clase
        //que teniamos en este caso la de .formulario__grupo-correcto para quitar los iconos
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            //icono = identificador del forEach
            icono.classList.remove('formulario__grupo-correcto');
        });

    } else {
        document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
        },5000);
    }
    
});