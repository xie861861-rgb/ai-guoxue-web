# AI 国学智慧平台 - GitHub + Vercel 部署指南

## 🚀 一键部署（推荐）

### 步骤 1：运行部署脚本
```bash
双击 GITHUB_DEPLOY.bat
```

### 步骤 2：配置 Vercel
1. 点击 "Continue" 
2. 选择 GitHub 仓库: `xie861861-rgb/ai-guoxue-web`
3. 配置环境变量（可选）：
   - `DATABASE_URL`: Supabase 连接字符串
   - `MINIMAX_API_KEY`: MiniMax API Key
4. 点击 "Deploy"

### 步骤 3：等待部署
- 首次部署约 2-5 分钟
- 部署成功后获取访问地址

---

## 🔧 手动部署到 Vercel

### 方法一：通过浏览器

1. 访问: https://vercel.com/import/project
2. 点击 "Continue with GitHub"
3. 选择仓库: `xie861861-rgb/ai-guoxue-web`
4. 点击 "Deploy"

### 方法二：通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel --prod
```

---

## 🔐 环境变量配置

在 Vercel 项目设置中添加以下环境变量：

| 变量名 | 值 | 必填 |
|--------|-----|------|
| `DATABASE_URL` | Supabase 连接字符串 | ❌ (可选，演示模式可正常) |
| `MINIMAX_API_KEY` | MiniMax API Key | ✅ |
| `NEXTAUTH_URL` | 你的 Vercel 域名 | ✅ |
| `NEXTAUTH_SECRET` | 随机字符串 | ✅ |

---

## 🌐 访问地址

部署成功后，你将获得一个访问地址，例如：
- `https://ai-guoxue-web.vercel.app`
- `https://ai-guoxue-web-xxx.vercel.app`

---

## 🔄 自动部署

配置完成后，每次推送代码到 `main` 分支，Vercel 会自动重新部署！

```bash
# 本地修改后
git add .
git commit -m "fix: xxx"
git push origin main

# Vercel 自动部署...
```

---

## 📋 当前状态

| 项目 | 状态 |
|------|------|
| ✅ GitHub 仓库 | https://github.com/xie861861-rgb/ai-guoxue-web |
| ⏳ Vercel 部署 | 待配置 |
| ⏳ 自定义域名 | 可选 |

---

## 🎯 后续优化

### 1. 配置自定义域名
在 Vercel 项目设置 → Domains 中添加自定义域名

### 2. 配置 Supabase 数据库
参考 `SUPABASE_SETUP.md` 配置云数据库

### 3. 配置 CI/CD
GitHub Actions 会自动检查代码质量

---

## ❓ 常见问题

### Q: 部署失败怎么办？
A: 检查环境变量是否配置正确，特别是 `NEXTAUTH_SECRET`

### Q: 如何更新已部署的网站？
A: 推送代码到 GitHub，Vercel 会自动更新

### Q: 如何绑定自定义域名？
A: 在 Vercel 项目设置 → Domains 中添加域名

---

## 📞 获取帮助

如有问题，请查看：
- `OPS_GUIDE.md` - 运维指南
- `SUPABASE_SETUP.md` - 数据库配置
- Vercel 官方文档: https://vercel.com/docs
