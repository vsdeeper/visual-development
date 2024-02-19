<script setup lang="ts">
import { Plus, Minus } from '@element-plus/icons-vue';
import { nanoid } from 'nanoid';
import { ApiConfig, DesignDataOptions } from '@/components';
import { first, isObject, throttle } from 'lodash-es';
import { findArraryValuesFromTreeData, findObjectFromTreeData } from '@/utils';
import { FormItemInstance, FormItemRule } from 'element-plus';
import { METHOD_OPTIONS } from './constants';

interface Tree {
  id: string;
  key: string;
  value?: string | number;
  children?: Tree[];
}

const props = withDefaults(
  defineProps<{
    options: DesignDataOptions;
    apiLabel?: string;
    keyAlias?: string;
    paramsLabel?: string;
    formItemProp?: string[];
    formItemRules?: FormItemRule[];
    showMessage?: boolean;
    showParams?: boolean;
  }>(),
  {
    apiLabel: '接口',
    keyAlias: 'apiConfig',
    paramsLabel: '参数',
    formItemProp: () => ['options', 'api'],
    showParams: true,
  },
);

const options = toRef(props, 'options');
const treeData = ref<Tree[]>([]);
const formItemRef = ref<FormItemInstance>();

const stop = watch(
  () => (options.value[props.keyAlias] as ApiConfig).params,
  params => {
    nextTick(() => stop());
    transTreeDataByParams(params ?? {}, treeData.value);
  },
);

watch(
  treeData,
  throttle(treeData => {
    transParamsByTreeData(treeData, options.value[props.keyAlias]);
  }, 800),
  { deep: true },
);

function append(treeData: Tree[]) {
  treeData.push({
    id: nanoid(5),
    key: 'id',
    value: '123',
  });
}

function remove(target: Tree, treeData: Tree[]) {
  const findIdx = treeData.findIndex(e => e.id === target.id);
  if (findIdx > -1) {
    treeData.splice(findIdx, 1);
  } else {
    const findArr = findArraryValuesFromTreeData(target.id, treeData) as string[];
    const findParent = findObjectFromTreeData(first<string>(findArr)!, treeData) as Tree;
    const findIdx = findParent.children!.findIndex(e => e.id === target.id);
    findParent.children!.splice(findIdx, 1);
  }
}

function transTreeDataByParams(params: Record<string, any>, _treeData: Tree[]) {
  const handler = (params: Record<string, any>, treeData: Tree[]) => {
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        if (isObject(params[key])) {
          const obj = { id: nanoid(5), key, value: params[key], children: [] };
          treeData.push(obj);
          handler(params[key], obj.children);
        } else {
          treeData.push({ id: nanoid(5), key, value: params[key] });
        }
      }
    }
  };
  handler(params, (_treeData = []));
}

function transParamsByTreeData(treeData: Tree[], apiConfig: ApiConfig) {
  const handler = (treeData: Tree[], params: Record<string, any>) => {
    treeData.forEach(item => {
      if (item.children?.length) {
        params[item.key] = {};
        handler(item.children ?? [], params[item.key]);
      } else {
        params[item.key] = item.value;
      }
    });
  };
  handler(treeData, (apiConfig.params = {}));
}

defineExpose({
  formItemRef,
});
</script>

<template>
  <div class="api-editor">
    <el-form-item
      ref="formItemRef"
      :label="apiLabel"
      :prop="formItemProp"
      :rules="formItemRules"
      :show-message="showMessage"
    >
      <el-input v-model="(options[keyAlias] as ApiConfig).api" placeholder="请输入">
        <template #prepend>
          <el-select v-model="(options[keyAlias] as ApiConfig).method" placeholder="选择" style="width: 75px">
            <el-option v-for="item in METHOD_OPTIONS" :key="item" :label="item" :value="item" />
          </el-select>
        </template>
      </el-input>
    </el-form-item>
    <div v-if="showParams" class="params-config">
      <my-divider-title
        :label="paramsLabel"
        :suffix-icon="Plus"
        @click-suffix-icon="append(treeData)"
      ></my-divider-title>
      <el-tree :data="treeData" node-key="id" default-expand-all :expand-on-click-node="false" empty-text="暂无配置">
        <template #default="{ data }">
          <span class="custom-tree-node">
            <el-input v-model="data.key" placeholder="字段名称" clearable></el-input>
            <el-input v-if="!data.children?.length" v-model="data.value" placeholder="字段值" clearable></el-input>
            <el-button type="danger" size="small" :icon="Minus" plain circle @click="remove(data, treeData)">
            </el-button>
          </span>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.api-editor {
  margin-bottom: 18px;
}
.params-config {
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
  }
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  .el-input + .el-input {
    margin-left: 5px;
  }
  .el-button {
    margin-left: 5px;
  }
}
:deep(.el-tree-node__children > .el-tree-node) {
  margin-top: 5px;
}
:deep(.el-tree > .el-tree-node + .el-tree-node) {
  margin-top: 5px;
}
:deep(.el-tree-node__content) {
  height: auto;
}
:deep(.el-tree-node__content:hover) {
  background-color: transparent;
}
:deep(.el-tree-node__content > .el-tree-node__expand-icon) {
  display: none;
}
</style>
