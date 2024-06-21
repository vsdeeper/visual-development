<script setup lang="ts">
import { useGlobal } from '@/stores'
import { configSetModuleUrl } from '../../ace-config'

const AceEditor = defineAsyncComponent({
  loader: async () => (await import('vue3-ace-editor')).VAceEditor
})

const show = ref(false)
const exportData = ref('')
const exportDataRef = ref<InstanceType<typeof AceEditor>>()

function open() {
  show.value = true
  configSetModuleUrl()
  const { designData } = useGlobal()
  exportData.value = JSON.stringify(designData, null, '\t')
}

function onCopy() {}

function onExport() {
  console.log('onExport')
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog v-model="show" modal-class="export-data-overlay" title="导出数据">
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
        enableLiveAutocompletion: true
      }"
    />
    <template #footer>
      <el-button @click="show = false">取消</el-button>
      <el-button type="primary" @click="onCopy">复制</el-button>
      <el-button type="primary" @click="onExport">导出</el-button>
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
