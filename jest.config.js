/** @type {import('jest').Config} */

const config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  rootDir: ".",
  roots: ["<rootDir>/__tests__"],
  setupFilesAfterEnv: ["<rootDir>/__tests__/jest.setup.ts"],
  testMatch: ["**/*.test.ts", "**/*.spec.ts"],
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__tests__/__mocks__/style.mock.ts",
    "\\.(png|jpg|jpeg|gif|svg|webp)$":
      "<rootDir>/__tests__/__mocks__/file.mock.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@tests/(.*)$": "<rootDir>/__tests__/$1",
  },
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: "tsconfig.test.json" }],
  },
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/index.ts",
    "!src/types/**/*.ts",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  clearMocks: true,
  restoreMocks: true,
};

export default config;
