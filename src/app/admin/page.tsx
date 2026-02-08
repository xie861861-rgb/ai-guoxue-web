"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  TrendingUp,
  DollarSign,
  UserPlus,
  Sparkles,
} from "lucide-react";

export default function AdminPage() {
  const router = useRouter();
  const [activePage, setActivePage] = useState("dashboard");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem("guoxue_user");
    if (!userData) {
      // 未登录，跳转到登录页
      router.replace("/login");
      return;
    }
    try {
      const parsedUser = JSON.parse(userData);
      // 验证数据完整性
      if (!parsedUser || !parsedUser.role) {
        localStorage.removeItem("guoxue_user");
        router.replace("/login");
        return;
      }
      if (parsedUser.role !== "admin") {
        // 不是管理员，跳转到用户中心
        router.replace("/dashboard");
        return;
      }
      setUser(parsedUser);
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#8B0000] border-t-[#D4AF37] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

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
      <aside className="w-64 bg-[#1A1A1A] text-white flex flex-col fixed left-0 top-0 h-screen">
        {/* Logo */}
        <div className="p-6 border-b border-[#333]">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#8B0000] rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <p className="font-bold">国学智慧</p>
              <p className="text-xs text-gray-500">管理后台</p>
            </div>
          </Link>
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

        {/* User & Logout */}
        <div className="p-4 border-t border-[#333]">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-[#222] rounded-xl transition-all mb-2"
          >
            <Settings className="w-5 h-5" />
            <span>返回用户中心</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-[#222] rounded-xl transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>退出登录</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col ml-64">
        {/* Header */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6">
          <h1 className="text-xl font-bold text-gray-800">
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
                {user?.name?.charAt(0) || "管"}
              </div>
              <div>
                <p className="font-medium text-sm">{user?.name || "管理员"}</p>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold mb-4">用户增长趋势</h3>
                  <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                    📊 图表区域
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h3 className="font-bold mb-4">收入分布</h3>
                  <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400">
                    💰 图表区域
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
                          <p className="text-sm text-gray-500">{item.user}</p>
                        </div>
                      </div>
                      <span className="text-gray-400 text-sm">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other Pages */}
          {activePage !== "dashboard" && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold mb-4">
                {menuItems.find((m) => m.page === activePage)?.label}
              </h2>
              <div className="text-center py-12">
                <p className="text-gray-400">
                  该功能正在开发中...
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
