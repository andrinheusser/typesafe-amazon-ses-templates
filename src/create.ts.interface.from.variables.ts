//type Obj = Record<string, Record<string, unknown> | null>;
type Obj = {
  [key: string]: Obj | null;
};
export function createTsInterfaceFromVariables(
  name: string,
  variables: string[],
  { prefix, suffix }: { prefix: string; suffix: string }
) {
  const varObj = variablesToObject(variables);

  return `
export interface ${prefix}${name}${suffix} {\n${writeLevel(varObj)}\n}`;
}

export function writeLevel(obj: Obj, indent = 1) {
  return Object.keys(obj)
    .map((key): string => {
      const value = obj[key];

      const tabs = `\t`.repeat(indent);

      if (value === null) {
        return `${tabs}${key}: string;`;
      }

      if (value === undefined) {
        throw new Error("value is undefined");
      }

      return `${tabs}${key}: {\n${writeLevel(value, indent + 1)}\n\t};`;
    })
    .join("\n");
}

export function variablesToObject(variables: string[]) {
  const obj: Obj = {};
  for (const variable of variables) {
    const parts = variable.split(".");

    let current = obj;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i] as string;
      if (!current[part]) {
        current[part] = i === parts.length - 1 ? null : {};
      }
      current = current[part] as Obj;
    }
  }
  return obj;
}
