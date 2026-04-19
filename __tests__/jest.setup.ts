import "@testing-library/jest-dom";

import { mockCards } from "@tests/__mocks__/cards.mock";

jest.mock("@/constants/cards", () => ({
  __esModule: true,
  default: mockCards,
}));
