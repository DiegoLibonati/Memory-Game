import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { CardProps } from "@/types/props";
import type { CardComponent } from "@/types/components";

import Card from "@/components/Card/Card";

const mockOnClick = jest.fn();

const defaultProps: CardProps = {
  id: "cat",
  name: "Cat",
  imgSrc: "/images/cat.png",
  onClick: mockOnClick,
};

const renderComponent = (props: Partial<CardProps> = {}): CardComponent => {
  const element = Card({ ...defaultProps, ...props });
  document.body.appendChild(element);
  return element;
};

describe("Card", () => {
  afterEach(() => {
    document.body.innerHTML = "";
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("should render a button element", () => {
      renderComponent();
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("should have the correct className", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveClass("card", "cat");
    });

    it("should have the correct aria-label", () => {
      renderComponent();
      expect(
        screen.getByRole("button", { name: "Card: Cat" })
      ).toBeInTheDocument();
    });

    it("should have the correct data-id attribute", () => {
      renderComponent();
      expect(screen.getByRole("button")).toHaveAttribute("data-id", "cat");
    });

    it("should render an img with the correct src", () => {
      renderComponent();
      const img = screen
        .getByRole("button")
        .querySelector<HTMLImageElement>("img");
      expect(img).toHaveAttribute("src", "/images/cat.png");
    });

    it("should render an img with the correct alt text", () => {
      renderComponent();
      const img = screen
        .getByRole("button")
        .querySelector<HTMLImageElement>("img");
      expect(img).toHaveAttribute("alt", "Cat");
    });

    it("should render an img with the correct className", () => {
      renderComponent();
      const img = screen
        .getByRole("button")
        .querySelector<HTMLImageElement>("img");
      expect(img).toHaveClass("card__img", "cat");
    });
  });

  describe("behavior", () => {
    it("should call onClick with the event and id when clicked", async () => {
      const user = userEvent.setup();
      renderComponent();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledTimes(1);
      expect(mockOnClick).toHaveBeenCalledWith(expect.any(MouseEvent), "cat");
    });

    it("should call onClick with the correct id for different card ids", async () => {
      const user = userEvent.setup();
      renderComponent({ id: "dog", name: "Dog" });
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).toHaveBeenCalledWith(expect.any(MouseEvent), "dog");
    });
  });

  describe("cleanup", () => {
    it("should remove the click event listener after cleanup is called", async () => {
      const user = userEvent.setup();
      const element = renderComponent();
      element.cleanup?.();
      await user.click(screen.getByRole("button"));
      expect(mockOnClick).not.toHaveBeenCalled();
    });
  });
});
