@echo off
chcp 65001 >nul
echo ========================================
echo    AI 国学智慧平台 - 阿里云/腾讯云部署
echo ========================================
echo.

set /p SERVER_IP="请输入服务器IP地址: "
set /p USERNAME="请输入用户名 (默认root): "
if "%USERNAME%"=="" set USERNAME=root

set LOCAL_DIR=%~dp0
set PROJECT_DIR=/root/ai-guoxue-web

echo.
echo [1/5] 检查环境...
echo.

REM 检查是否安装了 SSH
where scp >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未找到 SSH 客户端
    echo 请安装 Git for Windows: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo    ✓ SSH 客户端已安装

echo.
echo [2/5] 配置环境变量...
echo.

if exist "%LOCAL_DIR%\.env.production" (
    echo    找到 .env.production 文件
) else (
    echo    未找到 .env.production，正在创建...
    (
        echo NODE_ENV=production
        echo DATABASE_URL=
        echo NEXTAUTH_SECRET=ai-guoxue-secret-key-2024
        echo NEXTAUTH_URL=http://%SERVER_IP%:3000
        echo MINIMAX_API_KEY=sk-cp-jgkFoghk6FkhLWvEiD8z8Yq5rQicE81yVR_8s123GOY9fPGB2atMg4MyteL6-khUuPU_tJXWVGA7iE-kPcXfYxn32El50tNN6mJbCBhPvfC_cFQw-zHY0fo
    ) > "%LOCAL_DIR%\.env.production"
    echo    已创建 .env.production，请编辑填写数据库信息
)

echo.
echo [3/5] 上传项目到服务器...
echo.
echo    服务器: %USERNAME%@%SERVER_IP%
echo    路径: %PROJECT_DIR%
echo.
echo    正在上传...
echo    (首次上传可能需要几分钟)
echo.

REM 上传项目
scp -r "%LOCAL_DIR%*.*" "%USERNAME%@%SERVER_IP%:%PROJECT_DIR%/" 2>nul

if %errorlevel% neq 0 (
    echo    上传部分文件失败，尝试上传关键文件...
    scp "%LOCAL_DIR%package.json" "%USERNAME%@%SERVER_IP%:%PROJECT_DIR%/"
    scp "%LOCAL_DIR%.env.production" "%USERNAME%@%SERVER_IP%:%PROJECT_DIR%/"
)

echo    ✓ 项目已上传

echo.
echo [4/5] 在服务器上安装依赖并构建...
echo.
echo    正在执行命令...
echo.

ssh %USERNAME%@%SERVER_IP% "cd %PROJECT_DIR% && npm install 2>&1 | tail -5"

echo.
echo    正在构建...
ssh %USERNAME%@%SERVER_IP% "cd %PROJECT_DIR% && npm run build 2>&1 | tail -10"

echo.
echo [5/5] 启动服务...
echo.

ssh %USERNAME%@%SERVER_IP% "cd %PROJECT_DIR% && pm2 restart ai-guoxue-web 2>nul || (npm install -g pm2 >nul 2>&1 && pm2 start npm --name 'ai-guoxue-web' -- run dev -- --hostname 0.0.0.0)"

echo.
echo ========================================
echo    部署完成！
echo ========================================
echo.
echo    访问地址: http://%SERVER_IP%:3000
echo.
echo    管理命令:
echo    - 查看状态: ssh %USERNAME%@%SERVER_IP% pm2 status
echo    - 查看日志: ssh %USERNAME%@%SERVER_IP% pm2 logs ai-guoxue-web
echo    - 重启服务: ssh %USERNAME%@%SERVER_IP% pm2 restart ai-guoxue-web
echo.
echo ========================================
pause
