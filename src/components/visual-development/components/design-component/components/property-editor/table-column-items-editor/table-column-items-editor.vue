<script setup lang="ts">
import { Minus, Plus } from '@element-plus/icons-vue';
import { DesignDataOptions, TableColumnItem } from '@/components';
import { ROW_GUTTER } from '../../constants';
import { FIXED_OPTIONS } from './constants';

const props = defineProps<{
  options: DesignDataOptions;
}>();

const options = toRef(props, 'options');
const activeName = ref('column1');

function addItem() {
  options.value.tableColumnItems?.push({});
  activeName.value = `column${options.value.tableColumnItems?.length}`;
}

function addSubItem(item: TableColumnItem) {
  if (!item.children) item.children = [];
  item.children.push({});
}

function deleteItem(index: number, tableColumnItems: TableColumnItem[]) {
  tableColumnItems.splice(index, 1);
  if (tableColumnItems[index]) {
    activeName.value = `column${index + 1}`;
  } else {
    activeName.value = `column${index}`;
  }
}
</script>

<template>
  <el-collapse v-if="options.tableColumnItems?.length" v-model="activeName" accordion>
    <el-collapse-item v-for="(item, index) in options.tableColumnItems" :key="index" :name="`column${index + 1}`">
      <template #title>
        <div style="display: flex; justify-content: flex-start; flex: 1">表列 - {{ item.label }}</div>
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
          <el-form-item label="字段名称" :prop="['options', 'tableColumnItems', index + '', 'prop']">
            <el-input v-model="item.prop" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item label="列名称" :prop="['options', 'tableColumnItems', index + '', 'label']">
            <el-input v-model="item.label" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item label="列宽度" :prop="['options', 'tableColumnItems', index + '', 'width']">
            <el-input v-model="item.width" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item label="列最小宽度" :prop="['options', 'tableColumnItems', index + '', 'minWidth']">
            <el-input v-model="item.minWidth" placeholder="请输入" clearable></el-input>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item label="固定列" :prop="['options', 'tableColumnItems', index + '', 'fixed']">
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
            :prop="['options', 'tableColumnItems', index + '', 'showOverflowTooltip']"
          >
            <el-radio-group v-model="item.showOverflowTooltip">
              <el-radio-button :label="true">是</el-radio-button>
              <el-radio-button :label="false">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </ResponsiveCol>
        <ResponsiveCol>
          <el-form-item label="开启排序" :prop="['options', 'tableColumnItems', index + '', 'sortable']">
            <el-radio-group v-model="item.sortable">
              <el-radio-button :label="true">是</el-radio-button>
              <el-radio-button :label="false">否</el-radio-button>
            </el-radio-group>
          </el-form-item>
        </ResponsiveCol>
      </el-row>
    </el-collapse-item>
  </el-collapse>
  <el-button type="primary" plain :icon="Plus" @click="addItem" style="width: 100%; margin-top: 10px">
    新增表列
  </el-button>
</template>
