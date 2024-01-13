/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:14:46
 * @Description:
 */
import { BaseDesignData } from '@/components'

interface Options {
  width ?: string
  components?: BaseDesignData<Options>[]
}
export type AsideDesignData = BaseDesignData<Options>