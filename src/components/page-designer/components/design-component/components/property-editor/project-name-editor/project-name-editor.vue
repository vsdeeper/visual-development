<script setup lang="ts">
import { MergeDesignData } from '@/components'

const props = defineProps<{
  formData: MergeDesignData
}>()

const _formData = toRef(props, 'formData')

function change(val: string) {
  // TODO 自动设置子组件路径
  // forEachHandlerOfComponents(_formData.value.options?.components ?? [], item => {
  //   if (val) item.componentPath = `${val}/`
  // })
}
</script>

<template>
  <el-form-item
    label="关联项目名称"
    prop="projectName"
    :rules="[
      { required: true, message: '必填项' }
    ]"
  >
    <el-input v-model="_formData.projectName" clearable @change="change"></el-input>
  </el-form-item>
</template>