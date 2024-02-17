<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-07 13:35:21
 * @LastEditTime: 2024-02-17 21:08:34
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: search设计组件
-->
<script setup lang="ts">
import { MergeDesignData } from '@/components';
import {
  ComponentPathEditor,
  IdEditor,
  SearchConditionItemsEditor,
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
      <ComponentPathEditor :form-data="formData"></ComponentPathEditor>
    </ResponsiveCol>
    <el-col :span="24">
      <el-collapse :model-value="['condition']">
        <el-collapse-item title="搜索条件设置" name="condition">
          <SearchConditionItemsEditor
            :options="formData.options"
          ></SearchConditionItemsEditor>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
</template>
