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

let colores = ["negro", "azul", "rojo", "verde", "amarillo", "blanco"]; // array de colores para actualizar clase al responder
let colorProgreso = [
  { jugador: 1, 
    progreso: 1},
  
  { jugador: 2, 
    progreso: 1}
]; // array de los dos objetos para actualizar la clase en los bloques

// capturas html
let btnIniciar = document.querySelector("#btnIniciar");
let renderPregunta = document.querySelector("#pregunta");
let inputRespuesta = document.querySelector("#respuesta");
let btnResponder = document.querySelector("#btnResponder");

let jugadorActual = 1; // inicializador de turnos
let mensajes = ["CORRECTO ✅", "INCORRECTO ❌"];
let indice;

btnIniciar.addEventListener("click", () => {
  iniciarBloques()
  mostrarPregunta()
});

// click en Responder captura "respuestaJugador" valule y lo pasa a procesarRespuesta() para comparar con índice
btnResponder.addEventListener("click", () => { 
  let respuestaJugador = inputRespuesta.value;
  procesarRespuesta(respuestaJugador, indice); // variables que pasan su valor a procesarRespuesta()
});

function iniciarBloques(){
  for(let i = 0; i < colorProgreso.length; i++){
    let jugador = colorProgreso[i].jugador;
    let contenedorBloque = document.querySelector(`#bloques${jugador}`);
    let bloque = document.createElement("div");
    bloque.classList.add("bloque", colores[colorProgreso[i].progreso]); // progreso=1 → azul
    contenedorBloque.prepend(bloque);
  }
}

function mostrarPregunta() {
  indice = Math.floor(Math.random() * preguntas.length); // muestra una pregunta aleatoria desde un indice generado aleatoriamente
  renderPregunta.innerText = `Jugador ${jugadorActual}: ${preguntas[indice]}`; // muestra un string que indica quien toca responder y la pregunta al azar
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
  renderPregunta.innerText = "";
  inputRespuesta.value = "";
  mostrarPregunta();  
}


// EN PROCESO
// feedback visual aditar/sustraer bloque de color, la funcion recibe el dato TRUE o FALSE de procesarRespuesta() en su parametro
function moverBloque(jugadorActual, respuestaCorrecta){
  let contenedorBloque = document.querySelector(`#bloques${jugadorActual}`); // capturo div donde se creará el elemento nuevo
  let bloque = document.createElement("div");

  // actualizar progreso con ternario
  (respuestaCorrecta)
  ? colorProgreso[jugadorActual -1].progreso++
  : colorProgreso[jugadorActual -1].progreso--;

  // limito dentro del rango
  if(colorProgreso[jugadorActual -1].progreso <= 0) colorProgreso[jugadorActual -1].progreso = 0;
  if(colorProgreso[jugadorActual -1].progreso >= 6) colorProgreso[jugadorActual -1].progreso = 5;

  // luego, acción visual
  if(respuestaCorrecta){
    // agregar bloque
    bloque.classList.add("bloque", colores[colorProgreso[jugadorActual -1].progreso]);
    contenedorBloque.prepend(bloque);
    } else {
      // quitar bloque
      contenedorBloque.firstChild.remove(bloque);
    }

    console.log(colorProgreso);

 //---- FALTA QUE LOS BLOQUES SE UBIQUEN COMO CORRESPONDE DESDE LA BASE HACIA ARRIBA ----//
}

// si jugador1 es TRUE cambia el turno al oponente
function cambiarTurno() {
  jugadorActual = (jugadorActual === 1) ? 2 : 1;
}