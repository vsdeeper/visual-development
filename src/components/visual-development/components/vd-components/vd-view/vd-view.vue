<script setup lang="ts">
import { type ViewDesignData } from '.'
import { SHORTCUR_KEY_OPTIONS_OF_CONTAINER_COMPONENT } from '../constants'

defineProps<{
  data: ViewDesignData
}>()
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-view']"
    :data="data"
    :shortcut-key-options="[...SHORTCUR_KEY_OPTIONS_OF_CONTAINER_COMPONENT, { keys: ['V', 'E'] }]"
  >
  </DesignSkeleton>
</template>
