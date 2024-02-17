<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-01 22:07:17
 * @LastEditTime: 2024-02-17 19:57:22
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: ≥1200px 响应式栅格数
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
    label: '≥1200px 响应式栅格数',
    formItemProp: () => ['options', 'colLg'],
  },
);

const options = toRef(props, 'options');
</script>

<template>
  <el-form-item :label="label" :prop="formItemProp">
    <el-input-number
      v-model="options.colLg"
      controls-position="right"
      :min="1"
      :max="24"
    />
  </el-form-item>
</template>
