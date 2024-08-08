import { expect, test } from "vitest";
import {
  createTsInterfaceFromVariables,
  variablesToObject,
} from "./create.ts.interface.from.variables";

test("simple", () => {
  const variables = ["name", "age"];
  const code = createTsInterfaceFromVariables("Person", variables, {
    prefix: "SES",
    suffix: "Template",
  });
  expect(code).toStrictEqual(`
export interface SESPersonTemplate {\n\tname: string;\n\tage: string;\n}`);
});

test("nested", () => {
  const variables = [
    "person.firstName",
    "person.lastName",
    "foo",
    "foo",
    "person.firstName",
  ];
  const code = createTsInterfaceFromVariables("Person", variables, {
    prefix: "SES",
    suffix: "Template",
  });
  expect(code).toStrictEqual(`
export interface SESPersonTemplate {\n\tperson: {\n\t\tfirstName: string;\n\t\tlastName: string;\n\t};\n\tfoo: string;\n}`);
});

test("vartoObj", () => {
  const variables = [
    "person.firstName",
    "person.firstName",
    "person.lastName",
    "foo",
    "foo.bar.baz.qux",
    "bar",
  ];
  const obj = variablesToObject(variables);
  expect(obj).toStrictEqual({
    person: {
      firstName: null,
      lastName: null,
    },
    foo: {
      bar: {
        baz: {
          qux: null,
        },
      },
    },
    bar: null,
  });
});
