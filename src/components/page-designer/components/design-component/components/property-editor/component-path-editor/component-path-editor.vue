<script setup lang="ts">
import { MergeDesignData } from '@/components'

const props = withDefaults(defineProps<{
  formData: MergeDesignData
  label?: string
}>(), {
  label: '组件路径'
})

const _formData = toRef(props, 'formData')
</script>

<template>
  <el-form-item
    :label="label"
    prop="componentPath"
  >
    <el-input v-model="_formData.componentPath" readonly></el-input>
  </el-form-item>
</template>