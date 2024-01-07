/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-06 23:44:27
 * @Description:
 */
import { AddComponentOptionItem } from '..'
import { SubComponentsTypeOfPageDesigner } from './components'

export * from './components'
export { default as PageDesigner } from './page-designer.vue'

export type KeyOfPageDesignerDataModel = /** 首字母小写 */Uncapitalize<SubComponentsTypeOfPageDesigner>
export type PageDesignerConfigDataModel = { [K in KeyOfPageDesignerDataModel]?: any }

export const addComponentOptions = ref<AddComponentOptionItem[]>([
  { label: '视图', value: 'View' },
  { label: '表单', value: 'FormDesigner' },
  { label: '主体', value: 'Main' },
  { label: '路由', value: 'RouterView' },
  { label: '容器', value: 'Container' },
  { label: '侧栏', value: 'Aside' },
  { label: '头部', value: 'Header' },
  { label: '底部', value: 'Footer' },
  { label: '布局', value: 'Layout' },
])