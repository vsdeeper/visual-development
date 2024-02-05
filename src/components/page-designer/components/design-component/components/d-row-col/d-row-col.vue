<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-01 16:08:25
 * @Description: 栅格设计器
-->
<script setup lang="ts">
import { SemiSelect, Plus } from '@element-plus/icons-vue'
import { MergeDesignData, RowColDesignData } from '@/components'
import {
  IdEditor,
  RowGutterEditor,
  RowJustifyEditor,
  RowAlignEditor,
  ColSpanEditor,
  ColXsEditor,
  ColSmEditor,
  ColMdEditor,
  ColLgEditor,
  ColXlEditor,
} from '../property-editor'
import { ROW_GUTTER } from '../constants'
import { findIndexColInRow, genId, isRowComponent } from '@/components/page-designer/util'
import { useGlobal } from '@/stores'

defineProps<{
  formData: MergeDesignData
}>()

function addCol(row: RowColDesignData) {
  !row.options?.components && (row.options!.components = [])
  row.options!.components.push({
    id: genId(`${row.type}col`),
    type: row.type,
    label: row.label,
    options: {
      components: [],
      colSpan: 24,
    },
  })
}

function deleteCol(targetId: string, cols: RowColDesignData[]) {
  const findIdx = cols.findIndex(e => e.id === targetId)
  cols.splice(findIdx, 1)
}
</script>

<template>
  <el-collapse v-if="isRowComponent(formData)" :model-value="['row', 'col']">
    <el-collapse-item title="布局-Row" name="row">
      <el-row :gutter="ROW_GUTTER">
        <ResponsiveCol>
          <IdEditor :form-data="formData"></IdEditor>
        </ResponsiveCol>
        <ResponsiveCol>
          <RowGutterEditor :form-data="formData"></RowGutterEditor>
        </ResponsiveCol>
        <ResponsiveCol>
          <RowJustifyEditor :form-data="formData"></RowJustifyEditor>
        </ResponsiveCol>
        <ResponsiveCol>
          <RowAlignEditor :form-data="formData"></RowAlignEditor>
        </ResponsiveCol>
      </el-row>
    </el-collapse-item>
    <el-collapse-item title="布局-Row-Cols" name="col">
      <template v-for="item in formData.options?.components" :key="item.id">
        <div class="title">
          <el-divider content-position="left" border-style="dashed"
            >布局-Col-{{ findIndexColInRow(item, useGlobal().designData)! + 1 }}</el-divider
          >
          <el-button
            type="danger"
            :icon="SemiSelect"
            circle
            size="small"
            @click="deleteCol(item.id, formData.options!.components!)"
          ></el-button>
        </div>
        <el-row :gutter="ROW_GUTTER">
          <ResponsiveCol>
            <IdEditor :form-data="item"></IdEditor>
          </ResponsiveCol>
          <ResponsiveCol>
            <ColSpanEditor :form-data="item"></ColSpanEditor>
          </ResponsiveCol>
          <ResponsiveCol>
            <ColXsEditor :form-data="item"></ColXsEditor>
          </ResponsiveCol>
          <ResponsiveCol>
            <ColSmEditor :form-data="item"></ColSmEditor>
          </ResponsiveCol>
          <ResponsiveCol>
            <ColMdEditor :form-data="item"></ColMdEditor>
          </ResponsiveCol>
          <ResponsiveCol>
            <ColLgEditor :form-data="item"></ColLgEditor>
          </ResponsiveCol>
          <ResponsiveCol>
            <ColXlEditor :form-data="item"></ColXlEditor>
          </ResponsiveCol>
        </el-row>
      </template>
      <el-button class="add-btn" type="primary" plain :icon="Plus" @click="addCol(formData)">新增</el-button>
    </el-collapse-item>
  </el-collapse>
  <el-row v-else :gutter="ROW_GUTTER">
    <ResponsiveCol>
      <IdEditor :form-data="formData"></IdEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <ColSpanEditor :form-data="formData"></ColSpanEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <ColXsEditor :form-data="formData"></ColXsEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <ColSmEditor :form-data="formData"></ColSmEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <ColMdEditor :form-data="formData"></ColMdEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <ColLgEditor :form-data="formData"></ColLgEditor>
    </ResponsiveCol>
    <ResponsiveCol>
      <ColXlEditor :form-data="formData"></ColXlEditor>
    </ResponsiveCol>
  </el-row>
</template>

<style lang="scss" scoped>
.add-btn {
  width: 100%;
}

.title {
  display: flex;
  align-items: center;
}
</style>
