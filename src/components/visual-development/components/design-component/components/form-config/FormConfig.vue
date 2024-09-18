<script setup lang="ts">
import { Right } from '@element-plus/icons-vue'

const model = defineModel<Record<string, any>>({ default: () => ({}) })
const displayLabels = computed(() =>
  model.value.widgetList
    ?.filter((e: Record<string, any>) => !!e.options?.label)
    ?.map((e: Record<string, any>) => e.options?.label)
    .join(', '),
)
const show = ref(false)

const onGotoConfig = () => {
  show.value = true
}
</script>

<template>
  <div class="form-config">
    {{ displayLabels }}
    <div v-if="!displayLabels" class="nodata">暂未配置</div>
    <el-button type="primary" link @click="onGotoConfig">
      去配置
      <el-icon><Right /></el-icon>
    </el-button>
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
  border: 2px dotted var(--el-border-color-dark);
}
</style>
