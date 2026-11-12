/* global Request, Response, URL */

const CANONICAL_HOST = 'www.baihu-animation.com'
const APEX_HOST = 'baihu-animation.com'

/**
 * Cloudflare Workers 静态资源入口。
 * 未命中静态文件时回退到 index.html，支持 Vue Router History 模式。
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url)

    // 无 www 与主域指向同一站点时，统一 301 到 www，避免重复收录
    if (url.hostname === APEX_HOST) {
      url.hostname = CANONICAL_HOST
      const status = request.method === 'GET' || request.method === 'HEAD' ? 301 : 308
      return Response.redirect(url.toString(), status)
    }

    const response = await env.ASSETS.fetch(request)
    if (response.status !== 404) return response
    if (request.method !== 'GET' && request.method !== 'HEAD') return response

    url.pathname = '/index.html'
    url.search = ''
    return env.ASSETS.fetch(new Request(url.toString(), { method: request.method }))
  },
}
