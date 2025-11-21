import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} */
export default {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  verbose: true,

  roots: ["<rootDir>/src"],

  testMatch: ["**/*.test.ts", "**/*.spec.ts", "**/__tests__/**/*.test.ts"],

  extensionsToTreatAsEsm: [".ts"],
};
