<script setup lang="ts">
import { type MergeDesignData } from '@/components'
import { ROW_GUTTER } from '../constants'

const formData = defineModel<MergeDesignData>({ default: () => ({ options: {} }) })
</script>

<template>
  <el-row :gutter="ROW_GUTTER">
    <ResponsiveCol>
      <el-form-item label="唯一标识符" prop="id" :rules="[{ required: true, message: '必填项' }]">
        <el-input v-model="formData.id" readonly></el-input>
      </el-form-item>
    </ResponsiveCol>
    <ResponsiveCol>
      <el-form-item prop="options.name" :rules="[{ required: true, message: '必填项' }]">
        <template #label>
          <MyLabel
            label="视图名称"
            tooltip-content="如果有多层，可以使用路径，例：/my-view/sub-view"
          />
        </template>
        <el-input v-model="formData.options.name" placeholder="例：my-view" clearable></el-input>
      </el-form-item>
    </ResponsiveCol>
    <el-col :span="24">
      <el-form-item prop="options.constants">
        <template #label>
          <MyLabel
            label="静态数据配置"
            tooltip-content="当前view的静态数据配置，将在view中生成constants文件"
          />
        </template>
        <StaticDataConfig
          v-model="formData.options.saticDataConfig"
          :form-item-prop="['options', 'saticDataConfig']"
        />
      </el-form-item>
    </el-col>
  </el-row>
</template>
