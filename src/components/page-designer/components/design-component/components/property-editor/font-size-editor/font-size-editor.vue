<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-13 16:07:06
 * @LastEditTime: 2024-02-07 13:45:15
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 字体大小属性
-->
<script setup lang="ts">
import { MergeDesignData } from "@/components";

const props = defineProps<{
  formData: MergeDesignData;
}>();

const _formData = toRef(props, "formData");
</script>

<template>
  <el-form-item label="字体大小" :prop="['options', 'fontSize']">
    <el-input v-model="_formData.options!.fontSize" clearable></el-input>
  </el-form-item>
</template>
