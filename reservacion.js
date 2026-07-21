// VARIABLES CAMBIANTES //
const nombre = document.getElementById("nombre");
const telefono = document.getElementById("telefono");
const correo = document.getElementById("correo");
const servicio = document.getElementById("servicio");
const fecha = document.getElementById("fecha");
const hora = document.getElementById("hora");
const comentario = document.getElementById("comentario");

const reservacion = document.getElementById("reservacion");
const citaCreada = document.getElementById("citaCreada");

const buscarReferencia = document.getElementById("buscarReferencia");
const buscar = document.getElementById("buscar");
const resultadoBusqueda = document.getElementById("resultadoBusqueda");


let contador = 4;
let editando = false;
let indiceEditar = -1;

//CITAS DE PRUEBA
let citas = [ 
    {
    referencia: "HBR-0001",
    nombre: "Prueba Numero 1",
    telefono: "012-345-6789",
    correo: "prueba1@gmail.com",
    servicio: "corte",
    fecha: "20/07/2026",
    hora: "05:00 PM",
    comentario: "Corte clasico",
   },

   {
    referencia: "HBR-0002",
    nombre: "Prueba Numero 2",
    telefono: "012-345-6789",
    correo: "prueba2@gmail.com",
    servicio: "corte mas barba",
    fecha: "21/07/2026",
    hora: "06:00 PM",
    comentario: "Corte clasico con barba",
   },

    {
    referencia: "HBR-0003",
    nombre: "Prueba Numero 3",
    telefono: "012-345-6789",
    correo: "prueba3@gmail.com",
    servicio: "corte, barba mas facial",
    fecha: "22/07/2026",
    hora: "08:00 PM",
    comentario: "Barba clasica",
   },

];

// EVENTOS PRINCIPALES //
reservacion.addEventListener("click", crearCita);
buscar.addEventListener("click", buscarCita);

function crearCita() {
    if (
        nombre.value == "" ||
        telefono.value == "" ||
        servicio.value == "" ||
        fecha.value == "" ||
        hora.value == ""
    ) {
        alert("Debe completar todos los campos.");
        return;
    }

    if (editando == false) {
        let cita = {
            referencia: "HBR-" + String(contador).padStart(4, "0"),
            nombre: nombre.value,
            telefono: telefono.value,
            correo: correo.value,
            servicio: servicio.value,
            fecha: fecha.value,
            hora: hora.value,
            comentario: comentario.value,
        };

        citas.push(cita);
        contador++;
    } else {
        // CORREGIDO: Se asigna cada valor a su propiedad correspondiente
        citas[indiceEditar].nombre = nombre.value;
        citas[indiceEditar].telefono = telefono.value;
        citas[indiceEditar].correo = correo.value;
        citas[indiceEditar].servicio = servicio.value;
        citas[indiceEditar].fecha = fecha.value;
        citas[indiceEditar].hora = hora.value;
        citas[indiceEditar].comentario = comentario.value;
    }

    mostrarCita();

    // Limpiar formulario (CORREGIDO: comentario.value)
    nombre.value = "";
    telefono.value = "";
    correo.value = "";
    servicio.value = "";
    fecha.value = "";
    hora.value = "";
    comentario.value = "";

    editando = false;
    indiceEditar = -1;
    reservacion.textContent = "Crear cita";
}

function mostrarCita() {

    let cita = citas;
    if(editando){

        cita= citas[indiceEditar];

    } else{

        cita = citas[citas.length - 1];
    }
    citaCreada.innerHTML = `
        <div class="tarjetaCita">
            <h2>Cita Registrada</h2>
            <hr>
            <p><strong>Referencia:</strong> ${cita.referencia}</p>
            <p><strong>Nombre:</strong> ${cita.nombre}</p>
            <p><strong>Teléfono:</strong> ${cita.telefono}</p>
            <p><strong>Correo:</strong> ${cita.correo}</p>
            <p><strong>Servicio:</strong> ${cita.servicio}</p>
            <p><strong>Fecha:</strong> ${cita.fecha}</p>
            <p><strong>Hora:</strong> ${cita.hora}</p>
            <p><strong>Observaciones:</strong> ${cita.comentario}</p>
            <br>
            <button class="b-editar" onclick="editarCita(${editando? indiceEditar: citas.length -1})">✏️ Editar cita</button>
            <button class="b-cancelar" onclick="cancelarCita(${editando? indiceEditar: citas.length -1})">❌ Cancelar cita</button>
        </div>
        `;

}

// EDITAR CITA //
function editarCita(indice) {
    nombre.value = citas[indice].nombre;
    telefono.value = citas[indice].telefono;
    correo.value = citas[indice].correo;
    servicio.value = citas[indice].servicio;
    fecha.value = citas[indice].fecha;
    hora.value = citas[indice].hora;
    comentario.value = citas[indice].comentario;

    editando = true;
    indiceEditar = indice;

    reservacion.textContent = "Guardar cambios";

    const elementoContenido = document.getElementById("contenido");
    if (elementoContenido) {
        elementoContenido.scrollIntoView({ behavior: "smooth" });
    }
}

// CANCELAR CITA //
function cancelarCita(indice) {
    let respuesta = confirm("¿Desea cancelar esta cita?");

    if (respuesta) {
        citas.splice(indice, 1);

        citaCreada.innerHTML = "";
        
        nombre.value = "";
        telefono.value = "";
        correo.value = "";
        servicio.value = "";
        fecha.value = "";
        hora.value = "";
        comentario.value = "";

        editando = false;
        indiceEditar = -1;
        reservacion.textContent = "Crear cita";

        alert("La cita fue cancelada.");
    }
}

// BUSCAR CITA //
function buscarCita() {
    let referencia = buscarReferencia.value.trim();

    if (referencia == "") {
        alert("Ingrese el número de referencia.");
        return;
    }

    let citaEncontrada = citas.find(function(cita) {
        return cita.referencia.toLowerCase() == referencia.toLowerCase();
    });

    if (citaEncontrada) {
        // CORREGIDO: Usar citaEncontrada en lugar de cita
        resultadoBusqueda.innerHTML = `
            <div class="tarjetaCita">
                <h2>Cita encontrada</h2>
                <hr>
                <p><strong>Referencia:</strong> ${citaEncontrada.referencia}</p>
                <p><strong>Nombre:</strong> ${citaEncontrada.nombre}</p>
                <p><strong>Teléfono:</strong> ${citaEncontrada.telefono}</p>
                <p><strong>Correo:</strong> ${citaEncontrada.correo}</p>
                <p><strong>Servicio:</strong> ${citaEncontrada.servicio}</p>
                <p><strong>Fecha:</strong> ${citaEncontrada.fecha}</p>
                <p><strong>Hora:</strong> ${citaEncontrada.hora}</p>
                <p><strong>Observaciones:</strong> ${citaEncontrada.comentario}</p>
            </div>
        `;
    } else {
        resultadoBusqueda.innerHTML = `
            <p>No se encontró ninguna cita con esa referencia.</p>
        `;
    }
}