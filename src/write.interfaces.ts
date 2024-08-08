import fs from "fs";
import path from "path";

const warning = `// This file is auto-generated. Do not modify it manually.`;

export const writeInterfaces = (
  interfaces: string[],
  templateNameType: string,
  outFile: string
) => {
  const outFolder = path.dirname(outFile);
  if (outFolder && !fs.existsSync(outFolder)) {
    fs.mkdirSync(outFolder);
  }
  fs.writeFileSync(
    outFile,
    [warning, templateNameType, ...interfaces].join("\n")
  );
};
