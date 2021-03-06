"use strict" 

class Treasure {
    constructor(canvas, x, y) { 
        this.size = 80;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.x = x; 
        this.y = y;
        this.speed = 5; 
        this.direction = -1; 
        }

        update() { 
            this.x = this.x 
            this.y = this.y
        }

        draw() { 
            let imgTreasure = new Image()
            imgTreasure.src = './images/treasure.png'
            this.ctx.drawImage(imgTreasure, this.x, this.y, this.size, this.size)
        }

        setDirection(direction) { 
            this.direction = direction;
        }

}
