<script setup lang="ts">
import type { FormInstance } from 'element-plus'

const emit = defineEmits<{
  (e: 'confirm', val: Record<string, any>): void
}>()
const show = ref(false)
const form = ref<Record<string, any>>({})
const formRef = ref<FormInstance>()

async function onConfirm() {
  const valid = await formRef.value?.validate()
  if (!valid) return
  emit('confirm', form.value)
  show.value = false
}

function open() {
  show.value = true
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="show" title="存为预设" width="450px">
    <el-form :model="form" ref="formRef" label-width="60px">
      <el-form-item label="名称" prop="name" :rules="[{ required: true, message: '必填项' }]">
        <el-input v-model="form.name" :maxlength="10" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="desc">
        <el-input v-model="form.desc" type="textarea" autosize></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="show = false">取消</el-button>
      <el-button type="primary" @click="onConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>
