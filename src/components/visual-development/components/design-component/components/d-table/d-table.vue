<script setup lang="ts">
import { type TableDesignData } from '@/components'
import { ROW_GUTTER, TABLE_LAYOUT_OPTIONS } from '../constants'

const formData = defineModel<TableDesignData>({ default: () => ({ options: {} }) })
</script>

<template>
  <el-row :gutter="ROW_GUTTER">
    <ResponsiveCol>
      <IdEditor :form-data="formData" />
    </ResponsiveCol>
    <ResponsiveCol>
      <el-form-item prop="options.tableLayout">
        <template #label>
          <my-label label="表格的布局方式" />
        </template>
        <el-select v-model="formData.options.tableLayout" placeholder="请选择" clearable>
          <el-option
            v-for="item in TABLE_LAYOUT_OPTIONS"
            :key="item.value"
            :label="`${item.label} - ${item.value}`"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
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
      <ItemHasChildrenEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <ItemChildrenEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <RowKeyEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <el-form-item prop="options.showOverflowTooltip">
        <template #label>
          <my-label label="内容超长开启Tooltip" tooltip-content="将影响全部列的展示" />
        </template>
        <el-radio-group v-model="formData.options.showOverflowTooltip">
          <el-radio-button :label="true">是</el-radio-button>
          <el-radio-button :label="false">否</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </ResponsiveCol>
    <ResponsiveCol>
      <el-form-item prop="options.showPagination">
        <template #label>
          <my-label label="显示分页" />
        </template>
        <el-radio-group v-model="formData.options.showPagination">
          <el-radio-button :label="true">是</el-radio-button>
          <el-radio-button :label="false">否</el-radio-button>
        </el-radio-group>
      </el-form-item>
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
      <LazyEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <VirtualizedEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <el-form-item prop="options.autoCalcMaxHeight">
        <template #label>
          <my-label label="自动计算最大高度" tooltip-content="控制列表数据是否在一屏内展示" />
        </template>
        <el-radio-group v-model="formData.options.autoCalcMaxHeight">
          <el-radio-button :label="true">是</el-radio-button>
          <el-radio-button :label="false">否</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </ResponsiveCol>
    <ResponsiveCol>
      <HighlightCurrentRowEditor :options="formData.options" />
    </ResponsiveCol>
    <ResponsiveCol>
      <el-form-item prop="options.flexible">
        <template #label>
          <my-label label="主轴弹性" tooltip-content="确保主轴的最小尺寸，以便不超过内容" />
        </template>
        <el-radio-group v-model="formData.options.flexible">
          <el-radio-button :label="true">是</el-radio-button>
          <el-radio-button :label="false">否</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </ResponsiveCol>
    <el-col :span="24" style="margin-top: 18px">
      <el-form-item prop="options.tableColumnItems">
        <template #label>
          <MyLabel label="表列配置" />
        </template>
        <TableColumnConfig
          v-model="formData.options.tableColumnItems"
          root
          :form-item-prop="['options', 'tableColumnItems']"
        />
      </el-form-item>
    </el-col>
    <el-col :span="24">
      <el-form-item prop="options.apiConfig">
        <template #label>
          <MyLabel label="列表接口配置" />
        </template>
        <ApiConfig
          v-model="formData.options.apiConfig"
          :form-item-prop="['options', 'apiConfig']"
        />
      </el-form-item>
    </el-col>
    <el-col v-if="formData.options.lazy" :span="24" style="margin-top: 18px">
      <el-form-item prop="options.lazyApiConfig">
        <template #label>
          <MyLabel label="懒加载子节点接口配置" />
        </template>
        <ApiConfig
          v-model="formData.options.lazyApiConfig"
          :form-item-prop="['options', 'lazyApiConfig']"
        />
      </el-form-item>
    </el-col>
    <el-col :span="24" style="margin-top: 18px">
      <el-form-item prop="options.tableOperations">
        <template #label>
          <MyLabel label="表格操作配置" />
        </template>
        <OperationsConfig
          v-model="formData.options.tableOperations"
          :form-item-prop="['options', 'tableOperations']"
        />
      </el-form-item>
    </el-col>
    <el-col :span="24" style="margin-top: 18px">
      <el-form-item prop="options.tableColumnOperations">
        <template #label>
          <MyLabel label="表列操作配置" />
        </template>
        <OperationsConfig
          v-model="formData.options.tableColumnOperations"
          :form-item-prop="['options', 'tableColumnOperations']"
        />
      </el-form-item>
    </el-col>
  </el-row>
</template>
