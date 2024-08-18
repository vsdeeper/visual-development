<script setup lang="ts">
import type { ApiDomainConfig } from '.'

const model = defineModel<ApiDomainConfig>({ default: () => ({}) })
</script>

<template>
  <div class="api-domain">
    <div class="item">
      <label>开发环境</label>
      <div>
        <el-input v-model="model.dev" placeholder="例：https://api.github.com" clearable />
      </div>
    </div>
    <div class="item">
      <label>测试环境</label>
      <div>
        <el-input v-model="model.test" placeholder="例：https://api.github.com" clearable />
      </div>
    </div>
    <div class="item">
      <label>生产环境</label>
      <div>
        <el-input v-model="model.prod" placeholder="例：https://api.github.com" clearable />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.api-domain {
  width: 100%;
  padding: 12px;
  border-radius: var(--el-border-radius-base);
  border: 1px solid var(--el-border-color-light);
  .item {
    display: flex;
    label {
      width: 70px;
    }
    & > div {
      flex: 1;
    }
    & + .item {
      margin-top: 8px;
    }
  }
}
</style>
