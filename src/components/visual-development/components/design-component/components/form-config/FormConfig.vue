<script setup lang="ts">
import { useGlobal } from '@/stores'
import { QuestionFilled, Right } from '@element-plus/icons-vue'
import { VsFormDesigner, type VsFormDesignerInstance } from 'vswift-form'
import type { FormConfig, TableDesignData } from '../../../vd-components'

const props = defineProps<{
  id?: string
}>()

const model = defineModel<FormConfig>({ default: () => ({}) })
const show = ref(false)
const operateFormOptions = computed(() => {
  const { activeDesignData } = useGlobal()
  const tableOperations = (activeDesignData as TableDesignData).options?.tableOperations
  const tableColumnOperations = (activeDesignData as TableDesignData).options?.tableColumnOperations
  const tableOperationsHasForm = tableOperations?.filter(
    e => !e.formConfig?.useOtherForm && e.formConfig?.data,
  )
  const tableColumnOperationsHasForm = tableColumnOperations?.filter(
    e => !e.formConfig?.useOtherForm && e.formConfig?.data,
  )
  return [...(tableOperationsHasForm ?? []), ...(tableColumnOperationsHasForm ?? [])]
    .filter(e => e.id !== props.id)
    .map(e => ({ label: `${e.label}表单`, value: e.value! }))
})
const VsFormDesignerRef = ref<VsFormDesignerInstance>()

const onConfirm = () => {
  const formDesignData = VsFormDesignerRef.value?.getFormDesignData()
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
    <div class="just-config">
      <el-text v-if="model.data?.widgetList.length" :type="model.data?.form.name ? '' : 'info'">
        {{ model.data?.form.name ?? '未命名的表单' }}
      </el-text>
      <el-text v-else type="info">暂未配置</el-text>
      <el-button type="primary" link @click="show = true">
        去配置
        <el-icon><Right /></el-icon>
      </el-button>
    </div>
  </div>
  <el-dialog title="表单配置" v-model="show" fullscreen class="form-config">
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
