/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-06 23:44:27
 * @Description:
 */
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
  TableDesignDataOptions
} from './components'

export * from './components'
export { default as PageDesigner, type AddComponentInstance } from './page-designer.vue'

/** 全局请求方法定义 */
export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

/** 设计组件的选项配置类型 */
export type DesignDataOptions =
  ContainerDesignDataOptions &
  AsideDesignDataOptions &
  HeaderDesignDataOptions &
  FooterDesignDataOptions &
  RouterViewDesignDataOptions &
  ViewDesignDataOptions &
  RowColDesignDataOptions &
  LogoDesignDataOptions &
  MenuDesignDataOptions &
  SearchDesignDataOptions &
  TableDesignDataOptions


/** 当前配置数据类型 */
export type ActiveDesignData =
  ContainerDesignData |
  AsideDesignData |
  HeaderDesignData |
  MainDesignData |
  FooterDesignData |
  RouterViewDesignData |
  ViewDesignData |
  RowColDesignData |
  LogoDesignData |
  MenuDesignData |
  SearchDesignData |
  TableDesignData

/** 设计数据的合并类型 */
export type MergeDesignData =
  ContainerDesignData &
  AsideDesignData &
  HeaderDesignData &
  FooterDesignData &
  RouterViewDesignData &
  ViewDesignData &
  RowColDesignData &
  LogoDesignData &
  MenuDesignData &
  SearchDesignData &
  TableDesignData