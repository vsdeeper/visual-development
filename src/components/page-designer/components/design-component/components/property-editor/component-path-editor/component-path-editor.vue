<script setup lang="ts">
import { MergeDesignData } from '@/components'

const props = defineProps<{
  formData: MergeDesignData
}>()

const _formData = toRef(props, 'formData')
</script>

<template>
  <el-form-item
    label="组件路径"
    prop="componentPath"
  >
    <el-input v-model="_formData.componentPath"></el-input>
  </el-form-item>
</template>