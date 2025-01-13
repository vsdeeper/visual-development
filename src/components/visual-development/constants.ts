import { type AddComponentGroupOptionItem, type Method } from '.'

export const DESIGN_DATA_KEY = 'design_data'

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
      { label: '视图', value: 'View' },
    ],
  },
  {
    id: 'BaseComponents',
    name: '基础组件',
    children: [
      { label: '搜索', value: 'Search', desc: '发大水范德萨' },
      { label: '表格', value: 'Table' },
    ],
  },
] as AddComponentGroupOptionItem[]
