import OptionsConfig from './OptionsConfig.vue'

export interface OptionsConfigItem {
  label?: string
  value?: any
  valueType?: 'string' | 'number'
}
export type OptionsConfigInstance = InstanceType<typeof OptionsConfig>
export { OptionsConfig }
