<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-06 23:44:58
 * @Description:
-->

<script setup lang="ts">
import { useGlobal } from '@/stores'
import { ActiveDesignData, SubComponentsOfPageDesigner, SubComponentsTypeOfPageDesigner, addComponentOptions } from '.'
import { AddComponent, AddComponentOptionItem } from '@/components'
import { AsideDesignData } from './vd-components/vd-aside'
import { MenuDesignData } from './vd-components/vd-menu'
import { isPageDesignModeSymbol } from '@/utils/constants'
import { ContainerDesignData } from './vd-components/vd-container'

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
  if (!activeDesignData) {
    // 当前不存在设计中的组件
    setDesignData(item.value, data)
    setActiveDesignData(data)
  } else {
    if (isLayoutContainer(activeDesignData)) {
      // 布局容器，可以挂载子组件
      !activeDesignData.options!.components && (activeDesignData.options!.components = [])
      activeDesignData.options!.components!.push(data!)
    }
  }
}

/**
 * 判断是否布局容器组件
 * @param data
 */
function isLayoutContainer(data: ActiveDesignData) {
  const list: SubComponentsTypeOfPageDesigner[] = ['Aside', 'Container']
  return data?.id && list.includes(data.id)
}

function createConfigData(item: AddComponentOptionItem) {
  switch (item.value) {
    case 'Aside': {
      return {
        id: item.value,
        label: item.label,
        options: {}
      } as AsideDesignData
    }
    case 'Container': {
      return {
        id: item.value,
        label: item.label,
        options: {}
      } as ContainerDesignData
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
    <template v-for="(val, key) in designData" :key="key">
      <component :is="SubComponentsOfPageDesigner[key]" :data="val" ></component>
    </template>
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
  }

  .vd-container {

    &.active {
      border: 5px solid var(--el-color-primary);
    }
  }
}
</style>