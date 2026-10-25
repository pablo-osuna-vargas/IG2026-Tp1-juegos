let pleyerUno;
let pleyerDos;
// Referencias a los botones que disparan la acción
const btnJugar = document.querySelector("#btnJugar");
const btnReglas = document.querySelector("#btnReglas");
const bntAtras = document.querySelector("#btnAtras");
const bntInicio = document.querySelector("#btnInicio");

// Referencias a las secciones que se muestran/ocultan
const play = document.querySelector(".portada");
const reglas = document.querySelector(".reglas");
const tablero = document.querySelector("#tableroUno");
const tableroDos = document.querySelector("#tableroDos");
const pantallaGanaste = document.querySelector(".fin");

// Referencias a las secciones cartas
const bntPapel = document.querySelector("#papel");
const bntRoca = document.querySelector("#piedra");
const bntTijera = document.querySelector("#tijera");
const bntPapelDos = document.querySelector("#papelDos");
const bntRocaDos = document.querySelector("#piedraDos");
const bntTijeraDos = document.querySelector("#tijeraDos");

tableroDos.style.display = "none";
reglas.style.display = "none";
tablero.style.display = "none";
pantallaGanaste.style.display = "none";

// puntaje
const puntajeDos = document.querySelector("#puntaje-dos");
const puntaje = document.querySelector("#puntaje");
const resultadoUno = document.querySelector("#orden");
const resultadoDos = document.querySelector("#orden-dos");
const turnoUno = document.querySelector("#turno");
const turnoDos = document.querySelector("#turno-dos");
const ganador = document.querySelector("#ganador");

// 1 Click en "Jugar" -> oculta la pantalla inicial y muestra las reglas
btnReglas.addEventListener("click", () => {
  play.style.display = "none";
  reglas.style.display = "flex";
});

bntAtras.addEventListener("click", () => {
  reglas.style.display = "none";
  play.style.display = "";
});

// 2 Click en "Siguiente" (dentro de las reglas) -> oculta las reglas y arranca el juego
btnJugar.addEventListener("click", () => {
  idPartida++;
  play.style.display = "none";
  reglas.style.display = "none";
  tablero.style.display = "flex";
  tableroDos.style.display = "none";

  pleyerUno = prompt("Jugador 1 ingresa tu alias:");

  if (pleyerUno === null || pleyerUno.trim() === "") {
    pleyerUno = "Jugador 1";
  } else {
    pleyerUno = pleyerUno.trim();
  }

  pleyerDos = prompt("Jugador 2 ingresa tu alias:");

  if (pleyerDos === null || pleyerDos.trim() === "") {
    pleyerDos = "Jugador 2";
  } else {
    pleyerDos = pleyerDos.trim();
  }

  let numeroAliasAlternativo = 1;

  while (pleyerUno.toLowerCase() === pleyerDos.toLowerCase()) {
    alert("Los jugadores no pueden tener el mismo alias.");

    pleyerDos = prompt("Jugador 2, ingresá un alias diferente:");

    if (pleyerDos === null || pleyerDos.trim() === "") {
      pleyerDos = "Jugador 2";

      while (pleyerUno.toLowerCase() === pleyerDos.toLowerCase()) {
        pleyerDos = "Jugador 2 (" + numeroAliasAlternativo + ")";
        numeroAliasAlternativo++;
      }
    } else {
      pleyerDos = pleyerDos.trim();
    }
  }

  turnoDos.innerText = `${pleyerDos} elige una carta`;
  turnoUno.innerText = `${pleyerUno} elige una carta`;
});

// Juego
let jugadorUno = []; // historial de cartas del Jugador Uno
let jugadorDos = []; // historial de cartas del Jugador Dos
let contadorJugadorUno = 0;
let contadorJugadorDos = 0;
let juegoTerminado = false;
let turnoActual = "Uno";
let procesandoRonda = false;
let idPartida = 0;

function validador(jugador, carta, boton) {
  // No permite jugar durante una pausa, después del final
  // o cuando no le corresponde el turno a ese jugador.
  if (juegoTerminado || procesandoRonda || jugador !== turnoActual) {
    return;
  }

  procesandoRonda = true;

  // Marcamos la carta que eligió el jugador.
  boton.classList.add("carta-seleccionada");

  const partidaActual = idPartida;

  if (jugador === "Uno") {
    jugadorUno.push(carta);

    setTimeout(function () {
      if (partidaActual !== idPartida) {
        return;
      }

      tablero.style.display = "none";
      tableroDos.style.display = "flex";
      turnoActual = "Dos";
      procesandoRonda = false;
    }, 2000);
  } else {
    jugadorDos.push(carta);

    setTimeout(function () {
      if (partidaActual !== idPartida) {
        return;
      }

      tableroDos.style.display = "none";
      tablero.style.display = "flex";
      turnoActual = "Uno";

      resolverRonda(jugadorUno.length - 1, partidaActual);
    }, 2000);
  }
}

// Compara las cartas de ambos jugadores y muestra el resultado.
function resolverRonda(i, partidaActual) {
  const cartaA = jugadorUno[i];
  const cartaB = jugadorDos[i];
  let resultado;

  if (cartaA === cartaB) {
    resultado = "Empate: los dos jugaron " + cartaA;
  } else if (cartaA === "piedra" && cartaB === "tijera") {
    contadorJugadorUno++;
    resultado = "Ganó la ronda " + pleyerUno + ": piedra rompe tijera";
  } else if (cartaA === "papel" && cartaB === "piedra") {
    contadorJugadorUno++;
    resultado = "Ganó la ronda " + pleyerUno + ": papel envuelve piedra";
  } else if (cartaA === "tijera" && cartaB === "papel") {
    contadorJugadorUno++;
    resultado = "Ganó la ronda " + pleyerUno + ": tijera corta papel";
  } else {
    contadorJugadorDos++;
    resultado =
      "Ganó la ronda " + pleyerDos + ": " + cartaB + " le gana a " + cartaA;
  }

  console.log(resultado);

  resultadoUno.innerText = resultado;
  resultadoDos.innerText = resultado;

  puntaje.innerText = contadorJugadorUno + " vs " + contadorJugadorDos;
  puntajeDos.innerText = contadorJugadorUno + " vs " + contadorJugadorDos;

  // Comprueba si alguien ganó la partida.
  let ganadorPartida = "";

  if (contadorJugadorUno === 2) {
    ganadorPartida = pleyerUno;
    juegoTerminado = true;
  } else if (contadorJugadorDos === 2) {
    ganadorPartida = pleyerDos;
    juegoTerminado = true;
  }

  // El resultado queda visible durante 2 segundos.
  setTimeout(function () {
    if (partidaActual !== idPartida) {
      return;
    }

    // Si alguien ganó, guardamos los puntajes y mostramos el final.
    if (ganadorPartida !== "") {
      if (ganadorPartida === pleyerUno) {
        guardarPuntajes("rankingPiedraPapel", [
          { alias: pleyerUno, puntaje: 10 },
          { alias: pleyerDos, puntaje: 5 },
        ]);
      } else {
        guardarPuntajes("rankingPiedraPapel", [
          { alias: pleyerDos, puntaje: 10 },
          { alias: pleyerUno, puntaje: 5 },
        ]);
      }

      ganador.innerText = ganadorPartida + " ganó la partida";
      pantallaGanaste.style.display = "flex";
      tablero.style.display = "none";
      tableroDos.style.display = "none";
      return;
    }

    // Si todavía no terminó, preparamos la siguiente ronda.
    limpiarCartasSeleccionadas();

    resultadoUno.innerText = "";
    resultadoDos.innerText = "";

    turnoUno.innerText = pleyerUno + " elige una carta";
    turnoDos.innerText = pleyerDos + " elige una carta";

    procesandoRonda = false;
  }, 2000);
}

// Quita el borde de todas las cartas.
function limpiarCartasSeleccionadas() {
  bntPapel.classList.remove("carta-seleccionada");
  bntRoca.classList.remove("carta-seleccionada");
  bntTijera.classList.remove("carta-seleccionada");

  bntPapelDos.classList.remove("carta-seleccionada");
  bntRocaDos.classList.remove("carta-seleccionada");
  bntTijeraDos.classList.remove("carta-seleccionada");
}

// Botones de cartas del primer jugador
bntPapel.addEventListener("click", function () {
  validador("Uno", "papel", bntPapel);
});

bntRoca.addEventListener("click", function () {
  validador("Uno", "piedra", bntRoca);
});

bntTijera.addEventListener("click", function () {
  validador("Uno", "tijera", bntTijera);
});

// Botones de cartas del segundo jugador
bntPapelDos.addEventListener("click", function () {
  validador("Dos", "papel", bntPapelDos);
});

bntRocaDos.addEventListener("click", function () {
  validador("Dos", "piedra", bntRocaDos);
});

bntTijeraDos.addEventListener("click", function () {
  validador("Dos", "tijera", bntTijeraDos);
});

bntInicio.addEventListener("click", () => {
  reinicio();
  tableroDos.style.display = "none";
  reglas.style.display = "none";
  tablero.style.display = "none";
  pantallaGanaste.style.display = "none";
  play.style.display = "";
});

function reinicio() {
  // Invalida los temporizadores de la partida anterior.
  idPartida++;

  jugadorUno = [];
  jugadorDos = [];
  contadorJugadorUno = 0;
  contadorJugadorDos = 0;

  juegoTerminado = false;
  procesandoRonda = false;
  turnoActual = "Uno";

  limpiarCartasSeleccionadas();

  puntaje.innerText = "0 vs 0";
  puntajeDos.innerText = "0 vs 0";

  resultadoUno.innerText = "";
  resultadoDos.innerText = "";
  ganador.innerText = "";

  turnoUno.innerText = "";
  turnoDos.innerText = "";
}
