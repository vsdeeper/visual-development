<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-13 16:07:06
 * @LastEditTime: 2024-02-17 20:21:20
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 颜色属性
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
    showAlpha?: boolean;
  }>(),
  {
    label: '颜色',
    formItemProp: () => ['options', 'color'],
  },
);

const options = toRef(props, 'options');
</script>

<template>
  <el-form-item :label="label" :prop="formItemProp">
    <my-color-picker
      v-model="options.color"
      :show-alpha="showAlpha"
    ></my-color-picker>
  </el-form-item>
</template>
