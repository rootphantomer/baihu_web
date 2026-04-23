# 白鹄动画 Website — Design Specification

## 1. Concept & Vision

白鹄动画（Baihu Animation）是一家位于杭州的日式动画制作工作室，核心客户为日本动画制作公司，团队成员出身 Sunrise / MAPPA / J.C.STAFF 等顶级日本动画公司。

网站定位：**国际一流制作工作室的线上名片**——不是面向粉丝的娱乐网站，而是让日本制作公司在 3 秒内产生信任感的专业视觉系统。参考对象：IG PORT 旗下各子公司官网（以极克制胜、以排版建立信任）、Production I.G 官网（沉稳克制，毫不张扬）。

品牌气质关键词：**静谧、精确、信赖感、东方美学**

---

## 2. Design Language

### 2.1 Aesthetic Direction
日系极简（Japanese Minimalism）—— 受传统书道与日式活版印刷影响，大量留白，极克制动效，字体即主角。与欧美动画公司网站的张扬形成鲜明对比。

### 2.2 Color Palette

#### Dark Theme (默认)
```
--c-bg:             #0a0a0a   /* 主背景：近乎纯黑，非饱和纯黑 */
--c-surface:        #111111   /* 卡片/区块表面 */
--c-surface-2:      #181818   /* 次级表面 */
--c-border:         #242424   /* 分割线/边框 */
--c-muted:          #444444   /* 次要文字 */
--c-secondary:      #888888   /* 辅助说明文字 */
--c-primary:        #e8e4dc   /* 主文字：暖调米白，非刺眼纯白 */
--c-accent:         #c4a35a   /* 点缀色：古铜金，克制地呼应"鹄"的金羽 */
--c-accent-dim:     rgba(196, 163, 90, 0.12)  /* 点缀色半透明，用于 hover 背景 */
--c-accent-hover:   #d4b36a   /* 点缀色高亮版 */
```

#### Light Theme
```
--c-bg:             #ffffff
--c-surface:        #f7f7f5
--c-surface-2:      #f0f0ee
--c-border:         #e2e2df
--c-muted:          #aaaaaa
--c-secondary:      #666666
--c-primary:        #1a1a1a
--c-accent:         #c4a35a
--c-accent-dim:     rgba(196, 163, 90, 0.12)
--c-accent-hover:   #b89545
```

背景与文字：高对比度（>15:1），符合 WCAG AAA。

### 2.3 Typography

| 用途 | 日文字体 | 中文字体 | 字重 | 尺寸基准 |
|------|----------|----------|------|----------|
| 展示/标题 | Shippori Mincho | Noto Serif SC | 400/600 | 5–11rem |
| 正文/说明 | DM Sans | Noto Sans SC | 300/400 | 1.2–1.8rem |
| 标签/数字 | DM Mono | DM Mono | 400 | 0.8–1.2rem |
| 导航 | DM Sans | Noto Sans SC | 300 | 1.2rem |

所有字体通过 Google Fonts CDN 加载（font-display: swap）。

### 2.4 Spacing System
8px 基准网格：4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128px

### 2.5 Motion Philosophy
动效是"呼吸感"，不是"表演"。
- 页面入场：opacity 0→1 + translateY(3rem)→0，duration 1s，ease-out
- 交错延迟：每个子元素间隔 60–80ms
- Hover 过渡：200ms ease，opacity/transform/color
- Marquee：CSS animation，linear，duration 35s，无限循环
- Scroll 指示器：pulse 动画 2s ease-in-out infinite
- 禁止：弹跳、旋转、放大出现、过度的发光效果

### 2.6 Visual Assets
- 图标：无图标库，纯 CSS 线条或 Unicode 符号（如 → ← ×）或 SVG 内联
- 图片：无占位图，所有图片为真实作品截图（via vue3-lazyload）
- 装饰：细分割线（1px #242424）、大号年份数字作为视觉锚点（-webkit-text-stroke）

---

## 3. Layout & Structure

### 3.1 Page Architecture

```
/ (HomeView)
  ├── HeroSection          — 全屏，黑色背景，超大字体 + 背景网格线 + 滚动指示器
  ├── MarqueeSection       — 无限循环滚动，合作作品名（hover 暂停）
  ├── FeaturedWorksSection  — 精选 6 部作品，3列网格 + hover overlay
  ├── AboutPreview          — 双栏：左侧公司介绍 + 右侧统计数据
  ├── ServicesSection       — 3列服务卡片网格（动画/前期设计/覆盖范围）
  └── RecruitCta            — 招聘 CTA（带边框按钮）

/works (WorkView)
  ├── PageHeader            — 页面标题 + 筛选器
  └── WorkGrid             — 全部作品，筛选 + 搜索

/about (AboutView)
  ├── PageHeader
  ├── CompanyStatement
  ├── StatsGrid
  └── HistoryTimeline

/news (NewsView)
  ├── PageHeader
  └── NewsList

/join (JoinView)
  ├── PageHeader
  ├── OpenPositions
  └── ContactCta

/contact (ContactView)
  ├── PageHeader
  ├── ContactInfo
  └── OfficeLocation
```

### 3.2 Responsive Strategy
- Desktop first，390px / 430px / 768px / 900px / 1024px / 1280px 多断点
- 移动端：单列布局，汉堡菜单，全宽内容
- 字号：全局 font-size 由 App.vue 的 @media 控制（基于 1920px 设计稿，1rem = 10px）

---

## 4. Features & Interactions

### 4.1 全局
- 固定顶部导航栏（背景透明，滚动后带 backdrop-filter blur(12px)）
- 深色/浅色主题切换（自动检测系统偏好 + 用户持久化选择）
- 语言切换（ZH / JA），按钮式切换器
- 平滑滚动锚点跳转
- 页面切换过渡：opacity fade 400ms

### 4.2 首页
- Hero：超大公司名 BAIHU（11rem）+ 中文名白鹄动画（5rem，古铜金色）+ 副标题 + 双按钮（实心 + 幽灵）
- Hero 背景：6列网格线 + 右下角超大年份数字装饰（28rem，text-stroke）
- Scroll 指示器：左侧竖排 + 渐变线 + pulse 动画
- Marquee：CSS animation，左右无限循环，hover 暂停，显示合作作品日文名
- Works 网格：3列（移动端2列/1列），aspect-ratio 2:3（移动端 3:4/16:10），hover 时图片微微放大（scale 1.04）+ overlay 显示分工类型
- Services：3列卡片网格（移动端1列），带编号、hover 底部金线动画
- About Preview：双栏布局，左侧标题+声明+链接，右侧 2x2 统计数据 + 引用块
- Recruitment CTA：左右布局，幽灵按钮（古铜金边框，hover 填充）

### 4.3 Works 页面
- 筛选栏：年份下拉 + 类型多选 + 标题搜索
- 网格：masonry 或规则网格，hover 显示分工标签
- 点击图片：打开灯箱预览（轻量化，无依赖）

### 4.4 About 页面
- 数据指标：团队规模 / 成立年份 / 年产作品数 / 合作客户数
- 历史时间轴（竖向）
- 核心优势（3 列图标+文字）

### 4.5 Join 页面
- 职位列表（手风琴展开）
- 每个职位：职责 / 要求 / 联系方式
- CTA：投递邮箱

### 4.6 Contact 页面
- 联系信息（邮箱 / 地址 / 社交）

### 4.7 News 页面
- 新闻列表（标题 / 日期 / 摘要）
- 公告形式（无详情页，直接列表展示）

---

## 5. Component Inventory

| 组件 | 状态 | 说明 |
|------|------|------|
| HeaderComponent | fixed / transparent→blur | Logo(BAIHU｜白鹄动画) + Nav + Theme Toggle + Lang Switch + Hamburger |
| HeroSection | 静态 + CSS 动画 | 背景网格 + 大字 + 双按钮 + scroll 指示器 + 年份装饰 |
| MarqueeSection | 动画 / pause-on-hover | CSS infinite scroll，合作作品名 |
| FeaturedWorksSection | 响应式网格 | 3列作品卡片，hover overlay + 箭头动画 |
| AboutPreviewSection | 双栏 | 2x2 统计数据 + 引用块 |
| ServicesSection | 3列网格 | 编号卡片 + hover 底部金线 |
| RecruitCta | 静态 | 幽灵按钮 CTA |
| WorkCard | default / hover | 图片 + 标题 + 角色标签 + 日期 |
| FooterComponent | 静态 | 版权 + 社交链接 |
| LightboxModal | open / close | 图片预览灯箱 |

---

## 6. Technical Approach

### 6.1 Stack
- Vue 3 + Composition API + TypeScript
- Vite + SCSS
- vue-router（Hash 模式）
- vue-i18n（zh-CN / ja-JP / en-US / zh-TW）
- vue3-lazyload（图片懒加载）
- 零 UI 组件库，无外部 CSS 框架

### 6.2 文件结构
```
src/
├── assets/          # 图片资源 + main.css（基础 reset）
├── components/      # UI 组件
│   ├── HeaderComponent.vue
│   ├── FooterComponent.vue
│   └── home/        # 首页子组件
│       ├── HeroSection.vue
│       ├── MarqueeSection.vue
│       ├── FeaturedWorksSection.vue
│       ├── AboutPreviewSection.vue
│       ├── ServicesSection.vue
│       └── RecruitCta.vue
├── composables/     # 可复用逻辑（useCarousel, useI18n, useTheme）
├── data/            # 静态数据（works, news, recruitment, showcase）
├── locales/         # 翻译文件（zh-CN, ja-JP, en-US, zh-TW）
├── plugins/         # 插件初始化
├── router/          # 路由配置
├── stores/          # Pinia stores
├── types/           # TypeScript 类型定义
├── views/           # 页面组件
│   ├── HomeView.vue
│   ├── WorksView.vue
│   ├── WorkView.vue
│   ├── AboutView.vue
│   ├── NewsView.vue
│   ├── JoinView.vue
│   └── ContactView.vue
├── App.vue          # 根组件（设计令牌 + 全局样式）
└── main.ts          # 入口
```

### 6.3 CSS 架构
- **Design Tokens**：所有颜色、字体、动效定义在 App.vue `:root` / `[data-theme='dark']` / `[data-theme='light']`
- **主题切换**：通过 `data-theme` 属性 + CSS 变量自动切换
- **全局过渡**：所有元素的 background-color / border-color / color / box-shadow 带 300ms ease 过渡
- **响应式字体**：html font-size 基于 `calc(100vw / 192)`（1920px 设计稿），各断点覆盖

### 6.4 交互细节
- **触摸优化**：`-webkit-tap-highlight-color: transparent` + `touch-action: manipulation` + 触摸反馈（scale 0.98/0.99）
- **移动端 overlay 默认显示**：Works 卡片在移动端默认显示 overlay（opacity: 1）
- **导航下划线**：hover / active 时底部金线从 0 展开到 100%
- **按钮箭头**：hover 时箭头微移（translateX）
- **汉堡菜单**：三线→X 变形动画 + slideInUp 交错入场

### 6.5 Performance
- 图片全部 lazy load（vue3-lazyload）
- Google Fonts：preconnect + display=swap
- 构建目标：Lighthouse 95+
