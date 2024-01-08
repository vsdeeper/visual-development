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
  <div class="vd-aside" :class="{ active: isActiveDesign('Aside') }">
    <el-aside :width="_config.options?.width">
      <span v-if="!_config.options?.children?.length" class="placeholder">按 V + D 键添加组件</span>
      <template v-for="item in _config.options?.children" :key="item.id">
        <component :is="SubComponentsOfPageDesigner[item.id]" :config="item"></component>
      </template>
    </el-aside>
  </div>
</template>

<style lang="scss" scoped>
.vd-aside {
  display: inline-flex;
  position: relative;
  height: 100%;

  &.active {
    box-sizing: border-box;
    border: 3px solid var(--el-color-primary);
  }
}
</style>