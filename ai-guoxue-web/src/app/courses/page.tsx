import Link from "next/link";
import { Clock, Users, Star, BookOpen, ArrowRight } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  price: number;
  originalPrice?: number;
  duration: number;
  level: "初级" | "中级" | "高级";
  mentor: {
    name: string;
    avatar: string;
  };
  rating: number;
  students: number;
}

const courses: Course[] = [
  {
    id: "1",
    title: "《大学》精讲",
    description: "深入解读《大学》三纲领八条目，理解儒家修身治国平天下的智慧",
    coverImage: "/images/courses/daxue.jpg",
    price: 99,
    originalPrice: 199,
    duration: 12,
    level: "初级",
    mentor: {
      name: "张明德",
      avatar: "/images/mentors/zhang.jpg",
    },
    rating: 4.9,
    students: 1256,
  },
  {
    id: "2",
    title: "《易经》入门",
    description: "从零开始学习《易经》，了解阴阳五行与变化之道",
    coverImage: "/images/courses/yijing.jpg",
    price: 159,
    duration: 20,
    level: "中级",
    mentor: {
      name: "李国学",
      avatar: "/images/mentors/li.jpg",
    },
    rating: 4.8,
    students: 892,
  },
  {
    id: "3",
    title: "《道德经》与人生智慧",
    description: "感悟老子智慧，理解无为而治的哲学思想",
    coverImage: "/images/courses/daodejing.jpg",
    price: 129,
    duration: 15,
    level: "初级",
    mentor: {
      name: "王信道",
      avatar: "/images/mentors/wang.jpg",
    },
    rating: 4.9,
    students: 2103,
  },
  {
    id: "4",
    title: "古典诗词鉴赏",
    description: "从《诗经》到唐诗宋词，感受古典诗词之美",
    coverImage: "/images/courses/shici.jpg",
    price: 199,
    duration: 25,
    level: "中级",
    mentor: {
      name: "陈诗韵",
      avatar: "/images/mentors/chen.jpg",
    },
    rating: 4.7,
    students: 1567,
  },
];

const levelColors = {
  初级: "bg-green-100 text-green-800",
  中级: "bg-yellow-100 text-yellow-800",
  高级: "bg-red-100 text-red-800",
};

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-[#F5F0E6]">
      {/* Header */}
      <header className="bg-[#8B0000] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            国学课程中心
          </h1>
          <p className="text-xl text-white/80 max-w-2xl">
            跟随名师学习经典，感受传统文化魅力
          </p>
        </div>
      </header>

      {/* Filters */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-4">
            <select className="px-4 py-2 bg-[#F5F0E6] rounded-lg border-0 focus:ring-2 focus:ring-[#8B0000]">
              <option value="">全部课程</option>
              <option value="ru">儒家经典</option>
              <option value="dao">道家思想</option>
              <option value="fo">佛学智慧</option>
              <option value="history">历史文学</option>
            </select>
            <select className="px-4 py-2 bg-[#F5F0E6] rounded-lg border-0 focus:ring-2 focus:ring-[#8B0000]">
              <option value="">全部难度</option>
              <option value="beginner">初级</option>
              <option value="intermediate">中级</option>
              <option value="advanced">高级</option>
            </select>
            <select className="px-4 py-2 bg-[#F5F0E6] rounded-lg border-0 focus:ring-2 focus:ring-[#8B0000]">
              <option value="latest">最新上架</option>
              <option value="popular">最受欢迎</option>
              <option value="rating">评分最高</option>
              <option value="price-low">价格最低</option>
              <option value="price-high">价格最高</option>
            </select>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
            >
              {/* Cover Image */}
              <div className="relative h-48 bg-gradient-to-br from-[#8B0000] to-[#5C0000]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="w-16 h-16 text-white/30" />
                </div>
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold ${
                    levelColors[course.level]
                  }`}
                >
                  {course.level}
                </span>
                {course.originalPrice && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white rounded-full text-sm font-semibold">
                    限时优惠
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#1A1A1A] mb-2 group-hover:text-[#8B0000] transition-colors">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* Mentor */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#1A1A1A] font-bold text-sm">
                    {course.mentor.name[0]}
                  </div>
                  <span className="text-sm text-gray-600">
                    {course.mentor.name}
                  </span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}课时
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    {course.rating}
                  </span>
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-2xl font-bold text-[#8B0000]">
                      ¥{course.price}
                    </span>
                    {course.originalPrice && (
                      <span className="text-sm text-gray-400 line-through ml-2">
                        ¥{course.originalPrice}
                      </span>
                    )}
                  </div>
                  <span className="flex items-center text-[#8B0000] font-semibold group-hover:underline">
                    了解详情
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 border-2 border-[#8B0000] text-[#8B0000] font-semibold rounded-lg hover:bg-[#8B0000] hover:text-white transition-colors">
            加载更多课程
          </button>
        </div>
      </main>
    </div>
  );
}
