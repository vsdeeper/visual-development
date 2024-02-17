/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-09 09:14:36
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @LastEditTime: 2024-02-17 20:49:31
 * @Description:
 */

import { BaseDesignData, Method } from '@/components'

export interface MenuDesignDataOptions {
  mode?: 'horizontal' | 'vertical';
  router?: boolean
  popperEffect?: 'dark' | 'light';
  api?: string
  method?: Extract<Method, 'GET'>
  params?: Record<string, any>
}
export type MenuDesignData = BaseDesignData<MenuDesignDataOptions>;
