<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-01 16:08:25
 * @Description:
-->
<script setup lang="ts">
import { MergeDesignData } from '@/components'
import { IdEditor, ProjectNameEditor } from '../property-editor'
import { isRootComponent } from '@/components/page-designer/util'
import { useGlobal } from '@/stores'
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
    <ResponsiveCol v-if="isRootComponent(formData.id, useGlobal().designData)">
      <ProjectNameEditor :form-data="formData"></ProjectNameEditor>
    </ResponsiveCol>
  </el-row>
</template>