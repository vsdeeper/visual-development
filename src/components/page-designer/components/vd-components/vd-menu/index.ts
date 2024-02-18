import { BaseDesignData, Method } from '@/components'

export interface MenuDesignDataOptions {
  mode?: 'horizontal' | 'vertical';
  router?: boolean
  popperEffect?: 'dark' | 'light';
  api?: string
  method?: Extract<Method, 'GET'>
  params?: Record<string, any>
}
export type MenuDesignData = BaseDesignData<MenuDesignDataOptions>;
