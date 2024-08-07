import fs from "fs";
import path from "path";

export const writeInterfaces = (interfaces: string[], outFile: string) => {
  const outFolder = path.dirname(outFile);
  if (outFolder && !fs.existsSync(outFolder)) {
    fs.mkdirSync(outFolder);
  }
  fs.writeFileSync(outFile, interfaces.join("\n\n"));
};
