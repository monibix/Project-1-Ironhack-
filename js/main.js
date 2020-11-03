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
        startButton.addEventListener('click' , buildGameScreen)
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

        game.startLoop();

            
        const moveDiver = (e) => {
            const userKey = e.key
            if (e.key === 'ArrowUp'|| e.keycode === 38 || userKey === "a") {
               game.diver.setDirection(-5)
            } else if (e.key === 'Arrowdown') {
                game.diver.setDirection(5)
            }
        };
        document.addEventListener('keydown', moveDiver);

    }

    
    buildSplashScreen();
}

window.addEventListener("load", main);








