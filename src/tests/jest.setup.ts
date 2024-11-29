import "@testing-library/jest-dom";
import { CARDS_MOCK } from "./constants/constants";

jest.mock("../constants/data.ts", () => ({
  get cards() {
    return CARDS_MOCK;
  },
}));
