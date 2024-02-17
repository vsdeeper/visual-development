<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-13 16:07:06
 * @LastEditTime: 2024-02-17 21:01:02
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 名称属性
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
    label: '名称',
    formItemProp: () => ['options', 'name'],
  },
);

const options = toRef(props, 'options');
</script>

<template>
  <el-form-item :label="label" :prop="formItemProp">
    <el-input v-model="options.name" placeholder="请输入" clearable></el-input>
  </el-form-item>
</template>
