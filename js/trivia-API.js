// Variables globales
let aliasJugador1 = prompt("Jugador 1 ingresa tu nombre o alias:");
let aliasJugador2 = prompt("Jugador 2 ingresa tu nombre o alias:");
let puntajeJugador1 = 0;
let puntajeJugador2 = 0;
let rankingPuntajes = JSON.parse(localStorage.getItem("rankingTrivia")) || [];
let trivia = []; // se llenará con la API

// 1. Capturas HTML
const btnIniciar = document.querySelector("#btnIniciar");
const btnInstrucciones = document.querySelector("#btnInstrucciones");
const cerrarInstrucciones = document.querySelector("#cerrarInstrucciones");
const btnReiniciar = document.querySelector("#btnReiniciar");
const renderPregunta = document.querySelector("#pregunta");
const opciones = document.querySelector("#opciones");
let mensajeAlerta = document.querySelector("#mensajes");

let indice;
let jugadorActual = 1;

// 2. cargar preguntas de música desde Open Trivia DB
async function cargarPreguntasMusica() {
  try {
    const respuesta = await fetch("https://opentdb.com/api.php?amount=5&type=boolean&category=12&encode=url3986"); // Pedimos 5 preguntas de música en formato URL encoded
    const datos = await respuesta.json();

    // decodeURIComponent para evitar entities html
    trivia = datos.results.map(item => ({
      pregunta: decodeURIComponent(item.question),
      respuesta: item.correct_answer === "True"
    }));
  } catch (error) {
    mensajeAlerta.innerText = "❌ Error al cargar preguntas: " + error.message;
    mensajeAlerta.style.display = "block";
  }
}

// 3. funciones de juego
function mostrarPregunta() {
  indice = Math.floor(Math.random() * trivia.length);
  renderPregunta.innerHTML = `<span class="jugador-actual">Jugador ${jugadorActual}</span>: ${trivia[indice].pregunta}`;

  opciones.innerHTML = "";
  ["Verdadero", "Falso"].forEach(opcion => {
    const boton = document.createElement("button");
    boton.textContent = opcion;
    boton.onclick = () => procesarRespuesta(opcion === "Verdadero");
    opciones.appendChild(boton);
  });
}

function procesarRespuesta(eleccion) {
  let correcta = trivia[indice].respuesta;
  if (eleccion === correcta) {
    (jugadorActual === 1) ? puntajeJugador1++ : puntajeJugador2++;
    mensajeAlerta.innerText = "✅ Correcto";
    } else {
    (jugadorActual === 1) ? puntajeJugador1-- : puntajeJugador2--;
    mensajeAlerta.innerText = "❌ Incorrecto";
    
    cambiarTurno();
  }

  mensajeAlerta.style.display = "block";
  mostrarPregunta();
}

function cambiarTurno() {
  jugadorActual = (jugadorActual === 1) ? 2 : 1;
}

// 4. Eventos
btnIniciar.addEventListener("click", async () => {
  if (trivia.length === 0) {
    await cargarPreguntasMusica();
  }
  mostrarPregunta();
  btnIniciar.disabled = true;
});
btnInstrucciones.addEventListener("click", () => {instrucciones.style.display = "block"});
cerrarInstrucciones.addEventListener("click", () => {instrucciones.style.display = "none"});
btnReiniciar.addEventListener("click", () => location.reload());