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
