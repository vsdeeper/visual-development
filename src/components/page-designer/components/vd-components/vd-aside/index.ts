/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:14:46
 * @Description:
 */
import { BaseDesignData } from '@/components'

export interface AsideDesignDataOptions {
  width ?: string
  components?: BaseDesignData<AsideDesignDataOptions>[]
}
export type AsideDesignData = BaseDesignData<AsideDesignDataOptions>