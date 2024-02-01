<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-13 00:24:02
 * @LastEditTime: 2024-02-01 22:50:36
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description:
-->
<script setup lang="ts">
import { MergeDesignData } from '@/components'
import { DIRECTION_OPTIONS } from './constants'

const props = defineProps<{
  formData: MergeDesignData
}>()

const _formData = toRef(props, 'formData')
</script>

<template>
  <el-form-item
    label="子元素的排列方向"
    :prop="['options', 'direction']"
  >
    <el-radio-group v-model="_formData.options!.direction">
      <el-radio v-for="item in DIRECTION_OPTIONS" :key="item.value" :label="item.value">
        {{ item.label }}
      </el-radio>
    </el-radio-group>
  </el-form-item>
</template>