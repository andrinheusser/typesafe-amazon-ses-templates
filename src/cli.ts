#!/usr/bin/env node
import { Command } from "commander";
import {
  emailTemplateInterfacePrefix,
  emailTemplateInterfaceSuffix,
} from "./config.js";
import run from "./index.js";

const program = new Command();

program
  .version("0.0.3")
  .description(
    "A CLI tool for managing AWS SES email templates and generating TypeScript interfaces for them."
  );

program
  .option(
    "-t, --template-folder <folder>",
    "The folder containing the email templates"
  )
  .option(
    "-f, --out-file <file>",
    "The name of the TypeScript file to write the interfaces to",
    "./email.templates.ts"
  )
  .option(
    "-p, --interface-prefix <prefix>",
    "The prefix to use for the TypeScript interfaces",
    emailTemplateInterfacePrefix
  )
  .option(
    "-s, --interface-suffix <suffix>",
    "The suffix to use for the TypeScript interfaces",
    emailTemplateInterfaceSuffix
  );

program.parse(process.argv);

const options = program.opts();

run({
  outFile: options["outFile"],
  templateFolder: options["templateFolder"],
  interfacePrefix: options["interfacePrefix"],
  interfaceSuffix: options["interfaceSuffix"],
});
