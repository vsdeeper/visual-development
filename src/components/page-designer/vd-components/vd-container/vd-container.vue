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
  {{ data }}
  <VdSkeleton
    :class="['vd-container', { 'is-vertical': data.options?.direction === 'vertical' }]"
    label="Container"
    :is-active="isActiveDesign(data.id)"
    :shortcut-key-tip-map="{ label: '添加组件', keys: ['A', 'C'] }">
    <component
      v-for="item in data.options?.components"
      :key="item.id"
      :is="SubComponentsOfPageDesigner[item.id]"
      :data="item"
      :is-active="isActiveDesign(item.id)"
    ></component>
  </VdSkeleton>
</template>

<style lang="scss" scoped>
.vd-container {
  &.is-vertical {
    flex-direction: column;
  }

  &.vd-skeleton {
    border-width: 5px;
  }
}
</style>