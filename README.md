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

misterio



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

