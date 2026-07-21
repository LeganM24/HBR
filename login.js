if(sessionStorage.getItem("admin") == "true"){

    window.location.href = "admin.html";

}



function iniciarSesion(){

    let usuario = document.getElementById ("usuario").value;
    let clave = document.getElementById("clave") .value;

    if(usuario=== "admin" && clave === "1234"){

        document.getElementById("resultado").textContent = "Bienvenido al sistema.";
        document.getElementById("resultado") .style.color = "green";
   
        sessionStorage.setItem("admin", "true");
        window.location.href = "admin.html";
    

    } else {
      
        document.getElementById("resultado") .textContent = "Usuario o clave incorrecta";
        document.getElementById("resultado") .style.color = "red";
}

}

