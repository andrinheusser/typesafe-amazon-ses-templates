import { createTsInterfaceFromVariables } from "./create.ts.interface.from.variables.js";
import { extractHandlebarsVariables } from "./extract.handlebars.variables.js";
import { indexTemplates } from "./index.templates.js";
import { syncRemoteTemplates } from "./sync.remote.templates.js";
import { writeInterfaces } from "./write.interfaces.js";

interface Options {
  templateFolder: string;
  outFile: string;
  interfacePrefix?: string | undefined;
  interfaceSuffix?: string | undefined;
}

export default async function run(opts: Options) {
  const templates = (await indexTemplates(opts.templateFolder)).map(
    ({ name, subject, html, text }) => {
      console.log(name, subject, html, text);
      const variables = new Set([
        ...extractHandlebarsVariables(subject),
        ...extractHandlebarsVariables(html),
        ...extractHandlebarsVariables(text),
      ]);
      return {
        name,
        subject,
        html,
        text,
        interface: createTsInterfaceFromVariables(name, [...variables], {
          prefix: opts.interfacePrefix ?? "",
          suffix: opts.interfaceSuffix ?? "",
        }),
      };
    }
  );

  await syncRemoteTemplates(templates);
  writeInterfaces(
    templates.map((t) => t.interface),
    opts.outFile
  );
}
