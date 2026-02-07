"use client";

import { useState, useRef } from "react";
import { Image, Sparkles, Check, Upload, Loader2, Brain } from "lucide-react";

interface AnalysisResult {
  overall: string;
  career: string;
  relationships: string;
  health: string;
  advice: string;
}

export default function FaceReadingPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);

    // 模拟 AI 分析（实际会调用豆包 API）
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setResult({
      overall: `根据面部分析，您天庭饱满，地阁方圆，属于典型的「富贵相」。额头宽阔且有光泽，预示着事业运势旺盛，思维敏捷，适合从事管理和决策类工作。`,
      career: `事业运势分析：
      • 事业线清晰有力，中年后运势渐入佳境
      • 适合创业或担任管理层
      • 贵人运旺盛，易得合作伙伴相助
      • 建议在西北方位办公，可提升事业运势`,
      relationships: `人际运势分析：
      • 眉毛浓密且有型，人际关系广泛
      • 鼻梁挺拔，桃花运稳定
      • 口型端正，言而有信
      • 适合从事需要沟通协调的工作`,
      health: `健康提示：
      • 脾胃功能良好，消化系统健康
      • 注意眼部疲劳，建议适度休息
      • 保持规律作息，避免熬夜
      • 建议多进行户外运动`,
      advice: `综合建议：
      1. 保持积极乐观的心态
      2. 注重人际关系的维护
      3. 事业上可把握机遇，勇于决策
      4. 注意身体健康，适度运动
      5. 可在家中西北方向摆放貔貅，提升财运`,
    });

    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      {/* Header */}
      <header className="bg-[#0D0D0D] border-b border-[#333] py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-[#D4AF37]" />
            <h1 className="text-3xl font-bold font-serif">AI 面相分析</h1>
          </div>
          <p className="text-gray-400">
            融合传统相学与现代 AI，为您解读面相密码
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Upload Section */}
        <div className="text-center mb-12">
          {!selectedImage ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-3xl p-12 border-2 border-dashed border-[#444] hover:border-[#D4AF37] cursor-pointer transition-all group"
            >
              <div className="w-20 h-20 bg-[#333] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#8B0000] transition-all">
                <Upload className="w-10 h-10 text-gray-400 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">上传照片</h3>
              <p className="text-gray-400 mb-4">
                点击或拖拽照片到此处，建议上传正面照
              </p>
              <p className="text-sm text-gray-500">
                支持 JPG、PNG 格式，最大 10MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>
          ) : (
            <div className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-3xl p-8">
              <div className="relative max-w-md mx-auto mb-8">
                <img
                  src={selectedImage}
                  alt="上传的照片"
                  className="w-full rounded-2xl shadow-2xl"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setResult(null);
                  }}
                  className="absolute -top-3 -right-3 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                >
                  ×
                </button>
              </div>

              <div className="flex justify-center gap-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 border-2 border-[#444] rounded-xl hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
                >
                  重新上传
                </button>
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="px-8 py-3 bg-gradient-to-r from-[#8B0000] to-[#5C0000] text-white font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      分析中...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      开始分析
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <div className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-3xl p-12 text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-4 border-[#333] rounded-full" />
              <div className="absolute inset-0 border-4 border-[#D4AF37] rounded-full border-t-transparent animate-spin" />
              <div className="absolute inset-4 flex items-center justify-center">
                <Brain className="w-8 h-8 text-[#D4AF37]" />
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2">AI 正在分析您的面相...</h3>
            <p className="text-gray-400">
              传统相学 + 深度学习算法，结合数千案例智能分析
            </p>
          </div>
        )}

        {/* Analysis Result */}
        {result && !isAnalyzing && (
          <div className="bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-3xl p-8 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#8B0000] rounded-xl flex items-center justify-center">
                <Check className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <div>
                <h2 className="text-xl font-bold">分析完成</h2>
                <p className="text-sm text-gray-400">
                  以下为 AI 基于传统相学原理的分析结果
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Overall */}
              <div className="bg-[#1A1A1A] rounded-2xl p-6">
                <h3 className="font-bold text-[#D4AF37] mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                  整体面相
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {result.overall}
                </p>
              </div>

              {/* Career */}
              <div className="bg-[#1A1A1A] rounded-2xl p-6">
                <h3 className="font-bold text-blue-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full" />
                  事业运势
                </h3>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {result.career}
                </div>
              </div>

              {/* Relationships */}
              <div className="bg-[#1A1A1A] rounded-2xl p-6">
                <h3 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full" />
                  人际关系
                </h3>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {result.relationships}
                </div>
              </div>

              {/* Health */}
              <div className="bg-[#1A1A1A] rounded-2xl p-6">
                <h3 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full" />
                  健康提示
                </h3>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {result.health}
                </div>
              </div>

              {/* Advice */}
              <div className="bg-gradient-to-r from-[#8B0000]/20 to-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl p-6">
                <h3 className="font-bold text-[#D4AF37] mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  大师建议
                </h3>
                <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                  {result.advice}
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button
                onClick={() => {
                  setResult(null);
                  setSelectedImage(null);
                }}
                className="px-8 py-3 border-2 border-[#444] rounded-xl hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
              >
                重新分析
              </button>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-[#222] rounded-2xl">
          <p className="text-sm text-gray-500 text-center">
            ⚠️ 本分析仅供参考娱乐，请勿过分迷信。命运掌握在自己手中，
            积极向上的人生态度才是成功关键。
          </p>
        </div>
      </main>
    </div>
  );
}
