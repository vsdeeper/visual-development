<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:45:24
 * @Description:
-->
<script setup lang="ts">
import { MainDesignData } from '.'
import { SHORTCUR_KEY_TIP_OPTIONS } from '../constants'

defineProps<{
  data: MainDesignData
}>()
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-main']"
    :data="data"
    :shortcut-key-tip-options="SHORTCUR_KEY_TIP_OPTIONS">
  </DesignSkeleton>
</template>