<script setup lang="ts">
import { type MergeDesignData } from '@/components'
import { ROW_GUTTER } from '../constants'

const formData = defineModel<MergeDesignData>({ default: () => ({ options: {} }) })
</script>

<template>
  <el-row :gutter="ROW_GUTTER">
    <ResponsiveCol>
      <IdEditor :form-data="formData"></IdEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <el-form-item label="标签长度" prop="options.labelWidth">
        <el-input v-model="formData.options.labelWidth" placeholder="请输入" clearable>
          <template #append>px</template>
        </el-input>
      </el-form-item>
    </ResponsiveCol>
    <el-col :span="24">
      <SearchConditionConfig v-model="formData.options"></SearchConditionConfig>
    </el-col>
  </el-row>
</template>
