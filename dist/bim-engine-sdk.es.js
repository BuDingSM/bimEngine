(function(){"use strict";try{if(typeof document<"u"){var o=document.createElement("style");o.appendChild(document.createTextNode(".bim-engine-wrapper{position:relative;width:100%;height:100%;font-family:sans-serif;color:#333;padding:20px;background-color:#e16969;border-radius:8px;border:1px solid #e0e0e0;box-sizing:border-box}.bim-engine-opt-btn-container{position:absolute;bottom:20px;left:50%;transform:translate(-50%);z-index:100}.toolbar-container{display:flex;align-items:center;max-width:100%;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}.toolbar-container::-webkit-scrollbar{display:none}.opt-btn-group{overflow:hidden;display:flex;align-items:center;flex-shrink:0;background-color:#111111e0;border-radius:4px;padding:4px 8px}.has-divider{margin-right:16px}.opt-btn-wrapper{position:relative}.opt-btn{display:flex;flex-direction:column;align-items:center;justify-content:center;width:50px;min-height:50px;padding:4px;cursor:pointer;color:#ccc;transition:all .2s;border-bottom:2px solid transparent}.opt-btn:hover{background-color:#444;color:#fff}.opt-btn.active{background-color:#ffffff26;color:#fff;border-bottom:2px solid #fff}.opt-btn.disabled{opacity:.5;cursor:not-allowed}.opt-btn-icon{width:32px;height:32px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.opt-btn-icon svg{width:100%;height:100%}.opt-btn-label{font-size:10px;margin-top:2px}.opt-btn-arrow{font-size:8px;position:absolute;top:2px;right:2px;opacity:.6;transition:transform .2s ease}.opt-btn-arrow.rotated{transform:rotate(180deg)}.opt-btn.no-label .opt-btn-arrow{top:2px;right:2px}.opt-btn-dropdown{position:fixed;transform:translate(-50%,-100%);background-color:#111111e0;border-radius:4px;overflow:hidden;box-shadow:0 4px 12px #0000004d;min-width:50px;z-index:9999;display:flex;flex-direction:column}.opt-btn-dropdown-item{display:flex;flex-direction:column;align-items:center;justify-content:center;color:#b3b4b4;cursor:pointer;transition:background .2s;white-space:nowrap;min-width:50px;min-height:50px;padding:4px}.opt-btn-dropdown-item:last-child{border-bottom:none}.opt-btn-dropdown-item:hover{background-color:#444;color:#fff}.opt-btn-dropdown-item .opt-btn-icon.small{width:30px;height:30px;margin-right:0;margin-bottom:4px}.opt-btn-dropdown-item span{font-size:10px}.opt-btn.no-label .opt-btn-icon{width:32px;height:32px}")),document.head.appendChild(o)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
class a {
  container;
  options;
  // 改用 Array 存储 Group，方便控制顺序
  groups = [];
  activeBtnIds = /* @__PURE__ */ new Set();
  btnRefs = /* @__PURE__ */ new Map();
  dropdownElement = null;
  hoverTimeout = null;
  DEFAULT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>';
  constructor(t) {
    const e = typeof t.container == "string" ? document.getElementById(t.container) : t.container;
    if (!e) throw new Error("Container not found");
    this.container = e, this.options = {
      showLabel: !0,
      visibility: {},
      ...t
    }, this.initContainer();
  }
  initContainer() {
    this.container.innerHTML = "";
  }
  /**
   * 添加按钮组
   * @param groupId 组ID
   * @param beforeGroupId 在哪个组之前插入（可选），不传则插入到最后
   */
  addGroup(t, e) {
    if (this.groups.some((n) => n.id === t)) {
      console.warn("Group " + t + " already exists");
      return;
    }
    const i = { id: t, buttons: [] };
    if (e) {
      const n = this.groups.findIndex((s) => s.id === e);
      n !== -1 ? this.groups.splice(n, 0, i) : (console.warn(`Target group ${e} not found, appending ${t} to end.`), this.groups.push(i));
    } else
      this.groups.push(i);
  }
  /**
   * 添加按钮
   * @param config 按钮配置（必须包含 groupId，可选包含 parentId）
   */
  addButton(t) {
    const { groupId: e, parentId: i } = t;
    if (!e)
      throw new Error(`Button ${t.id} config must contain 'groupId'`);
    const n = this.groups.find((o) => o.id === e);
    if (!n)
      throw new Error(`Group ${e} not found. Please call addGroup first.`);
    const s = {
      ...t,
      children: t.children || []
    };
    if (i) {
      const o = this.findButton(n.buttons, i);
      if (!o)
        throw new Error(`Parent button ${i} not found in group ${e}`);
      o.children || (o.children = []), o.children.push(s);
    } else
      n.buttons.push(s);
  }
  findButton(t, e) {
    for (const i of t) {
      if (i.id === e) return i;
      if (i.children) {
        const n = this.findButton(i.children, e);
        if (n) return n;
      }
    }
  }
  async init() {
    const { homeButton: t } = await import("./index-CAJWny5G.mjs"), { locationButton: e } = await import("./index-C12x1apF.mjs"), { walkMenuButton: i } = await import("./index-Wpi9Br9A.mjs"), { walkPersonButton: n } = await import("./index-BXbORK0j.mjs"), { walkBirdButton: s } = await import("./index-Djlk5GIH.mjs"), { settingButton: o } = await import("./index-DsRG5l_h.mjs"), { infoButton: r } = await import("./index-DvZ5eiUH.mjs");
    this.addGroup("group-1"), this.addButton(t), this.addButton(i), this.addButton(n), this.addButton(s), this.addButton(e), this.addGroup("group-2"), this.addButton(o), this.addButton(r), this.render();
  }
  render() {
    this.container.innerHTML = "", this.btnRefs.clear();
    const t = document.createElement("div");
    t.className = "toolbar-container", this.groups.forEach((e, i) => {
      const n = this.renderGroup(e, i, this.groups.length);
      t.appendChild(n);
    }), this.container.appendChild(t);
  }
  renderGroup(t, e, i) {
    const n = document.createElement("div");
    return n.className = "opt-btn-group", e < i - 1 && n.classList.add("has-divider"), t.buttons.forEach((s) => {
      if (this.isVisible(s.id)) {
        const o = this.renderButton(s);
        n.appendChild(o);
      }
    }), n;
  }
  renderButton(t) {
    const e = document.createElement("div");
    e.className = "opt-btn-wrapper";
    const i = document.createElement("div");
    i.className = "opt-btn", this.activeBtnIds.has(t.id) && i.classList.add("active"), t.disabled && i.classList.add("disabled"), this.options.showLabel || (i.classList.add("no-label"), t.label && (i.title = t.label));
    const n = document.createElement("div");
    if (n.className = "opt-btn-icon", n.innerHTML = this.getIcon(t.icon), i.appendChild(n), this.options.showLabel && t.label) {
      const s = document.createElement("span");
      s.className = "opt-btn-label", s.textContent = t.label, i.appendChild(s);
    }
    if (t.children && t.children.length > 0) {
      const s = document.createElement("span");
      s.className = "opt-btn-arrow", s.textContent = "▼", i.appendChild(s);
    }
    return i.addEventListener("click", () => this.handleClick(t)), i.addEventListener("mouseenter", () => this.handleMouseEnter(t, i)), i.addEventListener("mouseleave", () => this.handleMouseLeave()), this.btnRefs.set(t.id, i), e.appendChild(i), e;
  }
  handleClick(t) {
    t.disabled || (!t.children || t.children.length === 0) && (t.keepActive && (this.activeBtnIds.has(t.id) ? this.activeBtnIds.delete(t.id) : this.activeBtnIds.add(t.id), this.updateButtonState(t.id)), this.closeDropdown(), t.onClick && t.onClick(t));
  }
  handleSubClick(t) {
    t.keepActive && (this.activeBtnIds.has(t.id) ? this.activeBtnIds.delete(t.id) : this.activeBtnIds.add(t.id), this.updateButtonState(t.id)), this.closeDropdown(), t.onClick && t.onClick(t);
  }
  handleMouseEnter(t, e) {
    if (this.hoverTimeout && (clearTimeout(this.hoverTimeout), this.hoverTimeout = null), t.children && t.children.length > 0) {
      this.showDropdown(t, e);
      const i = e.querySelector(".opt-btn-arrow");
      i && i.classList.add("rotated");
    } else
      this.closeDropdown();
  }
  handleMouseLeave() {
    this.hoverTimeout = window.setTimeout(() => {
      this.closeDropdown();
    }, 200);
  }
  showDropdown(t, e) {
    if (this.closeDropdown(), !t.children) return;
    const i = document.createElement("div");
    i.className = "opt-btn-dropdown";
    const n = e.getBoundingClientRect(), s = n.left + n.width / 2;
    i.style.top = n.top - 8 + "px", i.style.left = s + "px", t.children.forEach((o) => {
      if (this.isVisible(o.id)) {
        const r = this.renderDropdownItem(o);
        i.appendChild(r);
      }
    }), i.addEventListener("mouseenter", () => {
      this.hoverTimeout && (clearTimeout(this.hoverTimeout), this.hoverTimeout = null);
    }), i.addEventListener("mouseleave", () => this.handleMouseLeave()), document.body.appendChild(i), this.dropdownElement = i;
  }
  renderDropdownItem(t) {
    const e = document.createElement("div");
    e.className = "opt-btn-dropdown-item";
    const i = document.createElement("div");
    if (i.className = "opt-btn-icon small", i.innerHTML = this.getIcon(t.icon), e.appendChild(i), this.options.showLabel) {
      const n = document.createElement("span");
      n.textContent = t.label, e.appendChild(n);
    }
    return e.addEventListener("click", (n) => {
      n.stopPropagation(), this.handleSubClick(t);
    }), e;
  }
  closeDropdown() {
    this.dropdownElement && (this.dropdownElement.remove(), this.dropdownElement = null), this.btnRefs.forEach((t) => {
      const e = t.querySelector(".opt-btn-arrow");
      e && e.classList.remove("rotated");
    });
  }
  updateButtonState(t) {
    const e = this.btnRefs.get(t);
    e && (this.activeBtnIds.has(t) ? e.classList.add("active") : e.classList.remove("active"));
  }
  getIcon(t) {
    return t || this.DEFAULT_ICON;
  }
  isVisible(t) {
    return this.options.visibility?.[t] !== !1;
  }
  destroy() {
    this.closeDropdown(), this.hoverTimeout && clearTimeout(this.hoverTimeout), this.container.innerHTML = "", this.btnRefs.clear(), this.activeBtnIds.clear(), this.groups = [];
  }
}
class c {
  container;
  optBtnGroups = null;
  constructor(t) {
    const e = typeof t == "string" ? document.getElementById(t) : t;
    if (!e) throw new Error("Container not found");
    this.container = e, this.init();
  }
  init() {
    this.container.innerHTML = "";
    const t = document.createElement("div");
    t.className = "bim-engine-wrapper";
    const e = document.createElement("h1");
    e.textContent = "BimEngine", e.className = "bim-engine-title";
    const i = document.createElement("p");
    i.textContent = "这是一个使用BIM-ENGINE。", i.className = "bim-engine-desc";
    const n = document.createElement("div");
    n.id = "opt-btn-groups", n.className = "bim-engine-opt-btn-container", t.appendChild(e), t.appendChild(i), t.appendChild(n), this.container.appendChild(t), this.initOptBtnGroups(n);
  }
  initOptBtnGroups(t) {
    this.optBtnGroups = new a({
      container: t,
      showLabel: !0
    }), this.optBtnGroups.init().catch((e) => {
      console.error("Failed to initialize OptBtnGroups:", e);
    });
  }
  destroy() {
    this.optBtnGroups && (this.optBtnGroups.destroy(), this.optBtnGroups = null), this.container.innerHTML = "";
  }
}
export {
  c as BimEngine,
  a as OptBtnGroups
};
//# sourceMappingURL=bim-engine-sdk.es.js.map
