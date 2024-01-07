/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 12:23:49
 * @Description:
 */
import { KeyOfPageDesignerDataModel, PageDesignerConfigDataModel } from '@/components'
import { defineStore } from 'pinia'

const useGlobal = defineStore('global', () => {
  /** 页面设计数据 */
  const pageDesignerData = ref<PageDesignerConfigDataModel>({})
  /** 当前被选中（设计中）的页面设计子组件数据 */
  const activeSubComponentDataOfPageDesigner = ref<unknown>()

  function setPageDesignerData(key: KeyOfPageDesignerDataModel, data: unknown) {
    pageDesignerData.value[key] = data
    console.log('pageDesignerData 更新', pageDesignerData.value)
  }

  function setActiveSubComponentDataOfPageDesigner(data: unknown) {
    activeSubComponentDataOfPageDesigner.value = data
  }
  return {
    pageDesignerData,
    setPageDesignerData,
    activeSubComponentDataOfPageDesigner,
    setActiveSubComponentDataOfPageDesigner
  }
})

export { useGlobal }