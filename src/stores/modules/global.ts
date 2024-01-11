/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 12:23:49
 * @Description:
 */
import { ActiveDesignData } from '@/components'
import { defineStore } from 'pinia'

const useGlobal = defineStore('global', () => {
  /** 页面设计器是否是当前活动 */
  const isPageDesignerActive = ref(true)
  /** 页面设计数据，最外层 */
  const designData = ref<ActiveDesignData[]>([])
  /** 当前被选中（设计中）的组件设计数据，只有容器组件会被选中 */
  const activeDesignData = ref<ActiveDesignData>()

  function setIsPageDesignerActive(data: boolean) {
    isPageDesignerActive.value = data
  }

  function setDesignData(data: ActiveDesignData) {
    designData.value.push(data)
    console.log('setDesignData', designData.value)
  }

  function setActiveDesignData(data?: ActiveDesignData) {
    activeDesignData.value = data
    console.log('setActiveConfigData', activeDesignData.value)
  }
  return {
    isPageDesignerActive,
    setIsPageDesignerActive,
    designData,
    setDesignData,
    activeDesignData,
    setActiveDesignData
  }
})

export { useGlobal }