// variables globales
let puntajeJugador1 = 0;
let puntajeJugador2 = 0;
let rankingPuntajes = JSON.parse(localStorage.getItem("rankingTrivia")) || [];
let indice;
let jugadorActual = 1;
let trivia = []; // se llenará con la API
const colores = ["negro", "azul", "rojo", "verde", "amarillo", "blanco"]; // array de colores para actualizar clase al responder
const jugadores = [{ numero: 1, progreso: 1}, { numero: 2, progreso: 1}]; // inicia bloque azul en ambos jugadores

// capturas HTML
const portada = document.querySelector("#portada");
const instrucciones1 = document.querySelector("#instrucciones1");
const instrucciones2 = document.querySelector("#instrucciones2");
const tableroGeneral = document.querySelector("#tableroGeneral");
const btnIniciarTrivia = document.querySelector("#btnIniciarTrivia");
const btnInstrucciones1 = document.querySelector("#btnInstrucciones1");
const btnInstrucciones2 = document.querySelector("#btnInstrucciones2");
const cerrarInstrucciones = document.querySelector("#cerrarInstrucciones");
const btnJugar = document.querySelector("#btnJugar");
const btnReiniciar = document.querySelector("#btnReiniciar");
const renderPregunta = document.querySelector("#pregunta");
const opciones = document.querySelector("#opciones");
let mensajeAlerta = document.querySelector("#mensajes");

// estado inicial botones
btnIniciarTrivia.disabled = false;
btnReiniciar.disabled = true;

portada.style.display = "block";
instrucciones1.style.display = "none";
instrucciones2.style.display = "none";
tableroGeneral.style.display = "none";

// =================================================================================== //
// FUNCION async => carga el array trivia con preguntas de música desde Open Trivia DB //
// =================================================================================== //
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

// ================== //
// FUNCIONES DE JUEGO //
// ================== //
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
  let jugador = jugadores.find(jugador => jugador.numero === jugadorActual);

  if (eleccion === correcta) {
    jugador.progreso++;
    mensajeAlerta.innerText = "✅ Correcto";
    (jugadorActual === 1) ? puntajeJugador1++ : puntajeJugador2++;
    actualizarBloques(jugadorActual); // apila bloque
  } else {
    jugador.progreso--;
    mensajeAlerta.innerText = "❌ Incorrecto";
    (jugadorActual === 1) ? puntajeJugador1-- : puntajeJugador2--;
    // quitar bloque superior
    let contenedorBloque = document.querySelector(`#bloques${jugadorActual}`);
    if (contenedorBloque.firstChild) {
      contenedorBloque.removeChild(contenedorBloque.firstChild);
    }

    verificarObjetivo(jugadorActual, colores[jugador.progreso]);
    cambiarTurno();
  }

  mensajeAlerta.style.display = "block";

  // solo mostrar pregunta si el juego no termino
  if (btnReiniciar.disabled) {
    mostrarPregunta();
  }
}

function cambiarTurno() {
  jugadorActual = (jugadorActual === 1) ? 2 : 1;
}

function verificarObjetivo(jugadorActual, color) {
  if (color === "blanco" || color === "negro") {
    mensajeAlerta.innerText = 
      (color === "blanco") ? `Jugador ${jugadorActual} ganó la trivia!` 
                           : `Jugador ${jugadorActual} perdió la trivia!`;
    mensajeAlerta.style.display = "block";

    guardarResultados(); // guarda ranking en localStorage

    opciones.querySelectorAll("button").forEach(boton => boton.disabled = true);
    btnIniciarTrivia.disabled = true;
    btnReiniciar.disabled = false;
  }
}

function guardarResultados() {
  // Jugador 1
  let existe1 = false; // variable bandera para saber si el jugador ya jugó previamente y así sumar todos sus puntos
  for (let i = 0; i < rankingPuntajes.length; i++) {
    if (rankingPuntajes[i].alias === aliasJugador1) {
      rankingPuntajes[i].puntaje += puntajeJugador1; // acumulador
      existe1 = true;
      break;
    }
  }
  if (!existe1) {
    rankingPuntajes.push({ alias: aliasJugador1, puntaje: puntajeJugador1 });
  }

  // Jugador 2
  let existe2 = false;
  for (let i = 0; i < rankingPuntajes.length; i++) {
    if (rankingPuntajes[i].alias === aliasJugador2) {
      rankingPuntajes[i].puntaje += puntajeJugador2;
      existe2 = true;
      break;
    }
  }
  if (!existe2) {
    rankingPuntajes.push({ alias: aliasJugador2, puntaje: puntajeJugador2 });
  }

  localStorage.setItem("rankingTrivia", JSON.stringify(rankingPuntajes)); // guarda en localStorage

  console.log(rankingPuntajes);

  // Reset puntajes de ronda
  puntajeJugador1 = 0;
  puntajeJugador2 = 0;
}


// ============================================ //
// LÓGICA DE FEEDBACK VISUAL - bloques de color //
// ============================================ //
function dibujarBloqueInicial(jugadorActual) {
  let contenedor = document.querySelector(`#bloques${jugadorActual}`);  // selecciona el contenedor del jugador
  let bloque = document.createElement("div");
  let color = colores[jugadores[jugadorActual -1].progreso];            // usa progreso inicial (1 = azul)
  bloque.classList.add("bloque", color);
  contenedor.prepend(bloque);                                           // inserta el bloque hacia arriba en el tablero
}

function actualizarBloques(jugadorActual) {
  let contenedorBloque = document.querySelector(`#bloques${jugadorActual}`);
  let progreso = jugadores[jugadorActual -1].progreso;

  // Si progreso sube, agrega bloque arriba
  if (progreso > 0) {
    let color = colores[progreso];
    let bloque = document.createElement("div");
    bloque.classList.add("bloque", color);
    contenedorBloque.prepend(bloque);
    verificarObjetivo(jugadorActual, color);
  }
  // Si progreso baja, elimina bloque superior
  else {
    if (contenedorBloque.firstChild) {
      contenedorBloque.removeChild(contenedorBloque.firstChild);
    }

    // si responde incorrecto en bloque azul, dibuja bloque negro final
    let bloqueNegro = document.createElement("div");
    bloqueNegro.classList.add("bloque", "negro");
    contenedorBloque.prepend(bloqueNegro);
    verificarObjetivo(jugadorActual, "negro");
  }
}


// ======= //
// EVENTOS //
// ======= //
btnInstrucciones1.addEventListener("click", () => {portada.style.display = "none"; instrucciones1.style.display = "block";});
btnJugar.addEventListener("click", () => {instrucciones1.style.display = "none"; tableroGeneral.style.display = "block";});
btnInstrucciones2.addEventListener("click", () => {instrucciones2.style.display = "block"});
cerrarInstrucciones.addEventListener("click", () => {instrucciones2.style.display = "none"});
btnReiniciar.addEventListener("click", () => location.reload());

btnIniciarTrivia.addEventListener("click", async () => {
  let aliasJugador1 = prompt("Jugador 1 ingresa tu alias:");
  let aliasJugador2 = prompt("Jugador 2 ingresa tu alias:");

  if (trivia.length === 0) {
    await cargarPreguntasMusica();
  }
  dibujarBloqueInicial(1); // crea el primer bloque azul para cada jugador
  dibujarBloqueInicial(2);
  mostrarPregunta();
  btnIniciarTrivia.disabled = true;
});