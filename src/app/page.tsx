import Link from "next/link";
import { Sparkles, Calendar, Crown, BookOpen, ArrowRight, User, LogIn } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8B0000] via-[#1A1A1A] to-[#0D0D0D]" />
        <div className="absolute inset-0 bg-[url('/images/chinese-pattern.png')] opacity-5" />
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#8B0000]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/20 rounded-full text-[#D4AF37] text-sm font-medium">
              <Crown className="w-4 h-4" />
              专为企业家打造的精神道场
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold font-serif mb-6 leading-tight">
            <span className="bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#D4AF37] bg-clip-text text-transparent">
              AI 国学智慧
            </span>
            <br />
            赋能商业领袖
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            融合儒道智慧与现代 AI，为高净值企业家提供
            <br />
            修身、齐家、治业的精神道场
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ai/chat"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-[#8B0000] to-[#5C0000] text-white font-semibold rounded-xl hover:opacity-90 transition-all shadow-lg shadow-[#8B0000]/30"
            >
              <Sparkles className="w-5 h-5" />
              开启智慧对话
            </Link>
            <Link
              href="/reservation"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-xl hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all"
            >
              <Calendar className="w-5 h-5" />
              预约名师咨询
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#333] text-white font-medium rounded-xl hover:bg-[#444] transition-colors"
            >
              <LogIn className="w-4 h-4" />
              会员登录
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-[#D4AF37] text-[#D4AF37] font-medium rounded-xl hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all"
            >
              <User className="w-4 h-4" />
              免费注册
            </Link>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12 mt-16">
            {[
              { value: "10K+", label: "企业家用户" },
              { value: "50+", label: "国学导师" },
              { value: "100%", label: "高端服务" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl font-bold text-[#D4AF37]">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              核心服务
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              专为企业家打造的高端国学服务体系
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-3xl p-8 hover:border-[#D4AF37]/50 border border-transparent transition-all hover:shadow-xl hover:shadow-[#D4AF37]/10">
              <div className="w-16 h-16 bg-[#8B0000] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl font-bold mb-3">AI 国学智能体</h3>
              <p className="text-gray-400 mb-6">
                基于豆包大模型的智能国学顾问，精通面相、道家、风水、易经等国学智慧，24小时为企业家提供个性化指导。
              </p>
              <Link
                href="/ai/chat"
                className="inline-flex items-center gap-2 text-[#D4AF37] hover:gap-4 transition-all"
              >
                立即体验 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-3xl p-8 hover:border-[#D4AF37]/50 border border-transparent transition-all hover:shadow-xl hover:shadow-[#D4AF37]/10">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-8 h-8 text-[#1A1A1A]" />
              </div>
              <h3 className="text-2xl font-bold mb-3">高端预约服务</h3>
              <p className="text-gray-400 mb-6">
                预约国学大师一对一咨询、精品课程、禅修静心、雅集活动。尊享 VIP 专属服务，体验传统文化魅力。
              </p>
              <Link
                href="/reservation"
                className="inline-flex items-center gap-2 text-[#D4AF37] hover:gap-4 transition-all"
              >
                立即预约 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Detail */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#1A1A1A] to-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[#D4AF37] font-medium mb-4 block">
                🧠 AI 国学智能体
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
                传统智慧 + 现代 AI
                <br />
                <span className="text-[#8B0000]">碰撞千年文化</span>
              </h2>
              <p className="text-gray-400 text-lg mb-8">
                采用豆包大模型技术，结合儒道易经等传统文化精髓，
                为企业家提供面相分析、风水指导、经典解读等全方位智能服务。
              </p>
              
              <div className="space-y-4">
                {[
                  "🤵面相分析 - AI 智能面相解读",
                  "🏯风水顾问 - 办公居家风水布局",
                  "📜经典解读 - 论语道德经深度讲解",
                  "🔮易经占卜 - 事业人生趋吉避凶",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="text-[#D4AF37]">✓</span>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-3xl p-8 border border-[#333]">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-[#8B0000] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      AI
                    </div>
                    <div className="bg-[#333] rounded-2xl rounded-tl-none p-4 flex-1">
                      <p className="text-sm text-gray-300">
                        您好！我是您的 AI 国学顾问。请问您想了解哪方面的智慧？
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 flex-row-reverse">
                    <div className="w-8 h-8 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#1A1A1A] text-xs font-bold">
                      我
                    </div>
                    <div className="bg-[#8B0000] rounded-2xl rounded-tr-none p-4 flex-1">
                      <p className="text-sm text-white">
                        请帮我看看办公室的风水布局有什么问题？
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-[#8B0000] rounded-full flex items-center justify-center text-white text-xs font-bold">
                      AI
                    </div>
                    <div className="bg-[#333] rounded-2xl rounded-tl-none p-4 flex-1">
                      <p className="text-sm text-gray-300">
                        根据您描述的办公室布局，我建议：💡
                        <br />
                        1. 座位背后需要有靠山...
                        <br />
                        2. 办公桌不宜正对大门...
                        <br />
                        3. 可在财位摆放貔貅...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#D4AF37]/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-[#8B0000] to-[#5C0000]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-6">
            开启您的国学智慧之旅
          </h2>
          <p className="text-white/80 text-lg mb-8">
            立即体验 AI 国学智能体，或预约国学大师一对一咨询
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/ai/chat"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#1A1A1A] font-semibold rounded-xl hover:bg-gray-100 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
              免费体验 AI 对话
            </Link>
            <Link
              href="/reservation"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              <Calendar className="w-5 h-5" />
              预约名师咨询
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#0D0D0D] border-t border-[#222]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#8B0000] rounded-xl flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <span className="font-bold text-xl font-serif">AI 国学智慧</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 AI 国学智慧平台 | 专为企业家打造的精神道场
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Powered by 豆包大模型
          </p>
        </div>
      </footer>
    </div>
  );
}
