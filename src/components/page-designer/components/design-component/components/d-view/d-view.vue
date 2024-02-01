<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-29 12:56:10
 * @Description:
-->
<script setup lang="ts">
import { MergeDesignData } from '@/components'
import { IdEditor, ComponentPathEditor } from '../property-editor'
import { ROW_GUTTER } from '../constants'

defineProps<{
  formData: MergeDesignData
}>()
</script>

<template>
  <el-row :gutter="ROW_GUTTER">
    <ResponsiveCol>
      <IdEditor :form-data="formData"></IdEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <ComponentPathEditor :form-data="formData" label="视图路径"></ComponentPathEditor>
    </ResponsiveCol>
  </el-row>
</template>