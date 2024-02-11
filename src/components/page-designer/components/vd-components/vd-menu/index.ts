/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-09 09:14:36
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @LastEditTime: 2024-02-11 21:41:08
 * @Description:
 */

import { BaseDesignData } from '@/components'

export type MenuDesignData = BaseDesignData<{
  mode?: 'horizontal' | 'vertical';
  router?: boolean
  popperEffect?: 'dark' | 'light';
  api?: string
  method?: 'GET'
}>;
