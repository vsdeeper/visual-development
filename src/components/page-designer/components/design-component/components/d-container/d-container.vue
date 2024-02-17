<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-12 23:36:18
 * @LastEditTime: 2024-02-17 20:29:13
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description:
-->
<script setup lang="ts">
import { MergeDesignData } from '@/components';
import {
  IdEditor,
  ProjectNameEditor,
  DirectionEditor,
} from '../property-editor';
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
      <DirectionEditor :options="formData.options"></DirectionEditor>
    </ResponsiveCol>
  </el-row>
</template>
