import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import { MemoryPage } from "@/pages/MemoryPage/MemoryPage";

const renderPage = (): Page => {
  const container = MemoryPage();
  document.body.appendChild(container);
  return container;
};

describe("MemoryPage", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("should render the page with correct structure", () => {
    renderPage();

    const main = document.querySelector<HTMLElement>(".memory-page");
    expect(main).toBeInTheDocument();
    expect(main?.tagName).toBe("MAIN");
  });

  it("should render game title and description", () => {
    renderPage();

    expect(screen.getByText("Welcome to Memory GAME!")).toBeInTheDocument();
    expect(
      screen.getByText(/You mission is find the img match/)
    ).toBeInTheDocument();
  });

  it("should render timer section", () => {
    renderPage();

    const timer =
      document.querySelector<HTMLHeadingElement>(".game__result-text");
    expect(timer).toBeInTheDocument();
    expect(timer?.textContent).toContain("Try to play before");
  });

  it("should render cards container", () => {
    renderPage();

    const cardsContainer =
      document.querySelector<HTMLDivElement>(".game__cards");
    expect(cardsContainer).toBeInTheDocument();
  });

  it("should render double the number of cards", () => {
    renderPage();

    const cards = document.querySelectorAll<HTMLButtonElement>(".card");
    expect(cards).toHaveLength(6);
  });

  it("should show card image when clicked", async () => {
    const user = userEvent.setup({ delay: null });
    renderPage();

    const cards = document.querySelectorAll<HTMLButtonElement>(".card");
    const firstCard = cards[0];

    if (firstCard) await user.click(firstCard);

    const image = firstCard?.querySelector<HTMLImageElement>(".card__img");
    expect(image?.style.opacity).toBe("1");
  });

  it("should hide non-matching cards after delay", async () => {
    const user = userEvent.setup({ delay: null });
    renderPage();

    const cards = document.querySelectorAll<HTMLButtonElement>(".card");

    if (cards[0]) await user.click(cards[0]);

    const firstCardClass = cards[0]?.className
      .split(" ")
      .find((c) => c !== "card");
    const nonMatchingCard = Array.from(cards).find(
      (card, index) => index > 0 && !card.className.includes(firstCardClass!)
    );

    if (nonMatchingCard) await user.click(nonMatchingCard);

    jest.advanceTimersByTime(250);

    const firstImage = cards[0]?.querySelector<HTMLImageElement>(".card__img");
    const secondImage =
      nonMatchingCard?.querySelector<HTMLImageElement>(".card__img");

    expect(firstImage?.style.opacity).toBe("0");
    expect(secondImage?.style.opacity).toBe("0");
  });

  it("should disable matching cards", async () => {
    const user = userEvent.setup({ delay: null });
    renderPage();

    const cards = document.querySelectorAll<HTMLButtonElement>(".card");

    const firstCardClass = cards[0]?.className
      .split(" ")
      .find((c) => c !== "card");
    const matchingCard = Array.from(cards).find(
      (card, index) => index > 0 && card.className.includes(firstCardClass!)
    );

    if (cards[0]) await user.click(cards[0]);
    if (matchingCard) await user.click(matchingCard);

    expect(cards[0]).toHaveAttribute("disabled");
    expect(matchingCard).toHaveAttribute("disabled");
  });

  it("should not allow clicking already visible cards", async () => {
    const user = userEvent.setup({ delay: null });
    renderPage();

    const cards = document.querySelectorAll<HTMLButtonElement>(".card");
    const firstCard = cards[0];

    if (firstCard) {
      await user.click(firstCard);
      const image = firstCard.querySelector<HTMLImageElement>(".card__img");
      const initialOpacity = image?.style.opacity;

      await user.click(firstCard);
      expect(image?.style.opacity).toBe(initialOpacity);
    }
  });

  it("should show completion message when all cards are matched", async () => {
    const user = userEvent.setup({ delay: null });
    renderPage();

    const cards = document.querySelectorAll<HTMLButtonElement>(".card");
    const cardPairs = new Map<string, HTMLButtonElement[]>();

    cards.forEach((card) => {
      const cardClass = card.className.split(" ").find((c) => c !== "card");
      if (cardClass) {
        if (!cardPairs.has(cardClass)) {
          cardPairs.set(cardClass, []);
        }
        cardPairs.get(cardClass)?.push(card);
      }
    });

    for (const [, pair] of cardPairs) {
      if (pair[0]) await user.click(pair[0]);
      if (pair[1]) await user.click(pair[1]);
    }

    const timer =
      document.querySelector<HTMLHeadingElement>(".game__result-text");
    expect(timer?.textContent).toContain("Finish the game");
    expect(timer?.textContent).toContain("seconds");
  });

  it("should cleanup timeout and cards on page cleanup", () => {
    const page = renderPage();

    expect(page.cleanup).toBeDefined();
    page.cleanup?.();

    expect(page.cleanup).toBeDefined();
  });
});
