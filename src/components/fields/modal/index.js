import heroModalImageSrc from '../../../assets/modal/modal-hero.png'
import closeButtonImageSrc from '../../../assets/modal/close-button.png'
import heroFrameImageSrc from '../../../assets/modal/hero-frame.png';
import healthImageSrc from '../../../assets/modal/health.png';
import attackImageSrc from '../../../assets/modal/attack.png';
import defendImageSrc from '../../../assets/modal/defend.png';
import speedImageSrc from '../../../assets/modal/speed.png';

import { Assets, Button, getScaledSize } from '../../../utils/general';

export class ModalHero {
    constructor({ ctx, heroes }) {
        this.ctx = ctx;
        this.img = new Image();
        this.img.src = heroModalImageSrc;
        this.img.onload = () => {
            this.draw()
        }
        this.heroes = heroes;
        this.selectedHero = heroes[0];
        this.closeButton = new Button({ ctx, x: 0, y: 0, width: 83, height: 85, src: closeButtonImageSrc, scale: 0.07, scaleOffsetX: 1, scaleOffsetY: 1 });
        this.setHeroFrames();
        this.healthImage = new Assets({ ctx, x: 0, y: 0, height: 143, width: 143, src: healthImageSrc, scale: 0.03 });
        this.attackImage = new Assets({ ctx, x: 0, y: 0, height: 300, width: 300, src: attackImageSrc, scale: 0.03 });
        this.defendImage = new Assets({ ctx, x: 0, y: 0, height: 512, width: 512, src: defendImageSrc, scale: 0.03 });
        this.speedImage = new Assets({ ctx, x: 0, y: 0, height: 119, width: 111, src: speedImageSrc, scale: 0.03 });
    }

    setHeroFrames() {
        const totalFrame = 9;
        this.heroFrames = (new Array(totalFrame)).fill(null).map((_) => (
            new Button({ ctx: this.ctx, x: 0, y: 0, width: 76, height: 76, src: heroFrameImageSrc, scale: 0.1, scaleOffsetX: 2, scaleOffsetY: 2 })
        ))
    }

    draw(){
        const modalWidth = 637;
        const modalHeight = 365;

        const { scaledHeight, scaledWidth, yOffset, xOffset, scaleFactor } = getScaledSize(this.ctx, modalWidth, modalHeight, 0.55);

        this.x = (this.ctx.canvas.width - scaledWidth) / 2
        this.y = (this.ctx.canvas.height - scaledHeight) / 2

        this.ctx.save();
        this.ctx.globalAlpha = 0.3;
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        this.ctx.restore();

        this.ctx.drawImage(
            this.img, 
            0, 
            0, 
            modalWidth, 
            modalHeight, 
            this.x, 
            this.y,
            scaledWidth, 
            scaledHeight
        );

        if (this.closeButton) {
            this.closeButton.x = this.x + scaledWidth / 1.09
            this.closeButton.y = this.y - scaledHeight / 20
            this.closeButton.draw()
        }

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const index = row * 3 + col;
                if (index < this.heroFrames.length) {
                    const frame = this.heroFrames[index];
                    frame.x = this.x * 1.05 + col * this.ctx.canvas.width / 15;
                    frame.y = this.y * 1.6 + row * this.ctx.canvas.width / 15;
                    frame.draw();
                    if (index < this.heroes?.length) {
                        this.heroes[index].scale = 1/6;
                        this.heroes[index].body = 0.47;
                        this.heroes[index].spriteY = 10;
                        this.heroes[index].x = frame.x - this.ctx.canvas.width / 31;
                        this.heroes[index].y = frame.y + this.ctx.canvas.height / 140;
                        this.heroes[index].draw()
                    }
                }
            }
        }

        if (Array.isArray(this.heroes)) {
            this.writeText(scaleFactor * 20, `Total: ${this.heroes.length}`, xOffset, yOffset, 60, 11);
        }

        const lineX = this.x + xOffset + this.ctx.canvas.width / 4.4;
        const startY = this.y + yOffset + this.ctx.canvas.height / 15;
        const endY = startY + this.ctx.canvas.height / 2.3;

        this.writeLine(lineX, startY, lineX, endY, 2, '#975D2B')

        this.selectedHero.body = 1;
        this.selectedHero.scale = 0.18
        this.selectedHero.x = this.x + xOffset + this.ctx.canvas.width / 5.3;
        this.selectedHero.y = this.y + yOffset + this.ctx.canvas.height / 15;
        this.selectedHero.draw();

        this.writeText(scaleFactor * 20, this.selectedHero.name, xOffset, yOffset, 3.15, 8);

        this.writeText(scaleFactor * 18, `Lv ${this.selectedHero.status.level}`, xOffset, yOffset, 3.15, 6);

        this.expBar(65, 100, xOffset, yOffset);

        this.statusBar(xOffset, yOffset, scaleFactor)
    }

    statusBar(xOffset, yOffset, scaleFactor) {
        const startX = this.x + xOffset + this.ctx.canvas.height / 2.1;
        const endX = startX + this.ctx.canvas.height / 2.7;

        const statusLineY = this.y + yOffset + this.ctx.canvas.height / 4.3;
        this.writeLine(startX, statusLineY, endX, statusLineY, 2, '#975D2B')

        this.writeText(scaleFactor * 18, 'Status', xOffset, yOffset, 3.9, 3.65);

        this.healthImage.x = this.x + xOffset + this.ctx.canvas.width / 3.8
        this.healthImage.y = this.y + yOffset + this.ctx.canvas.height / 3.4
        this.healthImage.draw()

        this.attackImage.x = this.x + xOffset + this.ctx.canvas.width / 3.8
        this.attackImage.y = this.y + yOffset + this.ctx.canvas.height / 2.9
        this.attackImage.draw()

        this.defendImage.x = this.x + xOffset + this.ctx.canvas.width / 2.71
        this.defendImage.y = this.y + yOffset + this.ctx.canvas.height / 3.4
        this.defendImage.draw()

        this.speedImage.x = this.x + xOffset + this.ctx.canvas.width / 2.7
        this.speedImage.y = this.y + yOffset + this.ctx.canvas.height / 2.9
        this.speedImage.draw()

        this.writeText(scaleFactor * 15, this.selectedHero.status.health, xOffset, yOffset, 3.4, 3.15)
        this.writeText(scaleFactor * 15, this.selectedHero.status.attack, xOffset, yOffset, 3.4, 2.7)
        this.writeText(scaleFactor * 15, this.selectedHero.status.armor, xOffset, yOffset, 2.5, 3.15)
        this.writeText(scaleFactor * 15, this.selectedHero.status.speed, xOffset, yOffset, 2.5, 2.7)

        const skillLineY = this.y + yOffset + this.ctx.canvas.height / 2.5;
        this.writeLine(startX, skillLineY, endX, skillLineY, 2, '#975D2B')
    }

    expBar(value, total, xOffset, yOffset) {
        const lineY = this.y + yOffset + this.ctx.canvas.height / 5;
        const startX = this.x + xOffset + this.ctx.canvas.height / 1.66;
        const endX = startX + this.ctx.canvas.height / 4.5;

        const filledWidth = ((total - value) / total) * (endX - startX);

        this.writeLine(startX, lineY, endX, lineY, 10, '#975D2B')

        this.writeLine(startX, lineY, endX - filledWidth, lineY, 10, 'green')
    }

    writeLine(moveX, moveY, endX, endY, width, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(moveX, moveY);
        this.ctx.lineTo(endX, endY);
        this.ctx.lineWidth = width
        this.ctx.strokeStyle = color;
        this.ctx.stroke();
    }

    writeText(size, text, xOffset, yOffset, x, y ) {
        this.ctx.font = `${size}px Comic Sans MS`;
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(text, this.x + xOffset + this.ctx.canvas.width / x, this.y + yOffset + this.ctx.canvas.height / y);
    }

    isCloseButtonOver(e) {
        if (this.closeButton) {
            return this.closeButton.isOver(e);
        } else {
            return false;
        }
    }

    getHeroListData(e) {
        let data;
        if (Array.isArray(this.heroes)) {
            for (let i = 0; i < this.heroFrames.length; i++) {
                const h = this.heroFrames[i];
                if (h.isOver(e) && i < this.heroes.length) {
                    data = this.heroes[i];
                    break;
                }
            }
        }
        return data;
    }
}