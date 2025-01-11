<script setup lang="ts">
import { Minus, Plus } from '@element-plus/icons-vue'
import type { TableOperationsItem } from '../../../vd-components'
import { ROW_GUTTER } from '../constants'
import { nanoid } from 'nanoid'

withDefaults(
  defineProps<{
    formItemProp?: string[]
  }>(),
  {
    formItemProp: () => [],
  },
)

const model = defineModel<TableOperationsItem[]>({ default: () => [] })
const activeName = ref(1)

const onDelete = (index: number) => {
  model.value.splice(index, 1)
}

const onAdd = () => {
  model.value.push({
    id: nanoid(5),
    apiConfig: { params: [] },
    echoApiConfig: { params: [] },
    formConfig: {},
  })
  activeName.value = model.value.length
}
</script>

<template>
  <div class="operations-config">
    <el-collapse v-if="model.length" v-model="activeName" accordion>
      <el-collapse-item v-for="(item, index) in model" :key="'item' + index" :name="index + 1">
        <template #title>
          <div class="header">操作 - {{ item.label }}</div>
          <el-button
            type="danger"
            :icon="Minus"
            circle
            size="small"
            @click.stop="onDelete(index)"
            style="margin-right: 10px"
          />
        </template>
        <el-row :gutter="ROW_GUTTER">
          <ResponsiveCol>
            <el-form-item
              :prop="[...formItemProp, index + '', 'label']"
              :rules="[{ required: true, message: '必填项' }]"
            >
              <template #label>
                <my-label label="操作名称" />
              </template>
              <el-input v-model="item.label" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item
              :prop="[...formItemProp, index + '', 'value']"
              :rules="[{ required: true, message: '必填项' }]"
            >
              <template #label>
                <my-label label="操作Key" tooltip-content="确保操作Key的唯一性" />
              </template>
              <el-input
                v-model="item.value"
                placeholder="例：add, batch_deletion"
                clearable
              ></el-input>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="[...formItemProp, index + '', 'code']">
              <template #label>
                <my-label label="权限标识符" />
              </template>
              <el-input
                v-model="item.code"
                placeholder="例：add, edit, delete"
                clearable
              ></el-input>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="[...formItemProp, index + '', 'type']">
              <template #label>
                <my-label label="操作按钮类型" />
              </template>
              <el-select v-model="item.type" placeholder="请选择" clearable>
                <el-option
                  v-for="item1 in ['primary', 'success', 'warning', 'danger', 'info']"
                  :key="item1"
                  :label="item1"
                  :value="item1"
                />
              </el-select>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="[...formItemProp, index + '', 'readonly']">
              <template #label>
                <my-label
                  label="表单只读"
                  tooltip-content="决定操作表单是否可编辑，如果是只读则无需操作接口配置"
                />
              </template>
              <el-radio-group v-model="item.readonly">
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="[...formItemProp, index + '', 'enableConfirmation']">
              <template #label>
                <my-label
                  label="开启二次确认"
                  tooltip-content="开启二次确认，一般无表单配置，如删除操作"
                />
              </template>
              <el-radio-group v-model="item.enableConfirmation">
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="[...formItemProp, index + '', 'isNeedEchoApi']">
              <template #label>
                <my-label
                  label="配置回显接口"
                  tooltip-content="行操作若无需回显接口，则按照行数据回显"
                />
              </template>
              <el-radio-group v-model="item.isNeedEchoApi">
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </ResponsiveCol>
          <el-col v-if="!item.readonly" :span="24">
            <el-form-item :prop="[...formItemProp, index + '', 'apiConfig']">
              <template #label>
                <MyLabel label="操作接口配置" />
              </template>
              <ApiConfig
                v-model="item.apiConfig"
                :form-item-prop="`${formItemProp}.${index}.apiConfig`"
              />
            </el-form-item>
          </el-col>
          <el-col v-if="!item.enableConfirmation" :span="24">
            <el-form-item :prop="[...formItemProp, index + '', 'formConfig']">
              <template #label>
                <my-label
                  label="表单配置"
                  tooltip-content="操作需要提交表单时配置，和回显接口配置配合使用，例如编辑操作"
                />
              </template>
              <FormConfig v-model="item.formConfig" :id="item.id" />
            </el-form-item>
          </el-col>
          <el-col v-if="item.isNeedEchoApi" :span="24" style="margin-top: 12px">
            <el-form-item :prop="[...formItemProp, index + '', 'echoApiConfig']">
              <template #label>
                <MyLabel label="回显接口配置" />
              </template>
              <ApiConfig
                v-model="item.echoApiConfig"
                :form-item-prop="`${formItemProp}.${index}.echoApiConfig`"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <div v-if="!model.length" class="nodata">暂未配置</div>
    <el-button type="primary" :icon="Plus" @click="onAdd" style="width: 100%; margin-top: 10px">
      新增操作
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.operations-config {
  width: 100%;
  padding: 12px;
  border: 2px dotted var(--el-border-color-dark);
  .header {
    display: flex;
    justify-content: flex-start;
    flex: 1;
  }
}
</style>
