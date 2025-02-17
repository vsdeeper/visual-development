import { type BaseDesignData } from '../../../..'
import { type Sort } from 'element-plus'
import type { ApiConfigModel, OptionsConfigItem } from '../../design-component/components'
import type { FormDesignData } from 'vswift-form'

export type TableColumnItemFormatterType =
  | 'static_data_transform' /**静态数据转换 */
  | 'dynamic_data_transform' /**动态数据转换 */
  | 'date_format' /** 格式化日期 */

export interface TableColumnItem {
  id: string
  prop?: string
  label?: string
  width?: number
  minWidth?: number
  fixed?: true | 'left' | 'right'
  showOverflowTooltip?: boolean
  sortable?: boolean | 'custom'
  sortChange?: (...args: any[]) => void
  formatterType?: TableColumnItemFormatterType
  format?: string // 日期显示格式，yyyy-MM-dd HH:mm:ss，formatterType = date_format
  isTreeData?: boolean // 是否树形数据，formatterType = dynamic_data_transform
  apiConfig?: ApiConfigModel // 接口配置，formatterType = dynamic_data_transform
  tableColumnItems?: TableColumnItem[]
  itemLabel?: string
  itemValue?: string
  itemChildren?: string
  staticDataKey?: string
  options?: OptionsConfigItem[]
}

export interface TableOperationsItemFormConfig {
  useOtherForm?: string
  data?: FormDesignData
}

export interface TableOperationsItem {
  id: string
  label?: string
  value?: string
  code?: string // 权限标识符
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  show?: any
  readonly?: boolean
  enableConfirmation?: boolean
  isNeedEchoApi?: boolean
  formConfig?: TableOperationsItemFormConfig
  apiConfig?: ApiConfigModel
  echoApiConfig?: ApiConfigModel
  [key: string]: any
}
export interface TableDesignDataOptions {
  tableOperations?: TableOperationsItem[]
  tableColumnItems?: TableColumnItem[]
  tableColumnOperations?: TableOperationsItem[]
  operateColumnWidth?: number
  apiConfig?: ApiConfigModel
  data?: Record<string, any>[]
  itemHasChildren?: string
  itemChildren?: string
  // autoCalcMaxHeight?: boolean
  relatedSearchId?: string
  tableLayout?: 'fixed' | 'auto'
  showSelection?: boolean
  showPagination?: boolean
  defaultExpandAll?: boolean
  highlightCurrentRow?: boolean
  rowKey?: string
  flexible?: boolean
  lazy?: boolean
  lazyApiConfig?: ApiConfigModel
  defaultSort?: Sort
  virtualized?: boolean
  showOverflowTooltip?: boolean
}
export type TableDesignData = BaseDesignData<TableDesignDataOptions>
