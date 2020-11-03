"use strict" 

class Sharks {
    constructor(canvas, y) { 
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.width = 30;
      this.height = 10;
      this.x = this.canvas.width; 
      this.y = y; 
      this.speed = 5; 
      this.direction = -1; 
    }
  
    update() { 
      this.x = this.x + this.direction * this.speed; 
    }
  
    draw() { 
      this.ctx.fillStyle = "grey";
      this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  
    setDirection(direction) { 
      this.direction = direction;
    }
  }
  