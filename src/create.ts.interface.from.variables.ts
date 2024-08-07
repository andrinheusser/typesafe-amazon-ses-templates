export function createTsInterfaceFromVariables(
  name: string,
  variables: string[],
  { prefix, suffix }: { prefix: string; suffix: string }
) {
  return `
export interface ${prefix}${name}${suffix} {\n${variables
    .map((v) => `\t${v}: string;`)
    .join("\n")}\n}`;
}
