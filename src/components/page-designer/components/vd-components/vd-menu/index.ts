import { ApiConfig, BaseDesignData, Method } from '@/components'

export interface MenuDesignDataOptions {
  mode?: 'horizontal' | 'vertical';
  router?: boolean
  popperEffect?: 'dark' | 'light';
  apiConfig?: ApiConfig
}
export type MenuDesignData = BaseDesignData<MenuDesignDataOptions>;
