<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-13 16:07:06
 * @LastEditTime: 2024-02-17 21:02:10
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: Tooltip 主题，内置了 dark / light 两种主题
-->
<script setup lang="ts">
import { DesignDataOptions } from '@/components';
import { POPPER_EFFECT_OPTIONS } from './constants';
import { FormItemRule } from 'element-plus';

const props = withDefaults(
  defineProps<{
    options: DesignDataOptions;
    label?: string;
    formItemProp?: string[];
    formItemRules?: FormItemRule[];
  }>(),
  {
    label: 'Tooltip 主题',
    formItemProp: () => ['options', 'popperEffect'],
  },
);

const options = toRef(props, 'options');
</script>

<template>
  <el-form-item :label="label" :prop="formItemProp">
    <el-select v-model="options.popperEffect" placeholder="请选择" clearable>
      <el-option
        v-for="item in POPPER_EFFECT_OPTIONS"
        :key="item.value"
        :label="`${item.label} - ${item.value}`"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>
