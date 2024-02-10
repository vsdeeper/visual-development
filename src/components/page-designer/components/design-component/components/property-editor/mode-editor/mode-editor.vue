<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-13 16:07:06
 * @LastEditTime: 2024-02-10 20:36:09
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 模式
-->
<script setup lang="ts">
import { MergeDesignData } from "@/components";
import { MODE_OPTIONS } from "./constants";

const props = withDefaults(
  defineProps<{
    formData: MergeDesignData;
    label?: string;
  }>(),
  {
    label: "菜单展示模式",
  },
);

const _formData = toRef(props, "formData");
</script>

<template>
  <el-form-item :label="label" :prop="['options', 'mode']">
    <el-select v-model="_formData.options!.mode" placeholder="请选择" clearable>
      <el-option
        v-for="item in MODE_OPTIONS"
        :key="item.value"
        :label="`${item.label} - ${item.value}`"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>
