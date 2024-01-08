<script setup lang='ts'>
defineProps<{
  keys: string
  description: string
}>()
</script>

<template>
  <div class='shortcut-key-tip'>
    按 {{ keys }} 键{{ description }}
  </div>
</template>

<style lang='scss' scoped>
.shortcut-key-tip {
  display: inline-flex;
  color: var(--el-text-color-placeholder);
}
</style>