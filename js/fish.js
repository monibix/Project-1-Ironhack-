"use strict" 

class Fish {
    constructor(canvas, y) { 
        this.size = 40;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        //this.width = 60;
        //this.height = 30;
        this.x = this.canvas.width; 
        this.y = y; 
        this.speed = 5; 
        this.direction = -1; 
    }

    update() { 
      this.x = this.x + this.direction * this.speed; 
    }
    draw() { 
    let imgFish = new Image()
        imgFish.src = '/PROJECTS/PROJECT 1/Project-1-Ironhack-/images/fish2.png' 
        this.ctx.drawImage(imgFish, this.x, this.y, this.size, this.size)
    }

    setDirection(direction) { 
        this.direction = direction;
    }
}