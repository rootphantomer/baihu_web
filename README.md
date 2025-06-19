# 白鹄动画网站

一个基于 Vue 3 和 TypeScript 的现代化动画公司官网，支持中日双语切换，响应式设计，以及图片懒加载等特性。

## ✨ 特性

- **国际化支持**：中日双语切换功能
- **响应式设计**：适配各种屏幕尺寸
- **图片优化**：使用懒加载提升性能
- **现代 UI**：简洁优雅的动画公司风格设计
- **TypeScript 支持**：类型安全的代码开发
- **代码规范**：集成 ESLint 和 Prettier 确保代码质量

## 🚀 快速开始

### 前提条件

- Node.js 16.x 或更高版本
- npm 7.x 或更高版本

### 安装依赖

```sh
npm install
```

### 开发环境

启动开发服务器，默认端口为 5173：

```sh
npm run dev
```

### 构建生产版本

构建优化后的生产版本到 `dist` 目录：

```sh
npm run build
```

### 预览生产版本

在本地预览构建后的生产版本：

```sh
npm run preview
```

## 📁 项目结构

```
/src
  /assets        # 静态资源（图片、样式等）
  /components    # 可复用组件
  /locales       # 国际化语言文件
  /router        # 路由配置
  /stores        # Pinia 状态管理
  /views         # 页面组件
  App.vue        # 应用入口组件
  main.ts        # 应用入口文件
```

## 🌐 国际化

项目支持中文和日文两种语言，语言文件位于 `src/locales/` 目录：

- `zh-CN.ts`: 中文语言包
- `ja-JP.ts`: 日文语言包

## ⚙️ 自定义配置

### VS Code 开发环境

项目包含 `.vscode/settings.json` 和 `.vscode/extensions.json` 配置，推荐安装指定的扩展以获得最佳开发体验。

### 格式化配置

使用 ESLint 和 Prettier 进行代码格式化，保存时自动格式化已启用。

## 🤝 贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件。

## 📞 联系我们

杭州白鹄动画有限公司

© 2025 白鹄动画. 保留所有权利。
