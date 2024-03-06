import { useCallback, useState } from "react";
import { useEffect } from "react";
import { useRef } from "react"

import { Background } from "./components/fields/background";
import { MenuButton } from "./components/fields/menu-button";
import { CoinFrame, Frame } from "./components/fields/frame";
import { getHeroes } from "./utils/hero";
import { ModalHero } from "./components/fields/modal";

function App() {
  const [playerStatus, setPlayerStatus] = useState();
  const [canvasCtx, setCanvasCtx] = useState();
  const [game, setGame] = useState(null);
  const [modalHero, setModalHero] = useState(false);
  const [selectedHeroModal, setSelectedHeroModal] = useState();

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
          { id: 1234, name: 'Luna', status: { level: 10, health: 1200, attack: 300, armor: 30, speed: 45 } },
          { id: 2134, name: 'Evelyn', status: { level: 5, health: 5323, attack: 67, armor: 100, speed: 20 } },
          { id: 4321, name: 'Aeris', status: { level: 1, health: 234, attack: 34, armor: 45, speed: 60 } },
        ],
        coin: 1000,
        username: 'Bryan',
        profileHero: 'Luna',
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
          setting: new MenuButton({ ctx: canvasCtx, x: canvasCtx.canvas.width / 1.23, y: canvasCtx.canvas.height / 1.2, text: 'SETTING' }),
          hero: new MenuButton({ ctx: canvasCtx, x: canvasCtx.canvas.width / 1.58, y: canvasCtx.canvas.height / 1.2, text: 'HERO' }),
          story: new MenuButton({ ctx: canvasCtx, x: canvasCtx.canvas.width / 2.21, y: canvasCtx.canvas.height / 1.2, text: 'STORY' }),
        },
        frame: new Frame({ ctx: canvasCtx, x: 10, y: -10, hero: playerStatus.profileHero, playerName: playerStatus.username, level: playerStatus.level }),
        coin: new CoinFrame({ ctx: canvasCtx, x: canvasCtx.canvas.width / 1.27, y: -10, coinAmount: playerStatus.coin }),
        modalHero: new ModalHero({ ctx: canvasCtx, heroes: getHeroes(canvasCtx, playerStatus.hero) })
      })
    }
  }, [playerStatus, canvasCtx])

  const drawAssets = useCallback(() => {
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
      if (modalHero) {
        game.button.story.disable = true;
        game.button.hero.disable = true;
        game.button.setting.disable = true;
        if (selectedHeroModal) {
          game.modalHero.selectedHero = selectedHeroModal;
        }
        game.modalHero.draw();
      } else {
        game.button.story.disable = false;
        game.button.hero.disable = false;
        game.button.setting.disable = false;
      }
    }
  }, [game, modalHero, selectedHeroModal])

  useEffect(() => {
    const handleButtonHover = (e, type = null) => {
      if (game) {
        const story = game.button.story.isOver(e)
        const hero = game.button.hero.isOver(e)
        const setting = game.button.setting.isOver(e)

        const modalHeroClose = game.modalHero.isCloseButtonOver(e);
        const heroSelected = game.modalHero.getHeroListData(e);

        if (type === 'click') {
          if (story) {
            console.log('story')
          } else if (hero) {
            setModalHero(true)
          } else if (setting) {
            console.log('setting')
          } else if (modalHeroClose) {
            setModalHero(false)
          } else if (heroSelected) {
            console.log(heroSelected)
            setSelectedHeroModal(heroSelected)
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
  }, [game, modalHero])

  useEffect(() => {
    if (game) {
      const updateGame = () => {
        drawAssets();
        animationRef.current = requestAnimationFrame(updateGame);
      };

      animationRef.current = requestAnimationFrame(updateGame);

      return () => {
        cancelAnimationFrame(animationRef.current);
      };
    }
  }, [game, modalHero, selectedHeroModal]);

  return <canvas ref={canvasRef} />
}

export default App
