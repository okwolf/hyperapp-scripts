module.exports = ({ types: t }) => ({
  name: "inject-hyperapp-html-import",
  visitor: {
    Program(path) {
      path.unshiftContainer(
        "body",
        t.importDeclaration(
          [
            t.importSpecifier(
              t.identifier("__hyperapp_html"),
              t.identifier("__hyperapp_html")
            )
          ],
          t.stringLiteral("hyperapp-scripts")
        )
      );
    }
  }
});
