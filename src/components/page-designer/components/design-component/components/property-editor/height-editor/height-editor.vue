<script setup lang="ts">
import { MergeDesignData } from '@/components'

const props = defineProps<{
  formData: MergeDesignData
}>()

const _formData = toRef(props, 'formData')
</script>

<template>
  <el-form-item
    label="高度"
    prop="height"
  >
    <el-input v-model="_formData.options!.height" clearable></el-input>
  </el-form-item>
</template>