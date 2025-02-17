<script setup lang="ts">
import { activeDesignData } from '@/stores'
import { QuestionFilled, Right } from '@element-plus/icons-vue'
import { VsFormDesigner, type VsFormDesignerInstance } from 'vswift-form'
import type { TableOperationsItemFormConfig, TableDesignData } from '../../../vd-components'

const props = defineProps<{
  id: string
}>()

const show = ref(false)
const model = defineModel<TableOperationsItemFormConfig>({ default: () => ({}) })
const VsFormDesignerRef = ref<VsFormDesignerInstance>()
const tableOperations = computed(
  () => (activeDesignData.value as TableDesignData).options?.tableOperations,
)
const tableColumnOperations = computed(
  () => (activeDesignData.value as TableDesignData).options?.tableColumnOperations,
)
const tableOperationsHasForm = computed(
  () =>
    tableOperations.value?.filter(
      e => !e.enableConfirmation && !e.formConfig?.useOtherForm && e.formConfig?.data,
    ) ?? [],
)
const tableColumnOperationsHasForm = computed(
  () =>
    tableColumnOperations.value?.filter(
      e => !e.enableConfirmation && !e.formConfig?.useOtherForm && e.formConfig?.data,
    ) ?? [],
)
const mergeOperationsHasForm = computed(() => [
  ...tableOperationsHasForm.value,
  ...tableColumnOperationsHasForm.value,
])
const operateFormOptions = computed(() => {
  return mergeOperationsHasForm.value
    .filter(e => e.id !== props.id)
    .map(e => ({
      label: e.label ? `${e.label}表单` : '未命名表单',
      value: e.id,
    }))
})
const label = computed(() => {
  const find = mergeOperationsHasForm.value.find(e => e.id === props.id)
  return find?.label
})

const onFormConfig = async () => {
  show.value = true
  await nextTick()
  VsFormDesignerRef.value?.setModel(JSON.parse(JSON.stringify(model.value.data)))
}

const onConfirm = () => {
  const formDesignData = VsFormDesignerRef.value?.getModel()
  model.value = { ...model.value, data: formDesignData }
  show.value = false
}
</script>

<template>
  <div class="form-config">
    <div class="use-other-operate-form">
      <div class="my-label">
        使用其他表单
        <el-tooltip content="仅限于当前表格的其他操作表单" placement="top" effect="dark">
          <el-icon color="#ffae1f"><QuestionFilled /></el-icon>
        </el-tooltip>
      </div>
      <el-select v-model="model.useOtherForm" placeholder="请选择" clearable filterable>
        <el-option
          v-for="item in operateFormOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div v-if="!model.useOtherForm" class="just-config">
      <el-text v-if="model.data?.widgetList.length" :type="label ? '' : 'info'">
        {{ label ? `${label}表单` : '未命名表单' }}
      </el-text>
      <el-text v-else type="info">暂未配置</el-text>
      <el-button type="primary" link @click="onFormConfig">
        去配置
        <el-icon><Right /></el-icon>
      </el-button>
    </div>
  </div>
  <el-dialog v-model="show" title="表单配置" fullscreen class="form-config">
    <VsFormDesigner ref="VsFormDesignerRef" height="100%" />
    <template #footer>
      <el-button @click="show = false">取消</el-button>
      <el-button type="primary" @click="onConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss">
.el-dialog.form-config.is-fullscreen .el-dialog__body {
  overflow: hidden;
  height: calc(100vh - 2 * 50px - 2 * var(--el-dialog-padding-primary));
}
</style>
<style lang="scss" scoped>
.form-config {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 12px;
  border: 2px dotted var(--el-border-color-dark);
  .use-other-operate-form {
    display: flex;
    flex-direction: column;
    .my-label {
      display: flex;
      align-items: center;
      font-size: var(--el-form-label-font-size);
      color: var(--el-text-color-regular);
      & > .el-icon {
        margin-left: 3px;
      }
    }
  }
  .just-config {
    display: flex;
    flex-direction: row;
    margin-top: 12px;
    & > .el-button {
      margin-left: 5px;
    }
  }
}
</style>
