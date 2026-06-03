/**
 * @file 新闻动态数据，用于新闻列表页面展示
 * 数据源：只存储 id、日期、i18n key，具体文本由语言包提供
 */
export interface NewsItem {
  /** 新闻唯一标识 */
  id: string
  /** 发布日期（如 '2026.04'） */
  date: string
  /** 对应 i18n 标题键，如 'news.items.v2.title' */
  titleKey: string
  /** 对应 i18n 摘要键，如 'news.items.v2.desc' */
  summaryKey: string
}

/** 新闻列表数据（按时间倒序） */
export const news: NewsItem[] = [
  {
    id: 'v2-launch',
    date: '2026.04',
    titleKey: 'news.items.v2.title',
    summaryKey: 'news.items.v2.desc',
  },
  {
    id: 'founding',
    date: '2025.01.23',
    titleKey: 'news.items.founding.title',
    summaryKey: 'news.items.founding.desc',
  },
]
