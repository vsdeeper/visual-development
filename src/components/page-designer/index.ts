/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-06 23:44:27
 * @Description:
 */
import { AddComponentGroupOptionItem } from '..'
import { SubComponentsTypeOfPageDesigner } from './components'

export * from './components'
export { default as PageDesigner } from './page-designer.vue'

export type PageDesignerConfigDataModel = { [K in SubComponentsTypeOfPageDesigner]?: any }

export const addComponentOptions = ref<AddComponentGroupOptionItem[]>([
  {
    id: 'LayoutContainer',
    name: '布局容器',
    children: [
      { label: '视图', value: 'View' },
      { label: '路由', value: 'RouterView' },
      { label: '主体', value: 'Main' },
      { label: '容器', value: 'Container' },
      { label: '侧栏', value: 'Aside' },
      { label: '头部', value: 'Header' },
      { label: '底部', value: 'Footer' },
      { label: '布局', value: 'Layout' },
    ]
  },
  {
    id: 'ViewComponents',
    name: '视图组件',
    children: [
      { label: '搜索', value: 'Search' },
      { label: '表格', value: 'Table' },
      { label: '表单', value: 'FormDesigner' },
    ]
  },
  {
    id: 'NavigationComponents',
    name: '导航组件',
    children: [
      { label: '菜单', value: 'Menu' },
    ]
  }
])
