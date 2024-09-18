import { type ApiParamsItem, type BaseDesignData, type Method } from '@/components'
import { type Sort } from 'element-plus'

export type TableColumnItemFormatterType =
  | 'static_data_transform' /**静态数据转换 */
  | 'dynamic_data_transform' /**动态数据转换 */
  | 'date_format' /** 格式化日期 */

export interface TableColumnItem {
  id: string
  prop?: string
  label?: string
  width?: string | number
  minWidth?: string | number
  fixed?: true | 'left' | 'right'
  showOverflowTooltip?: boolean
  sortable?: boolean | 'custom'
  sortChange?: (...args: any[]) => void
  formatterType?: TableColumnItemFormatterType
  staticDataKey?: string // 静态数据key，formatterType = static_data_transform
  format?: string // 日期显示格式，yyyy-MM-dd HH:mm:ss，formatterType = date_format
  isTreeData?: boolean // 是否树形数据，formatterType = dynamic_data_transform
  apiMethod?: Extract<Method, 'GET'> // 接口配置，formatterType = dynamic_data_transform
  api?: string // 接口配置，formatterType = dynamic_data_transform
  apiParams?: ApiParamsItem[] // 接口配置，formatterType = dynamic_data_transform
  tableColumnItems?: TableColumnItem[]
  [key: string]: any
}

export interface TableOperationsItem {
  label?: string
  value?: string
  code?: string // 权限标识符
  show?: any
  enableConfirmation?: boolean
  formConfig?: Record<string, any>
  [key: string]: any
}
export interface TableDesignDataOptions {
  tableOperations?: TableOperationsItem[]
  tableColumnItems?: TableColumnItem[]
  tableColumnOperations?: TableOperationsItem[]
  apiMethod?: Extract<Method, 'GET'>
  api?: string
  apiParams?: ApiParamsItem[]
  data?: Record<string, any>[]
  itemHasChildren?: string
  itemChildren?: string
  autoCalcMaxHeight?: boolean
  relatedSearchId?: string
  tableLayout?: 'fixed' | 'auto'
  showCheckbox?: boolean
  showPagination?: boolean
  defaultExpandAll?: boolean
  highlightCurrentRow?: boolean
  rowKey?: string
  flexible?: boolean
  lazy?: boolean
  loadApiMethod?: Extract<Method, 'GET'>
  loadApi?: string
  loadApiParams?: ApiParamsItem[]
  defaultSort?: Sort
  virtualized?: boolean
  [key: string]: any
}
export type TableDesignData = BaseDesignData<TableDesignDataOptions>
