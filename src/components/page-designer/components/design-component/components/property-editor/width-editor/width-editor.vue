<script setup lang="ts">
import { MergeDesignData } from '@/components'

const props = defineProps<{
  formData: MergeDesignData
}>()

const _formData = toRef(props, 'formData')
</script>

<template>
  <el-form-item
    label="宽度"
    prop="width"
  >
    <el-input v-model="_formData.options!.width" clearable></el-input>
  </el-form-item>
</template>