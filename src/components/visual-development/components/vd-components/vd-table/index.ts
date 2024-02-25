import { ApiConfig, BaseDesignData, Method } from '@/components';
import { Sort } from 'element-plus';

export interface FormatterOptions {
  type?: 'displayByStaticData' /**根据静态数据做回显 */ | 'displayByDynamicData' /**根据动态数据做回显 */ | 'dateFormat' /** 日期格式化 */
  staticDataKey?: string // 静态数据key
  apiConfig?: ApiConfig // 接口配置
  dateFormat?: string // 日期格式，yyyy-MM-dd HH:mm:ss
}
export interface TableColumnItem {
  id: string;
  prop?: string;
  label?: string;
  width?: string | number;
  minWidth?: string | number;
  fixed?: true | 'left' | 'right';
  showOverflowTooltip?: boolean;
  sortable?: boolean | 'custom';
  sortChange?: (...args: any[]) => void;
  formatterOptions?: FormatterOptions
  tableColumnItems?: TableColumnItem[];
}

export interface TableDesignDataOptions {
  tableColumnItems?: TableColumnItem[];
  apiConfig?: ApiConfig;
  method?: Extract<Method, 'GET'>;
  data?: Record<string, any>[];
  itemHasChildren?: string;
  itemChildren?: string;
  autoCalcMaxHeight?: boolean;
  relatedSearchId?: string;
  tableLayout?: 'fixed' | 'auto';
  showCheckbox?: boolean;
  showPagination?: boolean;
  defaultExpandAll?: boolean;
  highlightCurrentRow?: boolean;
  rowKey?: string;
  flexible?: boolean;
  lazy?: boolean;
  loadApiConfig?: ApiConfig;
  defaultSort?: Sort;
  virtualized?: boolean;
  [key: string]: any;
}
export type TableDesignData = BaseDesignData<TableDesignDataOptions>;
