import { screen } from "@testing-library/dom";
import user from "@testing-library/user-event";

import { CardProps } from "@src/entities/props";

import { Card } from "@src/components/Card/Card";

type RenderComponent = {
  container: HTMLButtonElement;
  props: { onClick: jest.Mock } & CardProps;
};

const renderComponent = (
  props: { onClick: jest.Mock } & CardProps
): RenderComponent => {
  const container = Card(props);
  document.body.appendChild(container);

  return { container: container, props: props };
};

describe("Card.ts", () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = "";
  });

  describe("General Tests.", () => {
    test("It should render the component as a button", () => {
      const props = {
        id: "card-1",
        name: "Example Card",
        imgSrc: "example.png",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container).toBeInstanceOf(HTMLButtonElement);
      expect(container.tagName).toBe("BUTTON");
      expect(container.classList.contains("card")).toBe(true);
    });

    test("It should set aria-label and data-id correctly", () => {
      const props = {
        id: "card-1",
        name: "Example Card",
        imgSrc: "example.png",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container).toHaveAttribute("aria-label", "button card-1");
      expect(container).toHaveAttribute("data-id", "card-1");
    });

    test("It should render an img element inside the button", () => {
      const props = {
        id: "card-1",
        name: "Example Card",
        imgSrc: "example.png",
        onClick: mockOnClick,
      };

      renderComponent(props);

      const img = document.querySelector<HTMLImageElement>(".card__img");
      expect(img).toBeInTheDocument();
      expect(img!.tagName).toBe("IMG");
    });
  });

  describe("Props Rendering Tests.", () => {
    test("It should apply correct id class to button", () => {
      const props = {
        id: "unique-card",
        name: "Card Name",
        imgSrc: "image.png",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.classList.contains("unique-card")).toBe(true);
    });

    test("It should set correct img src and alt attributes", () => {
      const props = {
        id: "card-2",
        name: "Example Image",
        imgSrc: "path/to/img.jpg",
        onClick: mockOnClick,
      };

      renderComponent(props);

      const img = document.querySelector<HTMLImageElement>(".card__img");

      expect(img).toHaveAttribute("src", "path/to/img.jpg");
      expect(img).toHaveAttribute("alt", "Example Image");
    });
  });

  describe("Click Event Tests.", () => {
    test("It should call onClick when button is clicked", async () => {
      const props = {
        id: "card-3",
        name: "Clickable Card",
        imgSrc: "click.png",
        onClick: mockOnClick,
      };

      const { props: cardProps } = renderComponent(props);
      const button = screen.getByRole("button", { name: /button card-3/i });

      await user.click(button);

      expect(cardProps.onClick).toHaveBeenCalledTimes(1);
    });

    test("It should pass event and id parameters to onClick", async () => {
      const props = {
        id: "card-5",
        name: "Card Name",
        imgSrc: "img.png",
        onClick: mockOnClick,
      };

      const { props: cardProps } = renderComponent(props);
      const button = screen.getByRole("button", { name: /button card-5/i });

      await user.click(button);

      expect(cardProps.onClick).toHaveBeenCalledWith(
        expect.any(MouseEvent),
        "card-5"
      );
    });

    test("It should call onClick multiple times on multiple clicks", async () => {
      const props = {
        id: "card-6",
        name: "Repeated Click",
        imgSrc: "multi.png",
        onClick: mockOnClick,
      };

      const { props: cardProps } = renderComponent(props);
      const button = screen.getByRole("button", { name: /button card-6/i });

      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(cardProps.onClick).toHaveBeenCalledTimes(3);
    });
  });

  describe("Accessibility Tests.", () => {
    test("It should be accessible via keyboard focus", () => {
      const props = {
        id: "card-focus",
        name: "Focusable Card",
        imgSrc: "focus.png",
        onClick: mockOnClick,
      };

      renderComponent(props);

      const button = screen.getByRole("button", { name: /button card-focus/i });

      button.focus();
      expect(document.activeElement).toBe(button);
    });

    test("It should have proper aria-label for accessibility", () => {
      const props = {
        id: "card-aria",
        name: "Accessible Card",
        imgSrc: "aria.png",
        onClick: mockOnClick,
      };

      renderComponent(props);

      const button = screen.getByRole("button", { name: /button card-aria/i });
      expect(button).toHaveAttribute("aria-label", "button card-aria");
    });
  });

  describe("DOM Structure Tests.", () => {
    test("It should nest img inside button", () => {
      const props = {
        id: "card-7",
        name: "Nested Image",
        imgSrc: "nested.png",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);
      const img = container.querySelector<HTMLImageElement>(".card__img");

      expect(img).toBeInTheDocument();
    });

    test("It should have correct class names", () => {
      const props = {
        id: "card-8",
        name: "Styled Card",
        imgSrc: "styled.png",
        onClick: mockOnClick,
      };

      const { container } = renderComponent(props);

      expect(container.classList.contains("card")).toBe(true);
      expect(container.classList.contains("card-8")).toBe(true);
    });
  });
});
