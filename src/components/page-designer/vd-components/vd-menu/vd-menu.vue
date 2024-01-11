<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:45:24
 * @Description:
-->
<script setup lang="ts">
import { MenuDesignData } from '.'
import { isActiveDesign } from '../../util'

defineProps<{
  data: MenuDesignData
}>()
</script>

<template>
  <VdSkeleton
    :class-list="['vd-menu']"
    :is-active="isActiveDesign(data.id)"
    :data="data"
    :shortcut-key-tip-options="[{ label: '设计组件', keys: ['V', 'D'] }]">
  </VdSkeleton>
</template>