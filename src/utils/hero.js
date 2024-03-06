import { Aeris } from "../components/characters/aeris";
import { Evelyn } from "../components/characters/evelyn";
import { Luna } from "../components/characters/luna";

export const getHeroes = (ctx, heroes) => {
    console.log(heroes)
    return heroes.map((hero) => {
        switch (hero.name) {
            case 'Luna':
                return new Luna({ id: hero.id, x: Math.random() * ctx.canvas.width / 1.2, y: ctx.canvas.height / 1.9, ctx, status: hero.status })
            case 'Evelyn':
                return new Evelyn({ id: hero.id, x: Math.random() * ctx.canvas.width / 1.2, y: ctx.canvas.height / 1.9, ctx, status: hero.status })
            case 'Aeris':
                return new Aeris({ id: hero.id, x: Math.random() * ctx.canvas.width / 1.2, y: ctx.canvas.height / 1.9, ctx, status: hero.status })
            default:
                break;
        }
    })
}