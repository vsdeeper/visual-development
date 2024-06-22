import { type ComponentTypeOfPageDesigner } from '../../..'

export interface AddComponentOptionItem {
  label: string
  value: ComponentTypeOfPageDesigner
  presetId?: string
  desc?: string
  disabled?: boolean
}
export interface AddComponentGroupOptionItem {
  id: string
  name: string
  children: AddComponentOptionItem[]
}
export { default as AddComponent } from './add-component.vue'
