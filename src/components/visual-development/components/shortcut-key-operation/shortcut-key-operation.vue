<script setup lang="ts">
import { setActiveDesignData, designData, activeDesignData } from '@/stores'
import {
  type ActiveDesignData,
  type AddComponentInstance,
  type ExportImportDataInstance,
  type ViewDesignData,
} from '../..'
import { type ShortcutKeyOptionItem } from '.'
import {
  ADD_COMPONENT_REF_SYMBOL,
  DESIGN_COMPONENT_REF_SYMBOL,
  EXPORT_IMPORT_DATA_REF_SYMBOL,
} from '@/utils/constants'
import { deleteComponent } from '../../util'

const props = defineProps<{
  data?: ActiveDesignData
  options?: ShortcutKeyOptionItem[]
  showMore?: boolean
  usedInRootComponent?: boolean
}>()

const emit = defineEmits<{
  (e: 'show-more'): void
}>()

const addComponentRef = inject<Ref<AddComponentInstance>>(ADD_COMPONENT_REF_SYMBOL)
const designComponentRef = inject<Ref<AddComponentInstance>>(DESIGN_COMPONENT_REF_SYMBOL)
const exportImportDataRef = inject<Ref<ExportImportDataInstance>>(EXPORT_IMPORT_DATA_REF_SYMBOL)

function clickShortcutKey(item: ShortcutKeyOptionItem, data?: ActiveDesignData) {
  if (props.usedInRootComponent) {
    // 在根组件中使用
    setActiveDesignData(undefined)
    addComponentRef?.value.open()
  } else {
    if (!data) return
    const _keysStr = item.keys?.join('').toUpperCase()
    if (_keysStr === 'VA') {
      // 添加组件
      if (activeDesignData.value?.id !== data?.id) setActiveDesignData(data)
      addComponentRef?.value.open()
    } else if (_keysStr === 'VD') {
      // 设计组件
      if (activeDesignData.value?.id !== data?.id) setActiveDesignData(data)
      designComponentRef?.value.open()
    } else if (_keysStr === 'DELETE') {
      // 删除组件
      deleteComponent(data, designData.value)
    } else if (_keysStr === 'VE') {
      // 导出/导入数据
      if (activeDesignData.value?.id !== data?.id) setActiveDesignData(data)
      exportImportDataRef?.value.open(data as ViewDesignData)
    }
  }
}
</script>

<template>
  <div class="shortcut-key-operation">
    <template v-for="(item, index) in options" :key="index">
      <el-popconfirm
        v-if="item.keys?.join('') === 'Delete'"
        title="确定删除吗？"
        confirm-button-text="是"
        cancel-button-text="否"
        @confirm="clickShortcutKey(item, data)"
      >
        <template #reference>
          <div class="item">
            <div v-if="item.label" class="label">{{ item.label }}</div>
            <div class="key" v-for="key in item.keys" :key="key">{{ key }}</div>
          </div>
        </template>
      </el-popconfirm>
      <div v-else class="item" @click="clickShortcutKey(item, data)">
        <div v-if="item.label" class="label">{{ item.label }}</div>
        <div class="key" v-for="key in item.keys" :key="key">{{ key }}</div>
        <el-tooltip
          v-if="showMore"
          content="快捷键"
          :placement="designData.length ? 'top' : 'right'"
          effect="customized"
        >
          <div class="key tip" @click.stop="emit('show-more')">?</div>
        </el-tooltip>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.shortcut-key-operation {
  cursor: pointer;
  padding: 5px;

  .item {
    display: inline-flex;
    align-items: center;

    & + .item {
      margin-left: 5px;
    }

    .label {
      font-size: 12px;
      color: var(--el-text-color-placeholder);
      margin-right: 5px;
    }

    .key {
      display: inline-flex;
      align-items: center;
      justify-content: space-around;
      font-size: 10px;
      line-height: 1;
      height: 18px;
      min-width: 18px;
      box-sizing: border-box;
      padding: 0 6px;
      border-radius: 4px;
      color: #fff;
      background-color: var(--el-text-color-placeholder);

      &.tip {
        background-color: var(--el-text-color-placeholder) !important;
      }

      & + div.key {
        margin-left: 1px;
      }
    }
  }
}
</style>

<style>
.el-popper.is-customized {
  /* Set padding to ensure the height is 32px */
  padding: 6px 12px;
  background: linear-gradient(90deg, rgb(159, 229, 151), rgb(204, 229, 129));
}

.el-popper.is-customized .el-popper__arrow::before {
  background: linear-gradient(45deg, #b2e68d, #bce689);
  right: 0;
}
</style>
