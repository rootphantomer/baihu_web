<template>
  <div id="work-container" class="work-container">
    <!-- 标题 -->
    <h2 class="work-title">参与作品一览 TIME LINE</h2>
    <!-- 时间轴 -->
    <!-- <div class="work-timeline">
      <h3>2020年-</h3>
    </div> -->
    <!-- 作品网格 -->
    <div class="work-grid">
      <div v-for="(work, index) in soure" :key="index" class="work-item">
        <img :src="work.path" :alt="work.title" />
        <p class="work-title">{{ work.title }}</p>
        <p class="work-role">{{ work.role }}</p>
      </div>
    </div>
    <!-- 左右箭头 -->
    <!-- <div class="arrow left-arrow">◀</div> -->
    <!-- <div class="arrow right-arrow">▶</div> -->
  </div>
</template>

<script setup lang="ts">
type works = {
  path: string
  title: string
  role: string
}

const soure: works[] = [
  {
    path: './img_work/2015.04, フューチャーカード バディファイト100 (LO,原画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2017.04, フューチャーカード バディファイトX (LO,原画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2017.07, メイドインアビス(制作进行).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2017.10, ブラッククローバー(背景美术).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2018.10, ゾンビランドサガ リベンジ（美术3D作業).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2019.10, GRANBLUE FANTASY The Animation ・Season 2 (美术3D作業).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2019.10, アイカツオンパレード! (动画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2019.10, ガンダムビルドダイバーズReRISE (动画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2019.10, ハイスコアガールII  (背景美术).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2019.10, 冴えない彼女の育てかた Fine (美术3D作業).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2019.12, ぼくらの7日間戦争（美术3D作業).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2020, 名探偵コナン (背景美术).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2020.01, とある科学の超電磁砲T (背景美术).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2020.01, 地縛少年花子くん（美术设定, 3D作業).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2020.04, 波よ聞いてくれ (作画监督).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2020.04, 魔神英雄伝ワタル 七魂の龍神丸 (动画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2020.10, NOBLESSE-ノブレス- (动画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2020.10, ダンジョンに出会いを求めるのは間違っているだろうかⅢ（背景美术).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2020.10, ラブライブ! 虹ヶ咲学園スクールアイドル同好会（第二原画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2020.12, ジョゼと虎と魚たち (动画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2021.01, 真・中華一番！第2期 (动画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2021.03, シン・エヴァンゲリオン劇場版：II (动画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2021.04, Fairy蘭丸 ～あなたの心お助けします～ (动画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2021.06, 少女☆歌剧 レヴュースタァライト 劇場版 (制作进行).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2021.07, RE-MAIN (美术3D作業).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2021.07, ヴァニタスの手記 (背景设定).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2021.07, 平穏世代の韋駄天達 （美术3D作業).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2021.10, takt op.Destiny (背景设定).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2021.10, ルパン三世 PART6（美术背景）.jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2021.10, 見える子ちゃん (LO,原画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2022.01, 失格紋の最強賢者 (背景美术).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2022.01, 東京24区 (LO,原画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2022.04,盾の勇者の成り上が Season2 (制作进行).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2022.07, カードファイト!! ヴァンガード will+Dress (LO,原画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2022.10, 後宮の烏 (动画,美术3D作業).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2022.10, 水星の魔女 (原画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2022.11, 鉄血のオルフェンズ ウルズハント (动画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2023.01, 機動戦士ガンダム 閃光のハサウェイ (动画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2023.04, TIGER & BUNNY 2 (动画,动画检查).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2023.07, もののがたり（第二原画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2023.09, アリスとテレスのまぼろし工場 (美术3D作業).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2023.10, shy (原画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2023.10, 盾の勇者の成り上が Season3 (制作进行,美術設定).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2024.01, Gundam SeedFreedom (原画,作画监督).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2024.07, キン肉マン 完璧超人始祖編 (LO,原画).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2024.07, 異世界スーサイド・スクワッド (原画,作画监督).jpg',
    title: '',
    role: '',
  },
  {
    path: './img_work/2025.01, 薬屋のひとりごと 第2期 (LO,原画).jpg',
    title: '',
    role: '',
  },
].reverse()

soure.forEach((item) => {
  // your code here
  const title = item.path.split('/').pop()?.replace('.jpg', '') || '未知作品'
  item.title = title.split(/[(（]/)[0].trim() || '未知作品'
  // item.year = item.path.split('/')[2].split('.')[0] || '未知年份';
  const match = item.path.match(/[（(](.*?)[）)]/)
  item.role = match ? match[1] : '未知角色'
  // item.path =item.path;
})
</script>

<style lang="scss" scoped>
/* 容器样式 */
.work-container {
  /* height: calc(100vh - 22.5rem); */
  min-height: 74rem;
  /* text-align: start; */
  padding: 2rem;
  background-color: #fdfbf5;
}

/* 标题样式 */
.work-title {
  font-size: 4rem;
  font-weight: bold;
  margin: 1rem;
  color: #333;
  display: inline-block;
  border-bottom: 0.2rem solid black;
}

p.work-title {
  font-size: 2rem;
  border-bottom: none;
}

/* 时间轴样式 */
.work-timeline {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #666;
}

/* 作品网格样式 */
.work-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  justify-items: center;
  align-items: center;
}

/* 单个作品样式 */
.work-item {
  text-align: center;
}

.work-item img {
  width: 100%;
  /* max-width: 15rem; */
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 0.4rem 0.6rem rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.work-item img:hover {
  transform: scale(1.05);
  box-shadow: 0 0.6rem 1rem rgba(0, 0, 0, 0.2);
}

.work-role {
  font-size: 2rem;
  color: #666;
}

/* 箭头样式 */
.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 2.4rem;
  font-weight: bold;
  cursor: pointer;
  color: #333;
}

.left-arrow {
  left: 1rem;
}

.right-arrow {
  right: 1rem;
}
</style>
