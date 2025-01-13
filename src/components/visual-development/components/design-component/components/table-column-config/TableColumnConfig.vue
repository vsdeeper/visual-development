<script setup lang="ts">
import { Minus, Plus } from '@element-plus/icons-vue'
import { type TableColumnItem, type ViewDesignData } from '../../../../..'
import { ROW_GUTTER } from '../constants'
import { FIXED_OPTIONS, FORMATTER_OPTIONS } from './constants'
import { nanoid } from 'nanoid'
import { first, last } from 'radash'
import { findViewComponent } from '@/components/visual-development/util'
import { activeDesignData, designData } from '@/stores'

defineProps<{
  root: boolean
  formItemProp?: string[]
  label?: string
}>()

const model = defineModel<TableColumnItem[]>({ default: () => [] })
const activeName = ref(first(model.value)?.id)
const staticDataConfig = computed(() => {
  const find: ViewDesignData | undefined = findViewComponent(
    activeDesignData.value!,
    designData.value,
  )
  return find?.options.saticDataConfig ?? []
})

function addItem() {
  model.value?.push({ id: nanoid(5), apiConfig: { params: [] } })
  activeName.value = last(model.value)?.id
}

function addSubItem(item: TableColumnItem) {
  if (!item.tableColumnItems) item.tableColumnItems = []
  item.tableColumnItems.push({ id: nanoid(5) })
}

function deleteItem(index: number) {
  model.value.splice(index, 1)
  if (!model.value.length) return
  if (model.value[index]) {
    activeName.value = model.value[index].id
  } else {
    activeName.value = model.value[index - 1].id
  }
}

function onChange(key: string, val: any, item: TableColumnItem) {
  switch (key) {
    case 'formatterType': {
      if (val === 'dynamic_data_transform') {
        item.apiConfig = { params: [] }
        item.itemLabel = 'label'
        item.itemValue = 'id'
        item.options = undefined
      } else if (val === 'static_data_transform') {
        item.apiConfig = undefined
        item.itemLabel = undefined
        item.itemValue = undefined
        item.options = [{}]
      } else if (val === 'date_format') {
        item.format = 'yyyy-MM-dd HH:mm:ss'
      }
      break
    }
    case 'isTreeData': {
      item.itemChildren = 'children'
      break
    }
  }
}

function getFormItemProp(index: number, formItemProp?: string[]) {
  return Array.isArray(formItemProp) ? [...formItemProp, index + ''] : [index + '']
}

function getLabel(label?: string, propLabel?: string) {
  return propLabel ? `${propLabel} / ${label ?? ''}` : `${label ?? ''}`
}
</script>

<template>
  <div class="table-column-config">
    <el-collapse v-if="model.length" v-model="activeName" accordion>
      <el-collapse-item v-for="(item, index) in model" :key="item.id" :name="item.id">
        <template #title>
          <div class="header">表列 - {{ getLabel(item.label, label) }}</div>
          <el-button
            type="danger"
            :icon="Minus"
            circle
            size="small"
            @click.stop="deleteItem(index)"
          >
          </el-button>
          <el-button
            type="primary"
            :icon="Plus"
            circle
            size="small"
            style="margin-right: 10px"
            @click.stop="addSubItem(item)"
          >
          </el-button>
        </template>
        <el-row :gutter="ROW_GUTTER">
          <ResponsiveCol>
            <el-form-item
              :prop="[...getFormItemProp(index, formItemProp), 'label']"
              :rules="[{ required: true, message: '必填项' }]"
            >
              <template #label>
                <my-label label="列名称" />
              </template>
              <el-input v-model="item.label" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item
              :prop="[...getFormItemProp(index, formItemProp), 'prop']"
              :rules="[{ required: true, message: '必填项' }]"
            >
              <template #label>
                <my-label label="字段名称" />
              </template>
              <el-input v-model="item.prop" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="[...getFormItemProp(index, formItemProp), 'width']">
              <template #label>
                <my-label label="列宽度" />
              </template>
              <el-input-number
                v-model="item.width"
                placeholder="请输入"
                :min="50"
                :max="999"
                :step="1"
                :controls="true"
                controls-position="right"
              />
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="[...getFormItemProp(index, formItemProp), 'minWidth']">
              <template #label>
                <my-label
                  label="列最小宽度"
                  tooltip-content="该设置会把剩余宽度按比例分配给设置了该属性的列"
                />
              </template>
              <el-input-number
                v-model="item.minWidth"
                placeholder="请输入"
                :min="50"
                :max="999"
                :step="1"
                :controls="true"
                controls-position="right"
              />
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="[...getFormItemProp(index, formItemProp), 'fixed']">
              <template #label>
                <my-label label="固定列" />
              </template>
              <el-select v-model="item.fixed" placeholder="请选择" clearable>
                <el-option
                  v-for="item1 in FIXED_OPTIONS"
                  :key="item1.value"
                  :label="`${item1.value}-${item1.label}`"
                  :value="item1.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="[...getFormItemProp(index, formItemProp), 'formatterType']">
              <template #label>
                <my-label
                  label="数据回显类型"
                  tooltip-content="数据回显时的转换规则或格式化类型，不选时直接回显该字段数据"
                />
              </template>
              <el-select
                v-model="item.formatterType"
                placeholder="请选择"
                clearable
                @change="onChange('formatterType', $event, item)"
              >
                <el-option
                  v-for="item1 in FORMATTER_OPTIONS"
                  :key="item1.value"
                  :label="item1.label"
                  :value="item1.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol v-if="item.formatterType === 'static_data_transform'">
            <el-form-item
              :prop="[...getFormItemProp(index, formItemProp), 'staticDataKey']"
              :rules="[{ required: true, message: '必填项' }]"
            >
              <template #label>
                <my-label label="静态数据Key" tooltip-content="关联当前view的静态数据Key配置" />
              </template>
              <el-select v-model="item.staticDataKey" placeholder="请选择" clearable filterable>
                <el-option
                  v-for="item in staticDataConfig"
                  :key="item.key"
                  :label="item.key"
                  :value="item.key!"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol v-if="item.formatterType === 'dynamic_data_transform'">
            <el-form-item :prop="[...getFormItemProp(index, formItemProp), 'itemLabel']">
              <template #label>
                <my-label label="选项名称Key" />
              </template>
              <el-input v-model="item.itemLabel" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol v-if="item.formatterType === 'dynamic_data_transform'">
            <el-form-item :prop="[...getFormItemProp(index, formItemProp), 'itemValue']">
              <template #label>
                <my-label label="选项值Key" />
              </template>
              <el-input v-model="item.itemValue" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol v-if="item.formatterType === 'dynamic_data_transform' && item.isTreeData">
            <el-form-item :prop="[...getFormItemProp(index, formItemProp), 'itemChildren']">
              <template #label>
                <my-label label="子选项Key" />
              </template>
              <el-input v-model="item.itemChildren" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="[...getFormItemProp(index, formItemProp), 'showOverflowTooltip']">
              <template #label>
                <my-label label="内容超长开启Tooltip" />
              </template>
              <el-radio-group v-model="item.showOverflowTooltip">
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="[...getFormItemProp(index, formItemProp), 'sortable']">
              <template #label>
                <my-label label="开启排序" />
              </template>
              <el-radio-group v-model="item.sortable">
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol v-if="item.formatterType === 'dynamic_data_transform'">
            <el-form-item :prop="[...getFormItemProp(index, formItemProp), 'isTreeData']">
              <template #label>
                <my-label label="是否树形数据" />
              </template>
              <el-radio-group
                v-model="item.isTreeData"
                @change="onChange('isTreeData', $event, item)"
              >
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol v-if="item.formatterType === 'date_format'">
            <el-form-item :prop="[...getFormItemProp(index, formItemProp), 'format']">
              <template #label>
                <my-label label="格式化日期" />
              </template>
              <el-input
                v-model="item.format"
                placeholder="yyyy-MM-dd HH:mm:ss"
                clearable
              ></el-input>
            </el-form-item>
          </ResponsiveCol>
          <el-col :span="24">
            <el-form-item
              v-if="item.formatterType === 'dynamic_data_transform'"
              label="数据回显接口定义"
              :prop="[...getFormItemProp(index, formItemProp), 'apiConfig']"
              :rules="[{ required: true, message: '必填项' }]"
            >
              <ApiConfig
                v-model="model[index].apiConfig"
                :form-item-prop="[...getFormItemProp(index, formItemProp), 'apiConfig'].join('.')"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :prop="[...getFormItemProp(index, formItemProp), 'tableColumnItems']">
          <template #label>
            <MyLabel label="子表列配置" />
          </template>
          <TableColumnConfig
            :root="false"
            v-model="item.tableColumnItems"
            :form-item-prop="getFormItemProp(index, formItemProp)"
            :label="getLabel(item.label, label)"
            is-sub-level
          />
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
    <div v-if="!model.length" class="nodata">暂未配置</div>
    <el-button
      v-if="root"
      type="primary"
      :icon="Plus"
      @click="addItem"
      style="width: 100%; margin-top: 10px"
    >
      新增表列
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.table-column-config {
  width: 1000%;
  padding: 12px;
  border: 2px dotted var(--el-border-color-dark);
  .table-column-config {
    margin-top: 12px;
    & > .nodata {
      padding: 0;
    }
  }
}
.header {
  display: flex;
  justify-content: flex-start;
  flex: 1;
}
:deep(.el-collapse-item__content > .el-collapse) {
  margin: 0 10px;
}
</style>
