import type {
  ProjectDesignData,
  ViewDesignData,
  SearchDesignData,
  TableDesignData,
  ProjectDesignDataOptions,
  ViewDesignDataOptions,
  SearchDesignDataOptions,
  TableDesignDataOptions
} from './components'

export * from './components'
export { default as VisualDevelopment, type AddComponentInstance } from './visual-development.vue'

/** 全局请求方法定义 */
export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

/** 设计组件的选项配置类型 */
export type DesignDataOptions = ProjectDesignDataOptions &
  ViewDesignDataOptions &
  SearchDesignDataOptions &
  TableDesignDataOptions

/** 当前配置数据类型 */
export type ActiveDesignData =
  | ProjectDesignData
  | ViewDesignData
  | SearchDesignData
  | TableDesignData

/** 设计数据的合并类型 */
export type MergeDesignData = ProjectDesignData &
  ViewDesignData &
  SearchDesignData &
  TableDesignData
