var pantalla = document.querySelector("#canvas");
var pincel = pantalla.getContext("2d");
//dibujar un triangulo
function dibujarTriuangulo() {
    pincel.fillStyle = "red";
    pincel.beginPath();
    pincel.moveTo(70, 360);
    pincel.lineTo(30, 390);
    pincel.lineTo(110, 390);
    pincel.fill();
}
//dibujar el muñeco

// dibujar el palo 1
function dibujarPoste1() {
    pincel.fillStyle = "red";
    pincel.fillRect(67, 365, 5, -305);
}

// dibujar el palo 2
function dibujarPoste2() {
    pincel.fillStyle = "red";
    pincel.fillRect(67, 55, 200, 5);
}

// dibujar el palo 3
function dibujarPoste3() {
    pincel.fillStyle = "red";
    pincel.fillRect(265, 55, 5, 50);
}
//dibujarCabeza
function dibujarCabeza() {
    pincel.beginPath();
    pincel.arc(270, 140, 35, 0, Math.PI * 2);
    pincel.fill();
}
// dibujar el palo cuerpo
function dibujarCuerpo() {
    pincel.fillStyle = "red";
    pincel.fillRect(270, 175, 5, 80);
}

//dibujar brazo izquierdo
function dibujarBrazoIzquierdo() {
    pincel.beginPath();
    pincel.moveTo(275, 200);
    pincel.strokeStyle = "red";
    pincel.lineWidth = 5;
    pincel.lineTo(230, 160);
    pincel.stroke();
}


//dibujar brazo derecho
function dibujarBrazoDerecho() {
    pincel.beginPath();
    pincel.moveTo(270, 200);
    pincel.strokeStyle = "red";
    pincel.lineWidth = 5;
    pincel.lineTo(320, 160);
    pincel.stroke();
}


//dibujar pierna izquierda
function dibujarPiernaIzquierda() {
    pincel.beginPath();
    pincel.moveTo(274, 254);
    pincel.strokeStyle = "red";
    pincel.lineWidth = 5;
    pincel.lineTo(220, 300);
    pincel.stroke();
}


//dibujar pierna derecha
function dibujarPiernaDerecha() {
    pincel.beginPath();
    pincel.moveTo(274, 254);
    pincel.strokeStyle = "red";
    pincel.lineWidth = 5;
    pincel.lineTo(320, 300);
    pincel.stroke();
}