<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:34:06
 * @Description:
-->
<script setup lang="ts">
import { ContainerDesignData } from '.'
import { SHORTCUR_KEY_TIP_OPTIONS } from '../constants'

defineProps<{
  data: ContainerDesignData
}>()
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-container', { 'is-vertical': data.options?.direction === 'vertical', 'is-horizontal': data.options?.direction === 'horizontal' }]"
    :data="data"
    :shortcut-key-tip-options="SHORTCUR_KEY_TIP_OPTIONS">
  </DesignSkeleton>
</template>
