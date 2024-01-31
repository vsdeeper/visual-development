/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:14:46
 * @Description:
 */
import { BaseDesignData } from '@/components'

interface Options {
  rowGutter?: number
  rowJustify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
  rowAlign?: 'top' | 'middle' | 'bottom'
  colSpan?: number
  colXs?: number
  colSm?: number
  colMd?: number
  colLg?: number
  colXl?: number
  components?: BaseDesignData<Options>[]
}
export type RowColDesignData = BaseDesignData<Options>