// Estado global
let rankingPuntajes = JSON.parse(localStorage.getItem("rankingTrivia")) || [];

let trivia = [];          // se llena con API
const colores = ["negro", "azul", "rojo", "verde", "amarillo", "blanco"];
let jugadores = [
  { numero: 1, progreso: 0 },
  { numero: 2, progreso: 0 }
];

let aliasJugador1;
let aliasJugador2;
let jugadorActual = 1;      // jugador que inicia
let puntajeJugador1 = 0;
let puntajeJugador2 = 0;
let indice = 0;             // índice de pregunta actual
let finalTrivia = false;    // variable bandera para definir fin de juego

// Capturas
const btnEntrar = document.querySelector("#btnEntrar");
const btnJugar = document.querySelector("#btnJugar");
const btnReiniciar = document.querySelector("#btnReiniciar");
const btnAyuda = document.querySelector("#ayuda");
const cerrarAyuda = document.querySelector("#cerrarAyuda");

const portada = document.querySelector(".portada");
const instrucciones = document.querySelector(".instrucciones");
const juego = document.querySelector(".juego");
const ayuda = document.querySelector(".ayuda");

const pregunta = document.querySelector(".pregunta");
const opciones = document.querySelector(".opciones");
const mensaje = document.querySelector(".mensaje");

const alias1 = document.querySelector(".alias1");
const alias2 = document.querySelector(".alias2");
const bloques1 = document.querySelector("#bloques1");
const bloques2 = document.querySelector("#bloques2");

// Estado inicial de secciones
portada.style.display = "block";        // se ve primero
instrucciones.style.display = "none";   // oculto
juego.style.display = "none";           // oculto  
ayuda.style.display = "none";           // oculto

// Estado inicial de botones
btnReiniciar.disabled = true;          // deshabilitado hasta que termine la partida
btnEntrar.disabled = false;            // activo
btnJugar.disabled = false;             // activo
btnAyuda.disabled = false;             // activo
cerrarAyuda.disabled = false;  // activo

// funciones UTILITARIAS
function mostrar(elemento) {  elemento.style.display = "block";}
function ocultar(elemento) {  elemento.style.display = "none";}


// ================== //
// FUNCIONES DE JUEGO //
// ================== //
async function iniciarJuego() {
  // reset general
  btnReiniciar.disabled = true;
  opciones.innerHTML = "";
  mensaje.innerText = "";
  bloques1.innerHTML = "";
  bloques2.innerHTML = "";
  
  puntajeJugador1 = 0;
  puntajeJugador2 = 0;

  // Reset de progreso de jugadores
  jugadores = [
    { numero: 1, progreso: 0 },
    { numero: 2, progreso: 0 }
  ];

  dibujarBloque(1);
  dibujarBloque(2);

  jugadorActual = 1;

  finalTrivia = false; // reset para reinicio de juego

  if (trivia.length === 0) {
    await cargarPreguntasAPI();
  }

  mostrarPregunta();
}


function mostrarPregunta() {
  indice = Math.floor(Math.random() * trivia.length);
  pregunta.innerHTML = `<span class="jugadorActual">Jugador ${jugadorActual}</span>: ${trivia[indice].pregunta}`;

  opciones.innerHTML = "";
  ["Verdadero", "Falso"].forEach(opcion => {
    const boton = document.createElement("button");
    boton.textContent = opcion;
    boton.onclick = () => procesarRespuesta(opcion === "Verdadero");
    opciones.appendChild(boton);
  });
}


function procesarRespuesta(eleccion) {
  if (finalTrivia) return; // cortar si el juego ya terminó

  let correcta = trivia[indice].respuesta;
  
  // recorro el array jugadores para saber cual es del turno actual para poder actualizar su progreso/puntaje
  let jugador;
  jugadores.forEach(j => {
    if (j.numero === jugadorActual) {
      jugador = j;
    }

  });

  if (eleccion === correcta) {
    jugador.progreso++;
    mensaje.innerText = "✅ Correcto";
    (jugadorActual === 1) ? puntajeJugador1++ : puntajeJugador2++;

    if (jugador.progreso >= colores.length - 1) {
      mensaje.innerText = "Jugador " + jugadorActual + " ganó la trivia!";
      dibujarBloque(jugadorActual, "blanco");
      terminarJuego();
      return;
    } else {
      mensaje.innerText += " Continúa...";
      dibujarBloque(jugadorActual, colores[jugador.progreso]);
      mostrarPregunta();
    }
  } else {
    jugador.progreso--;
    pregunta.innerText = "";
    mensaje.innerText = "❌ Incorrecto";
    (jugadorActual === 1) ? puntajeJugador1-- : puntajeJugador2--;

    if (jugador.progreso <= 0) {
      mensaje.innerText = "Jugador " + jugadorActual + " perdió la trivia!";
      // vaciar contenedor y dibujar bloque negro
      let contenedor = document.querySelector(`#bloques${jugadorActual}`);
      contenedor.innerHTML = "";
      dibujarBloque(jugadorActual, "negro");
      terminarJuego();
      return;
    } else {
      mensaje.innerText += " Cambio de turno...";
      quitarBloque(jugadorActual);
      cambiarTurno();
      mostrarPregunta();
    }
  }
}


function dibujarBloque(jugadorActual, color) {
  let contenedor = document.querySelector(`#bloques${jugadorActual}`);
  let bloque = document.createElement("div");
  bloque.classList.add("bloque", color);
  contenedor.prepend(bloque);
}


function quitarBloque(jugadorActual) {
  let contenedor = document.querySelector(`#bloques${jugadorActual}`);
  if (contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }
}


function cambiarTurno() {
  jugadorActual = (jugadorActual === 1) ? 2 : 1;
}


function terminarJuego() {
  opciones.querySelectorAll("button").forEach(boton => boton.disabled = true);
  btnReiniciar.disabled = false;
  guardarResultados();
  finalTrivia = true;
}


// =================================================================================== //
// FUNCION async => carga el array trivia con preguntas de música desde Open Trivia DB //
// =================================================================================== //
async function cargarPreguntasAPI() {
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


// ======= //
// EVENTOS //
// ======= //
btnEntrar.addEventListener("click", () => {  ocultar(portada);  mostrar(instrucciones); });
btnJugar.addEventListener("click", () => {  
  aliasJugador1 = prompt("Jugador 1 ingresa tu alias:");
  aliasJugador2 = prompt("Jugador 2 ingresa tu alias:");
  alias1.innerText = `${aliasJugador1}`;
  alias2.innerText = `${aliasJugador2}`;
  
  ocultar(instrucciones);  
  mostrar(juego); 

  iniciarJuego();
  btnReiniciar.disabled = true; // sigue deshabilitado durante la partida 
}); 

btnReiniciar.addEventListener("click", () => iniciarJuego());
btnAyuda.addEventListener("click", () => mostrar(document.querySelector(".ayuda")));
cerrarAyuda.addEventListener("click", () => ocultar(document.querySelector(".ayuda")));