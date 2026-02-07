"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("两次输入的密码不一致");
      return;
    }
    if (!formData.agreeTerms) {
      alert("请同意用户协议和隐私政策");
      return;
    }

    setIsLoading(true);
    // TODO: 注册 API
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    alert("注册成功！请登录。");
  };

  return (
    <div className="min-h-screen bg-[#1A1A11] flex">
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
            加入我们
            <br />
            <span className="text-[#D4AF37]">开启智慧之旅</span>
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            成为会员，专享国学大师一对一咨询、AI 智能对话、精品课程等尊贵服务。
          </p>

          <div className="mt-12 space-y-4">
            {[
              "AI 国学智能体 24 小时在线",
              "顶级国学名师一对一咨询",
              "精品国学课程无限学习",
              "专属会员权益与服务",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="w-6 h-6 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#1A1A1] text-sm font-bold">
                  ✓
                </span>
                <span className="text-white/90">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-white/50 text-sm">
          已有账号？{" "}
          <Link href="/login" className="text-[#D4AF37] hover:underline">
            立即登录
          </Link>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 bg-[#8B0000] rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <span className="font-bold text-xl">AI 国学智慧</span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">创建账号</h2>
            <p className="text-gray-400">欢迎加入 AI 国学智慧平台</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                姓名
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#222] border border-[#333] rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                placeholder="请输入您的姓名"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                电子邮箱
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#222] border border-[#333] rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                placeholder="请输入您的邮箱"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                手机号
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#222] border border-[#333] rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                placeholder="请输入您的手机号（选填）"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                <Lock className="w-4 h-4 inline mr-1" />
                确认密码
              </label>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#222] border border-[#333] rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                placeholder="请再次输入密码"
              />
            </div>

            {/* Terms */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="terms"
                checked={formData.agreeTerms}
                onChange={(e) =>
                  setFormData({ ...formData, agreeTerms: e.target.checked })
                }
                className="mt-1 w-4 h-4 rounded border-[#333] bg-[#222] text-[#8B0000] focus:ring-[#8B0000]"
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                我已阅读并同意{" "}
                <a href="#" className="text-[#D4AF37] hover:underline">
                  用户协议
                </a>{" "}
                和{" "}
                <a href="#" className="text-[#D4AF37] hover:underline">
                  隐私政策
                </a>
              </label>
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
                  注册中...
                </>
              ) : (
                <>
                  立即注册
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

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 bg-[#222] border border-[#333] rounded-xl hover:bg-[#333] transition-colors">
              <span className="text-lg">微信</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-[#222] border border-[#333] rounded-xl hover:bg-[#333] transition-colors">
              <span className="text-lg">手机号</span>
            </button>
          </div>

          {/* Mobile Login Link */}
          <div className="lg:hidden mt-8 text-center">
            <p className="text-gray-400">
              已有账号？{" "}
              <Link href="/login" className="text-[#D4AF37] hover:underline">
                立即登录
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
