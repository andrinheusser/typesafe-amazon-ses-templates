import { expect, test } from "vitest";
import { createTsTypeForTemplateNames } from "./create.ts.type.for.template.names";

test("simple", () => {
  const names = ["signup", "forgotPassword"];

  const tsType = createTsTypeForTemplateNames(names);
  
  expect(tsType).toStrictEqual(`export type AwsSesTemplateNames = "signup" | "forgotPassword";`);
});
