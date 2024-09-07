<script setup lang="ts">
import { configSetModuleUrl } from '../../ace-config'
import { ElMessage, type FormInstance } from 'element-plus'
import { saveAs } from 'file-saver'
import type { VAceEditorInstance } from 'vue3-ace-editor/types'
import type { ProjectDesignData, ViewDesignData } from '../..'

const emit = defineEmits<{
  (e: 'change', val: ProjectDesignData | ViewDesignData): void
}>()

const AceEditor = defineAsyncComponent({
  loader: async () => (await import('vue3-ace-editor')).VAceEditor,
})

const show = ref(false)
const showExportDialog = ref(false)
const form = ref<Record<string, any>>({})
const formRef = ref<FormInstance>()
const exportData = ref('')
const exportDataRef = ref<VAceEditorInstance>()

watch(exportData, val => {
  emit('change', JSON.parse(val))
})

function open(data: ProjectDesignData | ViewDesignData) {
  show.value = true
  configSetModuleUrl()
  exportData.value = JSON.stringify(data, null, '  ')
  form.value.fileName = `${data.options.name ?? 'unknown'}.config.json`
}

function onCopy() {
  try {
    const val = exportDataRef.value?.value
    navigator.clipboard.writeText(val ?? '')
    ElMessage.success('复制成功')
    show.value = false
  } catch (error) {
    console.log(error)
  }
}

function onExport() {
  showExportDialog.value = true
}

async function onConfirmExport() {
  try {
    const valid = await formRef.value?.validate()
    if (!valid) return
    const fileBlob = new Blob([exportData.value], { type: 'text/plain;charset=utf-8' })
    saveAs(fileBlob, form.value.fileName)
    showExportDialog.value = false
  } catch (error) {
    console.error(error)
  }
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog
    class="adaptive-dialog"
    v-model="show"
    modal-class="export-data-overlay"
    title="导出数据"
  >
    <AceEditor
      ref="exportDataRef"
      v-model:value="exportData"
      class="ace-editor"
      lang="json"
      theme="chrome"
      :options="{
        useWorker: true,
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
      }"
      :print-margin="false"
    />
    <template #footer>
      <el-button @click="show = false">取消</el-button>
      <el-button type="primary" @click="onCopy">复制</el-button>
      <el-button type="primary" @click="onExport">导出</el-button>
    </template>
  </el-dialog>
  <el-dialog class="adaptive-dialog-1" title="导出文件" v-model="showExportDialog">
    <el-form :model="form" ref="formRef" label-width="70px">
      <el-form-item label="文件名" prop="fileName" :rules="[{ required: true, message: '必填项' }]">
        <el-input v-model="form.fileName" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="showExportDialog = false">取消</el-button>
      <el-button type="primary" @click="onConfirmExport">确定</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.el-overlay.export-data-overlay {
  overflow: hidden;
  .el-overlay-dialog {
    overflow: hidden;
    .el-dialog {
      margin-top: 30px;
      .el-dialog__body {
        height: calc(100vh - 180px);
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.ace-editor {
  font-size: 12px;
  width: 100%;
  height: 100%;
}
</style>
