<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:34:06
 * @Description:
-->
<script setup lang="ts">
import { ContainerDesignData } from '.'
import { SubComponentsOfPageDesigner } from '../..'
import { isActiveDesign } from '../../util'

defineProps<{
  data: ContainerDesignData
}>()
</script>

<template>
  <VdSkeleton
    :class-list="['vd-container', { 'is-vertical': data.options?.direction === 'vertical', 'is-horizontal': data.options?.direction === 'horizontal' }]"
    :is-active="isActiveDesign(data.id)"
    :data="data"
    :shortcut-key-tip-options="[{ keys: ['Delete'] }, { keys: ['V', 'A'] }, { keys: ['V', 'D'] }]">
    <component
      v-for="item in data.options?.components"
      :key="item.id"
      :is="SubComponentsOfPageDesigner[item.type]"
      :data="item"
      :is-active="isActiveDesign(item.id)"
    ></component>
  </VdSkeleton>
</template>

<style lang="scss" scoped>
.vd-container {
  &.is-vertical {
    :deep(.main .el-scrollbar__view) {
      flex-direction: column;
    }
  }

  &.is-horizontal {
    :deep(.main .el-scrollbar__view) {
      flex-direction: row;
    }
  }
}
</style>