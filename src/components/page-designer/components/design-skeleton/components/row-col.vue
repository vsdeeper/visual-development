<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-31 22:31:39
 * @LastEditTime: 2024-02-02 11:36:11
 * @LastEditors: Please set LastEditors
 * @Description: 栅格设计骨架
-->
<script setup lang="ts">
import draggable from 'vuedraggable'
import { MergeDesignData, VdComponents } from '@/components'
import { isActiveDesign, isRowComponent } from '@/components/page-designer/util'
import { useGlobal } from '@/stores'
import { genStyle } from '../util'

defineProps<{
  data: MergeDesignData
  isActive?: boolean
}>()
</script>

<template>
  <!-- 在布局-row组件中添加组件时 -->
  <el-row v-if="isRowComponent(data)" :gutter="10">
    <draggable
      :list="data.options?.components"
      :component-data="{
        type: 'transition-group'
      }"
      v-bind="{
        animation: 300,
        group: 'design-skeleton-draggable'
      }"
      item-key="id"
    >
      <template #item="{ element: item }">
        <el-col>
          <component
            :is ="VdComponents[(item as MergeDesignData).type]"
            :data="item"
            :is-active="isActiveDesign(item.id, useGlobal().activeDesignData)"
          ></component>
        </el-col>
      </template>
    </draggable>
  </el-row>
  <!-- 在布局-col组件中添加组件时 -->
  <draggable
    v-else
    :list="data.options?.components"
    :component-data="{
      type: 'transition-group'
    }"
    v-bind="{
      animation: 300,
      group: 'design-skeleton-draggable'
    }"
    item-key="id"
  >
    <template #item="{ element: item }">
      <div class="group-item" :style="genStyle(item)">
        <component
          :is="VdComponents[(item as MergeDesignData).type]"
          :data="item"
          :is-active="isActiveDesign(item.id, useGlobal().activeDesignData)"
        ></component>
      </div>
    </template>
  </draggable>
</template>