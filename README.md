# Memory Game

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

---

1. Clone the repository
2. Join to the correct path of the clone
3. Execute: `yarn install`
4. Execute: `yarn dev`

## Description

I made a web page that allows you to play the memory game. You have to find the even cards, to know which ones are even you have to search among the different foods, if you find two apples you add points and you add a pair. Once you finish playing and you have found all your pairs it will calculate the time it took you to finish.

## Technologies used

1. Typescript
2. CSS3
3. HTML5

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/Memory-Game`](https://www.diegolibonati.com.ar/#/project/Memory-Game)

## Video

https://github.com/DiegoLibonati/Memory-Game-Page/assets/99032604/1a61ef4a-38b7-4646-8b28-09c7a454b837

## Documentation

The `Card` class will be used to create a new card. It will be passed a constructor that will have as attributes the `id` and the `image` and also a method called `createCard()` that will serve as a clickable button element:

```
export class Card {
  constructor(public readonly id: string, public image: string) {}

  createCard(): HTMLButtonElement {

    const button = document.createElement("button") as HTMLButtonElement
    const img = document.createElement("img") as HTMLImageElement

    button.setAttribute("class", `buttons ${this.id}`)
    button.setAttribute("data-id", this.id)

    img.src = this.image
    img.setAttribute("class", `image ${this.id}`)

    button.append(img)

    return button
  }
}
```

In this array called `cards` we are going to store all the objects that we instantiate from the `Card` class:

```
import { Card } from "../Card";

export const cards: Card[] = [
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
```

This function will allow us to sort the array we pass to it randomly:

```
import { Card } from "../Card";

export const sortArray = (array: Card[]): Card[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};
```

We will create two arrays because we want to generate two pairs, then we will push equal parts of the cards to each array from the `cards` array and finally we will randomly order both arrays with `createCards()`:

```
const createCards = (array: Card[]): void => {

  const newArray = array.concat(array);
  const sortedArray = sortArray(newArray);

  sortedArray.forEach((card) => {
    imgsContainer.append(card.createCard());
  });

  return;
};

createCards(cards);
```
