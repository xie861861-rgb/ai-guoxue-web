"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  UserCog,
  Calendar,
  BookOpen,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
  Search,
  ChevronRight,
  TrendingUp,
  DollarSign,
  UserPlus,
  RefreshCw,
} from "lucide-react";

export default function AdminLayout() {
  const [activePage, setActivePage] = useState("dashboard");

  const menuItems = [
    { icon: LayoutDashboard, label: "数据概览", page: "dashboard" },
    { icon: Users, label: "用户管理", page: "users" },
    { icon: UserCog, label: "导师管理", page: "mentors" },
    { icon: Calendar, label: "预约管理", page: "reservations" },
    { icon: BookOpen, label: "课程管理", page: "courses" },
    { icon: CreditCard, label: "会员管理", page: "membership" },
    { icon: BarChart3, label: "数据统计", page: "statistics" },
    { icon: Settings, label: "系统设置", page: "settings" },
  ];

  const stats = [
    {
      label: "总用户数",
      value: "12,586",
      change: "+12.5%",
      icon: Users,
      color: "#8B0000",
    },
    {
      label: "今日新增",
      value: "156",
      change: "+8.2%",
      icon: UserPlus,
      color: "#D4AF37",
    },
    {
      label: "本月收入",
      value: "¥ 2.86万",
      change: "+23.1%",
      icon: DollarSign,
      color: "#10B981",
    },
    {
      label: "预约次数",
      value: "1,256",
      change: "+5.7%",
      icon: Calendar,
      color: "#3B82F6",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1A1A1] text-white flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[#333]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#8B0000] rounded-xl flex items-center justify-center">
              <span className="text-[#D4AF37] font-bold text-xl">AI</span>
            </div>
            <div>
              <p className="font-bold">国学智慧</p>
              <p className="text-xs text-gray-500">管理后台</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-1 overflow-auto">
          {menuItems.map((item) => (
            <button
              key={item.page}
              onClick={() => setActivePage(item.page)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activePage === item.page
                  ? "bg-[#8B0000] text-white"
                  : "text-gray-400 hover:text-white hover:bg-[#222]"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-[#333]">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-[#222] rounded-xl transition-all">
            <LogOut className="w-5 h-5" />
            <span>退出登录</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <h1 className="text-xl font-bold text-[#1A1A1]">
            {menuItems.find((m) => m.page === activePage)?.label}
          </h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="搜索..."
                className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#8B0000] rounded-full flex items-center justify-center text-white font-bold">
                管
              </div>
              <div>
                <p className="font-medium text-sm">管理员</p>
                <p className="text-xs text-gray-500">超级管理员</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-6 overflow-auto">
          {activePage === "dashboard" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${stat.color}20` }}
                      >
                        <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                      </div>
                      <span className="text-green-500 text-sm flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-3xl font-bold mb-1">{stat.value}</p>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold mb-4">用户增长趋势</h3>
                  <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                    图表区域
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold mb-4">收入分布</h3>
                  <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                    图表区域
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">最近活动</h3>
                  <button className="text-[#8B0000] text-sm hover:underline">
                    查看全部
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    { action: "新用户注册", user: "李总", time: "2分钟前" },
                    { action: "预约咨询", user: "王总", time: "5分钟前" },
                    { action: "开通会员", user: "张总", time: "12分钟前" },
                    { action: "完成课程", user: "赵总", time: "30分钟前" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-3 border-b last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F5F0E6] rounded-full flex items-center justify-center text-[#8B0000] font-bold">
                          {item.user[0]}
                        </div>
                        <div>
                          <p className="font-medium">{item.action}</p>
                          <p className="text-sm text-gray-500">
                            {item.user}
                          </p>
                        </div>
                      </div>
                      <span className="text-gray-400 text-sm">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activePage === "mentors" && <MentorsPage />}
          {activePage === "membership" && <MembershipPage />}
        </div>
      </main>
    </div>
  );
}

function MentorsPage() {
  const mentors = [
    {
      id: 1,
      name: "张明德",
      title: "国学泰斗",
      specialty: "儒家经典",
      status: "在线",
      rating: 4.9,
      students: 1256,
      price: 2000,
    },
    {
      id: 2,
      name: "李信道",
      title: "道家养生专家",
      specialty: "养生功法",
      status: "忙碌",
      rating: 4.8,
      students: 892,
      price: 1800,
    },
    {
      id: 3,
      name: "王易经",
      title: "易经大师",
      specialty: "六爻占卜",
      status: "离线",
      rating: 4.9,
      students: 2103,
      price: 3000,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="搜索导师..."
            className="px-4 py-2 bg-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
          />
          <select className="px-4 py-2 bg-white rounded-lg border focus:outline-none focus:ring-2 focus:ring-[#8B0000]">
            <option value="">全部状态</option>
            <option value="online">在线</option>
            <option value="busy">忙碌</option>
            <option value="offline">离线</option>
          </select>
        </div>
        <button className="px-6 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#5C0000] transition-colors flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          添加导师
        </button>
      </div>

      {/* Mentors Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-gray-500">
                导师
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-500">
                专长
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-500">
                状态
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-500">
                评分
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-500">
                学员数
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-500">
                价格
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-500">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {mentors.map((mentor) => (
              <tr key={mentor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#F5F0E6] rounded-full flex items-center justify-center text-[#8B0000] font-bold">
                      {mentor.name[0]}
                    </div>
                    <div>
                      <p className="font-medium">{mentor.name}</p>
                      <p className="text-sm text-gray-500">{mentor.title}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-[#F5F0E6] text-[#8B0000] rounded-full text-sm">
                    {mentor.specialty}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      mentor.status === "在线"
                        ? "bg-green-100 text-green-700"
                        : mentor.status === "忙碌"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {mentor.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[#D4AF37]">⭐ {mentor.rating}</span>
                </td>
                <td className="px-6 py-4">{mentor.students.toLocaleString()}</td>
                <td className="px-6 py-4">¥{mentor.price}/小时</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 text-[#8B0000] hover:bg-[#F5F0E6] rounded-lg">
                      编辑
                    </button>
                    <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                      详情
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MembershipPage() {
  const stats = [
    { label: "总会员数", value: "2,586", change: "+12.5%" },
    { label: "本月新增", value: "156", change: "+8.2%" },
    { label: "续费率", value: "78%", change: "+2.1%" },
    { label: "总收入", value: "¥ 86.5万", change: "+23.1%" },
  ];

  const members = [
    { name: "李总", level: "掌门", spent: "¥ 50,000", joined: "2026-01-15" },
    { name: "王总", level: "儒商", spent: "¥ 9,999", joined: "2026-01-20" },
    { name: "张总", level: "儒商", spent: "¥ 9,999", joined: "2026-02-01" },
    { name: "赵总", level: "入门弟子", spent: "¥ 999", joined: "2026-02-05" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
            <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-green-500 text-sm">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h3 className="font-bold">会员列表</h3>
          <div className="flex gap-4">
            <select className="px-4 py-2 bg-gray-100 rounded-lg border-0 focus:ring-2 focus:ring-[#8B0000]">
              <option value="">全部等级</option>
              <option value="master">掌门</option>
              <option value="scholar">儒商</option>
              <option value="entry">入门弟子</option>
            </select>
            <button className="px-4 py-2 bg-[#8B0000] text-white rounded-lg hover:bg-[#5C0000]">
              导出
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left font-medium text-gray-500">
                会员
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-500">
                等级
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-500">
                累计消费
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-500">
                加入时间
              </th>
              <th className="px-6 py-4 text-left font-medium text-gray-500">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {members.map((member, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium">{member.name}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      member.level === "掌门"
                        ? "bg-[#D4AF37]/20 text-[#D4AF37]"
                        : member.level === "儒商"
                        ? "bg-[#8B0000]/20 text-[#8B0000]"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {member.level}
                  </span>
                </td>
                <td className="px-6 py-4">{member.spent}</td>
                <td className="px-6 py-4 text-gray-500">{member.joined}</td>
                <td className="px-6 py-4">
                  <button className="text-[#8B0000] hover:underline text-sm">
                    查看详情
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
