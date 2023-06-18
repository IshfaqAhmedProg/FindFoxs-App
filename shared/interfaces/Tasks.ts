import { Timestamp } from "firebase/firestore";
import { IToolFormData } from "./ToolForm";
import { User } from "firebase/auth";

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
  dateCreated: Date | number | Timestamp;
  dateCompleted?: Date | number | Timestamp;
  estimatedTTC?: string;
  request?: IToolFormData;
}

export interface TaskResult {
  response?: IEmailValidatorResult;
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
  uid?: string;
  unit?: TaskUnits;
  _id: string;
  _idShort?: string;
}
