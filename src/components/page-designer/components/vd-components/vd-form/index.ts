/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-09 09:14:36
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @LastEditTime: 2024-02-18 10:02:33
 * @Description:
 */
import { BaseDesignData } from '@/components'

export interface FormDesignDataOptions {
  [key: string]: any
}
export type FormDesignData = BaseDesignData<FormDesignDataOptions>