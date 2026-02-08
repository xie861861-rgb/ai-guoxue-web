@echo off
chcp 65001 >nul
echo ========================================
echo    AI 国学智慧平台 - 一键启动
echo ========================================
echo.

set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%"

echo [1/3] 检查端口 3000...
netstat -ano | findstr :3000 >nul
if %errorlevel% equ 0 (
    echo    ⚠️ 端口 3000 已被占用
    echo    尝试关闭占用进程...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
        taskkill /PID %%a /F 2>nul
    )
    timeout /t 2 >nul
    echo.
)

echo [2/3] 启动开发服务器...
echo.
echo    ========================================
echo    访问地址: http://localhost:3000
echo    后台管理: http://localhost:3000/admin
echo    用户中心: http://localhost:3000/dashboard
echo    ========================================
echo.
echo    按 Ctrl+C 停止服务器
echo.
echo npm run dev --hostname 0.0.0.0
echo.

cd /d "%PROJECT_DIR%"
npm run dev --hostname 0.0.0.0
