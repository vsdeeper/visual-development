<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-13 16:07:06
 * @LastEditTime: 2024-02-01 22:28:43
 * @LastEditors: vsdeeper vsdeeper@qq.com
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
    label="宽度"
    :prop="['options', 'width']"
  >
    <el-input v-model="_formData.options!.width" clearable></el-input>
  </el-form-item>
</template>