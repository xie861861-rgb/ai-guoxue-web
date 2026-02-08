"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  User,
  Calendar,
  BookOpen,
  MessageSquare,
  CreditCard,
  Settings,
  LogOut,
  Clock,
  Star,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("guoxue_user");
    if (!userData) {
      router.replace("/login");
      return;
    }
    try {
      const parsedUser = JSON.parse(userData);
      if (parsedUser && parsedUser.role) {
        setUser(parsedUser);
      } else {
        localStorage.removeItem("guoxue_user");
        router.replace("/login");
      }
    } catch (e) {
      localStorage.removeItem("guoxue_user");
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("guoxue_user");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#8B0000] border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

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
      <aside className="w-64 bg-[#0D0D0D] border-r border-[#333] min-h-screen hidden lg:block fixed left-0 top-0">
        <div className="p-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#8B0000] rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <span className="font-bold">AI 国学智慧</span>
          </Link>

          {/* User Info */}
          <div className="flex items-center gap-3 p-4 bg-[#222] rounded-xl mb-6">
            <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#1A1A1A] font-bold text-xl">
              {user?.name?.charAt(0) || "U"}
            </div>
            <div>
              <p className="font-medium">{user?.name || "用户"}</p>
              <p className="text-xs text-[#D4AF37]">
                {user?.role === "admin" ? "超级管理员" : "普通会员"}
              </p>
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

          {/* Admin Link */}
          {user?.role === "admin" && (
            <Link
              href="/admin"
              className="w-full flex items-center gap-3 px-4 py-3 text-[#D4AF37] hover:bg-[#222] rounded-xl transition-all mt-4"
            >
              <Settings className="w-5 h-5" />
              <span>后台管理</span>
            </Link>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 mt-8"
          >
            <LogOut className="w-5 h-5" />
            <span>退出登录</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:ml-64">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">
              欢迎回来，{user?.name || "用户"}
            </h1>
            <p className="text-gray-400">
              {new Date().toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
                weekday: "long",
              })}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-sm font-medium">
              {user?.role === "admin" ? "超级管理员" : "普通会员"}
            </span>
          </div>
        </header>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { icon: Clock, label: "学习时长", value: "0", unit: "小时" },
                { icon: BookOpen, label: "完成课程", value: "0", unit: "门" },
                { icon: MessageSquare, label: "AI对话", value: "0", unit: "次" },
                { icon: Star, label: "获得积分", value: "0", unit: "分" },
              ].map((stat, index) => (
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

            {/* Quick Actions */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Link
                href="/ai/chat"
                className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-2xl p-6 border border-[#333] hover:border-[#8B0000] transition-all group"
              >
                <div className="w-12 h-12 bg-[#8B0000] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="font-bold mb-1">AI 对话</h3>
                <p className="text-sm text-gray-400">与国学智能体对话</p>
              </Link>
              <Link
                href="/reservation"
                className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-2xl p-6 border border-[#333] hover:border-[#D4AF37] transition-all group"
              >
                <div className="w-12 h-12 bg-[#D4AF37] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Calendar className="w-6 h-6 text-[#1A1A1A]" />
                </div>
                <h3 className="font-bold mb-1">预约咨询</h3>
                <p className="text-sm text-gray-400">预约名师咨询</p>
              </Link>
              <Link
                href="/courses"
                className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-2xl p-6 border border-[#333] hover:border-[#8B0000] transition-all group"
              >
                <div className="w-12 h-12 bg-[#8B0000] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <h3 className="font-bold mb-1">精品课程</h3>
                <p className="text-sm text-gray-400">学习国学经典</p>
              </Link>
              <Link
                href="/membership"
                className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-2xl p-6 border border-[#333] hover:border-[#D4AF37] transition-all group"
              >
                <div className="w-12 h-12 bg-[#D4AF37] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Star className="w-6 h-6 text-[#1A1A1A]" />
                </div>
                <h3 className="font-bold mb-1">会员中心</h3>
                <p className="text-sm text-gray-400">查看会员权益</p>
              </Link>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-2xl p-6 border border-[#333]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">最近活动</h2>
              </div>
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">还没有任何活动</p>
                <p className="text-sm text-gray-500 mt-2">
                  开始与 AI 对话或预约咨询来记录您的第一次活动
                </p>
              </div>
            </div>
          </>
        )}

        {/* Other Tabs */}
        {activeTab !== "overview" && (
          <div className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-2xl p-6 border border-[#333]">
            <h2 className="text-lg font-bold mb-4">{menuItems.find((i) => i.value === activeTab)?.label}</h2>
            <div className="text-center py-12">
              <p className="text-gray-400">该功能正在开发中...</p>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#0D0D0D] border-t border-[#333] p-4 pb-8">
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
