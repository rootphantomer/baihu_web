// ─── Theme ─────────────────────────────────────────────────────────────────────

export type Theme = 'light' | 'dark'

// ─── Locale ────────────────────────────────────────────────────────────────────

export type Locale = 'zh-CN' | 'ja-JP'

// ─── Route ────────────────────────────────────────────────────────────────────

export interface RouteMeta {
  title?: string
  requiresAuth?: boolean
}

// ─── Work ─────────────────────────────────────────────────────────────────────

export interface Work {
  id: string
  title: string
  titleJa?: string
  year: number
  type: 'animation' | 'design' | 'planning'
  roles: string[]
  rolesJa?: string[]
  thumbnail: string
  featured?: boolean
}

// ─── News ─────────────────────────────────────────────────────────────────────

export interface News {
  id: string
  title: string
  titleJa?: string
  date: string
  summary: string
  summaryJa?: string
}

// ─── Recruitment ─────────────────────────────────────────────────────────────

export interface Position {
  id: string
  title: string
  titleJa?: string
  responsibilities: string[]
  responsibilitiesJa?: string[]
  requirements: string[]
  requirementsJa?: string[]
  contact: string
}

// ─── Statistics ───────────────────────────────────────────────────────────────

export interface Stat {
  label: string
  labelJa?: string
  value: string | number
  suffix?: string
}
