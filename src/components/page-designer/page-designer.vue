<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-06 23:44:58
 * @Description:
-->

<script setup lang="ts">
import { useGlobal } from '@/stores'
import { KeyOfPageDesignerDataModel, SubComponentsOfPageDesigner, SubComponentsTypeOfPageDesigner, addComponentOptions } from '.'
import { AddComponent, AddComponentOptionItem } from '@/components'
import { capitalizeFirstLetter, uncapitalizeFirstLetter } from '@/utils'
import { AsideConfigData } from './components/vd-aside'

withDefaults(defineProps<{
  width?: string
}>(), {
  width: '100%'
})

console.log('SubComponentsOfPageDesigner 表单设计子组件', SubComponentsOfPageDesigner)

const { pageDesignerData, setPageDesignerData } = useGlobal()
const addComponentRef = ref<InstanceType<typeof AddComponent>>()
const key = ref('')

function handleKeydown(e: KeyboardEvent) {
  key.value += e.key.toUpperCase()
  if (key.value.includes('VD')) {
    // v+d键，打开组件选择弹框
    addComponentRef.value?.open()
  }
}

function handleKeyup() {
  if (key.value.includes('VD')) key.value = ''
}

function selectComponent(item: AddComponentOptionItem) {
  setPageDesignerData(uncapitalizeFirstLetter(item.value) as KeyOfPageDesignerDataModel, createPageDesignerData(item))
}

function transKey(key: KeyOfPageDesignerDataModel) {
  return capitalizeFirstLetter(key) as SubComponentsTypeOfPageDesigner
}

function createPageDesignerData(item: AddComponentOptionItem) {
  switch (item.value) {
    case 'Aside': {
      return {
        id: item.value.toLowerCase(),
        label: item.label,
        options: {}
      } as AsideConfigData
    }
    case 'FormDesigner': {
      return {
        id: item.value.toLowerCase(),
        label: item.label,
        options: {}
      }
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  window.addEventListener('keyup', handleKeyup)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('keyup', handleKeyup)
})
</script>

<template>
  <div id="page-designer" :style="{ width }">
    <span v-if="!Object.keys(pageDesignerData).length" class="placeholder">按 V + D 键添加组件</span>
    <template v-for="(val, key) in pageDesignerData" :key="key">
      <component :is="SubComponentsOfPageDesigner[`${transKey(key)}`]" :config="val"></component>
    </template>
  </div>
  <AddComponent ref="addComponentRef" :options="addComponentOptions" @select="selectComponent"></AddComponent>
</template>

<style lang="scss" scoped>
#page-designer {
  position: relative;
  height: 100%;

  .placeholder {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>