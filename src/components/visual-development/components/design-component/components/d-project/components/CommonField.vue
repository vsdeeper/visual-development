<script setup lang="ts">
const model = defineModel<Record<string, string>>({ default: () => ({}) })
const options = [
  { label: '分页大小', key: 'pageSize' },
  { label: '分页索引', key: 'pageIndex' },
]
</script>

<template>
  <div class="common-field">
    <el-row>
      <el-col v-for="item in options" :key="item.key" :sm="24" :md="12" :lg="8" :xl="6">
        <el-form-item :label="item.label">
          <el-input v-model="model[item.key]" placeholder="请输入" clearable></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.common-field {
  flex: 1;
  padding: 10px;
  border: 1px dashed var(--el-border-color);
  border-radius: var(--el-border-radius-base);
  .el-form-item {
    padding: 8px;
  }
}
</style>
