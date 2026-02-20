import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import type { CardProps } from "@/types/props";
import type { CardComponent } from "@/types/components";

import { Card } from "@/components/Card/Card";

const renderComponent = (props: CardProps): CardComponent => {
  const container = Card(props);
  document.body.appendChild(container);
  return container;
};

describe("Card Component", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const mockOnClick = jest.fn();

  const defaultProps: CardProps = {
    id: "cat",
    name: "Cat",
    imgSrc: "/images/cat.png",
    onClick: mockOnClick,
  };

  it("should render button with correct attributes", () => {
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "button cat" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("card", "cat");
    expect(button).toHaveAttribute("data-id", "cat");
    expect(button.tagName).toBe("BUTTON");
  });

  it("should render image with correct attributes", () => {
    renderComponent(defaultProps);

    const image = screen.getByAltText("Cat");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/images/cat.png");
    expect(image).toHaveClass("card__img", "cat");
  });

  it("should call onClick handler with event and id when clicked", async () => {
    const user = userEvent.setup();
    renderComponent(defaultProps);

    const button = screen.getByRole("button", { name: "button cat" });
    await user.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(expect.any(MouseEvent), "cat");
  });

  it("should render different cards", () => {
    const dogProps: CardProps = {
      id: "dog",
      name: "Dog",
      imgSrc: "/images/dog.png",
      onClick: mockOnClick,
    };

    renderComponent(dogProps);

    const button = screen.getByRole("button", { name: "button dog" });
    const image = screen.getByAltText("Dog");

    expect(button).toHaveClass("card", "dog");
    expect(image).toHaveAttribute("src", "/images/dog.png");
  });

  it("should cleanup event listener", async () => {
    const user = userEvent.setup();
    const card = renderComponent(defaultProps);

    card.cleanup?.();

    const button = screen.getByRole("button", { name: "button cat" });
    await user.click(button);

    expect(mockOnClick).not.toHaveBeenCalled();
  });
});
