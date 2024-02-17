/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:14:46
 * @Description:
 */
import { BaseDesignData } from '@/components'

export interface RouterViewDesignDataOptions {
  components?: BaseDesignData<RouterViewDesignDataOptions>[]
}
export type RouterViewDesignData = BaseDesignData<RouterViewDesignDataOptions>