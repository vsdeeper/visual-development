/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:27:08
 * @Description:
 */
import type { AsyncComponentLoader } from 'vue'
import { capitalizeFirstLetter } from '@/utils'

export type SubComponentsTypeOfPageDesigner = 'Aside' | 'Container' | 'Footer' | 'Header' | 'Main' | 'Layout' | 'RouterView' | 'View' | 'FormDesigner'

const SubComponentsOfPageDesigner: { [K in SubComponentsTypeOfPageDesigner]?: any } = {}
const vueModules = import.meta.glob('./*/*.vue')

for (const path in vueModules) {
  if (path.includes('vd-')) {
    const key = path
      .substring(path.lastIndexOf('/') + 1)
      .replace('.vue', '')
      .replace('vd-', '')
      .split('-')
      .map(str => capitalizeFirstLetter(str))
      .join('') as SubComponentsTypeOfPageDesigner
    SubComponentsOfPageDesigner[key] = defineAsyncComponent({
      loader: vueModules[path] as AsyncComponentLoader<any>,
    })
  }
}

export { SubComponentsOfPageDesigner /** 导出页面设计器子组件 */ }
