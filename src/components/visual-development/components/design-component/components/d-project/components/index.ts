import ApiDomain from './ApiDomain.vue'
import CommonField from './CommonField.vue'

export interface ApiDomainConfig {
  dev?: string
  test?: string
  prod?: string
}
export type ApiDomainInstance = InstanceType<typeof ApiDomain>
export { ApiDomain }

export type CommonFieldInstance = InstanceType<typeof CommonField>
export { CommonField }
