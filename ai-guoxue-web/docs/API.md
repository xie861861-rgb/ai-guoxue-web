# AI + 国学网站 API 设计

## 📌 概述

本文档定义 AI + 国学网站的 RESTful API 接口规范。

---

## 🔐 认证相关

### POST /api/auth/register
**注册新用户**

Request:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "用户名"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "xxx",
      "email": "user@example.com",
      "name": "用户名"
    }
  },
  "token": "jwt_token"
}
```

### POST /api/auth/login
**用户登录**

Request:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "jwt_token"
  }
}
```

### POST /api/auth/logout
**退出登录**

### GET /api/auth/me
**获取当前用户信息**

---

## 📚 国学经典

### GET /api/categories
**获取分类列表**

Query Parameters:
- `parentId` (optional) - 父分类 ID
- `level` (optional) - 层级深度

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "xxx",
      "name": "儒家",
      "slug": "ru-jia",
      "icon": "📖",
      "children": [...]
    }
  ]
}
```

### GET /api/articles
**获取文章列表**

Query Parameters:
- `categoryId` - 分类 ID
- `page` - 页码，默认 1
- `limit` - 每页数量，默认 10
- `keyword` - 搜索关键词
- `isTop` - 是否精选

Response:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

### GET /api/articles/:slug
**获取文章详情**

Response:
```json
{
  "success": true,
  "data": {
    "id": "xxx",
    "title": "论语详解",
    "content": "...",
    "category": {...},
    "author": {...},
    "tags": ["儒家", "经典"],
    "viewCount": 1000,
    "createdAt": "2026-02-07T12:00:00Z"
  }
}
```

---

## 💬 AI 对话

### POST /api/ai/chat
**发送对话消息**

Request:
```json
{
  "message": "什么是仁？",
  "conversationId": "xxx",  // 可选
  "model": "gpt-4"           // 可选，默认 gpt-4
}
```

Response (Stream):
```json
{
  "success": true,
  "data": {
    "conversationId": "xxx",
    "message": {
      "id": "xxx",
      "role": "assistant",
      "content": "仁是儒家核心概念..."
    }
  }
}
```

### GET /api/ai/conversations
**获取对话列表**

Query Parameters:
- `page`
- `limit`

### GET /api/ai/conversations/:id
**获取对话详情**

---

## 📖 课程

### GET /api/courses
**获取课程列表**

Query Parameters:
- `categoryId`
- `level` (BEGINNER/INTERMEDIATE/ADVANCED)
- `mentorId`
- `page`
- `limit`

Response:
```json
{
  "success": true,
  "data": [...],
  "pagination": {...}
}
```

### GET /api/courses/:slug
**获取课程详情**

Response:
```json
{
  "success": true,
  "data": {
    "id": "xxx",
    "title": "《大学》精讲",
    "description": "...",
    "price": 99.00,
    "duration": 10,
    "level": "BEGINNER",
    "mentor": {...},
    "classes": [...],
    "userProgress": 50  // 已登录用户的学习进度
  }
}
```

### GET /api/courses/:id/classes
**获取课程章节列表**

### POST /api/courses/:id/enroll
**报名课程**

Request: (空)

### POST /api/courses/:id/progress
**更新学习进度**

Request:
```json
{
  "classId": "xxx",
  "progress": 80  // 百分比
}
```

---

## 📅 预约

### GET /api/mentors
**获取导师列表**

Query Parameters:
- `specialty` - 专长领域
- `page`
- `limit`

### GET /api/mentors/:id
**获取导师详情**

Response:
```json
{
  "success": true,
  "data": {
    "id": "xxx",
    "name": "张老师",
    "title": "国学大师",
    "bio": "...",
    "specialties": ["儒家", "易经"],
    "hourlyRate": 200,
    "rating": 4.9,
    "availableSlots": [...]  // 可预约时段
  }
}
```

### GET /api/time-slots
**获取可预约时段**

Query Parameters:
- `mentorId`
- `date` - 日期 (YYYY-MM-DD)

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": "xxx",
      "date": "2026-02-08",
      "startTime": "09:00",
      "endTime": "10:00",
      "isBooked": false
    }
  ]
}
```

### POST /api/reservations
**创建预约**

Request:
```json
{
  "type": "MENTOR",
  "mentorId": "xxx",
  "timeSlotId": "xxx",
  "contactName": "张三",
  "contactPhone": "13800138000",
  "contactEmail": "zhang@example.com",
  "remark": "想咨询《易经》"
}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "xxx",
    "status": "PENDING",
    "amount": 200.00
  }
}
```

### GET /api/reservations
**获取我的预约**

Query Parameters:
- `status` - 状态筛选
- `page`
- `limit`

### PUT /api/reservations/:id/cancel
**取消预约**

Request:
```json
{
  "reason": "时间冲突"
}
```

---

## 👤 用户

### GET /api/user/profile
**获取个人信息**

### PUT /api/user/profile
**更新个人信息**

Request:
```json
{
  "name": "新名字",
  "avatar": "https://...",
  "phone": "13800138000"
}
```

### GET /api/user/learning-records
**获取学习记录**

Query Parameters:
- `type` - 记录类型
- `page`
- `limit`

### GET /api/user/favorites
**获取收藏列表**

### POST /api/user/favorites
**添加收藏**

Request:
```json
{
  "type": "ARTICLE",
  "objectId": "xxx"
}
```

### DELETE /api/user/favorites/:id
**取消收藏**

---

## 🔧 工具接口

### POST /api/utils/upload
**文件上传**

Request: multipart/form-data

Response:
```json
{
  "success": true,
  "data": {
    "url": "https://...",
    "key": "uploads/xxx.jpg"
  }
}
```

---

## 📊 错误响应

所有接口的错误响应格式：

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "错误描述"
  }
}
```

### 常见错误码

| Code | 说明 |
|------|------|
| VALIDATION_ERROR | 参数验证错误 |
| UNAUTHORIZED | 未登录 |
| FORBIDDEN | 无权限 |
| NOT_FOUND | 资源不存在 |
| INTERNAL_ERROR | 服务器错误 |
