<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-13 16:07:06
 * @LastEditTime: 2024-02-07 14:12:20
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 后缀图标
-->
<script setup lang="ts">
import * as Icons from "@element-plus/icons-vue";
import { MergeDesignData } from "@/components";

const props = defineProps<{
  formData: MergeDesignData;
}>();

console.log(1111, Icons);

const _formData = toRef(props, "formData");
</script>

<template>
  <el-form-item label="后缀图标" :prop="['options', 'suffixIcon']">
    <el-select
      v-model="_formData.options!.suffixIcon"
      placeholder="请选择"
      clearable
      filterable
    >
      <el-option
        v-for="item in Icons"
        :key="item.name"
        :label="item.name"
        :value="item.name"
      >
        <el-icon
          ><component
            :is="(Icons as Record<string, any>)[item.name]"
          ></component
        ></el-icon>
        <span>{{ item.name }}</span>
      </el-option>
    </el-select>
  </el-form-item>
</template>

<style lang="scss" scoped>
.el-icon {
  margin-right: 10px;
}
</style>
