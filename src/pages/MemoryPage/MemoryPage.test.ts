import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { Card } from "@src/components/Card/Card";

import { MemoryPage } from "@src/pages/MemoryPage/MemoryPage";

import { sortArray } from "@src/helpers/sortArray";

import cards from "@src/constants/cards";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const container = MemoryPage();
  document.body.appendChild(container);
  return { container: container };
};

jest.mock("@src/components/Card/Card");
jest.mock("@src/constants/cards", () => {
  const { mockCards } = jest.requireActual("@tests/jest.constants");
  return { __esModule: true, default: mockCards };
});

jest.mock("@src/helpers/sortArray", () => ({
  sortArray: jest.fn((arr) => arr),
}));

describe("MemoryPage.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = "";

    (Card as jest.Mock).mockImplementation(
      ({ id, name, imgSrc }: { id: string; name: string; imgSrc: string }) => {
        const button = document.createElement("button");
        button.className = `card ${id}`;
        button.setAttribute("aria-label", `button ${id}`);
        button.innerHTML = `<img class="card__img ${id}" src="${imgSrc}" alt="${name}" style="opacity:0" />`;
        return button;
      }
    );
  });

  describe("General Rendering Tests.", () => {
    test("It should render the main element with correct class", () => {
      const { container } = renderComponent();

      expect(container).toBeInstanceOf(HTMLElement);
      expect(container.className).toBe("memory-page");
    });

    test("It should render the main game section", () => {
      renderComponent();

      const gameSection = document.querySelector<HTMLElement>(".game");
      expect(gameSection).toBeInTheDocument();
      expect(gameSection?.tagName).toBe("SECTION");
    });

    test("It should render the title and description", () => {
      renderComponent();

      const title = screen.getByText("Welcome to Memory GAME!");
      const description = screen.getByText(/find the img match/i);

      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    test("It should render timer text", () => {
      renderComponent();

      const timer = screen.getByText(/Your time to finish was/i);
      expect(timer).toBeInTheDocument();
      expect(timer.tagName).toBe("H2");
    });
  });

  describe("Cards Rendering Tests.", () => {
    test("It should call sortArray with duplicated cards array", () => {
      renderComponent();

      expect(sortArray).toHaveBeenCalledTimes(1);
      const duplicatedLength = cards.length * 2;
      expect((sortArray as jest.Mock).mock.calls[0][0].length).toBe(
        duplicatedLength
      );
    });

    test("It should render all cards returned by sortedArray", () => {
      renderComponent();

      const cardButtons = document.querySelectorAll<HTMLButtonElement>(".card");
      expect(cardButtons.length).toBe(cards.length * 2);
    });

    test("Each card should contain an img element", () => {
      renderComponent();

      const imgs = document.querySelectorAll<HTMLImageElement>(".card__img");
      expect(imgs.length).toBe(cards.length * 2);
    });

    test("Each card should have proper src and alt attributes", () => {
      renderComponent();

      const imgs = document.querySelectorAll<HTMLImageElement>(".card__img");

      imgs.forEach((img) => {
        expect(img).toHaveAttribute("src");
        expect(img).toHaveAttribute("alt");
      });
    });

    test("Each card button should have aria-label and correct class", () => {
      renderComponent();

      const buttons =
        document.querySelectorAll<HTMLButtonElement>("button.card");
      buttons.forEach((btn) => {
        expect(btn).toHaveAttribute("aria-label");
        expect(btn.classList.contains("card")).toBe(true);
      });
    });
  });

  describe("Card Click Behavior Tests.", () => {
    test("It should set img opacity to 1 when card clicked", async () => {
      renderComponent();

      const firstCard = document.querySelector<HTMLButtonElement>(".card");
      const img = firstCard!.querySelector<HTMLImageElement>("img");

      expect(img!.style.opacity).toBe("0");

      const onClick = (Card as jest.Mock).mock.calls[0][0].onClick;
      const event = new MouseEvent("click", { bubbles: true });
      Object.defineProperty(event, "currentTarget", { value: firstCard });

      onClick(event, "A");

      expect(img!.style.opacity).toBe("1");
    });

    test("It should prevent flipping a card already visible", async () => {
      renderComponent();

      const firstCard = document.querySelector<HTMLButtonElement>(".card");
      const img = firstCard!.querySelector<HTMLImageElement>(
        "img"
      ) as HTMLImageElement;

      img.style.opacity = "1";
      await user.click(firstCard!);

      expect(img.style.opacity).toBe("1");
    });
  });

  describe("DOM Structure Tests.", () => {
    test("It should render .game__cards inside wrapper", () => {
      renderComponent();

      const wrapper = document.querySelector<HTMLDivElement>(
        ".game__wrapper-cards"
      );
      const cardsContainer =
        wrapper?.querySelector<HTMLDivElement>(".game__cards");

      expect(wrapper).toBeInTheDocument();
      expect(cardsContainer).toBeInTheDocument();
    });

    test("It should render .game__result-text inside .game__timer", () => {
      renderComponent();

      const timerSection =
        document.querySelector<HTMLDivElement>(".game__timer");
      const resultText =
        timerSection?.querySelector<HTMLHeadingElement>(".game__result-text");

      expect(timerSection).toBeInTheDocument();
      expect(resultText).toBeInTheDocument();
    });
  });

  describe("Integration with Card Component.", () => {
    test("It should call Card() for each sorted card", () => {
      renderComponent();

      expect(Card).toHaveBeenCalledTimes(cards.length * 2);
    });

    test("Each generated card should append to .game__cards container", () => {
      renderComponent();

      const cardsContainer =
        document.querySelector<HTMLDivElement>(".game__cards");
      const children = cardsContainer?.children;
      expect(children?.length).toBe(cards.length * 2);
    });
  });
});
