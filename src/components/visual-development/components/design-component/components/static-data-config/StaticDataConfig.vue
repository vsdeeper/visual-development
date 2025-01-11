<script setup lang="ts">
import { Minus, Plus } from '@element-plus/icons-vue'
import type { SaticDataConfigItem } from '../../../vd-components'
import { OptionsConfig } from '../options-config'

defineProps<{
  formItemProp: string
}>()

const model = defineModel<SaticDataConfigItem[]>({ default: () => [] })

function onAdd() {
  if (!model.value) model.value = []
  model.value.push({ value: [{}] })
}

function onDelete(idx: number) {
  model.value.splice(idx, 1)
}
</script>

<template>
  <div class="static-data-config">
    <div v-for="(item, index) in model" :key="'item' + index" class="item">
      <el-row :gutter="5">
        <el-col :span="24" :md="7">
          <div class="key-box">
            <el-form-item
              :prop="[...formItemProp, index + '', 'key']"
              :rules="[{ required: true, message: '必填项' }]"
              :show-message="false"
            >
              <template #label>
                <my-label
                  label="静态数据Key"
                  tooltip-content="格式：<大写字段名称>_OPTIONS，如 STATIC_DATA_OPTIONS"
                />
              </template>
              <el-input v-model="item.key" placeholder="例：STATUS_OPTIONS" clearable />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="24" :md="17">
          <OptionsConfig
            v-model="item.value"
            add-button-text="新增选项"
            :form-item-prop="`${formItemProp}.${index}.value`"
          />
        </el-col>
      </el-row>

      <el-button
        type="danger"
        size="small"
        :icon="Minus"
        circle
        @click="onDelete(index)"
        style="margin-left: 8px"
      ></el-button>
    </div>
    <div v-if="!model.length" class="nodata">暂未配置</div>
    <el-button type="primary" :icon="Plus" @click="onAdd">新增静态数据</el-button>
  </div>
</template>

<style lang="scss" scoped>
.static-data-config {
  flex: 1;
  padding: 12px;
  border: 2px dotted var(--el-border-color);
  & > .el-button {
    width: 100%;
    margin-top: 10px;
  }
  .key-box {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    border: 2px dotted var(--el-border-color);
  }
  .item {
    display: flex;
    align-items: center;
    & + .item {
      margin-top: 10px;
    }
  }
  .el-row {
    flex-grow: 1;
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
