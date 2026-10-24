// ARRAY PARA LAS IMAGENES DE LOS DADOS
let carasDados = [
  { valor: 1, imagen: "img/dado1.png" },
  { valor: 2, imagen: "img/dado2.png" },
  { valor: 3, imagen: "img/dado3.png" },
  { valor: 4, imagen: "img/dado4.png" },
  { valor: 5, imagen: "img/dado5.png" },
  { valor: 6, imagen: "img/dado6.png" },
];

// VARIABLES DE LOS JUGADORES
let vidaJugador = 30;
let puntosJugador = 0;

let vidaDos = 30;
let puntosDos = 0;

let aliasJugadorUno;
let aliasJugadorDos;

// VARIABLES DE LOS DADOS
let dado1 = 0;
let dado2 = 0;
let dadosJugadorTirados = false;

let sumaDados = 0;
let resultadoFinal = 0;
let numeroProhibido = 0;

// VARIABLES DEL TIEMPO Y DEL TURNO
let tiempo = 60;
let intervaloTiempo;

let turno = "jugador";
let juegoActivo = false;

// CAPTURA DE ELEMENTOS DEL HTML
let elementoVidaJugador = document.getElementById("vida-jugador");
let elementoPuntosJugador = document.getElementById("puntos-jugador");

let elementoVidaDos = document.getElementById("vida-dos");
let elementoPuntosDos = document.getElementById("puntos-dos");

let elementoImagenDado1 = document.getElementById("img-dado1");
let elementoImagenDado2 = document.getElementById("img-dado2");

let elementoResultadoFinal = document.getElementById("resultado-final");
let elementoMensajeDados = document.getElementById("mensaje-dados");
let elementoNumeroProhibido = document.getElementById("numero-prohibido");
let elementoTiempo = document.getElementById("tiempo");

let elementoBotonSumar = document.getElementById("sumar");
let elementoBotonAtacar = document.getElementById("atacar");
let elementoBotonTirarDados = document.getElementById("tirar-dados");
let elementoBotonIniciar = document.getElementById("btnJugar");

let elementoTurnoJugador = document.getElementById("info-jugador");
let elementoTurnoDos = document.getElementById("info-dos");

const btnAtras = document.querySelector("#btnAtras");
const tablero = document.querySelector("#tablero-dados");
const btnReglas = document.querySelector("#btnReglas");
const pantallaReglas = document.querySelector(".reglas");
const pantallaPortada = document.querySelector(".portada");
const pantallaFin = document.querySelector(".fin");
const elementoGanador = document.getElementById("ganador");
const elementoGanadorDados = document.getElementById("ganador-dados");
const elementoMensajeRanking = pantallaFin.querySelector("p");
const elementoBotonInicio = document.getElementById("btnInicio");

// TITULOS DE LOS JUGADORES
const tituloJugadorUno = elementoTurnoJugador.querySelector("h2");
const tituloJugadorDos = elementoTurnoDos.querySelector("h2");

// INICIALIZACION DE LA INTERFAZ
elementoVidaJugador.textContent = vidaJugador;
elementoPuntosJugador.textContent = puntosJugador;
elementoVidaDos.textContent = vidaDos;
elementoPuntosDos.textContent = puntosDos;

deshabilitarBotones();

// EVENTOS
elementoBotonSumar.addEventListener("click", elegirSumar);
elementoBotonAtacar.addEventListener("click", elegirAtacar);
elementoBotonTirarDados.addEventListener("click", tirarDadosJugador);
elementoBotonIniciar.addEventListener("click", iniciarJuego);
elementoBotonInicio.addEventListener("click", volverInicio);

//BOTONES
btnReglas.addEventListener("click", () => {
  pantallaPortada.style.display = "none";
  pantallaReglas.style.display = "flex";
});

btnAtras.addEventListener("click", function () {
  pantallaPortada.style.display = "flex";
  pantallaReglas.style.display = "none";
});

// INICIAR UNA PARTIDA NUEVA
function iniciarJuego() {
  // SOLICITUD DE ALIASES
  aliasJugadorUno = prompt("Jugador 1 ingresa tu alias:");

  if (aliasJugadorUno === null || aliasJugadorUno.trim() === "") {
    aliasJugadorUno = "Jugador 1";
  } else {
    aliasJugadorUno = aliasJugadorUno.trim();
  }

  aliasJugadorDos = prompt("Jugador 2 ingresa tu alias:");

  if (aliasJugadorDos === null || aliasJugadorDos.trim() === "") {
    aliasJugadorDos = "Jugador 2";
  } else {
    aliasJugadorDos = aliasJugadorDos.trim();
  }

  // VERIFICAR QUE LOS ALIASES SEAN DIFERENTES
  while (aliasJugadorUno.toLowerCase() === aliasJugadorDos.toLowerCase()) {
    alert("Los jugadores no pueden tener el mismo alias.");

    aliasJugadorDos = prompt("Jugador 2, ingresá un alias diferente:");

    if (aliasJugadorDos === null || aliasJugadorDos.trim() === "") {
      aliasJugadorDos = "Jugador 2";

      // EVITAR QUE EL ALIAS POR DEFECTO SEA IGUAL AL DEL JUGADOR 1
      let numeroAlias = 2;

      while (aliasJugadorUno.toLowerCase() === aliasJugadorDos.toLowerCase()) {
        aliasJugadorDos = "Jugador 2 (" + numeroAlias + ")";
        numeroAlias++;
      }
    } else {
      aliasJugadorDos = aliasJugadorDos.trim();
    }
  }

  // REINICIAR LOS VALORES DE LA PARTIDA
  vidaJugador = 30;
  puntosJugador = 0;

  vidaDos = 30;
  puntosDos = 0;

  dado1 = 0;
  dado2 = 0;
  sumaDados = 0;
  resultadoFinal = 0;
  dadosJugadorTirados = false;

  tiempo = 60;
  turno = "jugador";
  juegoActivo = true;

  // ACTUALIZAR LOS TEXTOS DEL HTML
  tituloJugadorUno.textContent = aliasJugadorUno;
  tituloJugadorDos.textContent = aliasJugadorDos;

  elementoVidaJugador.textContent = vidaJugador;
  elementoPuntosJugador.textContent = puntosJugador;

  elementoVidaDos.textContent = vidaDos;
  elementoPuntosDos.textContent = puntosDos;

  elementoTiempo.textContent = tiempo;

  elementoNumeroProhibido.textContent = "";
  elementoMensajeDados.textContent = "";
  elementoResultadoFinal.textContent = "";

  elementoImagenDado1.src = "img/dado1.png";
  elementoImagenDado2.src = "img/dado1.png";

  // MOSTRAR EL TABLERO Y OCULTAR LAS OTRAS PANTALLAS
  pantallaPortada.style.display = "none";
  pantallaReglas.style.display = "none";
  tablero.style.display = "flex";
  pantallaFin.style.display = "none";

  // ELEGIR EL NUMERO PROHIBIDO ENTRE 2 Y 12
  numeroProhibido = Math.floor(Math.random() * 11) + 2;
  elementoNumeroProhibido.textContent = numeroProhibido;

  // INICIAR EL TEMPORIZADOR
  clearInterval(intervaloTiempo);
  intervaloTiempo = setInterval(actualizarTiempo, 1000);

  elementoBotonIniciar.disabled = true;

  actualizarTurno();
  actualizarBotonTirarDados();
  actualizarBotonesAccion();
}

// TIRAR LOS DOS DADOS
function tirarDados() {
  dado1 = Math.floor(Math.random() * 6) + 1;
  dado2 = Math.floor(Math.random() * 6) + 1;

  let caraDado1 = carasDados.find(function (cara) {
    return cara.valor === dado1;
  });

  let caraDado2 = carasDados.find(function (cara) {
    return cara.valor === dado2;
  });

  elementoImagenDado1.src = caraDado1.imagen;
  elementoImagenDado2.src = caraDado2.imagen;

  sumaDados = dado1 + dado2;
}

// COMPROBAR EL NUMERO PROHIBIDO
function comprobarNumeroProhibido() {
  return sumaDados === numeroProhibido;
}

// CAMBIAR EL TURNO Y ACTUALIZAR LOS BOTONES
function cambiarTurno() {
  if (turno === "jugador") {
    turno = "jugadorDos";
  } else {
    turno = "jugador";
  }

  dadosJugadorTirados = false;

  actualizarTurno();
  actualizarBotonTirarDados();
  actualizarBotonesAccion();
}

// SI SALE EL NUMERO PROHIBIDO, SE PIERDE EL TURNO
function resolverNumeroProhibido() {
  if (comprobarNumeroProhibido()) {
    elementoMensajeDados.textContent = "¡Número prohibido! Pierdes el turno.";

    cambiarTurno();
    return true;
  }
  return false;
}

// COMPROBAR SI LOS DADOS SON IGUALES
function comprobarDoble() {
  return dado1 === dado2;
}

// APLICAR EL BONUS DE +2 SI SALE DOBLE
function aplicarBonus() {
  resultadoFinal = sumaDados;

  if (comprobarDoble()) {
    resultadoFinal = resultadoFinal + 2;
  }
}

// PROCESAR EL LANZAMIENTO DE LOS DADOS
function procesarTurno() {
  if (juegoActivo === false) {
    return;
  }
  tirarDados();
  if (resolverNumeroProhibido()) {
    return;
  }
  aplicarBonus();
  elementoResultadoFinal.textContent = resultadoFinal;
  actualizarBotonesAccion();
}

// ATACAR AL OPONENTE
function atacar() {
  if (juegoActivo === false || dadosJugadorTirados === false) {
    return;
  }

  if (turno === "jugador") {
    vidaDos = vidaDos - resultadoFinal;
    elementoVidaDos.textContent = vidaDos;
    elementoMensajeDados.textContent =
      aliasJugadorUno + " atacó a " + aliasJugadorDos + ".";
  } else {
    vidaJugador = vidaJugador - resultadoFinal;
    elementoVidaJugador.textContent = vidaJugador;
    elementoMensajeDados.textContent =
      aliasJugadorDos + " atacó a " + aliasJugadorUno + ".";
  }
  finalizarTurno();
}

// SUMAR LOS PUNTOS O PERDER EL TURNO SI SE SUPERA 30

function sumarPuntos() {
  if (juegoActivo === false || dadosJugadorTirados === false) {
    return;
  }
  if (turno === "jugador") {
    if (puntosJugador + resultadoFinal <= 30) {
      puntosJugador = puntosJugador + resultadoFinal;
      elementoPuntosJugador.textContent = puntosJugador;
      elementoMensajeDados.textContent =
        aliasJugadorUno + " sumó " + resultadoFinal + " puntos.";
    } else {
      elementoMensajeDados.textContent =
        "No puedes sumar: superarías los 30 puntos.";
      cambiarTurno();
      return;
    }
  } else {
    if (puntosDos + resultadoFinal <= 30) {
      puntosDos = puntosDos + resultadoFinal;
      elementoPuntosDos.textContent = puntosDos;
      elementoMensajeDados.textContent =
        aliasJugadorDos + " sumó " + resultadoFinal + " puntos.";
    } else {
      elementoMensajeDados.textContent =
        "No puedes sumar: superarías los 30 puntos.";
      cambiarTurno();
      return;
    }
  }
  finalizarTurno();
}

// COMPROBAR LAS CONDICIONES DE VICTORIA
function comprobarVictoria() {
  if (vidaJugador <= 0) {
    finalizarJuego(
      aliasJugadorDos + " ganó la partida.",
      aliasJugadorDos,
      aliasJugadorUno,
    );
    return true;
  }
  if (vidaDos <= 0) {
    finalizarJuego(
      aliasJugadorUno + " ganó la partida.",
      aliasJugadorUno,
      aliasJugadorDos,
    );
    return true;
  }

  if (puntosJugador === 30) {
    finalizarJuego(
      aliasJugadorUno + " ganó la partida.",
      aliasJugadorUno,
      aliasJugadorDos,
    );
    return true;
  }

  if (puntosDos === 30) {
    finalizarJuego(
      aliasJugadorDos + " ganó la partida.",
      aliasJugadorDos,
      aliasJugadorUno,
    );
    return true;
  }
  return false;
}

// FINALIZAR EL TURNO
function finalizarTurno() {
  if (comprobarVictoria()) {
    return;
  }
  cambiarTurno();
}

// BOTON SUMAR
function elegirSumar() {
  if (juegoActivo === true && dadosJugadorTirados === true) {
    sumarPuntos();
  }
}

// BOTON ATACAR
function elegirAtacar() {
  if (juegoActivo === true && dadosJugadorTirados === true) {
    atacar();
  }
}

// TEMPORIZADOR DE LA PARTIDA
function actualizarTiempo() {
  if (tiempo > 0 && juegoActivo === true) {
    tiempo = tiempo - 1;
    elementoTiempo.textContent = tiempo;
    if (tiempo === 0) {
      finalizarJuego("Se acabó el tiempo. Ambos jugadores pierden.");
    }
  }
}

// BOTON PARA TIRAR LOS DADOS
function tirarDadosJugador() {
  if (turno !== "jugador" && turno !== "jugadorDos") {
    return;
  }
  if (juegoActivo === true && dadosJugadorTirados === false) {
    dadosJugadorTirados = true;
    procesarTurno();
    // Si salió el número prohibido, el turno ya cambió.
    // En caso contrario, se habilitan las acciones.
    actualizarBotonTirarDados();
    actualizarBotonesAccion();
  }
}

// MOSTRAR VISUALMENTE DE QUIEN ES EL TURNO
function actualizarTurno() {
  elementoTurnoJugador.style.backgroundColor = "";
  elementoTurnoDos.style.backgroundColor = "";

  if (turno === "jugador") {
    elementoTurnoJugador.style.backgroundColor = "#5d8fc4";
  } else {
    elementoTurnoDos.style.backgroundColor = "#c45d61";
  }
}

// HABILITAR O DESHABILITAR EL BOTON TIRAR DADOS
function actualizarBotonTirarDados() {
  if (juegoActivo === true && dadosJugadorTirados === false) {
    elementoBotonTirarDados.disabled = false;
  } else {
    elementoBotonTirarDados.disabled = true;
  }
}

// HABILITAR O DESHABILITAR LOS BOTONES DE ACCION

function actualizarBotonesAccion() {
  if (juegoActivo === true && dadosJugadorTirados === true) {
    elementoBotonAtacar.disabled = false;
    elementoBotonSumar.disabled = false;
  } else {
    elementoBotonAtacar.disabled = true;
    elementoBotonSumar.disabled = true;
  }
}

// DESHABILITAR TODOS LOS BOTONES DEL JUEGO
function deshabilitarBotones() {
  elementoBotonTirarDados.disabled = true;
  elementoBotonSumar.disabled = true;
  elementoBotonAtacar.disabled = true;
}

// FINALIZAR LA PARTIDA Y GUARDAR LOS PUNTAJES
function finalizarJuego(mensaje, ganador, perdedor) {
  juegoActivo = false;

  deshabilitarBotones();
  clearInterval(intervaloTiempo);

  elementoBotonIniciar.disabled = false;

  if (ganador && perdedor) {
    guardarPuntajes("rankingDados", [
      { alias: ganador, puntaje: 10 },
      { alias: perdedor, puntaje: 5 },
    ]);

    elementoGanador.textContent = mensaje;
    elementoGanadorDados.textContent = ganador;
    elementoMensajeRanking.textContent =
      ganador + " ganó 10 puntos para el ranking.";
  } else {
    elementoGanador.textContent = mensaje;
    elementoGanadorDados.textContent = "";
    elementoMensajeRanking.textContent =
      "Se acabó el tiempo: ambos jugadores pierden.";
  }

  tablero.style.display = "none";
  pantallaPortada.style.display = "none";
  pantallaReglas.style.display = "none";
  pantallaFin.style.display = "flex";
}

function volverInicio() {
  clearInterval(intervaloTiempo);
  juegoActivo = false;

  pantallaFin.style.display = "none";
  pantallaReglas.style.display = "none";
  tablero.style.display = "none";
  pantallaPortada.style.display = "flex";

  // Reiniciar los valores de la partida
  vidaJugador = 30;
  puntosJugador = 0;
  vidaDos = 30;
  puntosDos = 0;

  dado1 = 0;
  dado2 = 0;
  sumaDados = 0;
  resultadoFinal = 0;
  numeroProhibido = 0;

  tiempo = 60;
  turno = "jugador";
  dadosJugadorTirados = false;

  // Restaurar los textos
  elementoVidaJugador.textContent = vidaJugador;
  elementoPuntosJugador.textContent = puntosJugador;
  elementoVidaDos.textContent = vidaDos;
  elementoPuntosDos.textContent = puntosDos;
  elementoTiempo.textContent = tiempo;

  elementoNumeroProhibido.textContent = "";
  elementoResultadoFinal.textContent = "";
  elementoMensajeDados.textContent = "";

  elementoImagenDado1.src = "img/dado1.png";
  elementoImagenDado2.src = "img/dado1.png";

  tituloJugadorUno.textContent = "Jugador 1";
  tituloJugadorDos.textContent = "Jugador 2";

  elementoTurnoJugador.style.backgroundColor = "";
  elementoTurnoDos.style.backgroundColor = "";

  elementoGanador.textContent = "";
  elementoGanadorDados.textContent = "";
  elementoMensajeRanking.textContent = "";

  elementoBotonIniciar.disabled = false;
  deshabilitarBotones();
}

// ESTADO INICIAL
pantallaReglas.style.display = "none";
tablero.style.display = "none";
pantallaFin.style.display = "none";
pantallaPortada.style.display = "flex";

elementoBotonIniciar.disabled = false;
deshabilitarBotones();
