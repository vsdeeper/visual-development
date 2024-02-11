import { SearchConditionType } from "@/components";

/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-02-11 16:25:42
 * @LastEditors: vsdeeper vsdeeper@qq.com
 * @LastEditTime: 2024-02-11 21:34:09
 * @Description:
 */
export const SEARCH_TYPE_OPTIONS: { label: string; value: SearchConditionType }[] = [
  { label: '输入框', value: 'Input' },
  { label: '数字输入框', value: 'InputNumber' },
  { label: '选择器', value: 'Select' },
  { label: '级联选择器', value: 'Cascader' },
  { label: '日期选择器', value: 'DatePicker' },
]