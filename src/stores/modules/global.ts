import type { ActiveDesignData, MergeDesignData } from '../../components/visual-development'

// 设计数据，最外层
export const designData = ref<MergeDesignData[]>([])
// 当前被选中（设计中）的组件设计数据，只有容器组件会被选中
export const activeDesignData = ref<ActiveDesignData>()
// dialog 全屏标识
export const dialogFullscreen = ref<boolean>()

export function setDesignData(data: ActiveDesignData) {
  designData.value.push(data)
  console.log('setDesignData', designData.value)
}

export function setActiveDesignData(data?: ActiveDesignData) {
  activeDesignData.value = data
  console.log('setActiveDesignData', activeDesignData.value)
}

export function setDialogFullscreen(data: boolean) {
  dialogFullscreen.value = data
  console.log('setDialogFullscreen', dialogFullscreen.value)
}
