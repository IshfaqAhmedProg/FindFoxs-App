import { Timestamp } from "firebase/firestore";
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
  request?: Array<string> | IGoogleMapsScraperRequest;
}
export type IGoogleMapsScraperRequest = {
  keywords: string;
  coords: string;
  addons: string;
  language: string;
};
export interface TaskResult {
  response?: IEmailValidatorResponse;
}
export interface IEmailValidatorResponse {
  Deliverable: number;
  Undeliverable: {
    Invalid_email: number;
    Invalid_domain: number;
    Rejected_email: number;
    Invalid_smtp: number;
  };
  Risky: {
    Low_quality: number;
    Low_deliverability: number;
  };
  Unknown: {
    No_connect: number;
    Timeout: number;
    Unavailable_smtp: number;
    Unexpected_error: number;
  };
  Duplicate: number;
}
export type TaskUnits = string | "website" | "email" | "number" | "keyword";
export default interface Task extends TaskDetails, Tools, Status, TaskResult {
  uid?: string;
  unit?: TaskUnits;
  _id: string;
}
export const isTask = <Task>(thing: any): thing is Task => true;
