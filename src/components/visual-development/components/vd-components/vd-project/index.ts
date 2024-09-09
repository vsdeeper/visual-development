import { type BaseDesignData } from '@/components'
import type { ApiDomainConfig } from '../../design-component/components/d-project/components'
import type { OptionsConfigItem } from '../../design-component/components'

export interface ProjectDesignDataOptions {
  name?: string
  gitUrl?: string
  apiDomain?: ApiDomainConfig
  apiBasePath?: string
  npmrc?: string
  commonField?: Record<string, any>
  constants?: OptionsConfigItem[]
  description?: string
}
export type ProjectDesignData = BaseDesignData<ProjectDesignDataOptions>
