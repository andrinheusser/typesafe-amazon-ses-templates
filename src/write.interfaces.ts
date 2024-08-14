import fs from "fs";
import path from "path";
import { InterfaceToWrite } from "./create.ts.interface.from.variables.js";

const eslintDisable =
  "/* eslint-disable */";
const warning = `// This file is auto-generated. Do not modify it manually.`;

export const union = (interfaces: InterfaceToWrite[]) => {
  return `export type AwsSesTemplatedEmail = 
  ${interfaces
    .map((i) => `{\n_templateName: "${i.name}";\n${i.content}\n}`)
    .join(" | ")};`;
};

export const writeInterfaces = (
  interfaces: InterfaceToWrite[],
  templateNameType: string,
  outFile: string
) => {
  const outFolder = path.dirname(outFile);
  if (outFolder && !fs.existsSync(outFolder)) {
    fs.mkdirSync(outFolder);
  }
  fs.writeFileSync(
    outFile,
    [
      eslintDisable,
      warning,
      templateNameType,
      union(interfaces),
      ...interfaces.map((i) => i.code),
    ].join("\n")
  );
};
