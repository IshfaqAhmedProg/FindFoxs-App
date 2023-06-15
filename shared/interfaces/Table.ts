import { Lead, LeadSearchTabs } from "./Lead";
import Task from "./Tasks";

export type DTS = Lead | Task;
export type DataTypesSupported = Array<DTS>;
export type STS = LeadSearchTabs;
export type TabsSuppported = Array<STS>;
export interface ITableMain {
  tableTitle?: string;
  tableTabs?: TabsSuppported;
  data: DataTypesSupported;
  primaryKey?: string;
  primaryItems: React.ReactElement;
  secondaryKeys: Array<string>;
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
  seeMoreOpen: boolean;
  seeMoreOpenAnchor: null | HTMLElement;
  selected: Array<string>;
  page: number;
  activeTab: string;
  handleTabChange: (params: handleTabChangeParams) => void;
  handleDataFetch: () => void;
  handleSelect: (id: string) => void;
  handleSelectAll: (params: handleSelectAllParams) => void;
  handleSeeMoreClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleSeeMoreClose: () => void;
}
