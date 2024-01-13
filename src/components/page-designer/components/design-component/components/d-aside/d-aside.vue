<script setup lang="ts">
import { MergeDesignData } from '@/components'
import { IdEditor, ProjectNameEditor } from '../property-editor'
import { isRootComponent } from '@/components/page-designer/util'

defineProps<{
  formData: MergeDesignData
}>()
</script>

<template>
  <IdEditor :form-data="formData"></IdEditor>
  <ProjectNameEditor v-if="isRootComponent(formData.id, useGlobal().designData)" :form-data="formData"></ProjectNameEditor>
  <ComponentPathEditor v-else :form-data="formData"></ComponentPathEditor>
</template>