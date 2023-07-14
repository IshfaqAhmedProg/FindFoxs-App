import { TaskUnits } from "./Tasks";

export interface ValidatorFormData {
  singleData: string;
  validationResult: string;
  fileName: string;
  unformattedData: Array<unknown>;
  extractLength: number;
  formattedData: Array<string>;
  allColumnHeaders: Array<string>;
  columnHeader: string;
}
interface GoogleMapsScraperFormData {
  keywords: Array<string>;
  country: string;
  state: string;
  city: string;
  language: string;
  countryCode: string;
  stateCode: string;
  addons: string;
  coords: string;
}
interface EmailAndContactsFormData {
  url: string;
  page: string;
  fileName: string;
}
export interface CountryStateCity {
  id: number;
  name: string;
  iso2?: string;
}
export interface Language {
  label: string;
  subtag: string;
}
export interface IToolFormData
  extends GoogleMapsScraperFormData,
    ValidatorFormData,
    EmailAndContactsFormData {}
export default interface IToolFormContext {
  formData: IToolFormData;
  singleDataLoading: boolean;
  taskSubmitLoading: boolean;
  resetFormData: () => void;
  handleKeywordChange: (val: Array<string>) => void;
  handleCountryChange: (val: CountryStateCity) => void;
  handleStateChange: (val: CountryStateCity) => void;
  handleCityChange: (val: CountryStateCity) => void;
  handleLanguageChange: (lang: Language) => void;
  handleAddonChange: (addons: Array<string>) => void;
  handleSingleDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileDataChange: (files: FileList | null) => void;
  handleSingleInputSubmit: (e: React.SyntheticEvent) => void;
  handleTaskSubmit: () => void;
}
