<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:45:24
 * @Description:
-->
<script setup lang="ts">
import { MenuDesignData } from '.'
import { SubComponentsOfPageDesigner } from '..'
import { isActiveDesign } from '../../util'

defineProps<{
  data: MenuDesignData
  isActive?: boolean
}>()
</script>

<template>
  <VdSkeleton
    :class-list="['vd-menu']"
    :is-active="isActive"
    :data="data"
    :shortcut-key-tip-map="{ label: '设计组件', keys: ['D', 'C'] }">
    <component
      v-for="item in data.options?.components"
      :key="item.id"
      :is="SubComponentsOfPageDesigner[item.type]"
      :data="item"
      :is-active="isActiveDesign(item.id)"
    ></component>
  </VdSkeleton>
</template>