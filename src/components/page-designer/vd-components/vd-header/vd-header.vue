<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:45:24
 * @Description:
-->
<script setup lang="ts">
import { HeaderDesignData } from '.'

defineProps<{
  data: HeaderDesignData
}>()
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-header']"
    :data="data"
    :shortcut-key-tip-options="[{ keys: ['Delete'] }, { keys: ['V', 'A'] }, { keys: ['V', 'D'] }]">
  </DesignSkeleton>
</template>