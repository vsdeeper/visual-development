<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-13 17:20:15
 * @LastEditTime: 2024-02-17 20:42:03
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 高度设置
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
    label: '高度',
    formItemProp: () => ['options', 'height'],
  },
);

const options = toRef(props, 'options');
</script>

<template>
  <el-form-item :label="label" :prop="formItemProp">
    <el-input
      v-model="options.height"
      placeholder="请输入"
      clearable
    ></el-input>
  </el-form-item>
</template>
