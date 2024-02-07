/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:15:01
 * @Description:
 */
import { BaseDesignData } from '@/components'

interface Options {
  direction?: 'horizontal' | 'vertical'
  components?: BaseDesignData<Options>[]
}
export type ContainerDesignData = BaseDesignData<Options>