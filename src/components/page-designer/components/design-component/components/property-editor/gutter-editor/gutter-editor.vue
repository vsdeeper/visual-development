<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-01 22:07:17
 * @LastEditTime: 2024-02-01 22:38:04
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 栅格间隔
-->
<script setup lang="ts">
import { MergeDesignData } from '@/components'

const props = withDefaults(defineProps<{
  formData: MergeDesignData
  label?: string
}>(), {
  label: '栅格间隔'
})

const _formData = toRef(props, 'formData')
</script>

<template>
  <el-form-item
    :label="label"
    :prop="['options', 'rowGutter']"
  >
    <el-input-number v-model="_formData.options!.rowGutter" controls-position="right" />
  </el-form-item>
</template>