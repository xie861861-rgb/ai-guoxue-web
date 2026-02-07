import { Sparkles, Crown, BookOpen, Users, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#8B0000]/20 to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Crown className="w-8 h-8 text-[#D4AF37]" />
            <span className="text-[#D4AF37] font-medium">关于 AI 国学智慧平台</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6">
            传承千年智慧
            <br />
            <span className="text-[#D4AF37]">赋能当代精英</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            我们致力于将人工智能与传统文化深度融合，为企业家、商业领袖打造
            专属的精神道场，让国学智慧在现代生活中焕发新的生命力。
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-4 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            <span className="text-[#D4AF37]">我们的</span>使命
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "科技传承",
                desc: "运用最前沿的 AI 技术，让传统文化以全新的方式走进现代生活，让更多人能够便捷地接触、学习和感悟国学智慧。",
              },
              {
                icon: Crown,
                title: "精英服务",
                desc: "专注于服务企业家、高管等精英群体，提供高品质的国学内容和服务，满足精英阶层对精神成长的追求。",
              },
              {
                icon: BookOpen,
                title: "智慧赋能",
                desc: "将儒、道、易等传统智慧与现代管理、生活相结合，帮助精英人群在事业、家庭、人生中获得智慧指引。",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-8 bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-3xl border border-[#333] hover:border-[#D4AF37]/30 transition-all"
              >
                <div className="w-16 h-16 bg-[#8B0000] rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            <span className="text-[#D4AF37]">核心</span>价值观
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            我们坚守传统文化精髓，同时拥抱现代科技创新
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "📚", title: "传承", desc: "尊重传统，守护文化根脉" },
              { icon: "🌟", title: "创新", desc: "拥抱科技，赋能传统智慧" },
              { icon: "💎", title: "品质", desc: "精益求精，追求卓越服务" },
              { icon: "🤝", title: "诚信", desc: "诚实守信，以客户为中心" },
            ].map((value, index) => (
              <div
                key={index}
                className="p-6 bg-[#222] rounded-2xl text-center hover:bg-[#333] transition-colors"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                <p className="text-gray-400 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0D0D0D] to-[#1A1A1A]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            顶级<span className="text-[#D4AF37]">国学导师</span>
          </h2>
          <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
            汇聚多位国学泰斗、易经大师、道家养生专家，为您提供专业指导
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "张明德",
                title: "国学泰斗",
                specialty: "儒家经典",
                desc: "50年国学研习，精通四书五经，著作等身",
              },
              {
                name: "李信道",
                title: "道家养生专家",
                specialty: "养生功法",
                desc: "武当山传人，精通道家养生与太极",
              },
              {
                name: "王易经",
                title: "易经大师",
                specialty: "六爻占卜",
                desc: "国际易经协会理事，服务众多企业家",
              },
            ].map((mentor, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-3xl p-8 border border-[#333] text-center hover:border-[#D4AF37]/30 transition-all"
              >
                <div className="w-24 h-24 bg-[#333] rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-[#D4AF37]">
                  {mentor.name[0]}
                </div>
                <h3 className="text-xl font-bold mb-1">{mentor.name}</h3>
                <p className="text-[#D4AF37] text-sm mb-4">{mentor.title}</p>
                <p className="text-gray-400 text-sm mb-4">{mentor.specialty}</p>
                <p className="text-gray-500 text-sm">{mentor.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            开启您的<span className="text-[#D4AF37]">国学智慧</span>之旅
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            无论是 AI 智能对话，还是预约名师一对一咨询，
            我们都致力于为您提供最优质的服务体验。
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/ai/chat"
              className="px-8 py-4 bg-gradient-to-r from-[#8B0000] to-[#5C0000] text-white font-bold rounded-xl hover:opacity-90 transition-all"
            >
              体验 AI 对话
            </a>
            <a
              href="/reservation"
              className="px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-xl hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all"
            >
              预约名师咨询
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-[#0D0D0D] border-t border-[#333]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Crown className="w-6 h-6 text-[#D4AF37]" />
            <span className="font-bold text-lg">AI 国学智慧平台</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2025 AI 国学智慧平台 | 传承千年智慧，赋能当代精英
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Powered by 豆包大模型
          </p>
        </div>
      </footer>
    </div>
  );
}
