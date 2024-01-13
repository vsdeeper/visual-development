<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:45:24
 * @Description:
-->
<script setup lang="ts">
import { useGlobal } from '@/stores'
import { MenuDesignData } from '.'
import { isActiveDesign } from '../../util'

defineProps<{
  data: MenuDesignData
}>()

const activeDesignData = toRef(useGlobal(), 'activeDesignData')
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-menu']"
    :is-active="isActiveDesign(data.id, activeDesignData)"
    :data="data"
    :shortcut-key-tip-options="[{ keys: ['Delete'] }, { keys: ['V', 'D'] }]">
  </DesignSkeleton>
</template>