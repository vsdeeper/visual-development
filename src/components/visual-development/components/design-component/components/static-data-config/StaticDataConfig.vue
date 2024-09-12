<script setup lang="ts">
import type { SaticDataConfigItem } from '../../../vd-components'
import { OptionsConfig } from '../options-config'

withDefaults(
  defineProps<{
    formItemProp?: string[]
  }>(),
  {
    formItemProp: () => [],
  },
)

const model = defineModel<SaticDataConfigItem[]>({ default: () => [] })
</script>

<template>
  <div class="static-data-config">
    <el-row v-for="(item, index) in model" :key="'item' + index" :gutter="20">
      <el-col :span="24" :md="6">
        <el-form-item
          label="静态数据Key"
          :prop="[...formItemProp, index + '', 'key']"
          :rules="[{ required: true, message: '必填项' }]"
          :show-message="false"
        >
          <el-input v-model="item.key" placeholder="例：STATIC_DATA_KEY" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="24" :md="18">
        <OptionsConfig
          v-model="item.value"
          :form-item-prop="[...formItemProp, index + '', 'value']"
        />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.static-data-config {
  flex: 1;
  padding: 12px;
  border: 2px dotted var(--el-border-color);
  .el-row {
    .el-col {
      &:first-child {
        display: flex;
        align-items: center;
      }
      .el-form-item {
        width: 100%;
      }
      .el-input {
        width: 100%;
      }
    }
  }
}
</style>
