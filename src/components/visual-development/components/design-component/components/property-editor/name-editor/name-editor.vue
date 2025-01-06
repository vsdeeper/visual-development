<script setup lang="ts">
import { type DesignDataOptions } from '../../../../..'
import { type FormItemRule } from 'element-plus'

const props = withDefaults(
  defineProps<{
    options: DesignDataOptions
    label?: string
    formItemProp?: string[]
    formItemRules?: FormItemRule[]
  }>(),
  {
    label: '名称',
    formItemProp: () => ['options', 'name'],
  },
)

const options = toRef(props, 'options')
</script>

<template>
  <el-form-item :prop="formItemProp" :rules="[{ required: true, message: '必填项' }]">
    <template #label>
      <my-label :label="label" />
    </template>
    <el-input v-model="options.name" placeholder="请输入格式: my-view" clearable></el-input>
  </el-form-item>
</template>
