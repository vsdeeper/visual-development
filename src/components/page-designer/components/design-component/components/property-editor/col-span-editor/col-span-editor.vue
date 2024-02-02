<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-01 22:07:17
 * @LastEditTime: 2024-02-02 13:29:40
 * @LastEditors: Please set LastEditors
 * @Description: 栅格间隔
-->
<script setup lang="ts">
import { MergeDesignData } from '@/components'

const props = withDefaults(defineProps<{
  formData: MergeDesignData
  label?: string
}>(), {
  label: '栅格占据的列数'
})

const _formData = toRef(props, 'formData')
</script>

<template>
  <el-form-item
    :label="label"
    :prop="['options', 'colSpan']"
  >
    <el-input-number v-model="_formData.options!.colSpan" controls-position="right" :min="1" :max="24" />
  </el-form-item>
</template>