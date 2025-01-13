<script setup lang="ts">
import { type FormInstance } from 'element-plus'
import { type ActiveDesignData } from '../..'
import { DesignComponent } from './components'

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

function open() {
  show.value = true
}

function toTitle(title: string, formData?: ActiveDesignData) {
  if (formData?.type === 'Project') return '设计项目'
  return title
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
  </el-dialog>
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
  :deep(.el-form-item .el-form-item) {
    margin-bottom: 18px;
  }
}
</style>
