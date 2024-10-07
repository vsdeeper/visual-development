import ApiDomain from './ApiDomain.vue'
import CommonField from './CommonField.vue'
import GlobalApiConfig from './GlobalApiConfig.vue'

export type GlobalApiConfigInstance = InstanceType<typeof GlobalApiConfig>
export { GlobalApiConfig }
export interface ApiDomainConfig {
  dev?: string
  test?: string
  prod?: string
}
export type ApiDomainInstance = InstanceType<typeof ApiDomain>
export { ApiDomain }

export type CommonFieldInstance = InstanceType<typeof CommonField>
export { CommonField }
