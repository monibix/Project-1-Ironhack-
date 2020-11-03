'use strict';
console.log("Diver's file")

class Diver {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.width = 180; 
        this.height = 100; 
        this.x = 5; 
        this.y = this.canvas.height / 2 - this.height / 2; 
        this.direction = 0;
        this.speed = 5 ; 
    }
    
    draw() {
        // this.ctx.fillStyle = "blue";
        // this.ctx.fillRect(this.x, this.y, this.width, this.height);

        let imgCar = new Image()
        imgCar.src = '/PROJECTS/PROJECT 1/Project-1-Ironhack-/images/diver2.jpg' 
        imgCar.addEventListener('load', () => {
          this.ctx.drawImage(imgCar, this.x, this.y, this.width, this.height)
        })

    }

    update() {
        this.y = this.y + this.direction * this.speed;
    }

    setDirection(direction) {
        this.direction = direction;
    }
    //seguir con métodos para chequear margenes de pantalla checkScreen(), colisiones checkCollisionShark()
    //seguir con método para calcular score
}
