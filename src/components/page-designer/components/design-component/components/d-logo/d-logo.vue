<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-07 13:35:21
 * @LastEditTime: 2024-02-17 23:39:38
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: logo设计组件
-->
<script setup lang="ts">
import { MergeDesignData } from '@/components';
import {
  ColorEditor,
  FontSizeEditor,
  HeightEditor,
  IdEditor,
  NameEditor,
  SuffixIconEditor,
} from '../property-editor';
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
      <NameEditor :options="formData.options"></NameEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <ColorEditor :options="formData.options"></ColorEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <HeightEditor :options="formData.options"></HeightEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <FontSizeEditor :options="formData.options"></FontSizeEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <SuffixIconEditor :options="formData.options"></SuffixIconEditor>
    </ResponsiveCol>
  </el-row>
</template>
