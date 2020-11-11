"use strict" 

class Air {
    constructor(canvas, x, y) { //refactorizar, sólo se mueve en eje y
        this.size = 40;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        //this.width = 60;
        //this.height = 30;
        this.x = x; 
        this.y = 0;
        this.speed = 5; 
        this.direction = 1; 
        }

        update() { 
            this.y = this.y + this.direction * this.speed; 
        }

        draw() { 
            let imgAir = new Image()
            imgAir.src = '/PROJECTS/PROJECT 1/Project-1-Ironhack-/images/air2.png'
            this.ctx.drawImage(imgAir, this.x, this.y, this.size, this.size)
        }

        setDirection(direction) { 
            this.direction = direction;
        }

}