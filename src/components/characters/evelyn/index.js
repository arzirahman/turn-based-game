import evelynImageSrc from '../../../assets/characters/evelyn.png'
import { getScaledSize } from '../../../utils/general';

export class Evelyn {
    constructor({ id, x, y, ctx, speed = 0.5, movement = "right", spriteX = 1, spriteY = 11, body = 1, scale = 1 }) {
        this.id = id;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.spriteX = spriteX;
        this.spriteY = spriteY;
        this.movement = movement;
        this.speed = speed;
        this.body = body;
        this.scale = scale
        this.img = new Image();
        this.img.src = evelynImageSrc;
        this.img.onload = () => {
            this.draw();
        };
        this.spriteDirection = 'plus';
    }

    draw(){
        const spriteWidth = 64;
        const spriteHeight = 65;

        const { scaledHeight, scaledWidth, yOffset, xOffset } = getScaledSize(this.ctx, spriteWidth, spriteHeight, 1/6);

        this.ctx.drawImage(
            this.img, 
            Math.floor(this.spriteX) * spriteWidth, 
            this.spriteY * spriteHeight, 
            spriteWidth, 
            spriteHeight * this.body, 
            this.x + xOffset, 
            this.y + yOffset,
            scaledWidth * this.scale, 
            scaledHeight * this.body * this.scale
        );
    }

    walk() {
        const animateTime = 0.05;
        if (this.spriteDirection === "plus") {
            this.spriteX += animateTime;
            if (this.spriteX > 6) {
                this.spriteX = 5
                this.spriteDirection = "min";
            }
        } else if (this.spriteDirection === "min") {
            this.spriteX -= animateTime;
            if (this.spriteX < 1) {
                this.spriteX = 2
                this.spriteDirection = "plus";
            }
        }
        if (this.movement === "left") {
            this.x -= this.speed;
            if (this.x < 0) {
                this.spriteY = 11;
                this.movement = "right";
            }
        } else if (this.movement === "right") {
            this.x += this.speed;
            if (this.x > this.ctx.canvas.width / 1.2) {
                this.spriteY = 9;
                this.movement = "left";
            }
        }
        this.draw();
    }
}