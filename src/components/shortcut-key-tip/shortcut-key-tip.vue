<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-09 09:14:36
 * @Description:
-->

<script setup lang='ts'>
defineProps<{
  label: string
  keys?: [string, string]
  active?: boolean
}>()
</script>

<template>
  <div class='shortcut-key-tip' :class="{ active }">
    <div class="label">{{ label }}</div>
    <div class="key" v-for="key in keys" :key="key">{{ key.toUpperCase() }}</div>
  </div>
</template>

<style lang='scss' scoped>
.shortcut-key-tip {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;

  .label {
    font-size: 12px;
    color: var(--el-text-color-placeholder);
    margin-right: 5px;
  }

  .key {
    display: inline-flex;
    align-items: center;
    font-size: 10px;
    font-weight: bold;
    line-height: 1;
    height: 16px;
    padding: 0 5px;
    border-radius: 4px;
    color: #fff;
    background-color: var(--el-text-color-placeholder);

    &+div.key {
      margin-left: 2px;
    }
  }
}
</style>