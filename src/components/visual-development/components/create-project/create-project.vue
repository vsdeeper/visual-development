<script setup lang="ts">
import { ProjectFormDetail } from '../project-form-detail';

const show = ref(false);
const projectFormDetailRef = ref<InstanceType<typeof ProjectFormDetail>>();

function open() {
  show.value = true;
}

defineExpose({
  open,
  projectFormDetailRef,
});
</script>

<template>
  <el-dialog title="添加组件" v-model="show">
    <ProjectFormDetail ref="projectFormDetailRef"></ProjectFormDetail>
  </el-dialog>
</template>
