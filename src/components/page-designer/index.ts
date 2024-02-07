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
} from './components'

export * from './components'
export { default as PageDesigner, type AddComponentInstance } from './page-designer.vue'

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
  MenuDesignData

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
  MenuDesignData