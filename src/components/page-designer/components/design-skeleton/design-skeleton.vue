<script setup lang="ts">
import draggable from 'vuedraggable'
import { MergeDesignData, VdComponents } from '../..'
import { ShortcutKeyOptionItem } from '@/components'
import { isActiveDesign } from '../../util'
import { useGlobal } from '@/stores'

defineProps<{
  data: MergeDesignData
  classList?: unknown[]
  isActive?: boolean
  shortcutKeyTipOptions: ShortcutKeyOptionItem[]
}>()

const skeletonRef = ref<HTMLDivElement>()

function mergeClass(classList?: unknown[], myClassList?: unknown[]) {
  let _class = []
  if (classList) _class.push(classList)
  if (myClassList) _class.push(myClassList)
  return _class
}

function toLabel(data: MergeDesignData) {
  return `${data.label}-${data.type}`
}

function mouseoverSkeleton(e: MouseEvent) {
  e.stopPropagation()
  skeletonRef.value?.classList.add('hover')
}

function mouseoutSkeleton(e: MouseEvent) {
  e.stopPropagation()
  skeletonRef.value?.classList.remove('hover')
}

function genStyle(data: MergeDesignData) {
  return {
    'flex': data.options?.width ? `0 0 ${data.options?.width}` : '1',
    'width': data.options?.width,
    'minHeight': data.options?.height
  }
}
</script>

<template>
  <div
    ref="skeletonRef"
    class="design-skeleton"
    :class="mergeClass(classList, [{ 'is-active': isActive }])"
    @mouseover="mouseoverSkeleton"
    @mouseout="mouseoutSkeleton"
    >
    <div class="header">
      <label>{{ toLabel(data) }}</label>
    </div>
    <div class="main">
      <draggable
        :list="data.options?.components"
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
          <div class="group-item" :style="genStyle(item)">
            <component
              :is="VdComponents[(item as MergeDesignData).type]"
              :data="item"
              :is-active="isActiveDesign(item.id, useGlobal().activeDesignData)"
            ></component>
          </div>
        </template>
      </draggable>
    </div>
    <div class="footer">
      <ShortcutKeyTip :options="shortcutKeyTipOptions" :data="data"></ShortcutKeyTip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.code {
  font-size: 10px;
  color: var(--el-text-color-secondary);
}

.design-skeleton {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  min-width: 200px;
  margin: 5px;
  box-sizing: border-box;
  justify-content: space-between;
  border-width: 2px;
  border-style: solid;
  border-color: var(--el-text-color-placeholder);
  background-color: #fff;
  transition: border-color 0.2s ease-in-out 0s;

  &.hover {
    border-color: var(--el-color-warning);
  }

  .header {
    line-height: 1;

    label {
      font-size: 10px;
      margin-left: 5px;
      color: var(--el-text-color-secondary);
    }
  }

  .main {
    display: flex;
    flex: 1;
    overflow: auto;

    div[type='transition-group'] {
      display: flex;
      flex: 1;
      flex-direction: column;
      min-height: 30px;
      padding: 5px;

      .group-item {
        display: inline-flex;
        flex: 1;
      }
    }
  }

  .footer {
    line-height: 1;
    display: flex;
    justify-content: flex-end;
  }


  :deep(.el-scrollbar__view) {
    display: flex;
    flex: 1;
    flex-direction: column;
  }

  &.is-vertical {
    :deep {
      &>.header+.main>div[type='transition-group'] {
        flex-direction: column;
      }
    }
  }

  &.is-horizontal {
    :deep {
      &>.header+.main>div[type='transition-group'] {
        flex-direction: row;
      }
    }
  }

  &.vd-container {
    border-width: 5px;
  }

  &.vd-aside,
  &.vd-header,
  &.vd-footer,
  &.vd-main {
    border-width: 4px;
  }

  &.vd-router-view,
  &.vd-view {
    border-width: 3px;
  }

  &.is-active {
    border-color: var(--el-color-primary);

    &>.header label {
      color: var(--el-color-primary);
    }

    &>:deep(.footer .shortcut-key-tip .label) {
      color: var(--el-color-primary);
    }

    &>:deep(.footer .shortcut-key-tip .key) {
      background-color: var(--el-color-primary);
    }
  }
}
</style>