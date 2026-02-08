@echo off
chcp 65001 >nul
echo ===========================================
echo   AI 国学智慧平台 - Vercel 一键部署脚本
echo ===========================================
echo.

cd /d "%~dp0"

echo [1/5] 检查环境...
node --version >nul 2>&1
if errorlevel 1 (
  echo   ❌ Node.js 未安装
  exit /b 1
)

echo [2/5] 检查 Vercel CLI...
npx vercel --version >nul 2>&1
if errorlevel 1 (
  echo   ⚠️ 正在安装 Vercel CLI...
  npm install -g vercel
)

echo [3/5] 构建项目...
echo   执行 npm run build ...
call npm run build
if errorlevel 1 (
  echo   ❌ 构建失败，请修复错误后重试
  exit /b 1
)
echo   ✅ 构建成功

echo [4/5] 部署到 Vercel...
echo   登录 Vercel（如未登录）...
npx vercel login

echo.
echo [5/5] 开始部署...
echo   选择部署目标环境：
echo     1) 生产环境 (Production)
echo     2) 预览环境 (Preview)
echo     3) 开发环境 (Development)
set /p choice="请选择 (1-3): "

if "%choice%"=="1" (
  echo   部署到生产环境...
  npx vercel --prod --yes
) else if "%choice%"=="2" (
  echo   部署到预览环境...
  npx vercel --yes
) else (
  echo   部署到开发环境（预览模式）...
  npx vercel --dev
)

echo.
echo ===========================================
echo   ✅ 部署完成！
echo ===========================================

pause
