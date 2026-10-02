const pleyerUno = prompt("¿Quién es el Jugador 1?");
const pleyerDos = prompt("¿Quién es el Jugador 2?");
// Referencias a los botones que disparan la acción
const bntJugar = document.querySelector("#btJugar");
const bntSiguiente = document.querySelector("#btcSig");
const bntAtras = document.querySelector("#atras");
const bntInicio = document.querySelector("#inicio");
// Referencias a las secciones que se muestran/ocultan
const play = document.querySelector("#play");
const reglas = document.querySelector("#reglas");
const tablero = document.querySelector("#tableroUno");
const tableroDos = document.querySelector("#tablero-dos");
const pantallaGanaste = document.querySelector("#ganaste");

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
pantallaGanaste.style.display = "none";

// puntaje
const puntajeDos = document.querySelector("#puntaje-dos");
const puntaje = document.querySelector("#puntaje");
const resultadoUno =document.querySelector("#orden");
const resultadoDos =document.querySelector("#orden-dos");
const turnoUno =  document.querySelector("#turno");
const turnoDos = document.querySelector("#turno-dos");
const ganador = document.querySelector("#ganador");


// 1 Click en "Jugar" -> oculta la pantalla inicial y muestra las reglas
bntJugar.addEventListener("click", () => {
	play.style.display = "none";
	reglas.style.display = "block";
});

// 2 Click en "Siguiente" (dentro de las reglas) -> oculta las reglas y arranca el juego
bntSiguiente.addEventListener("click", () => {
	reglas.style.display = "none";
	tablero.style.display = "block";
});

turnoDos.innerText = "Elije "+ pleyerDos + " una Carta";
turnoUno.innerText = "Elije "+ pleyerUno + " una Carta";
// Juego
const opciones = ["piedra", "papel", "tijera"]; // cada una le gana a la anterior (con vuelta)
const puntosParaGanar = 3;
let jugadorUno = []; // historial de cartas del Jugador Uno
let jugadorDos = []; // historial de cartas del Jugador Dos
let contadorJugadorUno = 0;
let contadorJugadorDos = 0;
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
		contadorJugadorUno++;
		resultado = "Gano la ronda"+ pleyerUno +" : piedra rompe tijera";
	} else if (cartaA === "papel" && cartaB === "piedra") {
		contadorJugadorUno++;
		resultado = "Gano la ronda"+ pleyerUno +": papel envuelve piedra";
	} else if (cartaA === "tijera" && cartaB === "papel") {
		contadorJugadorUno++;
		resultado = "Gano la ronda"+ pleyerUno +" : tijera corta papel";
	} else {
		contadorJugadorDos++;
		resultado = "Gano la ronda"+ pleyerDos + " : " + cartaB + " le gana a " + cartaA ;
	}
 
	console.log(resultado);
	resultadoUno.innerText= resultado;
	resultadoDos.innerText= resultado;
	puntaje.innerText = contadorJugadorUno + " vs " + contadorJugadorDos;
    puntajeDos.innerText = contadorJugadorUno + " vs " + contadorJugadorDos;

      if (contadorJugadorUno === 3) {
		ganador.innerText = pleyerUno +" Gano la partida" ;
		pantallaGanaste.style.display = "block";
		tablero.style.display = "none";
		tableroDos.style.display = "none";

	} else if (contadorJugadorDos === 3) {
		ganador.innerText = pleyerDos +" Gano la partida"
		pantallaGanaste.style.display = "block";
	    tablero.style.display = "none";
		tableroDos.style.display = "none";
	}
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

bntInicio.addEventListener("click",function(){
   	play.style.display = "block";
	tableroDos.style.display = "none";
	reglas.style.display = "none";
	tablero.style.display = "none";
	pantallaGanaste.style.display = "none";
	reinicio()
});
function reinicio(){
	jugadorUno = []; 
    jugadorDos = []; 
    contadorJugadorUno = 0;
    contadorJugadorDos = 0;
	puntaje.innerText ="0 vs 0" ;
    puntajeDos.innerText ="0 vs 0" ;
}