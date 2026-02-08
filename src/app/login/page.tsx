"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Phone, Eye, EyeOff, ArrowRight, Sparkles, ArrowLeft, User, Shield } from "lucide-react";

// 演示账户
const DEMO_ACCOUNTS = {
  admin: { password: "admin123", role: "admin", name: "超级管理员" },
  demo: { password: "demo123", role: "user", name: "演示用户" },
  test: { password: "test123", role: "user", name: "测试用户" }
};

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    remember: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // 检查是否已登录
    const user = localStorage.getItem("guoxue_user");
    if (user) {
      const userData = JSON.parse(user);
      if (userData.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // 模拟登录延迟
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const email = formData.email.toLowerCase().trim();
    const password = formData.password;

    // 检查演示账户
    if (DEMO_ACCOUNTS[email as keyof typeof DEMO_ACCOUNTS]) {
      const account = DEMO_ACCOUNTS[email as keyof typeof DEMO_ACCOUNTS];
      if (account.password === password) {
        const userData = {
          email,
          name: account.name,
          role: account.role,
          loginTime: new Date().toISOString()
        };
        localStorage.setItem("guoxue_user", JSON.stringify(userData));
        setIsLoading(false);
        if (account.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
        return;
      }
    }

    // 检查是否有注册用户
    const users = JSON.parse(localStorage.getItem("guoxue_users") || "[]");
    const user = users.find((u: any) => u.email === email);

    if (user && user.password === password) {
      const userData = {
        email,
        name: user.name,
        role: "user",
        loginTime: new Date().toISOString()
      };
      localStorage.setItem("guoxue_user", JSON.stringify(userData));
      setIsLoading(false);
      router.push("/dashboard");
      return;
    }

    setError("邮箱或密码错误");
    setIsLoading(false);
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
            欢迎回来
            <br />
            <span className="text-[#D4AF37]">继续智慧之旅</span>
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            登录您的账号，继续与国学大师对话，学习经典智慧，开启精神成长之旅。
          </p>

          {/* Demo Accounts Info */}
          <div className="mt-8 p-4 bg-white/10 rounded-xl">
            <h3 className="text-[#D4AF37] font-bold mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> 演示账户
            </h3>
            <div className="space-y-2 text-sm text-white/80">
              <div className="flex justify-between">
                <span>👤 管理员:</span>
                <span className="font-mono">admin / admin123</span>
              </div>
              <div className="flex justify-between">
                <span>👤 演示用户:</span>
                <span className="font-mono">demo / demo123</span>
              </div>
              <div className="flex justify-between">
                <span>👤 测试用户:</span>
                <span className="font-mono">test / test123</span>
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

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

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
