import { readdirSync, statSync } from "fs";
import { readFile } from "fs/promises";
import path from "path";

const getTemplates = async (folder: string) => {
  const [subject, html, text] = await Promise.all([
    readFile(path.join(folder, "subject.txt"), "utf-8"),
    readFile(path.join(folder, "html.html"), "utf-8"),
    readFile(path.join(folder, "text.txt"), "utf-8"),
  ]);
  return { subject, html, text };
};

export async function indexTemplates(templFolder: string): Promise<
  {
    name: string;
    subject: string;
    html: string;
    text: string;
  }[]
> {
  const directories = readdirSync(templFolder).filter((dir) =>
    statSync(path.join(templFolder, dir)).isDirectory()
  );

  return Promise.all(
    directories.map(async (dir) => {
      return {
        name: dir,
        ...(await getTemplates(path.join(templFolder, dir))),
      };
    })
  );
}
