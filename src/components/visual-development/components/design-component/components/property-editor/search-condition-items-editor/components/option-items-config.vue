<script setup lang="ts">
import { type SearchConditionOptionItem } from '@/components'
import { Minus, Plus, Refresh } from '@element-plus/icons-vue'

defineProps<{
  index: number
}>()

const model = defineModel<SearchConditionOptionItem[]>({ default: () => [] })
const valueType = defineModel<'string' | 'number'>('valueType', { default: 'number' })

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

function onChange(key: string) {
  switch (key) {
    case 'valueType': {
      model.value.forEach((e) => (e.value = undefined))
      break
    }
  }
}
</script>

<template>
  <div class="option-items-config">
    <el-row class="header" align="middle">
      <div class="label" style="width: 100px">
        选项值
        <el-switch
          v-model="valueType"
          size="small"
          inline-prompt
          active-value="number"
          inactive-value="string"
          active-text="数字"
          inactive-text="字符串"
          @change="onChange('valueType')"
        />
      </div>
      <div class="label">选项名称</div>
    </el-row>
    <el-row v-for="(item, subIndex) in model" :key="item.value" align="middle">
      <el-form-item
        :prop="['options', 'searchConditionItems', index + '', 'options', subIndex + '', 'value']"
        :rules="[{ required: true, message: '必填项' }]"
        :show-message="false"
        style="width: 100px; margin-right: 5px"
      >
        <el-input
          v-if="valueType === 'string'"
          v-model="item.value"
          class="input"
          placeholder="请输入"
        />
        <el-input-number v-else v-model="item.value" :controls="false" />
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
        @click="_delete(index)"
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
}
</style>
