'use strict';
console.log("Diver's file")

class Diver {
    constructor(canvas, lives) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        //this.width = 180; 
        //this.height = 100; 
        this.size = 80;
        this.x = 10 + this.size / 2;; 
        this.y = this.canvas.height / 2; 
        this.direction = 0;
        this.speed = 5 ; 
        this.lives = lives;
    }
    
    draw() {
        let imgDiver = new Image()
        imgDiver.src = '/PROJECTS/PROJECT 1/Project-1-Ironhack-/images/diver2.jpg' 
        this.ctx.drawImage(imgDiver, this.x, this.y, this.size, this.size)
    }

    update() {
        this.y = this.y + this.direction * this.speed;
        console.log(this.direction)
    }

    setDirection(direction) {
        this.direction = direction;
    }

    checkScreen() {
        if (this.y <= 0) {
            this.direction = 0
            this.y = 1
        } else if (this.y >= this.canvas.height - this.height) {
            this.direction = 0
            this.y = this.canvas.height - this.height -1
        }
    }

    checkCollisions(shark) {
        const collideRight = this.x + this.size / 2 > shark.x - shark.size / 2;
        const collideLeft = this.x - this.size / 2 < shark.x + shark.size / 2;
        const collideTop = this.y + this.size / 2 > shark.y - shark.size / 2;
        const collideBottom = this.y - this.size / 2 < shark.y + shark.size / 2;
    
        if (collideRight && collideLeft && collideTop && collideBottom) {
            return true;
        }  
        return false; 
    }

    loseLive() { 
        this.lives--;
    }

}

