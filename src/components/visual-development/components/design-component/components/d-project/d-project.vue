<script setup lang="ts">
import { type MergeDesignData } from '../../../..'
import { ROW_GUTTER } from '../constants'
import { ApiDomain } from './components'
import { TopRight } from '@element-plus/icons-vue'

const formData = defineModel<MergeDesignData>({ default: () => ({ options: {} }) })

function onGoto(key: string) {
  switch (key) {
    case 'npmrc':
      window.open('https://docs.npmjs.com/cli/v8/configuring-npm/npmrc', '_blank')
      break
  }
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
          v-model="formData.options.name"
          placeholder="例：vswift-admin"
          clearable
        ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item label="git地址" prop="options.gitUrl">
        <el-input
          v-model="formData.options.gitUrl"
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
        <ApiDomain v-model="formData.options.apiDomain" />
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item prop="options.apiBasePath">
        <template #label>
          <MyLabel label="api基础路径" tooltip-content="将拼接在api域名后面" />
        </template>
        <el-input
          v-model="formData.options.apiBasePath"
          placeholder="例：/api"
          clearable
        ></el-input>
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item prop="options.npmrc">
        <template #label>
          <MyLabel
            label=".npmrc配置"
            tooltip-content="查看配置说明"
            :tooltip-icon="TopRight"
            tooltip-icon-color="#409eff"
            tooltip-icon-link
            @click-tooltip-icon="onGoto('npmrc')"
          />
        </template>
        <el-input
          v-model="formData.options.npmrc"
          type="textarea"
          autosize
          placeholder="请输入"
        ></el-input>
      </el-form-item>
    </el-col>
    <!-- <el-col :span="24">
      <el-form-item prop="options.commonField">
        <template #label>
          <MyLabel label="通用字段" tooltip-content="和服务端交互的字段名称" />
        </template>
        <CommonField v-model="formData.options.commonField" />
      </el-form-item>
    </el-col> -->
    <!-- <el-col :span="24">
      <el-form-item prop="options.globalApiConfig">
        <template #label>
          <MyLabel label="全局接口配置" />
        </template>
        <GlobalApiConfig v-model="formData.options.globalApiConfig" />
      </el-form-item>
    </el-col> -->
    <el-col :span="24">
      <el-form-item label="项目描述" prop="options.description">
        <el-input
          v-model="formData.options.description"
          type="textarea"
          autosize
          placeholder="请输入"
          clearable
        ></el-input>
      </el-form-item>
    </el-col>
  </el-row>
</template>
