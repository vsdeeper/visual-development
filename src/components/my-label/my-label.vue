<script setup lang="ts">
import { QuestionFilled } from '@element-plus/icons-vue'

withDefaults(
  defineProps<{
    label: string
    tooltipEffect?: 'dark' | 'light'
    tooltipPlacement?:
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'left'
      | 'left-start'
      | 'left-end'
      | 'right'
      | 'right-start'
      | 'right-end'
    tooltipIcon?: any
    tooltipIconColor?: string
    tooltipIconLink?: boolean
    tooltipContent?: string
  }>(),
  {
    tooltipIconColor: '#ffae1f',
    tooltipIconLink: false,
    tooltipPlacement: 'top',
    tooltipIcon: () => QuestionFilled,
  },
)

const emit = defineEmits<{
  (e: 'click-tooltip-icon'): void
}>()
</script>

<template>
  <div class="my-label">
    {{ label }}
    <el-tooltip
      v-if="tooltipContent || $slots['tooltip-content']"
      :effect="tooltipEffect"
      :placement="tooltipPlacement"
    >
      <template #content>
        <slot name="tooltip-content">
          {{ tooltipContent }}
        </slot>
      </template>
      <el-icon
        :class="{ link: tooltipIconLink }"
        :color="tooltipIconColor"
        @click.stop="emit('click-tooltip-icon')"
      >
        <component :is="tooltipIcon"></component>
      </el-icon>
    </el-tooltip>
  </div>
</template>

<style lang="scss" scoped>
.my-label {
  display: inline-flex;
  align-items: center;
  .el-icon {
    margin-left: 3px;
    &.link {
      cursor: pointer;
    }
  }
}
</style>
