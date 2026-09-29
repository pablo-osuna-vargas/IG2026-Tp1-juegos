// Recupera puntajes acumulados. Si no hay puntajes inicializa un array vacío
let rankingGuardado = JSON.parse(localStorage.getItem("rankingTrivia")) || [];

// Construye lista <ol> con forEach
let salida = "<ol>";
rankingGuardado.forEach(jugador => {
  salida += `<li>${jugador.alias}: ${jugador.puntaje} puntos</li>`;
});
salida += "</ol>";

// Mostrar en HTML
document.getElementById("rankingTrivia").innerHTML = salida;