"use strict" 

class Treasure {
    constructor(canvas, x) { 
        this.size = 80;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        //this.width = 60;
        //this.height = 30;
        this.x = x; 
        this.y = this.canvas.height - 100;
        this.speed = 5; 
        this.direction = -1; 
        }

        update() { 
            this.x = this.x 
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
