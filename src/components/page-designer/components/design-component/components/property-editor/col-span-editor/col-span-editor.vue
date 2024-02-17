<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-01 22:07:17
 * @LastEditTime: 2024-02-17 20:13:21
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 栅格间隔
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
    label: '栅格占据的列数',
    formItemProp: () => ['options', 'colSpan'],
  },
);

const options = toRef(props, 'options');
</script>

<template>
  <el-form-item :label="label" :prop="formItemProp">
    <el-input-number
      v-model="options.colSpan"
      controls-position="right"
      :min="1"
      :max="24"
    />
  </el-form-item>
</template>
