<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:45:24
 * @Description:
-->
<script setup lang="ts">
import { AsideConfigData } from '.'
import { SubComponentsOfPageDesigner } from '@/components'

const props = defineProps<{
  config: AsideConfigData
}>()

const _config = toRef(props, 'config')
</script>

<template>
  <el-aside :width="_config.options?.width">
    <span v-if="!_config.options?.children?.length" class="placeholder">按 V + D 键添加组件</span>
    <template v-for="item in _config.options?.children" :key="item.id">
      <component :is="SubComponentsOfPageDesigner[item.id]" :config="item"></component>
    </template>
  </el-aside>
</template>