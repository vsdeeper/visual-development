<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-13 16:07:06
 * @LastEditTime: 2024-02-07 14:17:35
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 颜色属性
-->
<script setup lang="ts">
import { MergeDesignData } from "@/components";

const props = defineProps<{
  formData: MergeDesignData;
  showAlpha?: boolean;
}>();

const _formData = toRef(props, "formData");
</script>

<template>
  <el-form-item label="颜色" :prop="['options', 'color']">
    <el-color-picker
      v-model="_formData.options!.color"
      :show-alpha="showAlpha"
    />
  </el-form-item>
</template>

<style lang="scss" scoped>
:deep(.el-color-picker) {
  flex: 1;
}
:deep(.el-color-picker__trigger) {
  width: 100%;
}
</style>
