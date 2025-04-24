import type { Config } from 'jest';
import nextJest from 'next/jest.js';



const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
  testMatch: [
    '**/__test__/**/*.[jt]s?(x)' // Match files in __test__ directory
  ]
};

export default createJestConfig(config);
