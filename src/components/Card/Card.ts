import type { CardProps } from "@/types/props";
import type { CardComponent } from "@/types/components";

import "@/components/Card/Card.css";

export const Card = ({
  id,
  name,
  imgSrc,
  onClick,
}: CardProps): CardComponent => {
  const button = document.createElement("button") as CardComponent;
  button.className = `card ${id}`;
  button.setAttribute("aria-label", `button ${id}`);
  button.setAttribute("data-id", id);

  button.innerHTML = `
    <img class="card__img ${id}" src="${imgSrc}" alt="${name}">
  `;

  const handleClick = (e: MouseEvent): void => {
    onClick(e, id);
  };

  button.addEventListener("click", handleClick);

  button.cleanup = (): void => {
    button.removeEventListener("click", handleClick);
  };

  return button;
};
