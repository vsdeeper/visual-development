<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-01 22:07:17
 * @LastEditTime: 2024-02-07 12:56:56
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 内联模式
-->
<script setup lang="ts">
import { MergeDesignData } from '@/components'

const props = withDefaults(defineProps<{
  formData: MergeDesignData
  label?: string
}>(), {
  label: '内联模式'
})

const _formData = toRef(props, 'formData')
</script>

<template>
  <el-form-item
    :label="label"
    :prop="['options', 'inline']"
  >
    <el-switch v-model="_formData.options!.inline" inline-prompt active-text="是" inactive-text="否" />
  </el-form-item>
</template>