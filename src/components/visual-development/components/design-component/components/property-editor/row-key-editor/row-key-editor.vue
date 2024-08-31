<script setup lang="ts">
import { type DesignDataOptions } from '@/components'
import { type FormItemRule } from 'element-plus'

const props = withDefaults(
  defineProps<{
    options: DesignDataOptions
    label?: string
    formItemProp?: string[]
    formItemRules?: FormItemRule[]
  }>(),
  {
    label: '行数据Key',
    formItemProp: () => ['options', 'rowKey'],
  },
)

const options = toRef(props, 'options')
</script>

<template>
  <el-form-item :prop="formItemProp">
    <template #label>
      <my-label
        :label="label"
        tooltip-content="用来优化 Table 的渲染，显示树形数据时，该属性是必填的"
      />
    </template>
    <el-input v-model="options.rowKey" placeholder="请输入" clearable></el-input>
  </el-form-item>
</template>
