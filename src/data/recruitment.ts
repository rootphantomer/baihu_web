export interface Position {
  id: string
  roleId: string
  location: string
  type: string
  duties: string[]
  requirements: string[]
}

export const positions: Position[] = [
  {
    id: 'animator',
    roleId: 'animator',
    location: '杭州',
    type: '全职',
    duties: [
      '根据分镜完成原画设计（角色动作、表情、特效等关键帧）',
      '提出合理的作画提案，优化分镜表现力',
      '配合作画监督调整画面细节，确保符合日式动画制作标准',
      '参与部分 Layout 修正与演出设计',
    ],
    requirements: [
      '1 年以上第一原画经验，或 3 年以上第二原画经验',
      '半年以上动画中割经验或具备中割基本常识',
      '精通日式动画风格，熟悉工业化制作流程',
      '日语能力者尤佳',
    ],
  },
  {
    id: 'supervisor',
    roleId: 'supervisor',
    location: '杭州',
    type: '全职',
    duties: [
      '统筹动画全流程作画质量，把控角色设计、动作节奏与画面风格统一性',
      '对 Layout 及原画进行正确修正，协调团队解决技术难题',
    ],
    requirements: [
      '1 年以上作监经验，3 年以上原画经验',
      '半年以上动画中割经验或具备中割基本常识',
      '能够依照演出/监督指示对原画做出正确修正',
      '有团队协作沟通能力',
    ],
  },
  {
    id: 'background',
    roleId: 'background',
    location: '杭州',
    type: '全职 / 远程',
    duties: [
      '根据 Layout 原图进行高精度背景绘制',
      '有能力根据需求独立完成美术设计',
    ],
    requirements: [
      '良好美术基础与色彩控制力，熟悉空间与空气透视理论',
      '熟练使用手绘板及 Photoshop 进行数字绘制',
      '有日式动画背景美术经验者优先',
      '有团队协作沟通能力',
    ],
  },
]
