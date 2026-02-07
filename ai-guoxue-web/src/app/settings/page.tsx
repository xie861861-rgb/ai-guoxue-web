"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  Phone,
  Mail,
  Camera,
  Save,
  ChevronRight,
  Cpu,
  Sparkles,
  Zap,
  Brain,
  Globe2,
} from "lucide-react";
import { AVAILABLE_MODELS, MODELS_BY_PROVIDER, DEFAULT_MODEL } from "@/config/models";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({
    name: "张三",
    email: "zhangsan@example.com",
    phone: "138****8888",
    bio: "热爱传统文化的企业家",
    location: "北京",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    push: false,
    marketing: false,
  });
  const [theme, setTheme] = useState("dark");
  
  // AI 模型设置
  const [selectedModel, setSelectedModel] = useState(DEFAULT_MODEL);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);

  const tabs = [
    { id: "profile", label: "个人资料", icon: User },
    { id: "security", label: "账号安全", icon: Lock },
    { id: "notifications", label: "消息通知", icon: Bell },
    { id: "appearance", label: "外观设置", icon: Palette },
    { id: "ai-models", label: "AI 模型", icon: Cpu },
  ];

  // 获取模型图标
  const getModelIcon = (provider: string) => {
    switch (provider) {
      case 'minimax': return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'doubao': return <Sparkles className="w-5 h-5 text-blue-500" />;
      case 'deepseek': return <Brain className="w-5 h-5 text-cyan-500" />;
      case 'openai': return <Globe2 className="w-5 h-5 text-green-500" />;
      case 'anthropic': return <Cpu className="w-5 h-5 text-orange-500" />;
      case 'moonshot': return <Globe className="w-5 h-5 text-purple-500" />;
      default: return <Cpu className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0D0D0D] border-r border-[#333] min-h-screen hidden lg:block p-6">
        <h2 className="font-bold text-xl mb-8">设置</h2>
        <nav className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id
                  ? "bg-[#8B0000] text-white"
                  : "text-gray-400 hover:text-white hover:bg-[#222]"
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Mobile Tabs */}
        <div className="lg:hidden flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#8B0000] text-white"
                  : "bg-[#222] text-gray-400"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold mb-8">个人资料</h1>

            {/* Avatar */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-[#333]">
              <div className="relative">
                <div className="w-24 h-24 bg-[#D4AF37] rounded-full flex items-center justify-center text-[#1A1A1A] text-3xl font-bold">
                  {profile.name[0]}
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#8B0000] rounded-full flex items-center justify-center text-white hover:bg-[#5C0000] transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="font-bold text-lg">头像</h3>
                <p className="text-sm text-gray-400">
                  支持 JPG、PNG 格式，最大 5MB
                </p>
                <button className="text-[#D4AF37] text-sm mt-1 hover:underline">
                  更换头像
                </button>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  姓名
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-[#222] border border-[#333] rounded-xl focus:border-[#D4AF37] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  个人简介
                </label>
                <textarea
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-[#222] border border-[#333] rounded-xl focus:border-[#D4AF37] focus:outline-none resize-none"
                />
              </div>

              {/* Save Button */}
              <div className="pt-6">
                <button className="px-8 py-3 bg-[#8B0000] text-white font-bold rounded-xl hover:bg-[#5C0000] transition-colors flex items-center gap-2">
                  <Save className="w-5 h-5" />
                  保存更改
                </button>
              </div>
            </div>
          </div>
        )}

        {/* AI Models Tab */}
        {activeTab === "ai-models" && (
          <div className="max-w-4xl">
            <h1 className="text-2xl font-bold mb-8">AI 模型设置</h1>
            
            {/* 当前模型显示 */}
            <div className="bg-gradient-to-r from-[#8B0000]/20 to-[#D4AF37]/20 border border-[#D4AF37] rounded-2xl p-6 mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#8B0000] rounded-2xl flex items-center justify-center">
                  <Brain className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">当前使用的模型</p>
                  <h3 className="text-2xl font-bold text-[#D4AF37]">
                    {AVAILABLE_MODELS.find(m => m.id === selectedModel)?.name || selectedModel}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {AVAILABLE_MODELS.find(m => m.id === selectedModel)?.description}
                  </p>
                </div>
              </div>
            </div>

            {/* 模型选择 */}
            <div className="mb-8">
              <h3 className="font-medium mb-4 text-lg">选择 AI 模型</h3>
              
              {Object.entries(MODELS_BY_PROVIDER).map(([provider, models]) => (
                <div key={provider} className="mb-6">
                  <h4 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
                    {provider === 'minimax' && '⚡ MiniMax'}
                    {provider === 'doubao' && '🔥 豆包 (字节跳动)'}
                    {provider === 'deepseek' && '🧠 DeepSeek'}
                    {provider === 'openai' && '🌐 OpenAI (GPT)'}
                    {provider === 'anthropic' && '🏛️ Anthropic (Claude)'}
                    {provider === 'moonshot' && '🌙 Kimi (月之暗面)'}
                  </h4>
                  <div className="grid gap-3">
                    {models.map((model) => (
                      <button
                        key={model.id}
                        onClick={() => setSelectedModel(model.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedModel === model.id
                            ? "border-[#D4AF37] bg-[#D4AF37]/10"
                            : "border-[#333] hover:border-[#444] bg-[#222]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getModelIcon(model.provider)}
                            <div>
                              <h5 className="font-medium">{model.name}</h5>
                              <p className="text-sm text-gray-400">{model.description}</p>
                            </div>
                          </div>
                          {selectedModel === model.id && (
                            <span className="text-[#D4AF37] text-sm font-medium">
                              ✓ 已选择
                            </span>
                          )}
                        </div>
                        <div className="mt-3 flex gap-4 text-xs text-gray-500">
                          <span>上下文: {model.contextLength.toLocaleString()} tokens</span>
                          {model.pricing && (
                            <span>
                              💰 ${model.pricing.input}/M (输入) / ${model.pricing.output}/M (输出)
                            </span>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* 模型参数设置 */}
            <div className="bg-[#222] rounded-2xl p-6 mb-8">
              <h3 className="font-medium mb-6 text-lg">模型参数</h3>
              
              {/* Temperature */}
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-300">Temperature (创造力)</label>
                  <span className="text-sm text-[#D4AF37]">{temperature}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={temperature}
                  onChange={(e) => setTemperature(parseFloat(e.target.value))}
                  className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>更准确 (0.0)</span>
                  <span>更创意 (1.0)</span>
                </div>
              </div>

              {/* Max Tokens */}
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-300">最大输出长度</label>
                  <span className="text-sm text-[#D4AF37]">{maxTokens} tokens</span>
                </div>
                <input
                  type="range"
                  min="512"
                  max="8192"
                  step="256"
                  value={maxTokens}
                  onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {/* API Keys 配置 */}
            <div className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-2xl p-6 border border-[#333]">
              <h3 className="font-medium mb-4 text-lg">🔑 API Keys 配置</h3>
              <p className="text-sm text-gray-400 mb-4">
                请在环境变量中配置对应的 API Key，模型才能正常工作
              </p>
              
              <div className="grid gap-4">
                {[
                  { key: 'MINIMAX_API_KEY', label: 'MiniMax API Key', provider: 'minimax' },
                  { key: 'DOUBAO_API_KEY', label: '豆包 API Key', provider: 'doubao' },
                  { key: 'DEEPSEEK_API_KEY', label: 'DeepSeek API Key', provider: 'deepseek' },
                  { key: 'OPENAI_API_KEY', label: 'OpenAI API Key', provider: 'openai' },
                  { key: 'ANTHROPIC_API_KEY', label: 'Anthropic API Key', provider: 'anthropic' },
                  { key: 'MOONSHOT_API_KEY', label: 'Kimi API Key', provider: 'moonshot' },
                ].map((api) => (
                  <div key={api.key} className="flex items-center gap-3">
                    {getModelIcon(api.provider)}
                    <div className="flex-1">
                      <label className="text-sm text-gray-300 block mb-1">
                        {api.label}
                      </label>
                      <input
                        type="password"
                        placeholder={`输入 ${api.label}`}
                        className="w-full px-3 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg text-sm focus:border-[#D4AF37] focus:outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 保存按钮 */}
            <div className="mt-6">
              <button className="px-8 py-4 bg-gradient-to-r from-[#8B0000] to-[#D4AF37] text-white font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2">
                <Save className="w-5 h-5" />
                保存模型设置
              </button>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold mb-8">账号安全</h1>
            <div className="space-y-4">
              {[
                {
                  title: "登录密码",
                  desc: "定期更换密码，保障账号安全",
                  action: "修改密码",
                },
                {
                  title: "两步验证",
                  desc: "开启后登录需输入验证码",
                  action: "去设置",
                  enabled: true,
                },
                {
                  title: "登录设备",
                  desc: "查看和管理已登录设备",
                  action: "查看设备",
                },
                {
                  title: "删除账号",
                  desc: "永久删除账号及所有数据",
                  action: "删除",
                  danger: true,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-xl border border-[#333]"
                >
                  <div>
                    <h3
                      className={`font-medium mb-1 ${
                        item.danger ? "text-red-400" : ""
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      item.danger
                        ? "text-red-400 hover:bg-red-400/10"
                        : "text-[#D4AF37] hover:bg-[#D4AF37]/10"
                    }`}
                  >
                    {item.action}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold mb-8">消息通知</h1>
            <div className="space-y-4">
              {[
                {
                  title: "邮件通知",
                  desc: "接收课程更新、活动通知等邮件",
                  key: "email",
                },
                {
                  title: "短信通知",
                  desc: "接收预约提醒、重要通知短信",
                  key: "sms",
                },
                {
                  title: "推送通知",
                  desc: "接收 App 和网页推送",
                  key: "push",
                },
                {
                  title: "营销通知",
                  desc: "接收优惠活动和推广信息",
                  key: "marketing",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-xl border border-[#333]"
                >
                  <div>
                    <h3 className="font-medium mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                  <button
                    onClick={() =>
                      setNotifications({
                        ...notifications,
                        [item.key]:
                          !notifications[item.key as keyof typeof notifications],
                      })
                    }
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      notifications[item.key as keyof typeof notifications]
                        ? "bg-[#8B0000]"
                        : "bg-[#333]"
                    }`}
                  >
                    <span
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
                        notifications[item.key as keyof typeof notifications]
                          ? "left-7"
                          : "left-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Appearance Tab */}
        {activeTab === "appearance" && (
          <div className="max-w-2xl">
            <h1 className="text-2xl font-bold mb-8">外观设置</h1>

            {/* Theme */}
            <div className="mb-8">
              <h3 className="font-medium mb-4">主题</h3>
              <div className="grid grid-cols-3 gap-4">
                {["light", "dark", "system"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      theme === t
                        ? "border-[#D4AF37] bg-[#D4AF37]/10"
                        : "border-[#333] hover:border-[#444]"
                    }`}
                  >
                    <div className="text-center">
                      <div
                        className={`w-8 h-8 mx-auto mb-2 rounded-full ${
                          t === "light"
                            ? "bg-white"
                            : t === "dark"
                            ? "bg-[#1A1A1A]"
                            : "bg-gradient-to-r from-white to-[#1A1A1A]"
                        }`}
                      />
                      <span className="text-sm capitalize">
                        {t === "light" ? "亮色" : t === "dark" ? "暗色" : "跟随系统"}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Font */}
            <div className="mb-8">
              <h3 className="font-medium mb-4">字体大小</h3>
              <div className="flex items-center gap-4">
                {["小", "中", "大"].map((size, index) => (
                  <button
                    key={size}
                    className={`flex-1 py-3 rounded-xl border-2 font-medium ${
                      index === 1
                        ? "border-[#D4AF37] bg-[#D4AF37]/10"
                        : "border-[#333] hover:border-[#444]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
