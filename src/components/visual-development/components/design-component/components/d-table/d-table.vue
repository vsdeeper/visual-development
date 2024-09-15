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
      <!-- @vue-skip -->
      <ApiConfig
        v-model="formData.options"
        :form-item-rules="[{ required: true }]"
        api-label="列表接口"
        params-label="列表接口参数"
      />
    </el-col>
    <el-col v-if="formData.options.lazy" :span="24" style="margin-top: 18px">
      <!-- @vue-skip -->
      <ApiConfig
        v-model="formData.options"
        :form-item-rules="[{ required: true }]"
        :map="{ api: 'loadApi', apiMethod: 'loadApiMethod', apiParams: 'loadApiParams' }"
        api-label="懒加载子节点接口"
        params-label="懒加载子节点接口参数"
      />
    </el-col>
    <el-col :span="24" style="margin-top: 18px">
      <TableOperationsConfig
        v-model="formData.options.tableOperations"
        :form-item-prop="['options', 'tableOperations']"
      />
    </el-col>
    <el-col :span="24" style="margin-top: 18px">
      <TableColumnConfig root :options="formData.options" />
    </el-col>
    <el-col :span="24" style="margin-top: 18px">
      <TableColumnOperationsConfig v-model="formData.options.tableColumnOperations" />
    </el-col>
  </el-row>
</template>
