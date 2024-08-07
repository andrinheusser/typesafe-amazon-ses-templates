import { readdirSync, readFileSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";

export async function indexTemplates(templFolder: string) {
  const templates: {
    name: string;
    subject: string;
    html: string;
    text: string;
  }[] = [];
  const directories = readdirSync(templFolder);
  for (const dir of directories) {
    const subject = readFileSync(
      path.join(templFolder, dir, "subject.txt"),
      "utf-8"
    );
    const html = readFileSync(
      path.join(templFolder, dir, "html.html"),
      "utf-8"
    );
    const text = await readFile(
      path.join(templFolder, dir, "text.txt"),
      "utf-8"
    );
    templates.push({
      name: dir,
      subject,
      html,
      text,
    });
  }
  return templates;
}
