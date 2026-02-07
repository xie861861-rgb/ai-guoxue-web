"use client";

import { useState } from "react";
import { Calendar, Clock, User, Phone, Mail, MessageSquare, CheckCircle } from "lucide-react";

const timeSlots = [
  { id: "1", time: "09:00-10:00", available: true },
  { id: "2", time: "10:00-11:00", available: true },
  { id: "3", time: "11:00-12:00", available: false },
  { id: "4", time: "14:00-15:00", available: true },
  { id: "5", time: "15:00-16:00", available: true },
  { id: "6", time: "16:00-17:00", available: true },
  { id: "7", time: "17:00-18:00", available: false },
];

const mentors = [
  {
    id: "1",
    name: "张明德",
    title: "国学大师",
    avatar: "/images/mentors/zhang.jpg",
    specialties: ["儒家思想", "《大学》", "《中庸》"],
    rating: 4.9,
    courses: 12,
  },
  {
    id: "2",
    name: "李国学",
    title: "易经研究专家",
    avatar: "/images/mentors/li.jpg",
    specialties: ["《易经》", "阴阳五行", "风水堪舆"],
    rating: 4.8,
    courses: 8,
  },
  {
    id: "3",
    name: "王信道",
    title: "道家文化学者",
    avatar: "/images/mentors/wang.jpg",
    specialties: ["《道德经》", "庄子思想", "道教文化"],
    rating: 4.9,
    courses: 10,
  },
];

export default function ReservationPage() {
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    remark: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 提交预约
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F5F0E6] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-12 max-w-md text-center shadow-xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-[#1A1A1A] mb-4">
            预约成功！
          </h2>
          <p className="text-gray-600 mb-6">
            我们已收到您的预约请求，导师会在24小时内与您联系确认。
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(1);
              setSelectedMentor(null);
              setSelectedDate(null);
              setSelectedSlot(null);
            }}
            className="px-8 py-3 bg-[#8B0000] text-white font-semibold rounded-lg hover:bg-[#5C0000] transition-colors"
          >
            继续预约
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      {/* Header */}
      <header className="bg-[#8B0000] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            预约咨询
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            与国学名师一对一交流，深入了解国学智慧
          </p>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {["选择导师", "选择时间", "填写信息"].map((label, index) => (
              <div key={index} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step > index + 1
                      ? "bg-green-500 text-white"
                      : step === index + 1
                      ? "bg-[#8B0000] text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > index + 1 ? <CheckCircle className="w-5 h-5" /> : index + 1}
                </div>
                <span
                  className={`ml-3 font-semibold ${
                    step === index + 1 ? "text-[#8B0000]" : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
                {index < 2 && (
                  <div
                    className={`w-20 h-1 mx-4 rounded ${
                      step > index + 1 ? "bg-green-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step 1: Select Mentor */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
              选择导师
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  onClick={() => setSelectedMentor(mentor.id)}
                  className={`bg-white rounded-2xl p-6 cursor-pointer transition-all ${
                    selectedMentor === mentor.id
                      ? "ring-4 ring-[#8B0000] shadow-xl"
                      : "hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#1A1A1A] text-2xl font-bold">
                      {mentor.name[0]}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[#1A1A1A]">
                        {mentor.name}
                      </h3>
                      <p className="text-sm text-gray-500">{mentor.title}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="px-3 py-1 bg-[#F5F0E6] rounded-full text-sm text-gray-600"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      ⭐ {mentor.rating}
                    </span>
                    <span>{mentor.courses} 门课程</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => selectedMentor && setStep(2)}
                disabled={!selectedMentor}
                className="px-8 py-4 bg-[#8B0000] text-white font-semibold rounded-lg hover:bg-[#5C0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一步：选择时间
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Select Date & Time */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
              选择时间
            </h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Calendar */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#8B0000]" />
                  选择日期
                </h3>
                <div className="grid grid-cols-7 gap-2 text-center">
                  {["日", "一", "二", "三", "四", "五", "六"].map((day) => (
                    <div key={day} className="text-sm text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                  {Array.from({ length: 35 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i - date.getDay());
                    const isToday = i === date.getDay();
                    const isPast = date < new Date();
                    return (
                      <button
                        key={i}
                        onClick={() => !isPast && setSelectedDate(date)}
                        disabled={isPast}
                        className={`py-2 rounded-lg text-sm font-medium transition-colors ${
                          isPast
                            ? "text-gray-300 cursor-not-allowed"
                            : selectedDate?.toDateString() === date.toDateString()
                            ? "bg-[#8B0000] text-white"
                            : "hover:bg-[#F5F0E6]"
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#8B0000]" />
                  选择时段
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => slot.available && setSelectedSlot(slot.id)}
                      disabled={!slot.available}
                      className={`py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                        !slot.available
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : selectedSlot === slot.id
                          ? "bg-[#8B0000] text-white"
                          : "border-2 border-[#8B0000] text-[#8B0000] hover:bg-[#F5F0E6]"
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className="px-8 py-4 border-2 border-gray-300 text-gray-600 font-semibold rounded-lg hover:border-gray-400 transition-colors"
              >
                上一步
              </button>
              <button
                onClick={() => selectedDate && selectedSlot && setStep(3)}
                disabled={!selectedDate || !selectedSlot}
                className="px-8 py-4 bg-[#8B0000] text-white font-semibold rounded-lg hover:bg-[#5C0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                下一步：填写信息
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Fill Form */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A] mb-6">
              填写预约信息
            </h2>
            <form
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
                    placeholder="请输入您的姓名"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    联系电话
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
                    placeholder="请输入您的联系电话"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    电子邮箱
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent"
                    placeholder="请输入您的电子邮箱（可选）"
                  />
                </div>

                {/* Remark */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-1" />
                    备注信息
                  </label>
                  <textarea
                    value={formData.remark}
                    onChange={(e) =>
                      setFormData({ ...formData, remark: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B0000] focus:border-transparent resize-none"
                    rows={4}
                    placeholder="请描述您想咨询的问题或需求..."
                  />
                </div>
              </div>

              <div className="flex justify-center gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-600 font-semibold rounded-lg hover:border-gray-400 transition-colors"
                >
                  上一步
                </button>
                <button
                  type="submit"
                  className="px-8 py-4 bg-[#8B0000] text-white font-semibold rounded-lg hover:bg-[#5C0000] transition-colors"
                >
                  提交预约
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
