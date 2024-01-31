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
  const list: SubComponentsTypeOfPageDesigner[] = ['Container', 'Aside', 'Header', 'Main', 'Footer', 'RouterView', 'View', 'RowCol']
  return list.includes(data.type)
}

/**
 * 判断组件是否在设计中
 * @param type
 * @returns
 */
export function isActiveDesign(targetId: string, activeDesignData?: ActiveDesignData) {
  return activeDesignData?.id === targetId
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
export function findParentComponentOfComponent(target: MergeDesignData, designData: MergeDesignData[]) {
  let parent: MergeDesignData | MergeDesignData[] | undefined
  if (isRootComponent(target.id, designData)) {
    // 根组件
    parent = designData
  } else {
    // 子组件，先判断是否配置了组件路径
    if (target.componentPath) {
      // 配置了组件路径，根据路径找到根组件
      const findRoot = designData.find(e => target.componentPath?.startsWith(e.projectName!))
      if (findRoot) {
        forofForfindParentComponentsOfComponent(target.id, findRoot, parentData => {
          parent = parentData
        })
      }
    } else {
    // 没有配置组件路径，全局查找
      for (const item of designData) {
        if (parent) break
        forofForfindParentComponentsOfComponent(target.id, item, parentData => {
          parent = parentData
        })
      }
    }
  }
  return parent
}

function forofForfindParentComponentsOfComponent(id:string, data: MergeDesignData, callback: (parentData: MergeDesignData) => void) {
  for (const item of data.options?.components ?? []) {
    if (item.id === id) {
      callback(data)
      break
    } else {
      forofForfindParentComponentsOfComponent(id, item, callback)
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

/**
 * 遍历组件列表
 * @param data
 * @param callback
 */
export function forEachHandlerOfComponents(data: MergeDesignData[], callback: (item: MergeDesignData) => void) {
  const handler = (data: MergeDesignData[]) => {
    data.forEach(item => {
      callback(item)
      if (item.options?.components?.length) handler(item.options.components)
    })
  }
  handler(data)
}

/**
 * 删除组件操作
 * @param activeDesignData
 * @param designData
 */
export function deleteComponent(activeDesignData: ActiveDesignData, designData: MergeDesignData[]) {
  const { setActiveDesignData } = useGlobal()
  const parent = findParentComponentOfComponent(activeDesignData, designData)
  if (!parent) return
  if (Array.isArray(parent)) {
    // 说明删除的组件是根组件
    const index = parent.findIndex(e => e.id === activeDesignData.id)
    parent.splice(index!, 1)
    if (!parent.length) {
      // 不存在设计组件
      setActiveDesignData(undefined)
    } else {
      // 存在设计组件，将当前设计组件设置为删除组件的下一个组件
      setActiveDesignData(parent[index])
    }
  } else {
    // 说明删除的是子组件
    const index = parent.options!.components!.findIndex(e => e.id === activeDesignData.id)
    parent.options!.components!.splice(index!, 1)
    setActiveDesignData(parent)
  }
}