class e {
  container;
  constructor(n) {
    const i = typeof n == "string" ? document.getElementById(n) : n;
    if (!i) throw new Error("Container not found");
    this.container = i, this.init();
  }
  init() {
    this.container.innerHTML = `
            <div style="font-family: sans-serif; color: #333;">
                <h1>BimEngine</h1>
                <p>这是一个纯 TypeScript 组件入口。</p>
            </div>
        `;
  }
}
export {
  e as BimEngine
};
//# sourceMappingURL=bim-engine-sdk.es.js.map
