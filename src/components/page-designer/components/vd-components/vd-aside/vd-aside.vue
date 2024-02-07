<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:45:24
 * @Description:
-->
<script setup lang="ts">
import { AsideDesignData } from '.'
import { SHORTCUR_KEY_OPTIONS_OF_CONTAINER_COMPONENT } from '../constants'

defineProps<{
  data: AsideDesignData
}>()
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-aside']"
    :data="data"
    :shortcut-key-options="SHORTCUR_KEY_OPTIONS_OF_CONTAINER_COMPONENT">
  </DesignSkeleton>
</template>