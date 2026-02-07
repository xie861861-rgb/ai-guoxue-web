# AI 国学智慧平台 - 企业家精神道场

<div align="center">

![Logo](public/images/logo.png)

**为高端企业家提供国学智慧与精神成长的高端服务平台**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8)](https://tailwindcss.com/)
[![豆包](https://img.shields.io/badge/Model-豆包 Pro-orange)](https://www.volcengine.com/)

</div>

---

## 🎯 项目简介

AI 国学智慧平台是一个融合人工智能与传统国学的高端服务平台，专为企业家、商业领袖打造的精神道场。

### 核心功能

- 🤖 **AI 国学智能体** - 基于豆包大模型的智能国学顾问
  - 面相分析
  - 风水指导
  - 儒家/道家/易经经典解读
- 📅 **预约系统** - 高端国学名师一对一咨询
- 🎓 **精品课程** - 小班制国学研修班
- 👑 **会员体系** - 尊享 VIP 专属服务

### 目标用户

- 高净值企业家
- 企业高管
- 商业领袖
- 对传统文化感兴趣的高端人群

---

## 🛠️ 技术栈

### 前端
- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: TailwindCSS
- **组件库**: Radix UI + Shadcn/UI
- **动画**: Framer Motion

### 后端
- **运行时**: Next.js API Routes
- **ORM**: Prisma
- **认证**: NextAuth.js

### AI
- **大模型**: 豆包 Pro (Doubao)
- **提供商**: 火山引擎

### 数据库
- **主数据库**: PostgreSQL
- **缓存**: Redis

### 部署
- **前端**: Vercel
- **后端**: Railway / Render
- **数据库**: Supabase

---

## 📁 项目结构

```
ai-guoxue-web/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # 首页
│   │   ├── layout.tsx         # 根布局
│   │   ├── globals.css       # 全局样式
│   │   ├── (public)/          # 公开页面
│   │   ├── ai/                # AI 模块
│   │   │   ├── chat/         # AI 对话页面
│   │   │   └── fortune/      # 面相分析页面
│   │   ├── reservation/       # 预约系统
│   │   │   └── mentor/       # 导师预约
│   │   ├── courses/          # 课程页面
│   │   ├── dashboard/        # 用户仪表盘
│   │   └── api/              # API 路由
│   │       └── ai/           # AI 相关 API
│   ├── components/
│   │   ├── ui/               # 基础 UI 组件
│   │   ├── layout/           # 布局组件
│   │   └── features/         # 功能组件
│   ├── lib/
│   │   ├── doubao/          # 豆包 SDK
│   │   ├── prisma/          # Prisma 客户端
│   │   └── utils/           # 工具函数
│   ├── hooks/                # 自定义 Hooks
│   └── types/                # TypeScript 类型
├── prisma/
│   └── schema.prisma         # 数据库 Schema
├── public/                   # 静态资源
├── docs/                      # 文档
└── package.json
```

---

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd ai-guoxue-web
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```env
# 豆包大模型
DOUBAO_API_KEY=your_api_key_here
DOUBAO_MODEL=doubao-pro-32k

# 数据库
DATABASE_URL=postgresql://user:password@localhost:5432/ai_guoxue

# NextAuth
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### 4. 初始化数据库

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

---

## 📦 主要依赖

```json
{
  "next": "^14.1.0",
  "react": "^18.2.0",
  "typescript": "^5.3.3",
  "tailwindcss": "^3.4.1",
  "prisma": "^5.9.0",
  "@prisma/client": "^5.9.0",
  "next-auth": "^4.24.5",
  "openai": "^4.24.1",
  "framer-motion": "^10.18.0",
  "lucide-react": "^0.309.0",
  "zod": "^3.22.4"
}
```

---

## 🎨 设计风格

### 配色方案

| 颜色 | 名称 | 用途 |
|------|------|------|
| `#8B0000` | 中国红 | 主色调 |
| `#D4AF37` | 金色 | 强调色 |
| `#1A1A1A` | 墨黑 | 深色背景 |
| `#F5F0E6` | 宣纸白 | 浅色背景 |

### 设计关键词

- 高端奢华
- 文化底蕴
- 现代简约
- 极简主义

---

## 📱 页面预览

### 首页
- 🎯 核心价值展示
- 🤖 AI 功能入口
- 📅 预约入口
- 👤 用户入口

### AI 对话页面
- 💬 智能国学对话
- 📚 经典分类
- 🎨 现代化 UI

### 预约页面
- 👨‍🏫 导师选择
- 📅 日历选择
- ⏰ 时段选择
- 📝 信息填写

---

## 🔧 配置说明

### 豆包 API 配置

1. 注册火山引擎账号
2. 创建应用获取 API Key
3. 选择模型：doubao-pro-32k 或 doubao-pro-128k

### 数据库配置

支持以下数据库：
- PostgreSQL (推荐)
- MySQL
- MongoDB

### 部署配置

#### Vercel 部署

```bash
npm install -g vercel
vercel
```

#### Docker 部署

```bash
docker build -t ai-guoxue-web .
docker run -p 3000:3000 ai-guoxue-web
```

---

## 📄 API 文档

### AI 对话

```typescript
POST /api/ai/chat
Content-Type: application/json

{
  "message": "什么是仁？",
  "category": "confucian", // optional
  "stream": false // optional
}
```

### 预约

```typescript
POST /api/reservations
Content-Type: application/json

{
  "mentorId": "xxx",
  "date": "2026-02-15",
  "timeSlot": "14:00",
  "contactName": "张三",
  "contactPhone": "13800138000"
}
```

---

## 🤝 贡献指南

1. Fork 本项目
2. 创建分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建一个 Pull Request

---

## 📞 联系方式

- 项目地址: https://github.com/your-username/ai-guoxue-web
- 邮箱: contact@ai-guoxue.com

---

<div align="center">

**让 AI 赋能传统文化，让智慧滋养心灵**

Made with ❤️ for企业家精神道场

</div>
