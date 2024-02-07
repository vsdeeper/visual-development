<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-07 13:35:21
 * @LastEditTime: 2024-02-07 14:19:24
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: logo设计组件
-->
<script setup lang="ts">
import { MergeDesignData } from "@/components";
import {
  ColorEditor,
  ComponentPathEditor,
  FontSizeEditor,
  HeightEditor,
  IdEditor,
  NameEditor,
  SuffixIconEditor,
} from "../property-editor";
import { ROW_GUTTER } from "../constants";

defineProps<{
  formData: MergeDesignData;
}>();
</script>

<template>
  <el-row :gutter="ROW_GUTTER">
    <ResponsiveCol>
      <IdEditor :form-data="formData"></IdEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <ComponentPathEditor :form-data="formData"></ComponentPathEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <NameEditor :form-data="formData"></NameEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <ColorEditor :form-data="formData"></ColorEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <HeightEditor :form-data="formData"></HeightEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <FontSizeEditor :form-data="formData"></FontSizeEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <SuffixIconEditor :form-data="formData"></SuffixIconEditor>
    </ResponsiveCol>
  </el-row>
</template>
