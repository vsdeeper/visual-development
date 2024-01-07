<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:45:24
 * @Description:
-->
<script setup lang="ts">
import { AsideConfigData } from '.'

defineProps<{
  config: AsideConfigData
}>()
</script>

<template>
  侧栏{{ config }}
</template>