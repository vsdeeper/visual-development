import {
  ContainerDesignData,
  AsideDesignData,
  HeaderDesignData,
  MainDesignData,
  FooterDesignData,
  RouterViewDesignData,
  ViewDesignData,
  RowColDesignData,
  LogoDesignData,
  MenuDesignData,
  SearchDesignData,
  TableDesignData,
  ContainerDesignDataOptions,
  AsideDesignDataOptions,
  HeaderDesignDataOptions,
  FooterDesignDataOptions,
  RouterViewDesignDataOptions,
  ViewDesignDataOptions,
  RowColDesignDataOptions,
  LogoDesignDataOptions,
  MenuDesignDataOptions,
  SearchDesignDataOptions,
  TableDesignDataOptions,
  TableColumnItem,
  SearchConditionItem,
} from './components';

export * from './components';
export { default as VisualDevelopment, type AddComponentInstance } from './visual-development.vue';

/** 全局请求方法定义 */
export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiConfig {
  api?: string;
  method?: Method;
  params?: Record<string, any>;
}

/** 设计组件的选项配置类型 */
export type DesignDataOptions = ContainerDesignDataOptions &
  AsideDesignDataOptions &
  HeaderDesignDataOptions &
  FooterDesignDataOptions &
  RouterViewDesignDataOptions &
  ViewDesignDataOptions &
  RowColDesignDataOptions &
  LogoDesignDataOptions &
  MenuDesignDataOptions &
  SearchDesignDataOptions &
  TableDesignDataOptions;

/** 当前配置数据类型 */
export type ActiveDesignData =
  | ContainerDesignData
  | AsideDesignData
  | HeaderDesignData
  | MainDesignData
  | FooterDesignData
  | RouterViewDesignData
  | ViewDesignData
  | RowColDesignData
  | LogoDesignData
  | MenuDesignData
  | SearchDesignData
  | TableDesignData;

/** 设计数据的合并类型 */
export type MergeDesignData = ContainerDesignData &
  AsideDesignData &
  HeaderDesignData &
  FooterDesignData &
  RouterViewDesignData &
  ViewDesignData &
  RowColDesignData &
  LogoDesignData &
  MenuDesignData &
  SearchDesignData &
  TableDesignData;
