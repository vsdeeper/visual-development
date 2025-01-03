<script setup lang="ts">
import { Minus, Plus } from '@element-plus/icons-vue'
import type { OptionsConfigItem } from '.'

withDefaults(
  defineProps<{
    formItemProp?: string[]
    addButtonText?: string
  }>(),
  {
    formItemProp: () => [],
    addButtonText: '新增',
  },
)

const model = defineModel<OptionsConfigItem[]>({ default: () => [] })

function onDelete(idx: number) {
  model.value.splice(idx, 1)
}

function onAdd() {
  if (!model.value) model.value = []
  model.value.push({})
}

function onChange(key: string, data?: any) {
  switch (key) {
    case 'valueType': {
      data!.value = undefined
      break
    }
  }
}
</script>

<template>
  <div class="options-config">
    <el-row v-if="model.length" class="header" align="middle">
      <div class="label">选项值</div>
      <div class="label">选项名称</div>
    </el-row>
    <el-row v-for="(item, index) in model" :key="'item' + index" align="middle">
      <el-form-item
        :prop="[...formItemProp, index + '', 'value']"
        :rules="[{ required: true, message: '必填项' }]"
        :show-message="false"
        style="width: 200px; margin-right: 5px"
      >
        <el-input v-model="item.value" class="input" placeholder="请输入">
          <template #prepend>
            <el-select
              v-model="item.valueType"
              placeholder="类型"
              style="width: 100px"
              @change="onChange('valueType', item)"
            >
              <el-option label="数字" value="number" />
              <el-option label="字符串" value="string" />
            </el-select>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        :prop="[...formItemProp, index + '', 'label']"
        :rules="[{ required: true, message: '必填项' }]"
        :show-message="false"
        style="flex: 1"
      >
        <el-input v-model="item.label" placeholder="请输入" />
      </el-form-item>
      <el-button
        type="danger"
        size="small"
        :icon="Minus"
        circle
        @click="onDelete(index)"
        style="margin-left: 8px"
      ></el-button>
    </el-row>
    <div v-if="!model.length" class="nodata">暂未配置</div>
    <div class="btns">
      <el-button type="primary" :icon="Plus" @click="onAdd"> {{ addButtonText }} </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.options-config {
  width: 100%;
  padding: 12px;
  border: 2px dotted var(--el-border-color);
  box-sizing: border-box;
  .header {
    .label {
      display: flex;
      align-items: center;
      margin-left: 5px;
      &:first-child {
        width: 200px;
      }
    }
  }
  .el-row + .el-row {
    margin-top: 5px;
  }
  .btns {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .el-button + .el-button {
      margin: 5px 0 0;
    }
  }
  .el-row > .el-form-item {
    margin-bottom: 0 !important;
  }
  :deep(.el-input-number .el-input__inner) {
    text-align: left;
  }
}
</style>
