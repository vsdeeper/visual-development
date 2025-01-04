<script setup lang="ts">
import { Plus, Minus } from '@element-plus/icons-vue'
import { type SearchConditionItem } from '@/components'
import { ROW_GUTTER } from '../constants'
import { SEARCH_TYPE_OPTIONS, DATE_TYPE_OPTIONS } from './constants'
import { type TabPaneName } from 'element-plus'
import { first, last } from 'radash'
import { genId } from '@/components/visual-development/util'

const model = defineModel<SearchConditionItem[]>({ default: () => [] })
const activeName = ref(first(model.value)?.label)

function addItem() {
  model.value.push({ id: genId('searchconditionitem') })
  activeName.value = last(model.value)?.label
}

function deleteItem(index: number) {
  model.value.splice(index, 1)
  if (!model.value.length) return
  if (model.value[index]) {
    activeName.value = model.value[index].label
  } else {
    activeName.value = model.value[index - 1].label
  }
}

function onChange(key: string, val: any, item: SearchConditionItem) {
  switch (key) {
    case 'type': {
      resetSearchConditionItem(item)
      if (val === 'Date') {
        item.dateType = 'date'
        item.format = 'YYYY-MM-DD'
        item.valueFormat = 'x'
      } else if (['Select', 'Cascader'].includes(val)) {
        item.dataSource = 'api'
        if (val === 'Cascader') {
          item.optionDataType = 'definition'
        }
      }
      break
    }
    case 'optionDataType': {
      if (val === 'definition') {
        item.staticDataKey = undefined
        item.apiConfig = { params: [] }
        item.dataSource = 'api'
        item.itemValue = 'id'
      } else if (val === 'static_data') {
        item.dataSource = undefined
        item.apiConfig = undefined
        item.itemValue = undefined
        item.isTreeData = undefined
      }
      break
    }
  }
}

function resetSearchConditionItem(item: SearchConditionItem) {
  item.dataSource = undefined
  item.apiConfig = undefined
  item.optionData = undefined
  item.itemLabel = undefined
  item.itemValue = undefined
  item.multiple = undefined
  item.checkStrictly = undefined
  item.lazy = undefined
  item.format = undefined
  item.valueFormat = undefined
  item.dateType = undefined
  item.virtualized = undefined
  item.optionDataType = undefined
}

function changeDataSource(name: TabPaneName, item: SearchConditionItem, index: number) {
  if (name === 'custom') {
    item.dataSource = 'custom'
    item.apiConfig = undefined
    item.itemValue = undefined
    item.optionData = [{}]
  } else if (name === 'api') {
    item.apiConfig = { params: [] }
    item.dataSource = 'api'
    item.optionData = undefined
    item.itemValue = 'id'
  }
}
</script>

<template>
  <div class="search-condition-config">
    <!-- <my-divider-title label="搜索条件设置"></my-divider-title> -->
    <el-collapse v-if="model.length" v-model="activeName" accordion>
      <el-collapse-item v-for="(item, index) in model" :key="item.id" :name="item.id">
        <template #title>
          <div class="header">搜索条件 - {{ item.label }}</div>
          <el-button
            type="danger"
            :icon="Minus"
            circle
            size="small"
            style="margin-right: 10px"
            @click.stop="deleteItem(index)"
          >
          </el-button>
        </template>
        <el-row :gutter="ROW_GUTTER">
          <ResponsiveCol>
            <el-form-item
              :prop="[index + '', 'label']"
              :rules="[{ required: true, message: '必填项' }]"
            >
              <template #label>
                <my-label label="搜索名称" />
              </template>
              <el-input v-model="item.label" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item :prop="[index + '', 'placeholder']">
              <template #label>
                <my-label label="占位内容" />
              </template>
              <el-input v-model="item.placeholder" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </ResponsiveCol>
          <ResponsiveCol>
            <el-form-item
              :prop="[index + '', 'type']"
              :rules="[{ required: true, message: '必填项' }]"
            >
              <template #label>
                <my-label label="搜索类型" />
              </template>
              <el-select
                v-model="item.type"
                placeholder="请选择"
                clearable
                filterable
                @change="onChange('type', $event, item)"
              >
                <el-option
                  v-for="item in SEARCH_TYPE_OPTIONS"
                  :key="item.value"
                  :label="`${item.value}-${item.label}`"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </ResponsiveCol>
          <!-- 搜索条件为Select、Cascader时，设置选项数据类型、关联常量Key -->
          <template v-if="['Select', 'Cascader'].includes(item.type!)">
            <ResponsiveCol>
              <el-form-item
                label="选项数据类型"
                :prop="[index + '', 'optionDataType']"
                :rules="[{ required: true, message: '必填项' }]"
              >
                <el-select
                  v-model="item.optionDataType"
                  placeholder="请选择"
                  clearable
                  filterable
                  :disabled="item.type === 'Cascader'"
                  @change="onChange('optionDataType', $event, item)"
                >
                  <el-option label="静态数据" value="static_data" />
                  <el-option label="定义" value="definition" />
                </el-select>
              </el-form-item>
            </ResponsiveCol>
            <ResponsiveCol v-if="item.optionDataType === 'static_data'">
              <el-form-item
                :prop="[index + '', 'staticDataKey']"
                :rules="[{ required: true, message: '必填项' }]"
              >
                <template #label>
                  <my-label label="静态数据Key" tooltip-content="关联当前view的静态数据Key配置" />
                </template>
                <el-input
                  v-model="item.staticDataKey"
                  placeholder="例：STATIC_DATA_KEY"
                  clearable
                />
              </el-form-item>
            </ResponsiveCol>
          </template>
          <ResponsiveCol>
            <el-form-item
              :prop="[index + '', 'key']"
              :rules="[{ required: true, message: '必填项' }]"
            >
              <template #label>
                <my-label label="字段名称" />
              </template>
              <el-input v-model="item.key" placeholder="请输入" clearable></el-input>
            </el-form-item>
          </ResponsiveCol>
          <!-- 搜索条件为Date时，设置format、valueFormat、dateType -->
          <template v-if="item.type === 'Date'">
            <ResponsiveCol>
              <el-form-item :prop="[index + '', 'format']">
                <template #label>
                  <my-label label="显示在输入框中的格式" />
                </template>
                <el-input v-model="item.format" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </ResponsiveCol>
            <ResponsiveCol>
              <el-form-item :prop="[index + '', 'valueFormat']">
                <template #label>
                  <my-label label="绑定值的格式" />
                </template>
                <el-input v-model="item.valueFormat" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </ResponsiveCol>
            <ResponsiveCol>
              <el-form-item :prop="[index + '', 'dateType']">
                <template #label>
                  <my-label label="显示类型" />
                </template>
                <el-select v-model="item.dateType" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in DATE_TYPE_OPTIONS"
                    :key="item.value"
                    :label="`${item.label} - ${item.value}`"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </ResponsiveCol>
          </template>
          <!-- 搜索条件为Select、Cascader时，设置label别名、value别名、多选 -->
          <template v-if="item.type === 'Select' || item.type === 'Cascader'">
            <ResponsiveCol>
              <el-form-item :prop="[index + '', 'itemLabel']">
                <template #label>
                  <my-label label="选项label别名" tooltip-content="接口定义时生效" />
                </template>
                <el-input v-model="item.itemLabel" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </ResponsiveCol>
            <ResponsiveCol>
              <el-form-item :prop="[index + '', 'itemValue']">
                <template #label>
                  <my-label label="选项value别名" tooltip-content="接口定义时生效" />
                </template>
                <el-input v-model="item.itemValue" placeholder="请输入" clearable></el-input>
              </el-form-item>
            </ResponsiveCol>
            <!-- 搜索条件为Cascader时，设置children别名 -->
            <template v-if="item.type === 'Cascader'">
              <ResponsiveCol>
                <el-form-item :prop="[index + '', 'itemChildren']">
                  <template #label>
                    <my-label label="选项children别名" />
                  </template>
                  <el-input v-model="item.itemChildren" placeholder="请输入" clearable></el-input>
                </el-form-item>
              </ResponsiveCol>
            </template>
            <!-- 搜索条件为Select时，设置虚拟化选择器 -->
            <template v-if="item.type === 'Select'">
              <ResponsiveCol>
                <el-form-item :prop="[index + '', 'virtualized']">
                  <template #label>
                    <my-label label="虚拟化选择器" />
                  </template>
                  <el-radio-group v-model="item.virtualized">
                    <el-radio-button :label="true">是</el-radio-button>
                    <el-radio-button :label="false">否</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </ResponsiveCol>
            </template>
            <ResponsiveCol>
              <el-form-item :prop="[index + '', 'multiple']">
                <template #label>
                  <my-label label="多选" />
                </template>
                <el-radio-group v-model="item.multiple">
                  <el-radio-button :label="true">是</el-radio-button>
                  <el-radio-button :label="false">否</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </ResponsiveCol>
            <!-- 搜索条件为Cascader时，设置父子节点不互相关联、动态加载子节点 -->
            <template v-if="item.type === 'Cascader'">
              <ResponsiveCol>
                <el-form-item :prop="[index + '', 'checkStrictly']">
                  <template #label>
                    <my-label label="父子节点不关联" />
                  </template>
                  <el-radio-group v-model="item.checkStrictly">
                    <el-radio-button :label="true">是</el-radio-button>
                    <el-radio-button :label="false">否</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </ResponsiveCol>
              <ResponsiveCol>
                <el-form-item :prop="[index + '', 'lazy']">
                  <template #label>
                    <my-label label="动态加载子节点" />
                  </template>
                  <el-radio-group v-model="item.lazy">
                    <el-radio-button :label="true">是</el-radio-button>
                    <el-radio-button :label="false">否</el-radio-button>
                  </el-radio-group>
                </el-form-item>
              </ResponsiveCol>
            </template>
          </template>
          <!-- 搜索条件为Select、Cascader时，设置选项数据 -->
          <el-col
            v-if="
              item.optionDataType === 'definition' && ['Select', 'Cascader'].includes(item.type!)
            "
            :span="24"
            style="margin-bottom: 20px"
          >
            <el-tabs v-model="item.dataSource" @tab-change="changeDataSource($event, item, index)">
              <el-tab-pane label="接口定义" name="api">
                <el-form-item :prop="[index + '', 'apiConfig']">
                  <template #label>
                    <MyLabel label="接口配置" />
                  </template>
                  <ApiConfig
                    v-model="model[index].apiConfig"
                    :form-item-prop="[index + '', 'apiConfig']"
                  />
                </el-form-item>
              </el-tab-pane>
              <el-tab-pane label="自定义" name="custom" :disabled="item.type === 'Cascader'">
                <OptionsConfig
                  v-model="item.optionData"
                  :form-item-prop="[index + '', 'optionData']"
                />
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </el-collapse-item>
    </el-collapse>
    <div v-if="!model.length" class="nodata">暂未配置</div>
    <el-button type="primary" :icon="Plus" @click="addItem" style="width: 100%; margin-top: 10px">
      新增搜索条件
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.search-condition-config {
  width: 100%;
  padding: 12px;
  border: 2px dotted var(--el-border-color-dark);
}
.header {
  display: flex;
  justify-content: flex-start;
  flex: 1;
}
:deep(.el-collapse-item__content) {
  padding-bottom: 0;
}
</style>
