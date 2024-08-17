<script setup lang="ts">
import { type InputInstance } from 'element-plus'
import { type AddComponentOptionItem, type AddComponentGroupOptionItem } from '.'
import { useGlobal } from '@/stores'
import type { ActiveDesignData, PresetDataItem } from '../..'
import { ADD_COMPONENT_OPTIONS, PRESET_DATA_KEY } from '../../constants'
import localforage from 'localforage'

const emit = defineEmits<{
  (e: 'select', val: AddComponentOptionItem): void
}>()

const searchRef = ref<InputInstance>()
const show = ref(false)
const word = ref()
const renderOptions = ref<AddComponentGroupOptionItem[]>([])
const sourceOptions = ref<AddComponentGroupOptionItem[]>([])

watch(word, (word) => {
  const copySourceOptions: AddComponentGroupOptionItem[] = JSON.parse(
    JSON.stringify(sourceOptions.value)
  )
  renderOptions.value = copySourceOptions.filter((groupItem) => {
    groupItem.children = groupItem.children.filter(
      (e) =>
        e.label.includes(word ?? '') || e.value.toLowerCase().includes((word ?? '').toLowerCase())
    )
    return !!groupItem.children.length
  })
})

function select(val: AddComponentOptionItem) {
  show.value = false
  emit('select', val)
}

async function open() {
  show.value = true
  word.value = undefined
  const { activeDesignData } = useGlobal()
  renderOptions.value = await filterAddComponentOptions(ADD_COMPONENT_OPTIONS, activeDesignData)
  sourceOptions.value = JSON.parse(JSON.stringify(renderOptions.value))
}

function opened() {
  searchRef.value?.focus()
}

async function filterAddComponentOptions(
  options: AddComponentGroupOptionItem[],
  activeDesignData?: ActiveDesignData
) {
  const _options: AddComponentGroupOptionItem[] = JSON.parse(JSON.stringify(options))
  // 将预设数据加入到选项
  const presetData: PresetDataItem[] | null = await localforage.getItem(PRESET_DATA_KEY)
  if (presetData) {
    const find = _options.find((e) => e.id === 'MyPreset')
    if (find) {
      find.children = presetData.map((e) => ({
        label: e.name,
        value: e.type,
        presetId: e.id,
        desc: e.desc,
        disabled: false
      }))
    }
  }
  if (!activeDesignData /**不存在当前设计数据，即初始状态，只能添加项目组件 */) {
    _options.forEach((optionItem) =>
      optionItem.id === 'ProjectContainer'
        ? optionItem.children.forEach((item) =>
            item.value === 'Project' ? (item.disabled = false) : (item.disabled = true)
          )
        : optionItem.children.forEach((item) => (item.disabled = true))
    )
  } else {
    // 存在设计数据，不能添加项目组件
    // 判断是在项目组件上添加还是在其他组件上添加
    // 项目组件上只能添加视图组件
    // 视图组件上只能添加除项目组件、视图组件之外的组件
    const flattenOptions = _options.reduce((prev: AddComponentOptionItem[], cur) => {
      return [...prev, ...cur.children]
    }, [])

    if (activeDesignData.type === 'Project') {
      flattenOptions.map((item) => {
        if (item.value === 'View') item.disabled = false
        else item.disabled = true
      })
    } else if (activeDesignData.type === 'View') {
      flattenOptions.map((item) => {
        if (item.value === 'Project' || item.value === 'View') item.disabled = true
        else item.disabled = false
      })
    } else {
      flattenOptions.map((item) => {
        if (item.value === 'Project' || item.value === 'View') item.disabled = true
        else item.disabled = false
      })
    }
  }
  return _options
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog class="adaptive-dialog" title="添加组件" v-model="show" @opened="opened">
    <div class="search">
      <el-input
        ref="searchRef"
        v-model="word"
        placeholder="请输入关键词"
        size="large"
        clearable
      ></el-input>
    </div>
    <el-scrollbar max-height="350px">
      <template v-for="groupItem in renderOptions" :key="groupItem.id">
        <div v-if="groupItem.children.length" class="group-items">
          <div class="name">{{ groupItem.name }}</div>
          <div class="item" v-for="item in groupItem.children" :key="item.value">
            <el-button
              :type="item.disabled ? 'info' : 'primary'"
              text
              size="large"
              :disabled="item.disabled"
              @click="select(item)"
            >
              {{ item.label }} - {{ item.value }}
            </el-button>
          </div>
        </div>
      </template>
    </el-scrollbar>
    <div v-if="!renderOptions?.length" class="no-data">暂无数据</div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.search {
  margin-bottom: 15px;
}

.group-items {
  .name {
    font-size: 12px;
    margin: 10px 0;
    padding: 0 10px;
    color: var(--el-text-color-placeholder);
  }

  .item {
    .el-button {
      width: 100%;
      justify-content: flex-start;
    }
    .el-text {
      padding: 0 19px;
      font-size: 12px;
      color: var(--el-color-info-light-5);
    }
  }
}

.no-data {
  font-size: var(--el-font-size-base);
  line-height: 1;
  padding: 12px 19px;
  color: var(--el-disabled-text-color);
}
</style>
