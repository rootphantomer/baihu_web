/**
 * @file 全局类型定义
 */

// ─── Theme ─────────────────────────────────────────────────────────────────────

/** 主题类型：亮色 / 暗色 */
export type Theme = 'light' | 'dark'

// ─── Locale ────────────────────────────────────────────────────────────────────

/** 语言类型（从 useI18n 重新导出，方便统一引用） */
export type { Locale } from '@/composables/useI18n'

// ─── Route ────────────────────────────────────────────────────────────────────

/** 路由元信息类型 */
export interface RouteMeta {
  /** 页面标题 */
  title?: string
  /** 是否需要登录认证 */
  requiresAuth?: boolean
}

// ─── News ─────────────────────────────────────────────────────────────────────

/** 新闻条目类型 */
export interface News {
  /** 新闻唯一标识 */
  id: string
  /** 新闻标题 */
  title: string
  /** 日文标题（可选） */
  titleJa?: string
  /** 发布日期 */
  date: string
  /** 新闻摘要 */
  summary: string
  /** 日文摘要（可选） */
  summaryJa?: string
}

// ─── Recruitment ─────────────────────────────────────────────────────────────

/** 招聘岗位类型 */
export interface Position {
  /** 岗位唯一标识 */
  id: string
  /** 岗位标题 */
  title: string
  /** 日文标题（可选） */
  titleJa?: string
  /** 岗位职责列表 */
  responsibilities: string[]
  /** 日文岗位职责（可选） */
  responsibilitiesJa?: string[]
  /** 任职要求列表 */
  requirements: string[]
  /** 日文任职要求（可选） */
  requirementsJa?: string[]
  /** 联系邮箱 */
  contact: string
}

// ─── Statistics ───────────────────────────────────────────────────────────────

/** 统计数据条目类型 */
export interface Stat {
  /** 统计项标签 */
  label: string
  /** 日文标签（可选） */
  labelJa?: string
  /** 统计值 */
  value: string | number
  /** 值后缀（如 '+'、'年'） */
  suffix?: string
}
