import { useGlobal } from '@/stores'
import { ActiveDesignData, SubComponentsTypeOfPageDesigner } from '.'

/**
 * 判断是否布局容器组件
 * @param data
 */
export function isLayoutContainer(data: ActiveDesignData) {
  const list: SubComponentsTypeOfPageDesigner[] = ['Container', 'Aside']
  return data?.id && list.includes(data.id)
}

/**
 * 判断组件是否在设计中
 * @param type
 * @returns
 */
export function isActiveDesign(type: SubComponentsTypeOfPageDesigner) {
  const { activeDesignData } = useGlobal()
  return activeDesignData && activeDesignData.id === type
}
