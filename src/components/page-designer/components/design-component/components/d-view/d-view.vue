<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-29 12:56:10
 * @Description:
-->
<script setup lang="ts">
import { MergeDesignData } from '@/components'
import { IdEditor, ViewNameEditor } from '../property-editor'
import { RowGutter } from '../constants'

defineProps<{
  formData: MergeDesignData
}>()
</script>

<template>
  <el-row :gutter="RowGutter">
    <ResponsiveCol>
      <IdEditor :form-data="formData"></IdEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <ViewNameEditor :form-data="formData"></ViewNameEditor>
    </ResponsiveCol>
  </el-row>
</template>