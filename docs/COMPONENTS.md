# 🎨 AI + 国学网站组件库设计

## 📦 使用技术

- **Shadcn/UI** - 基于 Radix UI 的高质量组件库
- **TailwindCSS** - 实用优先的 CSS 框架
- **Lucide React** - 图标库
- **Framer Motion** - 动画库

---

## 📁 组件结构

```
src/components/
├── ui/                          # 基础 UI 组件 (Shadcn)
│   ├── button/
│   ├── input/
│   ├── card/
│   ├── dialog/
│   ├── dropdown-menu/
│   ├── select/
│   ├── textarea/
│   ├── label/
│   ├── checkbox/
│   ├── radio-group/
│   ├── slider/
│   ├── switch/
│   ├── tabs/
│   ├── badge/
│   ├── avatar/
│   ├── toast/
│   └── ...
│
├── features/                    # 功能组件
│   ├── ai-chat/                 # AI 对话组件
│   │   ├── ChatWindow.tsx       # 对话窗口
│   │   ├── ChatInput.tsx        # 输入框
│   │   ├── ChatMessage.tsx      # 消息气泡
│   │   └── ChatSidebar.tsx      # 对话历史侧边栏
│   │
│   ├── article/                  # 文章组件
│   │   ├── ArticleCard.tsx      # 文章卡片
│   │   ├── ArticleList.tsx      # 文章列表
│   │   ├── ArticleDetail.tsx    # 文章详情
│   │   └── ArticleToc.tsx       # 目录
│   │
│   ├── course/                   # 课程组件
│   │   ├── CourseCard.tsx       # 课程卡片
│   │   ├── CourseList.tsx       # 课程列表
│   │   ├── CourseDetail.tsx     # 课程详情
│   │   ├── CoursePlayer.tsx     # 视频播放器
│   │   ├── CourseProgress.tsx  # 学习进度
│   │   └── CourseClassList.tsx  # 章节列表
│   │
│   ├── reservation/              # 预约组件
│   │   ├── Calendar.tsx         # 日历组件
│   │   ├── TimeSlotPicker.tsx   # 时段选择器
│   │   ├── ReservationForm.tsx  # 预约表单
│   │   ├── ReservationList.tsx # 预约列表
│   │   └── ReservationCard.tsx # 预约卡片
│   │
│   ├── mentor/                   # 导师组件
│   │   ├── MentorCard.tsx       # 导师卡片
│   │   ├── MentorList.tsx      # 导师列表
│   │   └── MentorProfile.tsx   # 导师详情
│   │
│   ├── user/                     # 用户组件
│   │   ├── UserAvatar.tsx       # 用户头像
│   │   ├── UserCard.tsx        # 用户卡片
│   │   ├── LoginForm.tsx       # 登录表单
│   │   └── RegisterForm.tsx    # 注册表单
│   │
│   └── payment/                  # 支付组件
│       ├── PaymentForm.tsx      # 支付表单
│       ├── OrderSummary.tsx     # 订单汇总
│       └── PaymentSuccess.tsx   # 支付成功
│
├── layouts/                      # 布局组件
│   ├── Header.tsx               # 顶部导航
│   ├── Footer.tsx               # 底部
│   ├── Sidebar.tsx              # 侧边栏
│   ├── MainLayout.tsx           # 主布局
│   ├── AuthLayout.tsx           # 认证页布局
│   └── DashboardLayout.tsx      # 仪表盘布局
│
└── shared/                      # 共享组件
    ├── PageHeader.tsx           # 页面标题
    ├── SearchBar.tsx            # 搜索栏
    ├── FilterBar.tsx            # 筛选栏
    ├── Pagination.tsx           # 分页
    ├── Loading.tsx              # 加载状态
    ├── EmptyState.tsx           # 空状态
    ├── ErrorBoundary.tsx        # 错误边界
    ├── SEOHead.tsx             # SEO 头部
    ├── Breadcrumb.tsx           # 面包屑
    └── BackToTop.tsx            # 返回顶部
```

---

## 🎯 核心组件设计

### 1. AI 对话组件 (ai-chat)

```tsx
// ChatWindow - 对话窗口
<ChatWindow
  conversationId={id}
  messages={messages}
  isLoading={isLoading}
  onSend={handleSend}
  onClear={handleClear}
  onExport={handleExport}
/>
```

**功能特点：**
- 流式响应显示
- Markdown 渲染支持
- 代码高亮
- 复制功能
- 语音输入（可选）
- 快捷提示词
- 对话历史管理

### 2. 文章组件 (article)

```tsx
// ArticleCard - 文章卡片
<ArticleCard
  article={article}
  variant="default" | "compact" | "featured"
  onFavorite={handleFavorite}
  onShare={handleShare}
/>
```

**功能特点：**
- 多种展示变体
- 阅读量/收藏量显示
- 标签展示
- 分享功能
- 懒加载图片

### 3. 预约组件 (reservation)

```tsx
// Calendar - 日历组件
<Calendar
  selected={date}
  onSelect={handleDateSelect}
  disabledDates={disabledDates}
  availableDates={availableDates}
/>

// TimeSlotPicker - 时段选择器
<TimeSlotPicker
  mentorId={id}
  date={date}
  onSelect={handleSelect}
  maxSelect={1}
/>
```

**功能特点：**
- 日期禁选（已满/休息日）
- 时段可视化
- 实时库存
- 多选/单选模式

### 4. 课程组件 (course)

```tsx
// CoursePlayer - 课程播放器
<CoursePlayer
  videoUrl={url}
  nextClass={nextClass}
  prevClass={prevClass}
  onProgress={handleProgress}
  notes={notes}
/>
```

**功能特点：**
- 视频播放
- 播放进度记忆
- 章节切换
- 笔记功能
- 倍速播放

---

## 🎨 设计规范

### 色彩系统

```css
/* 主色调 */
--color-primary: #8B0000;      /* 中国红 */
--color-primary-light: #A52A2A;
--color-primary-dark: #5C0000;

/* 文化辅助色 */
--color-gold: #D4AF37;         /* 金色 */
--color-jade: #00A86B;         /* 翡翠绿 */
--color-ink: #1A1A1A;          /* 墨黑 */
--color-paper: #F5F0E6;       /* 宣纸白 */

/* 功能色 */
--color-success: #10B981;
--color-warning: #F59E0B;
--color-error: #EF4444;
--color-info: #3B82F6;
```

### 字体规范

```css
/* 标题字体 - 思源宋体 */
--font-heading: "Noto Serif SC", serif;

/* 正文字体 - 思源黑体 */
--font-body: "Noto Sans SC", sans-serif;

/* 代码字体 */
--font-mono: "JetBrains Mono", monospace;
```

### 间距系统

```css
--spacing-xs: 0.25rem;   /* 4px */
--spacing-sm: 0.5rem;   /* 8px */
--spacing-md: 1rem;     /* 16px */
--spacing-lg: 1.5rem;    /* 24px */
--spacing-xl: 2rem;     /* 32px */
--spacing-2xl: 3rem;    /* 48px */
```

### 圆角规范

```css
--radius-sm: 0.25rem;    /* 4px */
--radius-md: 0.5rem;     /* 8px */
--radius-lg: 0.75rem;    /* 12px */
--radius-xl: 1rem;       /* 16px */
--radius-full: 9999px;   /* 圆形 */
```

---

## 🔧 响应式设计

| 断点 | 屏幕宽度 | 前缀 |
|------|----------|------|
| sm | 640px | sm: |
| md | 768px | md: |
| lg | 1024px | lg: |
| xl | 1280px | xl: |
| 2xl | 1536px | 2xl: |

---

## 📱 移动端适配

- 移动端优先设计
- 触控优化（最小 44px 点击区域）
- 手势支持（滑动返回等）
- 性能优化（图片懒加载等）

---

## ♿ 无障碍设计

- 键盘导航支持
- ARIA 标签完整
- 颜色对比度符合 WCAG AA
- 屏幕阅读器兼容
