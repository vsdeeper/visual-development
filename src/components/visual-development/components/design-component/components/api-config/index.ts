import ApiConfig from './ApiConfig.vue'
import { type ApiParamsItem, type Method } from '../../../..'

export type ApiConfigInstance = InstanceType<typeof ApiConfig>
export interface ApiConfigModel {
  name?: string
  url?: string
  method?: Method
  params?: ApiParamsItem[]
  [key: string]: any
}

export { ApiConfig }
