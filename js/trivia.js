// Arrays base
const preguntas = [
  "¿Capital de Argentina?",
  "¿2 + 2?",
  "¿Color del cielo en un día despejado?",
  "¿País en el que vivimos?",
  "¿Capital de Brasil?",
  "¿Animal que dice 'miau'?",
  "¿5 x 3?",
  "¿Color de una banana madura?",
  "¿Idioma que usamos?",
  "¿Capital de España?",
  "¿Planeta más cercano al Sol?",
  "¿Día que sigue al lunes?",
  "¿Instrumento musical con teclas blancas y negras?",
  "¿Capital de Chile?",
  "¿Número de lados de un triángulo?"
];

const respuestas = [
  "Buenos Aires",
  "4",
  "Azul",
  "Argentina",
  "Brasilia",
  "Gato",
  "15",
  "Amarillo",
  "Castellano",
  "Madrid",
  "Mercurio",
  "Martes",
  "Piano",
  "Santiago",
  "3"
];

const colores = ["negro", "azul", "rojo", "verde", "amarillo", "blanco"]; // array de colores para actualizar clase al responder
const colorProgreso = [
  { jugador: 1, 
    progreso: 1}, // da inicio con el bloque azul en ambos jugadores
  
  { jugador: 2, 
    progreso: 1}]; // inicio en bloque azul
let indice; // indice para el colorProgreso que se actualiza en cada ronda de respuestas

// capturas HTML
const btnIniciar = document.querySelector("#btnIniciar");
const renderPregunta = document.querySelector("#pregunta");
const inputRespuesta = document.querySelector("#respuesta");
const btnResponder = document.querySelector("#btnResponder");
const btnReiniciar = document.querySelector("#btnReiniciar");

let jugadorActual = 1; // inicializador de turnos
let mensajes = ["CORRECTO ✅", "INCORRECTO ❌"];

// botones estado inicial
btnIniciar.disabled = false;
btnResponder.disabled = true;
inputRespuesta.disabled = true;

btnIniciar.addEventListener("click", () => {
  iniciarBloques(); 
  mostrarPregunta();
  btnIniciar.disabled = true;
  btnResponder.disabled = false;
  inputRespuesta.disabled = false
});

let formRespuesta = document.querySelector("form"); // captura valor de "respuestaJugador" y lo pasa a procesarRespuesta()
  formRespuesta.addEventListener("submit", function(responder) {
  responder.preventDefault(); // como es un submit evita la recarga de la página
  let respuestaJugador = inputRespuesta.value; 
  procesarRespuesta(respuestaJugador, indice);
});

btnReiniciar.addEventListener("click", () => location.reload());


// FUNCIONES
// inicia con un bloque azul en cada jugador
function iniciarBloques(){
  for(let i = 0; i < colorProgreso.length; i++){
    let jugador = colorProgreso[i].jugador; // define quien está jugando según indice "i"
    let contenedorBloque = document.querySelector(`#bloques${jugador}`); // selecciona bloque para jugador 1 o 2
    let bloque = document.createElement("div"); // crea un div virtual
    bloque.classList.add("bloque", colores[colorProgreso[i].progreso]); // agrega la clase con el color (ej: .progreso=1 es azul)
    contenedorBloque.prepend(bloque); // crea un bloque encima de otro
  }
}

function mostrarPregunta() {
  indice = Math.floor(Math.random() * preguntas.length); // muestra una pregunta aleatoria del array 
  renderPregunta.innerText = `Jugador ${jugadorActual}: ${preguntas[indice]}`; // muestra un string que indica quien toca responder y la pregunta al azar
}

function procesarRespuesta(respuestaJugador, indice) {
  let mensajeMuestra = document.querySelector("#mensajes"); // capturo elemento para mostrar mensaje
  let respuestaCorrecta = (respuestaJugador.toLowerCase() === respuestas[indice].toLowerCase()); // variable TRUE/FALSE para saber si suma o resta bloques. Compara en minusculas para evitar errores de escritura

  // op ternario: si respuestaCorrecta = true muestra mensaje CORRECTO, de lo contrario INCORRECTO
  mensajeMuestra.innerText = respuestaCorrecta 
  ? `Jugador ${jugadorActual} CORRECTO ✅`
  : `Jugador ${jugadorActual} INCORRECTO ❌`;
  mensajeMuestra.style.display = "block"; // muestro mensaje luego de verificar pregunta

  // agrega o quita un blque segun respuesta. Verificación de fin de partida o nueva ronda
  moverBloque(jugadorActual, respuestaCorrecta); // variables que pasan su valor a la funcion moverBloque()
  verificarObjetivo(jugadorActual, colores[colorProgreso[jugadorActual -1].progreso]);

  // solo cambia de turno si el jugador actual responde Incorrectamente
  if(respuestaCorrecta){ 
    renderPregunta.innerText = ""; // vacío campos y valores para el turno siguiente
    inputRespuesta.value = ""; // vacío campos y valores para el turno siguiente
    mostrarPregunta();
  } else{
      cambiarTurno();
      renderPregunta.innerText = ""; // vacío campos y valores para el turno siguiente
      inputRespuesta.value = ""; // vacío campos y valores para el turno siguiente
      mostrarPregunta();
  }  
}

// feedback visual, si respuestaCorrecta TRUE agrega un bloque, sino lo quita
function moverBloque(jugadorActual, respuestaCorrecta){
  let contenedorBloque = document.querySelector(`#bloques${jugadorActual}`); // capturo div donde se creará el elemento nuevo
  let bloque = document.createElement("div"); // crea un div virtual (el "bloque")

  // actualizar progreso con ternario
  (respuestaCorrecta)
  ? colorProgreso[jugadorActual -1].progreso++
  : colorProgreso[jugadorActual -1].progreso--;

  // limito dentro del rango
  if(colorProgreso[jugadorActual -1].progreso <= 0) colorProgreso[jugadorActual -1].progreso = 0; // bloque negro
  if(colorProgreso[jugadorActual -1].progreso >= 6) colorProgreso[jugadorActual -1].progreso = 5; // bloque blanco

  // luego, acción visual
  if(respuestaCorrecta){
    bloque.classList.add("bloque", colores[colorProgreso[jugadorActual -1].progreso]); // agrega clase de color .progreso 
    contenedorBloque.prepend(bloque); // agrega el bloque encima
    } else if(colorProgreso[jugadorActual -1].progreso === 0){
        contenedorBloque.removeChild(contenedorBloque.firstChild); // si llegó a 0 borra el primer hijo y dibuja bloque negro
        let bloqueNegro = document.createElement("div");
        bloqueNegro.classList.add("bloque", "negro");
        contenedorBloque.prepend(bloqueNegro);
      } else {
        if(contenedorBloque.firstChild){
          contenedorBloque.removeChild(contenedorBloque.firstChild); // si falló pero no llegó a 0 quita primer bloque de arriba
        }
      }
}

// verifica estado de juego: gano, perdio y deshabilita todos los botones excepto reiniciar
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
}

// si jugador1 = TRUE cambia el turno al oponente y viceversa
function cambiarTurno() {
  jugadorActual = (jugadorActual === 1) ? 2 : 1;
}