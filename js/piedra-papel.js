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
const puntajeDos = document.querySelector("#puntajeDos");
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
// Función que compara las dos cartas de esa ronda y muestra el resultado
function resolverRonda(i) {
	const cartaA = jugadorUno[i];
	const cartaB = jugadorDos[i];
	let resultado;
 
	if (cartaA === cartaB) {
		resultado = "Empate: los dos jugaron " + cartaA;
	} else if (cartaA === "piedra" && cartaB === "tijera") {
		ContadorJugadorUno++;
		resultado = "Gano el Jugador Uno: piedra rompe tijera";
	} else if (cartaA === "papel" && cartaB === "piedra") {
		ContadorJugadorUno++;
		resultado = "Gano el Jugador Uno: papel envuelve piedra";
	} else if (cartaA === "tijera" && cartaB === "papel") {
		ContadorJugadorUno++;
		resultado = "Gano el Jugador Uno: tijera corta papel";
	} else {
		ContadorJugadorDos++;
		resultado = "Gano el Jugador Dos: " + cartaB + " le gana a " + cartaA;
	}
 
	console.log(resultado);
	resultadoUno.textContent = resultado;
	resultadoDos.textContent = resultado;
	puntaje.textContent = ContadorJugadorUno + " vs " + ContadorJugadorDos;
    puntajeDos.textContent = ContadorJugadorUno + " vs " + ContadorJugadorDos;
}
// botones de cartas primer jugador 
bntPapel.addEventListener("click",function(){
    validador("Uno", "papel")
});
bntRoca.addEventListener("click",function(){
     validador("Uno", "piedra")
});
bntTijera.addEventListener("click",function(){
    validador("Uno", "tijera")
});

// botones segundo jugador 
bntPapelDos.addEventListener("click",function(){
    validador("Dos", "papel")
});
bntRocaDos.addEventListener("click",function(){
     validador("Dos", "piedra")
});
bntTijeraDos.addEventListener("click",function(){
    validador("Dos", "tijera")
});
