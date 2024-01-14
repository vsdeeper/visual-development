<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-06 23:44:58
 * @Description:
-->

<script setup lang="ts">
import draggable from 'vuedraggable'
import { useGlobal } from '@/stores'
import { nanoid } from 'nanoid'
import { ActiveDesignData, DesignComponent, VdComponents, SubComponentsTypeOfPageDesigner, MergeDesignData } from '.'
import { AddComponent, AddComponentOptionItem, ContainerDesignData, ListOfShortcutKeys } from '@/components'
import { isPageDesignModeSymbol, addComponentRefSymbol, designComponentRefSymbol } from '@/utils/constants'
import { deleteComponent, isLayoutContainer } from './util'
import { addComponentOptions } from './constants'
import { AsideDesignData } from './vd-components/vd-aside'
import { HeaderDesignData } from './vd-components/vd-header'
import { MenuDesignData } from './vd-components/vd-menu'
import { FooterDesignData } from './vd-components/vd-footer'

export type AddComponentInstance = InstanceType<typeof AddComponent>
export type DesignComponentInstance = InstanceType<typeof DesignComponent>
export type ListOfShortcutKeysInstance = InstanceType<typeof ListOfShortcutKeys>

console.log('VdComponents 可视化设计组件', VdComponents)

const { designData, setDesignData, setActiveDesignData } = useGlobal()
const addComponentRef = ref<AddComponentInstance>()
const designComponentRef = ref<DesignComponentInstance>()
const listOfShortcutKeysRef = ref<ListOfShortcutKeysInstance>()
const key = ref('')

// provide
provide(isPageDesignModeSymbol, ref(true))
provide(addComponentRefSymbol, addComponentRef)
provide(designComponentRefSymbol, designComponentRef)

function handleKeydown(e: KeyboardEvent) {
  key.value += e.key.toUpperCase()
  if (key.value.includes('VA')) {
    // V+A 键
    const { activeDesignData } = useGlobal()
    if (!activeDesignData || isLayoutContainer(activeDesignData)) {
      // 当前不存在设计中的组件或当前设计组件是布局容器类组件，进行添加组件操作
      addComponentRef.value?.open()
      key.value = ''
    }
  } else if (key.value.includes('VD')) {
    // V+D 键，设计组件
    designComponentRef.value?.open()
    key.value = ''
  } else if (key.value.includes('DELETE')) {
    // Delete 键，删除组件
    const { designData, activeDesignData } = useGlobal()
    deleteComponent(activeDesignData as ActiveDesignData, designData)
    key.value = ''
  }
}

function selectComponent(item: AddComponentOptionItem) {
  const data = createDesignData(item)
  const { activeDesignData } = useGlobal()
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
    if (isLayoutContainer(activeDesignData)) {
      /**
       * 布局容器，可以挂载子组件
       * 子组件挂载后将活动设计数据设置为子组件
       */
      !activeDesignData.options!.components && (activeDesignData.options!.components = [])
      activeDesignData.options!.components!.push(data)
      setActiveDesignData(data)
    }
  }
}

/**
 * 生成设计数据id
 * @param type
 */
function toId(type: SubComponentsTypeOfPageDesigner) {
  return `${type}${nanoid(5)}`.toLowerCase()
}

function createDesignData(item: AddComponentOptionItem) {
  switch (item.value) {
    case 'Container': {
      return {
        id: toId(item.value),
        type: item.value,
        label: item.label,
        options: {
          components: []
        }
      } as ContainerDesignData
    }
    case 'Aside': {
      return {
        id: toId(item.value),
        type: item.value,
        label: item.label,
        options: {
          components: []
        }
      } as AsideDesignData
    }
    case 'Header': {
      return {
        id: toId(item.value),
        type: item.value,
        label: item.label,
        options: {
          components: []
        }
      } as HeaderDesignData
    }
    case 'Footer': {
      return {
        id: toId(item.value),
        type: item.value,
        label: item.label,
        options: {
          components: []
        }
      } as FooterDesignData
    }
    case 'Menu': {
      return {
        id: toId(item.value),
        type: item.value,
        label: item.label,
        options: {}
      } as MenuDesignData
    }
    case 'Form': {
      return {
        id: toId(item.value),
        type: item.value,
        label: item.label,
        options: {}
      }
    }
    default: {
      return {
        id: toId(item.value),
        type: item.value,
        label: item.label,
        options: {}
      } as ContainerDesignData
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

function showMoreShortcutKey() {
  listOfShortcutKeysRef.value?.open()
}
</script>

<template>
  <!-- {{ designData }} -->
  <div id="page-designer" :class="{ 'has-design-content': designData.length, 'active': !designData.length || !useGlobal().activeDesignData }">
    <div class="version">
      Page Designer 1.0.0
    </div>
    <el-scrollbar>
      <draggable
        :list="designData"
        :component-data="{
          type: 'transition-group'
        }"
        v-bind="{
          animation: 300,
          group: 'design-skeleton-draggable'
        }"
        item-key="id"
      >
        <template #item="{ element: item }">
          <div class="group-item">
            <component :is="VdComponents[(item as MergeDesignData).type]" :data="item"></component>
          </div>
        </template>
      </draggable>
    </el-scrollbar>
    <ShortcutKeyTip
      :options="designData.length ? [{ keys: ['V', 'A'] }] : [{ label: '添加组件', keys: ['V', 'A'] }]"
      show-more
      is-page-designer
      @show-more="showMoreShortcutKey"
    />
  </div>
  <AddComponent ref="addComponentRef" :options="addComponentOptions" @select="selectComponent"></AddComponent>
  <DesignComponent ref="designComponentRef" :form-data="(useGlobal().activeDesignData as ActiveDesignData)"></DesignComponent>
  <ListOfShortcutKeys ref="listOfShortcutKeysRef"></ListOfShortcutKeys>
</template>

<style lang="scss" scoped>
#page-designer {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 30px 10px;
  overflow: hidden;
  box-sizing: border-box;

  .version {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, calc(-100% - 40px));
    font-size: 10px;
    font-weight: bold;
    color: var(--el-color-primary);
  }

  &.active {
    &>.shortcut-key-tip {


      :deep(.label) {
        color: var(--el-color-primary);
      }

      :deep(.key) {
        background-color: var(--el-color-primary);
      }
    }
  }

  &.has-design-content {

    .version {
      position: fixed;
      left: unset;
      left: 10px;
      top: unset;
      top: 7px;
      color: var(--el-text-color-secondary);
      transform: unset;
    }

    &>.shortcut-key-tip {
      position: fixed;
      left: unset;
      right: 5px;
      top: unset;
      bottom: 0;
      transform: unset;

      :deep(.label) {
        font-size: 12px;
      }

      :deep(.key) {
        font-size: 10px;
        height: 18px;
        padding: 0 6px;
      }
    }
  }

  &>.shortcut-key-tip {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -100%);

    :deep(.label) {
      font-size: 16px;
      font-weight: bold;
      color: var(--el-text-color-placeholder);
    }

    :deep(.key) {
      font-size: 11px;
      height: 22px;
      padding: 0 8px;
      background-color: var(--el-text-color-placeholder);
    }
  }

  .vd-container {

    &.active {
      border: 5px solid var(--el-color-primary);
    }
  }
}
</style>
