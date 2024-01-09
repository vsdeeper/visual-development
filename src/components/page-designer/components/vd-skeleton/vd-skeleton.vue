<script setup lang="ts">
import { SubComponentsTypeOfPageDesigner } from '../..'

defineProps<{
  label: SubComponentsTypeOfPageDesigner
  isActive?: boolean
  shortcutKeyTipMap?: { keys?: [string, string]; label: string; }
}>()
</script>

<template>
  <div class="vd-skeleton" :class="{ 'is-active': isActive }">
    <div class="header">
      <label>{{ label }}</label>
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
.vd-skeleton {
  display: flex;
  flex-direction: column;
  min-height: 100px;
  box-sizing: border-box;
  justify-content: space-between;
  border: 1px solid var(--el-text-color-placeholder);

  .header {
    line-height: 1;

    label {
      font-size: 12px;
      color: var(--el-text-color-placeholder);
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

  &.is-active {
    border: 1px solid var(--el-color-primary);

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