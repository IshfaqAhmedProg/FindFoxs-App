export interface Tools {
  tool:
    | string
    | "Google Maps Scraper"
    | "Email Validator"
    | "Email Reverse Lookup"
    | "Facebook Scraper"
    | "Email And Contacts Scraper"
    | "Phone Number Validator"
    | "Whatsapp Validator";
}
export interface Status {
  status: string | "RUNNING" | "COMPLETE" | "FAILED";
}
interface TaskDetails {
  queryCount: number;
  startTime: Date | number;
  endTime: Date | number;
}
export interface TaskResult {
  result?: IEmailValidatorResult;
}
export interface IEmailValidatorResult {
  deliverable: number;
  undeliverable: {
    invalid_email: number;
    invalid_domain: number;
    rejected_email: number;
    invalid_smtp: number;
  };
  risky: {
    low_quality: number;
    low_deliverability: number;
  };
  unknown: {
    no_connect: number;
    timeout: number;
    unavailable_smtp: number;
    unexpected_error: number;
  };
  duplicate: number;
}
type TaskUnits = string | "website" | "email" | "number" | "keyword";
export default interface Task extends TaskDetails, Tools, Status, TaskResult {
  unit: TaskUnits;
  _id: string;
}
