import aerisImageSrc from '../../../assets/characters/aeris.png'
import { Hero } from '../../../utils/general';

export class Aeris extends Hero {
    constructor({ id, x, y, ctx, movement = "left", spriteX, spriteY, body, scale, status }) {
        super({ id, ctx, x, y, movement, spriteX, spriteY, body, scale, src: aerisImageSrc })
        this.name = 'Aeris';
        this.status = status;
    }
}