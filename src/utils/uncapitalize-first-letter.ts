/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:40:17
 * @Description:
 */
/**
 * 首字母小写
 * @param str
 * @returns
 */
export function uncapitalizeFirstLetter(str: string) {
  try {
    return str.charAt(0).toLowerCase() + str.slice(1)
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}