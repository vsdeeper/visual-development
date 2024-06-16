import { type BaseDesignData } from '@/components'

export interface ProjectDesignDataOptions {
  name?: string
  git?: string
  description?: string
}
export type ProjectDesignData = BaseDesignData<ProjectDesignDataOptions>
