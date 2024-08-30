<script setup lang="ts">
import { type MergeDesignData } from '@/components'
import { IdEditor, SearchConditionItemsEditor } from '../property-editor'
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
      <SearchConditionItemsEditor v-model="formData.options"></SearchConditionItemsEditor>
    </el-col>
  </el-row>
</template>
