import backgroundImageSrc from '../../../assets/fields/background/background.jpg'

export class Background {
    constructor({ ctx }) {
        this.ctx = ctx;
        this.img = new Image();
        this.img.src = backgroundImageSrc;
        this.img.onload = () => {
            this.draw()
        }
    }

    draw(){
        this.ctx.drawImage(this.img, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}