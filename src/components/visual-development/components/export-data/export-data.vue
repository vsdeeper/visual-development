<script setup lang="ts">
import { configSetModuleUrl } from '../../ace-config'

const AceEditor = defineAsyncComponent({
  loader: async () => (await import('vue3-ace-editor')).VAceEditor,
})

const show = ref(false)
const exportData = ref('')
const exportDataRef = ref<InstanceType<typeof AceEditor>>()

function open() {
  configSetModuleUrl()
  show.value = true
}

function onExport() {
  
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog
    title=""
    v-model="show">
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
      />
    <template #footer>
      <el-button @click="show = false">取消</el-button>
      <el-button type="primary" @click="onExport">导出</el-button>
    </template>
  </el-dialog>
  
</template>

<style lang="scss" scoped>
.ace-editor {
  font-size: 12px;
  width: 100%;
  height: 100%;
}
</style>