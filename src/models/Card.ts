export class Card {
  constructor(public readonly id: string, public image: string) {}

  createCard(): HTMLButtonElement {
    const button = document.createElement("button") as HTMLButtonElement;
    const img = document.createElement("img") as HTMLImageElement;

    button.setAttribute("class", `btn ${this.id}`);
    button.setAttribute("aria-label", `button ${this.id}`);
    button.setAttribute("data-id", this.id);

    img.src = this.image;
    img.setAttribute("class", `btn__img ${this.id}`);

    button.append(img);

    return button;
  }
}
