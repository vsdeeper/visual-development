<script setup lang="ts">
import { type SearchConditionOptionItem } from '@/components'
import { Minus, Plus, Refresh } from '@element-plus/icons-vue'

defineProps<{
  index: number
}>()

const model = defineModel<SearchConditionOptionItem[]>({ default: () => [] })

function _delete(idx: number) {
  model.value.splice(idx, 1)
}

function add() {
  if (!model.value) model.value = []
  model.value.push({})
}

function reset() {
  model.value = [{}]
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
  <div class="option-items-config">
    <el-row v-if="model.length" class="header" align="middle">
      <div class="label">选项值</div>
      <div class="label">选项名称</div>
    </el-row>
    <el-row v-for="(item, subIndex) in model" :key="item.value" align="middle">
      <el-form-item
        :prop="['options', 'searchConditionItems', index + '', 'options', subIndex + '', 'value']"
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
        :prop="['options', 'searchConditionItems', index + '', 'options', subIndex + '', 'label']"
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
        @click="_delete(subIndex)"
        style="margin-left: 8px"
      ></el-button>
    </el-row>
    <div class="btns">
      <el-button type="primary" :icon="Plus" @click="add"> 新增选项 </el-button>
      <el-button type="primary" :icon="Refresh" @click="reset"> 重设选择项 </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.option-items-config {
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
  .el-form-item {
    margin-bottom: 0;
  }
  :deep(.el-input-number .el-input__inner) {
    text-align: left;
  }
}
</style>
