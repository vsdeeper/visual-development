<script setup lang="ts">
import { FormInstance } from 'element-plus';
import { ActiveDesignData } from '../..';
import { DesignComponent } from './components';

defineProps<{
  formData: ActiveDesignData;
}>();

const formRef = ref<FormInstance>();
const show = ref(false);

function open() {
  show.value = true;
}

defineExpose({
  open,
});
</script>

<template>
  <el-dialog title="设计组件" v-model="show">
    <div class="design-component">
      <el-form ref="formRef" :model="formData" label-position="top">
        <component v-if="formData" :is="DesignComponent[formData.type]" :form-data="formData"></component>
      </el-form>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.design-component {
  :deep(.el-input-number) {
    flex: 1;
  }

  :deep(.el-select) {
    flex: 1;
  }
}
</style>
