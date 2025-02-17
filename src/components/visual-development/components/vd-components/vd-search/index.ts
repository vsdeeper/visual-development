import { type BaseDesignData } from '../../../..'
import type { ApiConfigModel } from '../../design-component/components'

export type SearchConditionType = 'Input' | 'InputNumber' | 'Select' | 'Cascader' | 'Date' | 'Time'
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
  optionDataType?: 'dynamic_data' | 'static_data'
  staticDataKey?: string
  isTreeData?: boolean
  label?: string
  placeholder?: string
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
}

export interface SearchDesignDataOptions {
  labelWidth?: number
  searchConditionItems?: SearchConditionItem[]
}

export type SearchDesignData = BaseDesignData<SearchDesignDataOptions>
