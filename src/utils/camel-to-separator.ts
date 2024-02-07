/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-07 14:48:25
 * @LastEditTime: 2024-02-07 14:55:52
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description:
 */
/**
 * 驼峰转分隔符
 * @param str
 * @param separator
 * @returns
 */
export function camelToSeparator(str: string, separator?: string) {
  try {
    str = str.charAt(0).toLowerCase() + str.slice(1)
    return str.replace(/([A-Z])/g, `${separator??'-'}$1`).toLowerCase();
  } catch (error) {
    throw new Error(JSON.stringify(error))
  }
}