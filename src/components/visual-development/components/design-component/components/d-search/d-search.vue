<script setup lang="ts">
import { type MergeDesignData } from '../../../..'
import { ROW_GUTTER } from '../constants'

const formData = defineModel<MergeDesignData>({ default: () => ({ options: {} }) })
</script>

<template>
  <el-row :gutter="ROW_GUTTER">
    <ResponsiveCol>
      <el-form-item prop="id" :rules="[{ required: true, message: '必填项' }]">
        <template #label>
          <my-label label="唯一标识符" />
        </template>
        <el-input v-model="formData.id" readonly></el-input>
      </el-form-item>
    </ResponsiveCol>
    <ResponsiveCol>
      <el-form-item label="标签长度" prop="options.labelWidth">
        <el-input-number
          v-model="formData.options.labelWidth"
          :min="1"
          :max="Number.MAX_SAFE_INTEGER"
          placeholder="请输入"
          :step="1"
          controls-position="right"
        />
      </el-form-item>
    </ResponsiveCol>
    <el-col :span="24">
      <el-form-item label="搜索条件配置" prop="options.searchConditionItems">
        <SearchConditionConfig
          v-model="formData.options.searchConditionItems"
          form-item-prop="options.searchConditionItems"
        />
      </el-form-item>
    </el-col>
  </el-row>
</template>
