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
                    <li>Avoid be eaten by the sharks</li>
                    <li>Move the player up and down</li>
                    <li>Spend the maximum time possible on the water</li>
                    <li>Get extra points by catching fishes</li>
                    <li>Get an extra live if you find a treasure</li>
                </ul>
                <button>Play Game</button>
            <header>
        `)

        const previousName = document.querySelector('input')
        
        const startButton = document.querySelector('button');
        startButton.addEventListener('click', () => {
            const name = previousName.value
            console.log(name)

            buildGameScreen(name)
            });
        //Añadido evento para iniciar juego presionando cualquier tecla 'Enter' o 'q'
        const body = document.querySelector('body')
        body.addEventListener("keydown", event => {
            if (event.key === 'Enter' || event.key === 'q') {
                
                const name = previousName.value
                console.log(name)
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
        console.log(canvasElement)

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


    const setScores = (name, score) => {
        //recoge scores 
        const scoresStr = localStorage.getItem('topScores')
        let scoresArr = [];
        if (scoresStr) {
            scoresArr = JSON.parse(scoresStr)
        }

        //convertir a objeto
        // scoresArr = JSON.parse(scoresStr)
        //actualizar arr scores
        const newScoreObj = {name: name , score: score} 
        scoresArr.push(newScoreObj)
        //convertir de nuevo a string
        localStorage.setItem('topScores', JSON.stringify(scoresArr))
        return scoresArr
    }



    const buildGameOver = (name, scores) => { //returns undefined this.game.points  //${setScores(name, score)}
    const score = setScores(name,scores)
    let scoreLi = ""
    score.forEach((scoreObj)=>{
        let newLi = `<li>${scoreObj.name} ${scoreObj.score}</li><br>`
        //const gameOver = document.querySelector('ol')
        //gameOver.appendChild('newLi')
        scoreLi+=newLi
    } )    
    builDom(`
            <section class="game-over">
                <h1>Game Over</h1>
                <h3>${name} i Your Score is ${scores}</h3> 
                <h4>Best restults</h4>
                <ol>
                    ${scoreLi}
                </ol>
                <button>Play Again</button>
            </section>
            `);
    
        const restartButton = document.querySelector("button");
        restartButton.addEventListener("click", buildSplashScreen); 
        const body = document.querySelector('body')
        body.addEventListener("keydown", event => {
            if (event.key === 'Enter' || event.key === 'r') {
                buildSplashScreen()
            }
        });

    };
    
    buildSplashScreen();
}

window.addEventListener("load", main);



