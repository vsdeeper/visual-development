<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-13 17:28:14
 * @LastEditTime: 2024-02-17 20:33:54
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description:
-->
<script setup lang="ts">
import { MergeDesignData } from '@/components';
import { IdEditor, ProjectNameEditor, HeightEditor } from '../property-editor';
import { isRootComponent } from '@/components/page-designer/util';
import { useGlobal } from '@/stores';
import { ROW_GUTTER } from '../constants';

defineProps<{
  formData: MergeDesignData;
}>();
</script>

<template>
  <el-row :gutter="ROW_GUTTER">
    <ResponsiveCol>
      <IdEditor :form-data="formData"></IdEditor>
    </ResponsiveCol>
    <ResponsiveCol v-if="isRootComponent(formData.id, useGlobal().designData)">
      <ProjectNameEditor :form-data="formData"></ProjectNameEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <HeightEditor :options="formData.options"></HeightEditor>
    </ResponsiveCol>
  </el-row>
</template>
