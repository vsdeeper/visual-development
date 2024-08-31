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
    label: 'children别名',
    formItemProp: () => ['options', 'itemChildren'],
  },
)

const options = toRef(props, 'options')
</script>

<template>
  <el-form-item :prop="formItemProp">
    <template #label>
      <my-label :label="label" tooltip-content="渲染嵌套数据时的子节点 key 别名" />
    </template>
    <el-input v-model="options.itemChildren" placeholder="请输入" clearable></el-input>
  </el-form-item>
</template>
