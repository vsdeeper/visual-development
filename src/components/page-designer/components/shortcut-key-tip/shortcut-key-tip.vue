<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-09 09:14:36
 * @Description:
-->

<script setup lang='ts'>
import { useGlobal } from '@/stores'
import { ActiveDesignData, AddComponentInstance } from '../..'
import { type ShortcutKeyOptionItem } from '.'
import { addComponentRefSymbol } from '@/utils/constants'
import { isLayoutContainer } from '../../util'

defineProps<{
  options: ShortcutKeyOptionItem[]
  activeDesignData: ActiveDesignData
}>()

const emit = defineEmits<{
  (e: 'click-shortcut-key', item: ShortcutKeyOptionItem, data: ActiveDesignData): void
}>()

const { setActiveDesignData } = useGlobal()
const addComponentRef = inject<Ref<AddComponentInstance>>(addComponentRefSymbol)

function clickShortcutKey(item: ShortcutKeyOptionItem, data: ActiveDesignData) {
  setActiveDesignData(data)
  if (isLayoutContainer(data)) {
    // 当前不存在设计中的组件或当前设计组件是布局容器类组件，进行添加组件操作
    addComponentRef?.value.open()
  }
  emit('click-shortcut-key', item, data)
}
</script>

<template>
  <div class='shortcut-key-tip'>
    <div class="item" v-for="(item, index) in options" :key="item.label + index" @click="clickShortcutKey(item, activeDesignData)">
      <div class="label">{{ item.label }}</div>
      <div class="key" v-for="key in item.keys" :key="key">{{ key.toUpperCase() }}</div>
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
      width: 18px;
      border-radius: 4px;
      color: #fff;
      background-color: var(--el-text-color-placeholder);

      &+div.key {
        margin-left: 2px;
      }
    }
  }

}
</style>