import { Card } from "@src/models/Card";

const CARD = {
  id: "pepe",
  image: "url",
};

describe("Card Class", () => {
  let card: Card = new Card(CARD.id, CARD.image);

  test("It must have the correct initial state when initializing an instance of breakfast.", () => {
    expect(card.id).toBe(CARD.id);
    expect(card.image).toBe(CARD.image);
  });

  test("It must create the card, this card must be a clickable button.", () => {
    const btnCard = card.createCard();
    const imgCard = btnCard.querySelector(`.card__img.${card.id}`);

    expect(btnCard).toHaveAttribute("class", `card ${card.id}`);
    expect(btnCard).toHaveAttribute("aria-label", `button ${card.id}`);
    expect(btnCard).toHaveAttribute("data-id", card.id);
    expect(btnCard.children).toHaveLength(1);
    expect(imgCard).toBeTruthy();
  });
});
