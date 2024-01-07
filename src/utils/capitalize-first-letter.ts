/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:40:17
 * @Description:
 */
/**
 * 首字母大写
 * @param str
 * @returns
 */
export function capitalizeFirstLetter(str: string) {
  try {
    return str.charAt(0).toUpperCase() + str.slice(1)
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}