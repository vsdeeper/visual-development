/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:14:46
 * @Description:
 */
import { BaseDesignData } from '@/components'

export interface ViewDesignDataOptions {
  name?: string
  components?: BaseDesignData<ViewDesignDataOptions>[]
}
export type ViewDesignData = BaseDesignData<ViewDesignDataOptions>