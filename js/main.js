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
            <h1>SCUBASHARK</h1>
                <input type="text" placeholder="Enter your nickname">
                <h3>Instructions</h3>
                <ul>
                    <li>Move the diver with the arrows keys to avoid the sharks</li>
                    <li>If you crash with a shark, you lose a live</li>
                    <li>Get an extra live if you get a treasure</li>
                    <li>Get 100 extra points if you get a fish</li>
                    <li>Don't forget to get the air, otherwise you will die drowned</li>
                </ul>
                <button>Play Game</button>
            <header>
        `)

        const previousName = document.querySelector('input')
        
        const startButton = document.querySelector('button');
        startButton.addEventListener('click', () => {
            const name = previousName.value
            console.log("USERNAME",name)
            buildGameScreen(name)
            });
        //Añadido evento para iniciar juego presionando cualquier tecla 'Enter' o 'q'
        const body = document.querySelector('body')
        body.addEventListener("keydown", event => {
            if (event.key === 'Enter' || event.key === 'q') {
                
                const name = previousName.value
                buildGameScreen(name)
            }
        });
    }

    const buildGameScreen = (name) => { 
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

        const game = new Game(canvasElement, name)
        game.gameOverCallback(buildGameOver);

        game.startLoop();

        //Events to move the diver
        const moveDiver = (e) => {
            const userKey = e.key
            if (userKey === 'ArrowUp' || userKey === 'a') {
                game.diver.setDirectionY(-1)
            } else if (userKey === 'ArrowDown' || userKey === 'f') {
                game.diver.setDirectionY(1)
            } else if (userKey === 'ArrowRight' || userKey === 'd') {
                game.diver.setDirectionX(1)
            } else if (userKey === 'ArrowLeft' || userKey === 's') {
                game.diver.setDirectionX(-1)
            }
        };
        document.addEventListener('keydown', moveDiver);
        const stopDiver = (e) => {
            const userKey = e.key
            if (userKey === 'ArrowUp' || userKey === 'a') {
                game.diver.setDirectionY(0)
            } else if (userKey === 'ArrowDown' || userKey === 'f') {
                game.diver.setDirectionY(0)
            } else if (userKey === 'ArrowRight' || userKey === 'd') {
                game.diver.setDirectionX(0)
            } else if (userKey === 'ArrowLeft' || userKey === 's') {
                game.diver.setDirectionX(0)
            }
        };
        document.addEventListener('keyup', stopDiver);

    };


    // const setScores = (name, score) => {


    //     const scoresStr = localStorage.getItem('topScores')
    //     let scoresArr = [];
    //     if (scoresStr) {
    //         scoresArr = JSON.parse(scoresStr)
    //     }
    //     const newScoreObj = {name: name.toUpperCase() , score: score} 

    //     if (scoresArr.length >=6) {
    //         scoresArr.push(newScoreObj) 
    //     } else {
    //         localStorage.clear()
    //     }

    //     console.log("ARRAY LENGTH",scoresArr.length)

    //     localStorage.setItem('topScores', JSON.stringify(scoresArr))


    //     return scoresArr
    // }
    




    const buildGameOver = (name, scores) => { 
    // let scoreLi = ""
    // score.forEach((scoreObj)=>{
    //     let newLi = `<li>${scoreObj.name} ${scoreObj.score}</li><br>`
    //     scoreLi+=newLi
    // } )
    
    
    builDom(`
            <section class="game-over">
                <h1>Game Over</h1>
                <h3>Well done ${name}, your get ${scores} points!</h3> 
                <h4>Best results</h4>
                <ol>
                    ${name}: ${scores}
                </ol>
                <button>Play Again</button>
            </section>
            `);
    
        const restartButton = document.querySelector("button");
        restartButton.addEventListener("click", buildSplashScreen); 
        const body = document.querySelector('body')
        body.addEventListener("keydown", event => {
            if (event.key === 'Enter') {
                buildSplashScreen()
            }
        });

    };
    
    buildSplashScreen();
}

window.addEventListener("load", main);



