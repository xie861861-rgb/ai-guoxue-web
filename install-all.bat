@echo off
chcp 65001 >nul
echo ===========================================
echo   AI 国学智慧平台 - 完整环境安装脚本
echo ===========================================
echo.

cd /d "%~dp0"

echo [1/6] 检查 Node.js 环境...
node --version
if errorlevel 1 (
  echo   ❌ Node.js 未安装，请先安装 Node.js 18+
  exit /b 1
)
echo   ✅ Node.js 已安装

echo.
echo [2/6] 检查并安装项目依赖...
if not exist node_modules (
  echo   正在安装依赖包，请稍候（首次需要3-5分钟）...
  npm install --no-audit --no-fund --loglevel=error
  if errorlevel 1 (
    echo   ❌ 依赖安装失败，尝试清理缓存后重试...
    npm cache clean --force
    npm install --no-audit --no-fund
  )
) else (
  echo   ✅ node_modules 已存在
)

echo.
echo [3/6] 生成 Prisma 客户端...
npx prisma generate
if errorlevel 1 (
  echo   ⚠️ Prisma 生成失败，但继续尝试...
)

echo.
echo [4/6] 检查环境变量...
if not exist .env.local (
  echo   正在从模板创建 .env.local...
  copy .env.example .env.local >nul
  echo   ⚠️ 请编辑 .env.local 添加 API Keys！
) else (
  echo   ✅ .env.local 已配置
)

echo.
echo [5/6] 构建项目（测试构建）...
echo   执行 npm run build ...
call npm run build >nul 2>&1
if errorlevel 1 (
  echo   ⚠️ 构建发现问题，请检查错误日志
) else (
  echo   ✅ 构建成功
)

echo.
echo [6/6] 安装完成！
echo.
echo   ✅ 所有依赖安装完成！
echo.
echo   启动开发服务器:
echo   npm run dev
echo.
echo   访问: http://localhost:3000
echo.
echo ===========================================

pause
