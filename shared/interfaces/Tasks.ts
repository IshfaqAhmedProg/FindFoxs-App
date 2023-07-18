import { Timestamp } from "firebase/firestore";
import { IToolFormData } from "./ToolForm";
export const tools = [
  "Google Maps Scraper",
  "Email Validator",
  "Facebook Scraper",
  "Emails And Contacts Scraper",
  "Phone Number Validator",
];
export const statuses = ["RUNNING", "COMPLETE", "FAILED"];
export interface Tools {
  tool: string | (typeof tools)[number];
}
export interface Status {
  status: string | (typeof statuses)[number];
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
export type TaskUnits = string | "website" | "email" | "number" | "keyword";
export default interface Task extends TaskDetails, Tools, Status, TaskResult {
  uid?: string;
  unit?: TaskUnits;
  _id: string;
  _idShort?: string;
}
export const isTask = <Task>(thing: any): thing is Task => true;
