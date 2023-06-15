interface ValidatorTypeData {
  singleData: string;
  validationResult: string;
  fileName: string;
  unformattedData: Array<unknown>;
  extractLength: number;
  formattedData: Array<string>;
  allColumnHeaders: Array<string>;
  columnHeader: string;
}
interface GoogleMapsScraperTypeData {
  keywords: Array<string>;
  country: string;
  state: string;
  city: string;
  language: string;
  countryCode: string;
  stateCode: string;
  addons: string;
}
interface EmailAndContactsTypeData {
  url: string;
  page: string;
  fileName: string;
}
export interface CountryStateCity {
  id: number;
  name: string;
  iso2?: string;
}
export interface IToolFormData
  extends GoogleMapsScraperTypeData,
    ValidatorTypeData,
    EmailAndContactsTypeData {}
export default interface IToolFormContext {
  formData: IToolFormData;
  handleKeywordChange: (val: Array<string>) => void;
  handleCountryChange: (val: CountryStateCity) => void;
  handleStateChange: (val: CountryStateCity) => void;
  handleCityChange: (val: CountryStateCity) => void;
  handleSingleDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileDataChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  submitSingleInput: () => void;
  submitFileInput: () => void;
}
