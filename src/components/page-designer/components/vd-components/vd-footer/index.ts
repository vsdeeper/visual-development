/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:14:46
 * @Description:
 */
import { BaseDesignData } from '@/components'

export interface FooterDesignDataOptions {
  height ?: string
  components?: BaseDesignData<FooterDesignDataOptions>[]
}
export type FooterDesignData = BaseDesignData<FooterDesignDataOptions>