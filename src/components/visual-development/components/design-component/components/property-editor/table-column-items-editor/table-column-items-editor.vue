<script setup lang="ts">
import { Minus, Plus } from '@element-plus/icons-vue';
import { TableColumnItem, TableDesignDataOptions } from '@/components';
import { ROW_GUTTER } from '../../constants';
import { FIXED_OPTIONS } from './constants';
import { nanoid } from 'nanoid';
import { first, last } from 'lodash-es';

const props = defineProps<{
  options: TableDesignDataOptions | TableColumnItem;
  formItemProp?: string[];
  label?: string;
  isSubLevel?: boolean;
}>();

const options = toRef(props, 'options');
const activeName = ref(first(options.value.tableColumnItems)?.id);

function addItem() {
  options.value.tableColumnItems?.push({ id: nanoid(5) });
  activeName.value = last(options.value.tableColumnItems)?.id;
}

function addSubItem(item: TableColumnItem) {
  if (!item.tableColumnItems) item.tableColumnItems = [];
  item.tableColumnItems.push({ id: nanoid(5) });
}

function deleteItem(index: number, tableColumnItems: TableColumnItem[]) {
  tableColumnItems.splice(index, 1);
  if (!tableColumnItems.length) return;
  if (tableColumnItems[index]) {
    activeName.value = tableColumnItems[index].id;
  } else {
    activeName.value = tableColumnItems[index - 1].id;
  }
}

function getFormItemProp(index: number, formItemProp?: string[]) {
  return Array.isArray(formItemProp)
    ? [...formItemProp, 'tableColumnItems', index + '']
    : ['options', 'tableColumnItems', index + ''];
}

function getLabel(label?: string, propLabel?: string) {
  return propLabel ? `${propLabel} / ${label ?? ''}` : `${label ?? ''}`;
}
</script>

<template>
  <el-collapse v-if="options.tableColumnItems?.length" v-model="activeName" accordion>
    <el-collapse-item v-for="(item, index) in options.tableColumnItems" :key="item.id" :name="item.id">
      <template #title>
        <div style="display: flex; justify-content: flex-start; flex: 1">表列 - {{ getLabel(item.label, label) }}</div>
        <el-button
          type="danger"
          :icon="Minus"
          circle
          plain
          size="small"
          @click.stop="deleteItem(index, options.tableColumnItems!)"
        >
        </el-button>
        <el-button
          type="primary"
          :icon="Plus"
          circle
          plain
          size="small"
          style="margin-right: 10px"
          @click.stop="addSubItem(item)"
        >
        </el-button>
      </template>

      <el-row :gutter="ROW_GUTTER">
        <ResponsiveCol>
          <el-form-item
            label="字段名称"
            :prop="[...getFormItemProp(index, formItemProp), 'prop']"
            :rules="[{ required: true, message: '必填项' }]"
          >
            <el-input v-model="item.prop" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item
            label="列名称"
            :prop="[...getFormItemProp(index, formItemProp), 'label']"
            :rules="[{ required: true, message: '必填项' }]"
          >
            <el-input v-model="item.label" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item label="列宽度" :prop="[...getFormItemProp(index, formItemProp), 'width']">
            <el-input v-model="item.width" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item label="列最小宽度" :prop="[...getFormItemProp(index, formItemProp), 'minWidth']">
            <el-input v-model="item.minWidth" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item label="固定列" :prop="[...getFormItemProp(index, formItemProp), 'fixed']">
            <el-select v-model="item.fixed" placeholder="请选择" clearable>
              <el-option
                v-for="item1 in FIXED_OPTIONS"
                :key="item1.value"
                :label="`${item1.label} - ${item1.value}`"
                :value="item1.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item
            label="内容超长tooltip"
            :prop="[...getFormItemProp(index, formItemProp), 'showOverflowTooltip']"
          >
            <el-radio-group v-model="item.showOverflowTooltip">
              <el-radio-button :label="true">是</el-radio-button>
              <el-radio-button :label="false">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item label="开启排序" :prop="[...getFormItemProp(index, formItemProp), 'sortable']">
            <el-radio-group v-model="item.sortable">
              <el-radio-button :label="true">是</el-radio-button>
              <el-radio-button :label="false">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </ResponsiveCol>
      </el-row>
      <table-column-items-editor
        :options="item"
        :form-item-prop="getFormItemProp(index, formItemProp)"
        :label="getLabel(item.label, label)"
        is-sub-level
      ></table-column-items-editor>
    </el-collapse-item>
  </el-collapse>
  <el-button
    v-if="!isSubLevel"
    type="primary"
    plain
    :icon="Plus"
    @click="addItem"
    style="width: 100%; margin-top: 10px"
  >
    新增表列
  </el-button>
</template>

<style lang="scss" scoped>
:deep(.el-collapse-item__content > .el-collapse) {
  margin: 0 10px;
}
</style>