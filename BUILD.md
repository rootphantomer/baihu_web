# 构建指南

## ✅ 构建成功

项目已成功构建，输出目录：`dist/`

### 构建产物统计

```
总大小（未压缩）: ~170KB
总大小（gzip）:   ~65KB

主要文件：
- vendor-BtEJCayL.js     104.83 KB (gzip: 39.94 KB) - Vue、Vue Router 等依赖
- useI18n-BHgv7vch.js     15.47 KB (gzip:  6.82 KB) - 自定义 i18n + 语言包
- HomeView-B5k6WLFW.js     8.64 KB (gzip:  3.13 KB) - 首页
- WorksView-BjWyD7Yz.js    9.66 KB (gzip:  3.23 KB) - 作品页
- index-VoX4G3ai.js        7.96 KB (gzip:  3.24 KB) - 主应用
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

1. 确认使用 Hash 模式路由（已配置）
2. 检查浏览器控制台是否有 404 错误
3. 确认服务器正确配置 SPA 回退

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
