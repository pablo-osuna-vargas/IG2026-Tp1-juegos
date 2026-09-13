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
  "¿Número de lados de un triángulo?"];
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
  "3"];
const colores = [
  "negro", "azul", "rojo", 
  "verde", "amarillo", "blanco"]; // array de colores para actualizar clase al responder
const jugadores = [{ numero: 1, progreso: 1}, { numero: 2, progreso: 1}]; // inicia bloque azul en ambos jugadores

let indice; // indice para el (.progreso) se actualiza en cada ronda de respuestas
let jugadorActual = 1; // inicializador de turnos
let mensajes = ["CORRECTO ✅", "INCORRECTO ❌"];

// capturas HTML
const btnIniciar = document.querySelector("#btnIniciar");
const btnInstrucciones = document.querySelector("#btnInstrucciones");
const cerrarInstrucciones = document.querySelector("#cerrarInstrucciones");
const btnReiniciar = document.querySelector("#btnReiniciar");
const formActivo = document.querySelector("form"); // activa formulario luego de Iniciar
const renderPregunta = document.querySelector("#pregunta"); renderPregunta.style.display = "none";
const inputRespuesta = document.querySelector("#respuesta");
const btnResponder = document.querySelector("#btnResponder");
const btnArriesgar = document.querySelector("#btnArriesgar");
let mensajeAlerta = document.querySelector("#mensajes"); // capturo elemento para mostrar alertas varias

// botones estado inicial
btnIniciar.disabled = false;
btnResponder.disabled = true;
btnArriesgar.disabled = true;
inputRespuesta.disabled = true;

btnIniciar.addEventListener("click", () => {
  iniciarTrivia(); 
  mostrarPregunta();
  formActivo.style.display = "block";
  btnIniciar.disabled = true;
  btnResponder.disabled = false;
  inputRespuesta.disabled = false});
btnInstrucciones.addEventListener("click", () => {instrucciones.style.display = "block"});
cerrarInstrucciones.addEventListener("click", () => {instrucciones.style.display = "none"})
btnArriesgar.addEventListener("click", () => {procesarArriesgar(jugadorActual)}); 
btnReiniciar.addEventListener("click", () => location.reload());

// boton Responder --- captura el submit del form (responder)
  formActivo.addEventListener("submit", function(responder) {
  responder.preventDefault(); // como es un submit evita la recarga de la página
  let respuestaJugador = inputRespuesta.value; 
  procesarRespuesta(respuestaJugador, indice);});



// FUNCIONES
// inicia con un bloque azul en cada jugador
function iniciarTrivia(){
  for(let i = 0; i < jugadores.length; i++){
    let jugador = jugadores[i].numero; // define quien está jugando según indice "i"
    let contenedorBloque = document.querySelector(`#bloques${jugador}`); // selecciona bloque para jugador 1 o 2
    let bloque = document.createElement("div"); // crea un div virtual
    bloque.classList.add("bloque", colores[jugadores[i].progreso]); // agrega la clase con el color (ej: .progreso=1 es azul)
    contenedorBloque.prepend(bloque); // crea un bloque encima de otro
  }
}

function mostrarPregunta() {
  indice = Math.floor(Math.random() * preguntas.length); // muestra una pregunta aleatoria del array 
  renderPregunta.style.display = "block";
  renderPregunta.innerText = `Jugador ${jugadorActual}: ${preguntas[indice]}`; // muestra un string que indica quien toca responder y la pregunta al azar
}

function procesarRespuesta(respuestaJugador, indice) {
  let respuestaCorrecta = (respuestaJugador.toLowerCase() === respuestas[indice].toLowerCase()); // variable TRUE/FALSE para saber si suma o resta bloques. Compara en minusculas para evitar errores de escritura

  // op ternario: si respuestaCorrecta = true muestra mensaje CORRECTO, de lo contrario INCORRECTO
  mensajeAlerta.innerText = respuestaCorrecta ? `${mensajes[0]}` : `${mensajes[1]}`;
  mensajeAlerta.style.display = "block"; // muestro mensaje luego de verificar pregunta

  // agrega o quita un blque segun respuesta. Verificación de fin de partida o nueva ronda
  moverBloque(jugadorActual, respuestaCorrecta); // variables que pasan su valor a la funcion moverBloque()
  verificarObjetivo(jugadorActual, colores[jugadores[jugadorActual -1].progreso]);

  renderPregunta.innerText = ""; // vacío campos y valores para el turno siguiente
  inputRespuesta.value = "";
  
  // solo cambia de turno si el jugador actual responde Incorrectamente
  respuestaCorrecta ? mostrarPregunta() : cambiarTurno(); verificarDesventaja(); mostrarPregunta();
}

function procesarArriesgar(jugadorActual) {
  let rival = (jugadorActual === 1) ? 2 : 1; // define QUIEN es el rival

  let progActual = jugadores[jugadorActual -1].progreso;
  let progRival = jugadores[rival -1].progreso;
  let diferencia = progRival - progActual; // cantidad de bloques que debe crear

  if(progActual < progRival) {
    btnArriesgar.disabled = false; // si esta en desventaja habilita el botón Arriesgar

    // para cada bloque agregado le pone el class correspondiente a su color segun progreso
    for(let i = 0; i < diferencia; i++) {
      let contenedorBloque = document.querySelector(`#bloques${jugadorActual}`);
      let bloque = document.createElement("div");
      bloque.classList.add("bloque", colores[progActual + i + 1]);
      contenedorBloque.prepend(bloque);
    }
  } else {
    btnArriesgar.disabled = true; // si no esta en desventaja no habilita Arriesgar
  }

  btnArriesgar.disabled = true; // una vez cliqueado se vuelve a deshabilitar Arriesgar
}

// feedback visual, si respuestaCorrecta TRUE agrega un bloque, sino lo quita
function moverBloque(jugadorActual, respuestaCorrecta){
  let contenedorBloque = document.querySelector(`#bloques${jugadorActual}`); // capturo div donde se creará el elemento nuevo
  let bloque = document.createElement("div"); // crea un div virtual (el "bloque")

  // actualizar progreso con ternario
  (respuestaCorrecta)
  ? jugadores[jugadorActual -1].progreso++
  : jugadores[jugadorActual -1].progreso--;

  // limito dentro del rango
  if(jugadores[jugadorActual -1].progreso <= 0) jugadores[jugadorActual -1].progreso = 0; // bloque negro
  if(jugadores[jugadorActual -1].progreso >= 6) jugadores[jugadorActual -1].progreso = 5; // bloque blanco

  // feedback visual de tablero
  if(respuestaCorrecta){
    bloque.classList.add("bloque", colores[jugadores[jugadorActual -1].progreso]); // agrega clase de color (.progreso) 
    contenedorBloque.prepend(bloque); // agrega bloque encima
    } else if(jugadores[jugadorActual -1].progreso === 0){
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
    mensajeAlerta.innerText = `Jugador ${jugadorActual} ganó!`
    mensajeAlerta.classList.add("mensajeGrande", "mensajeGanador");
    deshabilitarBotones();
    return;
  }

  if(color === "negro"){
    mensajeAlerta.innerText = `Jugador ${jugadorActual} perdió!`
    mensajeAlerta.classList.add("mensajeGrande", "mensajePerdedor");
    deshabilitarBotones();    
    return;
  } 
}

function cambiarTurno() {
  jugadorActual = (jugadorActual === 1) ? 2 : 1; // si jugador1 = TRUE cambia el turno al oponente y viceversa
}

function verificarDesventaja() {
  let rival = (jugadorActual === 1) ? 2 : 1;
  let progActual = jugadores[jugadorActual -1].progreso;
  let progRival = jugadores[rival -1].progreso;

  if (progActual < progRival) {
    btnArriesgar.disabled = false; // habilito Arriesgar
  } else {
    btnArriesgar.disabled = true;  // deshabilito Arriesgar
  }
}


function deshabilitarBotones() {
  btnIniciar.disabled = true;
  btnResponder.disabled = true;
  btnArriesgar.disabled = true;
  inputRespuesta.disabled = true;
}