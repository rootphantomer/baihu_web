/**
 * @file 招聘岗位数据（结构层），所有展示文本通过 i18n 获取
 */
export interface Position {
  /** 岗位唯一标识 */
  id: string
}

/** 招聘岗位列表 */
export const positions: Position[] = [
  { id: 'animator' },
  { id: 'supervisor' },
  { id: 'background' },
]
