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
  paywallComponent?: React.ReactNode;
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
  value: Array<any>;
};
export interface ITableContext {
  seeMoreOpen: boolean;
  seeMoreOpenAnchor: null | HTMLElement;
  selected: Array<string>;
  activeTab: number;
  loading: boolean;
  selectedFilters: FilterParams;
  paywallExceeded: boolean;
  handlePaywallExceeded: (exceeded: boolean) => void;
  handleSetFilter: (sf: FilterParams) => void;
  handleClearFilter: () => void;
  handleTabChange: (event: React.SyntheticEvent, value: any) => void;
  handleDataFetch: () => void;
  handleSelect: (id: string) => void;
  handleSelectAll: (params: SelectAllParams) => void;
  handleSeeMoreClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleSeeMoreClose: () => void;
}
