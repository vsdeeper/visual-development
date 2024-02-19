<script setup lang="ts">
import { ActiveDesignData } from '@/components'

const props = defineProps<{
  formData: ActiveDesignData
}>()

const _formData = toRef(props, 'formData')
</script>

<template>
  <el-form-item
    label="唯一标识符别名"
    prop="idAlias"
  >
    <el-input v-model="_formData.idAlias"></el-input>
  </el-form-item>
</template>