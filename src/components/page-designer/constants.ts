import { AddComponentGroupOptionItem } from '.'

/**
 * 添加组件选项数据
 */
export const addComponentOptions = [
  {
    id: 'LayoutContainer',
    name: '布局容器',
    children: [
      { label: '容器', value: 'Container' },
      { label: '侧栏', value: 'Aside' },
      { label: '头部', value: 'Header' },
      { label: '主体', value: 'Main' },
      { label: '底部', value: 'Footer' },
      { label: '分栏', value: 'RowCol' },
    ]
  },
  {
    id: 'MainContainer',
    name: '主体容器',
    children: [
      { label: '路由', value: 'RouterView' },
      { label: '视图', value: 'View' },
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
] as AddComponentGroupOptionItem[]