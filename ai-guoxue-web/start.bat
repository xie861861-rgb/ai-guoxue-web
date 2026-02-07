@echo off
echo ===========================================
echo   AI 国学智慧平台 - 启动脚本
echo ===========================================
echo.

cd /d "%~dp0"

echo [1/4] 检查环境...
if not exist node_modules (
  echo   正在安装依赖，请稍候...
  npm install --no-audit --no-fund
  echo   依赖安装完成！
) else (
  echo   依赖已安装 ✓
)

echo.
echo [2/4] 检查环境变量...
if not exist .env.local (
  echo   .env.local 不存在，正在创建...
  copy .env.example .env.local >nul
  echo   请编辑 .env.local 添加豆包 API Key！
) else (
  echo   环境变量已配置 ✓
)

echo.
echo [3/4] 生成 Prisma 客户端...
npx prisma generate

echo.
echo [4/4] 启动开发服务器...
echo.
echo   项目将在 http://localhost:3000 启动
echo   按 Ctrl+C 停止服务器
echo.
npm run dev

pause
