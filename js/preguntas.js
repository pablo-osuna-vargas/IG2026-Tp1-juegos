let trivia = []; // se llena con API
const colores = ["negro", "azul", "rojo", "verde", "amarillo", "blanco"];
let jugadores = [
  { numero: 1, progreso: 0 },
  { numero: 2, progreso: 0 },
];

let aliasJugador1;
let aliasJugador2;
let jugadorActual = 1; // jugador que inicia
let puntajeJugador1 = 0;
let puntajeJugador2 = 0;
let indice = 0; // índice de pregunta actual
let finalTrivia = false; // variable bandera para definir fin de juego
let procesandoRespuesta = false;
let idPartida = 0;

/* Capturas de botones */
const btnJugar = document.querySelector("#btnJugar");
const btnReglas = document.querySelector("#btnReglas");
const btnAtras = document.querySelector("#btnAtras");
const btnReiniciar = document.querySelector("#btnReiniciar");
const btnInicio = document.querySelector("#btnInicio");

/* Capturas de pantallas */
const portada = document.querySelector(".portada");
const reglas = document.querySelector(".reglas");
const juego = document.querySelector(".juego");
const pantallaFin = document.querySelector(".fin");

/* Elementos de la trivia */
const pregunta = document.querySelector(".pregunta");
const opciones = document.querySelector(".opciones");
const mensaje = document.querySelector(".mensaje");

const alias1 = document.querySelector(".alias1");
const alias2 = document.querySelector(".alias2");
const bloques1 = document.querySelector("#bloques1");
const bloques2 = document.querySelector("#bloques2");

/* Elementos de la pantalla final */
const ganador = document.querySelector("#ganador");
const mensajeFin = document.querySelector("#mensaje-fin");

/* Estado inicial de las pantallas */
portada.style.display = "flex";
reglas.style.display = "none";
juego.style.display = "none";
pantallaFin.style.display = "none";

/* Estado inicial de los botones */
btnReiniciar.disabled = true;
btnJugar.disabled = false;
btnReglas.disabled = false;
btnAtras.disabled = false;
btnInicio.disabled = false;

// funciones UTILITARIAS
function mostrar(elemento) {
  elemento.style.display = "flex";
}
function ocultar(elemento) {
  elemento.style.display = "none";
}
//Recibe el número del jugador actual y devuelve el alias de ese mismo jugador
function obtenerAlias(numeroJugador) {
  if (numeroJugador === 1) {
    return aliasJugador1;
  } else {
    return aliasJugador2;
  }
}

// ================== //
// FUNCIONES DE JUEGO //
// ================== //
async function iniciarJuego() {
  // Identificar la nueva partida
  const partidaActual = ++idPartida;
  procesandoRespuesta = false;

  // reset general
  btnReiniciar.disabled = false;
  opciones.innerHTML = "";
  mensaje.innerText = "";
  bloques1.innerHTML = "";
  bloques2.innerHTML = "";

  puntajeJugador1 = 0;
  puntajeJugador2 = 0;

  // Reset de progreso de jugadores
  jugadores = [
    { numero: 1, progreso: 0 },
    { numero: 2, progreso: 0 },
  ];

  dibujarBloque(1);
  dibujarBloque(2);

  jugadorActual = 1;

  finalTrivia = false; // reset para reinicio de juego

  if (trivia.length === 0) {
    await cargarPreguntasAPI();
    if (partidaActual !== idPartida) return;
  }
  if (trivia.length === 0) {
    return;
  }
  mostrarPregunta();
}

function mostrarPregunta() {
  indice = Math.floor(Math.random() * trivia.length);
  pregunta.innerHTML = `<h3><span class="jugadorActual">${obtenerAlias(jugadorActual)}</span>:</h3> <br /> ${trivia[indice].pregunta}`;

  opciones.innerHTML = "";
  ["Verdadero", "Falso"].forEach((opcion) => {
    const boton = document.createElement("button");
    boton.textContent = opcion;
    boton.onclick = () => procesarRespuesta(opcion === "Verdadero");
    opciones.appendChild(boton);
  });
}

function procesarRespuesta(eleccion) {
  if (finalTrivia || procesandoRespuesta) return;

  procesandoRespuesta = true;
  const partidaActual = idPartida;

  // Evitar varias respuestas durante la pausa.
  opciones.querySelectorAll("button").forEach((boton) => {
    boton.disabled = true;
  });

  const correcta = trivia[indice].respuesta;

  let jugador;
  jugadores.forEach((j) => {
    if (j.numero === jugadorActual) {
      jugador = j;
    }
  });

  if (eleccion === correcta) {
    jugador.progreso++;
    mensaje.innerText = "✅ Correcto!";
    jugadorActual === 1 ? puntajeJugador1++ : puntajeJugador2++;

    if (jugador.progreso >= colores.length - 1) {
      dibujarBloque(jugadorActual, "blanco");

      setTimeout(function () {
        if (partidaActual !== idPartida) return;

        terminarJuego(jugadorActual);
      }, 2000);

      return;
    }

    dibujarBloque(jugadorActual, colores[jugador.progreso]);

    setTimeout(function () {
      if (partidaActual !== idPartida) return;

      mensaje.innerText = "";
      procesandoRespuesta = false;
      mostrarPregunta();
    }, 2000);
  } else {
    jugador.progreso--;
    pregunta.innerText = "";
    mensaje.innerText = "❌ Incorrecto";
    jugadorActual === 1 ? puntajeJugador1-- : puntajeJugador2--;

    if (jugador.progreso <= 0) {
      const contenedor = document.querySelector(`#bloques${jugadorActual}`);

      contenedor.innerHTML = "";
      dibujarBloque(jugadorActual, "negro");

      const numeroGanador = jugadorActual === 1 ? 2 : 1;

      mensaje.innerText =
        "❌ Incorrecto. " + obtenerAlias(jugadorActual) + " perdió la partida.";

      setTimeout(function () {
        if (partidaActual !== idPartida) return;

        terminarJuego(numeroGanador);
      }, 3000);

      return;
    }

    mensaje.innerText = "❌ Incorrecto. Cambio de turno...";
    quitarBloque(jugadorActual);

    setTimeout(function () {
      if (partidaActual !== idPartida) return;

      cambiarTurno();
      mensaje.innerText = "";
      procesandoRespuesta = false;
      mostrarPregunta();
    }, 2000);
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
  jugadorActual = jugadorActual === 1 ? 2 : 1;
}

function terminarJuego(numeroGanador) {
  finalTrivia = true;
  opciones
    .querySelectorAll("button")
    .forEach((boton) => (boton.disabled = true));
  btnReiniciar.disabled = true;
  const aliasGanador = obtenerAlias(numeroGanador);
  const puntajeGanador =
    numeroGanador === 1 ? puntajeJugador1 : puntajeJugador2;
  ganador.textContent = "¡" + aliasGanador + " ganó la trivia!";
  mensajeFin.textContent =
    "Obtuvo " + puntajeGanador + " puntos para el ranking.";
  guardarResultados();
  ocultar(portada);
  ocultar(reglas);
  ocultar(juego);
  mostrar(pantallaFin);
}

// =================================================================================== //
// FUNCION async => carga el array trivia con preguntas de música desde Open Trivia DB //
// =================================================================================== //
async function cargarPreguntasAPI() {
  try {
    const respuesta = await fetch(
      "https://opentdb.com/api.php?amount=5&type=boolean&category=12&encode=url3986",
    ); // Pedimos 5 preguntas de música en formato URL encoded
    const datos = await respuesta.json();

    // decodeURIComponent para evitar entities html
    trivia = datos.results.map((item) => ({
      pregunta: decodeURIComponent(item.question),
      respuesta: item.correct_answer === "True",
    }));
  } catch (error) {
    mensaje.innerText = "❌ Error al cargar preguntas: " + error.message;
    mensaje.style.display = "block";
  }
}

function guardarResultados() {
  guardarPuntajes("rankingTrivia", [
    { alias: aliasJugador1, puntaje: puntajeJugador1 },
    { alias: aliasJugador2, puntaje: puntajeJugador2 },
  ]);

  console.log(JSON.parse(localStorage.getItem("rankingTrivia")));

  puntajeJugador1 = 0;
  puntajeJugador2 = 0;
}

/* ================== */
/* EVENTOS DE NAVEGACIÓN */
/* ================== */

btnReglas.addEventListener("click", () => {
  ocultar(portada);
  mostrar(reglas);
});

btnAtras.addEventListener("click", () => {
  ocultar(reglas);
  mostrar(portada);
});

btnJugar.addEventListener("click", async () => {
  aliasJugador1 = prompt("Jugador 1, ingresá tu alias:");
  let numeroAliasAlternativo = 1;

  if (aliasJugador1 === null || aliasJugador1.trim() === "") {
    aliasJugador1 = "Jugador 1";
  } else {
    aliasJugador1 = aliasJugador1.trim();
  }

  aliasJugador2 = prompt("Jugador 2, ingresá tu alias:");

  if (aliasJugador2 === null || aliasJugador2.trim() === "") {
    aliasJugador2 = "Jugador 2";

    while (aliasJugador1.toLowerCase() === aliasJugador2.toLowerCase()) {
      aliasJugador2 = "Jugador 2 (" + numeroAliasAlternativo + ")";
      numeroAliasAlternativo++;
    }
  } else {
    aliasJugador2 = aliasJugador2.trim();
  }

  while (aliasJugador1.toLowerCase() === aliasJugador2.toLowerCase()) {
    alert("Los jugadores no pueden tener el mismo alias.");

    aliasJugador2 = prompt("Jugador 2, ingresá un alias diferente:");

    if (aliasJugador2 === null || aliasJugador2.trim() === "") {
      aliasJugador2 = "Jugador 2 (" + numeroAliasAlternativo + ")";
      numeroAliasAlternativo++;
    } else {
      aliasJugador2 = aliasJugador2.trim();
    }
  }

  alias1.innerText = aliasJugador1;
  alias2.innerText = aliasJugador2;

  ocultar(portada);
  ocultar(reglas);
  ocultar(pantallaFin);
  mostrar(juego);

  await iniciarJuego();
});

btnReiniciar.addEventListener("click", iniciarJuego);

btnInicio.addEventListener("click", () => {
  ocultar(pantallaFin);
  ocultar(juego);
  ocultar(reglas);
  mostrar(portada);
});
