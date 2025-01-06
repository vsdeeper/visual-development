import { type BaseDesignData } from '../../../..'
import type { OptionsConfigItem } from '../../design-component/components'

export interface SaticDataConfigItem {
  key?: string
  value?: OptionsConfigItem[]
}
export interface ViewDesignDataOptions {
  name?: string
  saticDataConfig?: SaticDataConfigItem[]
}
export type ViewDesignData = BaseDesignData<ViewDesignDataOptions>
