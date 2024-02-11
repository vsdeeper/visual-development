<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-11 14:36:22
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @LastEditTime: 2024-02-11 14:53:25
 * @Description: 搜索虚拟组件
-->
<script setup lang="ts">
import { SearchDesignData } from ".";
import { SHORTCUR_KEY_OPTIONS_OF_GENERAL_COMPONENT } from "../constants";

defineProps<{
  data: SearchDesignData;
}>();
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-search']"
    :data="data"
    :shortcut-key-options="SHORTCUR_KEY_OPTIONS_OF_GENERAL_COMPONENT"
  >
  </DesignSkeleton>
</template>
