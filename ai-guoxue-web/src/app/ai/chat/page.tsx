"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Image, Mic, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  category?: string;
}

const categories = [
  { id: "general", name: "综合", icon: "📚" },
  { id: "confucian", name: "儒家", icon: "🏛️" },
  { id: "taoist", name: "道家", icon: "🧘" },
  { id: "fengshui", name: "风水", icon: "🔮" },
  { id: "yijing", name: "易经", icon: "☯️" },
];

export default function GuoxueChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `尊敬的贵宾，欢迎来到 AI 国学智慧空间。🙏

我是您的私人国学顾问，专注于为您提供：
• 儒家经典智慧解读
• 道家养生之道
• 风水布局指导
• 易经占卜分析

请问您今天想探讨哪方面的国学智慧？`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
      category: selectedCategory,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: input,
          category: selectedCategory,
        }),
      });

      const data = await response.json();

      if (data.success) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.data.message,
          timestamp: new Date(),
          category: selectedCategory,
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "抱歉，服务暂时不可用。请稍后再试，或联系我们的专属客服。🙏",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0D0D0D] border-r border-[#333] hidden lg:block">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#8B0000] rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <h2 className="font-bold text-lg">国学智慧</h2>
              <p className="text-xs text-gray-500">AI 私人顾问</p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
              选择领域
            </p>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#8B0000] text-white"
                    : "hover:bg-[#222] text-gray-400 hover:text-white"
                }`}
              >
                <span className="text-lg">{cat.icon}</span>
                <span className="font-medium">{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 p-4 bg-gradient-to-br from-[#8B0000] to-[#5C0000] rounded-xl">
            <p className="text-sm text-white/80 mb-2">💡 提示</p>
            <p className="text-xs text-white/60">
              您可以上传照片进行面相分析，或直接对话咨询国学问题。
            </p>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-[#0D0D0D] border-b border-[#333] flex items-center px-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#8B0000] rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <h1 className="font-bold">
                {categories.find((c) => c.id === selectedCategory)?.name}智慧
              </h1>
              <p className="text-xs text-green-500 flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                在线
              </p>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${
                message.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === "assistant"
                    ? "bg-[#8B0000]"
                    : "bg-[#D4AF37]"
                }`}
              >
                {message.role === "assistant" ? (
                  <Bot className="w-5 h-5" />
                ) : (
                  <User className="w-5 h-5 text-[#1A1A1A]" />
                )}
              </div>

              {/* Message */}
              <div
                className={`max-w-[70%] ${
                  message.role === "user"
                    ? "text-right"
                    : ""
                }`}
              >
                <div
                  className={`rounded-2xl px-6 py-4 ${
                    message.role === "assistant"
                      ? "bg-[#222] border border-[#333]"
                      : "bg-[#8B0000]"
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                </div>
                <p
                  className={`text-xs text-gray-500 mt-2 ${
                    message.role === "user" ? "text-right" : ""
                  }`}
                >
                  {message.timestamp.toLocaleTimeString("zh-CN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#8B0000] flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-[#222] border border-[#333] rounded-2xl px-6 py-4">
                <div className="flex gap-2">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75" />
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Topics */}
        <div className="px-6 py-3 border-t border-[#333]">
          <div className="flex flex-wrap gap-2">
            {[
              "如何修身养性？",
              "办公室风水禁忌",
              "《道德经》智慧",
              "面相与运势",
            ].map((topic) => (
              <button
                key={topic}
                onClick={() => setInput(topic)}
                className="px-3 py-1 bg-[#222] border border-[#333] rounded-full text-sm text-gray-400 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6">
          <div className="bg-[#222] border border-[#333] rounded-2xl p-4">
            <div className="flex gap-3">
              <button className="p-2 text-gray-500 hover:text-[#D4AF37] transition-colors">
                <Image className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="输入您想咨询的国学问题..."
                className="flex-1 bg-transparent focus:outline-none text-white placeholder-gray-500"
              />
              <button
                className="p-2 text-gray-500 hover:text-[#D4AF37] transition-colors"
              >
                <Mic className="w-5 h-5" />
              </button>
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 bg-[#8B0000] text-white rounded-xl font-medium hover:bg-[#5C0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                发送
              </button>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-3">
           Powered by 豆包大模型 | 传统智慧 + 现代 AI
          </p>
        </div>
      </div>
    </div>
  );
}
