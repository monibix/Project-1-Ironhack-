'use strict';
console.log("Main's file")

const main = () => {
    const builDom = (html) => {
        const main = document.querySelector('main');
        main.innerHTML = html;
    }

    const buildSplashScreen = () => { 
        builDom(`
            <section class="play-game">
                <h1>SCUBASHARK</h1>
                <input type="text" placeholder="Enter your name">
                    <article>
                        <h3>Instructions</h3>
                        <ul>
                            <li><img src="./images/diver.png"></img>Move the diver with the arrows keys</li>
                            <div class="main-arrow-container">
                                <div class="left-arrow-container">
                                    <li><img src="./images/shark.png">-1 live </li>
                                    <li><img src="./images/treasure.png"></img>+1 extra live</li>
                                    <li><img src="./images/fish.png"></img>+100 extra points</li>
                                </div>    
                                <div class="right-arrow-container">
                                    <img id="arrow-keys" src="./images/arrowkeys.png">
                                </div>
                            </div>
                            <li><img src="./images/air.png"></img>+30 seconds extra air</li>
                        </ul>
                    </article>
                <button>Play Game</button>
            </section>
        `)

        const previousName = document.querySelector('input')
        
        const startButton = document.querySelector('button');
        startButton.addEventListener('click', () => {
            const name = previousName.value
            buildGameScreen(name)
            });
        //Añadido evento para iniciar juego con tecla 'Space'
        const body = document.querySelector('body')
        body.addEventListener("keydown", event => {
            if (event.code == 'Space') {
                const name = previousName.value
                buildGameScreen(name)
            }
        });
    }

    const buildGameScreen = (name) => { 
        if(document.querySelector('.game-screen')) return
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

    const setScores = (name, score) => {
        const scoresStr = localStorage.getItem('topScores')
        let scoresArr = [];
        if (scoresStr) {
            scoresArr = JSON.parse(scoresStr)
        }
        const newScoreObj = {name: name.toUpperCase() , score: score} 
        scoresArr.push(newScoreObj)
        let sortedArr = scoresArr.sort((a, b) => b.score-a.score).slice(0,5)
        localStorage.setItem('topScores', JSON.stringify(sortedArr))
        localStorage.clear()
        return sortedArr
    }
    
    const buildGameOver = (name, scores) => { 
        let score = setScores(name,scores)
        let scoreLi = ""
        score.forEach((scoreObj)=>{
            let newLi = `<li>${scoreObj.name} ${scoreObj.score}</li><br>`
            scoreLi+=newLi
        } )
        
        builDom(`
        <section class="game-over">
            <img id="game-over-img" src="./images/gameover.png"></img>
            <h1>GAME OVER</h1>
                <article>
                    <h3>Well done ${name}!  Your score: </h3> 
                    <h1>${scores}</h1>
                    <h4>Best results:</h4>
                    <ol>
                        ${scoreLi}
                    </ol>
                </article>
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


