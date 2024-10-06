<script setup lang="ts">
import { type TableDesignData } from '@/components'
import { ROW_GUTTER } from '../constants'

const formData = defineModel<TableDesignData>({ default: () => ({ options: {} }) })
</script>

<template>
  <el-row :gutter="ROW_GUTTER">
    <ResponsiveCol>
      <IdEditor :form-data="formData" />
    </ResponsiveCol>
    <ResponsiveCol>
      <TableLayoutEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <ItemHasChildrenEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <ItemChildrenEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <RowKeyEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <el-form-item label="操作列宽度" :prop="['options', 'operateColumnWidth']">
        <el-input-number
          v-model="formData.options.operateColumnWidth"
          placeholder="请输入"
          :min="100"
          :max="999"
          :step="1"
          :controls="true"
          controls-position="right"
        />
      </el-form-item>
    </ResponsiveCol>
    <ResponsiveCol>
      <LazyEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <VirtualizedEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <AutoCalcMaxHeightEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <el-form-item :prop="['options', 'showSelection']">
        <template #label>
          <my-label label="显示多选框" />
        </template>
        <el-radio-group v-model="formData.options.showSelection">
          <el-radio-button :label="true">是</el-radio-button>
          <el-radio-button :label="false">否</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </ResponsiveCol>
    <ResponsiveCol>
      <HighlightCurrentRowEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <ShowPaginationEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <FlexibleEditor :options="formData.options" />
    </ResponsiveCol>
    <el-col :span="24">
      <ApiConfig
        v-model="formData.options.apiConfig"
        title="列表接口配置"
        :form-item-prop="['options', 'apiConfig']"
      />
    </el-col>
    <el-col v-if="formData.options.lazy" :span="24" style="margin-top: 18px">
      <ApiConfig
        v-model="formData.options.lazyApiConfig"
        title="懒加载子节点接口配置"
        :form-item-prop="['options', 'lazyApiConfig']"
      />
    </el-col>
    <el-col :span="24" style="margin-top: 18px">
      <OperationsConfig
        title="表格操作配置"
        v-model="formData.options.tableOperations"
        :form-item-prop="['options', 'tableOperations']"
      />
    </el-col>
    <el-col :span="24" style="margin-top: 18px">
      <TableColumnConfig root :options="formData.options" />
    </el-col>
    <el-col :span="24" style="margin-top: 18px">
      <OperationsConfig
        title="表列操作配置"
        v-model="formData.options.tableColumnOperations"
        :form-item-prop="['options', 'tableColumnOperations']"
      />
    </el-col>
  </el-row>
</template>
