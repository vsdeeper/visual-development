<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-13 16:07:06
 * @LastEditTime: 2024-02-17 14:04:52
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 接口配置
-->
<script setup lang="ts">
import { nanoid } from 'nanoid';
import { MergeDesignData } from '@/components';
import { first, isObject, throttle } from 'lodash-es';
import { findArraryValuesFromTreeData, findObjectFromTreeData } from '@/utils';

interface Tree {
  id: string;
  key: string;
  value?: string | number;
  children?: Tree[];
}

const props = withDefaults(
  defineProps<{
    formData: MergeDesignData;
    label?: string;
  }>(),
  {
    label: '接口',
  },
);

const _formData = toRef(props, 'formData');
const treeData = ref<Tree[]>([]);

const stop = watch(
  () => _formData.value.options?.params,
  params => {
    nextTick(() => stop());
    transTreeDataByParams(params ?? {}, treeData.value);
  },
);

watch(
  treeData,
  throttle(treeData => {
    transParamsByTreeData(treeData, _formData.value);
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
    const findArr = findArraryValuesFromTreeData(
      target.id,
      treeData,
    ) as string[];
    const findParent = findObjectFromTreeData(
      first<string>(findArr)!,
      treeData,
    ) as Tree;
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

function transParamsByTreeData(treeData: Tree[], formData: MergeDesignData) {
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
  handler(treeData, (formData.options!.params = {}));
}
</script>

<template>
  <el-form-item
    :label="label"
    :prop="['options', 'api']"
    :rules="[{ required: true, message: '必填项' }]"
  >
    <el-input v-model="_formData.options!.api" placeholder="请输入">
      <template #prepend>
        <el-select
          v-model="_formData.options!.method"
          disabled
          style="width: 75px"
        >
          <el-option label="GET" value="GET" />
        </el-select>
      </template>
    </el-input>
  </el-form-item>
  <div class="params-config">
    <div class="title">
      接口参数
      <el-button type="primary" link @click="append(treeData)">添加</el-button>
    </div>
    <el-tree
      :data="treeData"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      empty-text="暂无配置"
    >
      <template #default="{ data }">
        <span class="custom-tree-node">
          <el-input
            v-model="data.key"
            placeholder="字段名称"
            clearable
          ></el-input>
          <el-input
            v-if="!data.children?.length"
            v-model="data.value"
            placeholder="字段值"
            clearable
          ></el-input>
          <el-button type="danger" link @click="remove(data, treeData)">
            删除
          </el-button>
        </span>
      </template>
    </el-tree>
  </div>
</template>

<style lang="scss" scoped>
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
</style>
