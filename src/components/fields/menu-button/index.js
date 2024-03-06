import storyImageSrc from '../../../assets/fields/button/story.png'
import heroImageSrc from '../../../assets/fields/button/hero.png'
import friendImageSrc from '../../../assets/fields/button/friend.png'
import settingImageSrc from '../../../assets/fields/button/setting.png'
import { Button, getScaledSize } from '../../../utils/general';

export class MenuButton extends Button {
    constructor({ ctx, x, y, text, disable }) {
        super({ ctx, x, y, disable });
        this.scale = 1/6;
        this.scaleOffsetX = 8;
        this.scaleHoverValue = 1.07
        this.scaleOffsetY = 4;
        this.width = 256;
        this.height = 77;
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
}