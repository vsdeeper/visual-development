<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-06 23:44:58
 * @Description:
-->

<script setup lang="ts">
import { useGlobal } from '@/stores'
import { KeyOfPageDesignerConfigData, SubComponentsOfPageDesigner, SubComponentsTypeOfPageDesigner } from '.'
import { AddComponent, AddComponentOptionItem } from '@/components'
import { capitalizeFirstLetter } from '@/utils'

withDefaults(defineProps<{
  width?: string
}>(), {
  width: '100%'
})

console.log('SubComponentsOfPageDesigner', SubComponentsOfPageDesigner)

const { pageDesignerData, setPageDesignerData } = useGlobal()
const addComponentRef = ref<InstanceType<typeof AddComponent>>()
const key = ref('')
const options = ref<AddComponentOptionItem[]>([
  { label: '视图', value: 'View' },
  { label: '主体', value: 'Main' },
  { label: '路由', value: 'RouterView' },
  { label: '容器', value: 'Container' },
  { label: '侧栏', value: 'Aside' },
  { label: '头部', value: 'Header' },
  { label: '底部', value: 'Footer' },
  { label: '布局', value: 'Layout' },
])

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

function selectComponent(item: AddComponentOptionItem, data: unknown) {
  setPageDesignerData(item.value.toLowerCase() as KeyOfPageDesignerConfigData, data)
}

function transKey(key: KeyOfPageDesignerConfigData) {
  return capitalizeFirstLetter(key) as SubComponentsTypeOfPageDesigner
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
  <AddComponent ref="addComponentRef" :options="options" @select="selectComponent"></AddComponent>
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