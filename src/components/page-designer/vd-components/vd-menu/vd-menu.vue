<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:45:24
 * @Description:
-->
<script setup lang="ts">
import { MenuDesignData } from '.'

defineProps<{
  data: MenuDesignData
}>()
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-menu']"
    :data="data"
    :shortcut-key-tip-options="[{ keys: ['Delete'] }, { keys: ['V', 'D'] }]">
  </DesignSkeleton>
</template>