import { type BaseDesignData } from '@/components'
import type { ApiDomainConfig } from '../../design-component/components/d-project/components'

export interface ProjectDesignDataOptions {
  name?: string
  gitUrl?: string
  apiDomain?: ApiDomainConfig
  apiBasePath?: string
  description?: string
}
export type ProjectDesignData = BaseDesignData<ProjectDesignDataOptions>
