import Handlebars from "handlebars";
export function extractHandlebarsVariables(template: string) {
  const ast = Handlebars.parse(template);
  return extractFromBody(ast.body);
}

function isMustacheStatement(
  node: hbs.AST.Statement
): node is hbs.AST.MustacheStatement {
  return node.type === "MustacheStatement";
}
function isBlockStatement(
  node: hbs.AST.Statement
): node is hbs.AST.BlockStatement {
  return node.type === "BlockStatement";
}
function isPathExpression(
  node: hbs.AST.Expression
): node is hbs.AST.PathExpression {
  return node.type === "PathExpression";
}

function extractFromBody(
  //nodes: { type: string; path?: { original: string } }[],
  nodes: hbs.AST.Statement[],
  prefix = ""
) {
  const variables: string[] = [];
  const join = (name: string) =>
    prefix.length > 0 ? `${prefix}.${name}` : name;
  for (const node of nodes) {
    if (isMustacheStatement(node)) {
      if (isPathExpression(node.path)) {
        variables.push(join(node.path.original));
      }
    } else if (isBlockStatement(node)) {
      console.log(JSON.stringify(node, undefined, 2));
      const what = node.params[0];
      if (what && isPathExpression(what)) {
        console.log(what.original);
        variables.push(
          ...extractFromBody(node.program.body, join(what.original))
        );
      }
    }
  }
  return [...new Set(variables)].sort();
}
