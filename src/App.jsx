import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react"

import { Luna } from "./components/characters/luna";
import { Background } from "./components/fields/background";
import { Evelyn } from "./components/characters/evelyn";
import { Button } from "./components/fields/button";
import { Aeris } from "./components/characters/aeris";
import { Frame } from "./components/fields/frame";

function App() {
  const [canvasCtx, setCanvasCtx] = useState();
  const [game, setGame] = useState({})
  const canvasRef = useRef();
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    setGame({
      background: new Background({ ctx: context }),
      characters: [
        new Luna({ x: Math.random() * context.canvas.width / 1.2, y: context.canvas.height / 1.9, ctx: context }),
        new Evelyn({ x: Math.random() * context.canvas.width / 1.2, y: context.canvas.height / 1.9, ctx: context }),
        new Aeris({ x: Math.random() * context.canvas.width / 1.2, y: context.canvas.height / 1.9, ctx: context })
      ],
      button: {
        setting: new Button({ ctx: context, x: context.canvas.width / 1.23, y: context.canvas.height / 1.2, text: 'SETTING' }),
        friend: new Button({ ctx: context, x: context.canvas.width / 1.58, y: context.canvas.height / 1.2, text: 'FRIEND' }),
        hero: new Button({ ctx: context, x: context.canvas.width / 2.22, y: context.canvas.height / 1.2, text: 'HERO' }),
        story: new Button({ ctx: context, x: context.canvas.width / 3.74, y: context.canvas.height / 1.2, text: 'STORY' }),
      },
      frame: new Frame({ ctx: context, x: 10, y: -10, hero: 'evelyn', playerName: 'Bryan'})
    })

    setCanvasCtx(context)
  }, []);

  const drawCharacter = useCallback(() => {
    game.background.draw();
    game.button.story.draw();
    game.button.hero.draw();
    game.button.friend.draw();
    game.button.setting.draw();
    game.frame.draw();
    game.characters.forEach((character) => {
      character.walk()
    });
  }, [game, canvasCtx])

  useEffect(() => {
    const handleButtonHover = (e) => {
      if (game.button && canvasCtx) {
        game.button.story.isHover(e)
        game.button.hero.isHover(e)
        game.button.friend.isHover(e)
        game.button.setting.isHover(e)
      }
    }

    document.addEventListener('mousemove', handleButtonHover)

    return () => {
      document.removeEventListener('mousemove', handleButtonHover)
    }
  }, [game, canvasCtx])

  useEffect(() => {
    if (game.background && game.button && game.characters?.length > 0 && canvasCtx) {
      const updateGame = () => {
        drawCharacter();
        animationRef.current = requestAnimationFrame(updateGame);
      };

      animationRef.current = requestAnimationFrame(updateGame);

      return () => {
        cancelAnimationFrame(animationRef.current);
      };
    }
  }, [game && canvasCtx]);

  return <canvas ref={canvasRef} />
}

export default App
