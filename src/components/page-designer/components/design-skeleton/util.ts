/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-01 23:15:22
 * @LastEditTime: 2024-02-01 23:15:51
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 公用方法
 */
import { MergeDesignData } from '../..'

export function genStyle(data: MergeDesignData) {
  return {
    'flex': data.options?.width ? `0 0 ${data.options?.width}` : '1',
    'width': data.options?.width,
    'minHeight': data.options?.height
  }
}