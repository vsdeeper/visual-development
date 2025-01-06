<script setup lang="ts">
import { Plus, Minus, QuestionFilled } from '@element-plus/icons-vue'
import { METHOD_OPTIONS, VALUE_TYPE_OPTIONS } from './constants'
import type { ApiConfigModel } from '.'

withDefaults(
  defineProps<{
    formItemProp?: string[]
  }>(),
  {
    formItemProp: () => ['options'],
  },
)

const model = defineModel<ApiConfigModel>({
  default: () => ({
    params: [],
  }),
})

function onAdd() {
  if (!model.value.params) {
    model.value.params = []
  }
  model.value.params.push({ key: 'id', valueType: 'auto' })
}

function remove(index: number) {
  model.value.params?.splice(index, 1)
}

function onChange(key: string, data?: any) {
  switch (key) {
    case 'valueType': {
      data.value = undefined
      break
    }
  }
}
</script>

<template>
  <div class="api-config">
    <el-form-item :prop="[...formItemProp, 'name']">
      <template #label>
        <my-label label="封装名称">
          <template #tooltip-content> 查询接口请加上query前缀，例如：queryTableData </template>
        </my-label>
      </template>
      <el-input v-model="model.name" clearable placeholder="请输入" />
    </el-form-item>
    <el-form-item :prop="[...formItemProp, 'url']" label="接口地址">
      <el-input v-model="model.url" clearable placeholder="请输入">
        <template #prepend>
          <el-select v-model="model.method" placeholder="类型" style="width: 100px">
            <el-option v-for="item in METHOD_OPTIONS" :key="item" :label="item" :value="item" />
          </el-select>
        </template>
      </el-input>
    </el-form-item>
    <div class="params-config">
      <my-divider-title
        label="参数"
        :suffix-icon="Plus"
        @click-suffix-icon="onAdd"
      ></my-divider-title>
      <el-row v-if="model.params?.length" class="header" align="middle">
        <div class="label">字段名称</div>
        <div class="label">
          字段值
          <el-tooltip placement="top">
            <template #content>
              表格操作中的自动获取代表批量操作时的自动获取多行数据的某个key的值；<br />
              表列操作中的自动获取代表单行操作时自动获取当前行的key的值，key默认取字段名称配置，配置无效；<br />
              以上其他场景下的自动获取配置无效；
            </template>
            <el-icon color="#ffae1f" style="margin-left: 3px"><QuestionFilled /></el-icon>
          </el-tooltip>
        </div>
      </el-row>
      <el-row v-for="(item, index) in model.params" :key="'params' + index" align="middle">
        <el-form-item :prop="[...formItemProp, 'params', index + '', 'key']">
          <el-input v-model="item.key" placeholder="请输入" />
        </el-form-item>
        <el-form-item :prop="[...formItemProp, 'params', index + '', 'value']">
          <el-input
            v-model="item.value"
            class="input"
            :placeholder="item.valueType === 'auto' ? '自动获取参数值的Key' : '请输入'"
          >
            <template #prepend>
              <el-select
                v-model="item.valueType"
                placeholder="类型"
                style="width: 100px"
                @change="onChange('valueType', item)"
              >
                <el-option
                  v-for="item in VALUE_TYPE_OPTIONS"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </el-input>
        </el-form-item>
        <el-button type="danger" size="small" :icon="Minus" circle @click="remove(index)" />
      </el-row>
      <div v-if="!model.params?.length" class="nodata">暂未配置</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.api-config {
  flex: 1;
  padding: 12px;
  border: 2px dotted var(--el-border-color-dark);
}
.params-config {
  margin-bottom: 18px;
  .header {
    margin-bottom: 5px;
    .label {
      display: flex;
      align-items: center;
      margin-left: 5px;
      &:first-child {
        width: calc(50% - 15px);
      }
    }
  }
  .el-row + .el-row {
    margin-top: 5px;
  }
  .el-row > .el-form-item {
    margin-bottom: 0 !important;
  }
  .el-form-item {
    flex: 1;
    & + .el-form-item {
      margin: 0 0 0 5px;
    }
  }
  .el-button {
    margin-left: 5px;
  }
  :deep(.el-input-number .el-input__inner) {
    text-align: left;
  }
}
</style>
