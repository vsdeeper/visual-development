import { ActiveDesignData } from '@/components'
import { defineStore } from 'pinia'

const useGlobal = defineStore('global', () => {
  /** 页面设计数据，最外层 */
  const designData = ref<ActiveDesignData[]>([])
  /** 当前被选中（设计中）的组件设计数据，只有容器组件会被选中 */
  const activeDesignData = ref<ActiveDesignData>()
  /**dialog全屏标识 */
  const fullscreen = ref<boolean>()

  function setDesignData(data: ActiveDesignData) {
    designData.value.push(data)
    console.log('setDesignData', designData.value)
  }

  function setActiveDesignData(data?: ActiveDesignData) {
    activeDesignData.value = data
    console.log('setActiveDesignData', activeDesignData.value)
  }

  function setFullscreen(data: boolean) {
    fullscreen.value = data
    console.log('setFullscreen', fullscreen.value)
  }
  return {
    designData,
    setDesignData,
    activeDesignData,
    setActiveDesignData,
    fullscreen,
    setFullscreen
  }
})

export { useGlobal }