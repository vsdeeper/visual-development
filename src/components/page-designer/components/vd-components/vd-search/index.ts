/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-11 14:36:22
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @LastEditTime: 2024-02-13 20:24:05
 * @Description:
 */

import { BaseDesignData, Method } from '@/components'

export type SearchConditionType = 'Input' | 'InputNumber' | 'Select' | 'Cascader' | 'DatePicker'
export type DateType = 'year' | 'month' | 'date' | 'dates' | 'datetime' | 'week' | 'datetimerange' | 'daterange' | 'monthrange'
export interface SearchConditionOptionItem {
  label?: string
  value?: string
}
export interface SearchConditionItem {
  filedName?: string
  type?: SearchConditionType
  placeholder?: string
  dataSource?: 'api' | 'custom'
  api?: string
  method?: Extract<Method, 'GET'>
  options?: SearchConditionOptionItem[]
  itemLabel?: string
  itemValue?: string
  itemChildren?: string
  multiple?: boolean
  checkStrictly?: boolean
  lazy?: boolean
  defaultValue?: unknown
  format?: string
  valueFormat?: string
  dateType?: DateType
  virtualized?: boolean
}

export type SearchDesignData = BaseDesignData<{
  searchConditionItems?: SearchConditionItem[]
}>;
