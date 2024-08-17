<script setup lang="ts">
defineProps<{
  label: string
  suffixIcon?: any
}>()

const emit = defineEmits<{
  (e: 'click-suffix-icon'): void
}>()
</script>

<template>
  <div class="my-divider-title">
    <el-divider content-position="left">
      {{ label }}
    </el-divider>
    <el-button
      v-if="suffixIcon"
      type="primary"
      size="small"
      :icon="suffixIcon"
      circle
      @click="emit('click-suffix-icon')"
    >
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.my-divider-title {
  display: flex;
  align-items: center;
}
</style>
