<script setup lang="ts">
import draggable from 'vuedraggable'
import { sleep } from 'radash'
import {
  designData,
  activeDesignData,
  dialogFullscreen,
  setDesignData,
  setActiveDesignData,
} from '@/stores'
import {
  type ActiveDesignData,
  DesignComponent,
  VdComponents,
  type BaseDesignData,
  type MergeDesignData,
} from '.'
import {
  IS_PAGE_DESIGN_MODE_SYMBOL,
  ADD_COMPONENT_REF_SYMBOL,
  DESIGN_COMPONENT_REF_SYMBOL,
  EXPORT_IMPORT_DATA_REF_SYMBOL,
} from '@/utils/constants'
import { findParentComponentOfComponent, genId, isActiveDesign, isContainerComponent } from './util'
import { DESIGN_DATA_KEY } from './constants'
import {
  AddComponent,
  ShortcutKeyOperation,
  type AddComponentOptionItem,
  type ShortcutKeyDescription,
  type ViewDesignData,
  type ProjectDesignData,
  type ExportImportDataInstance,
  type TableDesignData,
} from './components'
import localforage from 'localforage'

export type AddComponentInstance = InstanceType<typeof AddComponent>
export type DesignComponentInstance = InstanceType<typeof DesignComponent>
export type ListOfShortcutKeysInstance = InstanceType<typeof ShortcutKeyDescription>

console.log('VdComponents 可视化设计组件', VdComponents)

const addComponentRef = ref<AddComponentInstance>()
const designComponentRef = ref<DesignComponentInstance>()
const exportImportDataRef = ref<ExportImportDataInstance>()
const listOfShortcutKeysRef = ref<ListOfShortcutKeysInstance>()
const keyCodes = ref('')
const loading = ref(false)

// provide
provide(IS_PAGE_DESIGN_MODE_SYMBOL, ref(true))
provide(ADD_COMPONENT_REF_SYMBOL, addComponentRef)
provide(DESIGN_COMPONENT_REF_SYMBOL, designComponentRef)
provide(EXPORT_IMPORT_DATA_REF_SYMBOL, exportImportDataRef)

onMounted(async () => {
  loading.value = true
  window.addEventListener('keydown', handleKeydown)
  const forageDesignData: MergeDesignData[] | null = await localforage.getItem(DESIGN_DATA_KEY)
  designData.value.length = 0
  forageDesignData?.map(data => designData.value.push(data))
  await sleep(500)
  loading.value = false
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

watch(
  designData,
  val => {
    localforage.setItem(DESIGN_DATA_KEY, JSON.parse(JSON.stringify(val)))
  },
  { deep: true },
)

async function handleKeydown(e: KeyboardEvent) {
  const overlayEls = document.querySelectorAll('#app > div[class*="el-overlay"]')
  for (const el of overlayEls) {
    const display = (el as HTMLDivElement).style.display
    if (display !== 'none') {
      return
    }
  }
  keyCodes.value += e.key.toUpperCase()
  if (keyCodes.value.includes('VA')) {
    // V+A 键，添加组件
    if (!activeDesignData.value || isContainerComponent(activeDesignData.value.type)) {
      // 当前不存在设计中的组件或当前设计组件是布局容器类组件，进行添加组件操作
      addComponentRef.value?.open()
      keyCodes.value = ''
    }
  } else if (keyCodes.value.includes('VD')) {
    if (!activeDesignData.value) return
    // V+D 键，设计组件
    designComponentRef.value?.open()
    keyCodes.value = ''
  } else if (keyCodes.value.includes('VE')) {
    exportImportDataRef.value?.open(activeDesignData.value as ProjectDesignData | ViewDesignData)
    keyCodes.value = ''
  }
}

async function onSelectComponent(item: AddComponentOptionItem) {
  const data = await createDesignData(item)
  if (!activeDesignData.value) {
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
    if (isContainerComponent(activeDesignData.value!.type)) {
      /**
       * 布局容器，可以挂载子组件
       * 子组件挂载后将活动设计数据设置为子组件
       */
      !activeDesignData.value!.components && (activeDesignData.value!.components = [])
      activeDesignData.value!.components!.push(data)
      setActiveDesignData(data)
    }
  }
}

/**
 * 创建初始设计数据
 */
async function createDesignData(item: AddComponentOptionItem): Promise<ActiveDesignData> {
  switch (item.value) {
    case 'Project': {
      return {
        id: genId(item.value),
        type: item.value,
        label: item.label,
        options: {
          name: 'my-project',
          apiDomain: {},
          npmrc:
            'registry=https://registry.npmmirror.com/\n@scoped:registry=https://verdaccio.xxx.com/',
          commonField: {
            pageSize: 'pageSize',
            pageIndex: 'pageIndex',
          },
          constants: [],
          globalApiConfig: [],
        },
        components: [],
      } as ProjectDesignData
    }
    case 'View': {
      return {
        id: genId(item.value),
        type: item.value,
        label: item.label,
        options: {
          name: 'my-view',
          saticDataConfig: [],
        },
        components: [],
      } as ViewDesignData
    }
    case 'Search': {
      return {
        id: genId(item.value),
        type: item.value,
        label: item.label,
        options: {
          labelWidth: 110,
          searchConditionItems: [],
        },
        components: [],
      }
    }
    case 'Table': {
      return {
        id: genId(item.value),
        type: item.value,
        label: item.label,
        options: {
          tableLayout: 'fixed',
          showSelection: false,
          showPagination: true,
          highlightCurrentRow: true,
          itemChildren: 'children',
          itemHasChildren: 'hasChildren',
          operateColumnWidth: 150,
          apiConfig: { params: [] },
          lazyApiConfig: { params: [] },
          tableOperations: [],
          tableColumnItems: [],
          tableColumnOperations: [],
        },
        components: [],
      } as TableDesignData
    }
    default: {
      return {
        id: genId(item.value),
        type: item.value,
        label: item.label,
        options: {},
        components: [],
      } as BaseDesignData
    }
  }
}

function showMoreShortcutKey() {
  listOfShortcutKeysRef.value?.open()
}

function onImport(val: string) {
  const _val = JSON.parse(val) as MergeDesignData
  const find = findParentComponentOfComponent(activeDesignData.value!, designData.value)
  if (Array.isArray(find)) {
    const _find = find.find(e => e.id === activeDesignData.value!.id)
    const _findIndex = find.findIndex(e => e.id === activeDesignData.value!.id)
    if (JSON.stringify(_find, null, '  ') !== val) {
      find.splice(_findIndex, 1, _val)
    }
  } else {
    const _find = find?.components?.find(e => e.id === activeDesignData.value!.id)
    const _findIndex = find?.components?.findIndex(e => e.id === activeDesignData.value!.id)
    if (_find && JSON.stringify(_find, null, '  ') !== val) {
      find?.components?.splice(_findIndex!, 1, _val)
    }
  }
}
</script>

<template>
  <div
    v-loading="loading"
    id="visual-development"
    :class="{
      'has-design-content': !loading && designData.length,
      active: !designData.length || !activeDesignData,
    }"
  >
    <div class="version">Visual Development</div>
    <el-scrollbar v-if="!loading">
      <!-- {{ designData }} -->
      <draggable
        class="transition-group-in-visual-development"
        :list="designData"
        :component-data="{
          type: 'transition-group',
        }"
        v-bind="{
          animation: 300,
          group: 'design-skeleton-draggable',
        }"
        item-key="id"
      >
        <template #item="{ element: item }">
          <div class="group-item">
            <component
              :key="item.name"
              :is="VdComponents[(item as BaseDesignData).type]"
              :is-active="isActiveDesign(item.id, activeDesignData)"
              :data="item"
            ></component>
          </div>
        </template>
      </draggable>
    </el-scrollbar>
    <ShortcutKeyOperation
      v-if="!loading"
      :options="
        designData.length ? [{ keys: ['V', 'A'] }] : [{ label: '添加组件', keys: ['V', 'A'] }]
      "
      show-more
      used-in-root-component
      @show-more="showMoreShortcutKey"
    />
  </div>
  <AddComponent ref="addComponentRef" @select="onSelectComponent" />
  <DesignComponent
    ref="designComponentRef"
    v-model="activeDesignData"
    :form-data="activeDesignData as ActiveDesignData"
    :fullscreen="dialogFullscreen"
  />
  <ExportImportData ref="exportImportDataRef" @import="onImport" />
  <ShortcutKeyDescription ref="listOfShortcutKeysRef" />
</template>

<style lang="scss" scoped>
#visual-development {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  padding: 30px 0;
  overflow: hidden;
  box-sizing: border-box;

  .version {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, calc(-100% - 40px));
    font-size: 11px;
    font-weight: bold;
    color: var(--el-color-primary);
  }

  .transition-group-in-visual-development {
    padding: 0 10px;

    & > .group-item {
      margin-bottom: 10px;
    }

    & > .design-skeleton {
      margin: 0;
    }
  }

  :deep(.design-skeleton .group-item) {
    margin: 3px;
  }

  &.active {
    & > .shortcut-key-operation {
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

    & > .shortcut-key-operation {
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

  & > .shortcut-key-operation {
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

<style lang="scss">
.el-dialog.is-fullscreen {
  .el-dialog__body {
    box-sizing: border-box;
    & > .design-component {
      height: 100%;
      & > .el-form {
        height: 100%;
        & > .el-container {
          height: 100%;
        }
      }
    }
  }
}
</style>
