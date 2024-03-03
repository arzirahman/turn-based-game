import storyImageSrc from '../../../assets/fields/button/story.png'
import heroImageSrc from '../../../assets/fields/button/hero.png'
import friendImageSrc from '../../../assets/fields/button/friend.png'
import settingImageSrc from '../../../assets/fields/button/setting.png'
import { getScaledSize } from '../../../utils/general';

export class Button {
    constructor({ ctx, x, y, text }) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.scale = 1;
        this.img = new Image();
        this.img.src = this.getImage(text);
        this.img.onload = () => {
            this.draw()
        }
    }

    getImage(text){
        switch (text.toLowerCase()) {
            case 'hero':
                return heroImageSrc;
            case 'friend':
                return friendImageSrc;
            case 'setting':
                return settingImageSrc
            default:
                return storyImageSrc;
        }
    }

    draw(){
        const buttonWidth = 256;
        const buttonHeight = 77;

        const { scaledHeight, scaledWidth, yOffset, xOffset } = getScaledSize(this.ctx, buttonWidth, buttonHeight, 1/6);

        this.width = scaledWidth * this.scale;
        this.height = scaledHeight * this.scale;

        this.xLowTh = this.x + xOffset - (this.scale > 1 ? 4 : 0)
        this.xUpTh = scaledWidth * this.scale + this.xLowTh
        this.yLowTh = this.y + yOffset - (this.scale > 1 ? 4 : 0)
        this.yUpTh = scaledHeight * this.scale + this.yLowTh

        this.ctx.drawImage(
            this.img, 
            0, 
            0, 
            buttonWidth, 
            buttonHeight, 
            this.x + xOffset - (this.scale > 1 ? 4 : 0), 
            this.y + yOffset - (this.scale > 1 ? 4 : 0),
            this.width, 
            this.height
        );
    }

    isOver(e) {
        if (e.clientX > this.xLowTh && e.clientX < this.xUpTh
            && e.clientY > this.yLowTh && e.clientY < this.yUpTh
        ) {
            this.scale = 1.05
            return true;
        } else {
            this.scale = 1;
            return false
        }
    }
}