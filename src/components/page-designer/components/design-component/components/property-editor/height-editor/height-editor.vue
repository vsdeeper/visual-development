<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-13 17:20:15
 * @LastEditTime: 2024-02-01 22:30:15
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 高度设置
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
    label="高度"
    :prop="['options', 'height']"
  >
    <el-input v-model="_formData.options!.height" clearable></el-input>
  </el-form-item>
</template>