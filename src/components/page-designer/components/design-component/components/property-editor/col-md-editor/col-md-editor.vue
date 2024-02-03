<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-01 22:07:17
 * @LastEditTime: 2024-02-03 15:38:12
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: ≥992px 响应式栅格数
-->
<script setup lang="ts">
import { MergeDesignData } from '@/components'

const props = withDefaults(defineProps<{
  formData: MergeDesignData
  label?: string
}>(), {
  label: '≥992px 响应式栅格数'
})

const _formData = toRef(props, 'formData')
</script>

<template>
  <el-form-item
    :label="label"
    :prop="['options', 'colMd']"
  >
    <el-input-number v-model="_formData.options!.colMd" controls-position="right" :min="1" :max="24" />
  </el-form-item>
</template>