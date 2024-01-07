/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 12:23:49
 * @Description:
 */
import { KeyOfPageDesignerConfigData, PageDesignerConfigData } from '@/components'
import { defineStore } from 'pinia'

const useGlobal = defineStore('global', () => {
  const pageDesignerData = ref<PageDesignerConfigData>({})

  function setPageDesignerData(key: KeyOfPageDesignerConfigData, data: unknown) {
    pageDesignerData.value[key] = data
    console.log('pageDesignerData 更新', pageDesignerData.value)
  }
  return {
    pageDesignerData,
    setPageDesignerData
  }
})

export { useGlobal }