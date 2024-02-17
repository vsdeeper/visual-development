<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-07 13:35:21
 * @LastEditTime: 2024-02-17 21:03:46
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 菜单设计组件
-->
<script setup lang="ts">
import { MergeDesignData } from '@/components';
import { ComponentPathEditor, IdEditor } from '../property-editor';
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
    <ResponsiveCol>
      <ComponentPathEditor :form-data="formData"></ComponentPathEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <ModeEditor :options="formData.options"></ModeEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <RouterEditor :options="formData.options"></RouterEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <PopperEffectEditor :options="formData.options"></PopperEffectEditor>
    </ResponsiveCol>
    <el-col :span="24">
      <ApiEditor :options="formData.options" label="菜单接口"></ApiEditor>
    </el-col>
  </el-row>
</template>
