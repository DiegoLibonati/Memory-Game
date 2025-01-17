import { screen, within } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { mockCards, OFFICIAL_BODY } from "./tests/jest.constants";

jest.mock("./constants/data.ts", () => ({
  get cards() {
    return mockCards;
  },
}));

describe("index.ts", () => {
  describe("General Tests.", () => {
    beforeEach(() => {
      jest.useFakeTimers();
      jest.resetAllMocks();

      document.body.innerHTML = OFFICIAL_BODY;

      require("./index.ts");
      document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();

      document.body.innerHTML = "";
    });

    test("It must render the header with the title and the image of the page.", () => {
      const header = document.querySelector(".header") as HTMLElement;
      const heading = within(header).getByRole("heading", {
        name: /memory game/i,
      });
      const img = within(header).getByRole("img");

      expect(header).toBeInTheDocument();
      expect(heading).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "./src/assets/DL.png");
      expect(img).toHaveAttribute("alt", "diego libonati");
    });

    test("It should render the page title and description.", () => {
      const titleApp = screen.getByRole("heading", {
        name: /welcome to memory game!/i,
      });
      const descriptionApp = screen.getByText(
        "You mission is find the img match, and try to beat your best record in seconds."
      );

      expect(titleApp).toBeInTheDocument();
      expect(descriptionApp).toBeInTheDocument();
    });

    test("It must render the page timer.", () => {
      const headingTimer = screen.getByRole("heading", {
        name: /your time to finish was: Try to play before/i,
      });

      expect(headingTimer).toBeInTheDocument();
    });

    test("It must render all the cards with their pairs to start playing.", () => {
      const imagesContainer = document.querySelector(".images__wrapper");

      expect(imagesContainer).toBeInTheDocument();
      expect(imagesContainer?.children).toHaveLength(mockCards.length * 2);
    });
  });

  describe("If the selected cards do not match.", () => {
    const userEvent = user.setup({
      advanceTimers: jest.advanceTimersByTime,
    });

    beforeEach(() => {
      jest.useFakeTimers();
      jest.resetAllMocks();

      document.body.innerHTML = OFFICIAL_BODY;

      require("./index.ts");
      document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();

      document.body.innerHTML = "";
    });

    test("It must hide the selected cards again.", async () => {
      const cardModelOne = mockCards[0];
      const cardModelTwo = mockCards[1];

      const cardsOne = screen.getAllByRole("button", {
        name: `button ${cardModelOne.id}`,
      });
      const cardsTwo = screen.getAllByRole("button", {
        name: `button ${cardModelTwo.id}`,
      });

      for (let cardOne of cardsOne) {
        expect(cardOne).toBeInTheDocument();
      }

      for (let cardTwo of cardsTwo) {
        expect(cardTwo).toBeInTheDocument();
      }

      const cardOne = cardsOne[0] as HTMLButtonElement;
      const cardTwo = cardsTwo[0] as HTMLButtonElement;

      const imgOne = cardOne.children[0] as HTMLImageElement;
      const imgTwo = cardTwo.children[0] as HTMLImageElement;

      expect(imgOne).toBeInTheDocument();
      expect(imgTwo).toBeInTheDocument();
      expect(imgOne.style.opacity).toBe("");
      expect(imgTwo.style.opacity).toBe("");

      await userEvent.click(cardOne);

      expect(imgOne.style.opacity).toBe("1");

      await userEvent.click(cardTwo);

      expect(imgTwo.style.opacity).toBe("1");

      jest.advanceTimersByTime(250);

      expect(imgOne.style.opacity).toBe("0");
      expect(imgTwo.style.opacity).toBe("0");
    });
  });

  describe("If the selected cards match.", () => {
    const userEvent = user.setup({
      advanceTimers: jest.advanceTimersByTime,
    });

    beforeEach(() => {
      jest.useFakeTimers();
      jest.resetAllMocks();

      document.body.innerHTML = OFFICIAL_BODY;

      require("./index.ts");
      document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();

      document.body.innerHTML = "";
    });

    test("It must permanently reveal the selected cards.", async () => {
      const cardModelOne = mockCards[0];

      const cardsOne = screen.getAllByRole("button", {
        name: `button ${cardModelOne.id}`,
      });

      for (let card of cardsOne) {
        expect(card).toBeInTheDocument();

        await userEvent.click(card);
      }

      for (let card of cardsOne) {
        expect(card).toBeDisabled();
        expect(card.classList.contains("imagen")).toBeFalsy();
        expect(card.classList.contains(card.id)).toBeFalsy();
      }
    });
  });

  describe("If the game ends", () => {
    const userEvent = user.setup({
      advanceTimers: jest.advanceTimersByTime,
    });

    beforeEach(() => {
      jest.useFakeTimers();
      jest.resetAllMocks();

      document.body.innerHTML = OFFICIAL_BODY;

      require("./index.ts");
      document.dispatchEvent(new Event("DOMContentLoaded"));
    });

    afterEach(() => {
      jest.runOnlyPendingTimers();
      jest.useRealTimers();

      document.body.innerHTML = "";
    });

    test("It should show the end timer.", async () => {
      for (let card of mockCards) {
        const cardButtons = screen.getAllByRole("button", {
          name: `button ${card.id}`,
        });

        for (let cardBtn of cardButtons) {
          expect(cardBtn).toBeInTheDocument();

          await userEvent.click(cardBtn);
        }
      }

      const finishGameHeading = screen.getByRole("heading", {
        name: /finish the game in/i,
      });
      expect(finishGameHeading).toBeInTheDocument();
    });
  });
});
