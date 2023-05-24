import { Lead, LeadSearchTabs } from "./Lead";

export type DTS = Lead;
export type DataTypesSupported = Array<DTS>;
export type STS = LeadSearchTabs;
export type TabsSuppported = Array<STS>;
export interface ITableMain {
  tableTitle?: string;
  tableTabs: TabsSuppported;
  data: DataTypesSupported;
  primaryKey?: string;
  primaryItems: React.ReactElement;
  secondaryItems: React.ReactElement;
  filterComponent: React.ReactElement;
  selectActionsComponent: React.ReactElement;
}
export type handleTabChangeParams = {
  event?: React.ChangeEvent<unknown>;
  tab: STS;
  changeFunction?: (params: any) => void;
};
export type handlePageChangeParams = {
  event?: React.ChangeEvent<unknown>;
  page: number;
  changeFunction?: (params: any) => void;
};
export type handleSelectAllParams = {
  checked: boolean;
  tableData: DataTypesSupported;
};
export interface ITableContext {
  selected: Array<string>;
  page: number;
  activeTab: string;
  handleTabChange: (params: handleTabChangeParams) => void;
  handlePageChange: (params: handlePageChangeParams) => void;
  handleSelect: (id: string) => void;
  handleSelectAll: (params: handleSelectAllParams) => void;
}
