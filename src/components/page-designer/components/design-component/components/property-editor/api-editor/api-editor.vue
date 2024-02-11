<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-13 16:07:06
 * @LastEditTime: 2024-02-11 22:39:11
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 接口配置
-->
<script setup lang="ts">
import { MergeDesignData } from "@/components";

const props = withDefaults(
  defineProps<{
    formData: MergeDesignData;
    label?: string;
  }>(),
  {
    label: "接口",
  },
);

const _formData = toRef(props, "formData");
</script>

<template>
  <el-form-item :label="label" :prop="['options', 'api']">
    <el-input v-model="_formData.options!.api" placeholder="请输入">
      <template #prepend>
        <el-select
          v-model="_formData.options!.method"
          disabled
          style="width: 75px"
        >
          <el-option label="GET" value="GET" />
        </el-select>
      </template>
    </el-input>
  </el-form-item>
</template>
