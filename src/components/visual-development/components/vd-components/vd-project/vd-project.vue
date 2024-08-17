<script setup lang="ts">
import { type ProjectDesignData } from '.'
import { SHORTCUR_KEY_OPTIONS_OF_CONTAINER_COMPONENT } from '../constants'

defineProps<{
  data: ProjectDesignData
}>()
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-project']"
    :data="data"
    :shortcut-key-options="[...SHORTCUR_KEY_OPTIONS_OF_CONTAINER_COMPONENT, { keys: ['V', 'E'] }]"
  >
  </DesignSkeleton>
</template>
