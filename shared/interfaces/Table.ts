import { Timestamp } from "@firebase/firestore-types";

export interface ITableFilter {
  tableData: Array<any | undefined>;
  filterComponent: React.ReactElement;
  selectActionsComponent: React.ReactElement;
}
export interface ITableContainer {
  primaryKey: string;
  secondaryKeys: Array<string>;
  primaryItems: React.ReactElement;
  secondaryItems: React.ReactElement;
}
export interface ITableMain extends ITableFilter, ITableContainer {
  tableTitle?: string;
  tableTabs?: Array<string>;
}

export type TabChangeParams = {
  event?: React.ChangeEvent<unknown>;
  tab: string;
  changeFunction?: (params: any) => void;
};

export type SelectAllParams = {
  checked: boolean;
  tableData: Array<any | undefined>;
};
export type FilterParams = {
  label: string;
  value: Array<string | Timestamp>;
};
export interface ITableContext {
  seeMoreOpen: boolean;
  seeMoreOpenAnchor: null | HTMLElement;
  selected: Array<string>;
  activeTab: string;
  loading: boolean;
  selectedFilters: FilterParams;
  handleSetFilter: (sf: FilterParams) => void;
  handleClearFilter: () => void;
  handleTabChange: (params: TabChangeParams) => void;
  handleDataFetch: () => void;
  handleSelect: (id: string) => void;
  handleSelectAll: (params: SelectAllParams) => void;
  handleSeeMoreClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleSeeMoreClose: () => void;
}
