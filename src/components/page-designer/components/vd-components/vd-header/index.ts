/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:14:46
 * @Description:
 */
import { BaseDesignData } from '@/components'

export interface HeaderDesignDataOptions {
  height ?: string
  components?: BaseDesignData<HeaderDesignDataOptions>[]
}
export type HeaderDesignData = BaseDesignData<HeaderDesignDataOptions>