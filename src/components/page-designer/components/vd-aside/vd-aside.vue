<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:45:24
 * @Description:
-->
<script setup lang="ts">
import { AsideConfigData } from '.'

const props = defineProps<{
  config: AsideConfigData
}>()

const _config = toRef(props, 'config')
</script>

<template>
  <el-aside :width="_config.options?.width">
    <!-- Aside content -->
    侧栏
  </el-aside>
</template>