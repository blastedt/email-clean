/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.ts"
  ],
  coverageDirectory: "coverage",
  preset: 'ts-jest',
  testEnvironment: 'node',
};