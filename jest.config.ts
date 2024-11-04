import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// prevent connecting to real API
process.env.CONVEX_URL = 'https://test-url.convex.cloud';

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  verbose: true,
  silent: false,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1', // Map @/ to the root directory
  },
  testMatch: [
    "**/__tests__/**/*.test.[jt]s?(x)",  // Match .test.js, .test.ts, and .test.tsx files in __tests__ folders
    "**/?(*.)+(test).[jt]s?(x)",         // Match files with .test.js, .test.ts, and .test.tsx anywhere in the project
  ],
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)