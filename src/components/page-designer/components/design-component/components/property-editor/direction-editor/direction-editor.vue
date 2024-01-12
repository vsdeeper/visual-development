<script setup lang="ts">
import { MergeDesignData } from '@/components'
import { directionOptions } from './constants'

const props = defineProps<{
  formData: MergeDesignData
}>()

const _formData = toRef(props, 'formData')
</script>

<template>
  <el-form-item
    label="子元素的排列方向"
    prop="direction"
  >
    <el-radio-group v-model="_formData.options!.direction">
      <el-radio v-for="item in directionOptions" :key="item.value" :label="item.value">
        {{ item.label }}
      </el-radio>
    </el-radio-group>
  </el-form-item>
</template>