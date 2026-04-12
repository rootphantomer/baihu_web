# 白鹄动画 Website — Design Specification

## 1. Concept & Vision

白鹄动画（Baihu Animation）是一家位于杭州的日式动画代工工作室，核心客户为日本动画制作公司，团队成员出身 Sunrise / MAPPA / J.C.STAFF 等顶级日本动画公司。

网站定位：**国际一流代工工作室的线上名片**——不是面向粉丝的娱乐网站，而是让日本制作公司在 3 秒内产生信任感的专业视觉系统。参考对象：IG PORT 旗下各子公司官网（以极克制胜、以排版建立信任）、Production I.G 官网（沉稳克制，毫不张扬）。

品牌气质关键词：**静谧、精确、信赖感、东方美学**

---

## 2. Design Language

### 2.1 Aesthetic Direction
日系极简（Japanese Minimalism）—— 受传统书道与日式活版印刷影响，大量留白，极克制动效，字体即主角。与欧美动画公司网站的张扬形成鲜明对比。

### 2.2 Color Palette

```
--color-bg:         #0a0a0a   /* 主背景：近乎纯黑，非饱和纯黑 */
--color-surface:    #111111   /* 卡片/区块表面 */
--color-border:     #222222   /* 分割线/边框 */
--color-muted:      #444444   /* 次要文字 */
--color-secondary:  #888888   /* 辅助说明文字 */
--color-primary:    #e8e4dc   /* 主文字：暖调米白，非刺眼纯白 */
--color-accent:     #c4a35a   /* 点缀色：古铜金，克制地呼应"鹄"的金羽 */
--color-accent-dim: #6b5a30   /* 点缀色暗淡版，用于 hover 背景 */
```

背景与文字：高对比度（>15:1），符合 WCAG AAA。

### 2.3 Typography

| 用途 | 日文字体 | 中文字体 | 字重 | 尺寸基准 |
|------|----------|----------|------|----------|
| 展示/标题 | Shippori Mincho | Noto Serif SC | 400/600 | 5–10rem |
| 正文/说明 | Shippori Mincho | Noto Serif SC | 300/400 | 1.4–2rem |
| 标签/数字 | DM Mono | DM Mono | 400 | 1–1.4rem |
| 导航 | DM Sans | Noto Sans SC | 300 | 1.2rem |

所有字体通过 Google Fonts CDN 加载（font-display: swap）。

### 2.4 Spacing System
8px 基准网格：4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128px

### 2.5 Motion Philosophy
动效是"呼吸感"，不是"表演"。
- 页面入场：opacity 0→1 + translateY(2rem)→0，duration 600ms，ease-out
- 交错延迟：每个子元素间隔 80ms
- Hover 过渡：200ms ease，opacity/transform/color
- Marquee：CSS animation，linear，duration 30s，无限循环
- 禁止：弹跳、旋转、放大出现、过度的发光效果

### 2.6 Visual Assets
- 图标：无图标库，纯 CSS 线条或 Unicode 符号（如 → ← ×）
- 图片：无占位图，所有图片为真实作品截图
- 装饰：细分割线（1px #222）、大号数字作为视觉锚点

---

## 3. Layout & Structure

### 3.1 Page Architecture

```
/ (HomeView)
  ├── HeroSection          — 全屏，黑色背景，超大字体
  ├── MarqueeSection       — 无限循环滚动，合作客户
  ├── WorksSection          — 精选 6 部作品，大图网格
  ├── AboutPreview          — 一句话公司介绍 + 入口
  └── RecruitmentCta         — 招聘 CTA

/works (WorkView)
  ├── PageHeader            — 页面标题 + 筛选器
  └── WorkGrid             — 全部作品，筛选 + 搜索

/about (AboutView)
  ├── PageHeader
  ├── CompanyStatement
  ├── StatsGrid
  └── HistoryTimeline

/recruitment (JoinView)
  ├── PageHeader
  ├── OpenPositions
  └── ContactCta

/contact (ContactView)
  ├── PageHeader
  ├── ContactInfo
  └── OfficeLocation

/news (NewsView)
  ├── PageHeader
  └── NewsList
```

### 3.2 Responsive Strategy
- Desktop first，768px / 1024px / 1280px 三个断点
- 移动端：单列布局，汉堡菜单，全宽内容
- 字号：全局 font-size 由 App.vue 的 @media 控制（保留现有 calc 机制，但调整基准）

---

## 4. Features & Interactions

### 4.1 全局
- 固定顶部导航栏（背景透明，滚动后带 backdrop-filter）
- 语言切换（ZH / EN），根据浏览器 UA 决定初始语言
- 平滑滚动锚点跳转

### 4.2 首页
- Hero：超大公司名（4.5rem）+ 副标题 + 向下箭头动画（1s bounce loop）
- Marquee：CSS animation，左右无限循环，hover 时暂停
- Works 网格：3列，hover 时图片微微放大（scale 1.03）+ overlay 显示分工类型
- 筛选：按年份、按分工类型（LO/原画/作画监督/背景/etc.）

### 4.3 Works 页面
- 筛选栏：年份下拉 + 类型多选 + 标题搜索
- 网格：masonry 或规则网格，hover 显示分工标签
- 点击图片：打开灯箱预览（轻量化，无依赖）

### 4.4 About 页面
- 数据指标：团队规模 / 成立年份 / 年产作品数 / 合作客户数
- 历史时间轴（竖向）
- 核心优势（3 列图标+文字）

### 4.5 Recruitment 页面
- 职位列表（手风琴展开）
- 每个职位：职责 / 要求 / 联系方式
- CTA：投递邮箱

### 4.6 Contact 页面
- 联系信息（邮箱 / 地址 / 社交）
- 简化的联系表单（可选，看是否需要后端）

### 4.7 News 页面
- 新闻列表（标题 / 日期 / 摘要）
- 公告形式（无详情页，直接列表展示）

---

## 5. Component Inventory

| 组件 | 状态 | 说明 |
|------|------|------|
| HeaderComponent | sticky / transparent→blur | Logo + Nav + Lang Switch |
| HeroSection | 静态 | 大字 + 副标题 + 滚动指示 |
| MarqueeSection | 动画 / pause-on-hover | CSS infinite scroll |
| WorksGrid | default / hover / empty | 带筛选器的作品网格 |
| WorkCard | default / hover | 图片 + 标题 + 角色标签 |
| AboutSection | 静态 | 数据 + 优势 |
| RecruitmentSection | 静态 | 职位列表 |
| ContactSection | 静态 | 联系信息 |
| NewsSection | 静态 | 新闻列表 |
| FooterComponent | 静态 | 版权 + 社交链接 |
| LightboxModal | open / close | 图片预览灯箱 |

---

## 6. Technical Approach

### 6.1 Stack
- Vue 3 + Composition API + TypeScript
- Vite + SCSS
- vue-router（Hash 模式）
- vue-i18n（zh-CN / ja-JP）
- vue3-lazyload（图片懒加载）
- 零 UI 组件库，无外部 CSS 框架

### 6.2 文件结构
```
src/
├── assets/          # 图片资源
├── components/      # UI 组件
├── composables/      # 可复用逻辑（useCarousel 等）
├── data/            # 静态数据（works, news, recruitment）
├── locales/         # 翻译文件（zh-CN.ts, ja-JP.ts）
├── plugins/         # 插件初始化（i18n.ts）
├── router/          # 路由配置
├── views/           # 页面组件
├── App.vue          # 根组件
└── main.ts          # 入口
```

### 6.3 Performance
- 图片全部 lazy load
- Google Fonts：preconnect + display=swap
- 构建目标：Lighthouse 95+
