import { Aeris } from "../components/characters/aeris";
import { Evelyn } from "../components/characters/evelyn";
import { Luna } from "../components/characters/luna";

export const getHeroes = (ctx, heroes) => {
    return heroes.map((hero) => {
        switch (hero.name) {
            case 'luna':
                return new Luna({ id: hero.id, x: Math.random() * ctx.canvas.width / 1.2, y: ctx.canvas.height / 1.9, ctx })
            case 'evelyn':
                return new Evelyn({ id: hero.id, x: Math.random() * ctx.canvas.width / 1.2, y: ctx.canvas.height / 1.9, ctx })
            case 'aeris':
                return new Aeris({ id: hero.id, x: Math.random() * ctx.canvas.width / 1.2, y: ctx.canvas.height / 1.9, ctx })
            default:
                break;
        }
    })
}