<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-13 16:07:06
 * @LastEditTime: 2024-02-11 16:54:46
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 搜索条件项配置
-->
<script setup lang="ts">
import { Plus } from "@element-plus/icons-vue";
import { MergeDesignData } from "@/components";
import { ROW_GUTTER } from "../../constants";
import { SEARCH_TYPE_OPTIONS } from "./constants";

const props = defineProps<{
  formData: MergeDesignData;
}>();

const _formData = toRef(props, "formData");

function add() {
  _formData.value.options?.searchConditionItems?.push({});
}
</script>

<template>
  <el-row :gutter="ROW_GUTTER">
    <template
      v-for="(item, index) in _formData.options?.searchConditionItems"
      :key="index"
    >
      <el-divider content-position="left" border-style="dashed">
        搜索条件 {{ index + 1 }}
      </el-divider>
      <ResponsiveCol>
        <el-form-item
          label="字段名称"
          :prop="['options', 'searchConditionItems', index + '', 'key']"
        >
          <el-input
            v-model="item.key"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
      </ResponsiveCol>
      <ResponsiveCol>
        <el-form-item
          label="搜索类型"
          :prop="['options', 'searchConditionItems', index + '', 'type']"
        >
          <el-select v-model="item.type" placeholder="请选择" clearable>
            <el-option
              v-for="item in SEARCH_TYPE_OPTIONS"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </ResponsiveCol>
    </template>
    <el-col :span="24">
      <el-button
        type="primary"
        plain
        :icon="Plus"
        @click="add"
        style="width: 100%"
      >
        新增
      </el-button>
    </el-col>
  </el-row>
</template>
