# 🚀 快速启动指南

## Windows 用户

直接双击运行：

```
start.bat
```

或者在命令行执行：

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
copy .env.example .env.local
# 然后编辑 .env.local，添加豆包 API Key

# 3. 启动项目
npm run dev
```

## macOS / Linux 用户

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.example .env.local
# 编辑 .env.local

# 3. 启动项目
npm run dev
```

## 📝 环境变量配置

复制 `.env.example` 为 `.env.local`：

```bash
cp .env.example .env.local
```

编辑 `.env.local`，添加以下配置：

```env
# 豆包大模型（必须）
DOUBAO_API_KEY=你的火山引擎API Key
DOUBAO_MODEL=doubao-pro-32k

# 数据库（可选，本地开发可使用 SQLite）
DATABASE_URL="file:./dev.db"

# NextAuth（可修改）
NEXTAUTH_SECRET=任意字符串
NEXTAUTH_URL=http://localhost:3000
```

## 🔑 获取豆包 API Key

1. 访问 [火山引擎官网](https://www.volcengine.com/)
2. 注册账号并登录
3. 创建应用，获取 API Key
4. 选择模型：doubao-pro-32k

## 🐛 常见问题

### 依赖安装失败？

```bash
# 清理后重新安装
rmdir /s /q node_modules
npm install --legacy-peer-deps
```

### 端口被占用？

```bash
# 使用其他端口
npm run dev -- -p 3001
```

### Prisma 错误？

```bash
# 重新生成客户端
npx prisma generate
```

## 📱 访问项目

启动成功后，浏览器访问：

- **首页**: http://localhost:3000
- **AI 对话**: http://localhost:3000/ai/chat
- **面相分析**: http://localhost:3000/ai/fortune
- **预约页面**: http://localhost:3000/reservation/mentor

---

**祝您使用愉快！** 🎉
