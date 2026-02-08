@echo off
chcp 65001 >nul
echo ========================================
echo    AI 国学智慧平台 - 后台服务安装
echo ========================================
echo.

REM 检查是否以管理员权限运行
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 请以管理员身份运行此脚本！
    echo 右键点击此文件，选择"以管理员身份运行"
    pause
    exit /b 1
)

echo [1/5] 正在检查 Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未找到 Node.js，请先安装 Node.js
    pause
    exit /b 1
)
echo    ✓ Node.js 已安装

echo [2/5] 正在停止旧服务（如果有）...
sc stop "AIGuoxueWeb" >nul 2>&1
sc delete "AIGuoxueWeb" >nul 2>&1
echo    ✓ 旧服务已清理

echo [3/5] 正在创建服务...
REM 获取项目路径
set "PROJECT_DIR=%~dp0"
set "PROJECT_DIR=%PROJECT_DIR:~0,-1%"

REM 创建 NSSM 配置文件
echo Creating NSSM config...
(
echo nssmset NO_CONSOLE 1
echo nssm AppDirectory %PROJECT_DIR%
echo nssm AppParameters npm run dev --hostname 0.0.0.0
echo nssm AppExit Default Restart
echo nssm AppRestartDelay 5000
echo nssm DisplayName AI 国学智慧平台
echo nssm Description AI 国学智慧平台 - 智能国学咨询平台
echo nssm Start SERVICE_AUTO_START
echo nssm AppStdout %PROJECT_DIR%\logs\stdout.log
echo nssm AppStderr %PROJECT_DIR%\logs\stderr.log
echo nssm AppRotateFiles 1
echo nssm AppRotateOnline 1
echo nssm AppRotateBytes 1048576
) > "%TEMP%\nssm.conf"

REM 检查是否有 nssm
where /q nssm
if %errorlevel% neq 0 (
    echo [4/5] 正在安装 NSSM（服务管理工具）...
    choco install nssm -y >nul 2>&1
    if %errorlevel% neq 0 (
        echo    尝试使用 winget 安装...
        winget install nssm -e >nul 2>&1
    )
)

REM 安装服务
echo [4/5] 正在安装服务...
nssm install "AIGuoxueWeb" "%PROJECT_DIR%" >nul 2>&1
nssm set "AIGuoxueWeb" AppParameters "npm run dev --hostname 0.0.0.0" >nul 2>&1
nssm set "AIGuoxueWeb" DisplayName "AI 国学智慧平台" >nul 2>&1
nssm set "AIGuoxueWeb" Description "AI 国学智慧平台 - 智能国学咨询平台" >nul 2>&1
nssm set "AIGuoxueWeb" Start SERVICE_AUTO_START >nul 2>&1
nssm set "AIGuoxueWeb" AppExit Default Restart >nul 2>&1
nssm set "AIGuoxueWeb" AppRestartDelay 5000 >nul 2>&1
nssm set "AIGuoxueWeb" AppStdout "%PROJECT_DIR%\logs\stdout.log" >nul 2>&1
nssm set "AIGuoxueWeb" AppStderr "%PROJECT_DIR%\logs\stderr.log" >nul 2>&1
nssm set "AIGuoxueWeb" AppStdoutCreationDisposition 4 >nul 2>&1
nssm set "AIGuoxueWeb" AppStderrCreationDisposition 4 >nul 2>&1

REM 创建日志目录
mkdir "%PROJECT_DIR%\logs" >nul 2>&1

echo [5/5] 正在启动服务...
net start "AIGuoxueWeb" >nul 2>&1

echo.
echo ========================================
echo    服务安装完成！
echo ========================================
echo.
echo 服务状态: 已启动
访问地址: http://localhost:3000
日志位置: %PROJECT_DIR%\logs\
echo.
echo 管理命令:
echo   停止服务: net stop AIGuoxueWeb
echo   启动服务: net start AIGuoxueWeb
echo   查看日志: type %PROJECT_DIR%\logs\stdout.log
echo.
pause
