import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react"

import { Background } from "./components/fields/background";
import { Button } from "./components/fields/button";
import { CoinFrame, Frame } from "./components/fields/frame";
import { getHeroes } from "./utils/hero";

function App() {
  const [playerStatus, setPlayerStatus] = useState();
  const [canvasCtx, setCanvasCtx] = useState();
  const [game, setGame] = useState(null)
  const canvasRef = useRef();
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    setCanvasCtx(context)
  }, []);

  useEffect(() => {
    if (canvasCtx) {
      setPlayerStatus({
        hero: [
          { id: 1234, name: 'luna' },
          { id: 2134, name: 'evelyn' },
          { id: 4321, name: 'aeris' }
        ],
        coin: 1000,
        username: 'Bryan',
        profileHero: 'luna',
        level: 5
      })
    }
  }, [canvasCtx])

  useEffect(() => {
    if (playerStatus) {
      setGame({
        background: new Background({ ctx: canvasCtx }),
        hero: getHeroes(canvasCtx, playerStatus.hero),
        button: {
          setting: new Button({ ctx: canvasCtx, x: canvasCtx.canvas.width / 1.23, y: canvasCtx.canvas.height / 1.2, text: 'SETTING' }),
          hero: new Button({ ctx: canvasCtx, x: canvasCtx.canvas.width / 1.58, y: canvasCtx.canvas.height / 1.2, text: 'HERO' }),
          story: new Button({ ctx: canvasCtx, x: canvasCtx.canvas.width / 2.21, y: canvasCtx.canvas.height / 1.2, text: 'STORY' }),
        },
        frame: new Frame({ ctx: canvasCtx, x: 10, y: -10, hero: playerStatus.profileHero, playerName: playerStatus.username, level: playerStatus.level }),
        coin: new CoinFrame({ ctx: canvasCtx, x: canvasCtx.canvas.width / 1.27, y: -10, coinAmount: playerStatus.coin })
      })
    }
  }, [playerStatus, canvasCtx])

  const drawCharacter = useCallback(() => {
    if (game) {
      game.background.draw();
      game.button.story.draw();
      game.button.hero.draw();
      game.button.setting.draw();
      game.frame.draw();
      game.coin.draw();
      game.hero.forEach((character) => {
        character.walk()
      });
    }
  }, [game])

  useEffect(() => {
    const handleButtonHover = (e, type = null) => {
      if (game) {
        const story = game.button.story.isOver(e)
        const hero = game.button.hero.isOver(e)
        const setting = game.button.setting.isOver(e)
        if (type === 'click') {
          if (story) {
            console.log('story')
          } else if (hero) {
            console.log('hero')
          } else if (setting) {
            console.log('setting')
          }
        }
      }
    }

    document.addEventListener('mousemove', (e) => handleButtonHover(e))
    document.addEventListener('click', (e) => handleButtonHover(e, 'click'))

    return () => {
      document.removeEventListener('mousemove', (e) => handleButtonHover(e))
      document.removeEventListener('click', (e) => handleButtonHover(e, 'click'))
    }
  }, [game])

  useEffect(() => {
    if (game) {
      const updateGame = () => {
        drawCharacter();
        animationRef.current = requestAnimationFrame(updateGame);
      };

      animationRef.current = requestAnimationFrame(updateGame);

      return () => {
        cancelAnimationFrame(animationRef.current);
      };
    }
  }, [game]);

  return <canvas ref={canvasRef} />
}

export default App
