"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
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
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }
    if (!formData.agreeTerms) {
      setError("请同意用户协议和隐私政策");
      return;
    }
    if (formData.password.length < 6) {
      setError("密码长度至少6位");
      return;
    }

    setIsLoading(true);

    // 模拟注册延迟
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // 保存用户到 localStorage
    const users = JSON.parse(localStorage.getItem("guoxue_users") || "[]");

    // 检查邮箱是否已存在
    if (users.find((u: any) => u.email === formData.email)) {
      setError("该邮箱已被注册");
      setIsLoading(false);
      return;
    }

    // 添加新用户
    const newUser = {
      name: formData.name,
      email: formData.email.toLowerCase(),
      phone: formData.phone,
      password: formData.password,
      role: "user",
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem("guoxue_users", JSON.stringify(users));

    // 自动登录
    const userData = {
      email: formData.email.toLowerCase(),
      name: formData.name,
      role: "user",
      loginTime: new Date().toISOString()
    };
    localStorage.setItem("guoxue_user", JSON.stringify(userData));

    setIsLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex">
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
            <Link href="/">
              <div className="w-12 h-12 bg-[#8B0000] rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              </div>
            </Link>
            <span className="font-bold text-xl">AI 国学智慧</span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">创建账号</h2>
            <p className="text-gray-400">欢迎加入 AI 国学智慧平台</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

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
                  placeholder="请输入密码（至少6位）"
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
