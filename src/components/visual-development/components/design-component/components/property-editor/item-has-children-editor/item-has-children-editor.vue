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
    label: 'hasChildren别名',
    formItemProp: () => ['options', 'itemHasChildren'],
  },
)

const options = toRef(props, 'options')
</script>

<template>
  <el-form-item :prop="formItemProp">
    <template #label>
      <my-label
        :label="label"
        tooltip-content="渲染嵌套数据时，指定 row 中的 hasChildren 字段来指定哪些行是包含子节点"
      />
    </template>
    <el-input v-model="options.itemHasChildren" placeholder="请输入" clearable></el-input>
  </el-form-item>
</template>
