<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-06 23:44:58
 * @Description:
-->

<script setup lang="ts">
import { useGlobal } from '@/stores'
import { SubComponentsOfPageDesigner } from '.'
import { AddComponent, AddComponentOptionItem } from '@/components'
import { AsideDesignData } from './vd-components/vd-aside'
import { MenuDesignData } from './vd-components/vd-menu'
import { isPageDesignModeSymbol } from '@/utils/constants'
import { ContainerDesignData } from './vd-components/vd-container'
import { isLayoutContainer } from './util'
import { addComponentOptions } from './constants'

console.log('SubComponentsOfPageDesigner 表单设计子组件', SubComponentsOfPageDesigner)

const { designData, setDesignData, setActiveDesignData } = useGlobal()
const addComponentRef = ref<InstanceType<typeof AddComponent>>()
const key = ref('')

// provide
provide(isPageDesignModeSymbol, ref(true))

function handleKeydown(e: KeyboardEvent) {
  key.value += e.key.toUpperCase()
  if (key.value.includes('AC')) {
    // A+C 键，打开组件选择弹框
    addComponentRef.value?.open()
  }
}

function handleKeyup() {
  if (key.value.includes('AC')) key.value = ''
}

function selectComponent(item: AddComponentOptionItem) {
  const data = createConfigData(item)
  const { activeDesignData } = useGlobal()
  console.log('activeDesignData', activeDesignData)
  if (!activeDesignData) {
    /**
     * 当前不存在设计中的组件，说明是初始设计
     * 此时需要设置最外层的设计数据
     */
    setDesignData(data)
    setActiveDesignData(data)
  } else {
    /**
     * 当前存在设计中的组件
     * 此时只需要设置活动组件的设计数据
     */
    if (isLayoutContainer(data)) {
      /**
       * 布局容器，可以挂载子组件
       * 子组件挂载后将活动设计数据设置为子组件
       */
      !activeDesignData.options!.components && (activeDesignData.options!.components = [])
      activeDesignData.options!.components!.push(data!)
      setActiveDesignData(data)
    }
  }
}

function createConfigData(item: AddComponentOptionItem) {
  switch (item.value) {
    case 'Container': {
      return {
        id: item.value,
        label: item.label,
        options: {}
      } as ContainerDesignData
    }
    case 'Aside': {
      return {
        id: item.value,
        label: item.label,
        options: {}
      } as AsideDesignData
    }
    case 'Menu': {
      return {
        id: item.value,
        label: item.label,
        options: {
          menuData: [
            {
              id: '1',
              name: '一级菜单',
              children: [
                {
                  id: '1-1',
                  name: '二级菜单',
                  children: [
                    {
                      id: '1-1-1',
                      name: '三级菜单'
                    }
                  ]
                }
              ]
            },
            {
              id: '2',
              name: '一级菜单'
            }
          ]
        }
      } as MenuDesignData
    }
    case 'Form': {
      return {
        id: item.value,
        label: item.label,
        options: {}
      }
    }
    default: {
      return {
        id: item.value,
        label: item.label,
        options: {}
      } as ContainerDesignData
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('keyup', handleKeyup)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('keyup', handleKeyup)
})
</script>

<template>
  <div id="page-designer">
    <ShortcutKeyTip v-if="!Object.keys(designData).length" :keys='["A", "C"]' label='添加组件' active />
    <component v-for="item in designData" :key="item.id" :is="SubComponentsOfPageDesigner[item.id]" :data="item"></component>
  </div>
  <AddComponent ref="addComponentRef" :options="addComponentOptions" @select="selectComponent"></AddComponent>
</template>

<style lang="scss" scoped>
#page-designer {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;

  .shortcut-key-tip {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -100%);

    :deep(.label) {
      color: var(--el-color-primary);
    }

    :deep(.key) {
      background-color: var(--el-color-primary);
    }
  }

  .vd-container {

    &.active {
      border: 5px solid var(--el-color-primary);
    }
  }
}
</style>