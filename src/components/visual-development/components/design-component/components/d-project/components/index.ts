import ApiDomain from './ApiDomain.vue'

export interface ApiDomainConfig {
  dev?: string
  test?: string
  prod?: string
}
export type ApiDomainInstance = InstanceType<typeof ApiDomain>
export { ApiDomain }
