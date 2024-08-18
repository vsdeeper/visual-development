<script setup lang="ts">
import { type MergeDesignData } from '@/components'
import { ROW_GUTTER } from '../constants'
import { ApiDomain } from './components'

const props = defineProps<{
  formData: MergeDesignData
}>()

const _formData = toRef(() => handleAbnormalData(props.formData))

function handleAbnormalData(data: MergeDesignData) {
  if (!data.options.apiDomain) {
    data.options.apiDomain = {}
  }
  return data
}
</script>

<template>
  <el-row :gutter="ROW_GUTTER">
    <el-col :span="24">
      <el-form-item
        label="项目名称"
        prop="options.name"
        :rules="[{ required: true, message: '必填项' }]"
      >
        <el-input
          v-model="_formData.options.name"
          placeholder="例：vswift-admin"
          clearable
        ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item prop="options.downloadDir" :rules="[{ required: true, message: '必填项' }]">
        <template #label>
          <MyLabel label="数据导出目录" tooltip-content="和浏览器下载位置保持一致" />
        </template>
        <el-input
          v-model="_formData.options.downloadDir"
          placeholder="例：/Users/como/Downloads"
          clearable
        ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item label="git地址" prop="options.gitUrl">
        <el-input
          v-model="_formData.options.gitUrl"
          placeholder="例：https://github.com/vsdeeper/visual-development.git"
          clearable
        ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item prop="options.apiDomain">
        <template #label>
          <MyLabel label="api域名" tooltip-content="不配置则表示与页面域名一致" />
        </template>
        <ApiDomain v-model="_formData.options.apiDomain" />
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item prop="options.basePath">
        <template #label>
          <MyLabel label="api基础路径" tooltip-content="将拼接在api域名后面" />
        </template>
        <el-input
          v-model="_formData.options.basePath"
          placeholder="例：/api/v1"
          clearable
        ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item label="项目描述" prop="options.description">
        <el-input
          v-model="_formData.options.description"
          type="textarea"
          autosize
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
    </el-col>
  </el-row>
</template>
