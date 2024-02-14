<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-11 14:36:22
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @LastEditTime: 2024-02-13 20:07:46
 * @Description: table虚拟组件
-->
<script setup lang="ts">
import { TableDesignData } from '.';
import { SHORTCUR_KEY_OPTIONS_OF_GENERAL_COMPONENT } from '../constants';

defineProps<{
  data: TableDesignData;
}>();
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-table']"
    :data="data"
    :shortcut-key-options="SHORTCUR_KEY_OPTIONS_OF_GENERAL_COMPONENT"
  >
  </DesignSkeleton>
</template>
