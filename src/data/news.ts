export interface NewsItem {
  id: string
  date: string
  title: string
  summary: string
}

export const news: NewsItem[] = [
  {
    id: '1',
    date: '2025.03',
    title: '白鹄动画官网全新上线',
    summary:
      '经过数月筹备，白鹄动画全新官方网站正式上线，以全新的视觉语言呈现我们的制作理念与代表作品。',
  },
  {
    id: '2',
    date: '2024.12',
    title: '《高达 Seed Freedom》全球上映',
    summary:
      '由白鹄动画参与制作原画的《机动战士高达 Seed Freedom》于全球院线上映，感谢每一位关注的朋友。',
  },
  {
    id: '3',
    date: '2024.07',
    title: '《金肉人 完美超人始祖编》系列制作',
    summary:
      '白鹄动画团队参与《金肉人 完美超人始祖编》TV 系列的 Layout 及原画制作，目前正火热播出中。',
  },
  {
    id: '4',
    date: '2024.01',
    title: '白鹄动画受邀参加杭州动漫产业交流会',
    summary:
      '白鹄动画作为杭州本土代表动画工作室，受邀在第七届杭州动漫产业交流会上进行主题分享。',
  },
]
