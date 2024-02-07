/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 17:27:02
 * @Description:
 */
import { type ComponentTypeOfPageDesigner } from '../../..'


export interface AddComponentOptionItem {
  label: string
  value: ComponentTypeOfPageDesigner
}
export interface AddComponentGroupOptionItem {
  id: string
  name: string
  children: AddComponentOptionItem[]
}
export { default as AddComponent } from './add-component.vue'