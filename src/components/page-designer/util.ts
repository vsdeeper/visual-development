/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-10 18:52:53
 * @Description:
 */
import { useGlobal } from '@/stores'
import { ActiveDesignData, MergeDesignData, SubComponentsTypeOfPageDesigner } from '.'

/**
 * 判断是否布局容器组件
 * @param data
 */
export function isLayoutContainer(data: ActiveDesignData) {
  const list: SubComponentsTypeOfPageDesigner[] = ['Container', 'Aside', 'Header', 'Main', 'Footer', 'RouterView', 'View']
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

/**
 * 判断是否是根组件
 * @param data
 * @returns
 */
export function isRootComponent(id: string, designData: MergeDesignData[]) {
  return designData.some(e => e.id === id)
}

/**
 * 找到组件的父级组件列表
 * @param data
 * @param designData
 * @returns
 */
export function findParentComponentsOfComponent(target: MergeDesignData, designData: MergeDesignData[]) {
  let parent: MergeDesignData[] | undefined
  if (isRootComponent(target.id, designData)) {
    // 根组件
    parent = designData
  }
  // 子组件，先判断是否配置了组件路径
  if (target.componentPath) {
    // 配置了组件路径，根据路径找到根组件
    const findRoot = designData.find(e => target.componentPath?.startsWith(e.projectName!))
    forofForfindParentComponentsOfComponent(target.id, findRoot?.options?.components ?? [], parentData => {
      parent = parentData
    })
  } else {
    // 没有配置组件路径，全局查找
    for (const item of designData) {
      if (parent) break
      forofForfindParentComponentsOfComponent(target.id, item?.options?.components ?? [], parentData => {
        parent = parentData
      })
    }
  }
  return parent
}

function forofForfindParentComponentsOfComponent(id:string, data: MergeDesignData[], callback: (parentData: MergeDesignData[]) => void) {
  for (const item of data) {
    if (item.id === id) {
      callback(data)
      break
    } else {
      forofForfindParentComponentsOfComponent(id, item.options?.components ?? [], callback)
    }
  }
}

/**
 * 拍平所有组件
 * @param data
 * @returns
 */
export function toFlattenComponents(data?: MergeDesignData[]) {
  if (!data) return []
  return data.reduce((prev: MergeDesignData[], cur: MergeDesignData): MergeDesignData[] => {
    return [
      ...prev,
      cur,
      ...(cur.options?.components ? toFlattenComponents(cur.options?.components) : [])
    ]
  }, [])
}