export class Card {
  constructor(public readonly id: string, public image: string) {}

  textInner() {
    return `<button class="buttons ${this.id}" data-id="${this.id}"><img src="${this.image}" class="imagen ${this.id}"></button>`;
  }
}
