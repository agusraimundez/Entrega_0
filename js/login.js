function login(){

    let usuario = document.getElementById('username').value;
    let clave = document.getElementById('clave').value;

    if(usuario==="" || clave==""){
        Swal.fire({
            icon: 'Error',
            title: 'Oops...',
            text: 'Complete los campos de email y clave!',
          })
    }else{
        localStorage.setItem("username", usuario);
        window.location.href="index.html";//si no tengo campos vacios redirigo a index
    }
}



document.addEventListener('DOMContentLoaded',()=>{

    document.getElementById('inicio').addEventListener('click',()=>{
        login();
    })

    
})