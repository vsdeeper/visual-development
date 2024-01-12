<script setup lang="ts">
import { MergeDesignData } from '@/components'
import { IdEditor, ProjectNameEditor, DirectionEditor } from '../property-editor'

defineProps<{
  formData: MergeDesignData
}>()
</script>

<template>
  <IdEditor :form-data="formData"></IdEditor>
  <ProjectNameEditor :form-data="formData"></ProjectNameEditor>
  <DirectionEditor :form-data="formData"></DirectionEditor>
</template>