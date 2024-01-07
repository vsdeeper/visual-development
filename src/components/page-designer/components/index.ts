/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:27:08
 * @Description:
 */
import type { AsyncComponentLoader } from 'vue'
import { capitalizeFirstLetter } from '@/utils'
import { type AsideConfigData } from './vd-aside'

export type SubComponentsTypeOfPageDesigner =
/** 布局容器 */'Aside' | 'Container' | 'Footer' | 'Header' | 'Main' | 'Layout' | 'RouterView' | 'View' |
/** 视图组件 */'FormDesigner' | 'Search' | 'Table' |
/** 导航组件 */'Menu'

/** 基础配置数据类型 */
export type BaseConfigData<T = Record<string, any>> = {
  id: SubComponentsTypeOfPageDesigner
  label: string
  options?: T & { children?: BaseConfigData<T>[] }
}
/** 当前配置数据类型 */
export type ActiveConfigData = AsideConfigData | undefined

const SubComponentsOfPageDesigner: { [K in SubComponentsTypeOfPageDesigner]?: any } = {}
const vueModules = import.meta.glob('./*/*.vue')

for (const path in vueModules) {
  if (path.includes('vd-')) {
    const key = path
      .substring(path.lastIndexOf('/') + 1)
      .replace('.vue', '')
      .replace('vd-', '')
      .split('-')
      .map(str => capitalizeFirstLetter(str))
      .join('') as SubComponentsTypeOfPageDesigner
    SubComponentsOfPageDesigner[key] = defineAsyncComponent({
      loader: vueModules[path] as AsyncComponentLoader<any>,
    })
  }
}

export { SubComponentsOfPageDesigner /** 导出页面设计器子组件 */ }
