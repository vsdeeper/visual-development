<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-12 23:39:45
 * @LastEditTime: 2024-02-17 23:50:07
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description:
-->
<script setup lang="ts">
import { ActiveDesignData } from '@/components';

const props = defineProps<{
  formData: ActiveDesignData;
}>();

const _formData = toRef(props, 'formData');
</script>

<template>
  <el-form-item
    label="唯一标识符"
    prop="id"
    :rules="[{ required: true, message: '必填项' }]"
  >
    <el-input v-model="_formData.id" readonly></el-input>
  </el-form-item>
</template>
