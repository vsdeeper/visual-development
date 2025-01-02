<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { VisualDevelopment } from '@/components'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <VisualDevelopment />
  </el-config-provider>
</template>
