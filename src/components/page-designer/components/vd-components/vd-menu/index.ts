/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:14:46
 * @Description:
 */
import { BaseDesignData } from '@/components'

export interface MenuItem {
  id: string
  name: string
  icon?: any
  children?: MenuItem[]
}

export type MenuDesignData = BaseDesignData<{
  mode?: 'horizontal' | 'vertical';
  defaultActive?: string;
  collapse?: boolean
  menuData?: MenuItem[]
}>;
