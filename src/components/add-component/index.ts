/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 17:27:02
 * @Description:
 */
import { type SubComponentsTypeOfPageDesigner } from '..'


export interface AddComponentOptionItem {
  label: string
  value: SubComponentsTypeOfPageDesigner
}
export interface AddComponentGroupOptionItem {
  id: string
  name: string
  children: AddComponentOptionItem[]
}
export { default as AddComponent } from './add-component.vue'