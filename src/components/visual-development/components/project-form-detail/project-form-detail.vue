<script setup lang="ts">
import { FormInstance } from 'element-plus';
import { ProjectData } from '../..';

const props = defineProps<{
  formData?: Partial<ProjectData>;
}>();

const form = ref<Partial<ProjectData>>({});
const formRef = ref<FormInstance>();

watch(
  () => props.formData,
  formData => {
    form.value = formData ?? {};
  },
  { once: true },
);

function getFormData() {
  try {
    return JSON.parse(JSON.stringify(form.value));
  } catch (error) {
    return {};
  }
}

defineExpose({
  formRef,
  getFormData,
});
</script>

<template>
  <el-form :model="form" ref="formRef" label-position="top">
    <el-form-item label="项目名称">
      <el-input v-model="form.name" placeholder="请输入" clearable></el-input>
    </el-form-item>
    <el-form-item label="git地址">
      <el-input v-model="form.git" placeholder="请输入" clearable></el-input>
    </el-form-item>
    <el-form-item label="项目描述">
      <el-input v-model="form.description" type="textarea" placeholder="请输入"></el-input>
    </el-form-item>
  </el-form>
</template>
