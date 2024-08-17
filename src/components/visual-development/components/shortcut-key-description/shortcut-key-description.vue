<script setup lang="ts">
import { SHORTCUT_KEYS_OPTIONS } from './constants'

const show = ref(false)

function open() {
  show.value = true
}

defineExpose({
  open
})
</script>

<template>
  <el-dialog class="adaptive-dialog" title="快捷键" v-model="show">
    <div class="key-note-box">
      <template v-for="(item, index) in SHORTCUT_KEYS_OPTIONS" :key="`${item.name}${index}`">
        <div class="key-note">
          <div v-for="key in item.keys" :key="key" class="key">{{ key }}</div>
          <div class="note">{{ item.name }}</div>
        </div>
        <el-divider></el-divider>
      </template>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.key-note-box {
  padding: 16px 0 0;
}
.key-note {
  display: flex;
  align-items: center;

  .key {
    display: inline-flex;
    align-items: center;
    justify-content: space-around;
    font-size: 12px;
    line-height: 1;
    height: 22px;
    padding: 0 7px;
    border-radius: 4px;
    color: #fff;
    background-color: var(--el-color-primary);

    & + .key {
      margin-left: 2px;
    }
  }

  .note {
    margin-left: 15px;
    font-size: 14px;
  }
}
</style>
