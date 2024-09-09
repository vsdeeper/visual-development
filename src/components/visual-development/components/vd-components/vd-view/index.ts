import { type BaseDesignData } from '@/components'
import type { OptionsConfigItem } from '../../design-component/components'

export interface ViewDesignDataOptions {
  name?: string
  constants?: OptionsConfigItem[]
}
export type ViewDesignData = BaseDesignData<ViewDesignDataOptions>
