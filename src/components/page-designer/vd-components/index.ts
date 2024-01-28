/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:27:08
 * @Description: 可视化开发组件
 */
import type { AsyncComponentLoader } from 'vue'
import { capitalizeFirstLetter } from '@/utils'

export * from './vd-container'
export * from './vd-aside'
export * from './vd-header'
export * from './vd-main'
export * from './vd-footer'
export * from './vd-menu'

export type SubComponentsTypeOfPageDesigner =
/** 布局容器 */'Aside' | 'Container' | 'Footer' | 'Header' | 'Main' | 'RowCol' | 'RouterView' | 'View' |
/** 导航组件 */'Menu' |
/** 视图组件 */'Form' | 'Search' | 'Table' |
/** 基础组件 */'Button' | 'Icon' |
/** 数据展示组件 */'Image'

/** 基础设计数据类型 */
export type BaseDesignData<T = Record<string, any>> = {
  id: string
  type: SubComponentsTypeOfPageDesigner
  label: string
  projectName?: string // 最外层组件配置
  componentPath?: string // 子组件配置
  options?: T & {
    components?: BaseDesignData<T>[]
  }
}

/** 导出所有可视化设计组件 */
const VdComponents: { [K in SubComponentsTypeOfPageDesigner]?: any } = {}
const vueModules = import.meta.glob('./vd-*/vd-*.vue')
for (const path in vueModules) {
  const key = path
    .substring(path.lastIndexOf('/') + 1)
    .replace('.vue', '')
    .replace('vd-', '')
    .split('-')
    .map(str => capitalizeFirstLetter(str))
    .join('') as SubComponentsTypeOfPageDesigner
  VdComponents[key] = defineAsyncComponent({
    loader: vueModules[path] as AsyncComponentLoader<any>,
  })
}

export { VdComponents }
