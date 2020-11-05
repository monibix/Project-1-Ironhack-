'use strict'; 
console.log('Game file')

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.diver; 
        this.sharks = [];
        this.treasure = [];
        this.points = 0
        this.isGameOver = false;
    }

    updateCanvas() {
        this.diver.updateY()
        this.diver.updateX()
        this.sharks.forEach((shark) => {
            shark.update()
        })
        this.treasure.forEach((tre) => {
            tre.update()
        })
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    drawCanvas() {
        this.drawBackground()
        this.diver.draw()
        this.sharks.forEach((shark) => {
            shark.draw();
        })
        this.drawScore()
        this.drawLives()
        this.treasure.forEach((tre) => {
            tre.draw();
        })
    }

    drawScore() {
        this.points = parseInt(this.points + 1.2 ) 
        setInterval(() => (this.points), 1000)
        this.ctx.font = "18px serif"
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`Score: ${this.points}`, 900, 30)
    }

    drawBackground() {
        let imgBack = new Image() 
        imgBack.src = '/PROJECTS/PROJECT 1/Project-1-Ironhack-/images/background.jpg'
        this.ctx.drawImage(imgBack, 0, 0)
    }

    drawLives(){
        let imgLives = new Image() 
        imgLives.src = '/PROJECTS/PROJECT 1/Project-1-Ironhack-/images/lives.png'
        this.ctx.drawImage(imgLives, 1000, 10, 30, 30)
        this.ctx.font = "18px arial"
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`${this.diver.lives}`, 1030, 30) 
    }

    stopGame() {
        this.sharks.speed = 0; 
    }

    gameOverCallback(callback) {
        this.onGameOver = callback;
    }

    checkAllCollisions() {
        this.diver.checkScreen();
        this.stopGame();
        this.sharks.forEach((shark, index) => {
            if (this.diver.checkCollisions(shark)) {
            this.diver.loseLive();
            this.sharks.splice(index, 1);
            this.stopGame() 
                if (this.diver.lives === 0) {
                    this.isGameOver = true;
                    this.onGameOver();
                }
            }
        });
        this.treasure.forEach((treasure, index) => {
            if (this.diver.checkCollisions(treasure)) {
            this.diver.winLive();
            this.treasure.splice(index, 1);
            console.log(this.treasure)

                if (this.diver.lives === 0) {
                    this.isGameOver = true;
                    this.onGameOver();
                }
            }
        });
    }
    
    
    startLoop() {
        this.diver = new Diver(this.canvas, 1);

        const loop = () => {
             
            if (Math.random() > 0.97) { 
                const y = Math.random() * this.canvas.height;
                this.sharks.push(new Sharks(this.canvas, y));
            }

            if (Math.random() > 0.995 && this.points >= 150 && this.treasure == 0) { 
                const y = Math.random() * this.canvas.height;
                this.treasure.push(new Treasure(this.canvas, y));
            }

            this.checkAllCollisions()
            this.updateCanvas()
            this.clearCanvas()
            this.drawCanvas()
            if (!this.isGameOver) {
                window.requestAnimationFrame(loop)
            }
            
        }
        window.requestAnimationFrame(loop);
    }

}