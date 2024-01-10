import { useGlobal } from '@/stores'
import { ActiveDesignData, SubComponentsTypeOfPageDesigner } from '.'

/**
 * 判断是否布局容器组件
 * @param data
 */
export function isLayoutContainer(data: ActiveDesignData) {
  const list: SubComponentsTypeOfPageDesigner[] = ['Container', 'Aside', 'Header', 'Main', 'Footer', 'RouterView', 'View']
  console.log(333, data.type)
  return list.includes(data.type)
}

/**
 * 判断组件是否在设计中
 * @param type
 * @returns
 */
export function isActiveDesign(id: string) {
  const { activeDesignData } = useGlobal()
  return activeDesignData && activeDesignData.id === id
}
