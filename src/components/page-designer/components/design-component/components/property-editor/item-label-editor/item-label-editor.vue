<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-13 16:07:06
 * @LastEditTime: 2024-02-12 21:44:57
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: label别名
-->
<script setup lang="ts">
import { MergeDesignData } from "@/components";

const props = defineProps<{
  formData: MergeDesignData;
}>();

const _formData = toRef(props, "formData");
</script>

<template>
  <el-form-item label="label别名" :prop="['options', 'itemLabel']">
    <el-input v-model="_formData.options!.itemLabel" clearable></el-input>
  </el-form-item>
</template>
