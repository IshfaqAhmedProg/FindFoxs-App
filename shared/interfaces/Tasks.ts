export interface Tools {
  tool:
    | "Google Maps Scraper"
    | "Email Validator"
    | "Email Reverse Lookup"
    | "Facebook Scraper"
    | "Email And Contacts Scraper"
    | "Phone Number Validator"
    | "Whatsapp Validator";
}
export interface Status {
  status: "RUNNING" | "COMPLETE" | "FAILED";
}
export default interface Task extends Tools, Status {
  id: string;
  queryCount: number;
  startTime: Date;
}
