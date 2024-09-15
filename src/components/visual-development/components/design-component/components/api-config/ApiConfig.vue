<script setup lang="ts">
import { Plus, Minus } from '@element-plus/icons-vue'
import { type FormItemInstance, type FormItemRule } from 'element-plus'
import { METHOD_OPTIONS } from './constants'
import type { ApiConfigModel } from '.'

const props = withDefaults(
  defineProps<{
    apiLabel?: string
    paramsLabel?: string
    formItemProp?: string[]
    formItemRules?: FormItemRule[]
    showMessage?: boolean
    showParams?: boolean
    map?: { api?: string; apiMethod?: string; apiParams?: string }
  }>(),
  {
    apiLabel: '接口',
    paramsLabel: '参数',
    formItemProp: () => ['options'],
    showParams: true,
    map: () => ({}),
  },
)

const { api = 'api', apiMethod = 'apiMethod', apiParams = 'apiParams' } = props.map
const model = defineModel<ApiConfigModel>({ default: () => ({}) })
const formItemRef = ref<FormItemInstance>()

function onAdd() {
  if (!model.value[apiParams]) {
    model.value[apiParams] = []
  }
  model.value[apiParams].push({ key: 'id', value: '123', valueType: 'number' })
}

function remove(index: number) {
  model.value[apiParams].splice(index, 1)
}

function onChange(key: string, data?: any) {
  switch (key) {
    case 'valueType': {
      data.value = undefined
      break
    }
  }
}

defineExpose({
  formItemRef,
})
</script>

<template>
  <div class="api-config-editor">
    <el-form-item
      ref="formItemRef"
      :prop="[...formItemProp, api]"
      :rules="formItemRules"
      :show-message="showMessage"
    >
      <template #label>
        <my-label :label="apiLabel" />
      </template>
      <el-input v-model="model[api]" clearable placeholder="请输入">
        <template #prepend>
          <el-form-item
            :prop="[...formItemProp, apiMethod]"
            :rules="formItemRules"
            :show-message="showMessage"
          >
            <el-select v-model="model[apiMethod]" placeholder="请选择" style="width: 100px">
              <el-option v-for="item in METHOD_OPTIONS" :key="item" :label="item" :value="item" />
            </el-select>
          </el-form-item>
        </template>
      </el-input>
    </el-form-item>
    <div v-if="showParams" class="params-config">
      <my-divider-title
        :label="paramsLabel"
        :suffix-icon="Plus"
        @click-suffix-icon="onAdd"
      ></my-divider-title>
      <el-row v-if="model[apiParams]?.length" class="header" align="middle">
        <div class="label">字段名称</div>
        <div class="label">字段值</div>
      </el-row>
      <el-row v-for="(item, index) in model[apiParams]" :key="'apiParams' + index" align="middle">
        <el-form-item
          :prop="[...formItemProp, apiParams, index + '', 'key']"
          :rules="[{ required: true, message: '必填项' }]"
          :show-message="false"
        >
          <el-input v-model="item.key" placeholder="请输入" />
        </el-form-item>
        <el-form-item
          :prop="[...formItemProp, apiParams, index + '', 'value']"
          :rules="[{ required: true, message: '必填项' }]"
          :show-message="false"
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
        <el-button type="danger" size="small" :icon="Minus" circle @click="remove(index)" />
      </el-row>
      <div v-if="!model[apiParams]?.length" class="nodata">暂未配置</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.api-config-editor {
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
  .el-form-item {
    flex: 1;
    margin-bottom: 0;
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
