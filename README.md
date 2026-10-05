# Informática General

# Cát.: Drelichman

# Tp1 Juegos



"GOLPE DE SUERTE"



Integrantes:
Pablo Osuna Vargas
Joel Ledezma



Sitio web de juegos interactivos (3) de cartas, dados y trivia



Juego de cartas:

versión del popular juego "Piedra, papel o tijera"



\-cada jugador elije una carta cliqueando sobre ella, una vez cliqueadas la carta de cada jugador se comparan y se muestra el resultado en pantalla

\-se declara ganador al mejor de 3 rondas mostrando un mensaje de felicitaciones en un a nueva pantalla

\-el ganador recibe 10 puntos que se acumulan en el ranking de Puntajes



Juego de dados:

\-Es un juego de Jugador vs. PC. Cada partida funciona de manera independiente y tiene un límite de 60 segundos.

\-ambos jugadores comienzan con 30 de vida y 0 puntos.

\-en cada turno se tiran dos dados de 1 a 6 y se suma su resultado. Si los dados son iguales, se obtiene un bonus de +2.

\-el jugador puede elegir entre **Atacar**, para restar el resultado a la vida del oponente, o **Sumar**, para agregarlo a sus puntos.

\-los puntos no pueden superar los 30. Si una suma supera los 30, los puntos no aumentan y se pierde el turno.

\-al comenzar la partida se genera un número prohibido entre 2 y 12. Si el resultado de los dados coincide con ese número, se pierde el turno.

\-a partir de los 20 puntos, el jugador puede **plantarse**. Al hacerlo, conserva sus puntos y ya no puede sumar, pero puede seguir atacando.

\-la PC sigue las mismas reglas y decide sus acciones según sus puntos y el resultado de los dados.

\-la partida termina cuando uno de los jugadores llega a 0 de vida, alcanza exactamente 30 puntos o se acaba el tiempo.

\-si se acaba el tiempo, ambos jugadores pierden.





Juego de Trivia:

"Planeta Música"

juego de preguntas y respuestas Verdadero o Falso sobre música internacional en general para 2 jugadores



\-el objetivo del juego es completar los bloques de color del tablero de cada jugador respondiendo preguntas correctamente

\-quien llegue al "máximo de volumen" (color blanco) gana la partida. En cambio quien "baje al mínimo" (color Negro) perderá automáticamente

\-si la respuesta es correcta suma 1 punto y suma un bloque de color en su tablero y continúa con la siguiente pregunta

\-en caso de respuesta incorrecta pierde 1 punto, se le quita 1 color y cambia el turno al oponente

\-el puntaje de cada jugador se verá reflejado en el ranking general de juegos



SISTEMA DE ARCHIVOS:

\-una carpeta de proyecto con 6 archivos .HTML (presentación, juegos, ranking de puntajes e info general)

\-1 carpeta CSS para los estilos generales y de cada juego

\-1 carpeta IMG para imágenes usadas en el sitio

\-1 carpeta JS  con la lógica interactiva de cada juego y del ranking

\-README para progreso y consulta del proyecto



TECNOLOGÍAS USADAS:

VISUAL STUDIO, SUBLIME, GITHUB desktop y web, IA



FUNCIONALIDADES:

\-presentación del juego, instrucciones e interfaz en pantallas sucesivas

\-mensajes dinámicos de feedback informativo sobre los estados de juego

\-feedback visual de acuerdo a la interacción (mensajes, bloques de color, selección de cartas)

\-mediante un pedido a una API se carga dinámicamente un array vacío con preguntas y respuestas Verdadero o Falso (trivia)

\-se muestra en pantalla la pregunta seleccionada de forma aleatoria indicando cual de los jugadores debe contestar (trivia)

\-se generan las opciones correspondientes para que el jugador elija y se muestra en pantalla si la respuesta fue correcta o incorrecta (trivia)

\-acumulación de puntajes en localStorage para visualizarlos en su propia página



API:

OpenTrivia (endpoint - category 12 - Entertaninment: Music)



DECISIONES TÉCNICAS:

\-funciones de inicio y setup de cada juego

\-funciones de validación y cambio de estado del juego

\-operadores ternarios para cambio de turnos

\-contadores para puntajes

\-arrays vacíos de carga de datos

\-estructuras repetitivas para verificar los nombres de jugadores. Si existen se actualiza si no existen se crean

\-funciones de verificación de final de partidas o rondas

\-función async para hacer fetch a la API (try y catch para mostrar errores de conectividad y de recopilación de datos)



DECLARACIÓN DE IA:

IA utilizadas: Copilot y Claude



\-mejora de modelos de pseudocódigo

\-consulta y mejora de estilos, principalmente para layout

\-consulta y agrupamiento de funciones para mejor modularidad y reutilización de código

\-profundización de la lógica interna de métodos (por ej. .sort o .spread y cómo compara y acomoda los valores de propiedades de objetos)

\-validador de errores

\-asistencia en la implementación de localStorage para guardar puntajes y mostrar resultados





PRUEBAS DE USABILIDAD:



\*\* Piedra, papel o tijera – 29/09 \*\*
-Condición inicial: puntajes en 0 y pantalla de inicio visible.
-Acción: el jugador presiona dos veces seguidas el botón de selección (piedra, papel o tijera) en un lapso muy corto.
-Resultado esperado: se juega una sola ronda y el puntaje del ganador aumenta una sola vez; la partida termina al llegar a 3 rondas ganadas.
-Resultado observado: el usuario no entendió las reglas y no pudo terminar la partida; el contador no finalizaba.
Problemas detectados
-Falta de claridad en las reglas (qué gana a qué, cuántas rondas hay, cómo se gana la partida).
-Los clics repetidos disparaban más de una ronda y desordenaban el contador.
-La condición para determinar el ganador no lo estaba detectando.



Solución
-Reemplazar la condición del if por el numero limite directamente
if (contadorJugadorUno === 3) y if (contadorJugadorDos === 3).

* Reescribir las reglas para que se entiendan a primera vista.



\*\* Trivia - 29/9 \*\*

A-prompt de nombres/alias de jugador permite dejar vacíos los campos y queda aliasJugador = null. Podría hacerse una nueva verificación si están los campos vacíos y pedir de nuevo (pendiente) o dejar "Jugador1" y "Jugador2" como default

B-campos de input para respuesta: como eran completados por el usuario a veces había respuestas escritas verificadas como correctas y a veces con números el programa las tomaba incorrectas (ej.: lados de un triángulo? "tres" era correcta y "3" no lo era)

C-si por un "missclick" el usuario dejaba el campo vacío perdía el turno. Podrían hacerse botones en lugar de inputs y su verificación

D-estilos de trivia: centrar logo,  botones. Ajustar <ul> para mejor visibilidad en Ayuda (pendiente)



La solución de A queda pendiente

La solución a B y C fue directamente la implementación de la API final (OpenTrivia) con fetching de preguntas con respuestas correcta-incorrecta (verdadero-falso) y generar las opciones de botones correspondientes



Un gran inconveniente fue intentar usar inicialmente la API "MusicBrainz" que si bien es específica para música rock internacional, los endpoints a los que pedíamos datos nos resultaron muy complejos de leer para capturar los valores precisos dentro de cada objeto devuelto para crear dinámicamente las preguntas de la Trivia. La mayoría de las veces nos arrojaban datos "genre" o "empty" al capturar valores de "name" o de "releases". Intentamos filtrar mas generalmente con "music" en general pero el resultado fue el contrario al esperado volviéndose demasiado extenso cada array dentro de los "results" (fechas de lanzamiento de álbum se mezclaban con fechas de grabaciones; nombres de álbumes se mezclaban con nombres de artistas y casos por el estilo). Idealmente nos hubiera gustado hacer uso de esta API y lograr una captura más precisa pero decidimos enfocarnos en resolver la funcionalidad del programa para cumplir con los requisitos del tp

