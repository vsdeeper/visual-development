import { type BaseDesignData } from '@/components'
import type { ApiDomainConfig } from '../../design-component/components/d-project/components'
import type { ApiConfigModel } from '../../design-component/components'

export interface ProjectDesignDataOptions {
  name?: string
  gitUrl?: string
  apiDomain?: ApiDomainConfig
  apiBasePath?: string
  npmrc?: string
  // commonField?: Record<string, any>
  globalApiConfig?: ApiConfigModel[]
  description?: string
}
export type ProjectDesignData = BaseDesignData<ProjectDesignDataOptions>
