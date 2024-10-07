import { nanoid } from 'nanoid'
import localforage from 'localforage'
import { useGlobal } from '@/stores'
import {
  type ActiveDesignData,
  type MergeDesignData,
  type ComponentTypeOfPageDesigner,
  type PresetDataItem,
} from '.'
import { PRESET_DATA_KEY } from './constants'

/**
 * 获取组件设计预设数据
 * @param key
 */
export async function getPresetData(key: string): Promise<PresetDataItem[] | null | undefined> {
  try {
    const forageData: PresetDataItem[] | null = await localforage.getItem(key)
    if (!forageData) return []
    return forageData
  } catch (error) {
    console.error(error)
  }
}

/**
 * 设置组件设计预设数据
 * @param data
 */
export async function setPresetData(data?: {
  presetData: ActiveDesignData
  extendData: Record<string, any>
}) {
  try {
    const { presetData, extendData } = data ?? {}
    if (!presetData) return
    const copyPresetData: ActiveDesignData = JSON.parse(JSON.stringify(presetData))
    const foragePresetData = await getPresetData(PRESET_DATA_KEY)
    if (foragePresetData?.some(e => e.id === copyPresetData.id)) {
      const find = foragePresetData.find(e => e.id === copyPresetData.id)
      if (find) {
        find.timestamp = +new Date()
        find.data = copyPresetData
      }
    } else {
      foragePresetData?.push({
        id: genId(copyPresetData.type),
        type: copyPresetData.type,
        name: extendData?.name,
        desc: extendData?.desc,
        data: copyPresetData,
        timestamp: +new Date(),
      })
    }
    localforage.setItem(PRESET_DATA_KEY, foragePresetData)
  } catch (error) {
    console.error(error)
  }
}

/**
 * 判断是否容器组件
 * @param type
 */
export function isContainerComponent(type: ComponentTypeOfPageDesigner) {
  const list: ComponentTypeOfPageDesigner[] = ['Project', 'View']
  return list.includes(type)
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
 * 找到组件的父级组件
 * @param data
 * @param designData
 * @returns
 */
export function findParentComponentOfComponent(
  target: MergeDesignData,
  designData: MergeDesignData[],
) {
  if (!target) return
  let parent: MergeDesignData | MergeDesignData[] | undefined
  if (isRootComponent(target.id, designData)) {
    // 根组件
    parent = designData
  } else {
    // 全局查找
    for (const item of designData) {
      if (parent) break
      forofForfindParentComponentsOfComponent(target.id, item, parentData => {
        parent = parentData
      })
    }
  }
  return parent
}

/**
 * 找到根组件，即所处项目组件
 */
export function findRootComponent(target: MergeDesignData, designData: MergeDesignData[]) {
  let root: MergeDesignData | undefined
  for (const item of designData) {
    const flattenComponents = toFlattenComponents(item.components)
    if (flattenComponents.some(e => e.id === target.id)) {
      root = item
      break
    }
  }
  return root
}

function forofForfindParentComponentsOfComponent(
  id: string,
  data: MergeDesignData,
  callback: (parentData: MergeDesignData) => void,
) {
  for (const item of data.components ?? []) {
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
    return [...prev, cur, ...(cur.components ? toFlattenComponents(cur.components) : [])]
  }, [])
}

/**
 * 遍历组件列表
 * @param data
 * @param callback
 */
export function forEachHandlerOfComponents(
  data: MergeDesignData[],
  callback: (item: MergeDesignData) => void,
) {
  const handler = (data: MergeDesignData[]) => {
    data.forEach(item => {
      callback(item)
      if (item.components?.length) handler(item.components)
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
    const index = parent.components!.findIndex(e => e.id === activeDesignData.id)
    parent.components!.splice(index!, 1)
    setActiveDesignData(parent)
  }
}

/**
 * 生成设计数据id
 * @param type
 */
export function genId(type: string) {
  return `${type}${nanoid(5)}`.toLowerCase()
}
