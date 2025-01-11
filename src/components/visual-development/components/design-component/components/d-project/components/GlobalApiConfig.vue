<script setup lang="ts">
import { Minus, Plus } from '@element-plus/icons-vue'
import type { ApiConfigModel } from '../../api-config'

const model = defineModel<ApiConfigModel[]>({ default: () => [] })
const activeName = ref(1)

function onAdd() {
  model.value.push({ params: [] })
  activeName.value = model.value.length
}

const onDelete = (index: number) => {
  model.value.splice(index, 1)
}
</script>

<template>
  <div class="global-api-config">
    <el-collapse v-if="model.length" v-model="activeName" accordion>
      <el-collapse-item v-for="(item, index) in model" :key="'item' + index" :name="index + 1">
        <template #title>
          <div class="header">
            接口配置 - <span class="label">{{ item.name }}</span>
          </div>
          <el-button
            type="danger"
            :icon="Minus"
            circle
            size="small"
            @click.stop="onDelete(index)"
            style="margin-right: 10px"
          />
        </template>
        <ApiConfig v-model="model[index]" :form-item-prop="`options.globalApiConfig.${index}`" />
      </el-collapse-item>
    </el-collapse>
    <div v-if="!model.length" class="nodata">暂无配置</div>
    <el-button type="primary" :icon="Plus" @click="onAdd" style="width: 100%; margin-top: 10px">
      新增接口配置
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.global-api-config {
  flex: 1;
  padding: 10px;
  border: 1px dashed var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  .header {
    display: flex;
    justify-content: flex-start;
    flex: 1;
    .label {
      color: var(--el-text-color-regular);
      margin-left: 5px;
    }
  }
}
</style>
