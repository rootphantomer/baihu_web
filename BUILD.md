# 构建指南

## ✅ 构建成功

项目已成功构建，输出目录：`dist/`

### 构建产物统计

```
总大小（未压缩）: ~508KB
首屏 JS/CSS（gzip）: ~69KB

主要文件：
- vendor.js         约 98 KB (gzip: 约 38 KB) - Vue、Vue Router 等依赖
- index.js          约 65 KB (gzip: 约 23 KB) - 主应用 + 自定义 i18n + 语言包
- HomeView.js       约 8.5 KB (gzip: 约 3 KB) - 首页
- WorksView.js      约 3.8 KB (gzip: 约 1.7 KB) - 作品页
```

## 🔧 构建命令

```bash
# 完整构建（类型检查 + 打包）
yarn build

# 仅打包（跳过类型检查，更快）
yarn build-only

# 预览生产构建
yarn preview

# 清理构建产物
yarn clean
```

## 📦 部署

### 静态托管服务

#### Vercel（推荐）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

#### Netlify

```bash
# 拖拽 dist/ 文件夹到 Netlify dashboard
# 或连接 Git 仓库自动部署
```

#### GitHub Pages

```bash
# 安装 gh-pages
yarn add -D gh-pages

# 部署
yarn build
npx gh-pages -d dist
```

### Cloudflare Workers（当前部署）

仓库内已提供 `wrangler.jsonc` 和 `worker.js`。`assets.not_found_handling` 会把未命中的
路径回退到 `index.html`，因此可以直接使用 Vue Router History 模式。主域为
`www.baihu-animation.com`，`baihu-animation.com` 会在 Worker 中 301 到主域。

```bash
npm run build
npx wrangler deploy
```

```jsonc
{
  "name": "baihu",
  "main": "worker.js",
  "compatibility_date": "2026-11-12",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS",
    "not_found_handling": "single-page-application"
  }
}
```

如果 Cloudflare 控制台里已有同名 Worker，部署前请确认 `name` 一致；如果现有 Worker
使用自己的 `main` 入口，把 `worker.js` 里的 SPA 回退逻辑合并进去即可。

### Nginx 配置

```nginx
server {
    listen 80;
    server_name baihu-animation.com www.baihu-animation.com;
    root /var/www/baihu_web/dist;
    index index.html;

    # 启用 gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript
               application/x-javascript application/xml+rss
               application/json application/javascript;

    # SPA 路由回退
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 禁止缓存 HTML
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
```

### Docker 部署

```dockerfile
# Dockerfile
FROM node:22-alpine AS builder

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```nginx
# nginx.conf
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

```bash
# 构建镜像
docker build -t baihu-web .

# 运行容器
docker run -d -p 80:80 --name baihu-web baihu-web
```

## 🐛 常见问题

### Q: 构建时 TypeScript 报错？

A: 确保已创建类型声明文件 `src/types/vue-i18n.d.ts`：

```typescript
import 'vue'

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string) => string
    $locale: any
    $setLocale: (locale: string) => void
    $getLocale: () => string
  }
}

export {}
```

### Q: 部署后页面空白？

A: 检查以下几点：

1. 当前使用 History 模式，需要 SPA 回退到 `index.html`。Cloudflare Workers 已由 `wrangler.jsonc` 的 `not_found_handling: "single-page-application"` 配置；Nginx 示例：`try_files $uri $uri/ /index.html;`
2. 检查浏览器控制台是否有 404 错误
3. 确认 `vite.config.ts` 中 `base` 路径与部署路径一致

### Q: 如何减小打包体积？

A: 优化建议：

1. 图片压缩（使用 TinyPNG 等工具）
2. 移除未使用的语言包
3. 启用 Brotli 压缩（比 gzip 更好）
4. 代码分割（已自动配置）

### Q: 如何启用 HTTPS？

A: 使用 Let's Encrypt：

```bash
# 安装 certbot
sudo apt install certbot python3-certbot-nginx

# 获取证书
sudo certbot --nginx -d baihu-animation.com

# 自动续期
sudo certbot renew --dry-run
```

## 📊 性能指标

### Lighthouse 评分目标

- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### 优化建议

1. **图片优化**
   - 使用 WebP 格式
   - 添加尺寸属性
   - 懒加载（已实现）

2. **字体优化**
   - font-display: swap（已配置）
   - preconnect Google Fonts

3. **代码优化**
   - Tree-shaking（Vite 自动）
   - 代码分割（按路由）
   - 压缩（已启用）

## 🔄 CI/CD

### GitHub Actions 示例

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22'

      - name: Install dependencies
        run: yarn install --frozen-lockfile

      - name: Build
        run: yarn build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📝 版本信息

- **Vite**: 8.0.8
- **Vue**: 3.5.32
- **TypeScript**: 6.0.2
- **构建时间**: ~8.5s
- **最后更新**: 2025-04-12

---

**🎊 构建系统运行正常，可以安全部署到生产环境！**
