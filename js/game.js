'use strict'; 
console.log('Game file')

class Game {
    constructor(canvas, name) {
        this.name = name;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.x = 0; //para el background en movimiento
        this.speed = -1; // para el background en movimiento
        this.diver; 
        this.sharks = [];
        this.treasure = [];
        this.fish = [];
        this.points = 0;
        this.air = [];
        this.remainingAir = 20;
        this.tiempo = 0 //declarado para hacer setInterval en startLoop()
        this.isGameOver = false;
        this.crashSound = new Audio ('./audio/shark.mp3') 
        this.pointsSound = new Audio ('./audio/points.wav')
        this.treasureSound = new Audio ('./audio/treasure.mp3')
        this.airSound = new Audio ('./audio/air.wav')
        this.gameOverSound = new Audio ('./audio/gameover.wav')
        this.backgroundSound = new Audio ('./audio/backgroundSound.m4a')
    }

    updateCanvas() {
        //this.moveBackground()
        this.diver.updateY()
        this.diver.updateX()
        this.sharks.forEach((shark) => {
            shark.update()
        })
        this.treasure.forEach((tre) => {
            tre.update()
        })
        this.fish.forEach((fi) => {
            fi.update()
        })
        this.air.forEach((a) => {
            a.update()
        })
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    drawCanvas() {
        this.drawBackground()
        this.drawLives()
        this.drawRemainingAir()
        this.diver.draw()
        this.sharks.forEach((shark) => {
            shark.draw();
        })
        this.drawLives()
        this.drawScore()
        this.drawLives()
        this.treasure.forEach((tre) => {
            tre.draw();
        })
        this.fish.forEach((fi) => {
            fi.draw();
        })
        this.air.forEach((a) => {
            a.draw();
        })
    }

    drawScore() {
        this.ctx.font = "bold 18px arial"
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`Score: ${this.points}`, this.canvas.width - 250, 40)
    }

    drawBackground() {
        let imgBack = new Image() 
        imgBack.src = "./images/background4.jpg"
        this.ctx.drawImage(imgBack, 0, 0, this.canvas.width, this.canvas.height)
        this.x += this.speed;
        this.x %= this.canvas.width
            if (this.speed < 0 ) {
                this.ctx.drawImage(imgBack, this.x + this.canvas.width, 0, this.canvas.width, this.canvas.height);
                // console.log("if", this.x)
                // console.log("width imagen",imgBack.width)
                // console.log("height imagen", imgBack.height)
                // console.log("canvas width", this.canvas.width)
                // console.log("canvas height", this.canvas.height)
            } else {
                this.ctx.drawImage(imgBack, this.x - this.canvas.width, 0, this.canvas.width, this.canvas.height);
                // console.log("else", this.x)
                // console.log("width imagen",imgBack.width)
            }
        this.backgroundSound.play();
        this.backgroundSound.volume = 0.1;
        if (this.isGameOver === true) {
            this.backgroundSound.pause()
        }
    }

    drawLives(){
        let imgLives = new Image() 
        imgLives.src = './images/cor.png'
        this.ctx.drawImage(imgLives, this.canvas.width - 100, 25, 20, 20)
        this.ctx.font = "bold 18px arial"
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`${this.diver.lives}`, this.canvas.width - 70, 40) 
    }

    drawRemainingAir() {
        this.ctx.font = "bold 18px arial"
        this.ctx.fillStyle = 'black';
        this.ctx.fillText(`Air: ${this.remainingAir}`, this.canvas.width - 350, 40)
        if (this.remainingAir < 10) {
            this.ctx.font = "bold 90px arial"
            this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            this.ctx.fillText(`Air: ${this.remainingAir}`, 600, this.canvas.height/2)
        }
    }

    winRemainingAir() {
        this.remainingAir += 30
        this.backgroundSound.pause()

    }

    checkRemainingAir() {
        if (this.remainingAir === 0) {
            this.isGameOver = true;
            console.log("Ejecución gameOver desde REMAININGAIR. remainingAir=", this.remainingAir)
            console.log("Ejecución gameOver desde REMAININGAIR. Lives=", this.diver.lives)
            console.log("Ejecución gameOver desde REMAININGAIR. Points =", this.points)
            this.onGameOver(this.name, this.points);
            clearInterval(this.tiempo)
            clearInterval(this.points)
            this.gameOverSound.play();
            this.gameOverSound.volume = 0.1;
        }
    }

    winScore(num) {
        this.points += num
    }

    gameOverCallback(callback) {
        this.onGameOver = callback;       
    }

    checkAllCollisions() {
        this.diver.checkScreen();
        //SHARKS
        this.sharks.forEach((shark, index) => {
            if (this.diver.checkCollisions(shark)) {
            this.diver.loseLive();
            this.sharks.splice(index, 1);
            this.crashSound.play();
            this.crashSound.volume = 0.2
                if (this.diver.lives === 0) {
                    console.log("Ejecución gameOver desde SHARKS. RemainingAir=", this.remainingAir)
                    console.log("Ejecución gameOver desde SHARKS. Lives=", this.diver.lives)
                    console.log("Ejecución gameOver desde SHARKS. Points =", this.points)
                    this.isGameOver = true;
                    this.onGameOver(this.name, this.points);
                    clearInterval(this.tiempo)
                    clearInterval(this.points) 
                    this.gameOverSound.play();
                    this.gameOverSound.volume = 0.1;
                }
            }
        });
        //TREASURE
        this.treasure.forEach((treasure, index) => {
            if (this.diver.checkCollisions(treasure)) {
            this.diver.winLive();
            this.treasure.splice(index, 1);
            this.treasureSound.play();
            this.treasureSound.volume = 0.2;
            }
        });
        //FISHES
        this.fish.forEach((fi, index) => {
            if (this.diver.checkCollisions(fi)) {
            this.winScore(100)
            this.fish.splice(index, 1);
            this.pointsSound.play();
            this.pointsSound.volume = 0.3;
            }
        });
        //AIR
        this.air.forEach((a, index) => {
            if (this.diver.checkCollisions(a)) {
            this.winRemainingAir()
            this.air.splice(index, 1);
            this.airSound.play();
            this.airSound.volume = 0.2
            }
        });
    }
    
    startLoop() {
        this.diver = new Diver(this.canvas, 1);

        //Interval que controla remainingAir cambiado a startLoop
        this.tiempo = setInterval(() => {
            this.remainingAir -= 1
        }, 1000); 
        this.points = setInterval(() => {
            this.points += 1
        }, 100);

        const loop = () => {
        
            if (Math.random() > 0.985) { 
                const y = Math.random() * this.canvas.height;
                this.sharks.push(new Sharks(this.canvas, y));
            }

            if (Math.random() > 0.993 && this.treasure.length == 0) { 
                const y = Math.random() * this.canvas.height;
                const x = Math.random() * this.canvas.width;
                this.treasure.push(new Treasure(this.canvas, x, y));
            }

            if (Math.random() > 0.98) { 
                const y = Math.random() * this.canvas.height;
                this.fish.push(new Fish(this.canvas, y));
            }

            if (Math.random() > 0.996 && this.air.length == 0) {  
                console.log("aires normales", this.air.length)
                const x = Math.random() * this.canvas.width;
                const y = Math.random() * this.canvas.height;
                this.air.push(new Air(this.canvas, x, y));
                setTimeout(() => {
                    this.air=[]
                },3000)
            }
            //intentando aumentar frecuencia airs cuando quedan 10 segundos. Por qué sólo se ejecuta una vez??
            if (this.remainingAir < 10 && this.air.length == 0) { 
                if (Math.random() > 0.10) {  
                    console.log("aumentando frecuencia aires")
                    console.log("Length de array de aires", this.air.length)
                    const x = Math.random() * this.canvas.width;
                    const y = Math.random() * this.canvas.height;
                    this.air.push(new Air(this.canvas, x, y));
                }
            }
            //CONTROL FRECUENCIA SHARKS SEGÚN PUNTOS
            if (this.points > 1000 && this.points < 2000) {
                if (Math.random() > 0.983) {  
                    const y = Math.random() * this.canvas.height;
                    this.sharks.push(new Sharks(this.canvas, y));
                }
            }
            if (this.points > 2001 && this.points < 3000) {
                if (Math.random() > 0.980) {  
                    const y = Math.random() * this.canvas.height;
                    this.sharks.push(new Sharks(this.canvas, y));
                }
            }
            if (this.points > 3001 && this.points < 5000) {
                if (Math.random() > 0.977) {  
                    const y = Math.random() * this.canvas.height;
                    this.sharks.push(new Sharks(this.canvas, y));
                }
            }

            if (this.points > 5001 && this.points < 7000) {
                if (Math.random() > 0.973) { 
                    const y = Math.random() * this.canvas.height;
                    this.sharks.push(new Sharks(this.canvas, y));
                }
            }

            if (this.points > 7001 && this.points < 9000) {
                if (Math.random() > 0.970) {  
                    const y = Math.random() * this.canvas.height;
                    this.sharks.push(new Sharks(this.canvas, y));
                }
            }

            if (this.points > 9001) {
                if (Math.random() > 0.965) {  
                    const y = Math.random() * this.canvas.height;
                    this.sharks.push(new Sharks(this.canvas, y));
                }
            }

            this.checkRemainingAir()
            this.checkAllCollisions()
            this.updateCanvas()
            this.clearCanvas()
            this.drawCanvas()

            if (!this.isGameOver) {
                window.requestAnimationFrame(loop)
            }
            
        }
        window.requestAnimationFrame(loop);
    }

}