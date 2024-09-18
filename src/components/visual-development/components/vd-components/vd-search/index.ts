import { type BaseDesignData } from '@/components'
import type { ApiConfigModel } from '../../design-component/components'

export type SearchConditionType = 'Input' | 'InputNumber' | 'Select' | 'Cascader' | 'DatePicker'
export type DateType =
  | 'year'
  | 'month'
  | 'date'
  | 'dates'
  | 'datetime'
  | 'week'
  | 'datetimerange'
  | 'daterange'
  | 'monthrange'
export interface SearchConditionOptionItem {
  label?: string
  value?: any
  valueType?: 'string' | 'number'
}
export interface ApiParamsItem {
  key?: string
  value?: string | number
  valueType?: 'string' | 'number' | 'auto'
}
export interface SearchConditionItem {
  id: string
  key?: string
  type?: SearchConditionType
  optionDataType?: 'static_data' | 'definition'
  isTreeData?: boolean
  staticDataKey?: string
  label?: string
  placeholder?: string
  dataSource?: 'api' | 'custom'
  apiConfig?: ApiConfigModel
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
  [key: string]: any
}

export interface SearchDesignDataOptions {
  searchConditionItems?: SearchConditionItem[]
}

export type SearchDesignData = BaseDesignData<SearchDesignDataOptions>
