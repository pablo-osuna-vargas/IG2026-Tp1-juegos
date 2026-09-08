// Arrays base
let preguntas = [
  "¿Capital de Argentina?",
  "¿2 + 2?",
  "¿Color del cielo en un día despejado?",
  "¿Lenguaje que usamos en este proyecto?"
];

let respuestas = [
  "Buenos Aires",
  "4",
  "Azul",
  "Java"
];

let btnIniciar = document.querySelector("#btnIniciar");
btnIniciar.addEventListener("click", () => {mostrarPregunta()});
let renderPregunta = document.querySelector("#pregunta");
let inputRespuesta = document.querySelector("#respuesta");
let btnResponder = document.querySelector("#btnResponder");

let jugadorActual = 1;
let mensajes = ["CORRECTO ✅", "INCORRECTO ❌"];

function mostrarPregunta() {
  let indice = Math.floor(Math.random() * preguntas.length); // muestra una pregunta aleatoria desde un indice generado aleatoriamente
  renderPregunta.innerText = `Jugador ${jugadorActual}: ${preguntas[indice]}`; // muestra un string que indica quien toca responder y la pregunta al azar

  // al cliquear en Responder capturo el valor de "respuestaJugador" y se lo paso a la funcion procesarRespuesta() para comparar con índice
  btnResponder.addEventListener("click", () => { 
    let respuestaJugador = inputRespuesta.value;
    procesarRespuesta(respuestaJugador, indice); // variables que pasan su valor a procesarRespuesta()
  });
}

function procesarRespuesta(respuestaJugador, indice) {
  let mensajeMuestra = document.querySelector("#mensajes"); // capturo elemento para mostrar mensaje en pantalla 
  let respuestaCorrecta = (respuestaJugador === respuestas[indice]); // variable booleana para saber si suma o resta bloques en la función siguiente

  // op ternario: si la respuesta coincide con la correcta muestra dinámicamente mensaje de CORRECTO, de lo contrario mensaje de INCORRECTO
  mensajeMuestra.innerText = (respuestaJugador === respuestas[indice]) 
  ? `Jugador ${jugadorActual} CORRECTO ✅`
  : `Jugador ${jugadorActual} INCORRECTO ❌`;

  mensajeMuestra.style.display = "block"; // muestro mensaje luego de verificar pregunta

  moverBloque(jugadorActual, respuestaCorrecta); // variable que pasa su valor a la funcion moverBloque()
  cambiarTurno();
  mostrarPregunta();  
}


// EN PROCESO
// feedback visual aditar/sustraer bloque de color, la funcion recibe el dato TRUE o FALSE de procesarRespuesta() en su parametro
function moverBloque(jugadorActual, respuestaCorrecta){
  let colores = ["negro", "azul", "rojo", "verde", "amarillo", "blanco"]; // array de colores para actualizar clase al responder
  let indiceColores = 1; // azul

  (respuestaCorrecta) ? indiceColores++ : indiceColores--;

  let contenedorBloque = document.querySelector(`#bloques${jugadorActual}`);
  let bloque = document.createElement("div");
  bloque.classList.add("bloque", colores[indiceColores]);
  contenedorBloque.prepend(bloque);
}

// si jugador1 es TRUE cambia el turno al oponente
function cambiarTurno() {
  jugadorActual = (jugadorActual === 1) ? 2 : 1;
}