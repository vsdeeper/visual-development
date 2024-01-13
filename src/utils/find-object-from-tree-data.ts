/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 从树数据中找到目标ID所在的对象
 * @param {string} targetId - 目标ID
 * @param {Object} [options] - 可选参数
 * @param {string} options.id - id别名
 * @param {string} options.children - children别名
 */
export const findObjectFromTreeData = (
  targetId: string | number,
  data: Record<string, any>[],
  options?: { id?: string; children?: string },
) => {
  let findObj: Record<string, any>
  const idkey = options?.id || 'id'
  const childrenKey = options?.children || 'children'
  const finder = (items: Record<string, any>[]) => {
    for (const item of items) {
      if (item[idkey] === targetId) {
        findObj = item
        break
      }
      if (item[childrenKey] && item[childrenKey].length) {
        finder(item[childrenKey])
      }
    }
    return findObj
  }
  return finder(data)
}