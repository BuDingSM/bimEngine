<template>
  <div class="app-container">
    <!-- 左侧控制面板 -->
    <aside class="sidebar">
      <h1>BIM SDK Demo (Vue3)</h1>

      <!-- 1. 语言设置 -->
      <div class="control-group">
        <h2>🌍 语言 (Language)</h2>
        <div class="btn-container">
          <button class="primary" @click="setLang('zh-CN')">中文</button>
          <button class="primary" @click="setLang('en-US')">English</button>
        </div>
      </div>

      <!-- 2. 弹窗测试 -->
      <div class="control-group">
        <h2>🪟 弹窗 (Dialog)</h2>
        <div class="btn-container">
          <button @click="openTestDialog">测试弹窗</button>
          <button @click="openInfoDialog">信息弹窗</button>
          <button @click="openRedDialog">警告弹窗</button>
        </div>
      </div>

      <!-- 3. 工具栏操作 -->
      <div class="control-group">
        <h2>🛠️ 工具栏 (Toolbar)</h2>
        <div class="btn-container">
          <button @click="toggleToolbar">显隐工具栏</button>
          <button @click="toggleLabel">显隐标签</button>
          <button @click="toggleLocationBtn">显隐定位按钮</button>
        </div>
        <div class="btn-container" style="margin-top: 8px;">
          <button @click="addCustomGroup">加组</button>
          <button @click="addCustomButton">加按钮</button>
        </div>
      </div>

      <!-- 4. 样式主题 -->
      <div class="control-group">
        <h2>🎨 样式 (Theme)</h2>
        <div class="btn-container">
          <button @click="setTheme('dark')">深色 (Dark)</button>
          <button @click="setTheme('light')">浅色 (Light)</button>
          <button @click="setCustomTheme">自定义 (Red)</button>
        </div>
      </div>

      <!-- 5. 3D 引擎 -->
      <div class="control-group">
        <h2>🎮 3D 引擎 (Engine)</h2>
        <div class="btn-container">
          <button class="primary" @click="initEngine">初始化引擎</button>
          <button class="primary" @click="loadModel">加载模型</button>
        </div>
        <div style="margin-top: 10px; font-size: 0.85rem; color: #666;">
          <div>状态: <span :style="{ color: engineStatusColor }">{{ engineStatus }}</span></div>
        </div>
      </div>
    </aside>

    <!-- 右侧主区域 -->
    <main class="main-content">
      <div ref="appContainer" id="app-container"></div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 响应式状态
const appContainer = ref<HTMLElement | null>(null);
const engine = ref<any>(null);
const isToolbarVisible = ref(true);
const isLabelVisible = ref(true);
const isLocationVisible = ref(true);
const customGroupAdded = ref(false);
const engineStatus = ref('未初始化');
const engineStatusColor = ref('#666');

// 初始化引擎
onMounted(() => {
  if (window.LyzBimEngineSDK) {
    const Engine = window.LyzBimEngineSDK.BimEngine;
    try {
      if (appContainer.value) {
        engine.value = new Engine(appContainer.value, { locale: 'zh-CN' });
        initEngine();
        console.log('Engine initialized:', engine.value);
      }
    } catch (err) {
      console.error('Init failed:', err);
    }
  } else {
    console.error('SDK not found');
  }
});

// 清理资源
onUnmounted(() => {
  if (engine.value) {
    engine.value.destroy();
  }
});

// 更新引擎状态
const updateEngineStatus = (status: string) => {
  engineStatus.value = status;
  if (status === '已初始化') {
    engineStatusColor.value = '#28a745';
  } else if (status === '初始化失败' || status === '初始化错误') {
    engineStatusColor.value = '#dc3545';
  } else {
    engineStatusColor.value = '#666';
  }
};

// --- 语言设置 ---
const setLang = (lang: 'zh-CN' | 'en-US') => {
  if (engine.value) {
    engine.value.setLocale(lang);
  }
};

// --- 弹窗测试 ---
const openTestDialog = () => {
  if (!engine.value || !engine.value.dialog) return;
  engine.value.dialog.create({
    title: 'dialog.testTitle',
    width: 350,
    height: 200,
    position: 'center',
    draggable: true,
    resizable: true
  });
};

const openInfoDialog = () => {
  if (!engine.value || !engine.value.dialog) return;
  engine.value.dialog.showInfoDialog();
};

const openRedDialog = () => {
  if (!engine.value || !engine.value.dialog) return;
  engine.value.dialog.create({
    title: 'Alert',
    content: '<div style="color: #ffcccc;">Critical Warning!</div>',
    width: 300,
    height: 150,
    backgroundColor: 'rgba(100, 0, 0, 0.95)',
    headerBackgroundColor: '#cc0000',
    titleColor: '#ffffff',
    borderColor: '#ff6666',
    position: { x: 50, y: 50 }
  });
};

// --- 工具栏操作 ---
const toggleToolbar = () => {
  if (!engine.value || !engine.value.toolbar) return;
  isToolbarVisible.value = !isToolbarVisible.value;
  engine.value.toolbar.setVisible(isToolbarVisible.value);
};

const toggleLabel = () => {
  if (!engine.value || !engine.value.toolbar) return;
  isLabelVisible.value = !isLabelVisible.value;
  engine.value.toolbar.setShowLabel(isLabelVisible.value);
};

const toggleLocationBtn = () => {
  if (!engine.value || !engine.value.toolbar) return;
  isLocationVisible.value = !isLocationVisible.value;
  engine.value.toolbar.setButtonVisibility('location', isLocationVisible.value);
};

const addCustomGroup = () => {
  if (!engine.value || !engine.value.toolbar) return;
  if (customGroupAdded.value) {
    alert('已添加过');
    return;
  }
  engine.value.toolbar.addGroup('custom-group', 'group-1');
  customGroupAdded.value = true;
};

const addCustomButton = () => {
  if (!engine.value || !engine.value.toolbar) return;
  if (!customGroupAdded.value) {
    alert('Please add custom group first / 请先添加自定义组');
    return;
  }
  const btnId = 'custom-btn-' + Date.now();
  engine.value.toolbar.addButton({
    id: btnId,
    groupId: 'custom-group',
    type: 'button',
    label: 'New',
    icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>',
    onClick: (btn: any) => {
      alert('Clicked: ' + btn.label);
    }
  });
};

// --- 主题操作 ---
const setTheme = (themeName: 'dark' | 'light') => {
  if (engine.value) {
    engine.value.setTheme(themeName);
  }
};

const setCustomTheme = () => {
  if (!engine.value) return;
  // 定义一个红色主题
  engine.value.setCustomTheme({
    name: 'red-alert',
    primary: '#d32f2f',
    primaryHover: '#b71c1c',
    background: '#ffebee', // 浅红背景
    panelBackground: 'rgba(255, 255, 255, 0.9)',
    textPrimary: '#b71c1c',
    textSecondary: '#e57373',
    border: '#ffcdd2',
    icon: '#d32f2f',
    iconActive: '#b71c1c',
    componentBackground: 'rgba(255, 205, 210, 0.3)',
    componentHover: 'rgba(255, 205, 210, 0.8)',
    componentActive: '#e57373'
  });
};

// --- 3D 引擎操作 ---
/**
 * 初始化 3D 引擎
 */
const initEngine = () => {
  if (!engine.value || !engine.value.engine) {
    alert('引擎未创建，请先等待页面加载完成');
    return;
  }

  if (engine.value.engine.isInitialized()) {
    alert('3D 引擎已经初始化过了');
    updateEngineStatus('已初始化');
    return;
  }

  try {
    // 初始化引擎，使用默认配置
    const success = engine.value.initEngine({
      backgroundColor: 0x333333,  // 深色背景
      version: 'v1',               // WebGL 版本
      showStats: true,             // 显示性能统计
      showViewCube: true           // 显示视图立方体
    });

    if (success) {
      updateEngineStatus('已初始化');
      console.log('✅ 3D 引擎初始化成功');
    } else {
      updateEngineStatus('初始化失败');
      console.error('❌ 3D 引擎初始化失败');
    }
  } catch (error: any) {
    updateEngineStatus('初始化错误');
    console.error('❌ 3D 引擎初始化错误:', error);
  }
};

/**
 * 加载 3D 模型
 */
const loadModel = () => {
  if (!engine.value || !engine.value.engine) {
    alert('引擎未创建，请先等待页面加载完成');
    return;
  }

  if (!engine.value.engine.isInitialized()) {
    alert('请先初始化 3D 引擎！');
    return;
  }

  try {
    // 加载模型文件（从 model 目录）
    const modelUrl = '/model/gujianzhu.glb';
    
    engine.value.engine.loadModel(modelUrl, {
      position: [0, 0, 0],    // 初始位置
      rotation: [0, 0, 0],       // 初始旋转
      scale: [1, 1, 1]         // 初始缩放
    });

    console.log('✅ 模型加载请求已发送:', modelUrl);
  } catch (error: any) {
    console.error('❌ 模型加载错误:', error);
  }
};
</script>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
}

/* 左侧侧边栏：控制面板 */
.sidebar {
  width: 320px;
  background: white;
  border-right: 1px solid #e0e0e0;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.sidebar h1 {
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 10px;
}

.control-group {
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #eee;
}

.control-group h2 {
  font-size: 1rem;
  color: #555;
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 2px solid #e0e0e0;
}

.btn-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

button {
  padding: 6px 12px;
  font-size: 0.9rem;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  flex: 1 1 auto;
}

button:hover {
  background: #f0f0f0;
  border-color: #ccc;
}

button.primary {
  background: #0078d4;
  color: white;
  border-color: #0063b1;
}

button.primary:hover {
  background: #0063b1;
}

/* 右侧主内容区：引擎展示 */
.main-content {
  flex: 1;
  position: relative;
  background: #eef2f5;
  display: flex;
  justify-content: center;
  align-items: center;
}

#app-container {
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
}
</style>

