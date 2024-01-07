/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 12:23:49
 * @Description:
 */
import { ActiveConfigData, PageDesignerConfigDataModel, SubComponentsTypeOfPageDesigner } from '@/components'
import { defineStore } from 'pinia'

const useGlobal = defineStore('global', () => {
  /** 页面配置数据，最外层 */
  const configData = ref<PageDesignerConfigDataModel>({})
  /** 当前被选中（设计中）的组件配置数据，只有容器组件会被选中 */
  const activeConfigData = ref<ActiveConfigData>()

  function setConfigData(key: SubComponentsTypeOfPageDesigner, data: unknown) {
    configData.value[key] = data
    console.log('setConfigData', configData.value)

  }

  function setActiveConfigData(data: ActiveConfigData) {
    activeConfigData.value = data
    console.log('setActiveConfigData', activeConfigData.value)
  }
  return {
    configData,
    setConfigData,
    activeConfigData,
    setActiveConfigData
  }
})

export { useGlobal }