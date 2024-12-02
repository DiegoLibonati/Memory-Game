import "@testing-library/jest-dom";

import fs from "fs";
import path from "path";

import { CARDS_MOCK } from "./constants/constants";

const INITIAL_HTML: string = fs.readFileSync(
  path.resolve(__dirname, "../../index.html"),
  "utf8"
);

export const OFFICIAL_BODY = INITIAL_HTML.match(
  /<body[^>]*>([\s\S]*?)<\/body>/i
)![1];

jest.mock("../constants/data.ts", () => ({
  get cards() {
    return CARDS_MOCK;
  },
}));
