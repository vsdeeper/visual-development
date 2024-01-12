<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:45:24
 * @Description:
-->
<script setup lang="ts">
import { AsideDesignData } from '.'
import { SubComponentsOfPageDesigner } from '..'
import { isActiveDesign } from '../../util'

defineProps<{
  data: AsideDesignData
}>()
</script>

<template>
  <VdSkeleton
    :class-list="['vd-aside']"
    :is-active="isActiveDesign(data.id)"
    :data="data"
    :shortcut-key-tip-options="[{ keys: ['V', 'A'] }, { keys: ['V', 'D'] }]">
    <component
      v-for="item in data.options?.components"
      :key="item.id"
      :is="SubComponentsOfPageDesigner[item.type]"
      :data="item"
      :is-active="isActiveDesign(item.id)"
    ></component>
  </VdSkeleton>
</template>