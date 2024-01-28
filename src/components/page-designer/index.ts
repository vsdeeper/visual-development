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
  MenuDesignData
} from './vd-components'

export * from './components'
export * from './vd-components'
export { default as PageDesigner, type AddComponentInstance } from './page-designer.vue'

/** 当前配置数据类型 */
export type ActiveDesignData =
  ContainerDesignData |
  AsideDesignData |
  HeaderDesignData |
  MainDesignData |
  FooterDesignData |
  MenuDesignData

/** 设计数据的合并类型 */
export type MergeDesignData = ContainerDesignData & AsideDesignData & HeaderDesignData & FooterDesignData & MenuDesignData