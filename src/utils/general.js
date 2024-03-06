export const getScaledSize = (ctx, width, height, scale) => {
    const maxWidth = ctx.canvas.width * scale;
    const maxHeight = ctx.canvas.height * scale;

    const widthRatio = maxWidth / width;
    const heightRatio = maxHeight / height;

    const scaleFactor = Math.min(widthRatio, heightRatio);

    const scaledWidth = width * scaleFactor;
    const scaledHeight = height * scaleFactor;

    const xOffset = (maxWidth - scaledWidth) / 2;
    const yOffset = (maxHeight - scaledHeight) / 2;

    return {
        scaledWidth, scaledHeight, xOffset, yOffset, scaleFactor
    }
}

export class Assets {
    constructor({ ctx, x, y, src, height, width, scale = 1 }) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.height = height;
        this.width = width
        this.img = new Image();
        this.img.src = src;
        this.img.onload = () => {
            this.draw()
        }
    }

    draw(){
        const { scaledHeight, scaledWidth, yOffset, xOffset, scaleFactor } = getScaledSize(this.ctx, this.width, this.height, this.scale);

        this.scaledHeight = scaledHeight;
        this.scaledWidth = scaledWidth;
        this.yOffset = yOffset;
        this.xOffset = xOffset;
        this.scaleFactor = scaleFactor;

        this.ctx.drawImage(
            this.img, 
            0, 
            0, 
            this.width, 
            this.height, 
            this.x + xOffset, 
            this.y + yOffset,
            scaledWidth, 
            scaledHeight
        );
    }
}

export class Button {
    constructor({ ctx, x, y, width, height, scale, scaleOffsetX = 4, scaleOffsetY = 4, src, scaleHoverValue = 1.05 }) {
        this.ctx = ctx;
        this.x = x;
        this.scale = scale;
        this.scaleHover = 1;
        this.scaleOffsetX = scaleOffsetX;
        this.scaleOffsetY = scaleOffsetY;
        this.scaleHoverValue = scaleHoverValue;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = src;
        this.img.onload = () => {
            this.draw()
        }
    }

    draw(){
        const { scaledHeight, scaledWidth, yOffset, xOffset } = getScaledSize(this.ctx, this.width, this.height, this.scale);

        this.scaledWidth = scaledWidth * this.scaleHover;
        this.scaledHeight = scaledHeight * this.scaleHover;

        const scaleOffsetX = (this.scaleHover > 1 ? this.scaleOffsetX : 0)
        const scaleOffsetY = (this.scaleHover > 1 ? this.scaleOffsetY : 0)

        this.xLowTh = this.x + xOffset - scaleOffsetX
        this.xUpTh = scaledWidth * this.scaleHover + this.xLowTh
        this.yLowTh = this.y + yOffset - scaleOffsetY
        this.yUpTh = scaledHeight * this.scaleHover + this.yLowTh

        this.ctx.drawImage(
            this.img, 
            0, 
            0, 
            this.width, 
            this.height, 
            this.x + xOffset - scaleOffsetX, 
            this.y + yOffset - scaleOffsetY,
            this.scaledWidth, 
            this.scaledHeight
        );
    }

    isOver(e) {
        if (e.clientX > this.xLowTh && e.clientX < this.xUpTh
            && e.clientY > this.yLowTh && e.clientY < this.yUpTh
        ) {
            this.scaleHover = this.scaleHoverValue
            return true;
        } else {
            this.scaleHover = 1;
            return false
        }
    }
}

export class Hero {
    constructor({ 
        id, x, y, ctx, speed = 0.5, movement, spriteX = 1, spriteY = 1, body = 1, scale = 1/6, name, width = 64, 
        height = 65, animateTime = 0.05, src
    }) {
        this.id = id;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.name = name;
        this.width = width;
        this.height = height;
        this.spriteX = spriteX;
        this.spriteY = spriteY;
        this.animateTime = animateTime;
        this.movement = movement;
        this.speed = speed;
        this.body = body;
        this.scale = scale
        this.img = new Image();
        this.img.src = src;
        this.img.onload = () => {
            this.draw();
        };
        this.spriteDirection = 'plus';
    }

    draw(){
        const { scaledHeight, scaledWidth, yOffset, xOffset } = getScaledSize(this.ctx, this.width, this.height, this.scale);

        this.ctx.drawImage(
            this.img, 
            Math.floor(this.spriteX) * this.width, 
            this.spriteY * this.height, 
            this.width, 
            this.height * this.body, 
            this.x + xOffset, 
            this.y + yOffset,
            scaledWidth, 
            scaledHeight * this.body
        );
    }

    walk() {
        if (this.spriteDirection === "plus") {
            this.spriteX += this.animateTime;
            if (this.spriteX > 6) {
                this.spriteX = 5
                this.spriteDirection = "min";
            }
        } else if (this.spriteDirection === "min") {
            this.spriteX -= this.animateTime;
            if (this.spriteX < 1) {
                this.spriteX = 2
                this.spriteDirection = "plus";
            }
        }
        if (this.movement === "left") {
            this.x -= this.speed;
            this.spriteY = 9;
            if (this.x < 0) {
                this.spriteY = 11;
                this.movement = "right";
            }
        } else if (this.movement === "right") {
            this.x += this.speed;
            this.spriteY = 11;
            if (this.x > this.ctx.canvas.width / 1.2) {
                this.spriteY = 9;
                this.movement = "left";
            }
        }
        this.draw();
    }
}