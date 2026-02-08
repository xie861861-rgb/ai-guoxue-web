# 🚀 快速启动指南

## 🎯 方式一：一键安装（推荐 Windows 用户）

直接双击运行完整安装脚本：

```bash
install-all.bat
```

这个脚本会自动：
1. ✅ 检查 Node.js 环境
2. ✅ 安装所有 npm 依赖
3. ✅ 生成 Prisma 客户端
4. ✅ 配置环境变量
5. ✅ 构建项目测试

---

## 🎯 方式二：手动安装

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
copy .env.example .env.local
# 然后编辑 .env.local，添加 API Key

# 3. 启动项目
npm run dev
```

## 🐳 Docker 方式（推荐）

如果不想本地安装 PostgreSQL，使用 Docker：

```bash
# 1. 启动数据库
docker-compose up -d

# 2. 安装依赖
npm install

# 3. 运行迁移
npx prisma migrate dev

# 4. 启动开发服务器
npm run dev
```

---

## 📝 环境变量配置

复制 `.env.example` 为 `.env.local`：

```bash
copy .env.example .env.local
```

编辑 `.env.local`，添加以下配置：

```env
# 数据库
DATABASE_URL="postgresql://user:password@localhost:5432/ai_guoxue_db"

# NextAuth
NEXTAUTH_SECRET=任意随机字符串
NEXTAUTH_URL=http://localhost:3000

# AI 模型（至少配置一个）
MINIMAX_API_KEY=xxx
# 或
DOUBAO_API_KEY=xxx
```

---

## 🔑 获取 API Keys

### MiniMax（推荐）
- 官网: https://api.minimax.chat
- 注册登录 → 创建应用 → 获取 API Key

### 豆包 (火山引擎)
- 官网: https://www.volcengine.com/product/ark
- 注册登录 → 创建应用 → 获取 API Key

---

## 🚀 Vercel 一键部署

### 方式一：命令行部署

```bash
# 运行部署脚本
deploy-vercel.bat
```

脚本会自动：
1. ✅ 检查环境
2. ✅ 构建项目
3. ✅ 登录 Vercel（首次）
4. ✅ 部署到生产/预览环境

### 方式二：GitHub 集成（推荐）

1. **推送代码到 GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **登录 Vercel**
   - 访问 https://vercel.com
   - 使用 GitHub 登录

3. **导入项目**
   - 点击 "Add New" → "Project"
   - 选择你的 GitHub 仓库

4. **配置环境变量**
   - 在 Vercel 控制台添加 `.env.local` 中的变量
   - 特别注意：`DATABASE_URL`（如使用 Supabase/Neon 云数据库）

5. **部署**
   - 点击 "Deploy"

---

## 🐛 常见问题

### 依赖安装失败？

```bash
# 清理后重新安装
rmdir /s /q node_modules
npm cache clean --force
npm install
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

### 数据库连接失败？

```bash
# 使用 Docker 启动 PostgreSQL
docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres

# 或使用云数据库（推荐）
# - Supabase: https://supabase.com
# - Neon: https://neon.tech
# - Railway: https://railway.app
```

---

## 📱 访问项目

启动成功后，浏览器访问：

| 页面 | 地址 |
|------|------|
| 首页 | http://localhost:3000 |
| AI 对话 | http://localhost:3000/ai/chat |
| 面相分析 | http://localhost:3000/ai/fortune |
| 导师预约 | http://localhost:3000/reservation/mentor |
| 课程页面 | http://localhost:3000/courses |

---

## 📦 部署到生产环境

### 1. Vercel（推荐）

```bash
# 方式一：命令行
npx vercel --prod

# 方式二：GitHub 集成（自动部署）
# 推送代码到 GitHub，Vercel 自动部署
```

### 2. 环境变量

在 Vercel 中添加以下环境变量：

```env
NODE_ENV=production
DATABASE_URL=你的生产数据库URL
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=生产环境密钥
MINIMAX_API_KEY=你的API Key
# ... 其他变量
```

---

**祝您使用愉快！** 🎉
