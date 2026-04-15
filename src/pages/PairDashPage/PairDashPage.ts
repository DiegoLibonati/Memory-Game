import type { Card as CardT } from "@/types/app";
import type { Page } from "@/types/pages";
import type { CardComponent } from "@/types/components";

import Card from "@/components/Card/Card";

import cards from "@/constants/cards";

import { sortArray } from "@/helpers/sortArray";

import "@/pages/PairDashPage/PairDashPage.css";

const PairDashPage = (): Page => {
  const main = document.createElement("main") as Page;
  main.className = "pair-dash-page";

  main.innerHTML = `
    <section class="game">
        <div class="game__explication">
            <h1 class="game__explication-title">Welcome to PairDash!</h1>
            <p class="game__description">
                You mission is find the img match, and try to beat your best record
                in seconds.
            </p>
        </div>

        <div class="game__wrapper-cards">
            <div class="game__cards"></div>
        </div>

        <div class="game__timer">
            <h2 class="game__result-text">
                Your time to finish was: Try to play before
            </h2>
        </div>
    </section>
  `;

  const gameCards = main.querySelector<HTMLDivElement>(".game__cards");

  const newArray = cards.concat(cards);
  const sortedArray = sortArray<CardT>(newArray);
  const cardsGuessed: string[] = [];

  const createdCards: CardComponent[] = [];
  let gameTimeout: number | null = null;

  let timerStart: Date | null = null;
  let cardSelected = "";
  let idCard = "";

  const onClickCard = (e: MouseEvent, id: string): void => {
    e.preventDefault();

    const target = e.currentTarget as HTMLElement;
    const img = target.children[0] as HTMLImageElement;

    idCard = id;

    timerStart ??= new Date();

    if (parseFloat(img.style.opacity || "0") > 0) return;

    img.style.opacity = "1";

    game();
  };

  const game = (): void => {
    const timer = main.querySelector<HTMLHeadingElement>(".game__result-text");

    if (!cardSelected) {
      cardSelected = idCard;
      return;
    }

    if (cardSelected !== idCard) {
      const cardSelectedElement = main.querySelector<HTMLImageElement>(
        `.card__img.${CSS.escape(cardSelected)}[style*="opacity: 1"]`
      );

      const cardValueElement = main.querySelector<HTMLImageElement>(
        `.card__img.${CSS.escape(idCard)}[style*="opacity: 1"]`
      );

      if (gameTimeout !== null) {
        clearTimeout(gameTimeout);
        gameTimeout = null;
      }

      gameTimeout = setTimeout(() => {
        if (cardSelectedElement) {
          cardSelectedElement.style.opacity = "0";
        }
        if (cardValueElement) {
          cardValueElement.style.opacity = "0";
        }
        gameTimeout = null;
      }, 250);

      cardSelected = "";
      return;
    }

    main
      .querySelectorAll<HTMLButtonElement>(`.${CSS.escape(idCard)}`)
      .forEach((btn) => {
        btn.disabled = true;
        btn.classList.remove(idCard);
      });

    cardsGuessed.push(cardSelected);

    if (cardsGuessed.length === cards.length && timer && timerStart) {
      const end = new Date();
      const finalTime = end.getTime() - timerStart.getTime();
      const inSec = Math.floor(finalTime / 1000);
      timer.innerHTML = `Finish the game in ${inSec} seconds. Congrats.`;
      return;
    }

    cardSelected = "";
  };

  sortedArray.forEach((card) => {
    const cardComponent = Card({
      id: card.id,
      imgSrc: card.img,
      name: card.name,
      onClick: onClickCard,
    });

    createdCards.push(cardComponent);
    gameCards?.append(cardComponent);
  });

  main.cleanup = (): void => {
    if (gameTimeout !== null) {
      clearTimeout(gameTimeout);
      gameTimeout = null;
    }

    createdCards.forEach((card) => {
      card.cleanup?.();
    });
  };

  return main;
};

export default PairDashPage;
