<script setup lang="ts">
import { MergeDesignData } from '@/components';

const props = defineProps<{
  formData: MergeDesignData;
}>();

const _formData = toRef(props, 'formData');
</script>

<template>
  <el-form-item label="关联项目名称" prop="projectName" :rules="[{ required: true, message: '必填项' }]">
    <el-input v-model="_formData.projectName" clearable></el-input>
  </el-form-item>
</template>
