/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: vsdeeper vsdeeper@qq.com
 * @Date: 2024-01-07 11:27:08
 * @Description:
 */
import type { AsyncComponentLoader } from 'vue'
import { capitalizeFirstLetter } from '@/utils'
import { type AsideDesignData } from './vd-aside'
import { MenuDesignData } from './vd-menu'
import { ContainerDesignData } from './vd-container'

export type SubComponentsTypeOfPageDesigner =
/** 布局容器 */'Aside' | 'Container' | 'Footer' | 'Header' | 'Main' | 'RowCol' | 'RouterView' | 'View' |
/** 导航组件 */'Menu' |
/** 视图组件 */'Form' | 'Search' | 'Table' |
/** 基础组件 */'Button' | 'Icon' |
/** 数据展示组件 */'Image'

/** 基础设计数据类型 */
export type BaseDesignData<T = Record<string, any>> = {
  id: SubComponentsTypeOfPageDesigner
  label: string
  options?: T & {
    components?: BaseDesignData<T>[]
  }
}
/** 当前配置数据类型 */
export type ActiveDesignData = AsideDesignData | MenuDesignData | ContainerDesignData | undefined

/** 导出所有子组件 */
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

export { SubComponentsOfPageDesigner }
