import { Card } from "./Card";
import { cards } from "./constants/cards";
import { imageReveal } from "./helpers/imageReveal";
import { sortArray } from "./helpers/sortArray";
import { startCount } from "./helpers/startCount";

const imgsContainer = document.querySelector(".images") as HTMLElement;
const timer = document.querySelector(".timer h2") as HTMLHeadingElement;

const createCards = (array: Card[]): void => {

  const newArray = array.concat(array);
  const sortedArray = sortArray(newArray);

  sortedArray.forEach((card) => {
    imgsContainer.append(card.createCard());
  });

  return;
};

createCards(cards);

const btns = document.querySelectorAll(".buttons") as NodeList;

let timerStart: Date;
let cardsGuessed: string[] = [];
let cardSelected: string = "";
let idCard: string;

btns.forEach(function (btn) {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!timerStart) timerStart = startCount();

    const target = e.currentTarget as HTMLElement;

    if (target.dataset.id) idCard = target.dataset.id;

    const img = target.children[0] as HTMLImageElement;

    if (Boolean(parseInt(img.style.opacity))) return;

    imageReveal(img, 1);

    gameFunction();
  });
});

const gameFunction = () => {

  if (cardSelected === idCard) {
    document.querySelectorAll(`.${idCard}`).forEach(function (img) {
      const button = img as HTMLButtonElement;

      button.disabled = true;
      button.classList.remove("imagen");
      button.classList.remove(`${idCard}`);
    });

    cardsGuessed.push(cardSelected);

    if (cardsGuessed.length == cards.length) {
      const end = new Date();
      const finalTime = end.getTime() - timerStart.getTime();
      const inSec = Math.floor(finalTime / 1000);
      timer!.innerHTML = `Finish the game in ${inSec} seconds. Congrats.`;
      return;
    }

    cardSelected = "";
    return;
  }

  if (cardSelected) {
    const cardSelectedElement = document.querySelector(
      `.image.${cardSelected}[style="opacity: 1;"]`
    ) as HTMLImageElement;

    const cardValueElement = document.querySelector(
      `.image.${idCard}[style="opacity: 1;"]`
    ) as HTMLImageElement;

    setTimeout(function () {
      imageReveal(cardSelectedElement, 0);
      imageReveal(cardValueElement, 0);
    }, 250);

    cardSelected = "";
    return;
  }

  cardSelected = idCard;
  return;
};
