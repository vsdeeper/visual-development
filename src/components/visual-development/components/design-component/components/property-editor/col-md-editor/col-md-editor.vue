<script setup lang="ts">
import { type DesignDataOptions } from '@/components';
import { type FormItemRule } from 'element-plus';

const props = withDefaults(
  defineProps<{
    options: DesignDataOptions;
    label?: string;
    formItemProp?: string[];
    formItemRules?: FormItemRule[];
  }>(),
  {
    label: '≥992px 响应式栅格数',
    formItemProp: () => ['options', 'colMd'],
  },
);

const options = toRef(props, 'options');
</script>

<template>
  <el-form-item :prop="formItemProp">
    <template #label>
      <my-label :label="label" />
    </template>
    <el-input-number v-model="options.colMd" controls-position="right" :min="1" :max="24" />
  </el-form-item>
</template>
/* __placeholder__ */
import type { type DesignDataOptions } from '@/components';import type { type FormItemRule } from 'element-plus';