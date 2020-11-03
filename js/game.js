'use strict'; 
console.log('Game file')

class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.diver; 
        this.sharks = [];
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
    }

    startLoop() {
        this.diver = new Diver(this.canvas);

        const loop = () => {
            if (Math.random() > 0.97) { 
                const y = Math.random() * this.canvas.height;
                this.sharks.push(new Sharks(this.canvas, y));
              }

            this.updateCanvas()
            this.clearCanvas()
            this.drawCanvas()
        }
        window.requestAnimationFrame(loop);
    }
}