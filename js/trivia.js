// Arrays base
const preguntas = [
  "¿Capital de Argentina?",
  "¿2 + 2?",
  "¿Color del cielo en un día despejado?",
  "¿Lenguaje que usamos en este proyecto?"
];

const respuestas = [
  "Buenos Aires",
  "4",
  "Azul",
  "Java"
];

const colores = ["negro", "azul", "rojo", "verde", "amarillo", "blanco"]; // array de colores para actualizar clase al responder
const colorProgreso = [
  { jugador: 1, 
    progreso: 1},
  
  { jugador: 2, 
    progreso: 1}]; // array de los dos objetos para actualizar la clase en los bloques

// capturas html
const btnIniciar = document.querySelector("#btnIniciar");
const renderPregunta = document.querySelector("#pregunta");
const inputRespuesta = document.querySelector("#respuesta");
const btnResponder = document.querySelector("#btnResponder");
const btnReiniciar = document.querySelector("#btnReiniciar");

let jugadorActual = 1; // inicializador de turnos
let mensajes = ["CORRECTO ✅", "INCORRECTO ❌"];
let indice;

// botones
btnIniciar.disabled = false;
btnResponder.disabled = true;

btnIniciar.addEventListener("click", () => {
  iniciarBloques(); 
  mostrarPregunta();
  btnIniciar.disabled = true;
  btnResponder.disabled = false
});
// captura valor de "respuestaJugador" y lo pasa a procesarRespuesta()
btnResponder.addEventListener("click", () => {
  let respuestaJugador = inputRespuesta.value; 
  procesarRespuesta(respuestaJugador, indice);
});
btnReiniciar.addEventListener("click", () => location.reload());


// bloque de FUNCIONES
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

  moverBloque(jugadorActual, respuestaCorrecta); // variables que pasan su valor a la funcion moverBloque()
  verificarObjetivo(jugadorActual, colores[colorProgreso[jugadorActual -1].progreso]); // chequeo de partida: victoria, derrota, return
  cambiarTurno();
    renderPregunta.innerText = "";
    inputRespuesta.value = "";
  mostrarPregunta();  
}

// feedback visual, si respuestaCorrecta TRUE agrega un bloque, sino lo quita
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
    bloque.classList.add("bloque", colores[colorProgreso[jugadorActual -1].progreso]); // agregar bloque encima del color de progreso
    contenedorBloque.prepend(bloque);
    } else if(colorProgreso[jugadorActual -1].progreso === 0){
        contenedorBloque.removeChild(contenedorBloque.firstChild); // si llegó a 0 borra el primer hijo y dibuja bloque negro
        let bloqueNegro = document.createElement("div");
        bloqueNegro.classList.add("bloque", "negro");
        contenedorBloque.prepend(bloqueNegro);
      } else {
        if(contenedorBloque.firstChild){
          contenedorBloque.removeChild(contenedorBloque.firstChild); // si falló pero no llegó a 0 quita primer bloque
        }
      }

  console.log(colorProgreso);
}

// si jugador1 TRUE cambia el turno al oponente
function cambiarTurno() {
  jugadorActual = (jugadorActual === 1) ? 2 : 1;
}

// verifica estado de juego: gano, perdio, reinicio
function verificarObjetivo(jugadorActual, color){
  if(color === "blanco"){
    let mensaje = document.querySelector("#mensajes");
    mensaje.innerText = `Jugador ${jugadorActual} ganó!`
    mensaje.classList.add("mensajeGrande", "mensajeGanador");
    btnIniciar.disabled = true;
    btnResponder.disabled = true;
    return;
  }

  if(color === "negro"){
    let mensaje = document.querySelector("#mensajes");
    mensaje.innerText = `Jugador ${jugadorActual} perdió!`
    mensaje.classList.add("mensajeGrande", "mensajePerdedor");
    btnIniciar.disabled = true;
    btnResponder.disabled = true;
    return;
  }

  renderPregunta.innerText = "";
  inputRespuesta.value = "";
  mostrarPregunta();  
}