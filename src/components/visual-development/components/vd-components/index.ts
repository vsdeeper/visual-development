import type { AsyncComponentLoader } from 'vue'
import { capitalizeFirstLetter } from '@/utils'

export * from './vd-project'
export * from './vd-search'
export * from './vd-table'
export * from './vd-form'
export * from './vd-view'

export type ComponentTypeOfPageDesigner =
  // 项目容器
  | 'Project'
  | 'View'
  // 以下全局组件
  | 'Search'
  | 'Table'
  | 'Form'

/** 基础设计数据类型 */
export type BaseDesignData<T = Record<string, any>> = {
  id: string
  idAlias?: string
  type: ComponentTypeOfPageDesigner
  label: string
  options: T
  components?: BaseDesignData<T>[]
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
    .map((str) => capitalizeFirstLetter(str))
    .join('') as ComponentTypeOfPageDesigner
  VdComponents[key] = defineAsyncComponent({
    loader: vueModules[path] as AsyncComponentLoader<any>
  })
}

export { VdComponents }
