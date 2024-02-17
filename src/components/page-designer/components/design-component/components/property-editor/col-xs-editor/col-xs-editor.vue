<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-01 22:07:17
 * @LastEditTime: 2024-02-17 20:13:13
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: <768px 响应式栅格数
-->
<script setup lang="ts">
import { DesignDataOptions } from '@/components';
import { FormItemRule } from 'element-plus';

const props = withDefaults(
  defineProps<{
    options: DesignDataOptions;
    label?: string;
    formItemProp?: string[];
    formItemRules?: FormItemRule[];
  }>(),
  {
    label: '<768px 响应式栅格数',
    formItemProp: () => ['options', 'colXs'],
  },
);

const options = toRef(props, 'options');
</script>

<template>
  <el-form-item :label="label" :prop="formItemProp">
    <el-input-number
      v-model="options.colXs"
      controls-position="right"
      :min="1"
      :max="24"
    />
  </el-form-item>
</template>
