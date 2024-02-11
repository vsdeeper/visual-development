<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-11 22:49:04
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @LastEditTime: 2024-02-12 00:04:55
 * @Description:
-->
<script setup lang="ts">
import { SearchConditionOptionItem } from "@/components";
import { SemiSelect, Plus, Refresh } from "@element-plus/icons-vue";

const model = defineModel<SearchConditionOptionItem[]>();
const value = ref<SearchConditionOptionItem[]>();

watch(model, (model) => {
  value.value = model;
});

watch(value, (value) => {
  model.value = value;
});

function _delete(idx: number) {
  value.value!.splice(idx, 1);
}

function add() {
  if (!value.value) value.value = [];
  value.value.push({
    label: `选项${value.value.length + 1}`,
    value: value.value.length + 1 + "",
  });
}

function reset() {
  value.value = undefined;
}
</script>

<template>
  <div class="option-items-config">
    <el-row v-for="(item, index) in value" :key="item.value" align="middle">
      <el-input
        v-model="item.value"
        class="input"
        placeholder="选项值"
        style="width: 100px; margin-right: 5px"
      />
      <el-input v-model="item.label" placeholder="选项名称" style="flex: 1" />
      <el-button
        type="danger"
        size="small"
        :icon="SemiSelect"
        circle
        @click="_delete(index)"
        style="margin-left: 8px"
      ></el-button>
    </el-row>
    <div class="btns">
      <el-button type="primary" plain :icon="Plus" @click="add">
        新增选项
      </el-button>
      <el-button type="primary" plain :icon="Refresh" @click="reset">
        重设选择项
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.option-items-config {
  padding: 0 5px;
  .el-row + .el-row {
    margin-top: 5px;
  }
  .btns {
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .el-button + .el-button {
      margin: 5px 0 0;
    }
  }
}
</style>
