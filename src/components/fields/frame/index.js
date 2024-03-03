import frameImageSrc from '../../../assets/fields/frame/frame.png'
import { getScaledSize } from '../../../utils/general';
import { Aeris } from '../../characters/aeris';
import { Evelyn } from '../../characters/evelyn';
import { Luna } from '../../characters/luna';

export class Frame {
    constructor({ ctx, x, y, hero, playerName }) {
        this.ctx = ctx;
        this.playerName = playerName;
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = frameImageSrc;
        this.img.onload = () => {
            this.draw()
        }
        this.setPicture(hero);
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

        if (this.playerName) {
            let displayedName = this.playerName;
            if (this.playerName.length > 10) {
                displayedName = this.playerName.substring(0, 10) + '..';
            }
            this.ctx.font = `italic bold ${scaleFactor * 30}px Comic Sans MS`;
            this.ctx.fillStyle = 'white';
    
            const textWidth = this.ctx.measureText(displayedName).width;
    
            const textX = this.x + 45 + xOffset + (scaledWidth - textWidth) / 2;
    
            const textY = this.y - 9 + yOffset + scaledHeight / 2 + 10;
    
            this.ctx.fillText(displayedName, textX, textY);
        }
    }
}