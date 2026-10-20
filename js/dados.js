// RANKING
let rankingDados = JSON.parse(localStorage.getItem("rankingDados")) || [];

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

let vidaPC = 30;
let puntosPC = 0;

let aliasJugadorUno;
let aliasJugadorDos;

let jugadorPlantado = false;
let pcPlantada = false;

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

let elementoVidaPC = document.getElementById("vida-pc");
let elementoPuntosPC = document.getElementById("puntos-pc");

let elementoImagenDado1 = document.getElementById("img-dado1");
let elementoImagenDado2 = document.getElementById("img-dado2");

let elementoResultadoFinal = document.getElementById("resultado-final");
let elementoMensajeDados = document.getElementById("mensaje-dados");
let elementoNumeroProhibido = document.getElementById("numero-prohibido");
let elementoTiempo = document.getElementById("tiempo");

let elementoBotonSumar = document.getElementById("sumar");
let elementoBotonAtacar = document.getElementById("atacar");
let elementoBotonPlantarse = document.getElementById("plantarse");
let elementoBotonTirarDados = document.getElementById("tirar-dados");
let elementoBotonIniciar = document.getElementById("iniciar-partida");

let elementoTurnoJugador = document.getElementById("info-jugador");
let elementoTurnoPC = document.getElementById("info-pc");

const btnAtras = document.querySelector("#btn-atras");
const tablero = document.querySelector("#tablero-dados");
const bntReglas = document.querySelector("#btn-reglas");
const pantallaReglas = document.querySelector("#relgas-dado");

// TITULOS DE LOS JUGADORES
const tituloJugadorUno = elementoTurnoJugador.querySelector("h2");
const tituloJugadorDos = elementoTurnoPC.querySelector("h2");

// INICIALIZACION DE LA INTERFAZ
pantallaReglas.style.display = "none";

elementoVidaJugador.textContent = vidaJugador;
elementoPuntosJugador.textContent = puntosJugador;

elementoVidaPC.textContent = vidaPC;
elementoPuntosPC.textContent = puntosPC;

deshabilitarBotones();

// EVENTOS
elementoBotonSumar.addEventListener("click", elegirSumar);
elementoBotonAtacar.addEventListener("click", elegirAtacar);
elementoBotonPlantarse.addEventListener("click", plantarse);
elementoBotonTirarDados.addEventListener("click", tirarDadosJugador);
elementoBotonIniciar.addEventListener("click", iniciarJuego);

bntReglas.addEventListener("click", function () {
  tablero.style.display = "none";
  pantallaReglas.style.display = "block";
});

btnAtras.addEventListener("click", function () {
  tablero.style.display = "block";
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

  vidaPC = 30;
  puntosPC = 0;

  jugadorPlantado = false;
  pcPlantada = false;

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

  elementoVidaPC.textContent = vidaPC;
  elementoPuntosPC.textContent = puntosPC;

  elementoTiempo.textContent = tiempo;

  elementoNumeroProhibido.textContent = "";
  elementoMensajeDados.textContent = "";
  elementoResultadoFinal.textContent = "";

  elementoImagenDado1.src = "img/dado1.png";
  elementoImagenDado2.src = "img/dado1.png";

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
  actualizarBotonPlantarse();
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
  actualizarBotonPlantarse();
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
  actualizarBotonPlantarse();
}

// ATACAR AL OPONENTE
function atacar() {
  if (juegoActivo === false || dadosJugadorTirados === false) {
    return;
  }

  if (turno === "jugador") {
    vidaPC = vidaPC - resultadoFinal;
    elementoVidaPC.textContent = vidaPC;

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
    if (jugadorPlantado === false && puntosJugador + resultadoFinal <= 30) {
      puntosJugador = puntosJugador + resultadoFinal;
      elementoPuntosJugador.textContent = puntosJugador;

      elementoMensajeDados.textContent =
        aliasJugadorUno + " sumó " + resultadoFinal + " puntos.";
    } else {
      elementoMensajeDados.textContent =
        "No puedes sumar: superarías los 30 puntos o ya te plantaste.";

      cambiarTurno();
      return;
    }
  } else {
    if (pcPlantada === false && puntosPC + resultadoFinal <= 30) {
      puntosPC = puntosPC + resultadoFinal;
      elementoPuntosPC.textContent = puntosPC;

      elementoMensajeDados.textContent =
        aliasJugadorDos + " sumó " + resultadoFinal + " puntos.";
    } else {
      elementoMensajeDados.textContent =
        "No puedes sumar: superarías los 30 puntos o ya te plantaste.";

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

  if (vidaPC <= 0) {
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

  if (puntosPC === 30) {
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

// PLANTARSE A PARTIR DE 20 PUNTOS
function plantarse() {
  if (juegoActivo === false) {
    return;
  }

  if (turno === "jugador" && puntosJugador >= 20 && jugadorPlantado === false) {
    jugadorPlantado = true;

    elementoMensajeDados.textContent =
      aliasJugadorUno + " se plantó. Ya no puede sumar puntos.";
  } else if (turno === "jugadorDos" && puntosPC >= 20 && pcPlantada === false) {
    pcPlantada = true;

    elementoMensajeDados.textContent =
      aliasJugadorDos + " se plantó. Ya no puede sumar puntos.";
  }

  actualizarBotonesAccion();
  actualizarBotonPlantarse();
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
    actualizarBotonPlantarse();
  }
}

// HABILITAR EL BOTON PLANTARSE
function actualizarBotonPlantarse() {
  if (
    juegoActivo === true &&
    turno === "jugador" &&
    puntosJugador >= 20 &&
    jugadorPlantado === false
  ) {
    elementoBotonPlantarse.disabled = false;
  } else if (
    juegoActivo === true &&
    turno === "jugadorDos" &&
    puntosPC >= 20 &&
    pcPlantada === false
  ) {
    elementoBotonPlantarse.disabled = false;
  } else {
    elementoBotonPlantarse.disabled = true;
  }
}

// MOSTRAR VISUALMENTE DE QUIEN ES EL TURNO
function actualizarTurno() {
  elementoTurnoJugador.style.backgroundColor = "";
  elementoTurnoPC.style.backgroundColor = "";

  if (turno === "jugador") {
    elementoTurnoJugador.style.backgroundColor = "red";
  } else {
    elementoTurnoPC.style.backgroundColor = "red";
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

    if (
      (turno === "jugador" && jugadorPlantado === false) ||
      (turno === "jugadorDos" && pcPlantada === false)
    ) {
      elementoBotonSumar.disabled = false;
    } else {
      elementoBotonSumar.disabled = true;
    }
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
  elementoBotonPlantarse.disabled = true;
}

// GUARDAR LOS PUNTAJES EN LOCALSTORAGE
function guardarPuntaje(alias, puntos) {
  let existe = false;

  for (let i = 0; i < rankingDados.length; i++) {
    if (rankingDados[i].alias.toLowerCase() === alias.toLowerCase()) {
      rankingDados[i].puntaje = rankingDados[i].puntaje + puntos;

      existe = true;
      break;
    }
  }

  if (existe === false) {
    rankingDados.push({
      alias: alias,
      puntaje: puntos,
    });
  }

  localStorage.setItem("rankingDados", JSON.stringify(rankingDados));
}

// FINALIZAR LA PARTIDA Y GUARDAR LOS PUNTAJES
function finalizarJuego(mensaje, ganador, perdedor) {
  juegoActivo = false;

  deshabilitarBotones();
  clearInterval(intervaloTiempo);

  elementoBotonIniciar.disabled = false;

  if (ganador && perdedor) {
    guardarPuntaje(ganador, 10);
    guardarPuntaje(perdedor, 5);
  }

  alert(mensaje);
}

// ESTADO INICIAL
elementoBotonIniciar.disabled = false;
deshabilitarBotones();
