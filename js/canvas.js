var pantalla = document.querySelector("#canvas");
var pincel = pantalla.getContext("2d");

//INICIO:declaración de variables
var palabra = "";
var x = 350;
var letrasRepetidasErradas = [];
var letrasRepetidasAcertadas = [];
var palabras = ["kamiilla", "fioreella", "dayyana"];
var intentos = 0;
var arrarPosicionesExisten=[];
var main= document.querySelector(".contenido");
//FIN:declaración de variables
function desactivar(){
    main.classList.add("not-active");
}
desactivar();
//INICIO: llamar al evento del boton
var btnJugar = document.querySelector(".btnJugar");
btnJugar.onclick = sortearPalabras;
//FIN: llamar al evento del boton

//INICIO: funcion sortear palabra
function sortearPalabras() {
    intentos = 0;
    letrasRepetidasAcertadas = [];
    arrarPosicionesExisten=[];
    letrasRepetidasErradas=[];
    dibujarCanvas();
    var itemSeleccionado = Math.floor(Math.random(palabras) * palabras.length);

    for (var i = 0; i < palabras.length; i++) {
        var posocion = i;
        if (posocion == itemSeleccionado) {
            palabra = palabras[itemSeleccionado];
        }
    }
}
//FIN: funcion sortear palabra


//INCIO: didujar canvas
function dibujarCanvas() {
    main.classList.remove("not-active");
    pantalla.focus();
    pincel.fillStyle = "green";
    pincel.fillRect(0, 0, 700, 400);
}

//FIN: didujar canvas

//INICIO: funcion keyup
pantalla.addEventListener('keyup', function (event) {
    event.preventDefault();
    var codigoLetra = event.keyCode;
    var letra=event.key;
    var caracterValido = new RegExp('[A-Z]', 'i');
    if(codigoLetra >= 65 && codigoLetra <= 95 && caracterValido.test(letra)){
        dibujarLetras(letra, x);
    }
});
//FIN: funcion keyup

//INICIO:verificar letrasRepetidasErradas

function dibujarLetras(letraIngresada, intervalo) {
    var existeLetra = verificarLetraEnPalabraSorteada(letraIngresada);

    if (existeLetra.length > 0) {
        var arrayPosiciones = [];
        //si existen letras en la palabra sorteada
        for (var i = 0; i < existeLetra.length; i++) {
            var posision = existeLetra[i].substr(-1);
            arrayPosiciones.push(posision);

        }
        dibujarPalabraEnCanvas(arrayPosiciones);
    } else {
        //no existen letras en la palabra sorteada
        if (!letrasRepetidasErradas.includes(letraIngresada)) {
            pincel.fillStyle = "black";
            pincel.font = "30px Verdana";
            pincel.fillText(letraIngresada, intervalo, 180);
            x = x + 25;
            letrasRepetidasErradas.push(letraIngresada);
            intentos = intentos + 1;
            var mensaje = dibujarAhorcado(intentos);
            if (mensaje == "ahorcado") {
                pincel.fillStyle = "black";
                pincel.font = "20px Verdana";
                pincel.fillText("PERDISTE¡¡: FIN DEL JUEGO", 400, 80);
                desactivar();

            }
            return;
        }
    }

}
//FIN: verificar letrasRepetidasErradas

//INICIO: Dibujar las letras en el canvas
function dibujarPalabraEnCanvas(posiciones) {
    var palabraSeleccionada = palabra.toUpperCase();
    var contarLetras = contarLetrasRepetidasEnPalabraSeleccionda(palabraSeleccionada);
    
    // verificar si la letra de la palabra se repite
    for (var element in contarLetras) {
        var cantidad = contarLetras[element];
        var letra = element;
        if (cantidad > 1) {
            console.log("cantidad:" + cantidad);
            console.log("Letra:" + letra);
        }
    }

    for (var j = 0; j < posiciones.length; j++) {
        var xAcertadas = 150;
        // recorrer palabra elegida para ver en que psoisicion pintamos las letras en el canvas

        for (var i = 0; i < palabraSeleccionada.length; i++) {
            var posisionExiste = i;
            var letraExiste = palabraSeleccionada[i];
            if (posiciones[j] == posisionExiste
                && !arrarPosicionesExisten.includes(posiciones[j])) {

                pincel.fillStyle = "black";
                pincel.font = "30px Verdana";
                pincel.fillText(letraExiste, xAcertadas, 370);
                arrarPosicionesExisten.push(posiciones[j]);
                letrasRepetidasAcertadas.push(letraExiste);
            }

            pincel.fillStyle = "red";
            pincel.fillRect(xAcertadas, 380, 40, 10);
            xAcertadas = xAcertadas + 50;
        }
        if (letrasRepetidasAcertadas.length == palabraSeleccionada.length) {
            pincel.fillStyle = "black";
            pincel.font = "30px Verdana";
            pincel.fillText("Usted Ganó", 350, 100);
            desactivar();
        }
    }

}
//FIN: Dibujar las letras en el canvas


//INICIO: verificar cuantas veces se repite una letra en la plabra seleccionada
function contarLetrasRepetidasEnPalabraSeleccionda(palabraSeleccionda) {
    var caracteresagrupados = palabraSeleccionda.split("");
    var contletras = {};
    for (var i in caracteresagrupados) {
        contletras[caracteresagrupados[i]] = (contletras[caracteresagrupados[i]] || 0) + 1;
    }
    return contletras;

}
//FIN: verificar cuantas veces se repite una letra en la plabra seleccionada


//INICIO: Verificar si la letra ingresada por el usuario esta en la palabra sorteada
function verificarLetraEnPalabraSorteada(teclado) {
    var letra = teclado.toUpperCase();
    var letrasExisten = [];
    var palabraSorteada = palabra.toUpperCase();
    for (var i = 0; i < palabraSorteada.length; i++) {
        if (letra == palabraSorteada[i]) {
            letrasExisten.push(letra + i);
        }
    }

    return letrasExisten;


}
//FIN: Verificar si la letra ingresada por el usuario esta en la palabra sorteada


//INICIO: Funcion dibujar ahorcado
function dibujarAhorcado(intento) {
    var mensaje = "";
    switch (intento) {
        case 1:
            dibujarTriuangulo();
            break;
        case 2:
            dibujarPoste1();
            break;
        case 3:
            dibujarPoste2();
            break;
        case 4:
            dibujarPoste3();
            break;
        case 5:
            dibujarCabeza();
            break;
        case 6:
            dibujarCuerpo();
            break;
        case 7:
            dibujarBrazoIzquierdo();
            break;
        case 8:
            dibujarBrazoDerecho();
            break;
        case 9:
            dibujarPiernaIzquierda();
            break;
        case 10:
            dibujarPiernaDerecha();
            mensaje = "ahorcado"
            break;
    }
    return mensaje;
}

//INICIO: Agregar palabra nueva

function agregarPalabra() {
    var palabra = document.querySelector("#palabra");
    var palabraIngresada = palabra.value;
    if (palabraIngresada != "") {
        //verificar si existe palabra en el arreglo
        if (!palabras.includes(palabraIngresada)) {
            palabras.push(palabraIngresada);
            palabra.value = "";
        }
    }

}

var btnAgregar = document.querySelector(".btnAgregar");
btnAgregar.onclick = agregarPalabra;
//FIN: Agregar palabra nueva
