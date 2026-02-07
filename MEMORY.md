# 长期记忆

## AI + 国学（Guoxue）网站项目

### 项目概述
- **目标**: 为高净值企业家打造的高端 AI + 国学平台
- **定位**: "企业家的精神 Sanctuary"
- **核心功能**: AI 聊天、面相解读、道家咨询、风水顾问、导师预约、课程学习

### 技术架构
- **框架**: Next.js 14 + TypeScript + TailwindCSS
- **AI 模型**: Minimax (abab6.5s-chat)
- **设计风格**: 中国红(#8B0000) + 金色(#D4AF37) + 墨黑(#1A1A1A)

### 关键决策
- 从豆包(Doubao)切换到 Minimax AI 模型
- API 端点: `https://api.minimax.chat/v1`
- 模型: `abab6.5s-chat`（快速响应）和 `abab6.5-chat`（更强理解力）

### 项目位置
- 路径: `C:\Users\Administrator\.openclaw\workspace\ai-guoxue-web\`
- 页面数: 11+ 完整页面

### API 配置
- Minimax API Key: 已配置在 .env.local
- API 路由: `src/app/api/ai/chat/route.ts`
- 客户端库: `src/lib/minimax/client.ts`

### 用户需求
- 线下测试项目
- 部署到线上环境
- 可选: GitHub 托管

### 待办事项
- [ ] 完成 npm 依赖安装
- [ ] 本地测试所有功能
- [ ] 部署到 Vercel
- [ ] 配置自定义域名（可选）
