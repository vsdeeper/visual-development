import { type AddComponentGroupOptionItem, type Method } from '.'

export const METHOD_OPTIONS: Method[] = ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']

/**
 * 添加组件选项数据
 */
export const ADD_COMPONENT_OPTIONS = [
  {
    id: 'ProjectContainer',
    name: '项目容器',
    children: [
      { label: '项目', value: 'Project' },
      { label: '视图', value: 'View' }
    ]
  },
  {
    id: 'BaseComponents',
    name: '基础组件',
    children: [
      { label: '搜索', value: 'Search' },
      { label: '表格', value: 'Table' },
      { label: '表单', value: 'Form' }
    ]
  }
] as AddComponentGroupOptionItem[]
