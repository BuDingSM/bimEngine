(function(){"use strict";try{if(typeof document<"u"){var o=document.createElement("style");o.appendChild(document.createTextNode('.bim-engine-wrapper{position:relative;width:100%;height:100%;font-family:sans-serif;color:#333;padding:20px;background-color:#e16969;border-radius:8px;border:1px solid #e0e0e0;box-sizing:border-box}.bim-engine-opt-btn-container{position:absolute;bottom:20px;left:50%;transform:translate(-50%);z-index:100}:root{--bim-toolbar-bg: rgba(17, 17, 17, .88);--bim-btn-bg: transparent;--bim-btn-hover-bg: #444;--bim-btn-active-bg: rgba(255, 255, 255, .15);--bim-icon-color: #ccc;--bim-icon-active-color: #fff;--bim-btn-text-color: #ccc;--bim-btn-text-active-color: #fff}.toolbar-container{display:flex;align-items:center;max-width:100%;overflow-x:auto;scrollbar-width:none;-ms-overflow-style:none}.toolbar-container::-webkit-scrollbar{display:none}.opt-btn-group{overflow:hidden;display:flex;align-items:center;flex-shrink:0;background-color:var(--bim-toolbar-bg);border-radius:4px;padding:4px 8px}.has-divider{margin-right:16px}.opt-btn-wrapper{position:relative}.opt-btn{display:flex;flex-direction:column;align-items:center;justify-content:center;width:50px;min-height:50px;padding:4px;cursor:pointer;background-color:var(--bim-btn-bg);color:var(--bim-icon-color);transition:all .2s;border-bottom:2px solid transparent}.opt-btn:hover{background-color:var(--bim-btn-hover-bg);color:var(--bim-icon-active-color)}.opt-btn.active{background-color:var(--bim-btn-active-bg);color:var(--bim-icon-active-color);border-bottom:2px solid #fff}.opt-btn.disabled{opacity:.5;cursor:not-allowed}.opt-btn-icon{width:32px;height:32px;display:flex;align-items:center;justify-content:center;flex-shrink:0}.opt-btn-icon svg{width:100%;height:100%}.opt-btn-label{font-size:10px;margin-top:2px;color:var(--bim-btn-text-color)}.opt-btn:hover .opt-btn-label,.opt-btn.active .opt-btn-label{color:var(--bim-btn-text-active-color)}.opt-btn-arrow{font-size:8px;position:absolute;top:2px;right:2px;opacity:.6;transition:transform .2s ease}.opt-btn-arrow.rotated{transform:rotate(180deg)}.opt-btn.no-label .opt-btn-arrow{top:2px;right:2px}.opt-btn-dropdown{position:fixed;transform:translate(-50%,-100%);background-color:var(--bim-toolbar-bg);border-radius:4px;overflow:hidden;box-shadow:0 4px 12px #0000004d;min-width:50px;z-index:9999;display:flex;flex-direction:column}.opt-btn-dropdown-item{display:flex;flex-direction:column;align-items:center;justify-content:center;color:var(--bim-icon-color);cursor:pointer;transition:background .2s;white-space:nowrap;min-width:50px;min-height:50px;padding:4px;background-color:var(--bim-btn-bg)}.opt-btn-dropdown-item:hover{background-color:var(--bim-btn-hover-bg);color:var(--bim-icon-active-color)}.opt-btn-dropdown-item .opt-btn-icon.small{width:30px;height:30px;margin-right:0;margin-bottom:4px}.opt-btn-dropdown-item span{font-size:10px;color:var(--bim-btn-text-color)}.opt-btn-dropdown-item:hover span{color:var(--bim-btn-text-active-color)}.opt-btn.no-label .opt-btn-icon{width:32px;height:32px}:root{--bim-dialog-bg: rgba(17, 17, 17, .95);--bim-dialog-header-bg: #2a2a2a;--bim-dialog-title-color: #fff;--bim-dialog-text-color: #ccc;--bim-dialog-border-color: #444}.bim-dialog{position:absolute;background-color:var(--bim-dialog-bg);border:1px solid var(--bim-dialog-border-color);border-radius:6px;box-shadow:0 4px 12px #0000004d;display:flex;flex-direction:column;z-index:1000;color:var(--bim-dialog-title-color);overflow:hidden;min-width:200px;min-height:100px}.bim-dialog-header{height:32px;background-color:var(--bim-dialog-header-bg);display:flex;align-items:center;justify-content:space-between;padding:0 10px;cursor:default;-webkit-user-select:none;user-select:none;border-bottom:1px solid var(--bim-dialog-border-color);flex-shrink:0}.bim-dialog-header.draggable{cursor:move}.bim-dialog-title{font-size:14px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--bim-dialog-title-color)}.bim-dialog-close{cursor:pointer;font-size:18px;color:#999;line-height:1;margin-left:8px}.bim-dialog-close:hover{color:#fff}.bim-dialog-content{flex:1;padding:10px;overflow:auto;font-size:14px;color:var(--bim-dialog-text-color)}.bim-dialog-resize-handle{position:absolute;width:10px;height:10px;bottom:0;right:0;cursor:se-resize;z-index:10}.bim-dialog-resize-handle:after{content:"";position:absolute;bottom:3px;right:3px;width:6px;height:6px;border-right:2px solid #666;border-bottom:2px solid #666}.bim-dialog-resize-handle:hover:after{border-color:#fff}.bim-info-dialog-content{padding:16px;font-family:sans-serif;color:#333}.bim-info-dialog-content h3{margin-top:0;margin-bottom:12px;border-bottom:1px solid #eee;padding-bottom:8px;color:#0078d4}.bim-info-dialog-content ul{list-style:none;padding:0;margin:0}.bim-info-dialog-content li{margin-bottom:8px;font-size:14px;display:flex}.bim-info-dialog-content li strong{width:80px;color:#555}')),document.head.appendChild(o)}}catch(t){console.error("vite-plugin-css-injected-by-js",t)}})();
class f {
  /** 挂载容器 */
  container;
  /** 组件配置选项 */
  options;
  /** 按钮组列表，按顺序存储 */
  groups = [];
  /** 当前处于激活状态的按钮 ID 集合 */
  activeBtnIds = /* @__PURE__ */ new Set();
  /** 按钮 DOM 元素的引用映射，方便快速查找 */
  btnRefs = /* @__PURE__ */ new Map();
  /** 当��显示的下拉菜单元素 */
  dropdownElement = null;
  /** 鼠标悬停计时器，用于处理菜单显示的防抖 */
  hoverTimeout = null;
  /** 默认图标 SVG */
  DEFAULT_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>';
  /**
   * 构造函数
   * @param options 配置选项
   */
  constructor(t) {
    const o = typeof t.container == "string" ? document.getElementById(t.container) : t.container;
    if (!o) throw new Error("Container not found");
    this.container = o, this.options = {
      showLabel: !0,
      visibility: {},
      ...t
    }, this.initContainer(), this.applyStyles();
  }
  /**
   * 初始化容器
   */
  initContainer() {
    this.container.innerHTML = "", this.container.classList.add("toolbar-root");
  }
  /**
   * 应用样式配置到 CSS 变量
   */
  applyStyles() {
    const t = this.container.style;
    this.options.backgroundColor && t.setProperty("--bim-toolbar-bg", this.options.backgroundColor), this.options.btnBackgroundColor && t.setProperty("--bim-btn-bg", this.options.btnBackgroundColor), this.options.btnHoverColor && t.setProperty("--bim-btn-hover-bg", this.options.btnHoverColor), this.options.btnActiveColor && t.setProperty("--bim-btn-active-bg", this.options.btnActiveColor), this.options.iconColor && t.setProperty("--bim-icon-color", this.options.iconColor), this.options.iconActiveColor && t.setProperty("--bim-icon-active-color", this.options.iconActiveColor), this.options.textColor && t.setProperty("--bim-btn-text-color", this.options.textColor), this.options.textActiveColor && t.setProperty("--bim-btn-text-active-color", this.options.textActiveColor);
  }
  /**
   * 更新颜色配置
   * @param colors 颜色配置对象
   */
  setColors(t) {
    this.options = { ...this.options, ...t }, this.applyStyles();
  }
  /**
   * 添加按钮组
   * @param groupId 组ID
   * @param beforeGroupId 在哪个组之前插入（可选���，不传则插入到最后
   */
  addGroup(t, o) {
    if (this.groups.some((i) => i.id === t)) {
      console.warn("Group " + t + " already exists");
      return;
    }
    const e = { id: t, buttons: [] };
    if (o) {
      const i = this.groups.findIndex((n) => n.id === o);
      i !== -1 ? this.groups.splice(i, 0, e) : (console.warn(`Target group ${o} not found, appending ${t} to end.`), this.groups.push(e));
    } else
      this.groups.push(e);
  }
  /**
   * 添加按钮到指定组
   * @param config 按钮配置（必须包含 groupId，可选包含 parentId）
   */
  addButton(t) {
    const { groupId: o, parentId: e } = t;
    if (!o)
      throw new Error(`Button ${t.id} config must contain 'groupId'`);
    const i = this.groups.find((s) => s.id === o);
    if (!i)
      throw new Error(`Group ${o} not found. Please call addGroup first.`);
    const n = {
      ...t,
      children: t.children || []
    };
    if (e) {
      const s = this.findButton(i.buttons, e);
      if (!s)
        throw new Error(`Parent button ${e} not found in group ${o}`);
      s.children || (s.children = []), s.children.push(n);
    } else
      i.buttons.push(n);
  }
  /**
   * 递归查找按钮
   */
  findButton(t, o) {
    for (const e of t) {
      if (e.id === o) return e;
      if (e.children) {
        const i = this.findButton(e.children, o);
        if (i) return i;
      }
    }
  }
  /**
   * 初始化组件，加载默认按钮配置
   */
  async init() {
    const { homeButton: t } = await import("./index-CAJWny5G.mjs"), { locationButton: o } = await import("./index-C12x1apF.mjs"), { walkMenuButton: e } = await import("./index-Wpi9Br9A.mjs"), { walkPersonButton: i } = await import("./index-BXbORK0j.mjs"), { walkBirdButton: n } = await import("./index-Djlk5GIH.mjs"), { settingButton: s } = await import("./index-DsRG5l_h.mjs"), { infoButton: r } = await import("./index-DvZ5eiUH.mjs");
    this.addGroup("group-1"), this.addButton(t), this.addButton(e), this.addButton(i), this.addButton(n), this.addButton(o), this.addGroup("group-2"), this.addButton(s), this.addButton(r), this.render();
  }
  /**
   * 渲染整个工具栏
   */
  render() {
    this.container.innerHTML = "", this.btnRefs.clear();
    const t = document.createElement("div");
    t.className = "toolbar-container", this.groups.forEach((o, e) => {
      const i = this.renderGroup(o, e, this.groups.length);
      t.appendChild(i);
    }), this.container.appendChild(t);
  }
  /**
   * 渲染单个按钮组
   */
  renderGroup(t, o, e) {
    const i = document.createElement("div");
    return i.className = "opt-btn-group", o < e - 1 && i.classList.add("has-divider"), t.buttons.forEach((n) => {
      if (this.isVisible(n.id)) {
        const s = this.renderButton(n);
        i.appendChild(s);
      }
    }), i;
  }
  /**
   * 渲染单个按钮
   */
  renderButton(t) {
    const o = document.createElement("div");
    o.className = "opt-btn-wrapper";
    const e = document.createElement("div");
    e.className = "opt-btn", this.activeBtnIds.has(t.id) && e.classList.add("active"), t.disabled && e.classList.add("disabled"), this.options.showLabel || (e.classList.add("no-label"), t.label && (e.title = t.label));
    const i = document.createElement("div");
    if (i.className = "opt-btn-icon", i.innerHTML = this.getIcon(t.icon), e.appendChild(i), this.options.showLabel && t.label) {
      const n = document.createElement("span");
      n.className = "opt-btn-label", n.textContent = t.label, e.appendChild(n);
    }
    if (t.children && t.children.length > 0) {
      const n = document.createElement("span");
      n.className = "opt-btn-arrow", n.textContent = "▼", e.appendChild(n);
    }
    return e.addEventListener("click", () => this.handleClick(t)), e.addEventListener("mouseenter", () => this.handleMouseEnter(t, e)), e.addEventListener("mouseleave", () => this.handleMouseLeave()), this.btnRefs.set(t.id, e), o.appendChild(e), o;
  }
  /**
   * 处理按钮点击事件
   */
  handleClick(t) {
    t.disabled || (!t.children || t.children.length === 0) && (t.keepActive && (this.activeBtnIds.has(t.id) ? this.activeBtnIds.delete(t.id) : this.activeBtnIds.add(t.id), this.updateButtonState(t.id)), this.closeDropdown(), t.onClick && t.onClick(t));
  }
  /**
   * 处理子菜单项点击事件
   */
  handleSubClick(t) {
    t.keepActive && (this.activeBtnIds.has(t.id) ? this.activeBtnIds.delete(t.id) : this.activeBtnIds.add(t.id), this.updateButtonState(t.id)), this.closeDropdown(), t.onClick && t.onClick(t);
  }
  /**
   * 处理鼠标移入事件（显示菜单）
   */
  handleMouseEnter(t, o) {
    if (this.hoverTimeout && (clearTimeout(this.hoverTimeout), this.hoverTimeout = null), t.children && t.children.length > 0) {
      this.showDropdown(t, o);
      const e = o.querySelector(".opt-btn-arrow");
      e && e.classList.add("rotated");
    } else
      this.closeDropdown();
  }
  /**
   * 处理鼠标移出事件（隐藏菜单）
   */
  handleMouseLeave() {
    this.hoverTimeout = window.setTimeout(() => {
      this.closeDropdown();
    }, 200);
  }
  /**
   * 显示下拉菜单
   */
  showDropdown(t, o) {
    if (this.closeDropdown(), !t.children) return;
    const e = document.createElement("div");
    e.className = "opt-btn-dropdown";
    const i = e.style;
    this.options.backgroundColor && i.setProperty("--bim-toolbar-bg", this.options.backgroundColor), this.options.btnBackgroundColor && i.setProperty("--bim-btn-bg", this.options.btnBackgroundColor), this.options.btnHoverColor && i.setProperty("--bim-btn-hover-bg", this.options.btnHoverColor), this.options.btnActiveColor && i.setProperty("--bim-btn-active-bg", this.options.btnActiveColor), this.options.iconColor && i.setProperty("--bim-icon-color", this.options.iconColor), this.options.iconActiveColor && i.setProperty("--bim-icon-active-color", this.options.iconActiveColor), this.options.textColor && i.setProperty("--bim-btn-text-color", this.options.textColor), this.options.textActiveColor && i.setProperty("--bim-btn-text-active-color", this.options.textActiveColor);
    const n = o.getBoundingClientRect(), s = n.left + n.width / 2;
    e.style.top = n.top - 8 + "px", e.style.left = s + "px", t.children.forEach((r) => {
      if (this.isVisible(r.id)) {
        const a = this.renderDropdownItem(r);
        e.appendChild(a);
      }
    }), e.addEventListener("mouseenter", () => {
      this.hoverTimeout && (clearTimeout(this.hoverTimeout), this.hoverTimeout = null);
    }), e.addEventListener("mouseleave", () => this.handleMouseLeave()), document.body.appendChild(e), this.dropdownElement = e;
  }
  /**
   * 渲染下拉菜单项
   */
  renderDropdownItem(t) {
    const o = document.createElement("div");
    o.className = "opt-btn-dropdown-item";
    const e = document.createElement("div");
    if (e.className = "opt-btn-icon small", e.innerHTML = this.getIcon(t.icon), o.appendChild(e), this.options.showLabel) {
      const i = document.createElement("span");
      i.textContent = t.label, o.appendChild(i);
    }
    return o.addEventListener("click", (i) => {
      i.stopPropagation(), this.handleSubClick(t);
    }), o;
  }
  /**
   * 关闭所有下拉菜单
   */
  closeDropdown() {
    this.dropdownElement && (this.dropdownElement.remove(), this.dropdownElement = null), this.btnRefs.forEach((t) => {
      const o = t.querySelector(".opt-btn-arrow");
      o && o.classList.remove("rotated");
    });
  }
  /**
   * 更新按钮的激活状态样式
   */
  updateButtonState(t) {
    const o = this.btnRefs.get(t);
    o && (this.activeBtnIds.has(t) ? o.classList.add("active") : o.classList.remove("active"));
  }
  /**
   * 获取图标 SVG 字符串
   */
  getIcon(t) {
    return t || this.DEFAULT_ICON;
  }
  /**
   * 更新按钮可见性
   * @param buttonId 按钮ID
   * @param visible 是否可见
   */
  updateButtonVisibility(t, o) {
    this.options.visibility || (this.options.visibility = {}), this.options.visibility[t] = o, this.render();
  }
  /**
   * 设置是否显示标签
   * @param show 是否显示
   */
  setShowLabel(t) {
    this.options.showLabel = t, this.render();
  }
  /**
   * 设置背景颜色 (兼容旧接口)
   * @param color CSS 颜色值
   */
  setBackgroundColor(t) {
    this.setColors({ backgroundColor: t });
  }
  /**
   * 检查按钮是否可见
   */
  isVisible(t) {
    return this.options.visibility?.[t] !== !1;
  }
  /**
   * 销毁组件，清理资源
   */
  destroy() {
    this.closeDropdown(), this.hoverTimeout && clearTimeout(this.hoverTimeout), this.container.innerHTML = "", this.btnRefs.clear(), this.activeBtnIds.clear(), this.groups = [];
  }
}
class g {
  /** 内部工具栏组件实例 */
  optBtnGroups = null;
  /** 工具栏挂载的容器 */
  container;
  /**
   * 构造函数
   * @param container 工具栏挂载的容器元素
   */
  constructor(t) {
    this.container = t, this.init();
  }
  /**
   * 初始化工具栏
   */
  init() {
    this.optBtnGroups = new f({
      container: this.container,
      showLabel: !0
    }), this.optBtnGroups.init().catch((t) => {
      console.error("Failed to initialize OptBtnGroups:", t);
    });
  }
  /**
   * 添加一个工具栏按钮组
   * @param groupId 新组的 ID
   * @param beforeGroupId (可选) 插入到哪个组之前，不传则追加到最后
   */
  addGroup(t, o) {
    this.optBtnGroups ? (this.optBtnGroups.addGroup(t, o), this.optBtnGroups.render()) : console.warn("Toolbar not initialized yet.");
  }
  /**
   * 添加一个工具栏按钮
   * @param config 按钮配置对象
   */
  addButton(t) {
    this.optBtnGroups ? (this.optBtnGroups.addButton(t), this.optBtnGroups.render()) : console.warn("Toolbar not initialized yet.");
  }
  /**
   * 设置按钮的可见性
   * @param buttonId 按钮 ID
   * @param visible 是否可见
   */
  setButtonVisibility(t, o) {
    this.optBtnGroups ? this.optBtnGroups.updateButtonVisibility(t, o) : console.warn("Toolbar not initialized yet.");
  }
  /**
   * 设置是否显示按钮下方的文字标签
   * @param show 是否显示
   */
  setShowLabel(t) {
    this.optBtnGroups ? this.optBtnGroups.setShowLabel(t) : console.warn("Toolbar not initialized yet.");
  }
  /**
   * 设置整个工具栏的可见性
   * @param visible 是否可见
   */
  setVisible(t) {
    this.container.style.display = t ? "block" : "none";
  }
  /**
   * 设置工具栏背景颜色
   * @param color CSS 颜色值
   */
  setBackgroundColor(t) {
    this.optBtnGroups ? this.optBtnGroups.setBackgroundColor(t) : console.warn("Toolbar not initialized yet.");
  }
  /**
   * 设置工具栏详细颜色配置
   * @param colors 颜色配置对象
   */
  setColors(t) {
    this.optBtnGroups ? this.optBtnGroups.setColors(t) : console.warn("Toolbar not initialized yet.");
  }
  /**
   * 销毁工具栏管理器
   */
  destroy() {
    this.optBtnGroups && (this.optBtnGroups.destroy(), this.optBtnGroups = null);
  }
}
class u {
  element;
  options;
  container;
  header;
  contentArea;
  _isDestroyed = !1;
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
   * 创建弹窗的 DOM 结构
   */
  createDom() {
    const t = document.createElement("div");
    t.className = "bim-dialog", this.options.id && (t.id = this.options.id);
    const o = t.style;
    this.options.backgroundColor && o.setProperty("--bim-dialog-bg", this.options.backgroundColor), this.options.headerBackgroundColor && o.setProperty("--bim-dialog-header-bg", this.options.headerBackgroundColor), this.options.titleColor && o.setProperty("--bim-dialog-title-color", this.options.titleColor), this.options.textColor && o.setProperty("--bim-dialog-text-color", this.options.textColor), this.options.borderColor && o.setProperty("--bim-dialog-border-color", this.options.borderColor), this.setSize(t, this.options.width, this.options.height);
    const e = document.createElement("div");
    e.className = "bim-dialog-header", this.options.draggable && e.classList.add("draggable");
    const i = document.createElement("span");
    i.className = "bim-dialog-title", i.textContent = this.options.title || "";
    const n = document.createElement("span");
    n.className = "bim-dialog-close", n.innerHTML = "&times;", n.onclick = () => this.close(), e.appendChild(i), e.appendChild(n);
    const s = document.createElement("div");
    if (s.className = "bim-dialog-content", typeof this.options.content == "string" ? s.innerHTML = this.options.content : this.options.content instanceof HTMLElement && s.appendChild(this.options.content), t.appendChild(e), t.appendChild(s), this.options.resizable) {
      const r = document.createElement("div");
      r.className = "bim-dialog-resize-handle", t.appendChild(r);
    }
    return t;
  }
  /**
   * 设置元素尺寸
   */
  setSize(t, o, e) {
    o !== void 0 && (t.style.width = typeof o == "number" ? `${o}px` : o), e !== void 0 && (t.style.height = typeof e == "number" ? `${e}px` : e);
  }
  /**
   * 初始化组件功能
   */
  init() {
    this.container.appendChild(this.element), this.initPosition(), this.options.draggable && this.initDrag(), this.options.resizable && this.initResize();
  }
  /**
   * 初始化弹窗位置
   */
  initPosition() {
    const t = this.options.position, o = this.element.getBoundingClientRect();
    let e = 0, i = 0;
    const n = this.container.clientWidth, s = this.container.clientHeight, r = o.width, a = o.height;
    if (typeof t == "object" && "x" in t)
      e = t.x, i = t.y;
    else
      switch (t) {
        case "center":
          e = (n - r) / 2, i = (s - a) / 2;
          break;
        case "top-left":
          e = 0, i = 0;
          break;
        case "top-center":
          e = (n - r) / 2, i = 0;
          break;
        case "top-right":
          e = n - r, i = 0;
          break;
        case "left-center":
          e = 0, i = (s - a) / 2;
          break;
        case "right-center":
          e = n - r, i = (s - a) / 2;
          break;
        case "bottom-left":
          e = 0, i = s - a;
          break;
        case "bottom-center":
          e = (n - r) / 2, i = s - a;
          break;
        case "bottom-right":
          e = n - r, i = s - a;
          break;
        default:
          e = (n - r) / 2, i = (s - a) / 2;
      }
    e = Math.max(0, Math.min(e, n - r)), i = Math.max(0, Math.min(i, s - a)), this.element.style.left = `${e}px`, this.element.style.top = `${i}px`;
  }
  /**
   * 初始化拖拽功能
   */
  initDrag() {
    let t = 0, o = 0, e = 0, i = 0;
    const n = (a) => {
      a.preventDefault(), t = a.clientX, o = a.clientY, e = this.element.offsetLeft, i = this.element.offsetTop, document.addEventListener("mousemove", s), document.addEventListener("mouseup", r);
    }, s = (a) => {
      const l = a.clientX - t, p = a.clientY - o;
      let d = e + l, h = i + p;
      const m = this.container.clientWidth - this.element.offsetWidth, b = this.container.clientHeight - this.element.offsetHeight;
      d = Math.max(0, Math.min(d, m)), h = Math.max(0, Math.min(h, b)), this.element.style.left = `${d}px`, this.element.style.top = `${h}px`;
    }, r = () => {
      document.removeEventListener("mousemove", s), document.removeEventListener("mouseup", r);
    };
    this.header.addEventListener("mousedown", n);
  }
  /**
   * 初始化缩放功能
   */
  initResize() {
    const t = this.element.querySelector(".bim-dialog-resize-handle");
    if (!t) return;
    let o = 0, e = 0, i = 0, n = 0;
    const s = (l) => {
      l.preventDefault(), l.stopPropagation(), o = l.clientX, e = l.clientY, i = this.element.offsetWidth, n = this.element.offsetHeight, document.addEventListener("mousemove", r), document.addEventListener("mouseup", a);
    }, r = (l) => {
      const p = l.clientX - o, d = l.clientY - e, h = Math.max(this.options.minWidth || 100, i + p), m = Math.max(this.options.minHeight || 50, n + d);
      this.element.style.width = `${h}px`, this.element.style.height = `${m}px`;
    }, a = () => {
      document.removeEventListener("mousemove", r), document.removeEventListener("mouseup", a);
    };
    t.addEventListener("mousedown", s);
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
    this._isDestroyed || (this.element.remove(), this._isDestroyed = !0, this.options.onClose && this.options.onClose());
  }
}
class v {
  dialog;
  /**
   * 构造函数
   * @param container 父容器
   */
  constructor(t) {
    const o = document.createElement("div");
    o.className = "bim-info-dialog-content";
    const e = document.createElement("h3");
    e.textContent = "Model Information";
    const i = document.createElement("ul");
    i.innerHTML = `
            <li><strong>Name:</strong> Sample Project</li>
            <li><strong>Version:</strong> 1.0.0</li>
            <li><strong>Date:</strong> ${(/* @__PURE__ */ new Date()).toLocaleDateString()}</li>
            <li><strong>Status:</strong> <span style="color: green;">Active</span></li>
        `;
    const n = document.createElement("button");
    n.textContent = "Update Status", n.style.marginTop = "10px", n.onclick = () => {
      alert("Status updated!");
    }, o.appendChild(e), o.appendChild(i), o.appendChild(n), this.dialog = new u({
      container: t,
      title: "Project Info (Wrapped)",
      content: o,
      width: 320,
      height: "auto",
      position: "center",
      resizable: !0,
      draggable: !0
    });
  }
  /**
   * 关闭弹窗
   */
  close() {
    this.dialog.close();
  }
}
class w {
  /** 弹窗挂载的父容器 */
  container;
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
    return new u({
      container: this.container,
      ...t
    });
  }
  /**
   * 显示二次封装的模型信息弹窗
   * 演示如何调用特定的业务弹窗组件
   */
  showInfoDialog() {
    new v(this.container);
  }
}
class C {
  /** 主容器元素 */
  container;
  /** 内部包装器元素，用于承载所有 UI 组件 */
  wrapper = null;
  /** 工具栏管理器实例 */
  toolbar = null;
  /** 弹窗管理器实例 */
  dialog = null;
  /**
   * 构造函数
   * @param container 容器元素或容器 ID
   */
  constructor(t) {
    const o = typeof t == "string" ? document.getElementById(t) : t;
    if (!o) throw new Error("Container not found");
    this.container = o, this.init();
  }
  /**
   * 初始化方法
   * 创建 DOM 结构并初始化各子模块
   */
  init() {
    this.container.innerHTML = "", this.wrapper = document.createElement("div"), this.wrapper.className = "bim-engine-wrapper";
    const t = document.createElement("h1");
    t.textContent = "BimEngine", t.className = "bim-engine-title";
    const o = document.createElement("p");
    o.textContent = "这是一个使用BIM-ENGINE。", o.className = "bim-engine-desc";
    const e = document.createElement("div");
    e.id = "opt-btn-groups", e.className = "bim-engine-opt-btn-container", this.wrapper.appendChild(t), this.wrapper.appendChild(o), this.dialog = new w(this.wrapper), this.toolbar = new g(e);
    const i = document.createElement("button");
    i.textContent = "打开测试弹窗", i.className = "bim-engine-btn", i.onclick = () => {
      this.dialog?.create({
        title: "测试弹窗",
        content: '<div style="padding: 10px;">这是一个 <b>可拖拽</b> 且 <b>可缩放</b> 的弹窗。<br><br>你可以尝试拖动标题栏，或者拖动右下角改变大小。</div>',
        width: 300,
        height: 400,
        position: "top-left",
        draggable: !0,
        resizable: !0
      });
    };
    const n = document.createElement("button");
    n.textContent = "打开信息弹窗 (封装版)", n.className = "bim-engine-btn", n.style.marginLeft = "10px", n.onclick = () => {
      this.dialog?.showInfoDialog();
    }, this.wrapper.appendChild(i), this.wrapper.appendChild(n), this.wrapper.appendChild(e), this.container.appendChild(this.wrapper);
  }
  /**
   * 销毁实例
   * 清理所有资源和 DOM 元素
   */
  destroy() {
    this.toolbar && (this.toolbar.destroy(), this.toolbar = null), this.dialog = null, this.container.innerHTML = "";
  }
}
export {
  C as BimEngine,
  f as OptBtnGroups
};
//# sourceMappingURL=bim-engine-sdk.es.js.map
