<script setup lang="ts">
import { Minus, Plus } from '@element-plus/icons-vue'
import {
  type TableColumnItem,
  type TableDesignDataOptions,
  type TableColumnItemFormatterType,
} from '@/components'
import { ROW_GUTTER } from '../constants'
import { FIXED_OPTIONS, FORMATTER_OPTIONS } from './constants'
import { nanoid } from 'nanoid'
import { first, last } from 'lodash-es'

const props = defineProps<{
  root: boolean
  options: TableDesignDataOptions | TableColumnItem
  formItemProp?: string[]
  label?: string
  isSubLevel?: boolean
}>()

const options = toRef(props, 'options')
const activeName = ref(first(options.value.tableColumnItems)?.id)

function addItem() {
  options.value.tableColumnItems?.push({ id: nanoid(5), apiConfig: { params: [] } })
  activeName.value = last(options.value.tableColumnItems)?.id
}

function addSubItem(item: TableColumnItem) {
  if (!item.tableColumnItems) item.tableColumnItems = []
  item.tableColumnItems.push({ id: nanoid(5) })
}

function deleteItem(index: number, tableColumnItems: TableColumnItem[]) {
  tableColumnItems.splice(index, 1)
  if (!tableColumnItems.length) return
  if (tableColumnItems[index]) {
    activeName.value = tableColumnItems[index].id
  } else {
    activeName.value = tableColumnItems[index - 1].id
  }
}

function changeFormatterType(val: TableColumnItemFormatterType, item: TableColumnItem) {
  item.api = undefined
  item.apiConfig = undefined
  item.apiParams = undefined
  item.staticDataKey = undefined
  item.format = undefined
  item.isTreeData = undefined
  if (val === 'dynamic_data_transform') {
    item.apiConfig = { params: [] }
  } else if (val === 'date_format') {
    item.format = 'yyyy-MM-dd HH:mm:ss'
  }
}

function getFormItemProp(index: number, formItemProp?: string[]) {
  return Array.isArray(formItemProp)
    ? [...formItemProp, 'tableColumnItems', index + '']
    : ['options', 'tableColumnItems', index + '']
}

function getLabel(label?: string, propLabel?: string) {
  return propLabel ? `${propLabel} / ${label ?? ''}` : `${label ?? ''}`
}
</script>

<template>
  <div class="table-column-config">
    <my-divider-title :label="root ? '表列配置' : '子表列配置'"></my-divider-title>
    <el-collapse v-if="options.tableColumnItems?.length" v-model="activeName" accordion>
      <el-collapse-item
        v-for="(item, index) in options.tableColumnItems"
        :key="item.id"
        :name="item.id"
      >
        <template #title>
          <div class="header">
            表列 - <span class="label">{{ getLabel(item.label, label) }}</span>
          </div>
          <el-button
            type="danger"
            :icon="Minus"
            circle
            size="small"
            @click.stop="deleteItem(index, options.tableColumnItems!)"
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
            <el-form-item :prop="[...getFormItemProp(index, formItemProp), 'label']">
              <template #label>
                <my-label label="列名称" />
              </template>
              <el-input v-model="item.label" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="[...getFormItemProp(index, formItemProp), 'prop']">
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
            <el-form-item :prop="[...getFormItemProp(index, formItemProp), 'showOverflowTooltip']">
              <template #label>
                <my-label label="内容超长tooltip" />
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
          <ResponsiveCol>
            <el-form-item :prop="[...getFormItemProp(index, formItemProp), 'formatterType']">
              <template #label>
                <my-label label="数据回显类型" tooltip-content="数据回显时的转换规则或格式化类型" />
              </template>
              <el-select
                v-model="item.formatterType"
                placeholder="请选择"
                clearable
                @change="changeFormatterType($event, item)"
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
          <ResponsiveCol v-if="item.formatterType === 'dynamic_data_transform'">
            <el-form-item :prop="[...getFormItemProp(index, formItemProp), 'isTreeData']">
              <template #label>
                <my-label label="是否树形数据" />
              </template>
              <el-radio-group v-model="item.isTreeData">
                <el-radio-button :label="true">是</el-radio-button>
                <el-radio-button :label="false">否</el-radio-button>
              </el-radio-group>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol v-if="item.formatterType === 'static_data_transform'">
            <el-form-item :prop="[...getFormItemProp(index, formItemProp), 'staticDataKey']">
              <template #label>
                <my-label label="静态数据Key" tooltip-content="关联当前view的静态数据Key配置" />
              </template>
              <el-input
                v-model="item.staticDataKey"
                placeholder="例：STATIC_DATA_KEY"
                clearable
              ></el-input>
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
          <el-col v-if="item.formatterType === 'dynamic_data_transform'" :span="24">
            <el-form-item :prop="[...getFormItemProp(index, formItemProp)]">
              <template #label>
                <MyLabel label="动态数据回显接口配置" />
              </template>
              <ApiConfig
                v-model="options.tableColumnItems[index].apiConfig"
                :form-item-prop="[...getFormItemProp(index, formItemProp)]"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <TableColumnConfig
          :root="false"
          :options="item"
          :form-item-prop="getFormItemProp(index, formItemProp)"
          :label="getLabel(item.label, label)"
          is-sub-level
        />
      </el-collapse-item>
    </el-collapse>
    <div v-if="!options.tableColumnItems?.length" class="nodata">暂未配置</div>
    <el-button
      v-if="!isSubLevel"
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
  padding: 12px;
  border: 2px dotted var(--el-border-color-dark);
  .table-column-config {
    margin-top: 12px;
  }
}
.header {
  display: flex;
  justify-content: flex-start;
  flex: 1;
  .label {
    color: var(--el-text-color-regular);
    margin-left: 5px;
  }
}
:deep(.el-collapse-item__content > .el-collapse) {
  margin: 0 10px;
}
</style>
