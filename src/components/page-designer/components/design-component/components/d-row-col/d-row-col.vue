<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-01 16:08:25
 * @Description: 栅格设计器
-->
<script setup lang="ts">
import { MergeDesignData } from '@/components'
import { IdEditor, GutterEditor, JustifyEditor, AlignEditor } from '../property-editor'
import { ROW_GUTTER } from '../constants'
import { isRowComponent } from '@/components/page-designer/util'
import { useGlobal } from '@/stores'

defineProps<{
  formData: MergeDesignData
}>()
</script>

<template>
  <el-row :gutter="ROW_GUTTER">
    <ResponsiveCol>
      <IdEditor :form-data="formData"></IdEditor>
    </ResponsiveCol>
    <template v-if="isRowComponent(formData, useGlobal().designData)">
      <ResponsiveCol>
        <GutterEditor :form-data="formData"></GutterEditor>
      </ResponsiveCol>
      <ResponsiveCol>
        <JustifyEditor :form-data="formData"></JustifyEditor>
      </ResponsiveCol>
      <ResponsiveCol>
        <AlignEditor :form-data="formData"></AlignEditor>
      </ResponsiveCol>
    </template>
  </el-row>
</template>