# AI 国学智慧平台 - 运维指南

## 🚀 快速启动

### 方法一：一键启动（推荐）
```bash
双击 START.bat
```

### 方法二：命令行启动
```bash
cd ai-guoxue-web
npm run dev --hostname 0.0.0.0
```

### 方法三：Windows 服务（后台运行）
```bash
# 安装服务（需要管理员权限）
install-service.bat

# 查看服务状态
net start AIGuoxueWeb

# 停止服务
net stop AIGuoxueWeb
```

---

## 🔧 服务器管理

### 查看服务器日志
```bash
# 实时日志
type logs\stdout.log

# 错误日志
type logs\stderr.log
```

### 端口占用处理
```bash
# 查看占用端口的进程
netstat -ano | findstr :3000

# 关闭进程（替换 PID）
taskkill /PID <PID> /F
```

---

## 🗄️ 数据库配置

### 使用 Supabase 云数据库（推荐）

1. **注册 Supabase**: https://supabase.com
2. **创建项目**: 获取连接字符串
3. **配置环境变量**: 编辑 `.env.local`

详细步骤请查看：`SUPABASE_SETUP.md`

### 当前状态
- ❌ 未配置（使用本地演示数据）
- ✅ 登录/注册功能正常（演示模式）
- ⚠️ 完整功能需要 Supabase

---

## 📋 演示账户

| 用户名 | 密码 | 用途 |
|--------|------|------|
| `admin` | `admin123` | 后台管理 |
| `demo` | `demo123` | 用户中心 |
| `test` | `test123` | 用户中心 |

---

## 🌐 访问地址

| 页面 | 地址 |
|------|------|
| 首页 | http://localhost:3000 |
| 登录 | http://localhost:3000/login |
| 注册 | http://localhost:3000/register |
| 用户中心 | http://localhost:3000/dashboard |
| 后台管理 | http://localhost:3000/admin |

---

## 🔧 故障排查

### Q: 网站打不开？
A: 检查服务器是否运行，双击 START.bat

### Q: 登录失败？
A: 使用演示账户，或配置数据库后注册新用户

### Q: 样式丢失？
A: 清除浏览器缓存 `Ctrl+Shift+Delete`

### Q: 端口被占用？
A: 运行 `taskkill /PID <PID> /F` 关闭占用进程

---

## 📞 获取帮助

如有问题，请联系技术支持或查看：
- `SUPABASE_SETUP.md` - 数据库配置
- `START_GUIDE.md` - 完整启动指南
