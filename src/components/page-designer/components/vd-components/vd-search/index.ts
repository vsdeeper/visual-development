/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:14:46
 * @Description: logo可视化开发组件
 */
import { BaseDesignData } from '@/components'

export type SearchConditionType = 'Input' | 'InputNumber' | 'Select' | 'Cascader' | 'DatePicker'
export interface SearchConditionOptionItem {
  label?: string
  value?: string
}
export interface SearchConditionItem {
  filedName?: string
  type?: SearchConditionType
  placeholder?: string
  itemLabel?: string
  itemValue?: string
  itemChildren?: string
  dataSource?: 'api' | 'custom'
  api?: string
  method?: 'GET'
  options?: SearchConditionOptionItem[]
  multiple?: boolean
  defaultValue?: unknown
  format?: string
  valueFormat?: string
  dateType?: 'year' | 'month' | 'date' | 'dates' | 'datetime' | 'week' | 'datetimerange' | 'daterange' | 'monthrange'
  virtualized?: boolean
}

export type SearchDesignData = BaseDesignData<{
  searchConditionItems?: SearchConditionItem[]
}>;
