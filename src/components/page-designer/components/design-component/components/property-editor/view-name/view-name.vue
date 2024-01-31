<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-31 17:35:01
 * @Description:
-->
<script setup lang="ts">
import { MergeDesignData } from '@/components'

const props = defineProps<{
  formData: MergeDesignData
}>()

const _formData = toRef(props, 'formData')
</script>

<template>
  <el-form-item
    label="视图名称"
    prop="viewName"
  >
    <el-input v-model="_formData.viewName"></el-input>
  </el-form-item>
</template>