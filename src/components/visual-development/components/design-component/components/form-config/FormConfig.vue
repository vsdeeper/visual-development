<script setup lang="ts">
import { useGlobal } from '@/stores'
import { Right } from '@element-plus/icons-vue'
import type { TableDesignData } from '../../../vd-components'

const props = defineProps<{
  id?: string
}>()

const model = defineModel<Record<string, any>>({ default: () => ({}) })
const displayLabels = computed(() =>
  model.value.widgetList
    ?.filter((e: Record<string, any>) => !!e.options?.label)
    ?.map((e: Record<string, any>) => e.options?.label)
    .join(', '),
)
const show = ref(false)
const operateFormOptions = computed(() => {
  const { activeDesignData } = useGlobal()
  const tableOperations = (activeDesignData as TableDesignData).options?.tableOperations
  const tableColumnOperations = (activeDesignData as TableDesignData).options?.tableColumnOperations
  const tableOperationsHasForm = tableOperations?.filter(
    e => !e.formConfig?.useOtherOperateForm && !!e.formConfig,
  )
  const tableColumnOperationsHasForm = tableColumnOperations?.filter(
    e => !e.formConfig?.useOtherOperateForm && !!e.formConfig,
  )
  return [...(tableOperationsHasForm ?? []), ...(tableColumnOperationsHasForm ?? [])]
    .filter(e => e.id !== props.id)
    .map(e => ({ label: `${e.label}表单`, value: e.value! }))
})

const onGotoConfig = () => {
  show.value = true
}
</script>

<template>
  <div class="form-config">
    <div class="use-other-operate-form">
      <div class="my-label">使用其他操作表单</div>
      <el-select v-model="model.useOtherOperateForm" placeholder="请选择" clearable filterable>
        <el-option
          v-for="item in operateFormOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="just-config" v-if="!model.useOtherOperateForm">
      {{ displayLabels }}
      <div v-if="!displayLabels" class="nodata">暂未配置</div>
      <el-button type="primary" link @click="onGotoConfig">
        去配置
        <el-icon><Right /></el-icon>
      </el-button>
    </div>
  </div>
  <el-dialog title="表单配置" v-model="show" fullscreen> 发大范德萨范德萨 </el-dialog>
</template>

<style lang="scss">
.el-dialog.is-fullscreen .el-dialog__body {
  height: calc(100vh - 48px - 2 * var(--el-dialog-padding-primary)) !important;
}
</style>
<style lang="scss" scoped>
.form-config {
  display: flex;
  flex: 1;
  flex-direction: column;
  border: 2px dotted var(--el-border-color-dark);
  .use-other-operate-form {
    display: flex;
    flex-direction: column;
    padding: 12px;
    .my-label {
      font-size: var(--el-form-label-font-size);
      color: var(--el-text-color-regular);
    }
  }
  .just-config {
    display: flex;
    flex-direction: row;
  }
}
</style>
