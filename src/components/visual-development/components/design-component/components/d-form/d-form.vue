<script setup lang="ts">
import { type MergeDesignData } from '../../../..'

const formData = defineModel<MergeDesignData>({ default: () => ({ options: {} }) })
</script>

<template>
  <el-container>
    <el-aside width="250px"> 左侧边栏 </el-aside>
    <el-container>
      <el-header height="50px"> 顶部 </el-header>
      <el-main> 主体 </el-main>
    </el-container>
    <el-aside width="250px"> 右侧边栏 </el-aside>
  </el-container>
</template>
