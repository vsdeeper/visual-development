/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-13 20:05:46
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @LastEditTime: 2024-02-17 20:51:06
 * @Description:
 */

import { BaseDesignData, Method } from '@/components'
import { Sort } from 'element-plus'
import { VNode } from 'vue'

export type TableColumnItemType = 'switch'

export interface TableColumnItem {
  prop?: string
  label?: string
  type?: TableColumnItemType
  width?: string | number
  minWidth?: string | number
  fixed?: true | 'left' | 'right'
  showOverflowTooltip?: boolean
  sortable?: boolean | 'custom'
  sortChange?: (...args: any[]) => void
  formatter?: (...args: any[]) => string | VNode
  children?: TableColumnItem[]
}

export interface TableDesignDataOptions {
  columns?: TableColumnItem[]
  api?: string
  method?: Extract<Method, 'GET'>
  data?: Record<string, any>[]
  itemHasChildren?: string
  itemChildren?: string
  autoCalcMaxHeight?: boolean
  relatedSearchId?: string
  tableLayout?: 'fixed' | 'auto'
  showSelection?: boolean
  showPagination?: boolean
  defaultExpandAll?: boolean
  highlightCurrentRow?: boolean
  rowKey?: string
  flexible?: boolean
  lazy?: boolean
  loadApi?: string
  defaultSort?: Sort
  virtualized?: boolean
}
export type TableDesignData = BaseDesignData<TableDesignDataOptions>;
