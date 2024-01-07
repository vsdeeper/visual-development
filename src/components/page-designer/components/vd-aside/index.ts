/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:14:46
 * @Description:
 */
export interface AsideConfigData {
  id: string
  label: string
  options?: {
    width?: string
    children?: unknown[]
  }
}
export { default as Aside } from './vd-aside.vue'