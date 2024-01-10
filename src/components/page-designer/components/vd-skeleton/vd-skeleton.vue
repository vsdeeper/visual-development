<script setup lang="ts">
import { ActiveDesignData } from '../..'

defineProps<{
  data: ActiveDesignData
  classList?: unknown[]
  isActive?: boolean
  shortcutKeyTipMap?: { keys?: [string, string]; label: string; }
}>()

function mergeClass(classList?: unknown[], myClassList?: unknown[]) {
  let _class = []
  if (classList) _class.push(classList)
  if (myClassList) _class.push(myClassList)
  return _class
}

function toLabel(data: ActiveDesignData) {
  return `${data.label}-${data.type}`
}
</script>

<template>
  <span class="code">{{ data }}</span>
  <div class="vd-skeleton" :class="mergeClass(classList, [{ 'is-active': isActive }])">
    <div class="header">
      <label>{{ toLabel(data) }}</label>
    </div>
    <div class="main">
      <slot></slot>
    </div>
    <div class="footer">
      <ShortcutKeyTip :keys="shortcutKeyTipMap?.keys" :label="shortcutKeyTipMap?.label ?? '添加组件'"></ShortcutKeyTip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.code {
  font-size: 10px;
  color: var(--el-text-color-placeholder);
}

.vd-skeleton {
  display: flex;
  flex-direction: column;
  min-height: 100px;
  box-sizing: border-box;
  justify-content: space-between;
  border-width: 2px;
  border-style: solid;
  border-color: var(--el-text-color-placeholder);

  .header {
    line-height: 1;

    label {
      font-size: 10px;
      font-weight: bold;
      margin-left: 5px;
      color: var(--el-text-color-secondary);
    }
  }

  .main {
    padding: 10px;
  }

  .footer {
    line-height: 1;
    display: flex;
    justify-content: flex-end;
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