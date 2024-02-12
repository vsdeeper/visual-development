<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-13 16:07:06
 * @LastEditTime: 2024-02-12 20:20:57
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 搜索条件项配置
-->
<script setup lang="ts">
import { FormItemInstance } from "element-plus";
import { Plus, SemiSelect } from "@element-plus/icons-vue";
import {
  MergeDesignData,
  SearchConditionItem,
  SearchConditionType,
} from "@/components";
import { ROW_GUTTER } from "../../constants";
import { SEARCH_TYPE_OPTIONS } from "./constants";
import { TabPaneName } from "element-plus";

const props = defineProps<{
  formData: MergeDesignData;
}>();

const _formData = toRef(props, "formData");
const apiRefs = ref<FormItemInstance[]>([]);

function add() {
  _formData.value.options?.searchConditionItems?.push({});
}

function deleteSearchItem(
  index: number,
  searchConditionItems: SearchConditionItem[],
) {
  searchConditionItems.splice(index, 1);
}

function changeType(type: SearchConditionType, item: SearchConditionItem) {
  switch (type) {
    case "Select": {
      item.dataSource = "api";
      item.method = "GET";
      break;
    }
    default:
      break;
  }
}

function changeDataSource(
  name: TabPaneName,
  item: SearchConditionItem,
  index: number,
) {
  if (name === "custom") {
    item.dataSource = "custom";
    item.method = undefined;
    item.api = undefined;
    item.options = [{}];
  } else if (name === "api") {
    item.dataSource = "api";
    item.method = "GET";
    item.api = undefined;
    item.options = undefined;
    apiRefs.value[index]?.clearValidate();
    setTimeout(() => apiRefs.value[index]?.clearValidate());
  }
}
</script>

<template>
  <template
    v-for="(item, index) in _formData.options?.searchConditionItems"
    :key="index"
  >
    <div class="divider-box">
      <el-divider content-position="left" border-style="dashed">
        搜索条件 {{ index + 1 }}
      </el-divider>
      <el-button
        type="danger"
        :icon="SemiSelect"
        circle
        size="small"
        @click="
          deleteSearchItem(index, formData.options!.searchConditionItems!)
        "
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
          :prop="['options', 'searchConditionItems', index + '', 'key']"
          :rules="[{ required: true, message: '必填项' }]"
        >
          <el-input
            v-model="item.filedName"
            placeholder="请输入"
            clearable
          ></el-input>
        </el-form-item>
      </ResponsiveCol>
      <el-col
        v-if="item.type === 'Select'"
        :span="24"
        style="margin-bottom: 20px"
      >
        <el-tabs
          v-model="item.dataSource"
          @tab-change="changeDataSource($event, item, index)"
        >
          <el-tab-pane label="接口" name="api">
            <el-form-item
              :ref="(ref) => (apiRefs[index] = ref as FormItemInstance)"
              :prop="['options', 'searchConditionItems', index + '', 'api']"
              :rules="[{ required: true, message: '必填项' }]"
              :show-message="false"
              style="margin-bottom: 0"
            >
              <el-input v-model="item.api" placeholder="请输入" clearable>
                <template #prepend>
                  <el-select v-model="item.method" disabled style="width: 75px">
                    <el-option label="GET" value="GET" />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="自定义" name="custom">
            <OptionItemsConfig v-model="item.options"></OptionItemsConfig>
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
