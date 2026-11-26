# 白鹄动画 Website — Design Specification

## 1. Concept & Vision

白鹄动画（Baihu Animation）是一家位于杭州的日式动画制作工作室，核心客户为日本动画制作公司，团队成员出身 Sunrise / MAPPA / J.C.STAFF 等顶级日本动画公司。

网站定位：**国际一流制作工作室的线上名片**——不是面向粉丝的娱乐网站，而是让日本制作公司在 3 秒内产生信任感的专业视觉系统。参考对象：IG PORT 旗下各子公司官网（以极克制胜、以排版建立信任）、Production I.G 官网（沉稳克制，毫不张扬）。

> V2.2 作品驱动改版：参考 MAPPA / WIT STUDIO / ufotable / Production I.G 的官网做法，把首页主角从公司标语换成作品主视觉。网站是工作室的作品目录，不是企业服务落地页。

品牌气质关键词：**作品优先、克制、精确、信赖感、东方美学**

---

## 2. Design Language

### 2.1 Aesthetic Direction
作品驱动的极简 —— 首屏是整屏作品 key visual，文字只保留作品名、年份与分工；内页用细线网格、大图、编号列表组织内容。不圆角、不渐变、不投影、不 pill 按钮。年轻感来自图像尺度和排版节奏，而不是装饰。衬线字体只用于引言，延续东方气质。

### 2.2 Color Palette

#### Dark Theme (默认)
```
--c-bg:             #0b0d12   /* 墨黑 */
--c-surface:        #11141b
--c-surface-2:      #171b24
--c-border:         #2a2e38   /* 唯一的结构线 */
--c-muted:          #6b7180
--c-secondary:      #9da3b0
--c-primary:        #f2f0ea   /* 宣纸白 */
--c-accent:         #c6a15b   /* 古铜金：唯一强调色 */
--c-on-accent:      #0b0d12
```

#### Light Theme
```
--c-bg:             #f4f2ed
--c-surface:        #ffffff
--c-surface-2:      #eae7df
--c-border:         #d8d3c8
--c-muted:          #8b877e
--c-secondary:      #5c5a54
--c-primary:        #17181a
--c-accent:         #8a6a2f
--c-on-accent:      #ffffff
```

所有圆角令牌为 `0`，`--shadow-card: none`。兼容令牌 `--c-accent-2/3` 均指向 `--c-accent`。禁止新增第二强调色、渐变和阴影。

背景与文字：高对比度（>15:1），符合 WCAG AAA。

### 2.3 Typography

| 用途 | 日文字体 | 中文字体 | 字重 | 尺寸基准 |
|------|----------|----------|------|----------|
| 展示/标题 | DM Sans | Noto Sans SC | 500/600 | 2–5rem |
| 正文/说明 | DM Sans | Noto Sans SC | 400 | 1.2–1.6rem |
| 引言/金句 | Shippori Mincho | Noto Serif SC | 400 | 1.8rem |
| 标签/数字 | DM Mono | DM Mono | 400/500 | 0.9–1.2rem |
| 导航 | DM Sans | Noto Sans SC | 500 | 1.2rem |

所有字体通过 Google Fonts CDN 加载（font-display: swap）。

### 2.4 Spacing System
8px 基准网格：4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128px

### 2.5 Motion Philosophy
动效服务于观看作品，不抢戏。
- 首屏轮播：6s 自动切换，opacity crossfade 700ms；hover / focus / 标签页隐藏暂停；手动操作后重置计时器；提供播放/暂停、键盘 ←/→、触摸横滑
- 作品图 hover：scale 1.04，600ms ease-out；仅此一处图像动效
- 首屏文字切换：opacity + translateY，260ms；作品名描边大字用 clip-path 遮罩推进，不改图片比例，移动端隐藏
- 滚动揭示：标题 mask-up / 内容上移 / 细线 scaleX，阈值 0.12、底部 -6% rootMargin、卡片 70–90ms stagger；进入视口只触发一次
- 顶部 1px 滚动进度线：古铜金，首页首屏反白；节点进入视口前的悬停仍可临时展开流程线
- 链接 hover：颜色 / 下划线展开，200ms
- 禁止：旋转卡片、轨道、pulse、弹跳、发光、视差；尊重 prefers-reduced-motion

### 2.6 Visual Assets
- 图标：无图标库，纯 CSS 线条或 Unicode 符号（如 → ← ×）或 SVG 内联
- 图片：无占位图，所有图片为真实作品截图（via vue3-lazyload）
- 装饰：细分割线（1px #242424）、大号年份数字作为视觉锚点（-webkit-text-stroke）

---

## 3. Layout & Structure

### 3.1 Page Architecture

```
/ (HomeView)
  ├── HeroSection          — 左文字 / 右完整竖版海报轮播
  ├── FeaturedWorksSection  — 精选 6 部作品，细线网格
  ├── AboutPreview          — 全宽工作室陈述图 + 一句话宣言
  ├── ServicesSection       — 制作流程横向轴（分镜/原画/动画/作监/背景）
  └── RecruitCta            — 开放岗位数量 + 邮箱入口

/works (WorksView)
  ├── FeaturedWork          — 最新作品大图 + 信息
  ├── FilterBar             — 搜索 + 年份筛选（下划线按钮）
  └── YearGroups            — 按年份分组的海报档案

/about (AboutView)
  ├── Statement             — 衬线大字工作室自述
  ├── Numbers               — 超大数字指标
  ├── Manifesto             — 三行信念，不用编号卡
  ├── Mission               — /pull quote
  └── History + FAQ         — 双栏收尾

/news (NewsView)
  ├── LatestNews            — 最新一条置顶突出
  └── NewsArchive           — 日期作为主角的公告列表

/join (JoinView)
  ├── PageHead              — 标题 + 招募说明
  ├── RolesIndex + Detail   — 左侧岗位索引 + 右侧 sticky 详情
  └── Apply                 — 邮箱 + 邮件标题格式

/contact (ContactView)
  ├── PageHead
  ├── BigEmail              — 邮箱作为页面主角
  └── InfoRows              — 地址 / 时间 / 社交信息行
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
- Hero：左 48% 纯黑编辑式说明区（竖细线 + 类型/年份 + 作品名 + 分工 + 下划线链接 + 播放/暂停/箭头/进度条），右 52% 竖版海报区。`object-fit: contain` 完整展示原比例海报，不裁剪；同图模糊压暗做背景填充。首页未滚动时 header 自带深色半透明底 + 模糊，保证导航始终可读
- Works 网格：3列（移动端2列/1列），1px 细线网格，海报完整 contain，hover 微放大
- About Preview：全宽作品图压暗 + 衬线宣言 + 下划线链接
- Services：5 步制作流程轴，序号仅用于真实顺序；底部一行承接范围
- Recruitment CTA：`03` 大数字 + 开放岗位标签 + 下划线入口

### 4.3 Works 页面
- 最新作品作为顶部 featured block
- 搜索 + 年份下划线筛选；结果按年份分组
- 海报完整显示不裁剪；`content-visibility: auto` 优化长列表
- 灯箱：按钮遮罩 + Escape 关闭 + 焦点恢复

### 4.4 About 页面
- 衬线大字宣言，不用企业标语卡
- 数据改成超大数字排版
- 价值观改成三行「我们相信」式短句，不用编号卡片
- 使命为 pull quote；历史和 FAQ 双栏收尾

### 4.5 Join 页面
- 左侧岗位索引，右侧 sticky 详情面板
- 职责 / 要求两栏对照
- 投递邮箱与邮件标题格式作为明确下一步

### 4.6 Contact 页面
- 大邮箱为主角
- 地址 / 时间 / 社交为细信息行，不做 2x2 卡片

### 4.7 News 页面
- 最新一条置顶，日期与标题形成主次
- 其余按日期列表，不用装饰性编号

---

## 5. Component Inventory

| 组件 | 状态 | 说明 |
|------|------|------|
| HeaderComponent | fixed / transparent→blur + 滚动进度线 | Logo + Nav + Theme Toggle + Lang Switch + Hamburger；首页首屏反白，滚动 80px/40px 迟滞切换状态；语言菜单支持 Esc/上下/Home/End；移动抽屉含可聚焦关闭按钮与滚动锁 |
| HeroSection | 轮播 + CSS 动画 + 描边大字 | 左文字 / 右完整竖版海报（contain，不裁剪）；播放/暂停、键盘、触摸滑动、下一张预加载、显式图片尺寸与 fetchpriority；超大作品名跨栏遮罩推进，移动端隐藏 |
| FeaturedWorksSection | 响应式网格 | 3列作品卡片，海报完整 contain，hover 微放大 |
| AboutPreviewSection | 全宽图 + 文字 | 作品图压暗 + 衬线宣言 + 链接 |
| ServicesSection | 流程轴 | 5 步制作流程，序号仅表示真实顺序 |
| RecruitCta | 数据入口 | 岗位数量 + 开放岗位标签 + 链接 |
| WorksView | 年度档案 | 最新作品 + 年份分组 + 完整海报 + 灯箱 |
| AboutView | 编辑式自述 | 大字宣言 + 数字排版 + 信念行 + 历史/FAQ 双栏 |
| JoinView | 索引 + 详情 | 岗位列表 + sticky 详情 + 投递 CTA |
| ContactView | 邮箱主角 | 大邮箱 + 信息行 |
| NewsView | 公告板 | 最新置顶 + 日期列表 |
| FooterComponent | 静态 | 版权 + 社交链接 |

---

## 6. Technical Approach

### 6.1 Stack
- Vue 3 + Composition API + TypeScript
- Vite + SCSS
- vue-router（History 模式，Cloudflare Workers SPA fallback）
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
├── types/           # TypeScript 类型定义
├── views/           # 页面组件
│   ├── HomeView.vue
│   ├── WorksView.vue
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
- **响应式字体**：桌面端 html font-size 为 10px，1920px 以上按 `calc(100vw / 192)` 放大，各断点覆盖

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
