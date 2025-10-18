import { CardProps } from "@src/entities/props";

import "@src/components/Card/Card.css";

export const Card = ({
  id,
  name,
  imgSrc,
  onClick,
}: CardProps): HTMLButtonElement => {
  const button = document.createElement("button");
  button.className = `card ${id}`;
  button.setAttribute("aria-label", `button ${id}`);
  button.setAttribute("data-id", id);

  button.innerHTML = `
    <img class="card__img ${id}" src="${imgSrc}" alt="${name}"></img>
  `;

  button.addEventListener("click", (e) => onClick(e, id));

  return button;
};
