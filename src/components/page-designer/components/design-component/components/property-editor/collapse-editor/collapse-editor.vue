<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-01 22:07:17
 * @LastEditTime: 2024-02-07 13:40:08
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 折叠属性
-->
<script setup lang="ts">
import { MergeDesignData } from "@/components";

const props = withDefaults(
  defineProps<{
    formData: MergeDesignData;
    label?: string;
  }>(),
  {
    label: "折叠",
  },
);

const _formData = toRef(props, "formData");
</script>

<template>
  <el-form-item :label="label" :prop="['options', 'collapse']">
    <el-switch
      v-model="_formData.options!.collapse"
      inline-prompt
      active-text="是"
      inactive-text="否"
    />
  </el-form-item>
</template>
