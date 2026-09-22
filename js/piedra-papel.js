// Referencias a los botones que disparan la acción
const btnJugar = document.querySelector("#btJugar");
const btnSiguiente = document.querySelector("#btcSig");
const btnAtras = document.querySelector("#atras");

// Referencias a las secciones que se muestran/ocultan
const play = document.querySelector("#play");
const reglas = document.querySelector("#reglas");
const tablero = document.querySelector("#tablero");

reglas.style.display = "none";
tablero.style.display = "none";
// 1) Click en "Jugar" -> oculta la pantalla inicial y muestra las reglas
btnJugar.addEventListener("click", () => {
	play.style.display = "none";
	reglas.style.display = "block";
});

// 2) Click en "Siguiente" (dentro de las reglas) -> oculta las reglas y arranca el juego
btnSiguiente.addEventListener("click", () => {
	reglas.style.display = "none";
	tablero.style.display = "block";
});

