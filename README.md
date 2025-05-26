# 白鹄动画官方网站

<div align="center">

![Vue 3](https://img.shields.io/badge/Vue-3.5+-4FC08D?logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9+-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3+-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-Private-red)

**杭州白鹄动画有限公司官方网站** — 日式极简风格的动画制作工作室线上名片

[🌐 在线预览](https://baihu-animation.com) · [📖 设计文档](DESIGN.md) · [📝 更新日志](CHANGELOG.md)

</div>

---

## 📋 项目简介

白鹄动画（Baihu Animation）是一家位于杭州的日式二维动画代工工作室，核心成员来自 Sunrise、MAPPA、J.C.STAFF 等日本顶级动画公司。

本网站采用**日系极简主义**设计理念，以极克制的视觉语言建立专业信任感，目标受众为日本动画制作公司及合作伙伴。网站支持简体中文、繁体中文、英文、日文四种语言，提供完整的作品展示、公司介绍、人才招聘等功能。

### ✨ 核心特性

- 🎨 **日系极简设计** — 受传统书道与日式活版印刷影响，大量留白，字体即主角
- 🌍 **多语言国际化** — 支持 zh-CN / zh-TW / en-US / ja-JP 四种语言
- 📱 **完全响应式** — Desktop First，完美适配桌面端、平板、移动端
- ⚡ **高性能优化** — 图片懒加载、代码分割、Lighthouse 95+
- ♿ **无障碍访问** — 高对比度配色（WCAG AAA），语义化 HTML
- 🎭 **克制动效** — 呼吸感动效，无过度表演

---

## 🛠️ 技术栈

### 核心技术

- **前端框架**: Vue 3.5+ (Composition API)
- **开发语言**: TypeScript 5.9+
- **构建工具**: Vite 7.3+
- **状态管理**: Pinia 3.0+
- **路由管理**: Vue Router 5.0+ (Hash 模式)
- **国际化**: vue-i18n 11.2+

### 样式与资源

- **CSS 预处理器**: Sass/SCSS
- **CSS Reset**: normalize.css
- **图片懒加载**: vue3-lazyload
- **字体**: Google Fonts (Shippori Mincho, Noto Serif SC, DM Mono)

### 开发工具

- **代码规范**: ESLint + Prettier
- **类型检查**: vue-tsc
- **自动导入**: unplugin-auto-import + unplugin-vue-components
- **包管理器**: Yarn 1.22+

---

## 📁 项目结构

```
baihu_web/
├── .github/workflows/       # GitHub Actions 配置
├── .vscode/                 # VSCode 配置
├── dist/                    # 构建输出目录
├── src/
│   ├── assets/              # 静态资源（图片、SVG、全局样式）
│   │   ├── sns/             # 社交媒体图标
│   │   ├── favicon.ico
│   │   ├── logo.png
│   │   └── main.css         # 全局 CSS 变量与基础样式
│   ├── components/          # UI 组件
│   │   ├── home/            # 首页专用组件
│   │   │   ├── HeroSection.vue
│   │   │   ├── MarqueeSection.vue
│   │   │   ├── ServicesSection.vue
│   │   │   ├── FeaturedWorksSection.vue
│   │   │   ├── AboutPreviewSection.vue
│   │   │   └── RecruitCta.vue
│   │   ├── HeaderComponent.vue      # 顶部导航栏
│   │   ├── FooterComponent.vue      # 页脚
│   │   ├── NewsComponent.vue        # 新闻组件
│   │   └── ...
│   ├── composables/         # 可复用组合式函数
│   │   └── useCarousel.ts
│   ├── data/                # 静态数据
│   │   ├── works.ts         # 作品数据
│   │   ├── news.ts          # 新闻数据
│   │   └── recruitment.ts   # 招聘信息
│   ├── locales/             # 国际化翻译文件
│   │   ├── zh-CN.ts         # 简体中文
│   │   ├── zh-TW.ts         # 繁体中文
│   │   ├── en-US.ts         # 英文
│   │   └── ja-JP.ts         # 日文
│   ├── plugins/             # 插件初始化
│   │   └── i18n.ts          # vue-i18n 配置
│   ├── router/              # 路由配置
│   │   └── index.ts
│   ├── stores/              # Pinia 状态管理
│   │   └── counter.ts
│   ├── views/               # 页面组件
│   │   ├── HomeView.vue     # 首页
│   │   ├── WorksView.vue    # 作品列表页
│   │   ├── WorkView.vue     # 作品详情页
│   │   ├── AboutView.vue    # 关于我们
│   │   ├── NewsView.vue     # 新闻动态
│   │   ├── JoinView.vue     # 人才招募
│   │   └── ContactView.vue  # 联系我们
│   ├── App.vue              # 根组件
│   └── main.ts              # 应用入口
├── DESIGN.md                # 设计规范文档
├── index.html               # HTML 模板
├── package.json             # 项目依赖与脚本
├── tsconfig.json            # TypeScript 配置
├── vite.config.ts           # Vite 配置
└── yarn.lock                # Yarn 锁定文件
```

---

## 🚀 快速开始

### 环境要求

- Node.js >= 22.x
- Yarn >= 1.22.x
- 现代浏览器（Chrome 90+, Firefox 88+, Safari 14+, Edge 90+）

### 安装依赖

```bash
yarn install
```

### 开发模式

启动本地开发服务器（支持热重载）：

```bash
yarn dev
```

访问 http://localhost:5173 预览网站。

### 生产构建

```bash
# 类型检查 + 构建
yarn build

# 仅构建（跳过类型检查）
yarn build-only

# 预览生产构建
yarn preview
```

构建产物将输出到 `dist/` 目录。

### 代码质量

```bash
# ESLint 自动修复
yarn lint

# Prettier 格式化代码
yarn format

# TypeScript 类型检查
yarn type-check
```

### 清理缓存

```bash
# 清理构建产物
yarn clean

# 清理 node_modules
yarn clean:node
```

---

## 🎨 设计规范

### 色彩系统

```css
--color-bg: #0a0a0a /* 主背景：近乎纯黑 */ --color-surface: #111111 /* 卡片/区块表面 */
  --color-border: #222222 /* 分割线/边框 */ --color-muted: #444444 /* 次要文字 */
  --color-secondary: #888888 /* 辅助说明文字 */ --color-primary: #e8e4dc /* 主文字：暖调米白 */
  --color-accent: #c4a35a /* 点缀色：古铜金 */ --color-accent-dim: #6b5a30 /* 点缀色暗淡版 */;
```

### 字体系统

| 用途      | 日文字体        | 中文字体      | 字重    |
| --------- | --------------- | ------------- | ------- |
| 展示/标题 | Shippori Mincho | Noto Serif SC | 400/600 |
| 正文/说明 | Shippori Mincho | Noto Serif SC | 300/400 |
| 标签/数字 | DM Mono         | DM Mono       | 400     |
| 导航      | DM Sans         | Noto Sans SC  | 300     |

### 间距系统

基于 8px 网格：`4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128px`

### 动效哲学

> 动效是"呼吸感"，不是"表演"。

- 页面入场：opacity 0→1 + translateY(2rem)→0，duration 600ms
- Hover 过渡：200ms ease
- Marquee：CSS animation，linear，30s 循环
- **禁止**：弹跳、旋转、放大出现、过度发光

详细设计规范请查看 [DESIGN.md](DESIGN.md)。

---

## 📄 页面路由

| 路径       | 页面     | 说明                                           |
| ---------- | -------- | ---------------------------------------------- |
| `/`        | 首页     | Hero + 跑马灯 + 精选作品 + 关于预览 + 招聘 CTA |
| `/works`   | 作品列表 | 全部作品展示，支持筛选与搜索                   |
| `/about`   | 关于我们 | 公司介绍 + 核心优势 + 发展历程                 |
| `/news`    | 新闻动态 | 新闻公告列表                                   |
| `/join`    | 人才招募 | 开放职位详情 + 投递方式                        |
| `/contact` | 联系我们 | 联系信息 + 办公地址                            |

---

## 🌍 国际化

网站支持四种语言，根据浏览器语言设置自动切换：

- **zh-CN** - 简体中文（默认）
- **ja-JP** - 日文
- **en-US** - 英文
- **zh-TW** - 繁体中文

语言切换逻辑位于 `src/plugins/i18n.ts`，可通过导航栏的语言按钮手动切换。

### 添加新语言

1. 在 `src/locales/` 创建新的语言文件（如 `ko-KR.ts`）
2. 复制现有语言文件的结构并翻译
3. 在 `src/plugins/i18n.ts` 中导入并注册

```typescript
import koKR from '@/locales/ko-KR'

export const i18n = createI18n({
  // ...
  messages: {
    'zh-CN': zhCN,
    'ja-JP': jaJP,
    'en-US': enUS,
    'zh-TW': zhTW,
    'ko-KR': koKR, // 新增
  },
})
```

---

## 🔧 配置说明

### Vite 配置

主要配置位于 `vite.config.ts`，包括：

- 路径别名 `@` → `src/`
- 自动导入插件（Vue API、组件）
- Vue DevTools 集成
- 构建优化选项

### TypeScript 配置

- `tsconfig.json` - 根配置
- `tsconfig.app.json` - 应用代码配置
- `tsconfig.node.json` - Node 相关配置（Vite、ESLint）

### 浏览器兼容性

通过 `package.json` 中的 `browserslist` 字段配置：

```json
{
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": ["> 1%", "last 2 versions", "not dead"]
  }
}
```

---

## 📦 部署

### 静态托管

构建后的 `dist/` 目录可直接部署到任何静态托管服务：

- **Vercel**: 自动检测 Vite 项目，零配置部署
- **Netlify**: 拖拽 `dist/` 文件夹或连接 Git 仓库
- **GitHub Pages**: 使用 `gh-pages` 包或 GitHub Actions
- **Nginx**: 配置静态文件服务，启用 gzip 压缩

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name baihu-animation.com;
    root /var/www/baihu_web/dist;
    index index.html;

    # 启用 gzip 压缩
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;

    # SPA 路由回退
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### CI/CD

项目包含 GitHub Actions 工作流配置（`.github/workflows/auto-release.yml`），可实现自动化构建与发布。

---

## 🤝 贡献指南

本项目为白鹄动画官方网站，暂不接收外部贡献。如有问题或建议，请联系开发团队。

### 开发规范

- **代码风格**: 遵循 Prettier 配置，使用 2 空格缩进
- **命名约定**:
  - 组件: PascalCase（如 `HeroSection.vue`）
  - 文件: kebab-case（如 `use-carousel.ts`）
  - 变量/函数: camelCase
- **提交信息**: 使用 Conventional Commits 规范
- **类型安全**: 所有代码必须通过 TypeScript 类型检查

---

## 📝 更新日志

详见 [CHANGELOG.md](CHANGELOG.md)（待创建）。

主要版本更新：

- **v0.1.0** - 初始版本，完成基础页面与国际化

---

## 📄 许可证

本项目为白鹄动画私有项目，保留所有权利。

© 2025 杭州白鹄动画有限公司

---

## 📞 联系方式

- **邮箱**: baihu_animation@163.com
- **地址**: 浙江省杭州市滨江区长河街道齐飞路 350 号 圆伦大厦 A 座 1901
- **营业时间**: 周一至周五 10:00 – 19:00（JST / CST）

---

<div align="center">

**以匠心，赋每一帧以生命。**

Made with ❤️ by Baihu Animation Team

</div>
