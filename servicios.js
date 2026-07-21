let slides = document.querySelectorAll ("#slider img");

let indice = 0;


slides[0].classList.add("activo");



function cambiarSlide(){

    slides[indice].classList.remove("activo");

    indice ++;

    if(indice >= slides.length){

        indice = 0;
    }

    slides[indice].classList.add("activo");

}

setInterval(cambiarSlide , 5000);
