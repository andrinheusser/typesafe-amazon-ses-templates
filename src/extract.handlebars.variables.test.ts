import { expect, test } from "vitest";
import { extractHandlebarsVariables } from "./extract.handlebars.variables.js";

test("simple", async () => {
  const template = `Hello {{name}}! {{foo}}`;
  const variables = extractHandlebarsVariables(template);
  expect(variables).toEqual(["foo", "name"]);
});
test("nested", async () => {
  const template = `Hello {{bar.baz}}!`;
  const variables = extractHandlebarsVariables(template);
  expect(variables).toEqual(["bar.baz"]);
});
test("with", async () => {
  const template = `Hello {{#with person}}{{ name }}{{/with}}!`;
  const variables = extractHandlebarsVariables(template);
  expect(variables).toEqual(["person.name"]);
});
