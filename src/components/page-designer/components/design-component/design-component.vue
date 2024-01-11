<script setup lang="ts">
import { ActiveDesignData } from '../..'

defineProps<{
  data: ActiveDesignData
}>()

const show = ref(false)

function open() {
  show.value = true
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog title="设计组件" v-model="show">
    {{ data }}
  </el-dialog>
</template>