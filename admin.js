
if (sessionStorage.getItem("admin") !="true"){

    window.location.href = "login.html";
}


const cerrarSesion = document.getElementById("cerrarSesion");
cerrarSesion.addEventListener("click", salir);

function salir(event){

    event.preventDefault();
    sessionStorage.removeItem("admin");
    window.location.href ="login.html";
}


