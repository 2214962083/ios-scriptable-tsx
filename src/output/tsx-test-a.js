const MODULE = module
// src/input/tsx-test.tsx
class MyWidget {
  constructor(arg = '') {
    this.arg = arg
    this.widgetSize = config.widgetFamily
  }
  async render() {
    return /* @__PURE__ */ React.createElement(
      WBox,
      {
        padding: [1, 2, 3, 4],
        spacing: 66,
      },
      /* @__PURE__ */ React.createElement(WStack, null),
    )
  }
}
new MyWidget()
