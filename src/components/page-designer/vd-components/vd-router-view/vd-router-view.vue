<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:45:24
 * @Description:
-->
<script setup lang="ts">
import { RouterViewDesignData } from '.'

defineProps<{
  data: RouterViewDesignData
}>()
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-router-view']"
    :data="data"
    :shortcut-key-tip-options="[{ keys: ['Delete'] }, { keys: ['V', 'A'] }, { keys: ['V', 'D'] }]">
  </DesignSkeleton>
</template>