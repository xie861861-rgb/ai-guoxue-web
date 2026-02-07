import Link from "next/link";
import { Sparkles, Calendar, BookOpen, User, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/80 backdrop-blur-lg border-b border-[#333]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#8B0000] to-[#5C0000] rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <span className="font-bold text-xl font-serif hidden sm:block">
              AI 国学智慧
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/ai/chat"
              className="text-gray-300 hover:text-[#D4AF37] transition-colors"
            >
              AI 对话
            </Link>
            <Link
              href="/ai/fortune"
              className="text-gray-300 hover:text-[#D4AF37] transition-colors"
            >
              面相分析
            </Link>
            <Link
              href="/reservation"
              className="text-gray-300 hover:text-[#D4AF37] transition-colors"
            >
              预约服务
            </Link>
            <Link
              href="/courses"
              className="text-gray-300 hover:text-[#D4AF37] transition-colors"
            >
              精品课程
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="text-gray-300 hover:text-white transition-colors"
            >
              登录
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-gradient-to-r from-[#8B0000] to-[#5C0000] text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all"
            >
              立即注册
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0D0D0D] border-t border-[#333]">
          <nav className="px-4 py-4 space-y-4">
            <Link
              href="/ai/chat"
              className="block py-2 text-gray-300 hover:text-[#D4AF37]"
            >
              AI 对话
            </Link>
            <Link
              href="/ai/fortune"
              className="block py-2 text-gray-300 hover:text-[#D4AF37]"
            >
              面相分析
            </Link>
            <Link
              href="/reservation"
              className="block py-2 text-gray-300 hover:text-[#D4AF37]"
            >
              预约服务
            </Link>
            <Link
              href="/courses"
              className="block py-2 text-gray-300 hover:text-[#D4AF37]"
            >
              精品课程
            </Link>
            <hr className="border-[#333]" />
            <Link
              href="/login"
              className="block py-2 text-gray-300"
            >
              登录
            </Link>
            <Link
              href="/register"
              className="block py-2 text-[#D4AF37] font-medium"
            >
              立即注册
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
