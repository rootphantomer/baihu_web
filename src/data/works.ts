/** 作品记录类型 */
export interface Work {
  /** 远程图片路径 */
  path: string
  /** 从文件名解析出的作品名称（构建时填入） */
  title: string
  /** 分工/角色（可选，当前暂未展示） */
  role: string
}

/** 从图片文件名解析出可展示的作品名称
 *
 * 文件名格式：`YYYY.MM, タイトル（役割）.jpg`
 * 取括号/圆括号之前的部分作为标题，去除首尾空白。
 */
export function parseTitleFromPath(path: string): string {
  const filename = path.split('/').pop()?.replace('.jpg', '') ?? ''
  return filename.split(/[（(]/)[0].trim() || '未知作品'
}

/** 原始作品列表（按时间正序，渲染时倒序显示最新作品） */
const RAW_WORKS: Omit<Work, 'title'>[] = [
  {
    path: 'https://photos.baihu-animation.com/img_work/2015.04, フューチャーカード バディファイト100 (LO,原画).jpg',
    role: 'LO,原画',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2017.04, フューチャーカード バディファイトX (LO,原画).jpg',
    role: 'LO,原画',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2017.07, メイドインアビス(制作进行).jpg',
    role: '制作进行',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2017.10, ブラッククローバー(背景美术).jpg',
    role: '背景美术',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2018.10, ゾンビランドサガ リベンジ（美术3D作業).jpg',
    role: '美术3D作業',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2019.10, GRANBLUE FANTASY The Animation ・Season 2 (美术3D作業).jpg',
    role: '美术3D作業',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2019.10, アイカツオンパレード! (动画).jpg',
    role: '动画',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2019.10, ガンダムビルドダイバーズReRISE (动画).jpg',
    role: '动画',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2019.10, ハイスコアガールII  (背景美术).jpg',
    role: '背景美术',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2019.10, 冴えない彼女の育てかた Fine (美术3D作業).jpg',
    role: '美术3D作業',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2019.12, ぼくらの7日間戦争（美术3D作業).jpg',
    role: '美术3D作業',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2020, 名探偵コナン (背景美术).jpg',
    role: '背景美术',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2020.01, とある科学の超電磁砲T (背景美术).jpg',
    role: '背景美术',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2020.01, 地縛少年花子くん（美术设定, 3D作業).jpg',
    role: '美术设定,3D作業',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2020.04, 波よ聞いてくれ (作画监督).jpg',
    role: '作画监督',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2020.04, 魔神英雄伝ワタル 七魂の龍神丸 (动画).jpg',
    role: '动画',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2020.10, NOBLESSE-ノブレス- (动画).jpg',
    role: '动画',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2020.10, ダンジョンに出会いを求めるのは間違っているだろうかⅢ（背景美术).jpg',
    role: '背景美术',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2020.10, ラブライブ! 虹ヶ咲学園スクールアイドル同好会（第二原画).jpg',
    role: '第二原画',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2020.12, ジョゼと虎と魚たち (动画).jpg',
    role: '动画',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2021.01, 真・中華一番！第2期 (动画).jpg',
    role: '动画',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2021.03, シン・エヴァンゲリオン劇場版：II (动画).jpg',
    role: '动画',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2021.04, Fairy蘭丸 ～あなたの心お助けします～ (动画).jpg',
    role: '动画',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2021.06, 少女☆歌剧 レヴュースタァライト 劇場版 (制作进行).jpg',
    role: '制作进行',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2021.07, RE-MAIN (美术3D作業).jpg',
    role: '美术3D作業',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2021.07, ヴァニタスの手記 (背景设定).jpg',
    role: '背景设定',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2021.07, 平穏世代の韋駄天達 （美术3D作業).jpg',
    role: '美术3D作業',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2021.10, takt op.Destiny (背景设定).jpg',
    role: '背景设定',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2021.10, ルパン三世 PART6（美术背景）.jpg',
    role: '美术背景',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2021.10, 見える子ちゃん (LO,原画).jpg',
    role: 'LO,原画',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2022.01, 失格紋の最強賢者 (背景美术).jpg',
    role: '背景美术',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2022.01, 東京24区 (LO,原画).jpg',
    role: 'LO,原画',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2022.04,盾の勇者の成り上がり Season2 (制作进行).jpg',
    role: '制作进行',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2022.07, カードファイト!! ヴァンガード will+Dress (LO,原画).jpg',
    role: 'LO,原画',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2022.10, 後宮の烏 (动画,美术3D作業).jpg',
    role: '动画,美术3D作業',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2022.10, 水星の魔女 (原画).jpg',
    role: '原画',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2022.11, 鉄血のオルフェンズ ウルズハント (动画).jpg',
    role: '动画',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2023.01, 機動戦士ガンダム 閃光のハサウェイ (动画).jpg',
    role: '动画',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2023.04, TIGER & BUNNY 2 (动画,动画检查).jpg',
    role: '动画,动画检查',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2023.07, もののがたり（第二原画).jpg',
    role: '第二原画',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2023.09, アリスとテレスのまぼろし工場 (美术3D作業).jpg',
    role: '美术3D作業',
  },
  { path: 'https://photos.baihu-animation.com/img_work/2023.10, shy (原画).jpg', role: '原画' },
  {
    path: 'https://photos.baihu-animation.com/img_work/2023.10, 盾の勇者の成り上がり Season3 (制作进行,美術設定).jpg',
    role: '制作进行,美術設定',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2024.01, Gundam SeedFreedom (原画,作画监督).jpg',
    role: '原画,作画监督',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2024.07, キン肉マン 完璧超人始祖編 (LO,原画).jpg',
    role: 'LO,原画',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2024.07, 異世界スーサイド・スクワッド (原画,作画监督).jpg',
    role: '原画,作画监督',
  },
  {
    path: 'https://photos.baihu-animation.com/img_work/2025.01, 薬屋のひとりごと 第2期 (LO,原画).jpg',
    role: 'LO,原画',
  },
]

/** 构建完整作品列表（最新在前） */
export const works: Work[] = RAW_WORKS.map((item) => ({
  ...item,
  title: parseTitleFromPath(item.path),
})).reverse()
