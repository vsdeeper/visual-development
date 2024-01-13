<script setup lang="ts">
import { MergeDesignData } from '@/components'
import { IdEditor, ProjectNameEditor, DirectionEditor, ComponentPathEditor } from '../property-editor'
import { isRootComponent } from '@/components/page-designer/util'
import { useGlobal } from '@/stores'

defineProps<{
  formData: MergeDesignData
}>()
</script>

<template>
  <IdEditor :form-data="formData"></IdEditor>
  <ProjectNameEditor v-if="isRootComponent(formData.id, useGlobal().designData)" :form-data="formData"></ProjectNameEditor>
  <ComponentPathEditor v-else :form-data="formData"></ComponentPathEditor>
  <DirectionEditor :form-data="formData"></DirectionEditor>
</template>