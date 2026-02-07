// 数据库初始化数据
// 运行: npx prisma db seed

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 开始初始化数据...");

  // 创建管理员
  const admin = await prisma.user.upsert({
    where: { email: "admin@ai-guoxue.com" },
    update: {},
    create: {
      email: "admin@ai-guoxue.com",
      name: "超级管理员",
      role: "ADMIN",
      phone: "13800000000",
    },
  });
  console.log("✅ 管理员创建成功:", admin.email);

  // 创建导师
  const mentors = await Promise.all([
    prisma.mentor.create({
      data: {
        name: "张明德",
        title: "国学泰斗",
        bio: "50年国学研习，精通四书五经，著作等身。曾任多所大学国学教授。",
        specialties: ["儒家经典", "《大学》", "企业管理"],
        hourlyRate: 2000,
        rating: 4.9,
        reviewCount: 1256,
        isActive: true,
      },
    }),
    prisma.mentor.create({
      data: {
        name: "李信道",
        title: "道家养生专家",
        bio: "武当山传人，精通道家养生与太极，致力于传统养生文化推广。",
        specialties: ["道家思想", "养生功法", "风水布局"],
        hourlyRate: 1800,
        rating: 4.8,
        reviewCount: 892,
        isActive: true,
      },
    }),
    prisma.mentor.create({
      data: {
        name: "王易经",
        title: "易经大师",
        bio: "国际易经协会理事，服务众多企业家，精通六爻、梅花易数。",
        specialties: ["六爻占卜", "梅花易数", "企业决策"],
        hourlyRate: 3000,
        rating: 4.9,
        reviewCount: 2103,
        isActive: true,
      },
    }),
    prisma.mentor.create({
      data: {
        name: "陈诗韵",
        title: "古典文学博士",
        bio: "北京大学中文系博士，精研古典诗词，出版诗集多部。",
        specialties: ["古典诗词", "诗经", "唐诗宋词"],
        hourlyRate: 1500,
        rating: 4.7,
        reviewCount: 567,
        isActive: true,
      },
    }),
    prisma.mentor.create({
      data: {
        name: "赵禅心",
        title: "禅修导师",
        bio: "禅宗传人，精通禅修冥想，帮助企业家减压静心。",
        specialties: ["禅修", "冥想", "心性修养"],
        hourlyRate: 2500,
        rating: 4.9,
        reviewCount: 423,
        isActive: true,
      },
    }),
  ]);
  console.log("✅ 导师创建成功:", mentors.length, "位");

  // 创建课程分类
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "儒家经典",
        slug: "ru-jia-jing-dian",
        icon: "📚",
        description: "论语、孟子、大学、中庸等儒家经典解读",
      },
    }),
    prisma.category.create({
      data: {
        name: "道家智慧",
        slug: "dao-jia-zhi-hui",
        icon: "🧘",
        description: "道德经、庄子等道家经典学习",
      },
    }),
    prisma.category.create({
      data: {
        name: "易经占卜",
        slug: "yi-jing-zhan-bu",
        icon: "🔮",
        description: "易经六十四卦、占卜入门",
      },
    }),
    prisma.category.create({
      data: {
        name: "风水布局",
        slug: "feng-shui-bu-ju",
        icon: "🏯",
        description: "办公风水、居家风水、商业选址",
      },
    }),
    prisma.category.create({
      data: {
        name: "古典诗词",
        slug: "gu-dian-shi-ci",
        icon: "📖",
        description: "诗词鉴赏、创作入门",
      },
    }),
  ]);
  console.log("✅ 分类创建成功:", categories.length, "个");

  // 创建示例课程
  const courses = await Promise.all([
    prisma.course.create({
      data: {
        title: "《大学》精讲",
        slug: "da-xue-jiang",
        description: "深入解读《大学》三纲领八条目，理解儒家修身治国平天下的智慧",
        price: 99,
        duration: 12,
        level: "BEGINNER",
        status: "PUBLISHED",
        mentorId: mentors[0].id,
        categoryId: categories[0].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "《道德经》与企业管理",
        slug: "dao-de-jing-qi-ye",
        description: "感悟老子智慧，理解无为而治的哲学思想在现代管理中的应用",
        price: 129,
        duration: 15,
        level: "INTERMEDIATE",
        status: "PUBLISHED",
        mentorId: mentors[1].id,
        categoryId: categories[1].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "易经入门：六十四卦详解",
        slug: "yi-jing-ru-men",
        description: "从零开始学习《易经》，了解阴阳五行与变化之道",
        price: 159,
        duration: 20,
        level: "BEGINNER",
        status: "PUBLISHED",
        mentorId: mentors[2].id,
        categoryId: categories[2].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "企业家风水课",
        slug: "qi-ye-jia-feng-shui-ke",
        description: "办公风水、居家风水、商业选址全面指南",
        price: 199,
        duration: 10,
        level: "INTERMEDIATE",
        status: "PUBLISHED",
        mentorId: mentors[1].id,
        categoryId: categories[3].id,
      },
    }),
    prisma.course.create({
      data: {
        title: "古典诗词鉴赏",
        slug: "gu-dian-shi-ci-jian-shang",
        description: "从《诗经》到唐诗宋词，感受古典诗词之美",
        price: 99,
        duration: 25,
        level: "BEGINNER",
        status: "PUBLISHED",
        mentorId: mentors[3].id,
        categoryId: categories[4].id,
      },
    }),
  ]);
  console.log("✅ 课程创建成功:", courses.length, "门");

  // 创建示例会员等级
  const membershipPlans = await Promise.all([
    prisma.siteConfig.create({
      data: {
        key: "membership_entry_name",
        value: "入门弟子",
      },
    }),
    prisma.siteConfig.create({
      data: {
        key: "membership_entry_price",
        value: "999",
      },
    }),
    prisma.siteConfig.create({
      data: {
        key: "membership_scholar_name",
        value: "儒商",
      },
    }),
    prisma.siteConfig.create({
      data: {
        key: "membership_scholar_price",
        value: "9999",
      },
    }),
    prisma.siteConfig.create({
      data: {
        key: "membership_master_name",
        value: "掌门",
      },
    }),
    prisma.siteConfig.create({
      data: {
        key: "membership_master_price",
        value: "49999",
      },
    }),
  ]);
  console.log("✅ 会员等级配置创建成功");

  console.log("\n🎉 数据初始化完成！\n");
}

main()
  .catch((e) => {
    console.error("❌ 初始化失败:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
