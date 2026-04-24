import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { Page } from "@/types/pages";

import PairDashPage from "@/pages/PairDashPage/PairDashPage";

let page: Page;

jest.mock("@/constants/cards", () => {
  const mockData = jest.requireActual("@tests/__mocks__/cards.mock");
  const { mockCards } = mockData;
  return {
    __esModule: true,
    default: mockCards,
  };
});

const renderPage = (): Page => {
  page = PairDashPage();
  document.body.appendChild(page);
  return page;
};

describe("PairDashPage", () => {
  afterEach(() => {
    page.cleanup?.();
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render a main element with class pair-dash-page", () => {
      renderPage();
      expect(screen.getByRole("main")).toHaveClass("pair-dash-page");
    });

    it("should render 6 card buttons", () => {
      renderPage();
      expect(screen.getAllByRole("button")).toHaveLength(6);
    });

    it("should render the game cards container", () => {
      renderPage();
      expect(
        page.querySelector<HTMLDivElement>(".game__cards")
      ).toBeInTheDocument();
    });

    it("should render the welcome title", () => {
      renderPage();
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Welcome to Pair Dash!"
      );
    });

    it("should render the initial timer text", () => {
      renderPage();
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Try to play before"
      );
    });
  });

  describe("game behavior", () => {
    describe("card reveal", () => {
      it("should reveal the card image on click", async () => {
        const user = userEvent.setup();
        renderPage();
        const [catCard] = Array.from(
          page.querySelectorAll<HTMLButtonElement>("[data-id='cat']")
        );
        const img = catCard!.querySelector<HTMLImageElement>("img")!;
        await user.click(catCard!);
        expect(img.style.opacity).toBe("1");
      });

      it("should not re-trigger game logic when clicking an already revealed card", async () => {
        const user = userEvent.setup();
        renderPage();
        const [first, second] = Array.from(
          page.querySelectorAll<HTMLButtonElement>("[data-id='cat']")
        );
        await user.click(first!);
        await user.click(first!);
        expect(first).not.toBeDisabled();
        expect(second).not.toBeDisabled();
      });
    });

    describe("when two cards with the same id are clicked", () => {
      it("should disable both matched card buttons", async () => {
        const user = userEvent.setup();
        renderPage();
        const [first, second] = Array.from(
          page.querySelectorAll<HTMLButtonElement>("[data-id='cat']")
        );
        await user.click(first!);
        await user.click(second!);
        expect(first).toBeDisabled();
        expect(second).toBeDisabled();
      });
    });

    describe("when two cards with different ids are clicked", () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });

      afterEach(() => {
        jest.useRealTimers();
      });

      it("should hide both cards after 250ms", async () => {
        const user = userEvent.setup({ delay: null });
        renderPage();
        const [catCard] = Array.from(
          page.querySelectorAll<HTMLButtonElement>("[data-id='cat']")
        );
        const [dogCard] = Array.from(
          page.querySelectorAll<HTMLButtonElement>("[data-id='dog']")
        );
        const catImg = catCard!.querySelector<HTMLImageElement>("img")!;
        const dogImg = dogCard!.querySelector<HTMLImageElement>("img")!;

        await user.click(catCard!);
        await user.click(dogCard!);

        jest.runAllTimers();

        expect(catImg.style.opacity).toBe("0");
        expect(dogImg.style.opacity).toBe("0");
      });
    });

    describe("when all pairs are matched", () => {
      it("should display the elapsed time in the timer heading", async () => {
        const user = userEvent.setup();
        renderPage();

        for (const cardId of ["cat", "dog", "bird"]) {
          const [first, second] = Array.from(
            page.querySelectorAll<HTMLButtonElement>(`[data-id="${cardId}"]`)
          );
          await user.click(first!);
          await user.click(second!);
        }

        expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
          /Finish the game in \d+ seconds\. Congrats\./
        );
      });
    });
  });

  describe("cleanup", () => {
    it("should remove event listeners from all card components", async () => {
      const user = userEvent.setup();
      renderPage();
      const [catCard] = Array.from(
        page.querySelectorAll<HTMLButtonElement>("[data-id='cat']")
      );
      const img = catCard!.querySelector<HTMLImageElement>("img")!;

      page.cleanup?.();
      await user.click(catCard!);

      expect(img.style.opacity).toBe("");
    });

    it("should clear any pending mismatch timeout", () => {
      jest.useFakeTimers();
      renderPage();

      const [catCard] = Array.from(
        page.querySelectorAll<HTMLButtonElement>("[data-id='cat']")
      );
      const [dogCard] = Array.from(
        page.querySelectorAll<HTMLButtonElement>("[data-id='dog']")
      );
      const catImg = catCard!.querySelector<HTMLImageElement>("img")!;

      catCard!.click();
      dogCard!.click();

      page.cleanup?.();
      jest.runAllTimers();

      expect(catImg.style.opacity).toBe("1");

      jest.useRealTimers();
    });
  });
});
