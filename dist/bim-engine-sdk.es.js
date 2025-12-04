(function(){"use strict";try{if(typeof document<"u"){var o=document.createElement("style");o.appendChild(document.createTextNode('.bim-engine-wrapper{position:relative;width:100%;height:100%;font-family:sans-serif;color:#333;padding:20px;background-color:#e16969;border-radius:8px;border:1px solid #e0e0e0;box-sizing:border-box}.bim-engine-opt-btn-container{position:absolute;bottom:20px;left:50%;transform:translate(-50%);z-index:100}.bim-btn-group-root{display:flex;gap:8px;z-index:1000;position:absolute;pointer-events:auto}.bim-btn-group-root.static{position:relative;inset:auto;transform:none}.bim-btn-group-root.dir-row{flex-direction:row;align-items:center}.bim-btn-group-root.dir-column{flex-direction:column;align-items:stretch}.bim-btn-group-section{display:flex;gap:4px;background-color:var(--bim-btn-group-section-bg, rgba(17, 17, 17, .88));border-radius:6px;padding:4px}.bim-btn-group-root.dir-row .bim-btn-group-section{flex-direction:row;align-items:center}.bim-btn-group-root.dir-column .bim-btn-group-section{flex-direction:column}.opt-btn-wrapper{position:relative}.opt-btn{display:flex;cursor:pointer;border-radius:4px;transition:background-color .2s,color .2s;color:var(--bim-btn-text-color, #ccc);background-color:var(--bim-btn-bg, transparent);padding:6px;align-items:center;position:relative;justify-content:center}.opt-btn:hover{background-color:var(--bim-btn-hover-bg, #444)}.opt-btn.active{background-color:var(--bim-btn-active-bg, rgba(255, 255, 255, .15));color:var(--bim-btn-text-active-color, #fff)}.opt-btn.active .opt-btn-icon{color:var(--bim-icon-active-color, #fff)}.opt-btn.disabled{opacity:.5;cursor:not-allowed}.opt-btn-icon{width:var(--bim-icon-size, 24px);height:var(--bim-icon-size, 24px);display:flex;align-items:center;justify-content:center;color:var(--bim-icon-color, #ccc);flex-shrink:0}.opt-btn-icon svg{width:100%;height:100%;fill:currentColor}.opt-btn-arrow{font-size:10px;opacity:.6;transition:transform .2s;display:inline-block;margin-left:4px}.opt-btn-arrow.rotated{transform:rotate(180deg)}.opt-btn-text-wrapper{display:flex;align-items:center;justify-content:center;pointer-events:none}.opt-btn-label{display:inline}.opt-btn.no-label .opt-btn-label{display:none}.opt-btn.align-vertical:not(.no-label){flex-direction:column;text-align:center}.opt-btn.align-vertical:not(.no-label) .opt-btn-text-wrapper{margin-top:4px}.opt-btn.align-vertical:not(.no-label) .opt-btn-label{font-size:12px;line-height:1.2}.opt-btn.align-horizontal:not(.no-label){flex-direction:row}.opt-btn.align-horizontal:not(.no-label) .opt-btn-text-wrapper{margin-left:8px}.opt-btn.align-horizontal:not(.no-label) .opt-btn-label{font-size:14px}.opt-btn.no-label .opt-btn-text-wrapper{width:0;height:0;margin:0;padding:0;overflow:visible;position:absolute;top:0;right:0}.opt-btn.no-label .opt-btn-arrow{position:absolute;top:2px;right:2px;margin:0;font-size:8px}.opt-btn-dropdown{position:absolute;background-color:var(--bim-toolbar-bg, rgba(17, 17, 17, .95));border-radius:4px;padding:4px;box-shadow:0 4px 12px #0003;z-index:1001;display:flex;flex-direction:column;border:1px solid rgba(255,255,255,.1);opacity:0;visibility:hidden;transform:translateY(-10px);transition:opacity .2s ease,transform .2s cubic-bezier(.2,0,.2,1),visibility .2s}@keyframes dropdown-fade-in{0%{opacity:0;transform:translateY(-8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}.opt-btn-dropdown{animation:dropdown-fade-in .2s cubic-bezier(.2,0,.2,1) forwards;opacity:1;visibility:visible;transform:none}.opt-btn-dropdown-item{display:flex;align-items:center;padding:8px 12px;cursor:pointer;border-radius:4px;color:var(--bim-btn-text-color, #ccc);transition:background .2s;box-sizing:border-box}.opt-btn-dropdown-item:hover{background-color:var(--bim-btn-hover-bg, #444);color:#fff}.opt-btn-dropdown-item.align-horizontal{flex-direction:row}.opt-btn-dropdown-item.align-horizontal .opt-btn-icon{width:18px;height:18px;margin-right:8px}.opt-btn-dropdown-item.align-vertical{flex-direction:column;text-align:center}.opt-btn-dropdown-item.align-vertical .opt-btn-icon{width:24px;height:24px;margin-bottom:4px}.opt-btn-dropdown-item.align-vertical .opt-btn-dropdown-label{font-size:12px}.bim-btn-group-root.is-bottom-toolbar .opt-btn-icon{width:32px;height:32px}.bim-btn-group-root.is-bottom-toolbar .opt-btn{padding:8px}:root{--bim-dialog-bg: rgba(17, 17, 17, .95);--bim-dialog-header-bg: #2a2a2a;--bim-dialog-title-color: #fff;--bim-dialog-text-color: #ccc;--bim-dialog-border-color: #444}.bim-dialog{position:absolute;background-color:var(--bim-dialog-bg);border:1px solid var(--bim-dialog-border-color);border-radius:6px;box-shadow:0 4px 12px #0000004d;display:flex;flex-direction:column;z-index:1000;color:var(--bim-dialog-title-color);overflow:hidden;min-width:200px;min-height:100px}.bim-dialog-header{height:32px;background-color:var(--bim-dialog-header-bg);display:flex;align-items:center;justify-content:space-between;padding:0 10px;cursor:default;-webkit-user-select:none;user-select:none;border-bottom:1px solid var(--bim-dialog-border-color);flex-shrink:0}.bim-dialog-header.draggable{cursor:move}.bim-dialog-title{font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--bim-dialog-title-color)}.bim-dialog-close{cursor:pointer;font-size:18px;color:#999;line-height:1;margin-left:8px}.bim-dialog-close:hover{color:#fff}.bim-dialog-content{flex:1;padding:10px;overflow:auto;font-size:14px;color:var(--bim-dialog-text-color)}.bim-dialog-resize-handle{position:absolute;width:10px;height:10px;bottom:0;right:0;cursor:se-resize;z-index:10}.bim-dialog-resize-handle:after{content:"";position:absolute;bottom:3px;right:3px;width:6px;height:6px;border-right:2px solid #666;border-bottom:2px solid #666}.bim-dialog-resize-handle:hover:after{border-color:#fff}.bim-info-dialog-content{padding:16px;font-family:sans-serif;color:#333}.bim-info-dialog-content h3{margin-top:0;margin-bottom:12px;border-bottom:1px solid #eee;padding-bottom:8px;color:#0078d4}.bim-info-dialog-content ul{list-style:none;padding:0;margin:0}.bim-info-dialog-content li{margin-bottom:8px;font-size:14px;display:flex}.bim-info-dialog-content li strong{width:80px;color:#555}')),document.head.appendChild(o)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
const w = {
  common: {
    title: "BimEngine",
    description: "这是一个使用 BIM-ENGINE。",
    openTestDialog: "打开测试弹窗",
    openInfoDialog: "打开信息弹窗 (封装版)"
  },
  toolbar: {
    home: "首页",
    info: "信息",
    location: "定位",
    setting: "设置",
    walk: "漫游",
    walkPerson: "人视",
    walkBird: "鸟瞰",
    walkMenu: "菜单"
  },
  dialog: {
    testTitle: "测试弹窗",
    testContent: '<div style="padding: 10px;">这是一个 <b>可拖拽</b> 且 <b>可缩放</b> 的弹窗。<br><br>你可以尝试拖动标题栏，或者拖动右下角改变大小。</div>'
  }
}, L = {
  common: {
    title: "BimEngine",
    description: "This is a BIM-ENGINE demo.",
    openTestDialog: "Open Test Dialog",
    openInfoDialog: "Open Info Dialog (Wrapped)"
  },
  toolbar: {
    home: "Home",
    info: "Info",
    location: "Location",
    setting: "Settings",
    walk: "Walk",
    walkPerson: "Person",
    walkBird: "Bird Eye",
    walkMenu: "Menu"
  },
  dialog: {
    testTitle: "Test Dialog",
    testContent: '<div style="padding: 10px;">This is a <b>draggable</b> and <b>resizable</b> dialog.<br><br>Try dragging the title bar or resizing from the bottom-right corner.</div>'
  }
};
class T {
  currentLocale = "zh-CN";
  messages = {
    "zh-CN": w,
    "en-US": L
  };
  listeners = [];
  constructor() {
  }
  /**
   * 获取当前语言
   */
  getLocale() {
    return this.currentLocale;
  }
  /**
   * 切换语言
   */
  setLocale(t) {
    this.currentLocale !== t && (this.currentLocale = t, this.notifyListeners());
  }
  /**
   * 翻译核心方法
   */
  t(t) {
    if (!t) return "";
    const e = t.split(".");
    let o = this.messages[this.currentLocale];
    for (const i of e)
      if (o && typeof o == "object" && i in o)
        o = o[i];
      else
        return t;
    return o;
  }
  /**
   * 订阅变更
   */
  subscribe(t) {
    return this.listeners.push(t), () => {
      this.listeners = this.listeners.filter((e) => e !== t);
    };
  }
  notifyListeners() {
    this.listeners.forEach((t) => t(this.currentLocale));
  }
}
const p = new T(), b = (c) => p.t(c), g = {
  name: "dark",
  primary: "#0078d4",
  primaryHover: "#0063b1",
  // 修改：背景色统一为浅灰，不再跟随深色模式变黑
  background: "#f5f5f5",
  panelBackground: "rgba(30, 30, 30, 0.9)",
  // 注意：如果背景是浅色，主文字颜色通常需要是深色才能看清
  // 但这里的 textPrimary 主要是用于 UI 组件内部的。
  // 如果 BimEngine wrapper 上的文字直接显示在 background 上，
  // 我们可能需要区分 "UI文字" 和 "页面文字"。
  // 目前架构中：
  // theme.textPrimary 会应用到 wrapper.style.color (BimEngine.ts)
  // 以及 Toolbar/Dialog 的文字颜色。
  // 如果背景是浅灰，而 wrapper 文字设置为白色 (#ffffff)，那就看不清了。
  // 这是一个语义冲突：
  // 1. Panel (Toolbar/Dialog) 是黑底，需要白字。
  // 2. Background (Wrapper) 是白底，需要黑字。
  // 既然您要求背景统一浅灰，那么 Wrapper 上的“直接子文本”应该是深色。
  // 但 Toolbar/Dialog 仍然是深色模式（黑底），它们需要白字。
  // 妥协方案：
  // 保持 textPrimary 为白色（为了适配黑���的 Toolbar/Dialog）。
  // 但是在 BimEngine 中，如果背景强制改为浅色，Wrapper 的默认文字颜色可能需要单独处理，
  // 或者我们可以认为 "Wrapper" 主要是承载 UI 组件的，直接写在 Wrapper 上的文字（标题/描述）
  // 应该有自己的样式，而不是直接继承 theme.textPrimary。
  // 在之前的 BimEngine.ts 中：
  // this.wrapper.style.color = theme.textPrimary;
  // 如果背景变浅灰，这里 textPrimary 还是白色的话，标题就看不见了。
  // 所以，深色模式下：
  // 背景：浅灰
  // 组件：深黑
  // 组件文字：白
  // 页面文字：黑 (问题点)
  // 让我们先按您的要求改背景。通常这种情况下，ThemeConfig 可能需要区分 
  // contentText (页面内容文字) 和 uiText (组件文字)。
  // 但为了不破坏现有结构，我将假定 textPrimary 主要服务于 UI 组件。
  // 为了让 Wrapper 上的标题可见，我们可能需要在 BimEngine 中移除对 wrapper.style.color 的强制设置，
  // 或者在 presets 里把 textPrimary 改回来？不对，改回来 Toolbar 就看不清了。
  // 方案：我将仅修改 background。
  // 至于 Wrapper 上的标题（BimEngine 标题），由于在最新的 BimEngine.ts 中
  // ���们已经移除了 titleEl 和 descEl（在之前的重构中），
  // 所以现在 Wrapper 里主要是 Toolbar 和 Dialog，它们有自己的 panelBackground。
  // 只要 Toolbar/Dialog 内部正常即可。
  textPrimary: "#ffffff",
  textSecondary: "#cccccc",
  border: "#444444",
  icon: "#cccccc",
  iconActive: "#ffffff",
  componentBackground: "transparent",
  componentHover: "#333333",
  componentActive: "rgba(255, 255, 255, 0.1)"
}, x = {
  name: "light",
  primary: "#0078d4",
  primaryHover: "#106ebe",
  // 统一为浅灰
  background: "#f5f5f5",
  panelBackground: "#ffffff",
  textPrimary: "#333333",
  textSecondary: "#666666",
  border: "#e0e0e0",
  icon: "#555555",
  iconActive: "#0078d4",
  componentBackground: "transparent",
  componentHover: "#f0f0f0",
  componentActive: "#e0e0e0"
};
class E {
  currentTheme = g;
  listeners = [];
  constructor() {
  }
  /**
   * 获取当前主题配置
   */
  getTheme() {
    return this.currentTheme;
  }
  /**
   * 切换预设主题
   * @param themeName 'dark' | 'light'
   */
  setTheme(t) {
    t === "light" ? this.applyTheme(x) : this.applyTheme(g);
  }
  /**
   * 应用自定义主题配置
   * @param theme 配置对象
   */
  setCustomTheme(t) {
    this.applyTheme(t);
  }
  /**
   * 内部应用主题逻辑
   */
  applyTheme(t) {
    this.currentTheme = t, this.notifyListeners();
  }
  /**
   * 订阅主题变更
   */
  subscribe(t) {
    return this.listeners.push(t), t(this.currentTheme), () => {
      this.listeners = this.listeners.filter((e) => e !== t);
    };
  }
  notifyListeners() {
    this.listeners.forEach((t) => t(this.currentTheme));
  }
}
const d = new E();
class v {
  container;
  options;
  groups = [];
  activeBtnIds = /* @__PURE__ */ new Set();
  btnRefs = /* @__PURE__ */ new Map();
  dropdownElement = null;
  hoverTimeout = null;
  customColors = /* @__PURE__ */ new Set();
  // 记录用户自定义的颜色属性
  unsubscribeLocale = null;
  unsubscribeTheme = null;
  DEFAULT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>';
  constructor(t) {
    const e = typeof t.container == "string" ? document.getElementById(t.container) : t.container;
    if (!e) throw new Error("Container not found");
    this.container = e, this.options = {
      showLabel: !0,
      visibility: {},
      direction: "row",
      // 默认横向
      position: "static",
      // 默认静态定位
      align: "vertical",
      // 默认图标在上
      expand: "down",
      // 默认向下展开
      ...t
    }, [
      "backgroundColor",
      "btnBackgroundColor",
      "btnHoverColor",
      "btnActiveColor",
      "iconColor",
      "iconActiveColor",
      "textColor",
      "textActiveColor"
    ].forEach((i) => {
      t[i] && this.customColors.add(i);
    }), this.initContainer(), this.applyStyles();
  }
  initContainer() {
    this.container.innerHTML = "", this.container.classList.add("bim-btn-group-root"), this.options.direction === "column" ? this.container.classList.add("dir-column") : this.container.classList.add("dir-row"), this.options.className && this.container.classList.add(this.options.className), this.updatePosition();
  }
  updatePosition() {
    const t = this.options.position, e = this.container.style;
    if (e.top = "", e.bottom = "", e.left = "", e.right = "", e.transform = "", t === "static") {
      this.container.classList.add("static");
      return;
    }
    if (this.container.classList.remove("static"), this.container.style.position = "absolute", typeof t == "object" && "x" in t)
      e.left = `${t.x}px`, e.top = `${t.y}px`;
    else {
      const o = "20px";
      switch (t) {
        case "top-left":
          e.top = o, e.left = o;
          break;
        case "top-center":
          e.top = o, e.left = "50%", e.transform = "translateX(-50%)";
          break;
        case "top-right":
          e.top = o, e.right = o;
          break;
        case "bottom-left":
          e.bottom = o, e.left = o;
          break;
        case "bottom-center":
          e.bottom = o, e.left = "50%", e.transform = "translateX(-50%)";
          break;
        case "bottom-right":
          e.bottom = o, e.right = o;
          break;
        case "left-center":
          e.left = o, e.top = "50%", e.transform = "translateY(-50%)";
          break;
        case "right-center":
          e.right = o, e.top = "50%", e.transform = "translateY(-50%)";
          break;
        case "center":
          e.top = "50%", e.left = "50%", e.transform = "translate(-50%, -50%)";
          break;
      }
    }
  }
  /**
   * 应用样式到容器
   */
  applyStyles() {
    const t = this.container.style;
    this.options.backgroundColor && t.setProperty("--bim-btn-group-section-bg", this.options.backgroundColor), this.options.btnBackgroundColor && t.setProperty("--bim-btn-bg", this.options.btnBackgroundColor), this.options.btnHoverColor && t.setProperty("--bim-btn-hover-bg", this.options.btnHoverColor), this.options.btnActiveColor && t.setProperty("--bim-btn-active-bg", this.options.btnActiveColor), this.options.iconColor && t.setProperty("--bim-icon-color", this.options.iconColor), this.options.iconActiveColor && t.setProperty("--bim-icon-active-color", this.options.iconActiveColor), this.options.textColor && t.setProperty("--bim-btn-text-color", this.options.textColor), this.options.textActiveColor && t.setProperty("--bim-btn-text-active-color", this.options.textActiveColor);
  }
  /**
   * 设置主题颜色
   * 只会应用到没有被用户自定义的颜色属性上
   */
  setTheme(t) {
    const e = {
      backgroundColor: t.panelBackground,
      btnBackgroundColor: t.componentBackground,
      btnHoverColor: t.componentHover,
      btnActiveColor: t.componentActive,
      iconColor: t.icon,
      iconActiveColor: t.iconActive,
      textColor: t.textSecondary,
      textActiveColor: t.textPrimary
    };
    Object.entries(e).forEach(([o, i]) => {
      const s = o;
      this.customColors.has(s) || (this.options[s] = i);
    }), this.applyStyles();
  }
  /**
   * 直接设置颜色（强制覆盖）
   * 设置的颜色会被标记为自定义，后续的 setTheme 不会覆盖它们
   */
  setColors(t) {
    this.options = { ...this.options, ...t }, Object.keys(t).forEach((e) => {
      this.customColors.add(e);
    }), this.applyStyles();
  }
  async init() {
    this.render(), this.unsubscribeLocale = p.subscribe(() => {
      this.setLocales();
    }), this.unsubscribeTheme = d.subscribe((t) => {
      this.setTheme(t);
    });
  }
  setLocales() {
    this.render();
  }
  addGroup(t, e) {
    if (this.groups.some((i) => i.id === t)) return;
    const o = { id: t, buttons: [] };
    if (e) {
      const i = this.groups.findIndex((s) => s.id === e);
      i !== -1 ? this.groups.splice(i, 0, o) : this.groups.push(o);
    } else
      this.groups.push(o);
  }
  addButton(t) {
    const { groupId: e, parentId: o } = t, i = this.groups.find((n) => n.id === e);
    if (!i) return;
    const s = { ...t, children: t.children || [] };
    if (o) {
      const n = this.findButton(i.buttons, o);
      n && (n.children || (n.children = []), n.children.push(s));
    } else
      i.buttons.push(s);
  }
  findButton(t, e) {
    for (const o of t) {
      if (o.id === e) return o;
      if (o.children) {
        const i = this.findButton(o.children, e);
        if (i) return i;
      }
    }
  }
  render() {
    this.container.innerHTML = "", this.btnRefs.clear(), this.groups.forEach((t, e) => {
      const o = this.renderGroup(t, e, this.groups.length);
      this.container.appendChild(o);
    });
  }
  renderGroup(t, e, o) {
    const i = document.createElement("div");
    return i.className = "bim-btn-group-section", e < o - 1 && i.classList.add("has-divider"), t.buttons.forEach((s) => {
      if (this.isVisible(s.id)) {
        const n = this.renderButton(s);
        i.appendChild(n);
      }
    }), i;
  }
  renderButton(t) {
    const e = document.createElement("div");
    e.className = "opt-btn-wrapper";
    const o = document.createElement("div");
    o.className = "opt-btn", (t.align || this.options.align || "vertical") === "horizontal" ? o.classList.add("align-horizontal") : o.classList.add("align-vertical"), this.activeBtnIds.has(t.id) && o.classList.add("active"), t.disabled && o.classList.add("disabled"), this.options.showLabel && t.label || o.classList.add("no-label");
    const n = t.iconSize || 32, r = t.minWidth || 50;
    o.style.minWidth = `${r}px`;
    const a = document.createElement("div");
    a.className = "opt-btn-icon", a.style.width = `${n}px`, a.style.height = `${n}px`, a.innerHTML = this.getIcon(t.icon), o.appendChild(a);
    const l = document.createElement("div");
    if (l.className = "opt-btn-text-wrapper", this.options.showLabel && t.label) {
      const h = document.createElement("span");
      h.className = "opt-btn-label", h.textContent = b(t.label), l.appendChild(h);
    }
    if (t.children && t.children.length > 0) {
      const h = document.createElement("span");
      h.className = "opt-btn-arrow", h.textContent = "▼", l.appendChild(h);
    }
    return l.hasChildNodes() && o.appendChild(l), o.addEventListener("click", () => this.handleClick(t)), o.addEventListener("mouseenter", () => this.handleMouseEnter(t, o)), o.addEventListener("mouseleave", () => this.handleMouseLeave()), this.btnRefs.set(t.id, o), e.appendChild(o), e;
  }
  handleClick(t) {
    t.disabled || (!t.children || t.children.length === 0) && (t.keepActive && (this.activeBtnIds.has(t.id) ? this.activeBtnIds.delete(t.id) : this.activeBtnIds.add(t.id), this.updateButtonState(t.id)), this.closeDropdown(), t.onClick && t.onClick(t));
  }
  handleMouseEnter(t, e) {
    this.hoverTimeout && clearTimeout(this.hoverTimeout), t.children && t.children.length > 0 ? this.showDropdown(t, e) : this.closeDropdown();
  }
  handleMouseLeave() {
    this.hoverTimeout = window.setTimeout(() => this.closeDropdown(), 200);
  }
  showDropdown(t, e) {
    if (this.closeDropdown(), !t.children) return;
    const o = document.createElement("div");
    o.className = "opt-btn-dropdown", this.options.backgroundColor && o.style.setProperty("--bim-toolbar-bg", this.options.backgroundColor);
    const i = e.getBoundingClientRect(), s = this.options.expand || "down";
    this.options.direction === "row" ? o.style.flexDirection = "column" : o.style.flexDirection = "row", document.body.appendChild(o), t.children.forEach((r) => {
      if (this.isVisible(r.id)) {
        const a = this.renderDropdownItem(r);
        o.appendChild(a);
      }
    });
    const n = o.getBoundingClientRect();
    s === "up" ? (o.style.bottom = window.innerHeight - i.top + 8 + "px", o.style.left = i.left + (i.width - n.width) / 2 + "px") : s === "down" ? (o.style.top = i.bottom + 8 + "px", o.style.left = i.left + (i.width - n.width) / 2 + "px") : s === "right" ? (o.style.top = i.top + (i.height - n.height) / 2 + "px", o.style.left = i.right + 8 + "px") : s === "left" && (o.style.top = i.top + (i.height - n.height) / 2 + "px", o.style.right = window.innerWidth - i.left + 8 + "px"), o.addEventListener("mouseenter", () => {
      this.hoverTimeout && clearTimeout(this.hoverTimeout);
    }), o.addEventListener("mouseleave", () => this.handleMouseLeave()), this.dropdownElement = o;
  }
  renderDropdownItem(t) {
    const e = document.createElement("div");
    e.className = "opt-btn-dropdown-item", (t.align || "horizontal") === "horizontal" ? e.classList.add("align-horizontal") : e.classList.add("align-vertical");
    const i = t.iconSize || 32, s = t.minWidth;
    s && (e.style.minWidth = `${s}px`);
    const n = document.createElement("div");
    if (n.className = "opt-btn-icon", n.style.width = `${i}px`, n.style.height = `${i}px`, n.innerHTML = this.getIcon(t.icon), e.appendChild(n), this.options.showLabel && t.label) {
      const r = document.createElement("span");
      r.className = "opt-btn-dropdown-label", r.textContent = b(t.label), e.appendChild(r);
    }
    return e.addEventListener("click", (r) => {
      r.stopPropagation(), this.handleClick(t);
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
  updateButtonVisibility(t, e) {
    this.options.visibility || (this.options.visibility = {}), this.options.visibility[t] = e, this.render();
  }
  setShowLabel(t) {
    this.options.showLabel = t, this.updateLabelsVisibility();
  }
  updateLabelsVisibility() {
    this.btnRefs.forEach((t, e) => {
      const o = this.findButtonById(e);
      if (!o) return;
      this.options.showLabel && o.label ? t.classList.remove("no-label") : t.classList.add("no-label");
    });
  }
  findButtonById(t) {
    for (const e of this.groups) {
      const o = this.findButton(e.buttons, t);
      if (o) return o;
    }
  }
  setBackgroundColor(t) {
    this.setColors({ backgroundColor: t });
  }
  isVisible(t) {
    return this.options.visibility?.[t] !== !1;
  }
  destroy() {
    this.unsubscribeLocale && (this.unsubscribeLocale(), this.unsubscribeLocale = null), this.unsubscribeTheme && (this.unsubscribeTheme(), this.unsubscribeTheme = null), this.closeDropdown(), this.container.innerHTML = "", this.btnRefs.clear();
  }
}
class B extends v {
  /**
   * 重写初始化，加载默认按钮
   */
  async init() {
    await super.init();
    const { homeButton: t } = await import("./index-CAPOUzfO.mjs"), { locationButton: e } = await import("./index-Cadgm6mg.mjs"), { walkMenuButton: o } = await import("./index-BzDQeHxh.mjs"), { walkPersonButton: i } = await import("./index-CIgUZcJM.mjs"), { walkBirdButton: s } = await import("./index-psziCat8.mjs"), { settingButton: n } = await import("./index-DSz8VpYf.mjs"), { infoButton: r } = await import("./index-C4v-Lg_Y.mjs");
    this.addGroup("group-1"), this.addButton(t), this.addButton(o), this.addButton(i), this.addButton(s), this.addButton(e), this.addGroup("group-2"), this.addButton(n), this.addButton(r), this.render();
  }
}
class k {
  toolbar = null;
  toolbarContainer = null;
  container;
  constructor(t) {
    this.container = t, this.init();
  }
  init() {
    this.toolbarContainer = document.createElement("div"), this.toolbarContainer.id = "opt-btn-groups", this.toolbarContainer.className = "bim-engine-opt-btn-container is-bottom-toolbar", this.container.appendChild(this.toolbarContainer), this.toolbar = new B({
      container: this.toolbarContainer,
      showLabel: !0,
      direction: "row",
      position: "bottom-center",
      // 底部居中
      align: "vertical",
      // 图标在上
      expand: "up"
      // 向上展开
    }), this.toolbar.init();
  }
  updateTheme(t) {
    this.toolbar?.setTheme(t);
  }
  refresh() {
    this.toolbar?.render();
  }
  destroy() {
    this.toolbar?.destroy(), this.toolbar = null;
  }
  // --- 转发 API ---
  addGroup(t, e) {
    this.toolbar?.addGroup(t, e), this.toolbar?.render();
  }
  addButton(t) {
    this.toolbar?.addButton(t), this.toolbar?.render();
  }
  setButtonVisibility(t, e) {
    this.toolbar?.updateButtonVisibility(t, e);
  }
  setShowLabel(t) {
    this.toolbar?.setShowLabel(t);
  }
  setVisible(t) {
    this.toolbarContainer && (this.toolbarContainer.style.visibility = t ? "visible" : "hidden");
  }
  setBackgroundColor(t) {
    this.toolbar?.setBackgroundColor(t);
  }
  setColors(t) {
    this.toolbar?.setColors(t);
  }
}
class M {
  activeGroups = [];
  container;
  constructor(t) {
    this.container = t;
  }
  /**
   * 创建一个新的按钮组
   */
  create(t) {
    const e = document.createElement("div");
    this.container.appendChild(e);
    const o = new v({
      container: e,
      ...t
    });
    return o.init(), this.activeGroups.push(o), o;
  }
  updateTheme(t) {
    this.activeGroups.forEach((e) => e.setTheme(t));
  }
  refresh() {
    this.activeGroups.forEach((t) => t.render());
  }
  destroy() {
    this.activeGroups.forEach((t) => t.destroy()), this.activeGroups = [];
  }
}
class y {
  element;
  options;
  container;
  header;
  contentArea;
  _isDestroyed = !1;
  _isInitialized = !1;
  unsubscribeTheme = null;
  unsubscribeLocale = null;
  /**
   * 构造函数
   * @param options 弹窗配置选项
   */
  constructor(t) {
    this.options = {
      title: "Dialog",
      width: 300,
      height: "auto",
      position: "center",
      draggable: !0,
      resizable: !1,
      minWidth: 200,
      minHeight: 100,
      ...t
    }, this.container = t.container, this.element = this.createDom(), this.header = this.element.querySelector(".bim-dialog-header"), this.contentArea = this.element.querySelector(".bim-dialog-content"), this.init();
  }
  /**
   * 设置主题
   * @param theme 全局主题配置
   */
  setTheme(t) {
    const e = this.element.style;
    this.options.backgroundColor || e.setProperty("--bim-dialog-bg", t.panelBackground), this.options.headerBackgroundColor || e.setProperty("--bim-dialog-header-bg", t.componentHover), this.options.titleColor || e.setProperty("--bim-dialog-title-color", t.textPrimary), this.options.textColor || e.setProperty("--bim-dialog-text-color", t.textPrimary), this.options.borderColor || e.setProperty("--bim-dialog-border-color", t.border);
  }
  /**
   * 初始化组件功能 (接口实现)
   */
  init() {
    this._isInitialized || (this.container.appendChild(this.element), this.initPosition(), this.options.draggable && this.initDrag(), this.options.resizable && this.initResize(), this._isInitialized = !0, this.options.onOpen && this.options.onOpen(), this.unsubscribeTheme = d.subscribe((t) => {
      this.setTheme(t);
    }), this.unsubscribeLocale = p.subscribe(() => {
      this.setLocales();
    }));
  }
  setLocales() {
    if (this.options.title) {
      const t = this.header.querySelector(".bim-dialog-title");
      t && (t.textContent = b(this.options.title));
    }
  }
  /**
   * 创建弹窗的 DOM 结构
   */
  createDom() {
    const t = document.createElement("div");
    t.className = "bim-dialog", this.options.id && (t.id = this.options.id);
    const e = t.style;
    this.options.backgroundColor && e.setProperty("--bim-dialog-bg", this.options.backgroundColor), this.options.headerBackgroundColor && e.setProperty("--bim-dialog-header-bg", this.options.headerBackgroundColor), this.options.titleColor && e.setProperty("--bim-dialog-title-color", this.options.titleColor), this.options.textColor && e.setProperty("--bim-dialog-text-color", this.options.textColor), this.options.borderColor && e.setProperty("--bim-dialog-border-color", this.options.borderColor), this.setSize(t, this.options.width, this.options.height);
    const o = document.createElement("div");
    o.className = "bim-dialog-header", this.options.draggable && o.classList.add("draggable");
    const i = document.createElement("span");
    i.className = "bim-dialog-title", i.textContent = this.options.title ? b(this.options.title) : "";
    const s = document.createElement("span");
    s.className = "bim-dialog-close", s.innerHTML = "&times;", s.onclick = () => this.close(), o.appendChild(i), o.appendChild(s);
    const n = document.createElement("div");
    if (n.className = "bim-dialog-content", typeof this.options.content == "string" ? n.innerHTML = this.options.content : this.options.content instanceof HTMLElement && n.appendChild(this.options.content), t.appendChild(o), t.appendChild(n), this.options.resizable) {
      const r = document.createElement("div");
      r.className = "bim-dialog-resize-handle", t.appendChild(r);
    }
    return t;
  }
  /**
   * 设置元素尺寸
   */
  setSize(t, e, o) {
    e !== void 0 && (t.style.width = typeof e == "number" ? `${e}px` : e), o !== void 0 && (t.style.height = typeof o == "number" ? `${o}px` : o);
  }
  /**
   * 初始化弹窗位置
   */
  initPosition() {
    const t = this.options.position, e = this.element.getBoundingClientRect();
    let o = 0, i = 0;
    const s = this.container.clientWidth, n = this.container.clientHeight, r = e.width, a = e.height;
    if (typeof t == "object" && "x" in t)
      o = t.x, i = t.y;
    else
      switch (t) {
        case "center":
          o = (s - r) / 2, i = (n - a) / 2;
          break;
        case "top-left":
          o = 0, i = 0;
          break;
        case "top-center":
          o = (s - r) / 2, i = 0;
          break;
        case "top-right":
          o = s - r, i = 0;
          break;
        case "left-center":
          o = 0, i = (n - a) / 2;
          break;
        case "right-center":
          o = s - r, i = (n - a) / 2;
          break;
        case "bottom-left":
          o = 0, i = n - a;
          break;
        case "bottom-center":
          o = (s - r) / 2, i = n - a;
          break;
        case "bottom-right":
          o = s - r, i = n - a;
          break;
        default:
          o = (s - r) / 2, i = (n - a) / 2;
      }
    o = Math.max(0, Math.min(o, s - r)), i = Math.max(0, Math.min(i, n - a)), this.element.style.left = `${o}px`, this.element.style.top = `${i}px`;
  }
  /**
   * 初始化拖拽功能
   */
  initDrag() {
    let t = 0, e = 0, o = 0, i = 0;
    const s = (a) => {
      a.preventDefault(), t = a.clientX, e = a.clientY, o = this.element.offsetLeft, i = this.element.offsetTop, document.addEventListener("mousemove", n), document.addEventListener("mouseup", r);
    }, n = (a) => {
      const l = a.clientX - t, h = a.clientY - e;
      let u = o + l, m = i + h;
      const f = this.container.clientWidth - this.element.offsetWidth, C = this.container.clientHeight - this.element.offsetHeight;
      u = Math.max(0, Math.min(u, f)), m = Math.max(0, Math.min(m, C)), this.element.style.left = `${u}px`, this.element.style.top = `${m}px`;
    }, r = () => {
      document.removeEventListener("mousemove", n), document.removeEventListener("mouseup", r);
    };
    this.header.addEventListener("mousedown", s);
  }
  /**
   * 初始化缩放功能
   */
  initResize() {
    const t = this.element.querySelector(".bim-dialog-resize-handle");
    if (!t) return;
    let e = 0, o = 0, i = 0, s = 0;
    const n = (l) => {
      l.preventDefault(), l.stopPropagation(), e = l.clientX, o = l.clientY, i = this.element.offsetWidth, s = this.element.offsetHeight, document.addEventListener("mousemove", r), document.addEventListener("mouseup", a);
    }, r = (l) => {
      const h = l.clientX - e, u = l.clientY - o, m = Math.max(this.options.minWidth || 100, i + h), f = Math.max(this.options.minHeight || 50, s + u);
      this.element.style.width = `${m}px`, this.element.style.height = `${f}px`;
    }, a = () => {
      document.removeEventListener("mousemove", r), document.removeEventListener("mouseup", a);
    };
    t.addEventListener("mousedown", n);
  }
  /**
   * 动态设置内容
   * @param content 内容元素或 HTML 字符串
   */
  setContent(t) {
    this.contentArea.innerHTML = "", typeof t == "string" ? this.contentArea.innerHTML = t : this.contentArea.appendChild(t);
  }
  /**
   * 关闭弹窗并销毁
   */
  close() {
    this._isDestroyed || (this.unsubscribeTheme && (this.unsubscribeTheme(), this.unsubscribeTheme = null), this.unsubscribeLocale && (this.unsubscribeLocale(), this.unsubscribeLocale = null), this.element.remove(), this._isDestroyed = !0, this.options.onClose && this.options.onClose());
  }
  /**
   * 销毁组件 (接口实现)
   */
  destroy() {
    this.close();
  }
}
class D extends y {
  /**
   * 构造函数
   * @param container 父容器
   */
  constructor(t) {
    const e = document.createElement("div");
    e.className = "bim-info-dialog-content";
    const o = document.createElement("h3");
    o.textContent = "Model Information";
    const i = document.createElement("ul");
    i.innerHTML = `
            <li><strong>Name:</strong> Sample Project</li>
            <li><strong>Version:</strong> 1.0.0</li>
            <li><strong>Date:</strong> ${(/* @__PURE__ */ new Date()).toLocaleDateString()}</li>
            <li><strong>Status:</strong> <span style="color: green;">Active</span></li>
        `;
    const s = document.createElement("button");
    s.textContent = "Update Status", s.style.marginTop = "10px", s.onclick = () => {
      alert("Status updated!");
    }, e.appendChild(o), e.appendChild(i), e.appendChild(s), super({
      container: t,
      title: "dialog.testTitle",
      content: e,
      width: 320,
      height: "auto",
      position: "center",
      resizable: !0,
      draggable: !0,
      // 可以在这里添加特定的 onClose 逻辑
      onClose: () => {
        console.log("Info dialog closed");
      },
      onOpen: () => {
        console.log("Info dialog opened");
      }
    });
  }
  // 不需要再手动实现 setTheme, destroy, close, init
  // 它们都已从 BimDialog 继承
}
class H {
  /** 弹窗挂载的父容器 */
  container;
  /** 活跃的弹窗实例列表 */
  activeDialogs = [];
  /**
   * 构造函数
   * @param container 弹窗挂载的目标容器
   */
  constructor(t) {
    this.container = t;
  }
  /**
   * 创建一个通用弹窗
   * @param options 弹窗配置选项（不需要传 container，自动使用管理器绑定的容器）
   * @returns BimDialog 实例
   */
  create(t) {
    const e = new y({
      container: this.container,
      ...t,
      onClose: () => {
        this.activeDialogs = this.activeDialogs.filter((o) => o !== e), t.onClose && t.onClose();
      }
    });
    return e.setTheme(d.getTheme()), this.activeDialogs.push(e), e;
  }
  /**
   * 显示二次封装的模型信息弹窗
   * 演示如何调用特定的业务弹窗组件
   */
  showInfoDialog() {
    new D(this.container);
  }
  /**
   * 响应全局主题变更
   * @param theme 全局主题配置
   */
  updateTheme(t) {
    this.activeDialogs.forEach((e) => {
      e.setTheme && e.setTheme(t);
    });
  }
}
class P {
  container;
  wrapper = null;
  topLeftGroup = null;
  // 保存左上角按钮组的引用
  toolbar = null;
  // 底部专用
  buttonGroup = null;
  // 通用
  dialog = null;
  get localeManager() {
    return p;
  }
  get themeManager() {
    return d;
  }
  constructor(t, e) {
    const o = typeof t == "string" ? document.getElementById(t) : t;
    if (!o) throw new Error("Container not found");
    this.container = o, e?.locale && p.setLocale(e.locale), e?.theme && (e.theme === "custom" ? console.warn("Custom theme should be set via setCustomTheme().") : d.setTheme(e.theme)), this.init();
  }
  setLocale(t) {
    p.setLocale(t);
  }
  getLocale() {
    return p.getLocale();
  }
  setTheme(t) {
    d.setTheme(t);
  }
  setCustomTheme(t) {
    d.setCustomTheme(t);
  }
  init() {
    this.container.innerHTML = "", this.wrapper = document.createElement("div"), this.wrapper.className = "bim-engine-wrapper", this.container.appendChild(this.wrapper), this.dialog = new H(this.wrapper), this.toolbar = new k(this.wrapper), this.buttonGroup = new M(this.wrapper), this.createTopLeftGroup(), this.updateTheme(d.getTheme()), this.topLeftGroup && this.topLeftGroup.setColors({
      backgroundColor: "#ff00ff"
    }), d.subscribe((t) => {
      this.updateTheme(t);
    });
  }
  createTopLeftGroup() {
    this.buttonGroup && (this.topLeftGroup = this.buttonGroup.create({
      position: "top-left",
      direction: "column",
      align: "vertical",
      backgroundColor: "#ff00ff",
      // 自定义背景色，不会被主题覆盖
      showLabel: !1
    }), this.topLeftGroup.addGroup("main"), this.topLeftGroup.addButton({
      id: "menu-btn",
      groupId: "main",
      type: "button",
      label: "Menu",
      // 应该用 translation key
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>',
      onClick: () => {
        alert("点击按钮");
      }
    }), this.topLeftGroup.render());
  }
  updateTheme(t) {
    this.wrapper && (this.wrapper.style.backgroundColor = t.background, this.wrapper.style.color = t.textPrimary);
  }
  destroy() {
    this.toolbar?.destroy(), this.buttonGroup?.destroy(), this.dialog = null, this.container.innerHTML = "";
  }
}
export {
  v as BimButtonGroup,
  P as BimEngine,
  B as Toolbar
};
//# sourceMappingURL=bim-engine-sdk.es.js.map
