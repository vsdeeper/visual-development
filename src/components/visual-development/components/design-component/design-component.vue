<script setup lang="ts">
import { ElMessage, type FormInstance } from 'element-plus'
import { type ActiveDesignData } from '../..'
import { DesignComponent, SaveAsPreset, type SaveAsPresetInstance } from './components'
import { forEachHandlerOfComponents, genId, setPresetData } from '../../util'

withDefaults(
  defineProps<{
    title?: string
    fullscreen?: boolean
  }>(),
  {
    title: '设计组件',
  },
)

const formData = defineModel<ActiveDesignData>({ default: () => ({}) })
const formRef = ref<FormInstance>()
const show = ref(false)
const SaveAsPresetRef = ref<SaveAsPresetInstance>()
const presetData = ref<ActiveDesignData>()

function open() {
  show.value = true
}

function toTitle(title: string, formData?: ActiveDesignData) {
  if (formData?.type === 'Project') return '设计项目'
  return title
}

function onSaveAsPreset(data: ActiveDesignData) {
  presetData.value = data
  SaveAsPresetRef.value?.open()
}

async function onConfirm(formData: Record<string, any>) {
  await setPresetData({ presetData: refreshId(presetData.value!), extendData: formData })
  ElMessage({
    type: 'success',
    message: '预设成功',
  })
}

function showSaveAsPresetBtn(data?: ActiveDesignData) {
  return data?.type === 'View'
}

function showCancelBtn(data?: ActiveDesignData) {
  return data?.type === 'View'
}

function refreshId(data: ActiveDesignData) {
  const _data: ActiveDesignData = JSON.parse(JSON.stringify(data))
  forEachHandlerOfComponents(_data.components ?? [], item => {
    item.id = genId(item.type)
  })
  return _data
}

defineExpose({
  open,
})
</script>

<template>
  <el-dialog
    class="adaptive-dialog"
    v-model="show"
    :title="toTitle(title, formData)"
    :fullscreen="fullscreen"
  >
    <div class="design-component">
      <el-form ref="formRef" :model="formData" label-position="top">
        <component
          v-if="formData"
          :is="DesignComponent[formData.type]"
          v-model="formData"
        ></component>
      </el-form>
    </div>
    <template #footer>
      <el-button v-if="showCancelBtn(formData)" @click="show = false">取消</el-button>
      <el-button
        v-if="showSaveAsPresetBtn(formData)"
        type="primary"
        @click="onSaveAsPreset(formData)"
      >
        存为预设
      </el-button>
    </template>
  </el-dialog>
  <SaveAsPreset ref="SaveAsPresetRef" @confirm="onConfirm" />
</template>

<style lang="scss" scoped>
.design-component {
  :deep(.el-input-number) {
    width: 100%;
    .el-input__inner {
      text-align: left;
    }
  }

  :deep(.el-select) {
    flex: 1;
  }
}
</style>
