import ApiConfig from './ApiConfig.vue'
import { type ApiParamsItem, type Method } from '@/components'

export type ApiConfigInstance = InstanceType<typeof ApiConfig>
export interface ApiConfigModel {
  useGlobalApi?: string
  name?: string
  url?: string
  method?: Method
  params?: ApiParamsItem[]
  [key: string]: any
}

export { ApiConfig }
