/**
 * @file 新闻动态数据，用于新闻列表页面展示
 */
export interface NewsItem {
  /** 新闻唯一标识 */
  id: string
  /** 发布日期（如 '2025.01.23'） */
  date: string
  /** 新闻标题 */
  title: string
  /** 新闻摘要 */
  summary: string
}

/** 新闻列表数据（按时间倒序） */
export const news: NewsItem[] = [
  {
    id: '1',
    date: '2025.01.23',
    title: '祝！白鹄动画正式成立',
    summary: '成功入驻圆伦大厦，祝公司顺利开张',
  },
  {
    id: '2',
    date: '2025.03',
    title: '白鹄动画官网全新上线',
    summary:
      '经过数月筹备，白鹄动画全新官方网站正式上线，以全新的视觉语言呈现我们的制作理念与代表作品。',
  },
  {
    id: '3',
    date: '2026.04',
    title: '白鹄动画官网 V2 全新上线',
    summary: '白鹄动画全新官方网站正式上线，以全新的视觉语言呈现我们的制作理念与代表作品。',
  },
]
