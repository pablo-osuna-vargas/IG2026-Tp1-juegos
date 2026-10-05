// Recupera puntajes acumulados. Si no hay puntajes inicializa un array vacío
let rankingGuardado = JSON.parse(localStorage.getItem("rankingTrivia")) || [];

// ordena de mayor a menor (por eso es b - a y no al revés)
rankingGuardado.sort((a, b) => b.puntaje - a.puntaje);

// muestra una <ol>
let salida = "<ol>";
rankingGuardado.forEach(jugador => {
  salida += `<li>${jugador.alias}: ${jugador.puntaje} puntos</li>`;
});
salida += "</ol>";

document.querySelector("#rankingTrivia").innerHTML = salida;

/* =================================================================================================*/
/* ===================================      CARTAS      ============================================*/
/* =================================================================================================*/

let rankingPpj = JSON.parse(localStorage.getItem("rankingPiedraPapel")) || [];

// ordena de mayor a menor (por eso es b - a y no al revés)
rankingPpj.sort((a, b) => b.puntaje - a.puntaje);

// muestra una <ol>
let puntos = "<ol>";
rankingPpj.forEach(jugador => {
  puntos += `<li>${jugador.alias}: ${jugador.puntaje} puntos</li>`;
});
puntos += "</ol>";

document.querySelector("#rankingPpt").innerHTML = puntos; 