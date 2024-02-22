import { ApiConfig, BaseDesignData, Method } from '@/components';
import { Sort } from 'element-plus';
import { VNode } from 'vue';

export interface TableColumnItem {
  prop?: string;
  label?: string;
  width?: string | number;
  minWidth?: string | number;
  fixed?: true | 'left' | 'right';
  showOverflowTooltip?: boolean;
  sortable?: boolean | 'custom';
  sortChange?: (...args: any[]) => void;
  formatter?: (...args: any[]) => string | VNode;
  children?: TableColumnItem[];
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
