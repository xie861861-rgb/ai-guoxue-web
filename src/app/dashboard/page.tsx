"use client";

import { useState } from "react";
import {
  User,
  Calendar,
  BookOpen,
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
  ChevronRight,
  Star,
  Clock,
  TrendingUp,
} from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { icon: Clock, label: "学习时长", value: "12.5", unit: "小时" },
    { icon: BookOpen, label: "完成课程", value: "3", unit: "门" },
    { icon: MessageSquare, label: "AI对话", value: "28", unit: "次" },
    { icon: Star, label: "获得积分", value: "560", unit: "分" },
  ];

  const recentCourses = [
    { title: "《大学》精讲", progress: 80, lastStudy: "2026-02-07" },
    { title: "道家养生之道", progress: 45, lastStudy: "2026-02-05" },
    { title: "易经入门", progress: 20, lastStudy: "2026-02-03" },
  ];

  const upcomingReservations = [
    {
      mentor: "张明德",
      title: "一对一咨询",
      date: "2026-02-10",
      time: "14:00-15:00",
      status: "confirmed",
    },
  ];

  const menuItems = [
    { icon: User, label: "个人中心", value: "overview" },
    { icon: Calendar, label: "我的预约", value: "reservations" },
    { icon: BookOpen, label: "学习记录", value: "courses" },
    { icon: CreditCard, label: "会员中心", value: "membership" },
    { icon: Settings, label: "账户设置", value: "settings" },
  ];

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0D0D0D] border-r border-[#333] min-h-screen hidden lg:block">
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#8B0000] rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <span className="font-bold">AI 国学智慧</span>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 p-4 bg-[#222] rounded-xl mb-6">
            <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#1A1A1A] font-bold text-xl">
              张
            </div>
            <div>
              <p className="font-medium">张三</p>
              <p className="text-xs text-[#D4AF37]">儒商会员</p>
            </div>
          </div>

          {/* Menu */}
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.value}
                onClick={() => setActiveTab(item.value)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === item.value
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
          <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 mt-8">
            <LogOut className="w-5 h-5" />
            <span>退出登录</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">欢迎回来，张总</h1>
            <p className="text-gray-400">今天是 2026年2月7日 星期三</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-sm font-medium">
              儒商会员
            </span>
          </div>
        </header>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-2xl p-6 border border-[#333]"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#8B0000] rounded-xl flex items-center justify-center">
                      <stat.icon className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold mb-1">
                    {stat.value}
                    <span className="text-lg font-normal text-gray-400 ml-1">
                      {stat.unit}
                    </span>
                  </p>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Recent Courses */}
              <div className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-2xl p-6 border border-[#333]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">最近学习</h2>
                  <button className="text-[#D4AF37] text-sm hover:underline">
                    查看全部
                  </button>
                </div>
                <div className="space-y-4">
                  {recentCourses.map((course, index) => (
                    <div key={index} className="p-4 bg-[#1A1A1A] rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{course.title}</h3>
                        <span className="text-[#D4AF37]">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-[#333] rounded-full h-2 mb-2">
                        <div
                          className="bg-gradient-to-r from-[#8B0000] to-[#D4AF37] h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        上次学习: {course.lastStudy}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Reservations */}
              <div className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-2xl p-6 border border-[#333]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold">即将到来的预约</h2>
                  <button className="text-[#D4AF37] text-sm hover:underline">
                    查看全部
                  </button>
                </div>
                {upcomingReservations.length > 0 ? (
                  <div className="p-4 bg-[#1A1A1A] rounded-xl">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium">
                          {upcomingReservations[0].mentor} 老师
                        </h3>
                        <p className="text-sm text-gray-400">
                          {upcomingReservations[0].title}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                        已确认
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {upcomingReservations[0].date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {upcomingReservations[0].time}
                      </span>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-center py-8">
                    暂无预约
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {/* Mobile Menu */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0D0D0D] border-t border-[#333] p-4">
          <div className="flex justify-around">
            {menuItems.slice(0, 5).map((item) => (
              <button
                key={item.value}
                onClick={() => setActiveTab(item.value)}
                className={`flex flex-col items-center gap-1 ${
                  activeTab === item.value ? "text-[#D4AF37]" : "text-gray-400"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
