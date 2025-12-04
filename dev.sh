#!/bin/bash

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 开始自动化构建和启动流程...${NC}\n"

# 1. 构建 SDK
echo -e "${YELLOW}📦 步骤 1/3: 构建 SDK...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ SDK 构建失败！${NC}"
    exit 1
fi

echo -e "${GREEN}✅ SDK 构建成功${NC}\n"

# 2. 复制 SDK 文件到 demo 目录
echo -e "${YELLOW}📋 步骤 2/3: 复制 SDK 文件到 demo 目录...${NC}"

# 复制到 demo/lib
echo "  复制到 demo/lib..."
cd demo
npm run copy-sdk
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 复制到 demo/lib 失败！${NC}"
    exit 1
fi
cd ..

# 复制到 demo-vue/public/lib
echo "  复制到 demo-vue/public/lib..."
cd demo-vue
npm run copy-sdk
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 复制到 demo-vue/public/lib 失败！${NC}"
    exit 1
fi
cd ..

echo -e "${GREEN}✅ SDK 文件复制完成${NC}\n"

# 3. 启动开发服务器
echo -e "${YELLOW}🌐 步骤 3/3: 启动开发服务器...${NC}\n"

# 清理函数：当脚本退出时停止所有后台进程
cleanup() {
    echo -e "\n${YELLOW}🛑 正在停止开发服务器...${NC}"
    kill $DEMO_PID $DEMO_VUE_PID 2>/dev/null
    exit 0
}

# 注册清理函数
trap cleanup SIGINT SIGTERM

# 启动 demo (端口 8080)
echo -e "${GREEN}启动 demo (http://localhost:8080)...${NC}"
cd demo
npm run dev &
DEMO_PID=$!
cd ..

# 等待一下确保服务器启动
sleep 3

# 启动 demo-vue (端口 8081)
echo -e "${GREEN}启动 demo-vue (http://localhost:8081)...${NC}"
cd demo-vue
npm run dev &
DEMO_VUE_PID=$!
cd ..

# 等待一下确保服务器启动
sleep 3

echo -e "\n${GREEN}✅ 所有服务已启动！${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}📱 Demo (HTML):     http://localhost:8080${NC}"
echo -e "${GREEN}📱 Demo (Vue3):    http://localhost:8081${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}💡 按 Ctrl+C 停止所有服务器${NC}\n"

# 等待用户中断
wait

