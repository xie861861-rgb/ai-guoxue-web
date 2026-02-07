"use client";

import { useState } from "react";
import {
  Crown,
  Star,
  CreditCard,
  Gift,
  ChevronRight,
  Sparkles,
  Clock,
  Users,
  Phone,
} from "lucide-react";

const membershipPlans = [
  {
    id: "entry",
    name: "入门弟子",
    price: 999,
    period: "年",
    color: "#888888",
    features: [
      "AI 国学对话无限使用",
      "基础面相分析",
      "10+ 国学课程",
      "社区访问",
    ],
  },
  {
    id: "scholar",
    name: "儒商",
    price: 9999,
    period: "年",
    color: "#D4AF37",
    popular: true,
    features: [
      "入门弟子全部权益",
      "每月 1 次名师咨询",
      "全部国学课程",
      "优先客服支持",
      "专属会员群",
      "线下活动 8 折",
    ],
  },
  {
    id: "master",
    name: "掌门",
    price: 49999,
    period: "年",
    color: "#8B0000",
    features: [
      "儒商全部权益",
      "每月 4 次名师咨询",
      "企业定制服务",
      "私人国学顾问",
      "线下活动免费",
      "年度盛典邀请",
      "定制礼品",
    ],
  },
];

const privileges = [
  { icon: Sparkles, title: "AI 智能服务", desc: "24 小时 AI 国学助手" },
  { icon: Users, title: "名师指导", desc: "国学大师一对一咨询" },
  { icon: Clock, title: "专属时间", desc: "优先预约时段" },
  { icon: Phone, title: "VIP 客服", desc: "专属客服通道" },
  { icon: Gift, title: "会员礼遇", desc: "节日定制礼品" },
];

export default function MembershipPage() {
  const [selectedPlan, setSelectedPlan] = useState("scholar");

  return (
    <div className="min-h-screen bg-[#1A1A1] text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#8B0000] to-[#5C0000] py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Crown className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
          <h1 className="text-3xl font-bold font-serif mb-2">
            会员中心
          </h1>
          <p className="text-white/80">
            选择最适合您的会员等级，尊享国学智慧服务
          </p>
        </div>
      </header>

      {/* Current Membership */}
      <section className="max-w-4xl mx-auto px-4 -mt-8">
        <div className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-2xl p-6 border border-[#333]">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#D4AF37] rounded-xl flex items-center justify-center">
                <Crown className="w-8 h-8 text-[#1A1A1]" />
              </div>
              <div>
                <p className="text-sm text-gray-400">当前会员</p>
                <p className="text-xl font-bold text-[#D4AF37]">
                  儒商会员
                </p>
                <p className="text-sm text-gray-500">
                  到期时间：2027年2月7日
                </p>
              </div>
            </div>
            <button className="px-6 py-2 bg-[#D4AF37] text-[#1A1A1] font-bold rounded-lg hover:bg-[#C4A030] transition-colors">
              续费会员
            </button>
          </div>
        </div>
      </section>

      {/* Member Points */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "可用积分", value: "2,560", icon: Star },
            { label: "累计学习", value: "12.5h", icon: Clock },
            { label: "专属顾问", value: "已分配", icon: Users },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-xl p-4 text-center border border-[#333]"
            >
              <stat.icon className="w-5 h-5 text-[#D4AF37] mx-auto mb-2" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Membership Plans */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-center mb-8">
          选择<span className="text-[#D4AF37]">会员等级</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {membershipPlans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-2xl p-6 border-2 cursor-pointer transition-all ${
                selectedPlan === plan.id
                  ? `border-[${plan.color}] shadow-lg shadow-[${plan.color}]/20`
                  : "border-[#333] hover:border-[#444]"
              }`}
              style={{
                borderColor:
                  selectedPlan === plan.id ? plan.color : undefined,
                boxShadow:
                  selectedPlan === plan.id
                    ? `0 0 30px ${plan.color}33`
                    : undefined,
              }}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#D4AF37] text-[#1A1A1] text-xs font-bold rounded-full">
                  最受欢迎
                </span>
              )}
              <div className="text-center mb-6">
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                  style={{ backgroundColor: `${plan.color}33` }}
                >
                  <Crown className="w-6 h-6" style={{ color: plan.color }} />
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ color: plan.color }}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold">¥{plan.price}</span>
                  <span className="text-gray-400">/{plan.period}</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: `${plan.color}33` }}
                    >
                      <span style={{ color: plan.color }}>✓</span>
                    </span>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className="w-full py-3 rounded-xl font-bold transition-all"
                style={{
                  backgroundColor:
                    selectedPlan === plan.id ? plan.color : "transparent",
                  color: selectedPlan === plan.id ? "#fff" : plan.color,
                  border: `2px solid ${plan.color}`,
                }}
              >
                {selectedPlan === plan.id ? "选择此方案" : "了解更多"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Privileges */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          会员<span className="text-[#D4AF37]">专属权益</span>
        </h2>
        <div className="grid md:grid-cols-5 gap-4">
          {privileges.map((priv, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#222] to-[#1A1A1] rounded-xl p-6 text-center border border-[#333] hover:border-[#D4AF37]/30 transition-all"
            >
              <div className="w-12 h-12 bg-[#8B0000] rounded-xl flex items-center justify-center mx-auto mb-4">
                <priv.icon className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h3 className="font-bold mb-2">{priv.title}</h3>
              <p className="text-sm text-gray-400">{priv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          常见<span className="text-[#D4AF37]">问题</span>
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "会员权益如何使用？",
              a: "登录后自动享受会员权益，AI对话和课程可直接使用，预约服务需提前预约。",
            },
            {
              q: "可以退款吗？",
              a: "虚拟服务一经购买不支持退款，如有疑问请联系客服。",
            },
            {
              q: "如何升级会员？",
              a: "在会员中心选择更高等级，完成支付即可立即升级。",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="bg-[#222] rounded-xl p-6 border border-[#333]"
            >
              <h3 className="font-bold mb-2">Q: {faq.q}</h3>
              <p className="text-gray-400 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#8B0000] to-[#5C0000] text-center">
        <h2 className="text-2xl font-bold mb-4">
          开启您的国学智慧之旅
        </h2>
        <p className="text-white/80 mb-6">
          选择会员等级，立即享受尊贵服务
        </p>
        <button className="px-8 py-4 bg-white text-[#8B0000] font-bold rounded-xl hover:bg-gray-100 transition-colors">
          立即成为会员
        </button>
      </section>
    </div>
  );
}
