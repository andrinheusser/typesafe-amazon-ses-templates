export function createTsTypeForTemplateNames(
    templateNames: string[],
): string {
    return `export type AwsSesTemplateNames = ${templateNames.map((name) => `"${name}"`).join(" | ")};`;
}