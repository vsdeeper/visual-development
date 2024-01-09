<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:34:06
 * @Description:
-->
<script setup lang="ts">
import { ContainerDesignData } from '.'

defineProps<{
  data: ContainerDesignData
}>()
</script>

<template>
  <div class="vd-container" :class="{ 'is-vertical': data.options?.direction === 'vertical', 'is-active': true }">
    <div class="header">
      <label>Container</label>
    </div>
    <div class="main"></div>
    <div class="footer">
      <ShortcutKeyTip :keys="['A', 'C']" label="添加组件"></ShortcutKeyTip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vd-container {
  display: flex;
  flex-direction: column;
  min-height: 100px;
  box-sizing: border-box;
  justify-content: space-between;

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

  &.is-vertical {
    flex-direction: column;
  }

  &.is-active {
    border: 5px solid var(--el-color-primary);

    .header label {
      color: var(--el-color-primary);
    }

    :deep(.shortcut-key-tip .label) {
      color: var(--el-color-primary);
    }

    :deep(.shortcut-key-tip .key) {
      background-color: var(--el-color-primary);
    }
  }
}
</style>