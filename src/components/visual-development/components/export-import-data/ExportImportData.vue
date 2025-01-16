<script setup lang="ts">
import { configSetModuleUrl } from '../../ace-config'
import { ElMessage, type FormInstance } from 'element-plus'
import { saveAs } from 'file-saver'
import type { VAceEditorInstance } from 'vue3-ace-editor/types'
import type { ProjectDesignData, ViewDesignData } from '../..'

const emit = defineEmits<{
  (event: 'import', val: string): void
}>()

const AceEditor = defineAsyncComponent({
  loader: async () => (await import('vue3-ace-editor')).VAceEditor,
})

const show = ref(false)
const showExportDialog = ref(false)
const form = ref<Record<string, any>>({})
const formRef = ref<FormInstance>()
const model = ref('')
const exportImportDataRef = ref<VAceEditorInstance>()

function open(data: ProjectDesignData | ViewDesignData) {
  show.value = true
  configSetModuleUrl()
  model.value = JSON.stringify(data, null, '  ')
  const name = (data.options.name ?? 'unknown').replace(/\//g, '_')
  form.value.fileName = `${name}.json`
}

function onCopy() {
  try {
    const val = exportImportDataRef.value?.value
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

function onImport() {
  emit('import', model.value)
  show.value = false
}

async function onConfirmExport() {
  try {
    const valid = await formRef.value?.validate()
    if (!valid) return
    const fileBlob = new Blob([model.value], { type: 'text/plain;charset=utf-8' })
    saveAs(fileBlob, form.value.fileName)
    showExportDialog.value = false
  } catch (error) {
    console.error(error)
  }
}

defineExpose({
  open,
  show,
})
</script>

<template>
  <el-dialog
    class="adaptive-dialog"
    v-model="show"
    modal-class="export-data-overlay"
    title="导出/导入数据"
  >
    <AceEditor
      ref="exportImportDataRef"
      v-model:value="model"
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
      <el-button type="primary" @click="onImport">导入</el-button>
    </template>
  </el-dialog>
  <el-dialog class="adaptive-dialog-1" title="导出文件" v-model="showExportDialog">
    <el-form :model="form" ref="formRef" label-width="90px">
      <el-form-item
        prop="fileName"
        :rules="[
          { required: true, message: '必填项' },
          { pattern: /^(?!.*\/).+$/, message: '格式不正确' },
        ]"
      >
        <template #label>
          <MyLabel label="文件名" tooltip-content="文件名不能包含 ' / ' 斜杠" />
        </template>
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
