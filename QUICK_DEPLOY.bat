@echo off
chcp 65001 >nul
echo ========================================
echo    AI 国学智慧平台 - Vercel 一键部署
echo ========================================
echo.

echo [1/4] 打开 Vercel 部署页面...
echo.
echo    即将打开浏览器进行部署...
echo.
timeout /t 2 >nul

start "" "https://vercel.com/new/import?repository-url=https://github.com/xie861861-rgb/ai-guoxue-web&title=AI%20%E5%9B%BD%E5%AD%A6%E6%99%BA%E6%85%A7%E5%B9%B3%E5%8F%B0&env=NEXTAUTH_SECRET,NEXTAUTH_URL,DATABASE_URL,MINIMAX_API_KEY"

echo.
echo [2/4] 部署步骤：
echo.
echo    ========================================
echo    步骤 1: 点击 "Continue with GitHub"
echo    步骤 2: 授权访问你的 GitHub
echo    步骤 3: 点击 "Deploy"
echo    ========================================
echo.
echo    ⚠️ 如果还没登录 GitHub，请先登录！
echo.
echo [3/4] 环境变量配置（部署后设置）：
echo.
echo    在 Vercel 项目设置中添加：
echo    ----------------------------------------
echo    NEXTAUTH_URL = (你的 Vercel 域名，部署后填写)
echo    NEXTAUTH_SECRET = ai-guoxue-secret-key-2024
echo    MINIMAX_API_KEY = sk-cp-jgkFoghk6FkhLWvEiD8z8Yq5rQicE81yVR_8s123GOY9fPGB2atMg4MyteL6-khUuPU_tJXWVGA7iE-kPcXfYxn32El50tNN6mJbCBhPvfC_cFQw-zHY0fo
echo    ----------------------------------------
echo.
echo [4/4] 等待部署完成...
echo.
echo    部署成功后，你会看到访问地址，例如：
echo    https://ai-guoxue-web.vercel.app
echo.
echo    复制该地址，发送给我！
echo.
echo ========================================
pause
