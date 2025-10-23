import { Card as CardT } from "@src/entities/app";

import { Card } from "@src/components/Card/Card";

import cards from "@src/constants/cards";

import { sortArray } from "@src/helpers/sortArray";

import "@src/pages/MemoryPage/MemoryPage.css";

let timerStart: Date | null = null;
let cardsGuessed: string[] = [];
let cardSelected: string = "";
let idCard: string = "";

const onClickCard = (e: MouseEvent, id: string) => {
  e.preventDefault();

  const target = e.currentTarget as HTMLElement;
  const img = target.children[0] as HTMLImageElement;
  idCard = id;

  if (!timerStart) timerStart = new Date();

  if (Boolean(parseInt(img.style.opacity))) return;

  img.style.opacity = "1";

  game();
};

const game = () => {
  const timer =
    document.querySelector<HTMLHeadingElement>(".game__result-text");

  if (!cardSelected) {
    cardSelected = idCard;
    return;
  }

  if (cardSelected !== idCard) {
    const cardSelectedElement = document.querySelector<HTMLImageElement>(
      `.card__img.${cardSelected}[style="opacity: 1;"]`
    );

    const cardValueElement = document.querySelector<HTMLImageElement>(
      `.card__img.${idCard}[style="opacity: 1;"]`
    );

    setTimeout(function () {
      cardSelectedElement!.style.opacity = "0";
      cardValueElement!.style.opacity = "0";
    }, 250);

    cardSelected = "";
    return;
  }

  document
    .querySelectorAll<HTMLButtonElement>(`.${idCard}`)
    .forEach(function (btn) {
      const button = btn as HTMLButtonElement;

      button.disabled = true;
      button.classList.remove(`${idCard}`);
    });

  cardsGuessed.push(cardSelected);

  if (cardsGuessed.length == cards.length) {
    const end = new Date();
    const finalTime = end.getTime() - timerStart!.getTime();
    const inSec = Math.floor(finalTime / 1000);
    timer!.innerHTML = `Finish the game in ${inSec} seconds. Congrats.`;
    return;
  }

  cardSelected = "";
  return;
};

export const MemoryPage = (): HTMLElement => {
  const main = document.createElement("main");
  main.className = "memory-page";

  main.innerHTML = `
    <section class="game">
        <div class="game__explication">
            <h1 class="game__explication-title">Welcome to Memory GAME!</h1>
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

  sortedArray.forEach((card) => {
    const cardComponent = Card({
      id: card.id,
      imgSrc: card.img,
      name: card.name,
      onClick: onClickCard,
    });

    gameCards!.append(cardComponent);
  });

  return main;
};
