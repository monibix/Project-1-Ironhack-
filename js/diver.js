'use strict';
console.log("Diver's file")

class Diver {
    constructor(canvas, lives) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        //this.width = 180; 
        //this.height = 100; 
        this.size = 100;
        this.x = 10 + this.size / 2;; 
        this.y = this.canvas.height / 2; 
        this.directionY = 0;
        this.directionX = 0;
        this.speed = 8 ; 
        this.lives = lives;
    }
    
    draw() {
        let imgDiver = new Image()
        imgDiver.src = './images/diver2.jpg' 
        this.ctx.drawImage(imgDiver, this.x, this.y, this.size, this.size)
    }

    updateY() {
        this.y = this.y + this.directionY * this.speed;
    }

    updateX() {
        this.x = this.x + this.directionX * this.speed;
    }

    setDirectionY(directionY) { 
        this.directionY = directionY;
    }

    setDirectionX(directionX) {
        this.directionX = directionX;
    }

    checkScreen() {
        if (this.y <= 0) {
            this.direction = 0
            this.y = 1
        } else if (this.y >= this.canvas.height - this.size) {
            this.direction = 0
            this.y = this.canvas.height-this.size
        }
        if (this.x <= 0) {
            this.direction = 0
            this.x = 1
        } else if (this.x >= this.canvas.width - this.size) {
            this.direction = 0
            this.x = this.canvas.width-this.size
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

    winLive() { 
        this.lives++;
    }


}

