<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-01 22:07:17
 * @LastEditTime: 2024-02-01 23:01:56
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 垂直排列方式
-->
<script setup lang="ts">
import { MergeDesignData } from '@/components'
import { ALIGN_OPTIONS } from './constants'

const props = withDefaults(defineProps<{
  formData: MergeDesignData
  label?: string
}>(), {
  label: '垂直排列方式'
})

const _formData = toRef(props, 'formData')
</script>

<template>
  <el-form-item
    :label="label"
    :prop="['options', 'rowAlign']"
  >
    <el-select v-model="_formData.options!.rowAlign" clearable placeholder="请选择">
      <el-option
        v-for="item in ALIGN_OPTIONS"
        :key="item.value"
        :label="`${item.label} - ${item.value}`"
        :value="item.value">
      </el-option>
    </el-select>
  </el-form-item>
</template>