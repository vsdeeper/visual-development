<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:45:24
 * @Description:
-->
<script setup lang="ts">
import { AsideDesignData } from '.'
import { SubComponentsOfPageDesigner, isActiveDesign } from '@/components'

const props = defineProps<{
  config: AsideDesignData
}>()

const _config = toRef(props, 'config')
</script>

<template>
  <el-aside :class="{ active: isActiveDesign('Aside') }" :width="_config.options?.width">
    <ShortcutKeyTip  v-if="!_config.options?.components?.length" keys='V + D' description='添加组件' />
    <template v-for="item in _config.options?.components" :key="item.id">
      <component :is="SubComponentsOfPageDesigner[item.id]" :config="item"></component>
    </template>
  </el-aside>
</template>

<style lang="scss" scoped>
.vd-aside {
  display: flex;
}
</style>