/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-06 23:44:27
 * @Description:
 */
import { useGlobal } from '@/stores'
import { AddComponentGroupOptionItem } from '..'
import { SubComponentsTypeOfPageDesigner } from './vd-components'

export * from './components'
export * from './vd-components'
export { default as PageDesigner } from './page-designer.vue'

export type PageDesignDataModel = { [K in SubComponentsTypeOfPageDesigner]?: any }

export const addComponentOptions = ref<AddComponentGroupOptionItem[]>([
  {
    id: 'LayoutContainer',
    name: '布局容器',
    children: [
      { label: '视图', value: 'View' },
      { label: '路由', value: 'RouterView' },
      { label: '分栏', value: 'RowCol' },
      { label: '主体', value: 'Main' },
      { label: '容器', value: 'Container' },
      { label: '侧栏', value: 'Aside' },
      { label: '头部', value: 'Header' },
      { label: '底部', value: 'Footer' },
    ]
  },
  {
    id: 'NavigationComponents',
    name: '导航组件',
    children: [
      { label: '菜单', value: 'Menu' },
    ]
  },
  {
    id: 'ViewComponents',
    name: '视图组件',
    children: [
      { label: '搜索', value: 'Search' },
      { label: '表格', value: 'Table' },
      { label: '表单', value: 'Form' },
    ]
  },
  {
    id: 'BasicComponents',
    name: '基础组件',
    children: [
      { label: '按钮', value: 'Button' },
      { label: '图标', value: 'Icon' },
    ]
  },
  {
    id: 'DataDisplayComponents',
    name: '数据展示组件',
    children: [
      { label: '图片', value: 'Image' }
    ]
  }
])

/**
 * 判断组件是否在设计中
 * @param type
 * @returns
 */
export function isActiveDesign(type: SubComponentsTypeOfPageDesigner) {
  const { activeDesignData } = useGlobal()
  return activeDesignData && activeDesignData.id === type
}
