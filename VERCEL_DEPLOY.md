# AI 国学智慧平台 - Vercel 部署指南

## 🚀 手动部署步骤

### 步骤 1：访问 Vercel
打开浏览器访问：
```
https://vercel.com/new/import?repository-url=https://github.com/xie861861-rgb/ai-guoxue-web
```

### 步骤 2：登录 GitHub
- 点击 "Continue with GitHub"
- 授权 Vercel 访问你的 GitHub 仓库

### 步骤 3：配置项目
1. **Project Name**: `ai-guoxue-web` (自动填充)
2. **Framework Preset**: `Next.js` (自动检测)
3. **Root Directory**: `.` (保持默认)
4. **Output Directory**: `.next` (保持默认)

### 步骤 4：配置环境变量（关键！）
在 "Environment Variables" 部分添加以下变量：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| `NEXTAUTH_URL` | (部署后填写，如 `https://ai-guoxue-web.vercel.app`) | 站点地址 |
| `NEXTAUTH_SECRET` | `ai-guoxue-secret-key-2024-dev` | 随机字符串 |
| `MINIMAX_API_KEY` | `sk-cp-jgkFoghk6FkhLWvEiD8z8Yq5rQicE81yVR_8s123GOY9fPGB2atMg4MyteL6-khUuPU_tJXWVGA7iE-kPcXfYxn32El50tNN6mJbCBhPvfC_cFQw-zHY0fo` | MiniMax API |
| `DATABASE_URL` | (可选) Supabase 连接字符串 | 云数据库 |

### 步骤 5：部署
- 点击 **"Deploy"**
- 等待 2-5 分钟
- 获取访问地址！

---

## 🔧 部署失败排查

### 常见错误 1：Node.js 版本不兼容
**错误**：`Error: Node.js version mismatch`
**解决**：在 Vercel 项目设置中，将 Node.js 版本改为 18.x

### 常见错误 2：环境变量缺失
**错误**：`Error: NEXTAUTH_SECRET is not defined`
**解决**：在项目设置 → Environment Variables 中添加所有必需的环境变量

### 常见错误 3：构建超时
**错误**：`Build timed out`
**解决**：
1. 检查 `next.config.mjs` 是否正确配置
2. 确保没有过大的依赖

---

## 🌐 部署后的配置

### 1. 设置访问权限
- 进入 Vercel 项目 → Settings → General
- 找到 **"Make Public"** 或 **"Visibility"**
- 确保设置为 **Public**

### 2. 配置自定义域名（可选）
- Settings → Domains
- 添加你的域名（如 `guoxue.example.com`）

### 3. 更新 NEXTAUTH_URL
部署成功后：
1. 复制访问地址（如 `https://ai-guoxue-web.vercel.app`）
2. 进入 Settings → Environment Variables
3. 修改 `NEXTAUTH_URL` 为实际地址

---

## 🔄 自动部署

配置完成后，每次推送到 GitHub main 分支，Vercel 会自动重新部署！

```bash
# 本地修改后
git add .
git commit -m "更新内容"
git push origin main

# Vercel 自动部署...
```

---

## ✅ 检查清单

部署前请确认：

- [ ] Node.js 版本 >= 18
- [ ] 环境变量已配置
- [ ] NEXTAUTH_SECRET 已设置
- [ ] MINIMAX_API_KEY 已设置

---

## 📞 获取帮助

如有问题，请联系或查看：
- Vercel 文档: https://vercel.com/docs
- Next.js 文档: https://nextjs.org/docs
