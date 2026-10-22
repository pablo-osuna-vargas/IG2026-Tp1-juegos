function guardarPuntajes(claveRanking, resultados) {
  let ranking = JSON.parse(localStorage.getItem(claveRanking)) || [];

  for (let i = 0; i < resultados.length; i++) {
    let alias = resultados[i].alias;
    let puntos = resultados[i].puntaje;
    let existe = false;

    for (let j = 0; j < ranking.length; j++) {
      if (ranking[j].alias.toLowerCase() === alias.toLowerCase()) {
        ranking[j].puntaje += puntos;
        existe = true;
        break;
      }
    }

    if (existe === false) {
      ranking.push({
        alias: alias,
        puntaje: puntos,
      });
    }
  }

  localStorage.setItem(claveRanking, JSON.stringify(ranking));
}
