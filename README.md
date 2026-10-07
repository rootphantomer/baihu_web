# 白鹄动画官方网站

<div align="center">

![Vue 3](https://img.shields.io/badge/Vue-3.5-4FC08D?logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-Private-red)

**杭州白鹄动画有限公司官方网站** — 日式极简风格的动画制作工作室线上名片

[🌐 在线预览](https://baihu-animation.com) · [📖 设计文档](DESIGN.md)

</div>

---

## 📋 项目简介

白鹄动画（Baihu Animation）是一家位于杭州的日式二维动画制作工作室，核心成员来自 Sunrise、MAPPA、J.C.STAFF 等日本顶级动画公司。

本网站采用**日系极简主义**设计理念，以极克制的视觉语言建立专业信任感，目标受众为日本动画制作公司及合作伙伴。网站支持简体中文、繁体中文、英文、日文四种语言，提供作品展示、公司介绍、新闻动态、人才招聘等功能。

### ✨ 核心特性

- 🎨 **日系极简设计** — 受传统书道与日式活版印刷影响，大量留白，字体即主角
- 🌍 **多语言国际化** — zh-CN / zh-TW / en-US / ja-JP 四语，自研轻量 i18n（零运行时依赖）
- 🌓 **明暗双主题** — 跟随系统偏好并可手动切换，选择持久化到 localStorage
- 📱 **完全响应式** — Desktop First，基于 `calc(100vw / 192)` 的根字号缩放
- ⚡ **按需加载** — 路由级懒加载 + 手动分包（vendor / libs），首页 gzip 约 38 KB
- 🔍 **SEO 内建** — 每页独立 meta/OG/Twitter 卡片，路由切换自动注入，含 JSON-LD 结构化数据
- 🎭 **克制动效** — 统一缓动曲线，无过度表演

---

## 🛠️ 技术栈

### 运行时依赖

| 依赖 | 版本 | 说明 |
| --- | --- | --- |
| [Vue](https://vuejs.org/) | ^3.5.32 | Composition API，`<script setup>` |
| [Vue Router](https://router.vuejs.org/) | ^5.0.4 | **Hash 模式**，兼容任意静态托管 |
| [Pinia](https://pinia.vuejs.org/) | ^3.0.4 | 状态管理 |
| [normalize.css](https://necolas.github.io/normalize.css/) | ^8.0.1 | CSS 重置 |

> **国际化为自研实现**，不依赖 vue-i18n。核心逻辑在 `src/composables/useI18n.ts`，以 Vue 插件形式注入
> （`src/plugins/simple-i18n.ts`），API 兼容 vue-i18n 的使用习惯。选型理由：四语言、键数量可控，
> 无需引入 30+ KB 运行时与编译期依赖。

### 开发依赖

| 依赖 | 版本 | 说明 |
| --- | --- | --- |
| [Vite](https://vite.dev/) | ^8.0.8 | 构建工具 |
| TypeScript | ~6.0.2 | 类型系统 |
| [Sass](https://sass-lang.com/) | ^1.99.0 | 样式预处理（`lang="scss"`） |
| [vue-tsc](https://github.com/vuejs/language-tools) | ^3.2.6 | SFC 类型检查 |
| ESLint | ^10.2.0 | 代码检查（flat config） |
| Prettier | 3.8.2 | 代码格式化 |
| vite-plugin-vue-devtools | ^8.1.1 | 仅开发环境加载 |

### 设计相关资源

- **字体**：Google Fonts（`Shippori Mincho` / `Noto Serif SC` / `DM Sans` / `Noto Sans SC` / `DM Mono`），
  在 `src/App.vue` 中通过 `@import` 引入；`index.html` 已配置 `preconnect` 提前建连
- **图标**：内联 SVG + `src/assets/sns/` 静态图标
- **无自动导入**：未使用 `unplugin-auto-import` / `unplugin-vue-components`，依赖均显式 `import`

---

## 📁 项目结构

```
baihu_web/
├── .github/workflows/       # CI：ci.yml（检查+构建）、size.yml（产物体积）、auto-release.yml
├── public/                  # favicon.ico、robots.txt、sitemap.xml
├── src/
│   ├── assets/              # 静态资源（logo、favicon、sns 图标）
│   │   └── sns/             # 社交平台图标
│   ├── components/          # 全局组件
│   │   ├── HeaderComponent.vue
│   │   ├── FooterComponent.vue
│   │   └── home/            # 首页区块组件
│   │       ├── HeroSection.vue
│   │       ├── MarqueeSection.vue
│   │       ├── ServicesSection.vue
│   │       ├── FeaturedWorksSection.vue
│   │       ├── AboutPreviewSection.vue
│   │       └── RecruitCta.vue
│   ├── composables/         # 组合式函数
│   │   ├── useI18n.ts       # 轻量 i18n 核心（响应式 locale、t()、回退）
│   │   ├── useTheme.ts      # 明暗主题切换与持久化
│   │   ├── useSeoMeta.ts    # meta / OG / JSON-LD 注入
│   │   └── useRouterPrefetch.ts # 路由级预取
│   ├── data/                # 静态数据
│   │   ├── works.ts         # 参与作品
│   │   ├── news.ts          # 新闻动态
│   │   ├── recruitment.ts   # 招聘岗位
│   │   └── nav.ts           # 导航结构
│   ├── locales/             # 语言包（各约 270 行）
│   │   ├── zh-CN.ts         # 简体中文
│   │   ├── zh-TW.ts         # 繁体中文
│   │   ├── en-US.ts         # 英文
│   │   └── ja-JP.ts         # 日文
│   ├── plugins/
│   │   └── simple-i18n.ts   # i18n Vue 插件（注入 $t / $locale / provide）
│   ├── router/index.ts      # 路由表 + 每页 SEO 元数据 + 滚动行为
│   ├── types/               # 类型声明与模块扩展
│   ├── views/               # 页面组件（均懒加载）
│   │   ├── HomeView.vue
│   │   ├── WorksView.vue
│   │   ├── WorkView.vue
│   │   ├── AboutView.vue
│   │   ├── NewsView.vue
│   │   ├── JoinView.vue
│   │   ├── ContactView.vue
│   │   └── NotFoundView.vue
│   ├── App.vue              # 根组件（Design Tokens、全局样式、字体加载）
│   └── main.ts              # 应用入口
├── BUILD.md                 # 构建与部署说明
├── DESIGN.md                # 设计规范
├── RULES.md                 # 代码规范约定
├── CLAUDE.md                # AI 助手上下文
├── I18N_MIGRATION.md        # 国际化迁移说明
├── index.html               # HTML 模板（含 SEO meta、字体预连接、JSON-LD）
├── vite.config.ts           # Vite 配置
└── package.json
```

---

## 🚀 快速开始

### 环境要求

- **Node.js >= 22**
- **Yarn 1.22.x**（仓库锁定 `yarn@1.22.22`，请勿混用 npm）

### 安装依赖

```bash
yarn install
```

> 首次安装若报网络超时，可临时走代理：
> `HTTP_PROXY=http://127.0.0.1:7892 HTTPS_PROXY=http://127.0.0.1:7892 yarn install`

### 开发模式

```bash
yarn dev
```

访问 http://localhost:5173 。开发环境会自动加载 Vue DevTools。

### 生产构建

```bash
# 类型检查 + 构建（推荐，与 CI 一致）
yarn build

# 仅构建，跳过类型检查
yarn build-only

# 本地预览构建产物
yarn preview
```

构建产物输出到 `dist/`，产物文件名带 8 位内容哈希，便于长期缓存。

### 代码质量

```bash
yarn lint         # ESLint 检查并自动修复
yarn format       # Prettier 格式化 src/
yarn type-check   # 仅类型检查
```

### 清理

```bash
yarn clean        # 删除 dist/
yarn clean:node   # 删除 node_modules/
```

---

## 🎨 设计规范

> 设计变量的唯一权威定义在 **`src/App.vue` 的 `<style>` 段**（Design Tokens）。修改样式请以该处为准。

### 色彩系统

```css
:root,
[data-theme='dark'] {
  --c-bg: #0a0a0a;         /* 主背景：近乎纯黑 */
  --c-surface: #111111;    /* 卡片 / 区块表面 */
  --c-surface-2: #181818;  /* 次级表面 */
  --c-border: #242424;     /* 分割线 / 边框 */
  --c-muted: #444444;      /* 占位文字 */
  --c-secondary: #888888;  /* 辅助说明文字 */
  --c-primary: #e8e4dc;    /* 主文字：暖调米白 */
  --c-accent: #c4a35a;     /* 点缀色：古铜金 */
  --c-accent-hover: #d4b36a;
}

[data-theme='light'] {
  --c-bg: #ffffff;
  --c-surface: #f7f7f5;
  --c-border: #e2e2df;
  --c-primary: #1a1a1a;
  /* accent 与暗色主题一致 */
}
```

> ⚠️ 变量前缀是 `--c-*`，不是 `--color-*`。

### 字体系统

| 用途 | 变量 | 字体栈 | 字重 |
| --- | --- | --- | --- |
| 展示 / 标题 | `--font-display` | `Shippori Mincho`, `Noto Serif SC`, serif | 300 / 400 / 600 |
| 正文 / 导航 | `--font-body` | `DM Sans`, `Noto Sans SC`, sans-serif | 200 / 300 / 400 |
| 标签 / 数字 | `--font-mono` | `DM Mono`, monospace | 300 / 400 |

### 响应式缩放

根字号基于视口宽度线性缩放，配合 rem 单位实现全站等比响应式：

```css
html {
  font-size: calc(100vw / 192);
}
```

### 动效

| Token | 值 | 用途 |
| --- | --- | --- |
| `--duration-fast` | `200ms` | hover、颜色过渡 |
| `--duration-base` | `600ms` | 区块入场 |
| `--duration-slow` | `1000ms` | Hero 入场 |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | 统一缓动 |

跑马灯使用 `35s linear infinite`，禁用弹跳、旋转、缩放出现等过度动效。

详细规范见 [DESIGN.md](DESIGN.md)。

---

## 📄 路由

采用 Hash 模式（`createWebHashHistory`），无需服务端 rewrite 配置即可部署到任意静态托管。

| 路径 | 名称 | 页面 | 懒加载 |
| --- | --- | --- | --- |
| `/` | home | 首页 | ✅ |
| `/works` | works | 参与作品 | ✅ |
| `/about` | about | 关于我们 | ✅ |
| `/news` | news | 最新动态 | ✅ |
| `/join` | join | 加入我们 | ✅ |
| `/contact` | contact | 联系我们 | ✅ |
| `/*` | not-found | 404 回退 | ✅ |

每条路由在 `src/router/index.ts` 的 `PAGE_SEO` 中携带独立 SEO 元数据，路由切换时由 `setupRouterSeo` 自动注入 `document`。

> ⚠️ **已知问题**：`PAGE_SEO` 中配置了 `ogImage`（`/og-home.jpg` 等 6 个文件），但这些图片在 `public/` 下并不存在，
> 分享到社交平台时 OG 卡片会缺失。补图或移除对应配置后可解决。
>
> 另注：`src/views/WorkView.vue`（作品详情）当前未被路由表引用，属于预留的孤立文件。

---

## 🌍 国际化

### 语言检测优先级

1. `localStorage` 中持久化的用户选择
2. 浏览器语言（`navigator.language`）
   - `zh-*` 且含 `Hant` / `TW` / `HK` → `zh-TW`，其余 → `zh-CN`
   - `ja-*` → `ja-JP`，`en-*` → `en-US`
3. 回退默认 `zh-CN`

翻译键缺失时回退到 `zh-CN`。用户切换语言后会写入 `localStorage`，优先级高于浏览器检测。

### 在组件中使用

```vue
<script setup lang="ts">
import { useI18n } from '@/plugins/simple-i18n'

const { t, locale, setLocale } = useI18n()
</script>

<template>
  <h1>{{ t('home.hero.title') }}</h1>
  <button @click="setLocale('ja-JP')">日本語</button>
</template>
```

`<script setup>` 中也可直接使用注入的全局属性 `$t` / `$locale` / `$setLocale`。

### 添加新语言

1. 在 `src/locales/` 新建语言文件，复制现有结构并翻译（键需与 `zh-CN.ts` 保持一致）
2. 在 `src/composables/useI18n.ts` 中三处登记：导入、`messages` 映射、`LOCALE_ORDER` / `LOCALE_LABEL`
3. `Locale` 联合类型定义在 `src/composables/useI18n.ts`，新增语言需同步扩展该类型

---

## 🔧 配置说明

### Vite（`vite.config.ts`）

| 配置 | 值 | 说明 |
| --- | --- | --- |
| `base` | `'./'` | 相对路径，产物可部署到任意子路径 |
| `target` | `'esnext'` | 构建目标为现代浏览器 |
| `cssTarget` | `'es2022'` | CSS 语法降级目标 |
| `assetsInclude` | `['**/*.png', '**/*.svg']` | 额外识别的静态资源 |
| `manualChunks` | `vendor` / `libs` | Vue 生态与其他第三方库分包 |

### TypeScript

- `tsconfig.json` — 根配置，引用下方两个子配置
- `tsconfig.app.json` — 应用代码
- `tsconfig.node.json` — Vite / ESLint 等 Node 侧

### 浏览器兼容性

通过 `package.json` 的 `browserslist` 字段配置 `production` / `development` 两套目标。

---

## 📦 部署

构建产物为纯静态文件，`dist/` 可直接托管：

- **Vercel / Netlify** — 自动识别 Vite 项目，零配置
- **GitHub Pages** — 参见仓库的 `gh-pages` 分支与 `auto-release.yml`
- **Nginx** — 指向 `dist/` 并启用 gzip

Hash 模式路由无需 SPA fallback 重写规则。Nginx 配置示例：

```nginx
server {
    listen 80;
    server_name baihu-animation.com;
    root /var/www/baihu_web/dist;
    index index.html;

    gzip on;
    gzip_types text/css application/javascript image/svg+xml;

    # 带哈希的产物可长期缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## 🔄 CI/CD

| 工作流 | 触发 | 内容 |
| --- | --- | --- |
| `ci.yml` | push / PR → `master` | Node 22 + yarn cache，依次执行 `type-check`、`lint`、`build` |
| `size.yml` | PR | 产物体积监控 |
| `auto-release.yml` | tag | 构建并发布 |

PR 需通过 `check` 与 `size` 两项检查方可合并。

---

## 🤝 开发规范

- **组件**：PascalCase（`HeroSection.vue`）
- **组合式函数**：`use` 前缀（`useTheme.ts`）
- **普通文件**：kebab-case
- **变量 / 函数**：camelCase
- **提交信息**：Conventional Commits（如 `fix(deps): ...`、`feat(home): ...`）
- **样式**：`<style lang="scss">`，颜色一律引用 `--c-*` 变量，不写死色值
- **类型安全**：所有代码须通过 `yarn type-check` 与 `yarn lint`

---

## 📞 联系方式

- **邮箱**：baihu_animation@163.com
- **地址**：浙江省杭州市滨江区长河街道齐飞路 350 号 圆伦大厦 A 座 1901
- **营业时间**：周一至周五 10:00 – 19:00（JST / CST）

---

## 📄 许可证

本项目为白鹄动画私有项目，保留所有权利。

© 2025 杭州白鹄动画有限公司

---

<div align="center">

**以匠心，赋每一帧以生命。**

Made with ❤️ by Baihu Animation Team

</div>
