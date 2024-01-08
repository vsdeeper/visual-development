<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-08 18:37:53
 * @Description:
-->
<script setup lang='ts'>
import { MenuDesignData } from '.'

const props = defineProps<{
  config: MenuDesignData
}>()

const _config = toRef(props, 'config')
</script>

<template>
  <div class="vd-menu">
    <el-menu :mode="_config.options.mode" :default-active="_config.options.defaultActive">
      <!-- <el-sub-menu
        :index="index + 1"
        :key="submenus.key">
        <template #title>{{ submenus.title }}</template>
        <el-menu-item v-for="(item, subIndex) in submenus.menus"
          :index="(index + 1) + '-' + (subIndex + 1)"
          :key="item.key">
            {{ item.title }}
        </el-menu-item>
      </el-submenu> -->
    </el-menu>
  </div>
</template>