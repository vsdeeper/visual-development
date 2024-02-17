/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:15:01
 * @Description:
 */
import { BaseDesignData } from '@/components'

export interface ContainerDesignDataOptions {
  direction?: 'horizontal' | 'vertical'
  components?: BaseDesignData<ContainerDesignDataOptions>[]
}
export type ContainerDesignData = BaseDesignData<ContainerDesignDataOptions>