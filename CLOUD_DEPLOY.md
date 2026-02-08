# AI 国学智慧平台 - 国内云服务器部署方案

## 🚀 快速开始

### 选项 1：阿里云/腾讯云服务器 (推荐)

购买服务器后，运行：
```bash
# 1. 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 2. 克隆并部署
git clone https://github.com/xie861861-rgb/ai-guoxue-web.git
cd ai-guoxue-web

# 3. 配置环境变量
cp .env.example .env
nano .env  # 编辑填写配置

# 4. 一键启动
chmod +x deploy-aliyun.sh
./deploy-aliyun.sh
```

### 选项 2：使用 Docker

```bash
# 构建镜像
docker build -t ai-guoxue-web .

# 运行容器
docker run -d -p 3000:3000 --name ai-guoxue \
  -e NODE_ENV=production \
  -e DATABASE_URL=你的数据库连接 \
  -e NEXTAUTH_SECRET=你的密钥 \
  -e MINIMAX_API_KEY=你的API密钥 \
  ai-guoxue-web
```

---

## 📦 购买服务器推荐

### 阿里云 (国内首选)

| 配置 | 价格 | 链接 |
|------|------|------|
| 2核2G 5Mbps | ¥69/月 | https://www.aliyun.com/ |
| 2核4G 10Mbps | ¥119/月 | ECS突发性能实例 |

### 腾讯云 (性价比高)

| 配置 | 价格 | 链接 |
|------|------|------|
| 2核2G 5Mbps | ¥58/月 | https://cloud.tencent.com/ |
| 2核4G 8Mbps | ¥106/月 | CVM标准型S5 |

---

## 🔧 必备工具

### Windows 本地需要

1. **Git for Windows**: https://git-scm.com/download/win
2. **PuTTY / Xshell**: SSH 客户端
3. **Docker Desktop**: https://www.docker.com/products/docker-desktop/

---

## 📋 部署清单

### 1. 购买服务器
- 建议配置: 2核2G 起
- 操作系统: Ubuntu 22.04 LTS
- 带宽: 5Mbps 起

### 2. 安装环境
```bash
# 安装 Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 安装 PM2
npm install -g pm2
```

### 3. 配置防火墙
```bash
# 开放端口
ufw allow 22    # SSH
ufw allow 80     # HTTP
ufw allow 443    # HTTPS
ufw allow 3000  # 应用端口
ufw enable
```

### 4. 配置域名 (可选)
- 阿里云/腾讯云控制台添加域名解析
- 申请 SSL 证书 (免费)

---

## 🎯 推荐方案

### 简单方案 (适合个人/测试)

直接运行：
```bash
git clone https://github.com/xie861861-rgb/ai-guoxue-web.git
cd ai-guoxue-web
npm install
npm run dev -- --hostname 0.0.0.0
```

### 生产方案 (推荐)

使用 PM2 + Nginx：
```bash
# 1. 构建
npm run build

# 2. 使用 PM2 运行
pm2 start npm --name "ai-guoxue" -- run start

# 3. 配置 Nginx 反向代理
```

### 容器方案 (企业级)

使用 Docker Compose：
```bash
docker-compose up -d
```

---

## 💰 成本对比

| 方案 | 月成本 | 适用场景 |
|------|--------|----------|
| 阿里云 ECS (2核2G) | ¥70 | 中小型项目 |
| 腾讯云 CVM (2核2G) | ¥58 | 中小型项目 |
| Vercel (免费) | ¥0 | 静态页面/演示 |
| 本地服务器 | ¥0 | 开发测试 |

---

## 📞 售后支持

如需帮助，请提供：
1. 服务器 IP 地址
2. 遇到的具体错误信息
3. 截图或日志

---

## ✅ 成功案例

项目已配置好以下文件：
- `CLOUD_DEPLOY.bat` - 一键部署脚本
- `Dockerfile` - Docker 构建文件
- `docker-compose.yml` - 容器编排
- `OPS_GUIDE.md` - 运维指南
