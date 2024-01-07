<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 17:27:11
 * @Description:
-->
<script setup lang="ts">
import { InputInstance } from 'element-plus'
import { throttle } from 'lodash-es'
import { AddComponentOptionItem as OptionItem } from '.'

const props = defineProps<{
  options?: OptionItem[]
}>()

const emit = defineEmits<{
  (e: 'select', val: OptionItem, data: unknown): void
}>()

const searchRef = ref<InputInstance>()
const show = ref(false)
const word = ref()
const renderOptions = ref<OptionItem[]>()
const sourceOptions = ref<OptionItem[]>()

watch(() => props.options, options => {
  if (options) {
    renderOptions.value = options
    sourceOptions.value = JSON.parse(JSON.stringify(options))
  }
}, { immediate: true })

watch(word, throttle(word => {
  renderOptions.value = sourceOptions.value?.filter(e => e.label.includes(word ?? '') || e.value.toLowerCase().includes((word ?? '').toLowerCase()))
}, 500))

function select(val: OptionItem) {
  show.value = false
  emit('select', val, { test: 111 })
}

function open() {
  show.value = true
}

function opened() {
  searchRef.value?.focus()
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog title="添加组件" v-model="show" @opened="opened">
    <div class="search">
      <el-input ref="searchRef" v-model="word" placeholder="请输入关键词" size="large" clearable></el-input>
    </div>
    <el-scrollbar max-height="350px">
      <div class="items" v-for="item in renderOptions" :key="item.value">
        <el-button text size="large" @click="select(item)">
          {{ item.label }} - {{ item.value }}
        </el-button>
      </div>
    </el-scrollbar>
    <div v-if="!renderOptions?.length" class="no-data">
      暂无数据
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.search {
  margin-bottom: 15px;
}

.items {
  .el-button {
    width: 100%;
    justify-content: flex-start;
  }
}

.no-data {
  font-size: var(--el-font-size-base);
  line-height: 1;
  padding: 12px 19px;
  color: var(--el-disabled-text-color);
}
</style>