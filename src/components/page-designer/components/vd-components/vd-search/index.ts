/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:14:46
 * @Description: logo可视化开发组件
 */
import { BaseDesignData } from '@/components'

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
  method?: 'GET'
  options?: SearchConditionOptionItem[]
  itemLabel?: string
  itemValue?: string
  multiple?: boolean
  defaultValue?: unknown
  format?: string
  valueFormat?: string
  dateType?: DateType
  virtualized?: boolean
}

export type SearchDesignData = BaseDesignData<{
  searchConditionItems?: SearchConditionItem[]
}>;
