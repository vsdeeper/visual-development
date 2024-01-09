<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:45:24
 * @Description:
-->
<script setup lang="ts">
import { AsideDesignData } from '.'

defineProps<{
  data: AsideDesignData
  isActive?: boolean
}>()
</script>

<template>
  {{ data }}
  <VdSkeleton
    :class="['vd-aside']"
    label="Aside"
    :is-active="isActive"
    :shortcut-key-tip-map="{ label: '添加组件', keys: ['A', 'C'] }">
  </VdSkeleton>
</template>

<style lang="scss" scoped>
.vd-aside {
  &.vd-skeleton {
    border-width: 4px;
  }
}
</style>