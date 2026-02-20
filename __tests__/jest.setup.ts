import "@testing-library/jest-dom";

import { mockAssets } from "@tests/__mocks__/assets.mock";
import { mockCards } from "@tests/__mocks__/cards.mock";

jest.mock("@/assets/export", () => ({
  __esModule: true,
  default: mockAssets,
}));

jest.mock("@/constants/cards", () => ({
  __esModule: true,
  default: mockCards,
}));
