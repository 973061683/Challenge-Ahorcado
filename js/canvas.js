var pantalla = document.querySelector("#canvas");
var pincel = pantalla.getContext("2d");

//INICIO:declaración de variables
var palabra = "";
var x = 350;
var letrasRepetidasErradas = [];
var letrasRepetidasAcertadas = [];
var palabras = ["kamiilla", "fioreella", "dayyana"];
var intentos = 0;
var arrarPosicionesExisten = [];
var isPlaying = false;
//FIN:declaración de variables

//INICIO: llamar al evento del boton
var btnJugar = document.querySelector(".btnJugar");
btnJugar.onclick = iniciarJuego;
//FIN: llamar al evento del boton

//INICIO: Función iniciarJuego
function iniciarJuego() {
    isPlaying = true;
    sortearPalabras();
    ingresarLetraTeclado();


}
//FIN: Función iniciarJuego

//INICIO: funcion sortear palabra
function sortearPalabras() {
    intentos = 0;
    letrasRepetidasAcertadas = [];
    arrarPosicionesExisten = [];
    letrasRepetidasErradas = [];
    dibujarCanvas();
    var palabraEscogida = Math.floor(Math.random(palabras) * palabras.length);

    for (var i = 0; i < palabras.length; i++) {
        var posocion = i;
        if (posocion == palabraEscogida) {
            palabra = palabras[palabraEscogida];
        }
    }
}
//FIN: funcion sortear palabra


//INCIO: didujar canvas
function dibujarCanvas() {
    pantalla.focus();
    pincel.fillStyle = "green";
    pincel.fillRect(0, 0, 700, 400);
}

//FIN: didujar canvas

//INICIO: funcion keyup
function ingresarLetraTeclado() {

    pantalla.addEventListener('keyup', function (event) {
        if (isPlaying) {
            event.preventDefault();
            var codigoLetra = event.keyCode;
            var letra = event.key;
            var caracterValido = new RegExp('[A-Z]', 'i');
            if (codigoLetra >= 65 && codigoLetra <= 95 && caracterValido.test(letra)) {
                dibujarLetras(letra, x);
            }
        }
    });


}

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
                isPlaying = false;

            }
            return;
        }
    }

}
//FIN: verificar letrasRepetidasErradas

//INICIO: Dibujar las letras en el canvas
function dibujarPalabraEnCanvas(posiciones) {
    var palabraSeleccionada = palabra.toUpperCase();
    for (var j = 0; j < posiciones.length; j++) {
        var xAcertadas = 150;
        // recorrer palabra elegida para ver en que psoisicion pintamos las letras en el canvas

        for (var i = 0; i < palabraSeleccionada.length; i++) {
            var posisionExiste = i;
            var letraExiste = palabraSeleccionada[i];
            if (posiciones[j] == posisionExiste &&
                !arrarPosicionesExisten.includes(posiciones[j])) {

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
            isPlaying = false;
        }
    }

}
//FIN: Dibujar las letras en el canvas



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