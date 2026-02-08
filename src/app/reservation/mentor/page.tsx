"use client";

import { useState } from "react";
import { Calendar, Clock, User, Star, Check, ChevronLeft, ChevronRight } from "lucide-react";

interface Mentor {
  id: string;
  name: string;
  title: string;
  avatar: string;
  specialties: string[];
  rating: number;
  price: number;
  available: boolean;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

const mentors: Mentor[] = [
  {
    id: "1",
    name: "张明德",
    title: "国学泰斗",
    avatar: "/images/mentors/1.jpg",
    specialties: ["儒家经典", "《大学》", "企业管理"],
    rating: 4.9,
    price: 2000,
    available: true,
  },
  {
    id: "2",
    name: "李信道",
    title: "道家养生专家",
    avatar: "/images/mentors/2.jpg",
    specialties: ["道家思想", "养生功法", "风水布局"],
    rating: 4.8,
    price: 1800,
    available: true,
  },
  {
    id: "3",
    name: "王易经",
    title: "易经大师",
    avatar: "/images/mentors/3.jpg",
    specialties: ["六爻占卜", "梅花易数", "企业决策"],
    rating: 4.9,
    price: 3000,
    available: true,
  },
];

// 生成未来7天的日期
const getDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  return dates;
};

export default function MentorBookingPage() {
  const [step, setStep] = useState(1);
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    remark: "",
  });

  const dates = getDates();
  const timeSlots: TimeSlot[] = [
    { id: "1", time: "09:00-10:00", available: true },
    { id: "2", time: "10:00-11:00", available: true },
    { id: "3", time: "11:00-12:00", available: false },
    { id: "4", time: "14:00-15:00", available: true },
    { id: "5", time: "15:00-16:00", available: true },
    { id: "6", time: "16:00-17:00", available: true },
    { id: "7", time: "17:00-18:00", available: false },
  ];

  const selectedMentorData = mentors.find((m) => m.id === selectedMentor);

  const handleSubmit = () => {
    // TODO: 提交预约
    alert("预约成功！我们的客服将在30分钟内与您联系确认。");
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      {/* Header */}
      <header className="bg-[#0D0D0D] border-b border-[#333] py-6">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold font-serif text-center">
            <span className="text-[#D4AF37]">预约</span>国学名师
          </h1>
          <p className="text-center text-gray-400 mt-2">
            与国学大师一对一交流，感悟智慧精髓
          </p>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-[#0D0D0D] border-b border-[#333]">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {["选择导师", "选择时间", "确认信息"].map((label, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step > index + 1
                      ? "bg-green-600"
                      : step === index + 1
                      ? "bg-[#8B0000]"
                      : "bg-[#333]"
                  }`}
                >
                  {step > index + 1 ? <Check className="w-5 h-5" /> : index + 1}
                </div>
                <span
                  className={`ml-3 font-medium ${
                    step === index + 1 ? "text-white" : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
                {index < 2 && (
                  <div
                    className={`w-16 h-0.5 mx-4 ${
                      step > index + 1 ? "bg-green-600" : "bg-[#333]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Step 1: Select Mentor */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 text-center">
              选择您心仪的导师
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  onClick={() => setSelectedMentor(mentor.id)}
                  className={`bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-2xl p-6 cursor-pointer transition-all ${
                    selectedMentor === mentor.id
                      ? "ring-4 ring-[#D4AF37] shadow-xl shadow-[#D4AF37]/20"
                      : "hover:border-[#444] border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#333] flex items-center justify-center text-2xl font-bold text-[#D4AF37]">
                      {mentor.name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{mentor.name}</h3>
                      <p className="text-sm text-[#D4AF37]">{mentor.title}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="px-3 py-1 bg-[#333] rounded-full text-xs text-gray-300"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#333]">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-[#D4AF37] fill-current" />
                      <span className="font-bold">{mentor.rating}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-[#D4AF37]">
                        ¥{mentor.price}
                      </span>
                      <span className="text-sm text-gray-500">/小时</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <button
                onClick={() => selectedMentor && setStep(2)}
                disabled={!selectedMentor}
                className="px-10 py-4 bg-gradient-to-r from-[#8B0000] to-[#5C0000] text-white font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一步：选择时间 →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setStep(1)}
                className="p-2 hover:bg-[#333] rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold">
                选择与 {selectedMentorData?.name} 老师交流的时间
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Date Selection */}
              <div className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-2xl p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#D4AF37]" />
                  选择日期
                </h3>
                <div className="grid grid-cols-7 gap-2">
                  {dates.map((date, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(date)}
                      className={`p-3 rounded-xl text-center transition-all ${
                        selectedDate?.toDateString() === date.toDateString()
                          ? "bg-[#8B0000] text-white"
                          : "hover:bg-[#333] text-gray-300"
                      }`}
                    >
                      <div className="text-xs text-gray-500">
                        {date.toLocaleDateString("zh-CN", { weekday: "short" })}
                      </div>
                      <div className="font-bold mt-1">
                        {date.getDate()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {date.toLocaleDateString("zh-CN", {
                          month: "short",
                        })}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-2xl p-6">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                  选择时段
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => slot.available && setSelectedSlot(slot.id)}
                      disabled={!slot.available}
                      className={`p-3 rounded-xl text-center font-medium transition-all ${
                        !slot.available
                          ? "bg-[#222] text-gray-600 cursor-not-allowed"
                          : selectedSlot === slot.id
                          ? "bg-[#8B0000] text-white"
                          : "bg-[#333] text-gray-300 hover:bg-[#444]"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-10">
              <button
                onClick={() => setStep(1)}
                className="px-8 py-4 border-2 border-[#333] text-gray-400 font-bold rounded-xl hover:border-[#444] hover:text-white transition-all"
              >
                ← 上一步
              </button>
              <button
                onClick={() => selectedDate && selectedSlot && setStep(3)}
                disabled={!selectedDate || !selectedSlot}
                className="px-10 py-4 bg-gradient-to-r from-[#8B0000] to-[#5C0000] text-white font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一步：确认信息 →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm Info */}
        {step === 3 && (
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setStep(2)}
                className="p-2 hover:bg-[#333] rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold">确认预约信息</h2>
            </div>

            {/* Booking Summary */}
            <div className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-2xl p-6 mb-8 border border-[#333]">
              <h3 className="font-bold mb-4 text-[#D4AF37]">预约详情</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">导师</span>
                  <span className="font-medium">
                    {selectedMentorData?.name} 老师
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">日期</span>
                  <span className="font-medium">
                    {selectedDate?.toLocaleDateString("zh-CN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      weekday: "long",
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">时间</span>
                  <span className="font-medium">
                    {timeSlots.find((s) => s.id === selectedSlot)?.time}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">费用</span>
                  <span className="font-bold text-xl text-[#D4AF37]">
                    ¥{selectedMentorData?.price}
                  </span>
                </div>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    您的姓名
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
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    联系电话
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-[#222] border border-[#333] rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                    placeholder="请输入您的电话"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  企业名称（选填）
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#222] border border-[#333] rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors"
                  placeholder="请输入您的企业名称"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  备注说明
                </label>
                <textarea
                  value={formData.remark}
                  onChange={(e) =>
                    setFormData({ ...formData, remark: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#222] border border-[#333] rounded-xl focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
                  rows={4}
                  placeholder="请描述您希望与导师交流的主题..."
                />
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-8 py-4 border-2 border-[#333] text-gray-400 font-bold rounded-xl hover:border-[#444] hover:text-white transition-all"
                >
                  ← 上一步
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-10 py-4 bg-gradient-to-r from-[#8B0000] to-[#5C0000] text-white font-bold rounded-xl hover:opacity-90 transition-all"
                >
                  确认预约
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
