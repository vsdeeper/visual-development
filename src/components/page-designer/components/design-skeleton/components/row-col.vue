<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-31 22:31:39
 * @LastEditTime: 2024-02-01 23:04:06
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @Description: 栅格设计骨架
-->
<script setup lang="ts">
import draggable from 'vuedraggable'
import { MergeDesignData, VdComponents } from '@/components'
import { isActiveDesign } from '@/components/page-designer/util'
import { useGlobal } from '@/stores'

defineProps<{
  data: MergeDesignData
  isActive?: boolean
}>()
</script>

<template>
  <el-row :gutter="20">
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
        <el-col v-if="(item as MergeDesignData).type === 'RowCol'">
          <component
            :is="VdComponents[(item as MergeDesignData).type]"
            :data="item"
            :is-active="isActiveDesign(item.id, useGlobal().activeDesignData)"
          ></component>
        </el-col>
        <div v-else class="group-item">
          <component
            :is="VdComponents[(item as MergeDesignData).type]"
            :data="item"
            :is-active="isActiveDesign(item.id, useGlobal().activeDesignData)"
          ></component>
        </div>
      </template>
    </draggable>
  </el-row>
</template>