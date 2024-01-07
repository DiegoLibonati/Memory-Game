import { Card } from "./Card";
import { imageReveal } from "./helpers/imageReveal";
import { sortArray } from "./helpers/sortArray";
import { startCount } from "./helpers/startCount";

const imgsContainer = document.querySelector(".imagenes") as HTMLElement;

const imgsGame = [
  new Card(
    "imgPizza",
    "https://saboryestilo.com.mx/wp-content/uploads/elementor/thumbs/masa-para-pizza-3-1-os3aa3ck56334eoe88d8hkem59xt1jziomikxlzx34.jpg"
  ),
  new Card(
    "imgPaella",
    "https://www.hola.com/imagenes/cocina/recetas/20200917175530/paella-valenciana-clasica/0-866-670/paella-age-m.jpg"
  ),
  new Card(
    "imgBife",
    "https://cdn2.cocinadelirante.com/sites/default/files/images/2019/04/como-sauvizar-carnes.jpg"
  ),
  new Card(
    "imgManzana",
    "https://www.cuerpomente.com/medio/2020/11/10/manzana_a1c5bdb0_1200x1200.jpg"
  ),
  new Card(
    "imgPera",
    "https://perfumesyfragancias.online/wp-content/uploads/2018/10/poire.jpg"
  ),
  new Card("imgCoco", "https://i.blogs.es/f63b6d/coco/450_1000.jpg"),
];

const innerCards = (array: Card[]): void => {
  const newArray = array.concat(array);
  const sortedArray = sortArray(newArray);

  sortedArray.forEach((card) => {
    imgsContainer.innerHTML += card.textInner();
  });

  return;
};

innerCards(imgsGame);

const btns = document.querySelectorAll(".buttons") as NodeList;
const timer = document.querySelector(".tiempo h2") as HTMLHeadingElement;

let readyGo: Date;
let cardSelected: string = "";
let value: string;
let endGame: string[] = [];

imgsContainer.addEventListener("click", startCount, true);
imgsContainer.removeEventListener("click", startCount, true);

btns.forEach(function (btn) {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!readyGo) readyGo = startCount();

    const target = e.currentTarget as HTMLElement;

    if (target.dataset.id) value = target.dataset.id;

    const img = target.children[0] as HTMLImageElement;
    
    if (Boolean(parseInt(img.style.opacity))) return;

    imageReveal(img, 1);

    gameFunction();
  });
});

const gameFunction = () => {
  if (cardSelected === value) {
    document.querySelectorAll(`.${value}`).forEach(function (img) {
      const button = img as HTMLButtonElement;

      button.disabled = true;
      button.classList.remove("imagen");
      button.classList.remove(`${value}`);
    });

    let contador = "+";

    endGame.push(contador);

    if (endGame.length == imgsGame.length) {
      const end = new Date();
      const finalTime = end.getTime() - readyGo.getTime();
      const inSec = Math.floor(finalTime / 1000);
      timer!.innerHTML = `Finish the game in ${inSec} seconds. Congrats.`;
      return;
    }

    cardSelected = "";
    return;
  }

  if (cardSelected) {
    const cardSelectedElement = document.querySelector(
      `.imagen.${cardSelected}[style="opacity: 1;"]`
    ) as HTMLImageElement;

    const cardValueElement = document.querySelector(
      `.imagen.${value}[style="opacity: 1;"]`
    ) as HTMLImageElement;

    setTimeout(function () {
      imageReveal(cardSelectedElement, 0);
      imageReveal(cardValueElement, 0);
    }, 250);

    cardSelected = "";
    return;
  }

  cardSelected = value;
  return;
};
