<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-01 22:07:17
 * @LastEditTime: 2024-02-10 20:52:29
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 是否启用 vue-router 模式
-->
<script setup lang="ts">
import { MergeDesignData } from "@/components";

const props = withDefaults(
  defineProps<{
    formData: MergeDesignData;
    label?: string;
  }>(),
  {
    label: "启用 vue-router 模式",
  },
);

const _formData = toRef(props, "formData");
</script>

<template>
  <el-form-item :label="label" :prop="['options', 'router']">
    <el-switch
      v-model="_formData.options!.router"
      inline-prompt
      active-text="是"
      inactive-text="否"
    />
  </el-form-item>
</template>
