# Inf.-Gral---Tp1---juegos

Integrantes:
Pablo Osuna Vargas
Violeta González
Joel Ledezma

Sitio web de juegos interactivos (3)

Al equipo:
En principio van a encontrar la estructura de archivos (6 html, carpeta JS, CSS e IMG con sus archivos dentro)
Aún no hay definiciones de estilos ni de scripts así que sólo es un planteo inicial para comenzar a diseñar



Proyecto Trivia: Juego de Preguntas y Respuestas

Objetivo: Desarrollar un juego interactivo de trivia donde cada jugador responde preguntas y acumula puntaje.



Mapa de Estados del Juego

1\. Inicio

Ambos jugadores comienzan en el bloque azul.

Se define quién juega primero.

Puntaje inicial = 0.



2\. Turno de jugador

Responder: Correcto → sube 1 bloque. Incorrecto → baja 1 bloque.

Arriesgar (solo si está en desventaja): Correcto → sube 2 bloques. Incorrecto → baja 1 bloque.



3\. Feedback visual

Se muestra el bloque alcanzado.

Bloque negro aparece solo si se cae hasta allí.

Bloque blanco aparece solo si se llega a la cima.

Mensajes textuales acompañan el color.



4\. Cambio de turno

Se deshabilita el botón del jugador contrario. Se habilita el botón del jugador activo.

Se alternan los turnos.



5\. Condiciones de fin

Victoria: el primero en llegar al bloque blanco.

Derrota: el que cae al bloque negro.

Se muestra cartel de GANADOR.



6\. Reinicio

Botón Reiniciar → vuelve al estado inicial (bloque azul, puntaje 0).

Mensajes narrativos de feedback

Respuesta correcta (ejemplo): “¡Correcto! Estás en el camino del conocimiento.”

Respuesta incorrecta: “Incorrecto… debes tener cuidado, te acercas a la oscuridad.”

Arriesgar correcto: “¡Valiente decisión! Tu conocimiento te impulsa dos escalones hacia la luz.”

Arriesgar incorrecto: “El riesgo te hizo caer, retrocedes en tu camino.”



Fin del juego

Ganador (blanco): “Has alcanzado la luz, símbolo de sabiduría y victoria.”

Perdedor (negro): “Has caído en la oscuridad, donde el color desaparece.”



Puntos clave:

Estado inicial siempre en azul.

Bloques extremos (negro y blanco) solo aparecen al alcanzarlos.

Turnos alternados con botones deshabilitados fuera de turno.

No hay empate simultáneo: el juego termina en el turno en que alguien alcanza blanco o negro.

Mensajes narrativos refuerzan la metáfora de sumar colores hasta la luz y evitar la oscuridad de no-color.



Estoy trabajando en el código haciendo un mix de lo que vimos en las prácticas

