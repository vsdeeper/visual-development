import ApiConfig from './ApiConfig.vue'
import { type ApiParamsItem, type Method } from '@/components'

export type ApiConfigInstance = InstanceType<typeof ApiConfig>
export interface ApiConfigModel {
  api?: string
  apiMethod?: Method
  apiParams?: ApiParamsItem[]
  [key: string]: any
}

export { ApiConfig }
