"use strict" 

class Air {
    constructor(canvas, x, y) { 
        this.size = 40;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        //this.width = 60;
        //this.height = 30;
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
            let imgAir = new Image()
            imgAir.src = '/PROJECTS/PROJECT 1/Project-1-Ironhack-/images/air.png'
            this.ctx.drawImage(imgAir, this.x, this.y, this.size, this.size)
        }

        setDirection(direction) { 
            this.direction = direction;
        }

}