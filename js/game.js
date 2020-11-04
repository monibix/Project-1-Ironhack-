'use strict'; 
console.log('Game file')

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.diver; 
        this.sharks = [];
        this.points = 0
        this.isGameOver = false;
    }

    updateCanvas() {
        this.diver.update()
        this.sharks.forEach((shark) => {
            shark.update()
        })
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    drawCanvas() {
        this.diver.draw()
        this.sharks.forEach((shark) => {
            shark.draw();
        })
        this.drawScore()
    }

    drawScore() {
        setInterval(() => this.points += 1, 6000)
        console.log(this.points)
        this.ctx.font = "22px serif"
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`Score is ${this.points}`, 50, 50)
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
    }
    
    
    startLoop() {
        this.diver = new Diver(this.canvas, 1);

        const loop = () => {
            //debugger;
            if (Math.random() > 0.97) { 
                const y = Math.random() * this.canvas.height;
                this.sharks.push(new Sharks(this.canvas, y));
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