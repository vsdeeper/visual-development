<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-09 09:14:36
 * @Description:
-->

<script setup lang='ts'>
import { useGlobal } from '@/stores'
import { ActiveDesignData, AddComponentInstance } from '../..'
import { type ShortcutKeyOptionItem } from '.'
import { addComponentRefSymbol, designComponentRefSymbol } from '@/utils/constants'

defineProps<{
  options: ShortcutKeyOptionItem[]
  activeDesignData: ActiveDesignData
  showMore?: boolean
}>()

const emit = defineEmits<{
  (e: 'click-shortcut-key', item: ShortcutKeyOptionItem, data: ActiveDesignData): void
  (e: 'show-more'): void
}>()

const { setIsPageDesignerActive, setActiveDesignData } = useGlobal()
const addComponentRef = inject<Ref<AddComponentInstance>>(addComponentRefSymbol)
const designComponentRef = inject<Ref<AddComponentInstance>>(designComponentRefSymbol)

function clickShortcutKey(item: ShortcutKeyOptionItem, data: ActiveDesignData) {
  if (item && data) {
    setIsPageDesignerActive(false)
    setActiveDesignData(data)
    if (item.keys?.join('') === 'VA') {
      // 添加组件
      addComponentRef?.value.open()
    } else if (item.keys?.join('') === 'VD') {
      // 设计组件
      designComponentRef?.value.open()
    }
  }
  emit('click-shortcut-key', item, data)
}
</script>

<template>
  <div class='shortcut-key-tip'>
    <div class="item" v-for="(item, index) in options" :key="index" @click="clickShortcutKey(item, activeDesignData)">
      <div class="label">{{ item.label }}</div>
      <div class="key" v-for="key in item.keys" :key="key">{{ key.toUpperCase() }}</div>
      <el-tooltip v-if="showMore" content="快捷键" placement="right" effect="customized">
        <div class="key tip" @click.stop="emit('show-more')">?</div>
      </el-tooltip>
    </div>
  </div>
</template>

<style lang='scss' scoped>
.shortcut-key-tip {
  cursor: pointer;
  padding: 5px;

  .item {
    display: inline-flex;
    align-items: center;

    &+.item {
      margin-left: 10px;
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
      padding: 0 6px;
      border-radius: 4px;
      color: #fff;
      background-color: var(--el-text-color-placeholder);

      &.tip {
        background-color: var(--el-text-color-placeholder) !important;
      }

      &+div.key {
        margin-left: 2px;
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