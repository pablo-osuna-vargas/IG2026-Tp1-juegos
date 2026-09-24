// Referencias a los botones que disparan la acción
const btnJugar = document.querySelector("#btJugar");
const btnSiguiente = document.querySelector("#btcSig");
const btnAtras = document.querySelector("#atras");

// Referencias a las secciones que se muestran/ocultan
const play = document.querySelector("#play");
const reglas = document.querySelector("#reglas");
const tablero = document.querySelector("#tableroUno");
const tableroDos = document.querySelector("#tableroDos");

// Referencias a las secciones cartas
const bntPapel = document.querySelector("#papel");
const bntRoca = document.querySelector("#piedra");
const bntTijera = document.querySelector("#tijera");
const bntPapelDos = document.querySelector("#papelDos");
const bntRocaDos = document.querySelector("#piedraDos");
const bntTijeraDos = document.querySelector("#tijeraDos");

tableroDos.style.display = "none";
reglas.style.display = "none";
tablero.style.display = "none";

// puntaje
const puntaje = document.querySelector("#puntaje");
const resultadoUno =document.querySelector("#orden");
const resultadoDos =document.querySelector("#ordenDos");
// 1 Click en "Jugar" -> oculta la pantalla inicial y muestra las reglas
btnJugar.addEventListener("click", () => {
	play.style.display = "none";
	reglas.style.display = "block";
});

// 2 Click en "Siguiente" (dentro de las reglas) -> oculta las reglas y arranca el juego
btnSiguiente.addEventListener("click", () => {
	reglas.style.display = "none";
	tablero.style.display = "block";
});

// Juego
const opciones = ["piedra", "papel", "tijera"]; // cada una le gana a la anterior (con vuelta)
const puntosParaGanar = 3;
let jugadorUno = []; // historial de cartas del Jugador Uno
let jugadorDos = []; // historial de cartas del Jugador Dos
let ContadorJugadorUno = 0;
let ContadorJugadorDos = 0;
let juegoTerminado = 0;
 
function validador (jugador,carta) {
    if (jugador === "Uno"){
      	jugadorUno.push(carta);
		console.log("Jugador Uno jugó " + carta);
		tablero.style.display = "none";
		tableroDos.style.display = "block";
        console.log(jugadorUno)
    }else {
        jugadorDos.push(carta)
		console.log("Jugador Dos jugó " + carta);
        tableroDos.style.display = "none";
	    tablero.style.display = "block";
        console.log(jugadorDos)
        resolverRonda(jugadorUno.length - 1);
    }
}



// botones de cartas primer jugador 
bntPapel.addEventListener("click",function(){
    validador("Uno", "Papel")
});
bntRoca.addEventListener("click",function(){
     validador("Uno", "Piedra")
});
bntTijera.addEventListener("click",function(){
    validador("Uno", "Tijera")
});

// botones segundo jugador 
bntPapelDos.addEventListener("click",function(){
    validador("Dos", "Papel")
});
bntRocaDos.addEventListener("click",function(){
     validador("Dos", "Piedra")
});
bntTijeraDos.addEventListener("click",function(){
    validador("Dos", "Tijera")
});
