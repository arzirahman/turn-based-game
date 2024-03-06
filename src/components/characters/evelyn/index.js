import evelynImageSrc from '../../../assets/characters/evelyn.png'
import { Hero } from '../../../utils/general';

export class Evelyn extends Hero {
    constructor({ id, x, y, ctx, movement = "right", spriteX, spriteY, body, scale, status }) {
        super({ id, ctx, x, y, movement, spriteX, spriteY, body, scale, src: evelynImageSrc })
        this.name = 'Evelyn';
        this.status = status;
    }
}