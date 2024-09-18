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
      <LazyEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <VirtualizedEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <AutoCalcMaxHeightEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <ShowCheckboxEditor :options="formData.options" />
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
