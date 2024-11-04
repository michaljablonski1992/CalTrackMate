import { log } from "console";

// ConsoleTest.test.ts
test('simple console log test', () => {
  log("This is a test log.");
  expect(true).toBe(true);
});