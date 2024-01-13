<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:45:24
 * @Description:
-->
<script setup lang="ts">
import { FooterDesignData } from '.'
import { SubComponentsOfPageDesigner } from '..'
import { isActiveDesign } from '../../util'

defineProps<{
  data: FooterDesignData
}>()
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-header']"
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
  </DesignSkeleton>
</template>