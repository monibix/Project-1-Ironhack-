'use strict';
console.log("Main's file")

const main = () => {
    const builDom = (html) => {
        const main = document.querySelector('main');
        main.innerHTML = html;
    }

    const buildSplashScreen = () => {
        builDom(`
            <header class="container">
            <h1>SHARKS</h1>
                <input type="text" placeholder="Enter your nickname">
                <h3>Instructions</h3>
                <ul>
                    <li>Avoid be eaten by the sharks</li>
                    <li>Move the player up and down</li>
                    <li>Spend the maximum time possible on the water</li>
                    <li>Get extra points by catching fishes</li>
                    <li>Get an extra live if you find a treasure</li>
                </ul>
                <button>Play Game</button>
            </header>
        `)
        const startButton = document.querySelector('button');
        startButton.addEventListener('click', buildGameScreen)
        //Añadido evento para iniciar juego presionando cualquier tecla 'Enter' o 'q'
        const body = document.querySelector('body')
        body.addEventListener("keydown", event => {
            if (event.key === 'Enter' || event.key === 'q') {
                buildGameScreen()
            }
        });
    }

    //DESCOMENTAR PARA PROBAR
    //pq no se ejecuta la función removeHeader() en el evento click de playGame???
    // const header = document.querySelector('header')
    // const body = document.querySelector('body')
    // const removeHeader = () => {
    //         body.removeChild(header)
    //     }
    // const startGame = () => {
    // const playGame = document.querySelector('button');
    // playGame.addEventListener('click', buildGameScreen, removeHeader );
    // console.log(body)
    // };
    //FIN DESCOMENTAR PARA

    const buildGameScreen = () => { 
        builDom(`
            <section class="game-screen">
                <canvas></canvas> 
            </section>
        `)

        const width = document.querySelector('.game-screen').offsetWidth;
        const height = document.querySelector('.game-screen').offsetHeight;

        const canvasElement = document.querySelector('canvas')

        canvasElement.setAttribute("width", width);
        canvasElement.setAttribute("height", height);

        const game = new Game(canvasElement)
        game.gameOverCallback(buildGameOver);

        //game.score()
        game.startLoop();

        //Events to move the diver
        const moveDiver = (e) => {
            const userKey = e.key
            if (userKey === 'ArrowUp' || userKey === 'a') {
                game.diver.setDirection(-1)
            } else if (userKey === 'ArrowDown' || userKey === 'f') {
                game.diver.setDirection(1)
            }
        };
        document.addEventListener('keydown', moveDiver);
        const stopDiver = (e) => {
            const userKey = e.key
            if (userKey === 'ArrowUp' || userKey === 'a') {
                game.diver.setDirection(0)
            } else if (userKey === 'ArrowDown' || userKey === 'f') {
                game.diver.setDirection(0)
            }
        };
        document.addEventListener('keyup', stopDiver);

    };

    const buildGameOver = () => { //returns undefined this.points
        builDom(`
            <section class="game-over">
                <h1>Game Over</h1>
                <h3>Your Score is ${this.points}</h3> 
                <h4>Best restults</h4>
                <ol>
                    <li>1</li>
                    <li>2</li>
                    <li>3</li>
                    <li>4</li>
                    <li></li>
                <ol>
                <button>Play Again</button>
            </section>
            `);
    
        const restartButton = document.querySelector("button");
        restartButton.addEventListener("click", buildGameScreen);
    };
    
    buildSplashScreen();
}

window.addEventListener("load", main);








