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
  <DesignSkeleton
    :class-list="['vd-container', { 'is-vertical': data.options?.direction === 'vertical', 'is-horizontal': data.options?.direction === 'horizontal' }]"
    :data="data"
    :shortcut-key-tip-options="[{ keys: ['Delete'] }, { keys: ['V', 'A'] }, { keys: ['V', 'D'] }]">
  </DesignSkeleton>
</template>
