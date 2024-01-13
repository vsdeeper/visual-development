<script setup lang="ts">
import { MergeDesignData } from '../..'
import { ShortcutKeyOptionItem } from '@/components'

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
</script>

<template>
  <!-- <span class="code">{{ data }}</span> -->
  <div
    ref="skeletonRef"
    class="vd-skeleton"
    :class="mergeClass(classList, [{ 'is-active': isActive }])"
    :style="{
      flex: `0 0 ${data.options?.width}`,
      width: data.options?.width,
      minHeight: data.options?.height
    }"
    @mouseover="mouseoverSkeleton"
    @mouseout="mouseoutSkeleton"
    >
    <div class="header">
      <label>{{ toLabel(data) }}</label>
    </div>
    <div class="main">
      <el-scrollbar>
        <slot></slot>
      </el-scrollbar>
    </div>
    <div class="footer">
      <ShortcutKeyTip :options="shortcutKeyTipOptions" :active-design-data="data"></ShortcutKeyTip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.code {
  font-size: 10px;
  color: var(--el-text-color-secondary);
}

.vd-skeleton {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;
  min-width: 300px;
  box-sizing: border-box;
  margin: 10px;
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

  .footer {
    line-height: 1;
    display: flex;
    justify-content: flex-end;
  }


  :deep(.el-scrollbar__view) {
    display: flex;
  }

  &.is-vertical {
    :deep {
      &>.header+.main>.el-scrollbar>.el-scrollbar__wrap>.el-scrollbar__view {
        flex-direction: column;
      }
    }
  }

  &.is-horizontal {
    :deep {
      &>.header+.main>.el-scrollbar>.el-scrollbar__wrap>.el-scrollbar__view {
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