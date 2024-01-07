/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-06 23:44:27
 * @Description:
 */
import { SubComponentsTypeOfPageDesigner } from './components'
export * from './components'
export { default as PageDesigner } from './page-designer.vue'

export type KeyOfPageDesignerConfigData = Uncapitalize<SubComponentsTypeOfPageDesigner>
export type PageDesignerConfigData = { [K in KeyOfPageDesignerConfigData]?: any }