//ARRAY PARA IMAGENES DE LOS DADOS
let carasDados = [
  { valor: 1, imagen: "img/dado1.png" },
  { valor: 2, imagen: "img/dado2.png" },
  { valor: 3, imagen: "img/dado3.png" },
  { valor: 4, imagen: "img/dado4.png" },
  { valor: 5, imagen: "img/dado5.png" },
  { valor: 6, imagen: "img/dado6.png" },
];

//VARIABLES PARA INICIALIZAR EL JUEGO
let vidaJugador = 30;
let puntosJugador = 0;

let vidaPC = 30;
let puntosPC = 0;

let dado1;
let dado2;
let dadosJugadorTirados = false;

let sumaDados;
let resultadoFinal;

let numeroProhibido;

let tiempo = 60;
let intervaloTiempo;
let esperaPC; //esto existe para que la pc no tenga su turno instantaneamente y se puedan ver las jugadas que hace

let turno = "jugador";

let juegoActivo = true;

let jugadorPlantado = false;
let pcPlantada = false;

//CAPTURA DE ELEMENTOS DEL HTML
let elementoVidaJugador = document.getElementById("vida-jugador");
let elementoPuntosJugador = document.getElementById("puntos-jugador");
let elementoVidaPC = document.getElementById("vida-pc");
let elementoPuntosPC = document.getElementById("puntos-pc");
let elementoImagenDado1 = document.getElementById("img-dado1");
let elementoImagenDado2 = document.getElementById("img-dado2");
let elementoResultadoFinal = document.getElementById("resultado-final");
let elementoBotonSumar = document.getElementById("sumar");
let elementoBotonAtacar = document.getElementById("atacar");
let elementoNumeroProhibido = document.getElementById("numero-prohibido");
let elementoTiempo = document.getElementById("tiempo");
let elementoBotonPlantarse = document.getElementById("plantarse");
let elementoBotonTirarDados = document.getElementById("tirar-dados");
let elementoMensajeDados = document.getElementById("mensaje-dados");
let elementoTurnoJugador = document.getElementById("info-jugador");
let elementoTurnoPC = document.getElementById("info-pc");
let elementoBotonIniciar = document.getElementById("iniciar-partida");

//CONEXIÓN ENTRE EL CONTENIDO DE LA VARIABLE Y EL CONTENIDO EN EL HTML
elementoVidaJugador.textContent = vidaJugador;
elementoPuntosJugador.textContent = puntosJugador;
elementoVidaPC.textContent = vidaPC;
elementoPuntosPC.textContent = puntosPC;

//EVENTOS LINKEADOS A LAS FUNCIONES
elementoBotonSumar.addEventListener("click", elegirSumar);
elementoBotonAtacar.addEventListener("click", elegirAtacar);
elementoBotonPlantarse.addEventListener("click", plantarse);
elementoBotonTirarDados.addEventListener("click", tirarDadosJugador);
elementoBotonIniciar.addEventListener("click", iniciarJuego);

//FUNCIÓN PARA INICIAR PARTIDAS NUEVAS (Resetea contadores, timer, turno de jugadores, html y elije el número prohibido)
function iniciarJuego() {
  vidaJugador = 30;
  puntosJugador = 0;

  vidaPC = 30;
  puntosPC = 0;

  elementoVidaJugador.textContent = vidaJugador;
  elementoPuntosJugador.textContent = puntosJugador;
  elementoVidaPC.textContent = vidaPC;
  elementoPuntosPC.textContent = puntosPC;

  tiempo = 60;
  elementoTiempo.textContent = tiempo;
  clearInterval(intervaloTiempo);
  intervaloTiempo = setInterval(actualizarTiempo, 1000);
  clearTimeout(esperaPC);

  numeroProhibido = Math.floor(Math.random() * 11) + 2;
  elementoNumeroProhibido.textContent = numeroProhibido;

  elementoMensajeDados.textContent = "";
  elementoResultadoFinal.textContent = "";

  turno = "jugador";

  dado1 = 0;
  dado2 = 0;
  sumaDados = 0;
  resultadoFinal = 0;
  elementoImagenDado1.src = "img/dado1.png";
  elementoImagenDado2.src = "img/dado1.png";

  juegoActivo = true;
  jugadorPlantado = false;
  dadosJugadorTirados = false;
  pcPlantada = false;

  actualizarBotonTirarDados();
  actualizarBotonesAccion();
  actualizarBotonPlantarse();
  actualizarTurno();

  elementoBotonIniciar.disabled = true;
}

//Elije un número al azar entre 1 y 6 para cada dado, suma esos dados y los muestra, si hay bonus se aplica
function tirarDados() {
  dado1 = Math.floor(Math.random() * 6) + 1;
  dado2 = Math.floor(Math.random() * 6) + 1;

  let caraDado1 = carasDados.find(function (cara) {
    return cara.valor == dado1;
  });

  let caraDado2 = carasDados.find(function (cara) {
    return cara.valor == dado2;
  });

  elementoImagenDado1.src = caraDado1.imagen;
  elementoImagenDado2.src = caraDado2.imagen;

  sumaDados = dado1 + dado2;
}

//Comprueba si la suma de los dados es igual al nro prohibido, no hace falta if porque directamente devuelve true
function comprobarNumeroProhibido() {
  return sumaDados == numeroProhibido;
}

//Cambia el turno del jugador, necesario para casos donde toque el número prohibido a x jugador
function cambiarTurno() {
  if (turno == "jugador") {
    turno = "pc";
  } else {
    turno = "jugador";
  }
  actualizarTurno();
}

//Si el jugador de turno saca el nro prohibido pasa el turno al otro jugador, si es false sigue la partida
function resolverNumeroProhibido() {
  if (comprobarNumeroProhibido()) {
    elementoMensajeDados.textContent = "¡Número prohibido! Pierdes el turno.";
    cambiarTurno();
    return true;
  }
  return false;
}

//Comprueba si dado1 tiene el mismo número que dado2. Esto sirve para aplicar el bonus si true
function comprobarDoble() {
  return dado1 == dado2;
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
    elementoVidaPC.textContent = vidaPC;
  } else {
    vidaJugador = vidaJugador - resultadoFinal;
    elementoVidaJugador.textContent = vidaJugador;
  }
  finalizarTurno();
}

//Se chequea si jugador o pc estan plantados,
// false se agregan los puntos correspondientes. Si la suma da más de 30 puntos se pierde el turno y pasa al otro jugador
function sumarPuntos() {
  if (turno == "jugador") {
    if (puntosJugador + resultadoFinal <= 30) {
      puntosJugador = puntosJugador + resultadoFinal;
      elementoPuntosJugador.textContent = puntosJugador;
      actualizarBotonPlantarse();
      finalizarTurno();
    } else {
      elementoMensajeDados.textContent =
        "No puedes superar los 30 puntos. Pierdes el turno.";
      cambiarTurno();
      esperaPC = setTimeout(procesarTurno, 2000);
    }
  } else {
    if (pcPlantada == true) {
      cambiarTurno();
    } else if (puntosPC + resultadoFinal <= 30) {
      puntosPC = puntosPC + resultadoFinal;
      elementoPuntosPC.textContent = puntosPC;
      finalizarTurno();
    } else {
      elementoMensajeDados.textContent =
        "La PC no puede superar los 30 puntos. Pierde el turno.";
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
    finalizarJuego("La PC ganó.");
    return true;
  }

  if (vidaPC <= 0) {
    finalizarJuego("Ganaste!");
    return true;
  }

  if (puntosJugador == 30) {
    finalizarJuego("Ganaste!");
    return true;
  }

  if (puntosPC == 30) {
    finalizarJuego("La PC gano.");
    return true;
  }

  return false;
}

function procesarTurno() {
  if (juegoActivo == false) {
    return;
  }
  tirarDados();
  if (resolverNumeroProhibido()) {
    if (turno == "pc") {
      esperaPC = setTimeout(procesarTurno, 2000);
    }
    return;
  }
  aplicarBonus();
  elementoResultadoFinal.textContent = resultadoFinal;
  if (turno == "pc") {
    esperaPC = setTimeout(decidirAccionPC, 1000);
  }
}

//funcion para el funcionamiento de la pc ya que esta elige lo que hace al azar
function elegirAccionAleatoria() {
  if (Math.random() < 0.5) {
    sumarPuntos();
  } else {
    atacar();
  }
}

//la pc elige al azar si ataca o suma, se puede plantar si tiene mas de 20 puntos
function decidirAccionPC() {
  if (juegoActivo == false) {
    return;
  }
  if (turno == "pc" && pcPlantada == true) {
    atacar();
  } else if (turno == "pc" && puntosPC < 20) {
    elegirAccionAleatoria();
  } else if (turno == "pc" && puntosPC >= 20) {
    if (puntosPC + resultadoFinal == 30) {
      sumarPuntos();
    } else if (Math.random() < 0.5) {
      plantarsePC();
    } else {
      elegirAccionAleatoria();
    }
  }
}

function plantarsePC() {
  if (turno == "pc" && puntosPC >= 20) {
    pcPlantada = true;
    elementoMensajeDados.textContent =
      "La PC se plantó. Ya no puede sumar puntos.";
    atacar();
  }
}

//se comprueba si alguien gano, si no paso se juega normal y se termina el turno
function finalizarTurno() {
  if (comprobarVictoria()) {
    return;
  }
  cambiarTurno();
  if (turno == "jugador") {
    dadosJugadorTirados = false;
    actualizarBotonTirarDados();
    actualizarBotonesAccion();
  }
  if (turno == "pc") {
    esperaPC = setTimeout(procesarTurno, 2000);
  }
}

function elegirSumar() {
  if (
    turno == "jugador" &&
    jugadorPlantado == false &&
    dadosJugadorTirados == true
  ) {
    sumarPuntos();
  }
}

function elegirAtacar() {
  if (turno == "jugador" && dadosJugadorTirados == true) {
    atacar();
  }
}

function plantarse() {
  if (turno == "jugador" && puntosJugador >= 20) {
    jugadorPlantado = true;
    elementoMensajeDados.textContent =
      "Te plantaste. Ya no puedes sumar puntos.";
    actualizarBotonesAccion();
    actualizarBotonPlantarse();
  }
}

//timer de la partida
function actualizarTiempo() {
  if (tiempo > 0 && juegoActivo == true) {
    tiempo = tiempo - 1;

    elementoTiempo.textContent = tiempo;

    if (tiempo == 0) {
      finalizarJuego("Se acabó el tiempo. Ambos jugadores pierden.");
    }
  }
}

//la mecanica de tirar y evitar que el jugador tire los dados sin que sea su turno
function tirarDadosJugador() {
  if (
    turno == "jugador" &&
    juegoActivo == true &&
    dadosJugadorTirados == false
  ) {
    dadosJugadorTirados = true;
    procesarTurno();

    if (turno == "jugador") {
      actualizarBotonTirarDados();
      actualizarBotonesAccion();
    }
  }
}

//habilita el boton plantarse al llegar o superar los 20 puntos
function actualizarBotonPlantarse() {
  if (puntosJugador >= 20 && jugadorPlantado == false) {
    elementoBotonPlantarse.disabled = false;
  } else {
    elementoBotonPlantarse.disabled = true;
  }
}

//marcador visual para que se vea de quien es el turno, no es necesario que quede rojo
function actualizarTurno() {
  elementoTurnoJugador.style.backgroundColor = "";
  elementoTurnoPC.style.backgroundColor = "";
  if (turno == "jugador") {
    elementoTurnoJugador.style.backgroundColor = "red";
  } else {
    elementoTurnoPC.style.backgroundColor = "red";
  }
}

//deshabilita el boton para tirar dados
function actualizarBotonTirarDados() {
  if (turno == "jugador" && dadosJugadorTirados == false) {
    elementoBotonTirarDados.disabled = false;
  } else {
    elementoBotonTirarDados.disabled = true;
  }
}

//deshabilita botones segun se necesite, por ejemplo si el jugador esta plantado no se puede sumar
function actualizarBotonesAccion() {
  if (turno == "jugador" && dadosJugadorTirados == true) {
    elementoBotonAtacar.disabled = false;

    if (jugadorPlantado == false) {
      elementoBotonSumar.disabled = false;
    } else {
      elementoBotonSumar.disabled = true;
    }
  } else {
    elementoBotonAtacar.disabled = true;
    elementoBotonSumar.disabled = true;
  }
}

function deshabilitarBotones() {
  elementoBotonTirarDados.disabled = true;
  elementoBotonSumar.disabled = true;
  elementoBotonAtacar.disabled = true;
  elementoBotonPlantarse.disabled = true;
}

//esto es para limpiar el codigo en comprobarVictoria(), si se cumple las condiciones del if pasa a esto
function finalizarJuego(mensaje) {
  juegoActivo = false;
  deshabilitarBotones();
  clearInterval(intervaloTiempo);
  clearTimeout(esperaPC);
  elementoBotonIniciar.disabled = false;
  alert(mensaje);
}
//llamadas para que empiece el juego
elementoBotonIniciar.disabled = false;
deshabilitarBotones();
