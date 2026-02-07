"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, Phone, Eye, EyeOff, ArrowRight, Sparkles, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: 登录 API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert("登录成功！");
  };

  return (
    <div className="min-h-screen bg-[#1A1A1] flex">
      {/* Left Side - Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#8B0000] to-[#1A1A1A] p-12 flex-col justify-between">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <span className="font-bold text-xl">AI 国学智慧</span>
          </Link>
        </div>

        <div className="max-w-md">
          <h1 className="text-4xl font-bold font-serif mb-6">
            欢迎回来
            <br />
            <span className="text-[#D4AF37]">继续智慧之旅</span>
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            登录您的账号，继续与国学大师对话，学习经典智慧，开启精神成长之旅。
          </p>

          <div className="mt-12 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">AI 国学助手</h3>
                <p className="text-white/60 text-sm">
                  24 小时在线，随时为您解答国学疑问
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl">
                👨‍🏫
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">名师一对一</h3>
                <p className="text-white/60 text-sm">
                  预约国学大师，获取专属指导
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl">
                📚
              </div>
              <div>
                <h3 className="font-bold text-white mb-1">精品课程</h3>
                <p className="text-white/60 text-sm">
                  海量国学课程，随时随地学习
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-white/50 text-sm">
          还没有账号？{" "}
          <Link href="/register" className="text-[#D4AF37] hover:underline">
            立即注册
          </Link>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <Link href="/">
              <div className="w-12 h-12 bg-[#8B0000] rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              </div>
            </Link>
            <span className="font-bold text-xl">AI 国学智慧</span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">欢迎登录</h2>
            <p className="text-gray-400">使用您的账号登录</p>
          </div>

          {/* Login Method Tabs */}
          <div className="flex bg-[#222] rounded-xl p-1 mb-6">
            <button
              onClick={() => setLoginMethod("email")}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                loginMethod === "email"
                  ? "bg-[#8B0000] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              邮箱登录
            </button>
            <button
              onClick={() => setLoginMethod("phone")}
              className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                loginMethod === "phone"
                  ? "bg-[#8B0000] text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              手机登录
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email or Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {loginMethod === "email" ? (
                  <>
                    <Mail className="w-4 h-4 inline mr-1" />
                    电子邮箱
                  </>
                ) : (
                  <>
                    <Phone className="w-4 h-4 inline mr-1" />
                    手机号
                  </>
                )}
              </label>
              <input
                type={loginMethod === "email" ? "email" : "tel"}
                required
                value={loginMethod === "email" ? formData.email : formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [loginMethod === "email" ? "email" : "phone"]: e.target.value,
                  })
                }
                className="w-full px-4 py-3 bg-[#222] border border-[#333] rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                placeholder={
                  loginMethod === "email"
                    ? "请输入邮箱地址"
                    : "请输入手机号"
                }
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Lock className="w-4 h-4 inline mr-1" />
                密码
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#222] border border-[#333] rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors pr-12"
                  placeholder="请输入密码"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) =>
                    setFormData({ ...formData, remember: e.target.checked })
                  }
                  className="w-4 h-4 rounded border-[#333] bg-[#222] text-[#8B0000] focus:ring-[#8B0000]"
                />
                <span className="text-sm text-gray-400">记住我</span>
              </label>
              <a
                href="#"
                className="text-sm text-[#D4AF37] hover:underline"
              >
                忘记密码？
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-[#8B0000] to-[#5C0000] text-white font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  登录中...
                </>
              ) : (
                <>
                  立即登录
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-[#333]" />
            <span className="text-gray-500 text-sm">或</span>
            <div className="flex-1 h-px bg-[#333]" />
          </div>

          {/* Quick Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 bg-[#222] border border-[#333] rounded-xl hover:bg-[#333] transition-colors">
              <span className="text-lg">💬</span>
              <span>微信登录</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-[#222] border border-[#333] rounded-xl hover:bg-[#333] transition-colors">
              <span className="text-lg">📱</span>
              <span>验证码登录</span>
            </button>
          </div>

          {/* Mobile Register Link */}
          <div className="lg:hidden mt-8 text-center">
            <p className="text-gray-400">
              还没有账号？{" "}
              <Link href="/register" className="text-[#D4AF37] hover:underline">
                立即注册
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
