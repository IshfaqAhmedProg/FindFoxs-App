import Stats from "./Stats";

export interface EmailValidatorResponse {
  valid: boolean;
  block: boolean;
  disposable: boolean;
  domain: string;
  text: string;
  reason: string;
  risk: number;
  mx_host: string;
  possible_typo: any[];
  mx_ip: string;
  mx_info: string;
  last_changed_at: string;
}
export interface PhoneNumberValidatorResponse {
  status: string;
  phone: string;
  phone_valid: boolean;
  phone_type: string;
  phone_region: string;
  country: string;
  country_code: string;
  country_prefix: string;
  international_number: string;
  local_number: string;
  e164: string;
  carrier: string;
}
export type SingleResult = {
  resultStat: Array<Stats>;
  resultScore: number;
  resultReport: string;
};
