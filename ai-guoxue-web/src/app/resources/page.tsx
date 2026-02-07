"use client";

import { useState } from "react";
import { BookOpen, Video, FileText, Headphones, Search, Filter } from "lucide-react";

interface Resource {
  id: string;
  type: "article" | "video" | "audio" | "ebook";
  title: string;
  description: string;
  cover: string;
  author: string;
  views: number;
  duration?: string;
}

const resources: Resource[] = [
  {
    id: "1",
    type: "article",
    title: "《大学》之道：修身齐家治国平天下",
    description: "深入解读《大学》三纲领八条目，探讨儒家修身之学在现代企业管理中的应用。",
    cover: "/images/resources/daxue.jpg",
    author: "张明德",
    views: 1256,
  },
  {
    id: "2",
    type: "video",
    title: "道德经智慧：無為而治的商业哲学",
    description: "老子思想在现代商业管理中的实践应用，如何做到無為而治。",
    cover: "/images/resources/daodejing.jpg",
    author: "李信道",
    views: 2103,
    duration: "45分钟",
  },
  {
    id: "3",
    type: "audio",
    title: "易经六十四卦详解·乾卦",
    description: "乾卦象征天，君子以自强不息，听音频领悟易经智慧。",
    cover: "/images/resources/yijing.jpg",
    author: "王易经",
    views: 892,
    duration: "20分钟",
  },
  {
    id: "4",
    type: "ebook",
    title: "企业家风水全书",
    description: "办公风水、居家风水、商业选址全面指南，为企业家量身打造。",
    cover: "/images/resources/fengshui.jpg",
    author: "风水研究组",
    views: 3421,
  },
  {
    id: "5",
    type: "article",
    title: "曾国藩识人用人之道",
    description: "从《冰鉴》学习曾国藩的识人术，如何在现代企业用人中应用。",
    cover: "/images/resources/zengguofan.jpg",
    author: "陈守仁",
    views: 1567,
  },
  {
    id: "6",
    type: "video",
    title: "禅修与决策冥想",
    description: "学习禅修冥想方法，提升决策清明度，在喧嚣中保持内心平静。",
    cover: "/images/resources/zen.jpg",
    author: "禅心大师",
    views: 983,
    duration: "60分钟",
  },
];

const typeIcons = {
  article: FileText,
  video: Video,
  audio: Headphones,
  ebook: BookOpen,
};

const typeLabels = {
  article: "文章",
  video: "视频",
  audio: "音频",
  ebook: "电子书",
};

export default function ResourcesPage() {
  const [activeType, setActiveType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResources = resources.filter((r) => {
    const matchesType = activeType === "all" || r.type === activeType;
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#8B0000] to-[#5C0000] py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold font-serif mb-4">
            <span className="text-[#D4AF37]">国学</span>资源库
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto">
            精选国学经典、智慧文章、精品课程，助您随时随地学习成长
          </p>
        </div>
      </header>

      {/* Search & Filter */}
      <div className="sticky top-0 bg-[#0D0D0D]/80 backdrop-blur-lg border-b border-[#333] z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="flex-1 min-w-[200px] relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索资源..."
                className="w-full pl-10 pr-4 py-2 bg-[#222] border border-[#333] rounded-lg focus:border-[#D4AF37] focus:outline-none"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {["all", "article", "video", "audio", "ebook"].map((type) => (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    activeType === type
                      ? "bg-[#8B0000] text-white"
                      : "bg-[#222] text-gray-400 hover:text-white"
                  }`}
                >
                  {type === "all" ? "全部" : typeLabels[type as keyof typeof typeLabels]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => {
            const Icon = typeIcons[resource.type];
            return (
              <div
                key={resource.id}
                className="group bg-gradient-to-br from-[#222] to-[#1A1A1A] rounded-2xl overflow-hidden border border-[#333] hover:border-[#D4AF37]/50 transition-all hover:shadow-xl hover:shadow-[#D4AF37]/10"
              >
                {/* Cover */}
                <div className="relative h-40 bg-gradient-to-br from-[#8B0000] to-[#1A1A1A]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-16 h-16 text-white/20" />
                  </div>
                  <span className="absolute top-3 right-3 px-2 py-1 bg-black/50 backdrop-blur rounded text-xs font-medium">
                    {typeLabels[resource.type]}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{resource.author}</span>
                    <div className="flex items-center gap-3 text-gray-500">
                      <span>{resource.views.toLocaleString()} 阅读</span>
                      {resource.duration && (
                        <span className="text-[#D4AF37]">{resource.duration}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover Action */}
                <div className="px-5 pb-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-full py-2 bg-[#8B0000] rounded-lg font-medium hover:bg-[#5C0000] transition-colors">
                    开始学习
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">暂无相关内容</p>
          </div>
        )}
      </main>
    </div>
  );
}
