import frameImageSrc from '../../../assets/fields/frame/frame.png'
import levelImgSrc from '../../../assets/fields/frame/level.png'
import coinFrameImgSrc from '../../../assets/fields/frame/coin-frame.png'
import coinImageSrc from '../../../assets/fields/frame/coin.png'
import { Assets, getScaledSize } from '../../../utils/general';
import { Aeris } from '../../characters/aeris';
import { Evelyn } from '../../characters/evelyn';
import { Luna } from '../../characters/luna';

export class Frame extends Assets {
    constructor({ ctx, x, y, hero, playerName, level = 0 }) {
        super({ ctx, x, y })
        this.width = 367;
        this.height = 149;
        this.scale = 0.2;
        this.playerName = playerName;
        this.level = level
        this.img = new Image();
        this.img.src = frameImageSrc;
        this.img.onload = () => {
            this.draw()
        }
        this.setPicture(hero);
        this.levelImg = new Level({ x: x + ctx.canvas.width / 20, y: y + ctx.canvas.height / 11, ctx: ctx, level: level })
    }

    setPicture(hero){
        switch (hero) {
            case 'Luna':
                this.picture = new Luna({ x: this.x - this.ctx.canvas.width / 25, y: this.y + this.ctx.canvas.height / 20, ctx: this.ctx, spriteY: 10, body: 0.6 }) 
                break;
            case 'Evelyn':
                this.picture = new Evelyn({ x: this.x - this.ctx.canvas.width / 25, y: this.y + this.ctx.canvas.height / 20, ctx: this.ctx, spriteY: 10, body: 0.6 }) 
                break;
            case 'Aeris':
                this.picture = new Aeris({ x: this.x - this.ctx.canvas.width / 25, y: this.y + this.ctx.canvas.height / 20, ctx: this.ctx, spriteY: 10, body: 0.6 }) 
                break;
            default:
                break;
        }
    }

    draw(){
        super.draw()
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
            this.ctx.font = `bold ${this.scaleFactor * 30}px Comic Sans MS`;
            this.ctx.fillStyle = 'white';
            const textWidth = this.ctx.measureText(displayedName).width;
            const textX = this.x + 45 + this.xOffset + (this.scaledWidth - textWidth) / 2;
            const textY = this.y - 9 + this.yOffset + this.scaledHeight / 2 + 10;
            this.ctx.fillText(displayedName, textX, textY);
        }
    }
}

export class CoinFrame extends Assets {
    constructor({ ctx, x, y, coinAmount = 0 }) {
        super({ ctx, x, y })
        this.width = 323;
        this.height = 103;
        this.scale = 0.2;
        this.coinAmount = coinAmount;
        this.img = new Image();
        this.img.src = coinFrameImgSrc;
        this.img.onload = () => {
            this.draw()
        }
        this.coin = new Assets({ ctx, x, y, width: 500, height: 500, src: coinImageSrc, scale: 0.07 })
    }

    draw(){
        super.draw();
        this.ctx.font = `bold ${this.scaleFactor * 30}px Comic Sans MS`;
        this.ctx.fillStyle = 'white';
        const textWidth = this.ctx.measureText(this.coinAmount).width;
        const textX = this.x - 37 + this.xOffset + (this.scaledWidth - textWidth) / 2;
        const textY = this.y - 1 + this.yOffset + this.scaledHeight / 2 + 10;
        this.ctx.fillText(this.coinAmount, textX, textY);
        if (this.coin) {
            this.coin.x = this.x + this.ctx.canvas.width / 7.5;
            this.coin.y = this.y + this.ctx.canvas.height / 15.5;
            this.coin.draw()
        }
    }
}

export class Level extends Assets {
    constructor({ ctx, x, y, level = 0 }) {
        super({ ctx, x, y })
        this.level = level;
        this.scale = 0.06;
        this.width = 505;
        this.height = 494;
        this.img = new Image();
        this.img.src = levelImgSrc;
        this.img.onload = () => {
            this.draw()
        }
    }

    draw(){
        super.draw();
        this.ctx.font = `bold ${this.scaleFactor * 200}px Times New Roman`;
        this.ctx.fillStyle = 'black';
        const textWidth = this.ctx.measureText(this.level).width;
        const textX = this.x + this.xOffset + (this.scaledWidth - textWidth) / 2;
        const textY = this.y - 4 + this.yOffset + this.scaledHeight / 2 + 10;
        this.ctx.fillText(this.level, textX, textY);
    }
}