<!--
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 10:45:24
 * @Description:
-->
<script setup lang="ts">
import { AsideDesignData } from '.'

defineProps<{
  config: AsideDesignData
}>()
</script>

<template>
  <div class="vd-aside">
    <div class="header">
      <span>Aside</span>
    </div>
    <div class="footer">
      <ShortcutKeyTip :keys="['A', 'C']" label="添加组件"></ShortcutKeyTip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vd-aside {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>