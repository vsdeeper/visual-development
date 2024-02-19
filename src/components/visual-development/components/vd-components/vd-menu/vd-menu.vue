<script setup lang="ts">
import { MenuDesignData } from '.';

defineProps<{
  data: MenuDesignData;
}>();
</script>

<template>
  <DesignSkeleton
    :class-list="['vd-menu']"
    :data="data"
    :shortcut-key-options="[{ keys: ['Delete'] }, { keys: ['V', 'D'] }]"
  >
  </DesignSkeleton>
</template>
