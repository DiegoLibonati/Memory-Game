import { Card } from "./models/Card";

import { sortArray } from "./helpers/sortArray";
import { getElements } from "./helpers/getElements";
import { cards } from "./constants/data";

let timerStart: Date | null = null;
let cardsGuessed: string[] = [];
let cardSelected: string = "";
let idCard: string = "";

const createCards = (array: Card[]): void => {
  const { imgsContainer } = getElements();

  const newArray = array.concat(array);
  const sortedArray = sortArray<Card>(newArray);

  sortedArray.forEach((card) => {
    imgsContainer.append(card.createCard());
  });
};

const handleClickImageButton = (e: Event) => {
  e.preventDefault();

  if (!timerStart) timerStart = new Date();

  const target = e.currentTarget as HTMLElement;

  if (target.dataset.id) idCard = target.dataset.id;

  const img = target.children[0] as HTMLImageElement;

  if (Boolean(parseInt(img.style.opacity))) return;

  img.style.opacity = "1";

  game();
};

const game = () => {
  const { timer } = getElements();

  if (!cardSelected) {
    cardSelected = idCard;
    return;
  }

  if (cardSelected !== idCard) {
    const cardSelectedElement = document.querySelector(
      `.card__img.${cardSelected}[style="opacity: 1;"]`
    ) as HTMLImageElement;

    const cardValueElement = document.querySelector(
      `.card__img.${idCard}[style="opacity: 1;"]`
    ) as HTMLImageElement;

    setTimeout(function () {
      cardSelectedElement.style.opacity = "0";
      cardValueElement.style.opacity = "0";
    }, 250);

    cardSelected = "";
    return;
  }

  document.querySelectorAll(`.${idCard}`).forEach(function (img) {
    const button = img as HTMLButtonElement;

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

const onInit = () => {
  timerStart = null;
  cardsGuessed = [];
  cardSelected = "";
  idCard = "";

  createCards(cards);

  const btns = document.querySelectorAll(".card") as NodeList;

  btns.forEach((btn) =>
    btn.addEventListener("click", (e) => handleClickImageButton(e))
  );
};

document.addEventListener("DOMContentLoaded", onInit);
