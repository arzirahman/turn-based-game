import frameImageSrc from '../../../assets/fields/frame/frame.png'
import levelImgSrc from '../../../assets/fields/frame/level.png'
import coinFrameImgSrc from '../../../assets/fields/frame/coin-frame.png'
import coinImageSrc from '../../../assets/fields/frame/coin.png'
import { getScaledSize } from '../../../utils/general';
import { Aeris } from '../../characters/aeris';
import { Evelyn } from '../../characters/evelyn';
import { Luna } from '../../characters/luna';

export class Frame {
    constructor({ ctx, x, y, hero, playerName, level = 0 }) {
        this.ctx = ctx;
        this.playerName = playerName;
        this.x = x;
        this.y = y;
        this.level = level
        this.img = new Image();
        this.img.src = frameImageSrc;
        this.img.onload = () => {
            this.draw()
        }
        this.setPicture(hero);
        this.setLevel();
    }

    setPicture(hero){
        switch (hero) {
            case 'luna':
                this.picture = new Luna({ x: this.x - this.ctx.canvas.width / 25, y: this.y + this.ctx.canvas.height / 20, ctx: this.ctx, spriteY: 10, body: 0.6 }) 
                break;
            case 'evelyn':
                this.picture = new Evelyn({ x: this.x - this.ctx.canvas.width / 25, y: this.y + this.ctx.canvas.height / 20, ctx: this.ctx, spriteY: 10, body: 0.6 }) 
                break;
            case 'aeris':
                this.picture = new Aeris({ x: this.x - this.ctx.canvas.width / 25, y: this.y + this.ctx.canvas.height / 20, ctx: this.ctx, spriteY: 10, body: 0.6 }) 
                break;
            default:
                break;
        }
    }

    setLevel(){
        this.levelImg = new Level({ x: this.x + this.ctx.canvas.width / 20, y: this.y + this.ctx.canvas.height / 11, ctx: this.ctx, level: this.level })
    }

    draw(){
        const frameWidth = 367;
        const frameHeight = 149;

        const { scaledHeight, scaledWidth, yOffset, xOffset, scaleFactor } = getScaledSize(this.ctx, frameWidth, frameHeight, 0.2);

        this.ctx.drawImage(
            this.img, 
            0, 
            0, 
            frameWidth, 
            frameHeight, 
            this.x + xOffset, 
            this.y + yOffset,
            scaledWidth, 
            scaledHeight
        );

        if (this.picture) {
            this.picture.draw()
        }

        if (this.levelImg) {
            this.levelImg.draw()
        }

        if (this.playerName) {
            let displayedName = this.playerName;
            if (this.playerName.length > 10) {
                displayedName = this.playerName.substring(0, 10) + '..';
            }
            this.ctx.font = `bold ${scaleFactor * 30}px Comic Sans MS`;
            this.ctx.fillStyle = 'white';
    
            const textWidth = this.ctx.measureText(displayedName).width;
    
            const textX = this.x + 45 + xOffset + (scaledWidth - textWidth) / 2;
    
            const textY = this.y - 9 + yOffset + scaledHeight / 2 + 10;
    
            this.ctx.fillText(displayedName, textX, textY);
        }
    }
}

export class Coin {
    constructor({ ctx, x, y }) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = coinImageSrc;
        this.img.onload = () => {
            this.draw()
        }
    }

    draw(){
        const frameWidth = 500;
        const frameHeight = 500;

        const { scaledHeight, scaledWidth, yOffset, xOffset } = getScaledSize(this.ctx, frameWidth, frameHeight, 0.07);

        this.ctx.drawImage(
            this.img, 
            0, 
            0, 
            frameWidth, 
            frameHeight, 
            this.x + xOffset, 
            this.y + yOffset,
            scaledWidth, 
            scaledHeight
        );
    }
}

export class CoinFrame {
    constructor({ ctx, x, y, coinAmount = 0 }) {
        this.ctx = ctx;
        this.coinAmount = coinAmount;
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = coinFrameImgSrc;
        this.img.onload = () => {
            this.draw()
            this.coin = new Coin({ ctx, x, y })
        }
    }

    draw(){
        const frameWidth = 323;
        const frameHeight = 103;

        const { scaledHeight, scaledWidth, yOffset, xOffset, scaleFactor } = getScaledSize(this.ctx, frameWidth, frameHeight, 0.2);

        this.ctx.drawImage(
            this.img, 
            0, 
            0, 
            frameWidth, 
            frameHeight, 
            this.x + xOffset, 
            this.y + yOffset,
            scaledWidth, 
            scaledHeight
        );

        this.ctx.font = `bold ${scaleFactor * 30}px Comic Sans MS`;
        this.ctx.fillStyle = 'white';

        const textWidth = this.ctx.measureText(this.coinAmount).width;

        const textX = this.x - 37 + xOffset + (scaledWidth - textWidth) / 2;

        const textY = this.y - 1 + yOffset + scaledHeight / 2 + 10;

        this.ctx.fillText(this.coinAmount, textX, textY);

        if (this.coin) {
            this.coin.x = this.x + this.ctx.canvas.width / 7.5;
            this.coin.y = this.y + this.ctx.canvas.height / 15.5;
            this.coin.draw()
        }
    }
}

export class Level {
    constructor({ ctx, x, y, level = 0 }) {
        this.ctx = ctx;
        this.level = level;
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = levelImgSrc;
        this.img.onload = () => {
            this.draw()
        }
    }

    draw(){
        const frameWidth = 505;
        const frameHeight = 494;

        const { scaledHeight, scaledWidth, yOffset, xOffset, scaleFactor } = getScaledSize(this.ctx, frameWidth, frameHeight, 0.06);

        this.ctx.drawImage(
            this.img, 
            0, 
            0, 
            frameWidth, 
            frameHeight, 
            this.x + xOffset, 
            this.y + yOffset,
            scaledWidth, 
            scaledHeight
        );

        this.ctx.font = `bold ${scaleFactor * 200}px Times New Roman`;
        this.ctx.fillStyle = 'black';

        const textWidth = this.ctx.measureText(this.level).width;

        const textX = this.x + xOffset + (scaledWidth - textWidth) / 2;

        const textY = this.y - 4 + yOffset + scaledHeight / 2 + 10;

        this.ctx.fillText(this.level, textX, textY);
    }
}