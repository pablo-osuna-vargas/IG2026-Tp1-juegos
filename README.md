# "LUDOTERNA"

### Integrantes:

- Pablo Osuna Vargas.
- Joel Ledezma.
- Ángel León Cabral.

Sitio web de 3 juegos interactivos los cuales usan cartas **(Tríada)**, dados **(Cadencia)** y preguntas mediante el uso de una API **(Crescendo)**.

> Se eligió "Ludoterna" como el nombre del proyecto para unificar el sitio y su contenido bajo un mismo nombre. El nombre fue creado a partir de las palabras:
>
> - Ludoteca -> Centro de recreo donde se guardan juegos y juguetes para su uso y préstamo.
> - Terna: trío o conjunto de tres personas, animales o cosas. <sub>
>   (Originalmente era Ternario cuya definición en la música hace referencia a una forma musical de tres partes, sin embargo, "Ludoternario" era demasiado largo y no muy memorable, así que prefería hacer referencia al trío de juegos que ya tenemos.) </sub>

### TRÍADA (Juego de cartas):

Versión del popular juego "Piedra, papel o tijera".

> Se eligió el nombre **"Tríada"** porque su significado musical se relaciona con las mecánicas del juego y con la temática general del sitio. En música, una tríada es un conjunto de tres notas que forman una unidad armónica. De manera similar, el juego se basa en tres opciones: Piedra, Papel y Tijera que interactúan entre sí mediante reglas de victoria y derrota. Además, el nombre refuerza la identidad musical del proyecto y permite mantener una coherencia entre la temática del sitio y la identidad del juego.

#### PROCESO:

1. Cada jugador elije una carta cliqueando sobre ella, una vez cliqueadas la carta de cada jugador se comparan y se muestra el resultado en pantalla.
2. Se declara ganador al mejor de 3 rondas mostrando un mensaje de felicitaciones en una nueva pantalla.
3. El ganador recibe 10 puntos que se acumulan en el ranking de Puntajes, el perdedor obtiene 5 puntos.

#### CORRECCIONES:

- **PROBLEMA:** Los mensajes de turno no mostraban los alias de los jugadores, sino que mostraban `undefined`.
  - **Solución:** Se movieron las dos líneas que actualizan los mensajes de turno dentro del evento del botón `btcSig`, después de los `prompt` que solicitan los alias de los jugadores. De esta manera, los mensajes muestran los nombres ingresados al comenzar la partida.
- **PROBLEMA:** Si un jugador no ingresaba un alias o cancelaba el `prompt`, el nombre podía mostrarse como `null` o quedar vacío.
  - **Solución:** Se agregaron condiciones `if` para asignar un nombre predeterminado (Jugador 1 o Jugador 2) cuando no se ingresa un alias. También se eliminan los espacios al principio y al final del nombre mediante `trim()`.
- **PROBLEMA:** Los dos jugadores podían ingresar el mismo alias, incluso usando diferentes combinaciones de mayúsculas y minúsculas.
  - **Solución:** Se agregó una validación con `while` para volver a solicitar el alias del segundo jugador si coincide con el del primero. Se utiliza `toLowerCase()` para comparar los nombres sin distinguir entre mayúsculas y minúsculas.

### CADENCIA (Juego de dados):

> Se eligió el nombre **"Cadencia"** porque es un término musical que hace referencia a una sucesión o progresión de sonidos y acordes. Este concepto se relaciona con la dinámica del juego, en el que los turnos se suceden y cada jugador debe tomar decisiones estratégicas entre atacar, sumar puntos o plantarse. Además, el límite de 60 segundos aporta un ritmo constante a la partida, reforzando la relación entre el nombre elegido y la temática musical del sitio.

#### PROCESO:

1. Cada partida tiene un límite de 60 segundos. Ambos jugadores comienzan con 30 de vida y 0 puntos. Al comenzar la partida se genera un número prohibido entre 2 y 12. Si el resultado de la suma de los dados coincide con ese número, se pierde el turno.
2. En cada turno se tiran dos dados de 1 a 6 y se suma su resultado. Si los dados son iguales, se obtiene un bonus de +2.
3. El jugador puede elegir entre **Atacar**, para restar el resultado a la vida del oponente, o **Sumar**, para agregarlo a sus puntos.
4. La partida termina cuando uno de los jugadores llega a 0 de vida, alcanza exactamente 30 puntos o se acaba el tiempo. Si se acaba el tiempo, ambos jugadores pierden.

#### CORRECCIONES:

- **PROBLEMA:** La primera versión del juego estaba pensado para que una persona compitiera contra la computadora y no coincidía con el modo de juego para 2 persona de los otros juegos en el sitio.
  - **Solución:** Se reemplazó el modo de juego contra pc con un nuevo modo de juego para dos presonas. De esta manera, dos personas pueden enfrentarse entre sí y participar de la misma partida.
- **PROBLEMA:** Era necesario identificar a cada jugador mediante su alias para distinguirlos durante la partida y registrar sus resultados correctamente.
  - **Solución:** Se adaptó el sistema de aliases para que cada jugador pueda ser identificado de forma independiente.
- **PROBLEMA:** Los puntajes de Cadencia debían mostrarse junto con los de los otros juegos.
  - **Solución:** Se agregó un ranking propio para Cadencia en la página de puntajes.

### CRESCENDO (Juego de Preguntas):

Juego de preguntas y respuestas Verdadero o Falso sobre música internacional en general para 2 jugadores.

> Se eligió el nombre **"Crescendo"** porque es un término musical que indica un aumento progresivo de la intensidad del sonido. Este concepto se relaciona con la mecánica del juego, en el que los jugadores responden preguntas de Verdadero o Falso sobre música y musicales, acumulando puntos con las respuestas correctas y perdiéndolos con las incorrectas. Cada acierto permite avanzar hacia el volumen máximo, mientras que los errores alejan al jugador de ese objetivo. De esta manera, el nombre representa la progresión de la partida y refuerza la temática musical del sitio.

#### PROCESO:

1. El objetivo del juego es completar los bloques de color del tablero de cada jugador respondiendo preguntas correctamente.
2. Quien llegue al "máximo de volumen" (color blanco) gana la partida. En cambio quien "baje al mínimo" (color Negro) perderá automáticamente.
3. Si la respuesta es correcta suma 1 punto y suma un bloque de color en su tablero y continúa con la siguiente pregunta.
4. En caso de respuesta incorrecta pierde 1 punto, se le quita 1 color y cambia el turno al oponente.
5. el puntaje de cada jugador se verá reflejado en el ranking general de juegos

## SISTEMA DE ARCHIVOS:

- Una carpeta principal del proyecto con 6 archivos `HTML`.

- Una carpeta `CSS` para los estilos generales del sitio y los estilos específicos de cada juego.

- Una carpeta `IMG` con las imágenes usadas en el sitio.

- Una carpeta `JS` con la lógica interactiva de cada juego, el cálculo de puntajes y el sistema de ranking.

- Un archivo `README.md` con la documentación, el progreso y las consultas del proyecto.

## TECNOLOGÍAS Y HERRAMIENTAS USADAS:

**Tecnologías de desarrollo**

- HTML5
- CSS3
- JavaScript

**Editores de código**

- Visual Studio Code
- Sublime Text

**Control de versiones y repositorio**

- Git
- GitHub
- GitHub Desktop

**Herramientas de inteligencia artificial**

- ChatGPT
- Claude
- Github Copilot

### FUNCIONALIDADES

**Generales**

- Presentación de cada juego, instrucciones e interfaz en pantallas sucesivas.
- Mensajes dinámicos de feedback sobre los estados de la partida.
- Feedback visual según la interacción del usuario, mediante mensajes, bloques de color y selección de cartas.
- Acumulación de puntajes en `localStorage` para su posterior consulta en la página de rankings.

**Tríada**

- Selección de cartas para jugar a Piedra, Papel o Tijera.
- Comparación de las elecciones para determinar el resultado de cada ronda.
- Asignación de puntajes según el resultado de la partida.

**Cadencia**

- Lanzamiento de dos dados por turno y elección entre atacar al oponente o sumar puntos.
- Bonificación por obtener dados iguales y pérdida del turno al obtener el número prohibido.
- Opción de plantarse a partir de los 20 puntos.
- Límite de tiempo de 60 segundos y condiciones de victoria según los puntos acumulados o la vida del oponente.

**Crescendo**

- Obtención dinámica de preguntas y respuestas de Verdadero o Falso mediante una API externa.
- Selección aleatoria de preguntas e indicación del jugador que debe responder.
- Generación de opciones para responder y feedback sobre si la respuesta es correcta o incorrecta.
- Sistema de volumen que aumenta o disminuye según las respuestas de cada jugador.
- Condiciones de victoria y derrota según se alcance el volumen máximo o mínimo.

### API

- **Open Trivia DB:** API externa utilizada en Crescendo para obtener preguntas de Verdadero o Falso de la categoría 12 (_Entertainment: Music_).

#### DECISIONES TÉCNICAS

- Funciones de inicialización y configuración de cada juego.
- Funciones de validación de acciones y actualización de estados de juego.
- Operadores ternarios para resolver cambios de turno según las condiciones de cada juego.
- Variables y contadores para administrar puntajes, vidas, turnos y tiempo.
- Arrays para almacenar temporalmente las preguntas y respuestas obtenidas de la API.
- Estructuras repetitivas para recorrer los rankings y verificar la existencia de alias, acumulando puntajes o creando nuevos registros según corresponda.
- Funciones para verificar las condiciones de finalización de rondas y partidas.
- Funciones asíncronas (`async/await`) y uso de `fetch()` para realizar solicitudes a la API.
- Manejo de errores mediante `try/catch` para detectar problemas durante la solicitud o el procesamiento de los datos recibidos.

### DECLARACIÓN DE USO DE IA

Se utilizaron GitHub Copilot, Claude y ChatGPT como herramientas de asistencia durante el desarrollo del proyecto para:

- Mejorar y revisar modelos de pseudocódigo.
- Consultar y mejorar estilos CSS, principalmente relacionados con el diseño y la distribución de los elementos (_layout_).
- Analizar y organizar funciones para favorecer la reutilización del código.
- Comprender la lógica interna de métodos y operadores de JavaScript como `.sort()`, el operador spread (`...`) y los criterios de comparación y ordenamiento de valores.
- Detectar, analizar y corregir errores durante el desarrollo.
- Recibir asistencia en la implementación de `localStorage` para guardar puntajes y mostrar resultados.
- Sintetizar y resumir la documentación de las API utilizadas.

### PRUEBAS DE USABILIDAD:

#### Tríada – 29/09

- **Condición inicial:** puntajes en 0 y pantalla de inicio visible.
- **Acción:** el jugador presiona dos veces seguidas el botón de selección (piedra, papel o tijera) en un lapso muy corto.
- **Resultado esperado:** se juega una sola ronda y el puntaje del ganador aumenta una sola vez; la partida termina al llegar a 3 rondas ganadas.
- **Resultado observado:** el usuario no entendió las reglas y no pudo terminar la partida; el contador no finalizaba.

##### Problemas detectados:

- Falta de claridad en las reglas (qué gana a qué, cuántas rondas hay, cómo se gana la partida).
- Los clics repetidos disparaban más de una ronda y desordenaban el contador.
- La condición para determinar el ganador no lo estaba detectando.

##### Soluciones:

- Reescribir las reglas para que se entiendan a primera vista.
- Reemplazar la condición del if por el numero límite.
  > if (contadorJugadorUno === 3) y if (contadorJugadorDos === 3).

#### Crescendo

##### Problemas detectados:

- Prompt de nombres/alias de jugador permite dejar vacíos los campos y queda aliasJugador = null. Podría hacerse una nueva verificación si están los campos vacíos y pedir de nuevo (pendiente) o dejar "Jugador1" y "Jugador2" como default
- Campos de input para respuesta: como eran completados por el usuario a veces había respuestas escritas verificadas como correctas y a veces con números el programa las tomaba incorrectas (ej.: lados de un triángulo? "tres" era correcta y "3" no lo era)
- Si por un "missclick" el usuario dejaba el campo vacío perdía el turno. Podrían hacerse botones en lugar de inputs y su verificación
- Estilos de trivia: centrar logo, botones. Ajustar "ul" para mejor visibilidad en Ayuda (pendiente)

##### Soluciones:

- Se implementó un sistema de alias predeterminados (Jugador1 y Jugador2) para evitar valores nulos cuando los campos de nombre se dejan vacíos. (21/10)
- Se implementó la API final (OpenTrivia) con fetching de preguntas con respuestas correcta-incorrecta (verdadero-falso) y generar las opciones de botones correspondientes.

> Un gran inconveniente fue intentar usar inicialmente la API "MusicBrainz" que si bien es específica para música rock internacional, los endpoints a los que pedíamos datos nos resultaron muy complejos de leer para capturar los valores precisos dentro de cada objeto devuelto para crear dinámicamente las preguntas de la Trivia. La mayoría de las veces nos arrojaban datos "genre" o "empty" al capturar valores de "name" o de "releases". Intentamos filtrar mas generalmente con "music" en general pero el resultado fue el contrario al esperado volviéndose demasiado extenso cada array dentro de los "results" (fechas de lanzamiento de álbum se mezclaban con fechas de grabaciones; nombres de álbumes se mezclaban con nombres de artistas y casos por el estilo). Idealmente nos hubiera gustado hacer uso de esta API y lograr una captura más precisa pero decidimos enfocarnos en resolver la funcionalidad del programa para cumplir con los requisitos del tp.

### (IMPLEMENTACIÓN) Unificación del guardado de puntajes:

- Se creó el archivo `ranking.js` con la función reutilizable `guardarPuntajes()`, para centralizar el guardado de puntajes de los tres juegos.
- Se adaptaron `cartas.js`, `dados.js` y `preguntas.js` para utilizar la función compartida.
- Se mantuvo la acumulación de puntos de los jugadores en sus respectivos rankings de `localStorage`.
- Se conservaron las claves `rankingPiedraPapel`, `rankingDados` y `rankingTrivia`, por lo que no fue necesario modificar `puntajes.js`.
- Se mantuvo la comparación de alias sin distinguir mayúsculas y minúsculas, evitando que un mismo jugador aparezca con registros separados.
- Se eliminaron las funciones y declaraciones de rankings que dejaron de ser necesarias en los archivos individuales.

> CORRECCIONES A PARTIR DEL 17/10 HECHAS SOLAMENTE POR ÁNGEL CABRAL PARA EL RECUPERATORIO DEL TP N°1

### SOLUCIONES PENDIENTES:

##### CSS y LAYOUT:

- [ ] Unificación de los estilos y estética general del sitio.
- [ ] Usar el mismo formato para los 3 juegos (Portada, Instrucciones, Reglas y Tablero)
- [ ] Destacar cartas elegidas y ocultar las otras en Tríada. Mejor distinción de turnos.
- [ ] Hacer un tablero en Cadencia.
- [ ] Corregir visibilidad de los mensajes de correcto e incorrecto en Crescendo, hacer cambio de turno y mensajes de ganar o perder (Organizarlos y hacer un sistema para que se vea uno a la vez, con delay)

##### INFO:

- [x] Agregar más información y formatear correctamente.
- [ ] Agregar imágenes y créditos si es necesario.

##### JS:

- [x] TRÍADA: Corregir "undefined" en el mensaje "elige una carta".
- [x] CADENCIA: falta el localStorage para usar en la pagina de Puntajes. Cambiar a dos jugadores humanos para que se conserve el mismo modo de jugar entre 2 personas.
- [x] CRESCENDO: "Jugador 1" y "Jugador 2" deberían usar los datos del prompt ingresados al inicio de la trivia.
- [x] La lógica de localStorage (cartas, trivia y eventualmente dados) se repite x cada jugador. Habría que unificar y hacer una lógica que pueda cargar tanto si es uno, dos o mas jugadores.

##### README:

- [x] Editar y distinguir títulos, subtítulos, párrafos para que sea mas legible
- [x] Integrar todos los "pendientes" y "bugs" que hayan quedado al momento de la entrega
- [x] Comentar brevemente las mejoras mas significativas
- [x] Corregir tecnologias usadas
- [x] Corregir Declaración IA.
