const nodePath = require("path");
const {
  default: { ast }
} = require("@babel/template");

const HYPERAPP_HMR_PATCH = `if (node.__$$CLEANUP) {
  init = node.__$$CLEANUP();
}
node.__$$CLEANUP = () => {
  const returnState = state;
  dispatch();
  node = vdom = subs = view = null;
  return returnState;
};`;

const MODULE_ACCEPT = `if (module.hot) {
  module.hot.accept();
}`;

module.exports = ({ types: t }) => ({
  name: "hyperapp-hmr",
  visitor: {
    VariableDeclarator(path, state) {
      const filePath = nodePath.parse(state.filename);
      if (
        path.node.id.name === "app" &&
        filePath.dir.endsWith(`node_modules${nodePath.sep}hyperapp`)
      ) {
        path.get("init.body").unshiftContainer("body", ast(HYPERAPP_HMR_PATCH));
      }
    },
    CallExpression(path) {
      if (path.node.callee.name === "app") {
        const program = path.findParent(path => path.isProgram());
        for (const bodyNode of program.node.body) {
          if (
            t.isImportDeclaration(bodyNode) &&
            bodyNode.source.value === "hyperapp"
          ) {
            for (const specifier of bodyNode.specifiers) {
              if (
                t.isImportSpecifier(specifier) &&
                specifier.imported.name === "app"
              ) {
                program.pushContainer("body", ast(MODULE_ACCEPT));
              }
            }
          }
        }
      }
    }
  }
});
