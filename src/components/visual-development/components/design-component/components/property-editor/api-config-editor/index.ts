import ApiConfigEditor from './api-config-editor.vue'
import { type ApiParamsItem, type Method } from '@/components'

export type ApiConfigEditorInstance = InstanceType<typeof ApiConfigEditor>
export interface ApiConfigEditorModel {
  api?: string
  apiMethod?: Method
  apiParams?: ApiParamsItem[]
  [key: string]: any
}

export { ApiConfigEditor }
