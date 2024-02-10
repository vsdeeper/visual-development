<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-13 16:07:06
 * @LastEditTime: 2024-02-10 21:06:09
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: Tooltip 主题，内置了 dark / light 两种主题
-->
<script setup lang="ts">
import { MergeDesignData } from "@/components";
import { POPPER_EFFECT_OPTIONS } from "./constants";

const props = withDefaults(
  defineProps<{
    formData: MergeDesignData;
    label?: string;
  }>(),
  {
    label: "Tooltip 主题",
  },
);

const _formData = toRef(props, "formData");
</script>

<template>
  <el-form-item :label="label" :prop="['options', 'popperEffect']">
    <el-select
      v-model="_formData.options!.popperEffect"
      placeholder="请选择"
      clearable
    >
      <el-option
        v-for="item in POPPER_EFFECT_OPTIONS"
        :key="item.value"
        :label="`${item.label} - ${item.value}`"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>
