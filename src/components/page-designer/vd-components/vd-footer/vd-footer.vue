<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:45:24
 * @Description:
-->
<script setup lang="ts">
import { useGlobal } from '@/stores'
import { FooterDesignData } from '.'
import { VdComponents } from '..'
import { isActiveDesign } from '../../util'

defineProps<{
  data: FooterDesignData
}>()

const activeDesignData = toRef(useGlobal(), 'activeDesignData')
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-header']"
    :is-active="isActiveDesign(data.id, activeDesignData)"
    :data="data"
    :shortcut-key-tip-options="[{ keys: ['Delete'] }, { keys: ['V', 'A'] }, { keys: ['V', 'D'] }]">
    <component
      v-for="item in data.options?.components"
      :key="item.id"
      :is="VdComponents[item.type]"
      :data="item"
      :is-active="isActiveDesign(item.id, activeDesignData)"
    ></component>
  </DesignSkeleton>
</template>