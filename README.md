# SHARKS AT THE SEA

El objetivo del juego es conseguir que el submarinista permanezca el máximo tiempo posible en el agua sin ser devorado por los tiburones. 

### MVP (DOM - CANVAS)
El submarinista tiene que moverse sobre el eje de las Y para esquivar a los tiburones. Los tiburones van apareciendo de forma aleatoria y su frecuencia se ve incrementada con el paso del tiempo. 

### DATA STRUCTURE
1. index.html
2. main.js
3. game.js
4. player.js
5. obstacle.js

#### 1. index.html
Pantalla Inicio, instrucciones del juego y botón Play Game. 

#### 2. Class Main
Lógica del juego. 

#### 3. Class Game
Classe Game para dibujar el canvas con background image. 
- Propiedades: 
    - Canvas
    - Ctx
    - Diver
    - Shark
    - Time
    - Score
- Metodos:
    - Start
    - Draw
    - ClearCanvas
    - StartLoop
    - CheckCollision
    - CheckTime
    - CountScore 
    - GameOver

#### 4. Class Player
- Propiedades: 
    - Canvas
    - Ctx
    - Width
    - Height
    - x
    - y
    - Direction
    - Speed
- Métodos: 
    - Draw
    - Move

#### 5. Class Shark
- Propiedades: 
    - Canvas
    - Ctx
    - Size
    - x
    - y
    - Speed
- Metodos: 
    - Draw
    - Move

### STATES AND TRANSITIONS
#### START GAME
Pantalla inicial. 
Botón Play Game
#### GAME 
Desarrollo del juego
Fin del juego cuando jugador choca con tiburón
#### GAME OVER
Your Score
Play Again

### BONUS
Player que se mueva en el eje de las X.
Movimiento del player en función del evento mouse.
Aparición de objetos que dan más puntos (peces, tesoros, etc).
Control del oxigeno del jugador-submarinista.
Aparición de objetos fijos: botella de oxigeno.
Introducción de nombre-jugador y historial de mejores puntuaciones.

### LINKS
[Trello](https://trello.com/b/icQrrRMk/ironhack-project-1)