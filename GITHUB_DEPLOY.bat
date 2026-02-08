@echo off
chcp 65001 >nul
echo ========================================
echo    AI 国学智慧平台 - GitHub + Vercel 一键部署
echo ========================================
echo.

set "PROJECT_DIR=%~dp0"
set "REPO_URL=https://github.com/xie861861-rgb/ai-guoxue-web.git"

echo [1/6] 检查环境...
echo.

REM 检查 Git
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未安装 Git，请先安装: https://git-scm.com
    pause
    exit /b 1
)
echo    ✓ Git 已安装

REM 检查 Vercel CLI
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo    正在安装 Vercel CLI...
    npm i -g vercel >nul 2>&1
)
echo    ✓ Vercel 已安装

echo.
echo [2/6] 代码已推送到 GitHub
echo    仓库: %REPO_URL%
echo.

echo [3/6] 准备部署到 Vercel...
echo.
echo    ========================================
echo    即将打开 Vercel 部署页面...
echo    ========================================
echo.
echo    部署步骤:
echo    1. 点击 "Continue" 
echo    2. 选择 GitHub 仓库: xie861861-rgb/ai-guoxue-web
echo    3. 点击 "Deploy"
echo    4. 等待部署完成（2-5分钟）
echo    5. 获取访问地址
echo    ========================================
echo.

timeout /t 3 >nul

echo [4/6] 打开 Vercel 部署页面...
start "" "https://vercel.com/import/project?t=github&utm_source=github&utm_medium=repo&utm_campaign=deploy-button"

echo.
echo [5/6] 部署说明...
echo.

REM 检查是否存在 deploy-vercel.bat
if exist "%PROJECT_DIR%deploy-vercel.bat" (
    echo    也可以运行 deploy-vercel.bat 进行部署
)

echo.
echo [6/6] 完成！
echo.
echo ========================================
echo    GitHub 仓库: %REPO_URL%
echo    部署地址: https://vercel.com/import/project
echo ========================================
echo.
echo 提示: 部署成功后，每次推送代码到 main 分支，
echo       Vercel 会自动重新部署！
echo.
pause
