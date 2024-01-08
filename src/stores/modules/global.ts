/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 12:23:49
 * @Description:
 */
import { ActiveDesignData, PageDesignDataModel, SubComponentsTypeOfPageDesigner } from '@/components'
import { defineStore } from 'pinia'

const useGlobal = defineStore('global', () => {
  /** 页面设计数据，最外层 */
  const designData = ref<PageDesignDataModel>({})
  /** 当前被选中（设计中）的组件设计数据，只有容器组件会被选中 */
  const activeDesignData = ref<ActiveDesignData>()

  function setDesignData(key: SubComponentsTypeOfPageDesigner, data: unknown) {
    designData.value[key] = data
    console.log('setDesignData', designData.value)

  }

  function setActiveDesignData(data: ActiveDesignData) {
    activeDesignData.value = data
    console.log('setActiveConfigData', activeDesignData.value)
  }
  return {
    designData,
    setDesignData,
    activeDesignData,
    setActiveDesignData
  }
})

export { useGlobal }