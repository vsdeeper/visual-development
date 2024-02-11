/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:14:46
 * @Description: logo可视化开发组件
 */
import { BaseDesignData } from '@/components'

export type SearchConditionItem = Record<string, any>

export type SearchDesignData = BaseDesignData<{
  searchConditionItems?: SearchConditionItem[]
}>;
