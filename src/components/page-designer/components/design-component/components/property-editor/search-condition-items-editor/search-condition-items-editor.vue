<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-13 16:07:06
 * @LastEditTime: 2024-02-17 22:54:33
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 搜索条件项配置
-->
<script setup lang="ts">
import { Plus, Minus } from '@element-plus/icons-vue';
import {
  DesignDataOptions,
  SearchConditionItem,
  SearchConditionType,
} from '@/components';
import { ROW_GUTTER } from '../../constants';
import { SEARCH_TYPE_OPTIONS, DATE_TYPE_OPTIONS } from './constants';
import { TabPaneName } from 'element-plus';
import { ApiEditorInstance } from '../api-editor';

const props = defineProps<{
  options: DesignDataOptions;
}>();

const options = toRef(props, 'options');
const apiRefs = ref<ApiEditorInstance[]>([]);

function add() {
  options.value.searchConditionItems?.push({});
}

function deleteSearchItem(
  index: number,
  searchConditionItems: SearchConditionItem[],
) {
  searchConditionItems.splice(index, 1);
}

function changeType(type: SearchConditionType, item: SearchConditionItem) {
  resetSearchConditionItem(item);
  switch (type) {
    case 'Select':
    case 'Cascader': {
      item.dataSource = 'api';
      item.method = 'GET';
      item.itemValue = 'id';
      break;
    }
    case 'DatePicker': {
      item.dateType = 'date';
      item.format = 'YYYY-MM-DD';
      item.valueFormat = 'x';
      break;
    }
  }
}

function resetSearchConditionItem(item: SearchConditionItem) {
  item.dataSource = undefined;
  item.method = undefined;
  item.api = undefined;
  item.options = undefined;
  item.itemLabel = undefined;
  item.multiple = undefined;
  item.checkStrictly = undefined;
  item.lazy = undefined;
  item.format = undefined;
  item.valueFormat = undefined;
  item.dateType = undefined;
  item.virtualized = undefined;
}

function changeDataSource(
  name: TabPaneName,
  item: SearchConditionItem,
  index: number,
) {
  if (name === 'custom') {
    item.dataSource = 'custom';
    item.method = undefined;
    item.api = undefined;
    item.itemValue = undefined;
    item.options = [{}];
  } else if (name === 'api') {
    item.dataSource = 'api';
    item.method = 'GET';
    item.api = undefined;
    item.options = undefined;
    item.itemValue = 'id';
    apiRefs.value[index]?.formItemRef?.clearValidate();
    setTimeout(() => apiRefs.value[index]?.formItemRef?.clearValidate());
  }
}
</script>

<template>
  <template v-for="(item, index) in options.searchConditionItems" :key="index">
    <div class="divider-box">
      <el-divider content-position="left" border-style="dashed">
        搜索条件 {{ index + 1 }}
      </el-divider>
      <el-button
        type="danger"
        :icon="Minus"
        circle
        plain
        size="small"
        @click="deleteSearchItem(index, options.searchConditionItems!)"
      ></el-button>
    </div>
    <el-row :gutter="ROW_GUTTER">
      <ResponsiveCol>
        <el-form-item
          label="搜索名称"
          :prop="['options', 'searchConditionItems', index + '', 'placeholder']"
          :rules="[{ required: true, message: '必填项' }]"
        >
          <el-input
            v-model="item.placeholder"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
      </ResponsiveCol>
      <ResponsiveCol>
        <el-form-item
          label="搜索类型"
          :prop="['options', 'searchConditionItems', index + '', 'type']"
          :rules="[{ required: true, message: '必填项' }]"
        >
          <el-select
            v-model="item.type"
            placeholder="请选择"
            clearable
            @change="changeType($event, item)"
          >
            <el-option
              v-for="item in SEARCH_TYPE_OPTIONS"
              :key="item.value"
              :label="`${item.label} - ${item.value}`"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </ResponsiveCol>
      <ResponsiveCol>
        <el-form-item
          label="字段名称"
          :prop="['options', 'searchConditionItems', index + '', 'filedName']"
          :rules="[{ required: true, message: '必填项' }]"
        >
          <el-input
            v-model="item.filedName"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
      </ResponsiveCol>
      <!-- 搜索条件为DatePicker时，设置format、valueFormat、dateType -->
      <template v-if="item.type === 'DatePicker'">
        <ResponsiveCol>
          <el-form-item
            label="显示在输入框中的格式"
            :prop="['options', 'searchConditionItems', index + '', 'format']"
          >
            <el-input
              v-model="item.format"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item
            label="绑定值的格式"
            :prop="[
              'options',
              'searchConditionItems',
              index + '',
              'valueFormat',
            ]"
          >
            <el-input
              v-model="item.valueFormat"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item
            label="显示类型"
            :prop="['options', 'searchConditionItems', index + '', 'dateType']"
          >
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
      <!-- 搜索条件为Select时，设置label别名、value别名、多选 -->
      <template v-if="item.type === 'Select'">
        <ResponsiveCol>
          <el-form-item
            label="label别名"
            :prop="['options', 'searchConditionItems', index + '', 'itemLabel']"
          >
            <el-input
              v-model="item.itemLabel"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item
            label="value别名"
            :prop="['options', 'searchConditionItems', index + '', 'itemValue']"
          >
            <el-input
              v-model="item.itemValue"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item
            label="多选"
            :prop="['options', 'searchConditionItems', index + '', 'multiple']"
          >
            <el-radio-group v-model="item.multiple">
              <el-radio-button :label="true">是</el-radio-button>
              <el-radio-button :label="false">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item
            label="虚拟化选择器"
            :prop="[
              'options',
              'searchConditionItems',
              index + '',
              'virtualized',
            ]"
          >
            <el-radio-group v-model="item.virtualized">
              <el-radio-button :label="true">是</el-radio-button>
              <el-radio-button :label="false">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </ResponsiveCol>
      </template>
      <!-- 搜索条件为Cascader时，设置label别名、value别名、多选 -->
      <template v-if="item.type === 'Cascader'">
        <ResponsiveCol>
          <el-form-item
            label="label别名"
            :prop="['options', 'searchConditionItems', index + '', 'itemLabel']"
          >
            <el-input
              v-model="item.itemLabel"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item
            label="value别名"
            :prop="['options', 'searchConditionItems', index + '', 'itemValue']"
          >
            <el-input
              v-model="item.itemValue"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item
            label="children别名"
            :prop="[
              'options',
              'searchConditionItems',
              index + '',
              'itemChildren',
            ]"
          >
            <el-input
              v-model="item.itemChildren"
              placeholder="请输入"
              clearable
            ></el-input>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item
            label="多选"
            :prop="['options', 'searchConditionItems', index + '', 'multiple']"
          >
            <el-radio-group v-model="item.multiple">
              <el-radio-button :label="true">是</el-radio-button>
              <el-radio-button :label="false">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item
            label="父子节点不互相关联"
            :prop="[
              'options',
              'searchConditionItems',
              index + '',
              'checkStrictly',
            ]"
          >
            <el-radio-group v-model="item.checkStrictly">
              <el-radio-button :label="true">是</el-radio-button>
              <el-radio-button :label="false">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item
            label="动态加载子节点"
            :prop="['options', 'searchConditionItems', index + '', 'lazy']"
          >
            <el-radio-group v-model="item.lazy">
              <el-radio-button :label="true">是</el-radio-button>
              <el-radio-button :label="false">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </ResponsiveCol>
      </template>
      <!-- 搜索条件为Select、Cascader时，设置选项数据 -->
      <el-col
        v-if="item.type === 'Select' || item.type === 'Cascader'"
        :span="24"
        style="margin-bottom: 20px"
      >
        <el-tabs
          v-model="item.dataSource"
          @tab-change="changeDataSource($event, item, index)"
        >
          <el-tab-pane label="接口" name="api">
            <ApiEditor
              :ref="ref => (apiRefs[index] = ref as ApiEditorInstance)"
              :options="item"
              :form-item-prop="[
                'options',
                'searchConditionItems',
                index + '',
                'api',
              ]"
              :show-message="false"
            ></ApiEditor>
          </el-tab-pane>
          <el-tab-pane
            label="自定义"
            name="custom"
            :disabled="item.type === 'Cascader'"
          >
            <OptionItemsConfig
              v-model="item.options"
              :index="index"
            ></OptionItemsConfig>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </template>
  <el-button type="primary" plain :icon="Plus" @click="add" style="width: 100%">
    新增搜索条件
  </el-button>
</template>

<style lang="scss" scoped>
.divider-box {
  display: flex;
  align-items: center;
}
</style>
