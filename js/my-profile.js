/*let base64String = "";

function Uploaded() {
	let file = document.querySelector(
		'input[type=file]')['files'][0];
	let reader = new FileReader();
	reader.onload = function () {
		base64String = reader.result.replace("data:", "")
			.replace(/^.+,/, "");
		imageBase64Stringsep = base64String;
	}
	reader.readAsDataURL(file);
}*/

document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("usuario").innerHTML= localStorage.getItem("username");
    let infoUsuario = [];
    
    (function () {
        'use strict'

        var forms = document.querySelectorAll('.needs-validation')


        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
    })()

    document.getElementById("emailU").value = localStorage.getItem("username");
    document.getElementById('guardarCambios').addEventListener('click', () => {


        let primerNombre = document.getElementById("primerNombre").value
        let primerApellido = document.getElementById("primerApellido").value
        let email = document.getElementById("emailU").value
        let segundoNombre = document.getElementById("segundoNombre").value
        let segundoApellido = document.getElementById("segundoApellido").value
        let contacto = document.getElementById("telContacto").value

        if (primerNombre != "" && primerApellido != "" && contacto != "") {// si los campos obligatorios estan llenos

            
            infoUsuario.push(primerNombre)
            infoUsuario.push(primerApellido)
            infoUsuario.push(segundoNombre)
            infoUsuario.push(segundoApellido)
            infoUsuario.push(contacto )
            infoUsuario.push(email)
            localStorage.setItem("infoUsuario", JSON.stringify(infoUsuario));// los guardo en local storage
        }
        if (document.getElementById("imagenUsuario").files.length != 0) {// si hay una imagen la guardo

            localStorage.setItem("imagenPerfil", base64String);
        }

    })

    let datosLocal = localStorage.getItem('infoUsuario');
    datosArray = JSON.parse(datosLocal);
    let imagenP = localStorage.getItem('imagenPerfil');
    let base64text= "data:image/png;base64, ";
    let srcimagen= imagenP+base64text;

   
    if (datosLocal != null) {// si es la segunda vez que ingresa muestro todos los datos


        document.getElementById("primerNombre").value = datosArray[0];
        document.getElementById("primerApellido").value = datosArray[1];
        document.getElementById("segundoNombre").value = datosArray[2];
        document.getElementById("segundoApellido").value = datosArray[3];
        document.getElementById("telContacto").value = datosArray[4];
        //document.getElementById("fotoPerfil").src = srcimagen;

    }


});

