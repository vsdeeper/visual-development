/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:27:08
 * @Description: 可视化开发组件
 */
import type { AsyncComponentLoader } from 'vue'
import { capitalizeFirstLetter } from '@/utils'

/** 自定义组件 */
export * from './vd-logo'
export * from './vd-menu'
export * from './vd-search'
/** 容器组件 */
export * from './vd-container'
export * from './vd-aside'
export * from './vd-header'
export * from './vd-main'
export * from './vd-footer'
export * from './vd-router-view'
export * from './vd-view'
export * from './vd-row-col'
/** 常规组件 */

export type ComponentTypeOfPageDesigner =
/** 自定义组件 */'Logo' | 'Search' | 'Table' | 'Form' |
/** 主体容器 */'RouterView' | 'View' |
/** 布局容器 */'Aside' | 'Container' | 'Footer' | 'Header' | 'Main' | 'RowCol' |
/** 导航组件 */'Menu' | 'Dropdown' |
/** 基础组件 */'Button' | 'Icon' |
/** 数据展示组件 */'Image'

/** 基础设计数据类型 */
export type BaseDesignData<T = Record<string, any>> = {
  id: string
  idAlias?: string
  type: ComponentTypeOfPageDesigner
  label: string
  projectName?: string // 项目名称，最外层组件配置
  componentPath?: string // 组件路径，子组件配置
  options?: T & {
    components?: BaseDesignData<T>[]
  }
}

/** 导出所有vd-*可视化设计组件 */
const VdComponents: { [K in ComponentTypeOfPageDesigner]?: any } = {}
const vueModules = import.meta.glob('./vd-*/vd-*.vue')
for (const path in vueModules) {
  const key = path
    .substring(path.lastIndexOf('/') + 1)
    .replace('.vue', '')
    .replace('vd-', '')
    .split('-')
    .map(str => capitalizeFirstLetter(str))
    .join('') as ComponentTypeOfPageDesigner
  VdComponents[key] = defineAsyncComponent({
    loader: vueModules[path] as AsyncComponentLoader<any>,
  })
}

export { VdComponents }
