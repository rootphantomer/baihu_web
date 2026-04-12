export interface NewsItem {
  id: string
  date: string
  title: string
  summary: string
}

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
