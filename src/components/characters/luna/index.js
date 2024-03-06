import lunaImageSrc from '../../../assets/characters/luna.png'
import { Hero } from '../../../utils/general';

export class Luna extends Hero {
    constructor({ id, x, y, ctx, movement = "left", spriteX, spriteY, body, scale, status }) {
        super({ id, ctx, x, y, movement, spriteX, spriteY, body, scale, src: lunaImageSrc })
        this.name = 'Luna';
        this.status = status;
    }
}

