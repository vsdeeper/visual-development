<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-01 22:07:17
 * @LastEditTime: 2024-02-12 22:37:44
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 是否启用 vue-router 模式
-->
<script setup lang="ts">
import { MergeDesignData } from '@/components';

const props = withDefaults(
  defineProps<{
    formData: MergeDesignData;
    label?: string;
  }>(),
  {
    label: '启用 vue-router 模式',
  },
);

const _formData = toRef(props, 'formData');
</script>

<template>
  <el-form-item :label="label" :prop="['options', 'router']">
    <el-radio-group v-model="_formData.options!.router">
      <el-radio-button :label="true">是</el-radio-button>
      <el-radio-button :label="false">否</el-radio-button>
    </el-radio-group>
  </el-form-item>
</template>
