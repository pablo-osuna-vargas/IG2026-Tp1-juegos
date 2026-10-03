//VARIABLES PARA INICIAR EL JUEGO

let vidaJugador = 20;
let puntosJugador = 0;

let vidaPC = 20;
let puntosPC = 0;

let dado1;
let dado2;

let sumaDados;
let resultadoFinal;

let numeroProhibido;

let tiempo = 90;

let turno = "jugador";

let juegoActivo = true;

let jugadorPlantado = false;
let pcPlantada = false;

//FUNCIÓN PARA INICIAR PARTIDAS NUEVAS (Resetea contadores, timer, turno de jugadores y elije el número prohibido)
function iniciarJuego() {
  vidaJugador = 20;
  puntosJugador = 0;

  vidaPC = 20;
  puntosPC = 0;

  tiempo = 90;

  numeroProhibido = Math.floor(Math.random() * 11) + 2;

  turno = "jugador";

  juegoActivo = true;
  jugadorPlantado = false;
  pcPlantada = false;
}

//Elije un número al azar entre 1 y 6 para cada dado y luego suma esos dados
function tirarDados() {
  dado1 = Math.floor(Math.random() * 6) + 1;
  dado2 = Math.floor(Math.random() * 6) + 1;

  sumaDados = dado1 + dado2;
}

//Comprueba si la suma de los dados es igual al nro prohibido
function comprobarNumeroProhibido() {
  if (sumaDados == numeroProhibido) {
    return true;
  } else {
    return false;
  }
}

//Cambia el turno del jugador, necesario para casos donde toque el número prohibido a x jugador
function cambiarTurno() {
  if (turno == "jugador") {
    turno = "pc";
  } else {
    turno = "jugador";
  }
}

//Si comprobarNumeroProhibido es true (osea, si el jugador de turno saca el nro prohibido)
//pasa el turno al otro jugador, si es false sigue la partida
function resolverNumeroProhibido() {
  if (comprobarNumeroProhibido()) {
    cambiarTurno();
    return true;
  }
  return false;
}

//Comprueba si dado1 tiene el mismo número que dado2. Esto sirve para aplicar el bonus si return true
function comprobarDoble() {
  if (dado1 == dado2) {
    return true;
  } else {
    return false;
  }
}

//Si comprobarDoble es true se le suman 2 puntos al total de la suma de dados
function aplicarBonus() {
  resultadoFinal = sumaDados;

  if (comprobarDoble()) {
    resultadoFinal = resultadoFinal + 2;
  }
}

//Chequea si es el turno del humano o de la PC y le resta los puntos de vida al oponente
function atacar() {
  if (turno == "jugador") {
    vidaPC = vidaPC - resultadoFinal;
  } else {
    vidaJugador = vidaJugador - resultadoFinal;
  }
  finalizarTurno();
}

//Suma el resultado final de los dados al puntaje del jugador en curso,
//si supera los 30 puntos ese jugador pierde el turno
function sumarPuntos() {
  if (turno == "jugador") {
    if (puntosJugador + resultadoFinal <= 30) {
      puntosJugador = puntosJugador + resultadoFinal;
      finalizarTurno();
    } else {
      alert("No puedes superar los 30 puntos. Pierdes el turno.");
      cambiarTurno();
    }
  } else {
    if (puntosPC + resultadoFinal <= 30) {
      puntosPC = puntosPC + resultadoFinal;
      finalizarTurno();
    } else {
      cambiarTurno();
    }
  }
}

//Se comprueba si el jugador llegó a los 30 puntos o si llegó a 0 vidas
//En caso de que sea true se termina la partida y gana el oponente

//NO SE CUENTA EL TIMER, en ese escenario ambos jugadores pierden
//mientras que acá se evalúan solamente las condiciones de victoria
function comprobarVictoria() {
  if (vidaJugador <= 0) {
    juegoActivo = false;
    alert("La PC ganó.");
    return true;
  }

  if (vidaPC <= 0) {
    juegoActivo = false;
    alert("Ganaste.");
    return true;
  }

  if (puntosJugador == 30) {
    juegoActivo = false;
    alert("Ganaste.");
    return true;
  }

  if (puntosPC == 30) {
    juegoActivo = false;
    alert("La PC ganó.");
    return true;
  }

  return false;
}

function procesarTurno() {
  tirarDados();

  if (resolverNumeroProhibido()) {
    return;
  }

  aplicarBonus();

  if (turno == "pc") {
    decidirAccionPC();
  }
}

function elegirAccionAleatoria() {
  if (Math.random() < 0.5) {
    sumarPuntos();
  } else {
    atacar();
  }
}

function decidirAccionPC() {
  if (turno == "pc" && puntosPC < 20) {
    elegirAccionAleatoria();
  } else if (turno == "pc" && puntosPC >= 20) {
    if (puntosPC + resultadoFinal == 30) {
      sumarPuntos();
    } else {
      elegirAccionAleatoria();
    }
  }
}

function finalizarTurno() {
  if (comprobarVictoria()) {
    return;
  }

  cambiarTurno();
}

function elegirSumar() {
  if (jugadorPlantado == false) {
    sumarPuntos();
  }
}

function elegirAtacar() {
  atacar();
}

function plantarse() {
  jugadorPlantado = true;
}
