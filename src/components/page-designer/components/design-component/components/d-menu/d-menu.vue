<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-07 13:35:21
 * @LastEditTime: 2024-02-14 22:49:31
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
      <ModeEditor :form-data="formData"></ModeEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <RouterEditor :form-data="formData"></RouterEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <PopperEffectEditor :form-data="formData"></PopperEffectEditor>
    </ResponsiveCol>
    <el-col :span="24">
      <ApiEditor :form-data="formData" label="菜单接口"></ApiEditor>
    </el-col>
  </el-row>
</template>
