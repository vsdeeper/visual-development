<script setup lang="ts">
import { type MergeDesignData } from '@/components'
import { ROW_GUTTER } from '../constants'

const formData = defineModel<MergeDesignData>({ default: () => ({ options: {} }) })
</script>

<template>
  <el-row :gutter="ROW_GUTTER">
    <ResponsiveCol>
      <IdEditor :form-data="formData"></IdEditor>
    </ResponsiveCol>
    <el-col :span="24">
      <my-divider-title label="搜索条件设置"></my-divider-title>
      <SearchConditionConfig v-model="formData.options"></SearchConditionConfig>
    </el-col>
  </el-row>
</template>
