import type { ActiveDesignData, MergeDesignData } from '@/components'
import { defineStore } from 'pinia'

const useGlobal = defineStore('global', () => {
  // 版本号
  const version = ref<string>()
  // 设计数据，最外层
  const designData = ref<MergeDesignData[]>([])
  // 当前被选中（设计中）的组件设计数据，只有容器组件会被选中
  const activeDesignData = ref<ActiveDesignData>()
  // dialog 全屏标识
  const dialogFullscreen = ref<boolean>()

  async function getVersion() {
    const res = await fetch('/package.json', {
      method: 'get'
    })
    const data = await res.json()
    return (version.value = data.version)
  }

  function setDesignData(data: ActiveDesignData) {
    designData.value.push(data)
    console.log('setDesignData', designData.value)
  }

  function setActiveDesignData(data?: ActiveDesignData) {
    activeDesignData.value = data
    console.log('setActiveDesignData', activeDesignData.value)
  }

  function setDialogFullscreen(data: boolean) {
    dialogFullscreen.value = data
    console.log('setDialogFullscreen', dialogFullscreen.value)
  }
  return {
    version,
    getVersion,
    designData,
    setDesignData,
    activeDesignData,
    setActiveDesignData,
    dialogFullscreen,
    setDialogFullscreen
  }
})

export { useGlobal }
