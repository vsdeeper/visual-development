<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-06 23:44:58
 * @Description:
-->

<script setup lang="ts">
import { useGlobal } from '@/stores'
import { SubComponentsOfPageDesigner, addComponentOptions } from '.'
import { AddComponent, AddComponentOptionItem } from '@/components'
import { AsideDesignData } from './components/vd-aside'
import { MenuDesignData } from './components/vd-menu'
import { isPageDesignModeSymbol } from '@/utils/constants'

withDefaults(defineProps<{
  width?: string
}>(), {
  width: '100%'
})

console.log('SubComponentsOfPageDesigner 表单设计子组件', SubComponentsOfPageDesigner)

const { designData, setDesignData, setActiveDesignData } = useGlobal()
const addComponentRef = ref<InstanceType<typeof AddComponent>>()
const key = ref('')

// provide
provide(isPageDesignModeSymbol, ref(true))

function handleKeydown(e: KeyboardEvent) {
  key.value += e.key.toUpperCase()
  if (key.value.includes('VD')) {
    // v+d键，打开组件选择弹框
    addComponentRef.value?.open()
  }
}

function handleKeyup() {
  if (key.value.includes('VD')) key.value = ''
}

function selectComponent(item: AddComponentOptionItem) {
  const data = createConfigData(item)
  const { activeDesignData } = useGlobal()
  if (!activeDesignData) {
    // 当前不存在设计中的组件
    setDesignData(item.value, data)
    setActiveDesignData(data)
  } else {
    !activeDesignData.options!.components && (activeDesignData.options!.components = [])
    activeDesignData.options!.components!.push(data!)
  }
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
    case 'FormDesigner': {
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
  <div id="page-designer" :style="{ width }">
    <ShortcutKeyTip  v-if="!Object.keys(designData).length" keys='V + D' description='添加组件' />
    <template v-for="(val, key) in designData" :key="key">
      <component :is="SubComponentsOfPageDesigner[key]" :config="val"></component>
    </template>
  </div>
  <AddComponent ref="addComponentRef" :options="addComponentOptions" @select="selectComponent"></AddComponent>
</template>

<style lang="scss" scoped>
#page-designer {
  display: flex;
  position: relative;
  height: 100%;

  :deep {
    .el-aside {
      position: relative;

      &.active {
        border: 3px solid var(--el-color-primary);
      }
    }

    .vd-menu {
      position: relative;

      &.active {
        box-sizing: border-box;
        border: 3px solid var(--el-color-primary);
      }
    }
  }


  :deep .shortcut-key-tip {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -100%);
    white-space: nowrap;
  }
}
</style>