# AI 国学智慧平台 - Supabase 数据库配置指南
# ================================

## 📦 第一步：创建 Supabase 项目

### 1. 访问 Supabase 官网
打开浏览器访问：https://supabase.com

### 2. 注册/登录账号
- 使用 GitHub 或邮箱注册
- 免费套餐足够开发使用

### 3. 创建新项目
1. 点击 "New Project"
2. 填写项目名称：`ai-guoxue`
3. 设置数据库密码：**请记住这个密码！**
4. 选择区域：**建议选择 Tokyo (亚太地区)**
5. 点击 "Create new project"

### 4. 获取连接信息
创建完成后，在项目设置中找到：
- **Host**: `your-project.supabase.co`
- **Database**: `postgres`
- **User**: `postgres`
- **Password**: 你设置的密码

---

## 🔧 第二步：配置环境变量

编辑项目根目录下的 `.env.local` 文件：

```env
# ============= 数据库 =============
# Supabase 连接字符串格式
DATABASE_URL="postgresql://postgres:你的密码@你的项目.supabase.co:5432/postgres?schema=public"

# 示例（替换为你的实际信息）：
# DATABASE_URL="postgresql://postgres:mypassword123@abc123.supabase.co:5432/postgres?schema=public"
```

---

## 🗄️ 第三步：创建数据库表

在 Supabase 的 **SQL Editor** 中执行以下 SQL：

```sql
-- 用户表
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 导师表
CREATE TABLE mentors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    title VARCHAR(100),
    specialty VARCHAR(255),
    bio TEXT,
    price DECIMAL(10,2),
    rating DECIMAL(3,2) DEFAULT 4.5,
    students_count INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'offline',
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 课程表
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    cover_url TEXT,
    price DECIMAL(10,2),
    duration INT,
    level VARCHAR(50),
    mentor_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 预约表
CREATE TABLE reservations (
    id SERIAL PRIMARY KEY,
    user_id INT,
    mentor_id INT,
    title VARCHAR(255),
    date DATE NOT NULL,
    time_slot VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 会员表
CREATE TABLE memberships (
    id SERIAL PRIMARY KEY,
    user_id INT UNIQUE NOT NULL,
    level VARCHAR(50) DEFAULT 'basic',
    start_date DATE,
    end_date DATE,
    total_spent DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI 对话记录表
CREATE TABLE chat_histories (
    id SERIAL PRIMARY KEY,
    user_id INT,
    message TEXT NOT NULL,
    response TEXT,
    model VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

执行后点击 **"Run"** 创建表。

---

## 📊 第四步：查看数据库

1. 在 Supabase 左侧菜单点击 **"Table Editor"**
2. 可以看到刚创建的表
3. 点击表名可以查看数据

---

## 🔐 第五步：安全设置（RLS）

为每个表启用 Row Level Security：

```sql
-- 启用 RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentors ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_histories ENABLE ROW LEVEL SECURITY;

-- 创建策略（示例：用户只能查看自己的数据）
CREATE POLICY "Users can view own data" ON users
    FOR SELECT USING (auth.uid() = id);
```

---

## 🚀 第六步：重启应用

修改 `.env.local` 后，重启服务：

```bash
# 如果已安装 Windows 服务
net stop AIGuoxueWeb
net start AIGuoxueWeb

# 或者在开发模式下
npm run dev
```

---

## ✅ 验证数据库连接

在 Supabase 中打开 **"Project Settings"** → **"Database"**，
找到 **"Connection string"**，确保格式正确。

---

## 💰 Supabase 免费套餐包含

- 数据库：500MB
- 每月 API 请求：50,000 次
- 存储：1GB
- 足够开发和小规模使用！

---

## 📞 常见问题

### Q: 连接失败？
A: 检查密码是否正确，确保 Supabase 项目状态为 "Active"

### Q: 如何备份数据？
A: Supabase 自动每日备份，可在设置中手动导出

### Q: 需要更多存储？
A: 可在 Supabase 中升级到付费套餐
