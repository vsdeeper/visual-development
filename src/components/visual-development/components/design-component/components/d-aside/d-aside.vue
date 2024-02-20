<script setup lang="ts">
import { MergeDesignData } from '@/components';
import { IdEditor, ProjectNameEditor, WidthEditor } from '../property-editor';
import { isRootComponent } from '@/components/visual-development/util';
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
      <WidthEditor :options="formData.options"></WidthEditor>
    </ResponsiveCol>
  </el-row>
</template>
