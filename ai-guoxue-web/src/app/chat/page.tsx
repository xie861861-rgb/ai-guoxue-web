"use client";

import { useState } from "react";
import { Send, Bot, User, BookOpen, Sparkles } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "您好！我是 AI 国学助手，很高兴为您服务。请问您想了解哪方面的国学知识？",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // TODO: 调用 AI API
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `您问到的是关于"${input}"的国学知识。在传统文化中，这是一个非常有深度的话题...`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E6] flex flex-col">
      {/* Header */}
      <header className="bg-[#8B0000] text-white py-4 px-6 shadow-lg">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Bot className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold font-serif">AI 国学对话</h1>
            <p className="text-sm text-white/80">基于大模型的智能国学助手</p>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 max-w-5xl mx-auto w-full p-6 overflow-auto">
        <div className="space-y-6">
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
                    ? "bg-[#8B0000] text-white"
                    : "bg-[#D4AF37] text-[#1A1A1A]"
                }`}
              >
                {message.role === "assistant" ? (
                  <Bot className="w-5 h-5" />
                ) : (
                  <User className="w-5 h-5" />
                )}
              </div>

              {/* Message */}
              <div
                className={`max-w-[70%] rounded-2xl px-6 py-4 ${
                  message.role === "assistant"
                    ? "bg-white shadow-md"
                    : "bg-[#8B0000] text-white shadow-md"
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                <p
                  className={`text-xs mt-2 ${
                    message.role === "assistant"
                      ? "text-gray-400"
                      : "text-white/70"
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
              <div className="w-10 h-10 rounded-full bg-[#8B0000] text-white flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="bg-white shadow-md rounded-2xl px-6 py-4">
                <div className="flex gap-2">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="输入您想了解的国学问题..."
                className="w-full px-4 py-3 bg-[#F5F0E6] rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#8B0000] max-h-32 min-h-[48px]"
                rows={1}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#8B0000]">
                <BookOpen className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-[#8B0000] text-white rounded-xl font-semibold hover:bg-[#5C0000] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              发送
            </button>
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            按 Enter 发送，Shift + Enter 换行
          </p>
        </div>
      </div>
    </div>
  );
}
