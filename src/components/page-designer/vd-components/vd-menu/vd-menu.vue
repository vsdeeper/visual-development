<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-08 18:37:53
 * @Description:
-->
<script setup lang='ts'>
import { MenuDesignData } from '.'
import MenuItem from './menu-item.vue'

const props = defineProps<{
  config: MenuDesignData
}>()

const _config = toRef(props, 'config')
</script>

<template>
  <div class="vd-menu">
    <el-menu :mode="_config.options?.mode" :collapse='_config.options?.collapse' :default-active="_config.options?.defaultActive">
      <MenuItem :data="_config.options?.menuData" />
    </el-menu>
  </div>
</template>