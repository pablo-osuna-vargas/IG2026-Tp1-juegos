/* =================================================================================================*/
/* ===================================      CRESCENDO      =========================================*/
/* =================================================================================================*/

// Recupera puntajes acumulados. Si no hay puntajes inicializa un array vacío
let rankingGuardado = JSON.parse(localStorage.getItem("rankingTrivia")) || [];

// Ordena de mayor a menor
rankingGuardado.sort((a, b) => b.puntaje - a.puntaje);

// Muestra una lista ordenada o un mensaje si está vacío
let salida = "";

if (rankingGuardado.length === 0) {
  salida = '<p class="ranking-vacio"> Todavía no hay puntajes registrados.</p>';
} else {
  salida = "<ol>";
  rankingGuardado.forEach((jugador) => {
    salida += `<li>${jugador.alias}: ${jugador.puntaje} puntos</li>`;
  });
  salida += "</ol>";
}

document.querySelector("#rankingTrivia").innerHTML = salida;

/* =================================================================================================*/
/* ===================================       TRÍADA       ==========================================*/
/* =================================================================================================*/

let rankingPpj = JSON.parse(localStorage.getItem("rankingPiedraPapel")) || [];

// Ordena de mayor a menor
rankingPpj.sort((a, b) => b.puntaje - a.puntaje);

// Muestra una lista ordenada o un mensaje si está vacío
let puntos = "";

if (rankingPpj.length === 0) {
  puntos = '<p class="ranking-vacio"> Todavía no hay puntajes registrados.</p>';
} else {
  puntos = "<ol>";
  rankingPpj.forEach((jugador) => {
    puntos += `<li>${jugador.alias}: ${jugador.puntaje} puntos</li>`;
  });
  puntos += "</ol>";
}

document.querySelector("#rankingPpt").innerHTML = puntos;

/* =================================================================================================*/
/* ===================================      CADENCIA      ==========================================*/
/* =================================================================================================*/

// Recupera los puntajes guardados por el juego de dados
let rankingDados = JSON.parse(localStorage.getItem("rankingDados")) || [];

// Ordena de mayor a menor
rankingDados.sort((a, b) => b.puntaje - a.puntaje);

// Muestra una lista ordenada o un mensaje si está vacío
let puntosDados = "";

if (rankingDados.length === 0) {
  puntosDados =
    '<p class="ranking-vacio"> Todavía no hay puntajes registrados.</p>';
} else {
  puntosDados = "<ol>";

  rankingDados.forEach((jugador) => {
    puntosDados += `<li>${jugador.alias}: ${jugador.puntaje} puntos</li>`;
  });

  puntosDados += "</ol>";
}

document.querySelector("#rankingDados").innerHTML = puntosDados;
